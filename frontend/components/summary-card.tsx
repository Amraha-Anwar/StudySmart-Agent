import React from "react";

interface SummaryCardProps {
  summary: string;
}

type Block =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

// Splits the model's markdown into headings, paragraphs and lists
function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);

    if (!line) {
      flushParagraph();
    } else if (heading) {
      flushParagraph();
      blocks.push({ kind: "heading", text: heading[1] });
    } else if (bullet || numbered) {
      flushParagraph();
      const kind = bullet ? "ul" : "ol";
      const text = (bullet ?? numbered)![1];
      const last = blocks[blocks.length - 1];
      if (last && last.kind === kind) last.items.push(text);
      else blocks.push({ kind, items: [text] });
    } else {
      paragraph.push(line);
    }
  }
  flushParagraph();
  return blocks;
}

// Bold becomes a highlighter mark; italics and inline code are kept
function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (/^(\*\*|__).+(\*\*|__)$/.test(part)) return <mark key={i} className="hl">{part.slice(2, -2)}</mark>;
    if (/^`.+`$/.test(part)) return <code key={i}>{part.slice(1, -1)}</code>;
    if (/^\*.+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const blocks = parseBlocks(summary);

  return (
    <article className="ruled lift overflow-hidden rounded-xl">
      <div className="notes">
        {blocks.map((block, i) => {
          if (block.kind === "heading") return <h2 key={i}>{renderInline(block.text)}</h2>;
          if (block.kind === "paragraph") return <p key={i}>{renderInline(block.text)}</p>;
          const List = block.kind;
          return (
            <List key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </List>
          );
        })}
      </div>
    </article>
  );
}
