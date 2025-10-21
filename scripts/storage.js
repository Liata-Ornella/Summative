const STORAGE_KEY = 'campus-life-planner:v1';

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('loadFromStorage error', e);
    return null;
  }
}

export function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('saveToStorage error', e);
  }
}

export function exportJson(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'campus-life-planner.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function importJson(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  return data;
}


