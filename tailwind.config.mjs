/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2563EB', 
                secondary: '#fff', 
                third: '#2563EB', 
                fourth: '#000',
                five: '#6b7280',
                six: '#e5e7eb',
                dark: {
                    primary: '#111827',
                    secondary: '#fff',
                    third: '#73c0fc',
                    fourth: '#00a7eb',
                    five: '#9ca3af',
                    six: '#374151',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
