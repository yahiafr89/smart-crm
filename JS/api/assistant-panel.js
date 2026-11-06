import { askAssistant } from './assistant.js';
import { config } from '../config/config.js';

// Render untrusted Markdown through DOM text nodes only; never parse response HTML.
const mdNode = (tag, text) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; return node; };
function renderInline(target, source) {
  const text = String(source);
  // Escaped Markdown markers, code spans, emphasis and strong; HTML remains literal text.
  const pattern = /(\\[\\`*_~|])|(`+)([\s\S]*?)\2|(\*\*|__)(.+?)\4|(\*|_)([^\n]+?)\6|(~~)(.+?)\8/g;
  let index = 0; let match;
  while ((match = pattern.exec(text))) {
    if (match.index > index) target.append(document.createTextNode(text.slice(index, match.index)));
    if (match[1]) target.append(document.createTextNode(match[1].slice(1)));
    else if (match[2]) target.append(mdNode('code', match[3]));
    else if (match[4]) { const node = mdNode('strong'); renderInline(node, match[5]); target.append(node); }
    else if (match[6]) { const node = mdNode('em'); renderInline(node, match[7]); target.append(node); }
    else if (match[8]) { const node = mdNode('del'); renderInline(node, match[9]); target.append(node); }
    index = pattern.lastIndex;
  }
  if (index < text.length) target.append(document.createTextNode(text.slice(index)));
}
function splitCells(line) {
  let s = line.trim(); if (s.startsWith('|')) s = s.slice(1); if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  const cells = []; let current = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && s[i+1] === '|') { current += '|'; i++; }
    else if (s[i] === '|') { cells.push(current.trim()); current = ''; }
    else current += s[i];
  }
  cells.push(current.trim()); return cells;
}
const separatorCell = s => /^:?-{3,}:?$/.test(s.trim());
function isTable(lines, i) {
  if (i+1 >= lines.length || !lines[i].includes('|') || !lines[i+1].includes('|')) return false;
  const headers = splitCells(lines[i]); const separators = splitCells(lines[i+1]);
  return headers.length >= 2 && headers.length === separators.length && separators.every(separatorCell);
}
function renderMarkdown(container, markdown) {
  container.replaceChildren();
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      const code = []; const mark = fence[1][0]; const len = fence[1].length; i++;
      while (i < lines.length && !new RegExp('^\\s{0,3}'+(mark === '`' ? '`' : '~')+'{'+len+',}\\s*$').test(lines[i])) code.push(lines[i++]);
      if (i < lines.length) i++;
      const pre = mdNode('pre'); pre.append(mdNode('code', code.join('\n'))); container.append(pre); continue;
    }
    if (isTable(lines,i)) {
      const headers = splitCells(lines[i]); const align = splitCells(lines[i+1]);
      const scroller = mdNode('div'); scroller.className = 'crm-ai-table-scroll'; scroller.tabIndex = 0;
      scroller.setAttribute('role','region'); scroller.setAttribute('aria-label','AI response table');
      const table = mdNode('table'); const head = mdNode('thead'); const hrow = mdNode('tr');
      headers.forEach((cell,j)=>{ const th=mdNode('th'); th.scope='col'; th.style.textAlign=align[j].startsWith(':')&&align[j].endsWith(':')?'center':align[j].endsWith(':')?'right':'left'; renderInline(th,cell); hrow.append(th); });
      head.append(hrow); table.append(head); const body = mdNode('tbody'); i+=2;
      while (i<lines.length && lines[i].trim() && lines[i].includes('|')) {
        const cells=splitCells(lines[i]); const row=mdNode('tr');
        headers.forEach((_,j)=>{const td=mdNode('td'); renderInline(td,cells[j]??''); row.append(td);});
        body.append(row); i++;
      }
      table.append(body); scroller.append(table); container.append(scroller); continue;
    }
    const heading=line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (heading) { const h=mdNode('h'+Math.min(heading[1].length+2,6)); renderInline(h,heading[2].replace(/\s+#+\s*$/,'')); container.append(h); i++; continue; }
    if (/^\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { container.append(mdNode('hr')); i++; continue; }
    const listMatch=line.match(/^\s{0,3}([-+*]|\d+[.)])\s+(.+)$/);
    if (listMatch) {
      const ordered=/\d/.test(listMatch[1]); const list=mdNode(ordered?'ol':'ul');
      if(ordered)list.start=Number.parseInt(listMatch[1],10);
      while(i<lines.length) {
        const m=lines[i].match(/^\s{0,3}([-+*]|\d+[.)])\s+(.+)$/);
        if(!m || /\d/.test(m[1])!==ordered)break;
        const li=mdNode('li'); renderInline(li,m[2]); i++;
        while(i<lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-+*]|\d+[.)])\s+/.test(lines[i])) { li.append(document.createTextNode(' '+lines[i].trim())); i++; }
        list.append(li);
      }
      container.append(list); continue;
    }
    if (/^\s{0,3}>\s?/.test(line)) {
      const quote=mdNode('blockquote'); const parts=[];
      while(i<lines.length && /^\s{0,3}>\s?/.test(lines[i]))parts.push(lines[i++].replace(/^\s{0,3}>\s?/,''));
      renderInline(quote,parts.join('\n')); container.append(quote); continue;
    }
    const paragraph=[];
    while(i<lines.length && lines[i].trim() && (paragraph.length===0 || !isTable(lines,i)) && !/^\s{0,3}(?:#{1,6}\s|`{3,}|~{3,}|>\s?|[-+*]\s+|\d+[.)]\s+)/.test(lines[i])) paragraph.push(lines[i++]);
    if(!paragraph.length){paragraph.push(lines[i++]);}
    const p=mdNode('p'); paragraph.forEach((part,j)=>{if(j)p.append(mdNode('br'));renderInline(p,part);});container.append(p);
  }
}


