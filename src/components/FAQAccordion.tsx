'use client';
import { useState } from 'react';

interface FAQ { question: string; answer: string; }

export default function FAQAccordion({ faqs, title }: { faqs: FAQ[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      {title && (
        <div className="mb-6">
          <h2 className="font-body text-display-sm md:text-display font-extrabold text-black">{title}</h2>
        </div>
      )}
      <div>
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left group">
              <h3 className="font-body text-sm font-semibold text-black pr-8 group-hover:text-accent transition-colors">{faq.question}</h3>
              <svg className={'w-3.5 h-3.5 flex-shrink-0 text-muted transition-transform duration-200 ' + (openIndex === i ? 'rotate-180 text-accent' : '')}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 9l6 6 6-6" /></svg>
            </button>
            <div className={'overflow-hidden transition-all duration-300 ' + (openIndex === i ? 'max-h-96 pb-4' : 'max-h-0')}>
              <p className="font-body text-[13px] text-slate leading-relaxed max-w-2xl">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
