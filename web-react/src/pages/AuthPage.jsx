import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Logo from '../components/Logo';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';
import InputField from '../components/InputField';
import SocialButtons from '../components/SocialButtons';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import TrustBadge from '../components/TrustBadge';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, validateName } from '../lib/validation';

export default function AuthPage() {
    const navigate = useNavigate();
    const { toggleTheme } = useTheme();
    const { signUp, signIn, loading } = useAuth();

    const [view, setView] = useState('signup');
    const [formError, setFormError] = useState('');

    // Signup form state
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        terms: false,
    });
    const [signupErrors, setSignupErrors] = useState({});

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [loginErrors, setLoginErrors] = useState({});

    const handleSignupChange = (field) => (e) => {
        const value = field === 'terms' ? e.target.checked : e.target.value;
        setSignupData(prev => ({ ...prev, [field]: value }));
    };

    const handleLoginChange = (field) => (e) => {
        setLoginData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const clearFieldError = (form, field) => {
        if (form === 'signup') {
            setSignupErrors(prev => ({ ...prev, [field]: '' }));
        } else {
            setLoginErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        const errors = {};

        const nameResult = validateName(signupData.name);
        if (!nameResult.valid) errors.name = nameResult.message;

        const emailResult = validateEmail(signupData.email);
        if (!emailResult.valid) errors.email = emailResult.message;

        const passwordResult = validatePassword(signupData.password);
        if (!passwordResult.valid) errors.password = passwordResult.message;

        if (!signupData.terms) errors.terms = 'You must agree to the terms';

        setSignupErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const result = await signUp(signupData.email, signupData.password, signupData.name);

        if (result.success) {
            localStorage.setItem('osa-hr-user-name', signupData.name.trim());
            navigate('/success');
        } else {
            setFormError(result.error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        const errors = {};

        const emailResult = validateEmail(loginData.email);
        if (!emailResult.valid) errors.email = emailResult.message;

        const passwordResult = validatePassword(loginData.password);
        if (!passwordResult.valid) errors.password = passwordResult.message;

        setLoginErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const result = await signIn(loginData.email, loginData.password);

        if (result.success) {
            navigate('/success');
        } else {
            setFormError(result.error);
        }
    };

    const switchToLogin = (e) => {
        e.preventDefault();
        setView('login');
        setFormError('');
    };

    const switchToSignup = (e) => {
        e.preventDefault();
        setView('signup');
        setFormError('');
    };

    return (
        <div className="min-h-screen flex flex-col font-sans antialiased overflow-x-hidden transition-colors duration-500
                     bg-slate-50 text-slate-800 selection:bg-[#2b4bee]/20
                     dark:bg-[#0a0b0f] dark:text-white dark:selection:bg-[#2b4bee]/30">

            <AnimatedBackground />

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:p-6">
                <Logo />

                <GlassCard>
                    <ThemeToggle onClick={toggleTheme} />

                    {/* Signup Form */}
                    {view === 'signup' && (
                        <div className="view-transition">
                            <header className="mb-6 sm:mb-8 text-center field-reveal">
                                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                    Join Now
                                </h1>
                            </header>

                            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
                                {formError && (
                                    <div className="form-error-banner bg-red-500/10 border border-red-500/30 text-red-500 text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg animate-shake">
                                        {formError}
                                    </div>
                                )}

                                <InputField
                                    type="text"
                                    id="signup-name"
                                    name="name"
                                    label="Full Name"
                                    placeholder="Example"
                                    icon="person"
                                    value={signupData.name}
                                    onChange={handleSignupChange('name')}
                                    onFocus={() => clearFieldError('signup', 'name')}
                                    error={signupErrors.name}
                                    autoComplete="name"
                                    staggerClass="stagger-1"
                                />

                                <InputField
                                    type="email"
                                    id="signup-email"
                                    name="email"
                                    label="Work Email"
                                    placeholder="jane@company.com"
                                    icon="mail"
                                    value={signupData.email}
                                    onChange={handleSignupChange('email')}
                                    onFocus={() => clearFieldError('signup', 'email')}
                                    error={signupErrors.email}
                                    autoComplete="email"
                                    staggerClass="stagger-2"
                                />

                                <div className="field-reveal stagger-3">
                                    <InputField
                                        type="password"
                                        id="signup-password"
                                        name="password"
                                        label="Password"
                                        placeholder="••••••••"
                                        icon="lock"
                                        value={signupData.password}
                                        onChange={handleSignupChange('password')}
                                        onFocus={() => clearFieldError('signup', 'password')}
                                        error={signupErrors.password}
                                        autoComplete="new-password"
                                        showPasswordToggle
                                    />
                                    <PasswordStrengthMeter password={signupData.password} />
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start gap-2.5 pt-1 field-reveal stagger-4">
                                    <div className="flex items-center h-5 mt-0.5">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="terms"
                                            checked={signupData.terms}
                                            onChange={handleSignupChange('terms')}
                                            className="w-4 h-4 rounded cursor-pointer text-[#2b4bee] focus:ring-[#2b4bee] focus:ring-offset-0 focus:ring-2
                                               border-slate-300 bg-slate-100
                                               dark:border-slate-600 dark:bg-[#12131a] transition-colors duration-200"
                                        />
                                    </div>
                                    <label htmlFor="terms" className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                        By joining, you agree to our <a href="#" className="text-[#2b4bee] hover:text-[#3d5afe] link-hover font-medium">Terms of Service</a> and <a href="#" className="text-[#2b4bee] hover:text-[#3d5afe] link-hover font-medium">Privacy Policy</a>.
                                    </label>
                                </div>
                                {signupErrors.terms && (
                                    <p className="error-msg text-red-500 text-xs ml-1 -mt-2">{signupErrors.terms}</p>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary mt-2 w-full bg-gradient-to-r from-[#2b4bee] to-[#3d5afe] hover:from-[#3d5afe] hover:to-[#2b4bee] text-white font-semibold py-3 sm:py-3.5 px-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_-5px_rgba(43,75,238,0.5)] hover:shadow-[0_0_40px_-8px_rgba(43,75,238,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base field-reveal stagger-5"
                                >
                                    <span>{loading ? 'Please wait...' : 'Create Account'}</span>
                                    <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:translate-x-1'}`}>
                                        {loading ? 'hourglass_empty' : 'arrow_forward'}
                                    </span>
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 relative flex items-center justify-center field-reveal stagger-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200/50 dark:border-slate-700/50"></div>
                                </div>
                                <div className="relative px-4 text-[10px] sm:text-xs uppercase tracking-wider font-medium
                                        bg-white/85 text-slate-500
                                        dark:bg-transparent dark:text-slate-400">Or continue with</div>
                            </div>

                            <SocialButtons staggerClass="stagger-7" />

                            {/* Login Link */}
                            <div className="text-center field-reveal stagger-7">
                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                                    Already have an account?{' '}
                                    <a href="#" onClick={switchToLogin} className="text-[#2b4bee] font-semibold hover:text-[#3d5afe] link-hover">Log in</a>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    {view === 'login' && (
                        <div className="view-transition">
                            <header className="mb-6 sm:mb-8 text-center pr-12 field-reveal">
                                <h1 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
                                    Welcome Back
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Sign in to your workspace</p>
                            </header>

                            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
                                {formError && (
                                    <div className="form-error-banner bg-red-500/10 border border-red-500/30 text-red-500 text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg animate-shake">
                                        {formError}
                                    </div>
                                )}

                                <InputField
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    label="Work Email"
                                    placeholder="jane@company.com"
                                    icon="mail"
                                    value={loginData.email}
                                    onChange={handleLoginChange('email')}
                                    onFocus={() => clearFieldError('login', 'email')}
                                    error={loginErrors.email}
                                    autoComplete="email"
                                    staggerClass="stagger-1"
                                />

                                <InputField
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    label="Password"
                                    placeholder="••••••••"
                                    icon="lock"
                                    value={loginData.password}
                                    onChange={handleLoginChange('password')}
                                    onFocus={() => clearFieldError('login', 'password')}
                                    error={loginErrors.password}
                                    autoComplete="current-password"
                                    showPasswordToggle
                                    staggerClass="stagger-2"
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary mt-2 w-full bg-gradient-to-r from-[#2b4bee] to-[#3d5afe] hover:from-[#3d5afe] hover:to-[#2b4bee] text-white font-semibold py-3 sm:py-3.5 px-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_-5px_rgba(43,75,238,0.5)] hover:shadow-[0_0_40px_-8px_rgba(43,75,238,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base field-reveal stagger-3"
                                >
                                    <span>{loading ? 'Please wait...' : 'Log In'}</span>
                                    <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:translate-x-1'}`}>
                                        {loading ? 'hourglass_empty' : 'arrow_forward'}
                                    </span>
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 relative flex items-center justify-center field-reveal stagger-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200/50 dark:border-slate-700/50"></div>
                                </div>
                                <div className="relative px-4 text-[10px] sm:text-xs uppercase tracking-wider font-medium
                                        bg-white/85 text-slate-500
                                        dark:bg-transparent dark:text-slate-400">Or continue with</div>
                            </div>

                            <SocialButtons staggerClass="stagger-5" />

                            {/* Signup Link */}
                            <div className="text-center field-reveal stagger-6">
                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                                    Don't have an account?{' '}
                                    <a href="#" onClick={switchToSignup} className="text-[#2b4bee] font-semibold hover:text-[#3d5afe] link-hover">Sign up</a>
                                </p>
                            </div>
                        </div>
                    )}
                </GlassCard>

                <TrustBadge />
            </main>
        </div>
    );
}
