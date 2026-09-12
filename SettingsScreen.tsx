import { CheckCircle2, RotateCcw } from 'lucide-react';
import { resetData, updateData, useAppData, type BackgroundId, type ThemeId } from '../../../lib/store';
import { Field, GhostButton, inputClass } from '../ui';

export default function SettingsScreen() {
  const data = useAppData();
  const s = data.settings;
  const set = <K extends keyof typeof s>(key: K, value: typeof s[K]) => updateData(x => ({ ...x, settings: { ...x.settings, [key]: value } }));
  return <div className="space-y-8"><div><h1 className="font-display text-4xl font-semibold">Settings</h1><p className="text-muted-foreground">make this little corner feel like yours.</p></div>
    <div className="grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2">
      <Field label="Site title"><input className={inputClass} value={s.siteTitle} onChange={e => set('siteTitle', e.target.value)} /></Field>
      <Field label="Partner nickname"><input className={inputClass} value={s.partnerNickname} onChange={e => set('partnerNickname', e.target.value)} /></Field>
      <Field label="From name"><input className={inputClass} value={s.fromName} onChange={e => set('fromName', e.target.value)} /></Field>
      <Field label="Anniversary"><input type="date" className={inputClass} value={s.anniversary} onChange={e => set('anniversary', e.target.value)} /></Field>
      <Field label="Cover photo URL"><input className={inputClass} value={s.coverPhotoUrl} placeholder="https://…" onChange={e => set('coverPhotoUrl', e.target.value)} /></Field>
      <Field label="Theme"><select className={inputClass} value={s.themeId} onChange={e => set('themeId', e.target.value as ThemeId)}><option value="rose">Rose</option><option value="terracotta">Terracotta</option><option value="sage">Sage</option><option value="lavender">Lavender</option></select></Field>
      <Field label="Background"><select className={inputClass} value={s.background} onChange={e => set('background', e.target.value as BackgroundId)}><option value="plain">Plain</option><option value="dots">Dots</option><option value="paper">Paper</option></select></Field>
      <div className="flex items-end"><GhostButton onClick={() => set('darkMode', !s.darkMode)}>{s.darkMode ? 'Use light mode' : 'Use dark mode'}</GhostButton></div>
    </div>
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm"><h2 className="font-display text-2xl font-semibold">Home messages</h2><p className="mt-1 text-sm text-muted-foreground">These rotate during the day.</p><div className="mt-4 space-y-2">{data.homeMessages.map((m, i) => <div key={i} className="flex gap-2"><input className={inputClass} value={m} onChange={e => updateData(d => ({ ...d, homeMessages: d.homeMessages.map((x, j) => j === i ? e.target.value : x) }))}/><button type="button" onClick={() => updateData(d => ({ ...d, homeMessages: d.homeMessages.filter((_, j) => j !== i) }))} className="rounded-xl border border-border px-3 text-muted-foreground hover:text-destructive">×</button></div>)}</div><GhostButton className="mt-3" onClick={() => updateData(d => ({ ...d, homeMessages: [...d.homeMessages, 'a new little message…'] }))}>Add message</GhostButton></div>
    <div className="flex flex-wrap items-center gap-4">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"><CheckCircle2 className="size-4 text-primary" />changes save automatically on this device</span>
      <button type="button" onClick={() => { if (confirm('Reset local changes and restore the original data?')) resetData(); }} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-destructive hover:bg-accent"><RotateCcw className="size-4" />Reset local data</button>
    </div>
  </div>;
}
