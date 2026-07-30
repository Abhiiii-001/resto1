// Design tokens extracted directly from the Client & Restaurant applications
export const emailTokens = {
  colors: {
    // Brand Primary (Orange Palette from Client HSL 24.6 95% 53.1%)
    primary: '#f97316',
    primaryDark: '#ea580c',
    primaryLight: '#ffedd5',
    primaryForeground: '#ffffff',

    // Neutral Slate Palette
    slate950: '#020817', // Dark header / main title
    slate900: '#0f172a',
    slate800: '#1e293b',
    slate700: '#334155', // Body text
    slate600: '#475569',
    slate500: '#64748b', // Muted text
    slate400: '#94a3b8',
    slate200: '#e2e8f0', // Borders
    slate100: '#f1f5f9', // Card backgrounds
    slate50: '#f8fafc',  // Page wrapper background

    // Surface & Alert Colors
    white: '#ffffff',
    emerald600: '#059669', // Success green
    emerald50: '#ecfdf5',
    amber600: '#d97706',   // Warning amber
    amber50: '#fffbe6',
    rose600: '#e11d48',    // Destructive red
    rose50: '#fff1f2',
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontFamilyMono: "'Courier New', Courier, monospace",
  },
  borders: {
    radiusSm: '6px',
    radiusMd: '8px',
    radiusLg: '12px',
    radiusXl: '16px',
    borderLight: '1px solid #e2e8f0',
    borderDark: '1px solid #1e293b',
  },
  shadows: {
    card: '0 10px 15px -3px rgba(2, 8, 23, 0.04), 0 4px 6px -4px rgba(2, 8, 23, 0.02)',
    button: '0 4px 12px rgba(249, 115, 22, 0.25)',
  },
  company: {
    name: 'Restroo',
    fullName: 'Restroo Platform Inc.',
    tagline: 'The Online Hero for Restaurant Management',
    website: process.env.CLIENT_URL,
    supportEmail: 'support@restroo.food',
    address: 'Satguru Enclave, Gurgaon, India',
  },
};
