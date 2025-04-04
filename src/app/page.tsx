'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export default function Home() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('H');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">QR Code Generator</h1>
          <p className="text-gray-600">Enter your text below to generate a QR code</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 text-gray-900"
              aria-label="Text to convert to QR code"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Size (px): {size}
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
                  Error Correction Level
                </label>
                <select
                  id="errorLevel"
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as ErrorCorrectionLevel)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="qrColor" className="block text-sm font-medium text-gray-700">
                  QR Code Color
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
                  Background Color
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
              QR code will appear here once you enter some text
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
