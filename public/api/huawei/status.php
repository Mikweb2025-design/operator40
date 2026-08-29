<?php
// GET /api/huawei/status.php — ritorna { connected, scopes } da cookie sessione (stub)
declare(strict_types=1);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/config.php';

if (!huawei_is_configured()) {
    echo json_encode(['connected' => false, 'configured' => false, 'scopes' => []]);
    exit;
}

// In implementazione reale: verifica cookie httpOnly con sessione utente (hash HuaweiID)
// Qui stub: legge cookie o40_huawei_connected
$connected = isset($_COOKIE['o40_huawei_connected']) && $_COOKIE['o40_huawei_connected'] === '1';
echo json_encode([
    'connected' => $connected,
    'configured' => true,
    'scopes' => $connected ? ['https://www.huawei.com/healthkit/step.read', 'https://www.huawei.com/healthkit/heartrate.read'] : [],
    'note' => 'stub — implementare verifica refresh_token cifrato in data/{hash}.json',
]);
