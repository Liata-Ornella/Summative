export function compileSearch(pattern, flags='') {
  // Allow literals like /foo/i or bare patterns like foo
  let source = pattern;
  let f = flags;
  const m = /^\/(.*)\/(\w*)$/.exec(pattern);
  if (m) { source = m[1]; f = m[2]; }
  try {
    return new RegExp(source, f);
  } catch (e) {
    throw new Error('Invalid regex: ' + (e.message || e));
  }
}




