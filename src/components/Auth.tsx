import { useState, useEffect } from 'react';
import type {User} from "@supabase/supabase-js";
import {getCurrentUser, onAuthStateChange, signInWithEmail, signOut} from "../services/supabase-auth.service.ts";

export const Auth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        getCurrentUser().then((user: User | null) => {
            setUser(user);
            setLoading(false);
        });

        const { data: { subscription } } = onAuthStateChange((user) => {
            setUser(user);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { error } = await signInWithEmail(email, password);
        if (error) {
            setError(error.message);
        } else {
            setShowLogin(false);
        }
    };

    const handleLogout = async () => {
        await signOut();
        setUser(null);
    };

    if (loading) return null;

    return (
        <div className="relative">
            {user ? (
                <div className="flex items-center">
                    <span className="mr-3 text-sm">{user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    <button
                        onClick={() => setShowLogin(!showLogin)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                        Login
                    </button>
                    {showLogin && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-[#222] p-4 rounded shadow-lg z-10">
                            <form onSubmit={handleLogin} className="space-y-3">
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#333] text-white p-2 rounded text-sm"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#333] text-white p-2 rounded text-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-sm transition-colors"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};