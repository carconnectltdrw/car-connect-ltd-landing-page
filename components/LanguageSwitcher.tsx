'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/united-kingdom-VHPNuisfPBW3BPSkBb5sUWshnd6Y92.png' },
    { code: 'fr', label: 'Français', flag: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/france-PS8q4FjWPxl4TEkQz1LDYC8angStRX.png' },
    { code: 'rw', label: 'Kinyarwanda', flag: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rwanda-VRAYDBOHvYqX17UgSwSVDP5TjKpiz5.png' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        {currentLang && (
          <Image 
            src={currentLang.flag} 
            alt={currentLang.label}
            width={24}
            height={24}
            className="rounded-sm"
          />
        )}
        <span className="text-sm font-medium text-gray-700">{currentLang?.label}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                language === lang.code ? 'bg-blue-50 border-l-4 border-blue-600' : ''
              }`}
            >
              <Image 
                src={lang.flag} 
                alt={lang.label}
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className={language === lang.code ? 'font-semibold text-blue-600' : 'text-gray-700'}>
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}