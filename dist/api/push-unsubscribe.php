<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'method not allowed']); exit; }
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data || empty($data['endpoint'])) { http_response_code(400); echo json_encode(['error'=>'invalid']); exit; }
$store = __DIR__ . '/subscriptions.json';
if (!file_exists($store)) { echo json_encode(['ok'=>true, 'count'=>0]); exit; }
$subs = json_decode(file_get_contents($store), true) ?: [];
$before = count($subs);
$endpoint = $data['endpoint'];
$subs = array_values(array_filter($subs, fn($s) => ($s['endpoint'] ?? '') !== $endpoint));
file_put_contents($store, json_encode($subs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
echo json_encode(['ok'=>true, 'removed'=> $before - count($subs), 'count'=>count($subs)]);
