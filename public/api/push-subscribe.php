<?php
// push-subscribe.php — salva subscription Web Push
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'method not allowed']); exit; }

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data || empty($data['endpoint'])) { http_response_code(400); echo json_encode(['error'=>'invalid subscription']); exit; }

$store = __DIR__ . '/subscriptions.json';
$subs = [];
if (file_exists($store)) {
  $c = file_get_contents($store);
  $subs = json_decode($c, true) ?: [];
}
$endpoint = $data['endpoint'];
// deduplica per endpoint
$subs = array_filter($subs, fn($s) => ($s['endpoint'] ?? '') !== $endpoint);
$subs[] = $data;
if (!is_dir(dirname($store))) mkdir(dirname($store), 0755, true);
file_put_contents($store, json_encode(array_values($subs), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
echo json_encode(['ok'=>true, 'count'=>count($subs)]);
