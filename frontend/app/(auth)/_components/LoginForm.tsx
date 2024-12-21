import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { CircleAlert, Loader2 } from 'lucide-react';
import Link from 'next/link'; // Corrected import for Link
import React, { useState } from 'react';

const LoginForm = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <form
            className="w-full flex flex-col gap-y-10 bg-gray-50 justify-center items-center max-w-sm rounded-lg p-10 border border-input"
        >
            <h1 className="text-2xl text-primary font-bold opacity-80 ">
                Please log in to continue.
            </h1>

            <div className="flex flex-col gap-y-5 justify-center items-center">
                <div className="relative flex flex-col gap-y-3">
                    <Label htmlFor="email" className="opacity-80">Email</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <input
                            className="pl-10 py-5"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                        />
                    </div>
                </div>

                <div className="relative flex flex-col gap-y-3">
                    <Label htmlFor="password" className="opacity-80">Password</Label>
                    <div className="relative flex flex-col gap-y-1">
                        <input
                            className="pl-10 py-5"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    {loading ? (
                        <span className="flex items-center gap-x-2">
                            <Loader2 className="size-5 animate-spin" />Logging In...{" "}
                        </span>
                    ) : (
                        "Login"
                    )}
                </Button>

                <div
                    className="flex justify-center space-x-2 text-gray-600 text-sm"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <p>{`Don't have an account?`}</p>
                    <Link
                        href="/signup"
                        className="text-red-500 hover:underline transition"
                    >
                        Register Instead
                    </Link>
                </div>
                <div className="flex justify-center text-sm">
                    <Link
                        href="/forgot-password"
                        className="text-red-500 hover:underline transition"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
