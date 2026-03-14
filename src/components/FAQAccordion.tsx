'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs, title }: { faqs: FAQ[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      {title && (
        <h2 className="font-display text-display-sm md:text-display font-semibold text-charcoal mb-8">
          {title}
        </h2>
      )}
      <div className="divide-y divide-border border-t border-b border-border">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <h3 className="font-display text-base md:text-lg font-medium text-charcoal pr-8 group-hover:text-slate transition-colors">
                {faq.question}
              </h3>
              <svg
                className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ${
                  openIndex === i ? 'rotate-45' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'
              }`}
            >
              <p className="font-body text-sm md:text-base text-muted leading-relaxed max-w-3xl">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