export function createAssistantPanel(supabase, { prospectId = null, getPeriod = null } = {}) {
  const host = mdNode('div'); host.className = 'crm-ai-widget';
  const launcher = mdNode('button', 'Ask AI'); launcher.type = 'button'; launcher.className = 'crm-ai-launcher';
  const panel = mdNode('section'); panel.className = 'crm-ai-panel'; panel.hidden = true;
  panel.id = 'crm-ai-assistant'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'crm-ai-title');
  launcher.setAttribute('aria-controls', panel.id); launcher.setAttribute('aria-expanded', 'false');
  const style = mdNode('style'); style.textContent = `
    .crm-ai-widget{font-family:inherit;color:#14213d}
    .crm-ai-launcher{position:fixed;right:24px;bottom:24px;z-index:1100;border:0;border-radius:999px;padding:16px 24px;background:linear-gradient(120deg,#1668ec,#7054d9);color:white;font-family:inherit;font-size:15px;font-weight:700;box-shadow:0 8px 30px #223c7650;cursor:pointer}
    .crm-ai-panel{position:fixed;right:20px;top:20px;bottom:90px;z-index:1101;width:min(520px,calc(100vw - 40px));box-sizing:border-box;padding:24px;background:#fff;border:1px solid #dbe3ee;border-radius:22px;box-shadow:0 18px 70px #14213d30;display:flex;flex-direction:column;overflow:hidden;overscroll-behavior:contain}
    .crm-ai-panel[hidden]{display:none!important}.crm-ai-panel *{box-sizing:border-box}
    .crm-ai-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:3px}
    .crm-ai-footer{flex-shrink:0;display:flex;justify-content:flex-end;padding:12px 3px 3px;border-top:1px solid #e2e8f0;margin-top:12px}
    .crm-ai-panel .crm-ai-copy{display:inline-flex;align-items:center;justify-content:center;width:auto;min-height:30px;padding:6px 12px;border:1px solid #dbe3ee;border-radius:8px;background:#f8fafc;color:#475569;font-family:inherit;font-size:12px;font-weight:500;line-height:1.4;box-shadow:none}
    .crm-ai-panel .crm-ai-copy:hover{background:#eef2fa;color:#14213d}
    .crm-ai-panel .crm-ai-copy[hidden],.crm-ai-footer[hidden]{display:none!important}
    .crm-ai-header{display:flex;justify-content:space-between;align-items:center;gap:12px}.crm-ai-header h2{margin:0;font-size:22px}
    .crm-ai-actions{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}.crm-ai-panel button{cursor:pointer}.crm-ai-panel button:disabled{opacity:.55;cursor:wait}
    .crm-ai-close{border:0;background:#eef2fa;border-radius:50%;width:36px;height:36px;font-size:24px}.crm-ai-note{color:#64748b;font-size:14px;line-height:1.6}
    .crm-ai-answer{white-space:normal;overflow-wrap:anywhere;line-height:1.65;max-height:none!important;overflow:visible!important}
    .crm-ai-answer p{margin:12px 0}.crm-ai-answer ul,.crm-ai-answer ol{padding-left:25px}.crm-ai-answer li{margin:6px 0}
    .crm-ai-table-scroll{max-width:100%;overflow-x:auto;margin:16px 0;border:1px solid #dbe3ee;border-radius:10px}.crm-ai-table-scroll table{min-width:100%;width:max-content;border-collapse:collapse}
    .crm-ai-table-scroll th,.crm-ai-table-scroll td{padding:10px 14px;border-bottom:1px solid #e2e8f0;white-space:normal;max-width:340px;overflow-wrap:anywhere;text-align:left}.crm-ai-table-scroll th{background:#f3f7ff}
    .crm-ai-answer pre{overflow-x:auto;white-space:pre;padding:14px;background:#f3f7ff;border-radius:10px}.crm-ai-answer code{background:#f3f7ff}.crm-ai-answer blockquote{border-left:3px solid #60a5fa;margin:14px 0;padding-left:14px}
    .crm-ai-widget button:focus-visible,.crm-ai-table-scroll:focus-visible{outline:3px solid #60a5fa;outline-offset:3px}
    @media(max-width:600px){.crm-ai-panel{top:10px;right:10px;bottom:84px;width:calc(100vw - 20px);padding:20px}.crm-ai-launcher{right:16px;bottom:18px}}
  `;
  const header = mdNode('div'); header.className = 'crm-ai-header';
  const title = mdNode('h2', 'AI Assistant'); title.id = 'crm-ai-title';
  const close = mdNode('button', '×'); close.type = 'button'; close.className = 'crm-ai-close'; close.setAttribute('aria-label', 'Close AI Assistant');
  header.append(title, close);
  const description = mdNode('p', prospectId === null ? 'Explore your dashboard and plan your follow-ups.' : 'Understand this prospect and prepare your next follow-up.'); description.className = 'crm-ai-note';
  const actions = mdNode('div'); actions.className = 'crm-ai-actions';
  const status = mdNode('p'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  const draftNote = mdNode('p', 'Draft — review before copying. This action sends no message and makes no changes to the prospect.'); draftNote.className = 'crm-ai-note'; draftNote.hidden = true;
  const answer = mdNode('div'); answer.className = 'crm-ai-answer';
  const copy = mdNode('button', 'Copy answer'); copy.type = 'button'; copy.className = 'crm-ai-copy'; copy.hidden = true;
  const footer = mdNode('div'); footer.className = 'crm-ai-footer'; footer.hidden = true; footer.append(copy);
  let originalAnswer = '', pending = false, controller = null, generation = 0, disposed = false;
  const initialLocation = location.href;
  const current = () => !disposed && host.isConnected && location.href === initialLocation;
  function open() { panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); close.focus(); }
  function hide() { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.focus(); }
  launcher.addEventListener('click', () => panel.hidden ? open() : hide());
  close.addEventListener('click', hide);
  const keydown = event => { if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); hide(); } };
  document.addEventListener('keydown', keydown);
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(originalAnswer); status.textContent = 'Copied to clipboard.'; }
    catch { status.textContent = 'Copy unavailable. Select the answer text and copy it manually.'; }
  });
  function errorMessage(error) {
    if ([401].includes(Number(error.status)) || /authentication required|session|jwt.*expired/i.test(error.message || '')) return 'Your session has expired. Sign in again to use AI Assistant.';
    if ([403,404].includes(Number(error.status))) return prospectId === null ? 'You do not have access to this information.' : 'This prospect is unavailable or outside your permitted access.';
    if (error.message === 'Dashboard period unavailable.') return 'Load a dashboard period successfully before requesting an explanation.';
    return 'AI Assistant is temporarily unavailable. Please try again.';
  }
  function button(action, label, params) {
    const b = mdNode('button', label); b.type = 'button'; b.className = 'btn-secondary'; b.dataset.action = action;
    b.addEventListener('click', async () => {
      if (pending || !current()) return;
      const run = ++generation; controller = new AbortController(); pending = true;
      for (const item of actions.children) item.disabled = true;
      panel.setAttribute('aria-busy', 'true'); status.textContent = 'Preparing your answer…';
      answer.replaceChildren(); originalAnswer = ''; copy.hidden = true; footer.hidden = true; draftNote.hidden = true;
      const timeout = setTimeout(() => controller?.abort(), 90000);
      try {
        const payload = { action, ...params() };
        const { data, error } = await supabase.auth.getSession(); if (error) throw error;
        const token = data?.session?.access_token;
        if (!token) { const error = new Error('Authentication required.'); error.status = 401; throw error; }
        const result = await askAssistant(config, token, payload, controller.signal);
        if (!current() || run !== generation) return;
        // The backend contract guarantees answer; additional metadata is optional.
        if (result?.success === false || (result?.action && result.action !== action) || typeof result?.answer !== 'string' || !result.answer.trim()) throw new Error('Unexpected assistant response.');
        originalAnswer = result.answer; renderMarkdown(answer, originalAnswer);
        const draft = action === 'draft_followup'; draftNote.hidden = !draft;
        copy.textContent = draft ? 'Copy draft' : 'Copy answer'; copy.hidden = false; footer.hidden = false;
        status.textContent = draft ? 'Your draft is ready to review.' : 'Answer ready.';
      } catch (error) { if (current() && run === generation) status.textContent = errorMessage(error); }
      finally {
        clearTimeout(timeout);
        if (run === generation) { pending = false; panel.removeAttribute('aria-busy'); for (const item of actions.children) item.disabled = false; }
      }
    }); actions.append(b);
  }
  if (prospectId !== null) {
    button('summarize_prospect', 'Summarize this prospect', () => ({ prospect_id: Number(prospectId) }));
    button('draft_followup', 'Draft follow-up', () => ({ prospect_id: Number(prospectId) }));
  } else {
    button('prioritize_followups', 'Prioritize follow-ups', () => ({}));
    button('explain_dashboard', 'Explain dashboard', () => { const period = getPeriod?.(); if (!period) throw new Error('Dashboard period unavailable.'); return period; });
  }
  const body = mdNode('div'); body.className = 'crm-ai-body';
  body.append(header, description, actions, status, draftNote, answer);
  panel.append(body, footer); host.append(style, launcher, panel);
  function dispose() { disposed = true; generation++; controller?.abort(); document.removeEventListener('keydown', keydown); observer.disconnect(); }
  const observer = new MutationObserver(() => { if (!host.isConnected) dispose(); });
  // The caller appends the widget synchronously after this factory returns.
  queueMicrotask(() => { if (host.isConnected) observer.observe(document.body, { childList: true, subtree: true }); });
  return host;
}
