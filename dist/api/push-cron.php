<?php
// push-cron.php — invia 1 push motivazionale al giorno per ogni subscription
// Esecuzione: cron giornaliero 09:00 Europe/Rome, oppure GET con ?secret=...
// Richiede vendor/minishlink/web-push e api/vapid-private.json
header('Content-Type: application/json');

// secret opzionale per protezione via HTTP (imposta in vapid-private.json -> secret)
$secretParam = $_GET['secret'] ?? $_POST['secret'] ?? null;
$vapidFile = __DIR__ . '/vapid-private.json';
$vapid = file_exists($vapidFile) ? json_decode(file_get_contents($vapidFile), true) : null;
$expectedSecret = $vapid['cronSecret'] ?? null;
if ($expectedSecret && $secretParam !== $expectedSecret && php_sapi_name() !== 'cli') {
  // se cronSecret è impostato, richiedilo via HTTP (cli bypassa)
  // per test iniziale senza secret, lascia null
  if ($secretParam !== null) { http_response_code(403); echo json_encode(['error'=>'forbidden']); exit; }
}

$subsFile = __DIR__ . '/subscriptions.json';
$statsFile = __DIR__ . '/push-stats.json';
if (!file_exists($subsFile)) { echo json_encode(['sent'=>0,'total'=>0,'note'=>'no subs']); exit; }
$subs = json_decode(file_get_contents($subsFile), true) ?: [];
if (empty($subs)) { echo json_encode(['sent'=>0,'total'=>0]); exit; }
$statsAll = file_exists($statsFile) ? (json_decode(file_get_contents($statsFile), true) ?: []) : [];

$today = date('Y-m-d');
$sent = 0; $skipped = 0; $failed = 0;

// carica web-push se disponibile
$autoload = __DIR__ . '/vendor/autoload.php';
$hasWebPush = file_exists($autoload);
if ($hasWebPush) {
  require $autoload;
  $useWebPush = true;
} else $useWebPush = false;

if (!$vapid || empty($vapid['publicKey']) || empty($vapid['privateKey'])) {
  http_response_code(500);
  echo json_encode(['error'=>'vapid missing']);
  exit;
}

$auth = ['VAPID'=>['subject'=>$vapid['subject'] ?? 'mailto:info@mikweb.eu','publicKey'=>$vapid['publicKey'],'privateKey'=>$vapid['privateKey']]];
if ($useWebPush) {
  $webPush = new \Minishlink\WebPush\WebPush($auth);
}

foreach ($subs as $sub) {
  $endpoint = $sub['endpoint'] ?? '';
  if (!$endpoint) continue;
  $st = $statsAll[$endpoint] ?? [];
  // idempotenza: salta se già inviato oggi
  if (($st['lastSent'] ?? '') === $today) { $skipped++; continue; }

  $msg = buildMotivational($st);
  $payload = json_encode(['title'=>$msg['title'],'body'=>$msg['body'],'tag'=>$msg['tag'],'url'=>'./'], JSON_UNESCAPED_SLASHES);

  if ($useWebPush) {
    $subscription = \Minishlink\WebPush\Subscription::create($sub);
    $report = $webPush->sendOneNotification($subscription, $payload);
    if ($report->isSuccess()) {
      $sent++;
      $statsAll[$endpoint]['lastSent'] = $today;
    } else {
      $failed++;
      // se endpoint scaduto (410/404), rimuovere? per ora no
      $err = $report->getReason();
      if (strpos($err,'410')!==false || strpos($err,'404')!==false) {
        // invalida — segna per cleanup manuale
      }
    }
  } else {
    // senza web-push non possiamo inviare — simula
    $failed++;
  }
}

// flush se webPush batched (sendOneNotification già flusha, ma per sicurezza)
if ($useWebPush && isset($webPush)) { $webPush->flush(); }

