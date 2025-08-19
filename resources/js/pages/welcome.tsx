import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="ISP Billing Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
                <header className="mb-6 w-full max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                            >
                                📊 Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                                >
                                    🚀 Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-6xl">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="text-6xl">🌐</span>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent lg:text-6xl">
                                ISP Billing Manager
                            </h1>
                            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Complete billing solution for Internet Service Providers. Manage customers, service plans, 
                                generate invoices, and integrate with FreeRADIUS authentication seamlessly.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                                    >
                                        🚀 Start Managing Your ISP
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-8 py-4 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        👤 Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                                <div className="text-3xl mb-3">👥</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Customer Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Add, edit, and manage customer accounts with complete profile information and service details.
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                                <div className="text-3xl mb-3">📋</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Service Plans</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Define internet service plans with custom pricing, bandwidth limits, and data caps.
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                                <div className="text-3xl mb-3">💰</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Billing & Invoicing</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Generate invoices, track payments, and manage billing cycles automatically.
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                                <div className="text-3xl mb-3">🔐</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">RADIUS Integration</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Seamlessly sync customer accounts with FreeRADIUS for authentication management.
                                </p>
                            </div>
                        </div>

                        {/* Key Benefits */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                                🎯 Everything You Need to Run Your ISP
                            </h2>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">⚡</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Built with modern tech stack for blazing fast performance and real-time updates.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="text-4xl mb-4">🔒</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure & Reliable</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Enterprise-grade security with encrypted data and secure authentication systems.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="text-4xl mb-4">📊</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Complete Analytics</h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Track revenue, monitor customer status, and get insights into your business performance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                            <div className="mb-4">
                                🌟 Professional ISP Management Solution
                            </div>
                            <p>
                                Built with ❤️ by{" "}
                                <a 
                                    href="https://app.build" 
                                    target="_blank" 
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    app.build
                                </a>
                            </p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}