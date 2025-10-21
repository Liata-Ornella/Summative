export const validators = {
  title: {
    re: /^\S(?:.*\S)?$/,
    message: 'No leading/trailing spaces'
  },
  dueDate: {
    re: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    message: 'Use YYYY-MM-DD'
  },
  duration: {
    re: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
    message: 'Non-negative number, up to 2 decimals'
  },
  tag: {
    re: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
    message: 'Letters, spaces, hyphens'
  },
  duplicateWord: {
    re: /\b(\w+)\s+\1\b/i,
    message: 'Avoid duplicate adjacent words'
  }
};

export function validateFormField(input, onError) {
  if (!input || !input.id) return true;
  const id = input.id;
  const value = String(input.value || '');
  let valid = true;
  if (id in validators) {
    valid = validators[id].re.test(value);
  }
  if (id === 'title' && validators.duplicateWord.re.test(value)) {
    valid = false;
    onError?.(input, validators.duplicateWord.message);
    return false;
  }
  if (!valid) {
    onError?.(input, validators[id].message);
    return false;
  }
  onError?.(input, '');
  return true;
}

export function highlightMatches(text, pattern, ci) {
  if (!pattern) return escapeHtml(text);
  try {
    const flags = ci ? 'gi' : 'g';
    const re = new RegExp(pattern, flags);
    return escapeHtml(text).replace(re, (m) => `<mark>${escapeHtml(m)}</mark>`);
  } catch {
    return escapeHtml(text);
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}




