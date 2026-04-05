'use client';

import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1" />
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <div className="mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2030%2C%202026%2C%2001_20_34%20PM-hLM1HbFH1QK8sldUXdlA1UOtsvIO5B.png"
                alt="CarConnect Ltd Logo"
                className="h-32 w-auto mx-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.home.title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.home.subtitle}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Terms Card */}
            <Link href="/terms">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-blue-600">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.home.termsTitle}</h2>
                <p className="text-gray-600 mb-4">
                  {t.home.termsDesc}
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  {t.home.viewTerms}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Privacy Card */}
            <Link href="/privacy">
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-green-600">
                <div className="mb-4">
                  <div className="inline-block p-3 bg-green-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.home.privacyTitle}</h2>
                <p className="text-gray-600 mb-4">
                  {t.home.privacyDesc}
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  {t.home.viewPolicy}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 text-center text-gray-600">
          <p>{t.common.copyright}</p>
        </footer>
      </div>
    </main>
  );
}
