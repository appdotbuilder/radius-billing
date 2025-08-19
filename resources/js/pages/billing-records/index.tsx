import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface BillingRecord {
    id: number;
    invoice_number: string;
    amount: string;
    status: string;
    billing_period_start: string;
    billing_period_end: string;
    due_date: string;
    paid_date: string | null;
    created_at: string;
    customer: {
        id: number;
        name: string;
        email: string;
    };
}

interface PaginationData {
    data: BillingRecord[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    billingRecords: PaginationData;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Billing Records',
        href: '/billing-records',
    },
];

export default function BillingRecordsIndex({ billingRecords }: Props) {
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
            case 'paid':
                return 'text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-900';
            case 'pending':
                return 'text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-900';
            case 'overdue':
                return 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-900';
            case 'cancelled':
                return 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-900';
            default:
                return 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-900';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return '✅';
            case 'pending':
                return '⏳';
            case 'overdue':
                return '🚨';
            case 'cancelled':
                return '❌';
            default:
                return '❓';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing Records" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            💰 Billing Records
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage invoices and payment records
                        </p>
                    </div>
                    <Link href={route('billing-records.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Generate Invoice
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {billingRecords.total}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Invoices
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-green-600">
                            {billingRecords.data.filter(r => r.status === 'paid').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Paid Invoices
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-blue-600">
                            {billingRecords.data.filter(r => r.status === 'pending').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Pending Invoices
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-red-600">
                            {billingRecords.data.filter(r => r.status === 'overdue').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Overdue Invoices
                        </div>
                    </div>
                </div>

                {/* Billing Records Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Invoice
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Period
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {billingRecords.data.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {record.invoice_number}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(record.created_at)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {record.customer.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {record.customer.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(record.amount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {formatDate(record.billing_period_start)}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                to {formatDate(record.billing_period_end)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-sm ${
                                                new Date(record.due_date) < new Date() && record.status === 'pending'
                                                    ? 'text-red-600 font-semibold'
                                                    : 'text-gray-900 dark:text-white'
                                            }`}>
                                                {formatDate(record.due_date)}
                                            </div>
                                            {record.paid_date && (
                                                <div className="text-xs text-green-600">
                                                    Paid: {formatDate(record.paid_date)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                                                <span>{getStatusIcon(record.status)}</span>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={route('billing-records.show', record.id)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={route('billing-records.edit', record.id)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {billingRecords.last_page > 1 && (
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing{' '}
                                        <span className="font-medium">
                                            {(billingRecords.current_page - 1) * billingRecords.per_page + 1}
                                        </span>{' '}
                                        to{' '}
                                        <span className="font-medium">
                                            {Math.min(billingRecords.current_page * billingRecords.per_page, billingRecords.total)}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-medium">{billingRecords.total}</span> records
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {billingRecords.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : link.url
                                                        ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        : 'bg-white border-gray-300 text-gray-300 cursor-default'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === billingRecords.links.length - 1 ? 'rounded-r-md' : ''
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {billingRecords.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">💰</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No billing records found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start generating invoices for your customers to track payments and billing.
                        </p>
                        <Link href={route('billing-records.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                💵 Generate First Invoice
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}