file_put_contents($statsFile, json_encode($statsAll, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
echo json_encode(['sent'=>$sent,'skipped'=>$skipped,'failed'=>$failed,'total'=>count($subs),'date'=>$today]);

function personalize($base, $name, $lang) {
  if (!$name || !trim($name) || strtolower(trim($name)) === 'operatore') return $base;
  $clean = trim(explode(' ', trim($name))[0]);
  $prefixes = ['it'=>"Ciao $clean, ",'en'=>"Hey $clean, ",'de'=>"Hey $clean, "];
  $pref = $prefixes[$lang] ?? $prefixes['it'];
  return $pref . lcfirst($base);
}
function buildMotivational($st) {
  $n = $st['n'] ?? 0;
  $missed = $st['missed'] ?? 999;
  $lang = $st['lang'] ?? 'it';
  $name = $st['name'] ?? null;
  $dayOfYear = (int)date('z'); // 0-365

  $stressTips = [
    'it' => [
      'Tip anti-stress: 4s inspira, 4s trattieni, 4s espira — 3 volte e riparti.',
      'Stress? 2 min di plank + 10 respiri profondi. Bastano.',
      'Pausa 60s: spalle giù, collo lungo, 5 respiri lenti. Poi missione.',
      'Tip: cammina 10 min a pranzo — abbassa cortisolo più di un caffè.',
      'Sotto pressione? 20 squat lenti — scarichi tensione.',
    ],
    'en' => ['Stress tip: 4s in, 4s hold, 4s out — 3 rounds.', '2 min plank + 10 breaths.'],
    'de' => ['Anti-Stress: 4s ein, 4s halten, 4s aus.'],
  ];
  $generic = [
    'it' => ['Ogni ripetizione è un investimento sui tuoi 40+.', '15 minuti oggi valgono più di un’ora mai fatta.', 'Costanza > intensità. Un passo alla volta.'],
    'en' => ['Every rep is an investment.', '15 minutes today beats an hour never done.'],
    'de' => ['Jede Wiederholung zählt.'],
  ];

  if ($n > 0 && $missed >= 2) {
    $titles = ['it'=>"Manchi da $missed giorni — torna in base! 💪",'en'=>"Away for $missed days — come back! 💪",'de'=>"Seit $missed Tagen weg — komm zurück! 💪"];
    $bodies = [
      'it' => $missed >= 4 ? "Serie interrotta, ma bastano 15′ di Recupero Attivo per riprendere. Andiamo?" : "La tua striscia ti aspetta. Anche 15′ oggi salvano il ritmo.",
      'en' => $missed >= 4 ? "Streak broken, but 15′ Active Recovery is enough to restart. Let's go?" : "Your streak awaits. Even 15′ today keeps rhythm.",
      'de' => $missed >= 4 ? "Serie unterbrochen, aber 15′ Aktive Erholung reichen zum Neustart. Los geht's?" : "Deine Serie wartet. Schon 15′ heute halten den Rhythmus."
    ];
    return ['title'=>$titles[$lang]??$titles['it'],'body'=>personalize($bodies[$lang]??$bodies['it'], $name, $lang),'tag'=>'o40-comeback'];
  }
  // simula streak se non abbiamo dato preciso: usa n come proxy
  // se abbiamo n e missed, stimiamo streak come 0 se missed>1 altrimenti n%7
  $streak = 0;
  if ($missed === 0 || $missed === 1) $streak = min(7, $n % 7 + 3);
  if ($streak >= 7) {
    $titles = ['it'=>"Sei inarrestabile! 🔥 $streak giorni",'en'=>"Unstoppable! 🔥 $streak days",'de'=>"Unaufhaltsam! 🔥 $streak Tage"];
    $bodies = ['it'=>"Costanza al $n% — continua così, stai andando alla grande!",'en'=>"Consistency — keep going, you're doing great!",'de'=>"Konstanz — weiter so, du machst es großartig!"];
    return ['title'=>$titles[$lang]??$titles['it'],'body'=>personalize($bodies[$lang]??$bodies['it'], $name, $lang),'tag'=>'o40-streak'];
  }
  if ($streak >= 3) {
    $titles = ['it'=>"Continua così! 🔥 $streak giorni di fila",'en'=>"Keep it up! 🔥 $streak days",'de'=>"Weiter so! 🔥 $streak Tage"];
    $bodies = ['it'=>"Stai andando bene — mantieni il ritmo.",'en'=>"You're doing well — keep rhythm.",'de'=>"Du machst es gut — halte den Rhythmus."];
    return ['title'=>$titles[$lang]??$titles['it'],'body'=>personalize($bodies[$lang]??$bodies['it'], $name, $lang),'tag'=>'o40-streak'];
  }
  if ($n === 0) {
    $titles = ['it'=>"Inizia oggi 🌱",'en'=>"Start today 🌱",'de'=>"Starte heute 🌱"];
    $bodies = ['it'=>"15′ bastano per la prima missione.",'en'=>"15′ is enough for your first mission.",'de'=>"15′ reichen für die erste Mission."];
    return ['title'=>$titles[$lang]??$titles['it'],'body'=>personalize($bodies[$lang]??$bodies['it'], $name, $lang),'tag'=>'o40-start'];
  }
  if ($dayOfYear % 3 === 0) {
    $tips = $stressTips[$lang] ?? $stressTips['it'];
    $tip = $tips[$dayOfYear % count($tips)];
    $titles = ['it'=>"Tip anti-stress 🧘",'en'=>"Anti-stress tip 🧘",'de'=>"Anti-Stress Tipp 🧘"];
    return ['title'=>$titles[$lang]??$titles['it'],'body'=>personalize($tip, $name, $lang),'tag'=>'o40-stress'];
  }
  $gens = $generic[$lang] ?? $generic['it'];
  $g = $gens[$dayOfYear % count($gens)];
  $titles = ['it'=>"Continua così — stai andando bene 💪",'en'=>"Keep going — you're doing great 💪",'de'=>"Weiter so — du machst es gut 💪"];
  return ['title'=>$titles[$lang]??$titles['it'],'body'=>personalize($g, $name, $lang),'tag'=>'o40-motivation'];
}
