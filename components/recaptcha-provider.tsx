'use client';

import React from 'react';
import { GoogleReCaptchaProvider as Provider } from 'react-google-recaptcha-v3';

export function GoogleReCaptchaProvider({
  children,
  reCaptchaKey,
}: {
  children: React.ReactNode;
  reCaptchaKey: string;
}) {
  return (
    <Provider reCaptchaKey={reCaptchaKey}>
      {children}
    </Provider>
  );
}
