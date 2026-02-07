export default function ThemeToggle({ onClick }) {
    return (
        <button
            id="theme-toggle"
            onClick={onClick}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-sm
                   bg-white/80 hover:bg-white border border-slate-200/50
                   dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10"
            aria-label="Toggle theme"
        >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-amber-500 dark:hidden">light_mode</span>
            <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-blue-400 hidden dark:block">dark_mode</span>
        </button>
    );
}
