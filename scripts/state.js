import { loadFromStorage } from './storage.js';

const nowIso = () => new Date().toISOString();

const defaultState = {
  tasks: [],
  settings: {
    displayUnits: 'minutes',
    minutesPerHour: 60,
    tags: ['Academic','Club','Errand','Social','Health']
  },
  weeklyCapMinutes: 0
};

export const appState = loadFromStorage() || defaultState;

function uid() {
  return 'task_' + Math.random().toString(36).slice(2, 9);
}

export function ensureSeed() {
  if (appState.tasks.length > 0) return;
  // minimal seed placeholder; full seed.json handled via import later
  const sample = [
    { title: 'Submit lab report', dueDate: '2025-10-25', duration: 90, tag: 'Academic' },
    { title: 'Club meeting', dueDate: '2025-10-18', duration: 60, tag: 'Club' }
  ];
  for (const s of sample) {
    createTask(s);
  }
}

export function createTask({ id, title, dueDate, duration, tag }) {
  const record = {
    id: id || uid(),
    title,
    dueDate,
    duration: Number(duration),
    tag,
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
  appState.tasks.push(record);
  return record;
}

export function updateTask({ id, title, dueDate, duration, tag }) {
  const i = appState.tasks.findIndex(t => t.id === id);
  if (i === -1) return;
  appState.tasks[i] = { ...appState.tasks[i], title, dueDate, duration: Number(duration), tag, updatedAt: nowIso() };
}

export function deleteTask(id) {
  const i = appState.tasks.findIndex(t => t.id === id);
  if (i !== -1) appState.tasks.splice(i, 1);
}

export function getSortedTasks(sort) {
  const arr = [...appState.tasks];
  const [key, dir] = (sort || 'dueDate-asc').split('-');
  const mul = dir === 'desc' ? -1 : 1;
  arr.sort((a, b) => {
    let va, vb;
    if (key === 'title') { va = a.title.toLowerCase(); vb = b.title.toLowerCase(); }
    else if (key === 'duration') { va = a.duration; vb = b.duration; }
    else { va = a.dueDate; vb = b.dueDate; }
    return va < vb ? -1 * mul : va > vb ? 1 * mul : 0;
  });
  return arr;
}

export function setWeeklyCapMinutes(mins) { appState.weeklyCapMinutes = Number(mins) || 0; }
export function getWeeklyCapMinutes() { return Number(appState.weeklyCapMinutes) || 0; }

export function getStats() {
  const totalCount = appState.tasks.length;
  const totalDuration = appState.tasks.reduce((s, t) => s + Number(t.duration || 0), 0);
  const tagCounts = appState.tasks.reduce((m, t) => (m[t.tag] = (m[t.tag]||0) + 1, m), {});
  const mostUsedTag = Object.entries(tagCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || '';
  const today = new Date();
  const trend = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const key = d.toISOString().slice(0,10);
    const count = appState.tasks.filter(t => t.dueDate === key).length;
    return { date: key, count };
  });
  return { totalCount, totalDuration, mostUsedTag, trend };
}

export function setDisplayUnits(units) { appState.settings.displayUnits = units; }
export function setMinutesPerHour(value) { appState.settings.minutesPerHour = Number(value)||60; }
export function addTag(tag) { if (!appState.settings.tags.includes(tag)) appState.settings.tags.push(tag); }
export function removeTag(tag) { appState.settings.tags = appState.settings.tags.filter(t => t !== tag); }


