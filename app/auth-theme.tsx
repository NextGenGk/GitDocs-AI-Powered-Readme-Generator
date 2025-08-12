'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ReactNode } from 'react';

export function AuthThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          rootBox: 'w-full max-w-md mx-auto',
          card: 'bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-8',
          headerTitle: 'text-2xl font-black text-black',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-2 border-black hover:bg-black/5',
          socialButtonsBlockButtonText: 'font-bold text-black',
          dividerLine: 'bg-black',
          dividerText: 'text-black font-bold',
          formFieldLabel: 'text-black font-bold',
          formFieldInput: 'border-2 border-black rounded-none focus:ring-2 focus:ring-[#05e17a] focus:border-transparent',
          footerActionText: 'text-black',
          footerActionLink: 'text-[#05e17a] font-bold hover:text-black',
          formButtonPrimary: 'bg-black text-white hover:bg-[#05e17a] hover:text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(5,225,122,1)] transition-all',
          formFieldWarningText: 'text-amber-600',
          formFieldErrorText: 'text-red-600',
          identityPreviewEditButton: 'text-[#05e17a] hover:text-black',
        },
        variables: {
          colorPrimary: '#05e17a',
          colorText: '#000000',
          colorInputText: '#000000',
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
        },
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#f0f0f0]">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {children}
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}
