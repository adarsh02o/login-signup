const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PASSWORD_MIN_LENGTH = 8;

export const STRENGTH_CONFIG = {
    colors: {
        weak: 'bg-gradient-to-r from-red-500 to-orange-500',
        fair: 'bg-gradient-to-r from-orange-500 to-yellow-500',
        good: 'bg-gradient-to-r from-yellow-500 to-green-400',
        strong: 'bg-gradient-to-r from-green-400 to-emerald-500',
    },
    labels: {
        weak: { text: 'Weak', class: 'text-orange-400' },
        fair: { text: 'Fair', class: 'text-yellow-400' },
        good: { text: 'Good', class: 'text-green-400' },
        strong: { text: 'Strong', class: 'text-emerald-400' },
    },
    glowShadow: {
        weak: 'shadow-[0_0_8px_rgba(239,68,68,0.6)]',
        fair: 'shadow-[0_0_8px_rgba(234,179,8,0.6)]',
        good: 'shadow-[0_0_8px_rgba(74,222,128,0.6)]',
        strong: 'shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    }
};

export function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { valid: false, message: 'Email is required' };
    }
    if (!EMAIL_REGEX.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
}

export function validatePassword(password) {
    if (!password || password === '') {
        return { valid: false, message: 'Password is required' };
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
        return { valid: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
    }
    return { valid: true, message: '' };
}

export function validateName(name) {
    if (!name || name.trim() === '') {
        return { valid: false, message: 'Name is required' };
    }
    if (name.trim().length < 2) {
        return { valid: false, message: 'Please enter your full name' };
    }
    return { valid: true, message: '' };
}

export function calculatePasswordStrength(password) {
    if (!password) return { score: 0, level: 'weak' };

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const levels = ['weak', 'weak', 'fair', 'good', 'strong', 'strong'];
    return { score: Math.min(score, 4), level: levels[score] || 'weak' };
}
