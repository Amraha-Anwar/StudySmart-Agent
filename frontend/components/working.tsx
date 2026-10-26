interface WorkingProps {
  title: string;
  detail: string;
}

// Loading state for the slow AI calls: says what is happening and roughly how long it takes
export function Working({ title, detail }: WorkingProps) {
  return (
    <div role="status" aria-live="polite" className="lift rounded-xl bg-sheet p-6 text-ink sm:p-8">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-ink-soft">{detail}</p>
      <div className="mt-6 h-1 overflow-hidden rounded-full bg-ink/10">
        <div className="working-bar h-full w-2/5 rounded-full bg-parrot shadow-[0_0_12px_rgba(116,214,76,0.9)]" />
      </div>
    </div>
  );
}
