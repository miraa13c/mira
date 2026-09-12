import { CalendarHeart } from 'lucide-react';
import { daysSince, daysUntil, formatDate, useAppData } from '../../../lib/store';

export default function Countdown() {
  const data = useAppData();
  const together = daysSince(data.settings.anniversary);
  return <div className="space-y-8">
    <div><h1 className="font-display text-4xl font-semibold">Countdown</h1><p className="text-muted-foreground">dates worth counting down to.</p></div>
    <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm"><div className="text-sm uppercase tracking-widest text-primary">together</div><div className="my-2 font-display text-6xl font-semibold">{together.toLocaleString('en-IN')}</div><div className="text-muted-foreground">days and counting</div></div>
    <div className="grid gap-3 sm:grid-cols-2">{data.importantDates.map(x => <div key={x.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><CalendarHeart className="mb-3 text-primary" /><div className="font-semibold">{x.emoji} {x.label}</div><div className="mt-1 text-sm text-muted-foreground">{formatDate(x.date)}</div><div className="mt-3 text-2xl font-bold">{daysUntil(x.date, x.repeats)} <span className="text-sm font-normal text-muted-foreground">days</span></div></div>)}</div>
  </div>;
}
