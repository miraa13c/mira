import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { makeId, updateData, useAppData, type TimelineEntry } from '../../../lib/store';
import { GhostButton, inputClass, Field } from '../ui';

export default function Timeline() {
  const data = useAppData();
  const [editing, setEditing] = useState<string | null>(null);
  const blank = (): TimelineEntry => ({ id: makeId(), date: new Date().toISOString().slice(0, 10), title: '', description: '', location: '', note: '', photoUrl: '' });
  const save = (entry: TimelineEntry) => updateData(d => ({ ...d, timeline: d.timeline.some(x => x.id === entry.id) ? d.timeline.map(x => x.id === entry.id ? entry : x) : [...d.timeline, entry] }));
  return <div className="space-y-8">
    <div><h1 className="font-display text-4xl font-semibold">Our Timeline</h1><p className="text-muted-foreground">the story so far.</p></div>
    <div className="relative space-y-5 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border sm:before:left-5">
      {data.timeline.map(t => editing === t.id ? <div key={t.id} className="pl-8 sm:pl-12"><Editor item={t} onSave={x => { save(x); setEditing(null); }} onCancel={() => setEditing(null)} /></div> : <article key={t.id} className="relative pl-8 sm:pl-12"><div className="absolute left-0 top-4 grid size-7 place-items-center rounded-full border border-primary bg-background text-xs text-primary sm:left-2">♡</div><div className="rounded-3xl border border-border bg-card p-5 shadow-sm"><div className="text-xs font-bold uppercase tracking-widest text-primary">{new Date(t.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div><h2 className="mt-2 font-display text-2xl font-semibold">{t.title}</h2>{t.photoUrl && <img src={t.photoUrl} alt="" className="mt-4 max-h-80 w-full rounded-2xl object-cover" />}<p className="mt-3 text-muted-foreground">{t.description}</p>{t.location && <p className="mt-3 text-sm">📍 {t.location}</p>}<p className="mt-3 font-display italic">“{t.note}”</p><div className="mt-4 flex gap-2"><GhostButton onClick={() => setEditing(t.id)}><Pencil className="size-4" />Edit</GhostButton><button type="button" aria-label="Delete timeline entry" className="rounded-xl p-2 text-muted-foreground hover:bg-accent hover:text-destructive" onClick={() => updateData(x => ({ ...x, timeline: x.timeline.filter(y => y.id !== t.id) }))}><Trash2 className="size-4" /></button></div></div></article>)}
    </div>
    {editing === 'new' ? <Editor item={blank()} onSave={x => { save(x); setEditing(null); }} onCancel={() => setEditing(null)} /> : <GhostButton onClick={() => setEditing('new')}><Plus className="size-4" />Add a moment</GhostButton>}
  </div>;
}
function Editor({ item, onSave, onCancel }: { item: TimelineEntry; onSave: (x: TimelineEntry) => void; onCancel: () => void }) {
  const [x, setX] = useState(item);
  return <div className="rounded-3xl border border-border bg-card p-5 shadow-sm"><div className="grid gap-3 sm:grid-cols-2"><Field label="Date"><input className={inputClass} type="date" value={x.date} onChange={e => setX({ ...x, date: e.target.value })} /></Field><Field label="Title"><input className={inputClass} value={x.title} onChange={e => setX({ ...x, title: e.target.value })} /></Field><Field label="Location"><input className={inputClass} value={x.location} onChange={e => setX({ ...x, location: e.target.value })} /></Field><Field label="Photo URL"><input className={inputClass} value={x.photoUrl ?? ''} onChange={e => setX({ ...x, photoUrl: e.target.value })} /></Field></div><div className="mt-3 space-y-3"><Field label="Description"><textarea className={`${inputClass} min-h-28 resize-y`} value={x.description} onChange={e => setX({ ...x, description: e.target.value })} /></Field><Field label="Little note"><textarea className={`${inputClass} min-h-24 resize-y`} value={x.note} onChange={e => setX({ ...x, note: e.target.value })} /></Field></div><div className="mt-4 flex gap-2"><GhostButton onClick={() => onSave(x)}>Save</GhostButton><GhostButton onClick={onCancel}>Cancel</GhostButton></div></div>;
}
