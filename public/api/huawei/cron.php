<?php
// CLI cron: php public/api/huawei/cron.php — per ogni utente con refresh_token, refresh + fetch ieri + salva summary.json
// Esegui via: 0 7 * * * php /var/www/vhosts/mikweb.eu/httpdocs/operator40/api/huawei/cron.php
// Stub: logga e ritorna 501 se non configurato. Non espone dati via HTTP (solo CLI).
declare(strict_types=1);

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'cli_only']);
    exit;
}

require_once __DIR__ . '/config.php';

if (!huawei_is_configured()) {
    fwrite(STDERR, "[huawei cron] not_configured — imposta HUAWEI_CLIENT_ID/SECRET\n");
    exit(1);
}

// In implementazione reale:
// foreach (glob(__DIR__ . '/data/*.json') as $file) {
//   $user = json_decode(file_get_contents($file), true);
//   $newAccess = refresh_token($user['refresh_encrypted']);
//   $steps = query_collector($newAccess, 'com.huawei.continuous.steps.total', $yesterdayStart, $yesterdayEnd);
//   file_put_contents(__DIR__ . "/data/{$hash}_summary.json", json_encode(['date'=>..., 'steps'=>...]));
// }

echo "[huawei cron] stub — nessuna utenza ancora, imposta Fase 3 (AppGallery) prima\n";
exit(0);
