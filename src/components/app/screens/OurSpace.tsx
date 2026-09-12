import { useState } from "react";
import {
  CalendarHeart,
  ImagePlus,
  Laugh,
  MapPin,
  Music2,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  Check,
  X,
  Compass,
} from "lucide-react";
import { formatDate, makeId, updateData, useAppData, type ImportantDate, type Photo } from "../../../lib/store";
import { Field, GhostButton, IconAction, SectionHeading, StringListEditor, inputClass } from "../../ui";

export default function OurSpace() {
  const data = useAppData();
  const { photos, memories, importantDates, insideJokes, places, plans } = data;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground">Our Space</h1>
        <p className="text-muted-foreground">
          everything that's ours — the photos, the jokes nobody else gets, the plans we keep making at 1 a.m.
        </p>
      </div>

      {/* photos */}
      <section id="photos">
        <SectionHeading title="Photos" subtitle="tap the pencil to fix my terrible captions." icon={ImagePlus} />
        <PhotoEditor photos={photos} />
      </section>

      {/* memories */}
      <section id="memories">
        <SectionHeading title="Memories" subtitle="the ones I replay when you're being annoying (so, always)." icon={Sparkles} />
        <StringListEditor
          items={memories.map((m) => m.text)}
          onChange={(strs) => updateData((d) => ({ ...d, memories: strs.map((text, i) => ({ id: d.memories[i]?.id ?? makeId(), text })) }))}
          addLabel="Add a memory"
          placeholder="that time when…"
          emptyText="no memories written down yet. go make some, then come back."
        />
      </section>

      {/* important dates */}
      <section id="important-dates">
        <SectionHeading title="Important dates" subtitle="these also feed the Countdown page." icon={CalendarHeart} />
        <ImportantDatesEditor dates={importantDates} />
      </section>

      {/* inside jokes */}
      <section id="inside-jokes">
        <SectionHeading title="Inside jokes" subtitle="legally binding. neither of us can retire these." icon={Laugh} />
        <StringListEditor
          items={insideJokes.map((j) => j.text)}
          onChange={(strs) => updateData((d) => ({ ...d, insideJokes: strs.map((text, i) => ({ id: d.insideJokes[i]?.id ?? makeId(), text })) }))}
          addLabel="Add a joke"
          placeholder="the time you called it…"
          emptyText="no inside jokes yet? that's concerning. fix it."
        />
      </section>

      {/* our songs */}
      <section id="our-songs">
        <SectionHeading title="Our songs" subtitle="the full soundtrack lives in the Music tab." icon={Music2} />
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          {data.tracks.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">no songs yet. add some in the Music tab.</p>
          ) : (
            <ul className="space-y-2">
              {data.tracks.map((t) => (
                <li key={t.id} className="flex items-center gap-3 text-sm">
                  <span className="text-primary">♪</span>
                  <span className="font-semibold text-foreground">{t.title}</span>
                  <span className="text-muted-foreground">— {t.artist}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted-foreground">→ open the Music tab to add Spotify links and covers.</p>
        </div>
      </section>

      {/* places */}
      <section id="our-places">
        <SectionHeading title="Our places" subtitle="coordinates of us." icon={MapPin} />
        <StringListEditor
          items={places.map((p) => p.text)}
          onChange={(strs) => updateData((d) => ({ ...d, places: strs.map((text, i) => ({ id: d.places[i]?.id ?? makeId(), text })) }))}
          addLabel="Add a place"
          placeholder="the place where we always…"
          emptyText="no places yet. even the chai tapri counts."
        />
      </section>

      {/* future plans */}
      <section id="future-plans">
        <SectionHeading title="Future plans" subtitle="the official backlog of us." icon={Compass} />
        <StringListEditor
          items={plans.map((p) => p.text)}
          onChange={(strs) => updateData((d) => ({ ...d, plans: strs.map((text, i) => ({ id: d.plans[i]?.id ?? makeId(), text })) }))}
          addLabel="Add a plan"
          placeholder="one day we will…"
          emptyText="no plans yet. dream bigger, then write it down."
        />
      </section>
    </div>
  );
}

/* -------------------------------- photos ---------------------------------- */

function PhotoEditor({ photos }: { photos: Photo[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ url: "", caption: "" });
  const [adding, setAdding] = useState(false);

  const startEdit = (p: Photo) => {
    setEditingId(p.id);
    setDraft({ url: p.url, caption: p.caption });
  };

  const save = () => {
    updateData((d) => ({
      ...d,
      photos: d.photos.map((p) => (p.id === editingId ? { ...p, url: draft.url.trim() || p.url, caption: draft.caption.trim() } : p)),
    }));
    setEditingId(null);
  };

  const add = () => {
    if (!draft.url.trim()) return;
    updateData((d) => ({ ...d, photos: [...d.photos, { id: makeId(), url: draft.url.trim(), caption: draft.caption.trim() || "untitled moment" }] }));
    setDraft({ url: "", caption: "" });
    setAdding(false);
  };

  const remove = (id: string) => updateData((d) => ({ ...d, photos: d.photos.filter((p) => p.id !== id) }));

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p, i) => (
          <figure
            key={p.id}
            className={
              "group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform " +
              (i % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]") +
              " hover:rotate-0 hover:shadow-md"
            }
          >
            <img src={p.url} alt={p.caption} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <figcaption className="p-3">
              {editingId === p.id ? (
                <div className="space-y-2">
                  <input className={inputClass} value={draft.url} placeholder="Photo URL" onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
                  <textarea className={inputClass + " resize-none"} rows={2} value={draft.caption} placeholder="Caption" onChange={(e) => setDraft({ ...draft, caption: e.target.value })} />
                  <div className="flex gap-1">
                    <IconAction icon={Check} label="Save" onClick={save} />
                    <IconAction icon={X} label="Cancel" onClick={() => setEditingId(null)} />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-1">
                  <p className="flex-1 text-xs text-muted-foreground">{p.caption}</p>
                  <span className="flex shrink-0 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                    <IconAction icon={Pencil} label="Edit caption" onClick={() => startEdit(p)} />
                    <IconAction icon={Trash2} label="Remove photo" onClick={() => remove(p.id)} danger />
                  </span>
                </div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      {adding ? (
        <div className="mt-4 space-y-2 rounded-2xl border border-ring bg-card p-4">
          <Field label="Photo URL">
            <input className={inputClass} value={draft.url} placeholder="https://…" onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
          </Field>
          <Field label="Caption">
            <input className={inputClass} value={draft.caption} placeholder="what's happening here?" onChange={(e) => setDraft({ ...draft, caption: e.target.value })} />
          </Field>
          <div className="flex gap-2">
            <GhostButton onClick={add}>
              <Check className="size-4" /> Add photo
            </GhostButton>
            <GhostButton onClick={() => { setAdding(false); setDraft({ url: "", caption: "" }); }}>Cancel</GhostButton>
          </div>
        </div>
      ) : (
        <GhostButton className="mt-4" onClick={() => setAdding(true)}>
          <Plus className="size-4" /> Add a photo
        </GhostButton>
      )}
    </div>
  );
}

/* ----------------------------- important dates ---------------------------- */

function ImportantDatesEditor({ dates }: { dates: ImportantDate[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ label: "", date: "", emoji: "✨", repeats: true });
  const [adding, setAdding] = useState(false);

  const startEdit = (d: ImportantDate) => {
    setEditingId(d.id);
    setDraft({ label: d.label, date: d.date, emoji: d.emoji, repeats: d.repeats });
  };

  const form = (onDone: () => void, saveFn: () => void) => (
    <div className="space-y-2 rounded-2xl border border-ring bg-card p-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Field label="Emoji">
          <input className={inputClass} maxLength={4} value={draft.emoji} onChange={(e) => setDraft({ ...draft, emoji: e.target.value })} />
        </Field>
        <Field label="Date">
          <input type="date" className={inputClass} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        </Field>
        <div className="col-span-2 sm:col-span-2">
          <Field label="What is it">
            <input className={inputClass} value={draft.label} placeholder="Our anniversary" onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
          </Field>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={draft.repeats}
          onChange={(e) => setDraft({ ...draft, repeats: e.target.checked })}
          className="size-4 accent-primary"
        />
        happens every year
      </label>
      <div className="flex gap-2">
        <GhostButton onClick={saveFn}>
          <Check className="size-4" /> Save
        </GhostButton>
        <GhostButton onClick={onDone}>Cancel</GhostButton>
      </div>
    </div>
  );

  const saveEdit = () => {
    if (!draft.label.trim() || !draft.date) return;
    updateData((d) => ({
      ...d,
      importantDates: d.importantDates.map((x) => (x.id === editingId ? { ...x, label: draft.label.trim(), date: draft.date, emoji: draft.emoji || "✨", repeats: draft.repeats } : x)),
    }));
    setEditingId(null);
  };

  const add = () => {
    if (!draft.label.trim() || !draft.date) return;
    updateData((d) => ({
      ...d,
      importantDates: [...d.importantDates, { id: makeId(), label: draft.label.trim(), date: draft.date, emoji: draft.emoji || "✨", repeats: draft.repeats }],
    }));
    setDraft({ label: "", date: "", emoji: "✨", repeats: true });
    setAdding(false);
  };

  const remove = (id: string) => updateData((d) => ({ ...d, importantDates: d.importantDates.filter((x) => x.id !== id) }));

  return (
    <div className="space-y-2">
      {dates.length === 0 && !adding && (
        <p className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground italic">
          no dates yet. even 'the day we first ordered too much food' counts.
        </p>
      )}
      {dates.map((d) =>
        editingId === d.id ? (
          <div key={d.id}>{form(() => setEditingId(null), saveEdit)}</div>
        ) : (
          <div key={d.id} className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
            <span className="text-xl">{d.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{d.label}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(d.date)}{d.repeats ? " · every year" : ""}
              </p>
            </div>
            <span className="flex shrink-0 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
              <IconAction icon={Pencil} label="Edit date" onClick={() => startEdit(d)} />
              <IconAction icon={Trash2} label="Remove date" onClick={() => remove(d.id)} danger />
            </span>
          </div>
        )
      )}
      {adding ? (
        form(
          () => { setAdding(false); setDraft({ label: "", date: "", emoji: "✨", repeats: true }); },
          add
        )
      ) : (
        <GhostButton onClick={() => { setDraft({ label: "", date: "", emoji: "✨", repeats: true }); setAdding(true); }}>
          <Plus className="size-4" /> Add a date
        </GhostButton>
      )}
    </div>
  );
}
