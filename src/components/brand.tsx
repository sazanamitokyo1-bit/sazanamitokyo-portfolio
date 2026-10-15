import type { CSSProperties } from 'react';

export function Brand() {
  let index = 0;
  return <a href="#" aria-label="SAZANAMI TOKYO ホーム" className="brand">
    {['SAZANAMI', 'TOKYO.'].map(word => <span className="brand-line" aria-hidden="true" key={word}>
      {Array.from(word).map((letter, i) => <span className="brand-letter" key={i} style={{ '--letter-index': index++ } as CSSProperties}>
        <span className={`brand-glyph${letter === '.' ? ' brand-dot' : ''}`}>{letter}</span>
      </span>)}
    </span>)}
  </a>;
}
