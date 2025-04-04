'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [text, setText] = useState('');

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

          <div className="flex justify-center">
            {text && (
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <QRCodeSVG
                  value={text}
                  size={256}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
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
