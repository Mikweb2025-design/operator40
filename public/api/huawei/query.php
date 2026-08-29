<?php
// POST /api/huawei/query.php — proxy verso health-api.cloud.huawei.com (stub)
// Body: { collector: "com.huawei.continuous.steps.total", startTime: ms, endTime: ms }
// Verifica sessione, poi inoltra con Bearer access_token (mai esposto al client)
declare(strict_types=1);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/config.php';
huawei_require_config();

$input = json_decode(file_get_contents('php://input'), true);
$collector = $input['collector'] ?? 'com.huawei.continuous.steps.total';
$start = $input['startTime'] ?? null;
$end = $input['endTime'] ?? null;

if (!$start || !$end) {
    http_response_code(400);
    echo json_encode(['error' => 'missing_start_end']);
    exit;
}

// Stub: in implementazione reale, recupera access_token da refresh_token cifrato
// e inoltra a https://health-api.cloud.huawei.com/healthkit/v1/dataCollector/samplePoint.query
http_response_code(501);
echo json_encode([
    'error' => 'not_implemented',
    'collector' => $collector,
    'hint' => 'Implementa proxy con Bearer token (vedi docs/HUAWEI_PLAN.md 5)',
    'mock' => [
        'samplePoints' => [],
        'note' => 'Ritorna dati mock in attesa di credenziali reali',
    ],
]);
