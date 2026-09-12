import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Clock3, Compass, Heart, Home as HomeIcon, ListMusic, Menu, Moon, Settings, Sparkles, Sun, X } from 'lucide-react';
import { updateData, useAppData, type ThemeId } from '../../lib/store';
import Home from './screens/Home';
import OurSpace from './screens/OurSpace';
import LoveNotes from './screens/LoveNotes';
import Surprise from './screens/Surprise';
import Timeline from './screens/Timeline';
import Countdown from './screens/Countdown';
import Music from './screens/Music';
import SettingsScreen from './screens/SettingsScreen';

export type ScreenId = 'home' | 'space' | 'notes' | 'surprise' | 'timeline' | 'countdown' | 'music' | 'settings';
type NavIcon = typeof HomeIcon;
const NAV: Array<[ScreenId, string, NavIcon | null]> = [
  ['home', 'Home', HomeIcon], ['space', 'Our Space', Heart], ['notes', 'Notes', Sparkles], ['surprise', 'Surprise', null],
  ['timeline', 'Timeline', Compass], ['countdown', 'Countdown', Clock3], ['music', 'Music', ListMusic], ['settings', 'Settings', Settings],
];

const THEME_STYLES: Record<ThemeId, CSSProperties> = {
  rose: { '--primary': 'oklch(0.70 0.12 12)', '--ring': 'oklch(0.70 0.12 12)' } as CSSProperties,
  terracotta: { '--primary': 'oklch(0.62 0.13 42)', '--ring': 'oklch(0.62 0.13 42)' } as CSSProperties,
  sage: { '--primary': 'oklch(0.55 0.09 145)', '--ring': 'oklch(0.55 0.09 145)' } as CSSProperties,
  lavender: { '--primary': 'oklch(0.63 0.13 305)', '--ring': 'oklch(0.63 0.13 305)' } as CSSProperties,
};

export default function App() {
  const data = useAppData();
  const [screen, setScreen] = useState<ScreenId>('home');
  const [menu, setMenu] = useState(false);
  const s = data.settings;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', s.darkMode);
  }, [s.darkMode]);

  const bgClass = useMemo(() => s.background === 'dots' ? 'bg-dots' : s.background === 'paper' ? 'bg-paper' : '', [s.background]);
  const themeStyle = THEME_STYLES[s.themeId] ?? THEME_STYLES.rose;
  const go = (id: ScreenId) => { setScreen(id); setMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return <div style={themeStyle} className={`min-h-screen bg-background text-foreground ${bgClass}`}>
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <button type="button" onClick={() => go('home')} className="min-w-0 text-left">
          <div className="truncate font-display text-xl font-bold">{s.siteTitle}</div>
          <div className="text-xs text-muted-foreground">a tiny corner for two</div>
        </button>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([id, label, Icon]) => <button type="button" key={id} onClick={() => go(id)} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${screen === id ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent'}`}>
            {Icon ? <Icon className="mr-1 inline size-4" /> : <span className="mr-1">🎁</span>}{label}
          </button>)}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Toggle dark mode" onClick={() => updateData(d => ({ ...d, settings: { ...d.settings, darkMode: !d.settings.darkMode } }))} className="rounded-xl p-2 hover:bg-accent">
            {s.darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button type="button" aria-label="Open menu" className="rounded-xl p-2 hover:bg-accent md:hidden" onClick={() => setMenu(v => !v)}>{menu ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {menu && <div className="border-t border-border bg-background p-3 md:hidden">
        {NAV.map(([id, label, Icon]) => <button type="button" key={id} onClick={() => go(id)} className={`mb-1 block w-full rounded-xl px-3 py-2 text-left font-semibold ${screen === id ? 'bg-accent text-primary' : 'hover:bg-accent'}`}>
          {Icon ? <Icon className="mr-2 inline size-4" /> : <span className="mr-2">🎁</span>}{label}
        </button>)}
      </div>}
    </header>

    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      {screen === 'home' && <Home go={go} />}
      {screen === 'space' && <OurSpace />}
      {screen === 'notes' && <LoveNotes />}
      {screen === 'surprise' && <Surprise />}
      {screen === 'timeline' && <Timeline />}
      {screen === 'countdown' && <Countdown />}
      {screen === 'music' && <Music />}
      {screen === 'settings' && <SettingsScreen />}
    </main>

    <footer className="border-t border-border bg-background/80"><div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">made by hand, for one person only · © 2026</div></footer>
  </div>;
}
