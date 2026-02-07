import { usePasswordStrength } from '../hooks/usePasswordStrength';

export default function PasswordStrengthMeter({ password }) {
    const { score, level, config } = usePasswordStrength(password);

    return (
        <div className="pt-2 flex flex-col gap-1.5">
            <div className="flex gap-1.5 h-1.5 w-full">
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        className={`strength-bar h-full flex-1 rounded-full transition-all duration-300 ${index < score
                                ? `${config.colors[level]} ${config.glowShadow[level]}`
                                : 'bg-slate-200 dark:bg-slate-700 opacity-30'
                            }`}
                    ></div>
                ))}
            </div>
            <div className="flex justify-between items-center px-0.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Strength
                </span>
                <span className={`text-[10px] font-semibold ${config.labels[level]?.class || 'text-slate-500 dark:text-slate-400'}`}>
                    {password ? config.labels[level].text : ''}
                </span>
            </div>
        </div>
    );
}
