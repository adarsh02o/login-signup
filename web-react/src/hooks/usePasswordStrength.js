import { useMemo } from 'react';
import { calculatePasswordStrength, STRENGTH_CONFIG } from '../lib/validation';

export function usePasswordStrength(password) {
    const result = useMemo(() => {
        const { score, level } = calculatePasswordStrength(password);
        return {
            score,
            level,
            config: STRENGTH_CONFIG,
        };
    }, [password]);

    return result;
}
