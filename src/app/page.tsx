'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type Language = 'en' | 'cs';

const languages = {
  en: { flag: '🇬🇧', name: 'English' },
  cs: { flag: '🇨🇿', name: 'Čeština' }
};

export default function Home() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('H');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'cs' : 'en');
    setIsLangMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 relative">
          <div className="absolute right-0 top-0">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Switch language"
            >
              <span className="text-xl" role="img" aria-label={languages[currentLang].name}>
                {languages[currentLang].flag}
              </span>
              <span className="text-sm font-medium text-gray-600">{languages[currentLang].name}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-xl z-10">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrentLang(code as Language);
                      setIsLangMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl mr-2" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            {currentLang === 'en' ? 'QR Code Generator' : 'QR kód generátor'}
          </h1>
          <p className="text-gray-600">
            {currentLang === 'en' 
              ? 'Enter your text below to generate a QR code'
              : 'Zadejte text pro vygenerování QR kódu'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={currentLang === 'en' ? 'Enter text here...' : 'Zadejte text...'}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 text-gray-900"
              aria-label={currentLang === 'en' ? 'Text to convert to QR code' : 'Text pro převod na QR kód'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  {currentLang === 'en' ? 'Size (px):' : 'Velikost (px):'} {size}
                </label>
                <input
                  type="range"
                  id="size"
                  min="128"
                  max="512"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </div>

              <div>
                <label htmlFor="errorLevel" className="block text-sm font-medium text-gray-700">
                  {currentLang === 'en' ? 'Error Correction Level' : 'Úroveň korekce chyb'}
                </label>
                <select
                  id="errorLevel"
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as ErrorCorrectionLevel)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="L">{currentLang === 'en' ? 'Low (7%)' : 'Nízká (7%)'}</option>
                  <option value="M">{currentLang === 'en' ? 'Medium (15%)' : 'Střední (15%)'}</option>
                  <option value="Q">{currentLang === 'en' ? 'Quartile (25%)' : 'Kvartil (25%)'}</option>
                  <option value="H">{currentLang === 'en' ? 'High (30%)' : 'Vysoká (30%)'}</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="qrColor" className="block text-sm font-medium text-gray-700">
                  {currentLang === 'en' ? 'QR Code Color' : 'Barva QR kódu'}
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    id="qrColor"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="h-8 w-16"
                  />
                  <span className="text-sm text-gray-600">{qrColor}</span>
                </div>
              </div>

              <div>
                <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
                  {currentLang === 'en' ? 'Background Color' : 'Barva pozadí'}
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    id="bgColor"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-8 w-16"
                  />
                  <span className="text-sm text-gray-600">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {text && (
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <QRCodeSVG
                  value={text}
                  size={size}
                  level={errorLevel}
                  includeMargin={true}
                  className="mx-auto"
                  fgColor={qrColor}
                  bgColor={bgColor}
                />
              </div>
            )}
          </div>

          {!text && (
            <p className="text-center text-gray-500 italic">
              {currentLang === 'en' 
                ? 'QR code will appear here once you enter some text'
                : 'QR kód se zobrazí, jakmile zadáte text'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
