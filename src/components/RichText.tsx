import { Fragment } from 'react';

/**
 * Minimal inline formatter: `code`, **bold**, and line breaks.
 * Keeps content data readable without pulling in a markdown parser.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const lines = text.split('\n');
  return (
    <span className={className}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code
                  key={index}
                  className="mx-0.5 rounded-md border border-line/70 bg-soft px-1.5 py-0.5 font-mono text-[0.86em] text-ink"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={index} className="font-semibold text-ink">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <Fragment key={index}>{part}</Fragment>;
          })}
        </Fragment>
      ))}
    </span>
  );
}
