import { Heart, Plus, Trash2 } from 'lucide-react';
import { makeId, updateData, useAppData } from '../../../lib/store';
import { GhostButton, inputClass } from '../ui';

export default function LoveNotes() {
  const data = useAppData();
  return <div className="space-y-8">
    <div><h1 className="font-display text-4xl font-semibold">Love Notes</h1><p className="text-muted-foreground">small things I wanted you to know.</p></div>
    <div className="grid gap-4 sm:grid-cols-2">{data.loveNotes.map(n => <article key={n.id} className="relative rounded-3xl border border-border bg-card p-5 shadow-sm">
      <Heart className="absolute right-5 top-5 size-5 fill-primary/10 text-primary" />
      <textarea aria-label="Love note" className={`${inputClass} min-h-32 resize-y pr-10`} value={n.text} onChange={e => updateData(d => ({ ...d, loveNotes: d.loveNotes.map(x => x.id === n.id ? { ...x, text: e.target.value } : x) }))} />
      <button type="button" onClick={() => updateData(d => ({ ...d, loveNotes: d.loveNotes.filter(x => x.id !== n.id) }))} className="mt-3 text-xs text-muted-foreground hover:text-destructive"><Trash2 className="mr-1 inline size-3" />remove</button>
    </article>)}</div>
    <GhostButton onClick={() => updateData(d => ({ ...d, loveNotes: [...d.loveNotes, { id: makeId(), text: 'something I love about you…' }] }))}><Plus className="size-4" />Add a note</GhostButton>
  </div>;
}
