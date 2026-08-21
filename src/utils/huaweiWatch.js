/**
 * Huawei Watch — helper Bluetooth + mock sync
 * - Web Bluetooth per Huawei Watch GT (Heart Rate Service 0x180D)
 * - Fallback mock per PWA senza BT
 * Dati 100% locali, niente cloud Huawei necessario per demo.
 */

const HR_SERVICE = 0x180D;
const HR_CHAR = 0x2A37;
const BATTERY_SERVICE = 0x180F;
const BATTERY_CHAR = 0x2A19;

export async function isBluetoothAvailable() {
  return !!(navigator.bluetooth && navigator.bluetooth.getAvailability);
}

export async function connectHuaweiWatch({ onHeartRate, onBattery, onStatus } = {}) {
  if (!navigator.bluetooth) {
    throw new Error('Bluetooth non disponibile in questo browser. Usa Chrome/Edge su Android o Mac.');
  }
  const status = (s) => onStatus && onStatus(s);
  status('searching');
  let device;
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [
        { namePrefix: 'HUAWEI' },
        { namePrefix: 'WATCH' },
        { namePrefix: 'GT' },
      ],
      optionalServices: [HR_SERVICE, BATTERY_SERVICE],
    });
  } catch (e) {
    // fallback: accetta qualsiasi device con HR
    device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [HR_SERVICE, BATTERY_SERVICE],
    });
  }
  status('connecting');
  const server = await device.gatt.connect();
  const hrService = await server.getPrimaryService(HR_SERVICE).catch(() => null);
  let hrChar = null;
  if (hrService) {
    hrChar = await hrService.getCharacteristic(HR_CHAR).catch(() => null);
    if (hrChar && hrChar.properties.notify) {
      await hrChar.startNotifications();
      hrChar.addEventListener('characteristicvaluechanged', (e) => {
        const v = e.target.value;
        // HR spec: flags byte + hr
        const flags = v.getUint8(0);
        const is16 = flags & 0x1;
        const hr = is16 ? v.getUint16(1, true) : v.getUint8(1);
        onHeartRate && onHeartRate(hr);
      });
      status('connected-hr');
    }
  }
  // batteria opzionale
  try {
    const batService = await server.getPrimaryService(BATTERY_SERVICE);
    const batChar = await batService.getCharacteristic(BATTERY_CHAR);
    const batVal = await batChar.readValue();
    onBattery && onBattery(batVal.getUint8(0));
  } catch {}

  device.addEventListener('gattserverdisconnected', () => status('disconnected'));

  return {
    device,
    server,
    disconnect: () => { try { device.gatt.disconnect(); } catch {} },
  };
}

// Mock sync per demo quando BT non disponibile o per test PWA iOS (che non ha WebBT)
export function mockHuaweiWatchSync({ sessionsCount = 0 } = {}) {
  // genera HR fittizio 68-155 basato su streak
  const base = 72 + (sessionsCount % 7) * 3 + Math.floor(Math.random() * 18);
  const hr = Math.min(165, Math.max(62, base + (Math.random() > 0.7 ? 20 : 0)));
  const battery = 60 + Math.floor(Math.random() * 35);
  return { hr, battery, mock: true, at: new Date().toISOString() };
}

export async function syncHuaweiWatchToSession({ profile, lastSession, sessions = [] } = {}) {
  // Per ora: se BT disponibile prova a leggere HR, altrimenti mock
  // In futuro: qui chiameresti Huawei Health Kit REST se l'utente ha fatto OAuth
  if (await isBluetoothAvailable()) {
    // non connettiamo automaticamente per non aprire popup BT a ogni sync;
    // ritorna hint per UI
    return { needsPairing: true, hint: 'Tocca Connetti Watch per leggere HR live' };
  }
  return mockHuaweiWatchSync({ sessionsCount: sessions.length });
}
