export default function Logo() {
    return (
        <div className="mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3 animate-[fadeIn_0.6s_ease-out_forwards]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 text-[#2b4bee] drop-shadow-lg">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                OSA HR Solutions
            </h2>
        </div>
    );
}
