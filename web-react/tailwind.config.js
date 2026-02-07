/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2b4bee',
                'primary-hover': '#3d5afe',
                'bg-light': '#f8fafc',
                'bg-dark': '#0a0b0f',
                'surface-light': 'rgba(255, 255, 255, 0.85)',
                'surface-dark': 'rgba(26, 27, 35, 0.9)',
                'input-light': '#f1f5f9',
                'input-dark': '#12131a',
                'border-light': '#e2e8f0',
                'border-dark': '#2a2d3a',
                'text-light': '#1e293b',
                'text-muted-light': '#64748b',
                'text-muted': '#8b8fa3',
                'accent-violet': '#8b5cf6',
                'accent-cyan': '#06b6d4',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 25px -5px rgba(43, 75, 238, 0.5)',
                'glow-lg': '0 0 40px -8px rgba(43, 75, 238, 0.6)',
                'card-light': '0 8px 32px -8px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(0, 0, 0, 0.06)',
                'card-dark': '0 8px 32px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                'glow-success': '0 0 40px -8px rgba(34, 197, 94, 0.5)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'bounce-in': 'bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'check-draw': 'checkDraw 0.6s ease-out forwards',
                'spin': 'spin 0.8s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                slideUp: {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { transform: 'scale(1.08)' },
                    '70%': { transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 30px -5px rgba(34, 197, 94, 0.4)' },
                    '50%': { boxShadow: '0 0 50px -5px rgba(34, 197, 94, 0.7)' },
                },
                checkDraw: {
                    '0%': { strokeDashoffset: '100' },
                    '100%': { strokeDashoffset: '0' },
                },
                spin: {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
}
