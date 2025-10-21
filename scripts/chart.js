export function renderTrendChart(container, data) {
  if (!container) return;
  container.innerHTML = '';
  const max = Math.max(1, ...data.map(d => d.count));
  const wrap = document.createElement('div');
  wrap.style.display = 'grid';
  wrap.style.gridTemplateColumns = 'repeat(7, 1fr)';
  wrap.style.gap = '6px';
  for (const d of data) {
    const barWrap = document.createElement('div');
    barWrap.style.display = 'flex';
    barWrap.style.flexDirection = 'column-reverse';
    barWrap.style.alignItems = 'center';
    const bar = document.createElement('div');
    bar.style.height = (Math.round((d.count / max) * 80) + 8) + 'px';
    bar.style.width = '100%';
    bar.style.background = 'linear-gradient(180deg, #4ea1ff, #005fcc)';
    bar.style.borderRadius = '6px';
    bar.setAttribute('role','img');
    bar.setAttribute('aria-label', `${d.date}: ${d.count} tasks`);
    const lab = document.createElement('div');
    lab.textContent = d.date.slice(5);
    lab.style.fontSize = '12px';
    lab.style.color = 'var(--muted)';
    lab.style.marginTop = '4px';
    barWrap.appendChild(bar);
    barWrap.appendChild(lab);
    wrap.appendChild(barWrap);
  }
  container.appendChild(wrap);
}


