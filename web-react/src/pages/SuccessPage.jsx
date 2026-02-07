import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import TrustBadge from '../components/TrustBadge';
import { useTheme } from '../hooks/useTheme';

const CONFETTI_COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

export default function SuccessPage() {
    const { toggleTheme } = useTheme();
    const [userName, setUserName] = useState('');
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        const name = localStorage.getItem('osa-hr-user-name');
        setUserName(name || '');

        // Create confetti
        setTimeout(() => {
            const count = window.innerWidth < 640 ? 40 : 60;
            const pieces = [];

            for (let i = 0; i < count; i++) {
                pieces.push({
                    id: i,
                    left: `${Math.random() * 100}%`,
                    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                    delay: `${Math.random() * 0.8}s`,
                    duration: `${Math.random() * 2 + 2}s`,
                    width: `${Math.random() * 6 + 6}px`,
                    height: `${Math.random() * 6 + 6}px`,
                });
            }

            setConfetti(pieces);

            setTimeout(() => setConfetti([]), 5000);
        }, 400);
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans antialiased overflow-x-hidden transition-colors duration-500
                     bg-slate-50 text-slate-800 selection:bg-[#2b4bee]/20
                     dark:bg-[#0a0b0f] dark:text-white dark:selection:bg-[#2b4bee]/30">

            {/* Confetti Container */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {confetti.map((piece) => (
                    <div
                        key={piece.id}
                        className="confetti-piece"
                        style={{
                            left: piece.left,
                            backgroundColor: piece.color,
                            animationDelay: piece.delay,
                            animationDuration: piece.duration,
                            width: piece.width,
                            height: piece.height,
                        }}
                    />
                ))}
            </div>

            <AnimatedBackground variant="success" />

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:p-6">
                <Logo />

                {/* Success Card */}
                <div className="w-full max-w-[380px] sm:max-w-[440px] animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                    <div className="glass-card w-full h-full rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] 
                                p-8 sm:p-10 relative overflow-hidden transition-all duration-500
                                bg-white/85
                                dark:bg-[rgba(26,27,35,0.9)]">

                        <ThemeToggle onClick={toggleTheme} />

                        {/* Success Content */}
                        <div className="text-center">
                            {/* Animated Check Icon */}
                            <div
                                className="check-circle w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 sm:mb-8 rounded-full flex items-center justify-center
                                        bg-gradient-to-br from-green-500/20 to-emerald-500/10
                                        dark:from-green-500/30 dark:to-emerald-500/20"
                                style={{ animationDelay: '0.2s' }}
                            >
                                <span
                                    className="material-symbols-outlined text-green-500 text-6xl sm:text-7xl"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    check_circle
                                </span>
                            </div>

                            {/* Heading */}
                            <h1
                                className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s forwards', opacity: 0 }}
                            >
                                Yay!!! 🎉
                            </h1>

                            {/* Message */}
                            <p
                                className="text-lg sm:text-xl mb-2 text-slate-500 dark:text-gray-300"
                                style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s forwards', opacity: 0 }}
                            >
                                You logged in successfully
                            </p>

                            <p
                                className="text-sm sm:text-base font-semibold text-[#2b4bee]"
                                style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s forwards', opacity: 0 }}
                            >
                                {userName ? `Welcome, ${userName}!` : 'Welcome to OSA HR Solutions!'}
                            </p>

                            {/* Back to Login Button */}
                            <Link
                                to="/"
                                className="mt-8 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#2b4bee] to-[#3d5afe] hover:from-[#3d5afe] hover:to-[#2b4bee] text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#2b4bee]/20 active:scale-[0.98]"
                                style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s forwards', opacity: 0 }}
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                <span>Back to Login</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <TrustBadge delay="0.8s" />
            </main>
        </div>
    );
}
