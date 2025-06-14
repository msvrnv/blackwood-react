import { useState, useEffect, useRef } from 'react';
import type {User} from "@supabase/supabase-js";
import {getCurrentUser, onAuthStateChange, signInWithEmail, signOut} from "../services/supabase-auth.service.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const Auth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { error } = await signInWithEmail(email, password);
        if (error) {
            setError(error.message);
        } else {
            setShowDropdown(false);
            setEmail('');
            setPassword('');
        }
    };

    const handleLogout = async () => {
        await signOut();
        setUser(null);
        setShowDropdown(false);
    };

    if (loading) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="User menu"
                aria-expanded={showDropdown}
            >
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-2xl text-gray-300 hover:text-white"
                />
            </button>

            {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#222] p-4 rounded shadow-lg z-10">
                    {user ? (
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    className="text-xl text-gray-300 mr-2"
                                />
                                <span className="text-sm text-white truncate">{user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Sign Out
                            </button>
                        </div>
                    ) : (
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
                            <div className="text-center">
                                <span className="text-xs text-gray-400">Don't have an account?</span>
                                <button
                                    type="button"
                                    className="text-xs text-blue-400 hover:text-blue-300 ml-1"
                                    onClick={() => {
                                        // You might want to add sign-up functionality here
                                        alert('Sign up functionality to be implemented');
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};