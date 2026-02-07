export default function TrustBadge({ delay = '0.5s' }) {
    return (
        <div
            className="mt-6 sm:mt-8 flex items-center gap-2 opacity-70 text-slate-500 dark:text-slate-400"
            style={{ animation: `fadeIn 0.6s ease-out ${delay} forwards`, opacity: 0 }}
        >
            <span className="material-symbols-outlined text-[14px] sm:text-[16px]">verified_user</span>
            <span className="text-[10px] sm:text-xs font-medium">Secured by OSA HR Solutions Enterprise</span>
        </div>
    );
}
