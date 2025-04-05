'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const languages = {
  en: { flag: '🇬🇧', name: 'English' },
  cs: { flag: '🇨🇿', name: 'Čeština' }
};

async function loadMessages(locale: string) {
  return (await import(`../messages/${locale}.json`)).default;
}

export default function Home() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [currentLang, setCurrentLang] = useState<'en' | 'cs'>('en');
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    loadMessages(currentLang).then(setMessages);
  }, [currentLang]);

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'cs' : 'en');
  };

  if (!messages) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 relative">
          <div className="absolute right-0 top-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Switch language"
            >
              <span className="text-xl" role="img" aria-label={languages[currentLang].name}>
                {languages[currentLang].flag}
              </span>
              <span className="text-sm font-medium text-gray-600">{languages[currentLang].name}</span>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{messages.title}</h1>
          <p className="text-gray-600">{messages.subtitle}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={messages.input.placeholder}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 text-gray-900"
              aria-label={messages.input.aria_label}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  {messages.settings.size} {size}
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
                  {messages.settings.errorLevel.label}
                </label>
                <select
                  id="errorLevel"
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="L">{messages.settings.errorLevel.low}</option>
                  <option value="M">{messages.settings.errorLevel.medium}</option>
                  <option value="Q">{messages.settings.errorLevel.quartile}</option>
                  <option value="H">{messages.settings.errorLevel.high}</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="qrColor" className="block text-sm font-medium text-gray-700">
                  {messages.settings.colors.qr}
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
                  {messages.settings.colors.background}
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
              {messages.empty_state}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
