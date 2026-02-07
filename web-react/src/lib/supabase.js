import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Sign up a new user with email, password, and full name
 */
export async function signUp(email, password, fullName) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: null
            }
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, user: data.user, session: data.session };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

/**
 * Sign in existing user with email and password
 */
export async function signIn(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, user: data.user, session: data.session };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

/**
 * Sign out the current user
 */
export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    } catch (err) {
        return null;
    }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(callback) {
    try {
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    } catch (err) {
        console.error('Auth state change error:', err);
        return { data: { subscription: { unsubscribe: () => { } } } };
    }
}
