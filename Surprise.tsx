import { useMemo, useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { updateData, useAppData } from '../../../lib/store';

export default function Surprise() {
  const data = useAppData();
  const [open, setOpen] = useState<string | null>(null);
  const [pops, setPops] = useState(0);
  const remaining = Math.max(0, 8 - pops);
  const hidden = useMemo(() => data.hiddenPhotos[0], [data.hiddenPhotos]);
  return <div className="space-y-10">
    <div><h1 className="font-display text-4xl font-semibold">Surprise</h1><p className="text-muted-foreground">you weren't supposed to find everything this quickly.</p></div>
    <div className="grid gap-4 sm:grid-cols-2">{data.surpriseNotes.map(n => <button type="button" key={n.id} onClick={() => { setOpen(n.id); updateData(d => ({ ...d, foundSurprises: d.foundSurprises.includes(n.id) ? d.foundSurprises : [...d.foundSurprises, n.id] })); }} className="rounded-3xl border border-border bg-card p-6 text-left shadow-sm transition hover:-translate-y-1 hover:bg-accent"><Gift className="mb-4 size-6 text-primary" /><b>{n.teaser}</b>{open === n.id && <p className="mt-3 animate-pop whitespace-pre-wrap text-muted-foreground">{n.text}</p>}</button>)}</div>
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-center shadow-sm"><Sparkles className="mx-auto mb-3 text-primary" /><p className="text-sm text-muted-foreground">{remaining === 0 ? 'you found it.' : `tap the heart ${remaining} more ${remaining === 1 ? 'time' : 'times'}`}</p><button type="button" aria-label="Make a heart pop" disabled={remaining === 0} onClick={() => { setPops(x => Math.min(8, x + 1)); updateData(x => ({ ...x, heartPops: x.heartPops + 1 })); }} className="mx-auto mt-4 rounded-full p-5 text-4xl transition active:scale-90 hover:scale-110 disabled:opacity-50"><Heart className="size-12 fill-primary text-primary" /></button>{pops >= 8 && hidden && <div className="mt-5 animate-pop"><img src={hidden.url} alt="Hidden surprise" className="mx-auto max-h-80 rounded-2xl object-cover"/><p className="mt-3 text-sm">{hidden.message}</p></div>}</section>
  </div>;
}
