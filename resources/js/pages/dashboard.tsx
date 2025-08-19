import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Customer {
    id: number;
    name: string;
    email: string;
    status: string;
    created_at: string;
    service_plan?: {
        name: string;
        price: string;
    };
}

interface BillingRecord {
    id: number;
    invoice_number: string;
    amount: string;
    status: string;
    due_date: string;
    created_at: string;
    customer: {
        name: string;
        email: string;
    };
}

interface DashboardStats {
    total_customers: number;
    active_customers: number;
    total_service_plans: number;
    active_service_plans: number;
    pending_invoices: number;
    overdue_invoices: number;
    monthly_revenue: string;
    total_revenue: string;
}

interface Props {
    stats: DashboardStats;
    recentCustomers: Customer[];
    recentBilling: BillingRecord[];
    overdueInvoices: BillingRecord[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentCustomers, recentBilling, overdueInvoices }: Props) {
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
            case 'paid':
                return 'text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-900';
            case 'pending':
                return 'text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-900';
            case 'suspended':
                return 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-900';
            case 'overdue':
            case 'inactive':
                return 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-900';
            default:
                return 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-900';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ISP Billing Dashboard" />
            
            <div className="space-y-6 p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">🌐</span>
                        <h1 className="text-2xl font-bold">ISP Billing Management</h1>
                    </div>
                    <p className="text-blue-100">Monitor your internet service provider business at a glance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">👥</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_customers}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                            {stats.active_customers} active
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📋</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Service Plans</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_service_plans}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                            {stats.active_service_plans} active
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">💰</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.monthly_revenue)}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Total: {formatCurrency(stats.total_revenue)}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⚠️</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Invoices</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending_invoices}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                            {stats.overdue_invoices} overdue
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        🚀 Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href={route('customers.create')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-2xl">👤</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Add Customer</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Create new customer account</p>
                            </div>
                        </Link>

                        <Link
                            href={route('service-plans.create')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-2xl">📊</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">New Service Plan</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Define internet packages</p>
                            </div>
                        </Link>

                        <Link
                            href={route('billing-records.create')}
                            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="text-2xl">💵</span>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Generate Invoice</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Create billing record</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Customers */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    👥 Recent Customers
                                </h2>
                                <Link
                                    href={route('customers.index')}
                                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentCustomers.length > 0 ? (
                                <div className="space-y-4">
                                    {recentCustomers.map((customer) => (
                                        <div key={customer.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{customer.email}</p>
                                                {customer.service_plan && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        {customer.service_plan.name} - {formatCurrency(customer.service_plan.price)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                    {customer.status}
                                                </span>
                                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                    {formatDate(customer.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No customers yet</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Billing */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    💰 Recent Billing
                                </h2>
                                <Link
                                    href={route('billing-records.index')}
                                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentBilling.length > 0 ? (
                                <div className="space-y-4">
                                    {recentBilling.map((bill) => (
                                        <div key={bill.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{bill.invoice_number}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{bill.customer.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    Due: {formatDate(bill.due_date)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {formatCurrency(bill.amount)}
                                                </p>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                                                    {bill.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No billing records yet</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Overdue Invoices Alert */}
                {overdueInvoices.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🚨</span>
                            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
                                Overdue Invoices Require Attention
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {overdueInvoices.slice(0, 3).map((invoice) => (
                                <div key={invoice.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-700">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{invoice.customer.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.invoice_number}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-red-600 dark:text-red-400">
                                            {formatCurrency(invoice.amount)}
                                        </p>
                                        <p className="text-xs text-red-500 dark:text-red-400">
                                            Due: {formatDate(invoice.due_date)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {overdueInvoices.length > 3 && (
                            <div className="mt-3 text-center">
                                <Link
                                    href={route('billing-records.index')}
                                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                >
                                    View all {overdueInvoices.length} overdue invoices →
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}