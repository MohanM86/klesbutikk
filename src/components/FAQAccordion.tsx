'use client';
import { useState } from 'react';

interface FAQ { question: string; answer: string; }

export default function FAQAccordion({ faqs, title }: { faqs: FAQ[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      {title && (
        <div className="mb-8">
          <p className="overline mb-2">Spørsmål og svar</p>
          <h2 className="font-body text-display-sm font-extrabold md:text-display text-charcoal">{title}</h2>
        </div>
      )}
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className={`border rounded-lg overflow-hidden transition-colors ${openIndex === i ? 'border-accent/20 bg-accent-light/30' : 'border-border bg-cream'}`}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left group">
              <h3 className="font-body text-sm md:text-base font-bold text-charcoal pr-8 group-hover:text-accent transition-colors">
                {faq.question}
              </h3>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${openIndex === i ? 'bg-accent rotate-45' : 'bg-surface'}`}>
                <svg className={`w-4 h-4 ${openIndex === i ? 'text-white' : 'text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-5 px-5' : 'max-h-0'}`}>
              <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
