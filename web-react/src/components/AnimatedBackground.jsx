export default function AnimatedBackground({ variant = 'default' }) {
    const isSuccess = variant === 'success';

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Floating Blobs */}
            <div className={`floating-blob absolute -top-20 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] 
                        ${isSuccess
                    ? 'bg-gradient-to-br from-green-500/10 via-cyan-500/5 to-transparent dark:from-green-500/15 dark:via-cyan-500/10'
                    : 'bg-gradient-to-br from-[#2b4bee]/10 via-violet-500/5 to-transparent dark:from-[#2b4bee]/20 dark:via-violet-500/10'
                } 
                        rounded-full blur-[100px] sm:blur-[150px]`}></div>
            <div className={`floating-blob-delayed absolute -bottom-20 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] 
                        ${isSuccess
                    ? 'bg-gradient-to-tl from-violet-500/10 via-green-500/5 to-transparent dark:from-violet-500/15 dark:via-green-500/10'
                    : 'bg-gradient-to-tl from-violet-500/10 via-cyan-500/5 to-transparent dark:from-violet-500/15 dark:via-cyan-500/10'
                }
                        rounded-full blur-[80px] sm:blur-[120px]`}></div>
            {!isSuccess && (
                <div className="floating-blob absolute top-1/2 -right-20 w-[300px] h-[300px] 
                            bg-gradient-to-bl from-cyan-500/5 to-transparent
                            dark:from-cyan-500/10
                            rounded-full blur-[80px] opacity-60"></div>
            )}
        </div>
    );
}
