<?php
// GET /api/huawei/auth/start.php — avvia OAuth redirect verso Huawei (stub)
declare(strict_types=1);
require_once __DIR__ . '/../config.php';

if (!huawei_is_configured()) {
    header('Content-Type: text/html; charset=utf-8');
    http_response_code(501);
    echo '<h1>Huawei Health — non configurato</h1><p>Imposta HUAWEI_CLIENT_ID/SECRET in env (vedi docs/HUAWEI_PLAN.md Fase 3). Questo è solo stub su branch feature/huawei-cloud.</p>';
    exit;
}

$state = bin2hex(random_bytes(16));
setcookie('o40_huawei_state', $state, ['expires' => time()+600, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax']);

$params = http_build_query([
    'client_id' => $HUAWEI_CLIENT_ID,
    'redirect_uri' => $HUAWEI_REDIRECT_URI,
    'response_type' => 'code',
    'scope' => 'https://www.huawei.com/healthkit/step.read https://www.huawei.com/healthkit/heartrate.read',
    'access_type' => 'offline',
    'state' => $state,
]);

header('Location: https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?' . $params);
exit;
