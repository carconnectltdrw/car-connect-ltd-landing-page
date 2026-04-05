'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function Terms() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/LegalTerms"
            className="inline-flex items-center text-blue-100 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.common.backToHome}
          </Link>
          <h1 className="text-4xl font-bold mb-2">{t.terms.title}</h1>
          <p className="text-blue-100">{t.common.effectiveDate}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-800 leading-relaxed">
              {t.terms.intro}
            </p>
            <p className="text-gray-800 leading-relaxed mt-4">
              {t.terms.intro2}
            </p>
          </div>

          {/* Sections with circular numbers */}
          {t.terms.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full text-base font-bold mr-4 flex-shrink-0 shadow-md">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {t.common.copyright}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}