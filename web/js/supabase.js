/**
 * Supabase Client Configuration
 * 
 * Since this is a vanilla HTML/JS project without a build system,
 * we load Supabase from CDN and configure it here.
 */

const SUPABASE_URL = 'https://bacytywxuxwmxnwqkmac.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhY3l0eXd4dXh3bXhud3FrbWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjAzNDcsImV4cCI6MjA4NjAzNjM0N30.L3hG-AivQ8BaxbxXkTjy6-vZR78Nr01Ux_HaXDzciNs';

let supabaseClient = null;

/**
 * Get or create the Supabase client instance
 */
export function getSupabase() {
    if (!supabaseClient) {
        if (typeof window.supabase === 'undefined') {
            throw new Error('Supabase SDK not loaded. Ensure the CDN script is included.');
        }

        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

/**
 * Sign up a new user with email, password, and full name
 */
export async function signUp(email, password, fullName) {
    try {
        const supabase = getSupabase();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                // This tells Supabase NOT to send an email if "Confirm Email" is disabled in dashboard
                emailRedirectTo: null
            }
        });

        if (error) {
            return { success: false, error: error.message };
        }

        // If email confirmation is disabled, user and session will be present immediately
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
        const supabase = getSupabase();

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
        const supabase = getSupabase();
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
        const supabase = getSupabase();
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
        const supabase = getSupabase();
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    } catch (err) {
        console.error('Auth state change error:', err);
        return { data: { subscription: { unsubscribe: () => { } } } };
    }
}
