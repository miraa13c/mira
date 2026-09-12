import type { ComponentType, ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const inputClass = 'w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring';

export function SectionHeading({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: ComponentType<{ className?: string }> }) {
  return <div className="mb-4 flex items-start gap-3">
    {Icon && <div className="mt-0.5 rounded-xl bg-accent p-2 text-primary"><Icon className="size-5" /></div>}
    <div><h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}</div>
  </div>;
}

export function SoftButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return <button type="button" onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}>{children}</button>;
}

export function GhostButton({ children, onClick, className = '', type = 'button' }: { children: ReactNode; onClick?: () => void; className?: string; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent ${className}`}>{children}</button>;
}

export function IconAction({ icon: Icon, label, onClick, danger = false }: { icon: ComponentType<{ className?: string }>; label: string; onClick: () => void; danger?: boolean }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className={`rounded-lg p-2 transition hover:bg-accent ${danger ? 'text-destructive' : 'text-muted-foreground'}`}><Icon className="size-4" /></button>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block space-y-1.5"><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>{children}</label>;
}

export function StringListEditor({ items, onChange, addLabel, placeholder, emptyText }: { items: string[]; onChange: (items: string[]) => void; addLabel: string; placeholder: string; emptyText: string }) {
  return <div className="space-y-2">
    {items.length === 0 && <p className="rounded-xl border border-dashed border-border px-4 py-3 text-sm italic text-muted-foreground">{emptyText}</p>}
    {items.map((item, i) => <div className="flex gap-2" key={`${i}-${item.slice(0, 8)}`}>
      <input className={inputClass} value={item} placeholder={placeholder} onChange={e => { const next = [...items]; next[i] = e.target.value; onChange(next); }} />
      <button type="button" aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded-xl border border-border px-3 text-muted-foreground hover:bg-accent"><Trash2 className="size-4" /></button>
    </div>)}
    <GhostButton onClick={() => onChange([...items, ''])}><Plus className="size-4" />{addLabel}</GhostButton>
  </div>;
}
