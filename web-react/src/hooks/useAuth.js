import { useState, useCallback } from 'react';
import { signUp as supabaseSignUp, signIn as supabaseSignIn } from '../lib/supabase';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = useCallback(async (email, password, fullName) => {
        setLoading(true);
        setError(null);
        try {
            const result = await supabaseSignUp(email, password, fullName);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const signIn = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const result = await supabaseSignIn(email, password);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { signUp, signIn, loading, error, clearError };
}
