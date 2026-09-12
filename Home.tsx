import type { ReactNode } from 'react';
import type { ScreenId } from '../App';
import { ArrowRight, CalendarHeart, Heart, Sparkles } from 'lucide-react';
import { daysSince, daysUntil, pickDaily, useAppData } from '../../../lib/store';
import { GhostButton, SoftButton } from '../ui';

export default function Home({ go }: { go: (id: ScreenId) => void }) {
  const data = useAppData();
  const s = data.settings;
  const message = pickDaily(data.homeMessages) ?? 'hey you ❤️';
  const daily = pickDaily(data.dailyMessages, 1) ?? 'thinking of you.';
  const together = daysSince(s.anniversary);
  const nextAnniversary = daysUntil(s.anniversary, true);
  return <div className="space-y-12 animate-fade-up">
    <section className="grid gap-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-[1.08fr_.92fr]">
      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-primary">hey {s.partnerNickname} ❤️</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">Look who’s here.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{message}</p>
        <div className="mt-6 flex flex-wrap gap-2"><SoftButton onClick={() => go('notes')}>Read something nice <Heart className="size-4" /></SoftButton><GhostButton onClick={() => go('surprise')}>Find a surprise <Sparkles className="size-4" /></GhostButton></div>
      </div>
      <div className="min-h-72 bg-accent">
        {s.coverPhotoUrl ? <img src={s.coverPhotoUrl} alt="A favorite memory" className="h-full min-h-72 w-full object-cover" /> : <div className="flex h-full min-h-72 items-center justify-center text-8xl animate-float">🌙</div>}
      </div>
    </section>

    <section className="grid gap-4 sm:grid-cols-3">
      <Stat icon="♡" value={together.toLocaleString('en-IN')} label="days together" />
      <Stat icon="🌙" value={String(nextAnniversary)} label="days until our anniversary" />
      <Stat icon="☕" value={s.fromName} label="from your favourite nuisance" />
    </section>

    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-primary">today's little message</p><p className="mt-3 font-display text-2xl italic">“{daily}”</p></section>

    <section><div className="mb-4 flex items-end justify-between"><h2 className="font-display text-2xl font-semibold">A few places to wander</h2><ChevronLink onClick={() => go('space')} /></div><div className="grid gap-3 sm:grid-cols-3"><Quick onClick={() => go('space')} icon={<CalendarHeart />} text="Our memories"/><Quick onClick={() => go('timeline')} icon={<ArrowRight />} text="Our timeline"/><Quick onClick={() => go('music')} icon={<Sparkles />} text="Our soundtrack"/></div></section>
  </div>;
}
function Stat({ icon, value, label }: { icon: string; value: string; label: string }) { return <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"><div className="text-2xl text-primary">{icon}</div><div className="mt-1 truncate text-2xl font-bold">{value}</div><div className="text-xs text-muted-foreground">{label}</div></div>; }
function Quick({ onClick, icon, text }: { onClick: () => void; icon: ReactNode; text: string }) { return <button type="button" onClick={onClick} className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:bg-accent"><div className="mb-3 text-primary">{icon}</div><div className="font-bold">{text}</div></button>; }
function ChevronLink({ onClick }: { onClick: () => void }) { return <button type="button" onClick={onClick} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">open <ArrowRight className="size-4" /></button>; }
