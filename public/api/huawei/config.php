<?php
// Huawei Health Cloud — config (server-side only, mai esposto al client)
// Legge env da Plesk / .env fuori httpdocs. In locale ritorna 501 se manca.
declare(strict_types=1);

function huawei_env(string $key, string $default = ''): string {
    $v = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);
    return $v !== false && $v !== '' ? (string)$v : $default;
}

$HUAWEI_CLIENT_ID = huawei_env('HUAWEI_CLIENT_ID');
$HUAWEI_CLIENT_SECRET = huawei_env('HUAWEI_CLIENT_SECRET');
$HUAWEI_REDIRECT_URI = huawei_env('HUAWEI_REDIRECT_URI', 'https://mikweb.eu/operator40/api/huawei/callback.php');
$HUAWEI_ENCRYPT_KEY = huawei_env('HUAWEI_ENCRYPT_KEY'); // 32 byte per AES-256-GCM, generata con: openssl rand -hex 32

function huawei_is_configured(): bool {
    global $HUAWEI_CLIENT_ID, $HUAWEI_CLIENT_SECRET;
    return $HUAWEI_CLIENT_ID !== '' && $HUAWEI_CLIENT_SECRET !== '';
}

function huawei_require_config(): void {
    if (!huawei_is_configured()) {
        http_response_code(501);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'not_configured', 'hint' => 'HUAWEI_CLIENT_ID/SECRET mancanti — vedi docs/HUAWEI_PLAN.md Fase 1']);
        exit;
    }
}
