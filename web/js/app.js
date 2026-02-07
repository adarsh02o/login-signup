import {
    validateEmail,
    validatePassword,
    validateName,
    calculatePasswordStrength,
    STRENGTH_CONFIG
} from './validation.js';

import { signUp, signIn } from './supabase.js';

const THEME_KEY = 'osa-hr-theme';

const DOM = {
    signupView: null,
    loginView: null,
    signupForm: null,
    loginForm: null,
    strengthBars: null,
    strengthLabel: null,
    themeToggle: null,
    signupSubmit: null,
    loginSubmit: null,
};

function cacheDom() {
    DOM.signupView = document.getElementById('signup-view');
    DOM.loginView = document.getElementById('login-view');
    DOM.signupForm = document.getElementById('signup-form');
    DOM.loginForm = document.getElementById('login-form');
    DOM.strengthBars = document.querySelectorAll('.strength-bar');
    DOM.strengthLabel = document.getElementById('strength-label');
    DOM.themeToggle = document.getElementById('theme-toggle');
    DOM.signupSubmit = document.getElementById('signup-submit');
    DOM.loginSubmit = document.getElementById('login-submit');
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleTheme() {
    document.documentElement.classList.add('theme-transitioning');
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');

    // Remove transition class after animation
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
    }, 500);
}

function showView(viewId) {
    [DOM.signupView, DOM.loginView].forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('view-transition');
    });

    const targetView = document.getElementById(viewId);
    targetView.classList.remove('hidden');
    targetView.classList.add('view-transition');
}

function showError(input, message) {
    const container = input.closest('.space-y-1\\.5') || input.closest('div');
    const errorEl = container.querySelector('.error-msg');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
    input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-border-light', 'dark:border-border-dark', 'focus:border-primary', 'focus:ring-primary');
}

function clearError(input) {
    const container = input.closest('.space-y-1\\.5') || input.closest('div');
    const errorEl = container.querySelector('.error-msg');
    if (errorEl) {
        errorEl.classList.add('hidden');
    }
    input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
}

function showFormError(formId, message) {
    let errorBanner = document.querySelector(`#${formId} .form-error-banner`);
    if (!errorBanner) {
        errorBanner = document.createElement('div');
        errorBanner.className = 'form-error-banner bg-red-500/10 border border-red-500/30 text-red-500 text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg mb-3 sm:mb-4 animate-shake';
        const form = document.getElementById(formId);
        form.insertBefore(errorBanner, form.firstChild);
    }
    errorBanner.textContent = message;
    errorBanner.classList.remove('hidden');
}

function clearFormError(formId) {
    const errorBanner = document.querySelector(`#${formId} .form-error-banner`);
    if (errorBanner) {
        errorBanner.classList.add('hidden');
    }
}

function setLoading(button, loading, originalText) {
    const text = button.querySelector('span:first-child');
    const icon = button.querySelector('.material-symbols-outlined');

    if (loading) {
        button.disabled = true;
        text.textContent = 'Please wait...';
        icon.textContent = 'hourglass_empty';
        icon.classList.add('animate-spin');
    } else {
        button.disabled = false;
        text.textContent = originalText;
        icon.textContent = 'arrow_forward';
        icon.classList.remove('animate-spin');
    }
}

function updatePasswordStrength(password) {
    const { score, level } = calculatePasswordStrength(password);
    const config = STRENGTH_CONFIG;

    DOM.strengthBars.forEach((bar, index) => {
        bar.className = 'strength-bar h-full flex-1 rounded-full transition-all duration-300';
        if (index < score) {
            bar.classList.add(...config.colors[level].split(' '), config.glowShadow[level]);
        } else {
            bar.classList.add('bg-border-light', 'dark:bg-border-dark', 'opacity-30');
        }
    });

    DOM.strengthLabel.textContent = password ? config.labels[level].text : '';
    DOM.strengthLabel.className = `text-[10px] font-medium ${config.labels[level]?.class || 'text-text-muted-light dark:text-text-muted'}`;
}

function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('.material-symbols-outlined');
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            icon.textContent = isPassword ? 'visibility' : 'visibility_off';
        });
    });
}

function initViewSwitching() {
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        showView('login-view');
    });

    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        showView('signup-view');
    });
}

function initSignupForm() {
    const passwordInput = document.getElementById('signup-password');
    passwordInput.addEventListener('input', (e) => {
        updatePasswordStrength(e.target.value);
    });

    DOM.signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = document.getElementById('signup-name');
        const emailInput = document.getElementById('signup-email');
        const termsInput = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');

        [nameInput, emailInput, passwordInput].forEach(clearError);
        termsError.classList.add('hidden');
        clearFormError('signup-form');

        const nameResult = validateName(nameInput.value);
        if (!nameResult.valid) {
            showError(nameInput, nameResult.message);
            isValid = false;
        }

        const emailResult = validateEmail(emailInput.value);
        if (!emailResult.valid) {
            showError(emailInput, emailResult.message);
            isValid = false;
        }

        const passwordResult = validatePassword(passwordInput.value);
        if (!passwordResult.valid) {
            showError(passwordInput, passwordResult.message);
            isValid = false;
        }

        if (!termsInput.checked) {
            termsError.textContent = 'You must agree to the terms';
            termsError.classList.remove('hidden');
            isValid = false;
        }

        if (!isValid) return;

        setLoading(DOM.signupSubmit, true, 'Create Account');

        try {
            const result = await signUp(
                emailInput.value,
                passwordInput.value,
                nameInput.value
            );

            if (result.success) {
                // Store name for success page
                localStorage.setItem('osa-hr-user-name', nameInput.value.trim());
                window.location.href = 'success.html';
            } else {
                showFormError('signup-form', result.error);
                setLoading(DOM.signupSubmit, false, 'Create Account');
            }
        } catch (err) {
            showFormError('signup-form', err.message || 'An unexpected error occurred. Please try again.');
            setLoading(DOM.signupSubmit, false, 'Create Account');
        }
    });
}

function initLoginForm() {
    DOM.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');

        [emailInput, passwordInput].forEach(clearError);
        clearFormError('login-form');

        const emailResult = validateEmail(emailInput.value);
        if (!emailResult.valid) {
            showError(emailInput, emailResult.message);
            isValid = false;
        }

        const passwordResult = validatePassword(passwordInput.value);
        if (!passwordResult.valid) {
            showError(passwordInput, passwordResult.message);
            isValid = false;
        }

        if (!isValid) return;

        setLoading(DOM.loginSubmit, true, 'Log In');

        try {
            const result = await signIn(emailInput.value, passwordInput.value);

            if (result.success) {
                window.location.href = 'success.html';
            } else {
                showFormError('login-form', result.error);
                setLoading(DOM.loginSubmit, false, 'Log In');
            }
        } catch (err) {
            showFormError('login-form', err.message || 'An unexpected error occurred. Please try again.');
            setLoading(DOM.loginSubmit, false, 'Log In');
        }
    });
}

function initInputClearOnFocus() {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => clearError(input));
    });
}

function init() {
    initTheme();
    cacheDom();
    initPasswordToggles();
    initViewSwitching();
    initSignupForm();
    initLoginForm();
    initInputClearOnFocus();

    // Theme toggle - now inside the card
    DOM.themeToggle.addEventListener('click', toggleTheme);
}

document.addEventListener('DOMContentLoaded', init);
