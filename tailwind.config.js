// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // adapte selon la structure de ton projet
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3b82f6',              // bleu vif
          'primary-foreground': '#ffffff', // texte blanc sur fond primaire
          destructive: '#ef4444',          // rouge vif pour danger/destructif
          background: '#f9fafb',           // fond clair
          accent: '#6366f1',               // accent violet
          'accent-foreground': '#ffffff',  // texte blanc sur accent
          secondary: '#6b7280',            // gris foncé pour secondaire
          'secondary-foreground': '#f3f4f6', // texte clair sur secondaire
          input: '#e5e7eb',                // gris clair pour champs input
          ring: '#2563eb',                 // bleu pour anneau de focus
          destructive: '#dc2626',          // rouge plus foncé pour focus destructif
        },
        boxShadow: {
          xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        },
        borderRadius: {
          md: '0.375rem',
        },
      },
    },
    plugins: [],
  }
  