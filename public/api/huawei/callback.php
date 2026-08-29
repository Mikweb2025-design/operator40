<?php
// GET /api/huawei/callback.php?code=...&state=... — OAuth Authorization Code → token exchange (server-side)
// Mai esporre client_secret al client. Stub: verifica state, poi 501 se non configurato.
declare(strict_types=1);
require_once __DIR__ . '/config.php';

$code = $_GET['code'] ?? '';
$state = $_GET['state'] ?? '';
$expectedState = $_COOKIE['o40_huawei_state'] ?? '';

if ($code === '') {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'missing_code']);
    exit;
}

// CSRF check (se implementato)
if ($expectedState !== '' && $state !== $expectedState) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'state_mismatch']);
    exit;
}

huawei_require_config();

// --- Scambio reale (non eseguito in stub senza secret) ---
// $resp = http_post('https://oauth-login.cloud.huawei.com/oauth2/v3/token', [
//     'grant_type' => 'authorization_code',
//     'client_id' => $HUAWEI_CLIENT_ID,
//     'client_secret' => $HUAWEI_CLIENT_SECRET,
//     'code' => $code,
//     'redirect_uri' => $HUAWEI_REDIRECT_URI,
// ]);
// $data = json_decode($resp, true);
// $access = $data['access_token']; $refresh = $data['refresh_token'];
// // cifra refresh_token con AES-256-GCM e salva in data/{hash}.json
// // setcookie('o40_huawei_connected', '1', [..., 'httponly'=>true, 'samesite'=>'Lax']);
// // header('Location: https://mikweb.eu/operator40/?huawei=connected');

http_response_code(501);
header('Content-Type: application/json');
echo json_encode([
    'error' => 'not_implemented',
    'received_code' => substr($code, 0, 8) . '...',
    'hint' => 'Configura HUAWEI_CLIENT_SECRET e implementa token exchange (vedi docs/HUAWEI_PLAN.md 4.2)',
]);
