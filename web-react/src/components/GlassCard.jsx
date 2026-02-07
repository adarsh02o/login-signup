export default function GlassCard({ children, className = '' }) {
    return (
        <div className={`gradient-border-container w-full max-w-[400px] sm:max-w-[440px] animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] ${className}`}>
            <div className="gradient-border"></div>
            <div className="glass-card w-full h-full rounded-2xl 
                           shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.06)] 
                           dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] 
                           p-6 sm:p-8 relative overflow-hidden transition-all duration-500
                           bg-white/85
                           dark:bg-[rgba(26,27,35,0.9)]">
                {children}
            </div>
        </div>
    );
}
