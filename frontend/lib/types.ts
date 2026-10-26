export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

// Strips a leading "A. " / "B) " label and normalizes case/whitespace
const stripLabel = (text: string) =>
  text.replace(/^\s*[a-d]\s*[.)]\s*/i, "").trim().toLowerCase();

// Returns the option the answer refers to, whether the model gave the full
// option text ("C. Paris"), just the letter ("C"), or the text without its label ("Paris")
export function resolveAnswer(q: QuizQuestion): string {
  const normalized = q.answer.trim().toLowerCase();
  const exact = q.options.find((o) => o.trim().toLowerCase() === normalized);
  if (exact) return exact;

  const letter = normalized.match(/^([a-d])\s*[.)]?$/);
  if (letter) {
    const option = q.options[letter[1].charCodeAt(0) - "a".charCodeAt(0)];
    if (option) return option;
  }

  return q.options.find((o) => stripLabel(o) === stripLabel(q.answer)) ?? q.answer;
}
