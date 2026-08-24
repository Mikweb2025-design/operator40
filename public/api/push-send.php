<?php
// push-send.php — invia push a tutte le subscription (richiede web-push lib)
// POST {title, body, tag, url} oppure {test:true}
// Se test:true e filterSelf:true, invia solo alla subscription del chiamante (per test)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'method not allowed']); exit; }

$store = __DIR__ . '/subscriptions.json';
if (!file_exists($store)) { echo json_encode(['sent'=>0, 'total'=>0, 'note'=>'no subscriptions']); exit; }
$subs = json_decode(file_get_contents($store), true) ?: [];
if (empty($subs)) { echo json_encode(['sent'=>0, 'total'=>0]); exit; }

$raw = file_get_contents('php://input');
$input = json_decode($raw, true) ?: [];
$title = $input['title'] ?? 'Operator 40 — Missione pronta';
$body = $input['body'] ?? 'La tua missione di 15 min ti aspetta. Andiamo!';
$tag = $input['tag'] ?? 'o40-push';
$url = $input['url'] ?? './';
$payload = json_encode(['title'=>$title,'body'=>$body,'tag'=>$tag,'url'=>$url], JSON_UNESCAPED_SLASHES);

// Se non c'è vendor/autoload, fallback a non inviare ma ritorna payload per debug
$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
  // fallback: senza libreria non possiamo cifrare — prova a inviare via VAPID senza payload (trigger generico)
  // Ma per ora segnala che serve composer install
  http_response_code(500);
  echo json_encode(['error'=>'web-push not installed','hint'=>'run composer require minishlink/web-push','payload'=>$payload,'total'=>count($subs)]);
  exit;
}
require $autoload;
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

// carica chiavi VAPID da file privato (non in repo)
$privFile = __DIR__ . '/vapid-private.json';
if (!file_exists($privFile)) {
  http_response_code(500);
  echo json_encode(['error'=>'vapid-private.json missing','hint'=>'create api/vapid-private.json with {"publicKey":"..","privateKey":"..","subject":"mailto:info@mikweb.eu"}']);
  exit;
}
$vapid = json_decode(file_get_contents($privFile), true);
if (empty($vapid['publicKey']) || empty($vapid['privateKey'])) { http_response_code(500); echo json_encode(['error'=>'invalid vapid']); exit; }
$subject = $vapid['subject'] ?? 'mailto:info@mikweb.eu';

$auth = ['VAPID'=>['subject'=>$subject,'publicKey'=>$vapid['publicKey'],'privateKey'=>$vapid['privateKey']]];
$webPush = new WebPush($auth);

// opzionale: filtra per test self
if (!empty($input['test']) && !empty($input['filterSelf'])) {
  // il client invia la sua subscription nel body come subscription field
  // se presente, invia solo a quella
  if (!empty($input['subscription']['endpoint'])) {
    $target = $input['subscription']['endpoint'];
    $subs = array_values(array_filter($subs, fn($s) => ($s['endpoint'] ?? '') === $target));
    if (empty($subs)) $subs = json_decode(file_get_contents($store), true) ?: [];
  }
}

$sent = 0; $failed = 0; $results = [];
foreach ($subs as $s) {
  $sub = Subscription::create($s);
  $report = $webPush->sendOneNotification($sub, $payload);
  if ($report->isSuccess()) $sent++; else { $failed++; $results[] = $report->getReason(); }
}
echo json_encode(['sent'=>$sent,'failed'=>$failed,'total'=>count($subs),'payload'=>json_decode($payload,true)]);
