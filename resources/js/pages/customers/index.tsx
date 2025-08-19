import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Customer {
    id: number;
    name: string;
    email: string;
    username: string;
    status: string;
    service_plan: {
        name: string;
        price: string;
    };
    service_start_date: string;
    created_at: string;
}

interface PaginationData {
    data: Customer[];
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
    customers: PaginationData;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function CustomersIndex({ customers }: Props) {
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
                return 'text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-900';
            case 'suspended':
                return 'text-yellow-700 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-900';
            case 'inactive':
                return 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-900';
            default:
                return 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-900';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            👥 Customer Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your internet service provider customers
                        </p>
                    </div>
                    <Link href={route('customers.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Add Customer
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {customers.total}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Customers
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-green-600">
                            {customers.data.filter(c => c.status === 'active').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Active Customers
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-yellow-600">
                            {customers.data.filter(c => c.status === 'suspended').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Suspended Customers
                        </div>
                    </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Service Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {customers.data.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {customer.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {customer.email}
                                                </div>
                                                <div className="text-xs text-gray-400 dark:text-gray-500">
                                                    @{customer.username}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {customer.service_plan.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatCurrency(customer.service_plan.price)}/month
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(customer.service_start_date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={route('customers.show', customer.id)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={route('customers.edit', customer.id)}
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
                    {customers.last_page > 1 && (
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex justify-between sm:hidden">
                                    {customers.links.find(link => link.label === '&laquo; Previous')?.url && (
                                        <Link
                                            href={customers.links.find(link => link.label === '&laquo; Previous')!.url!}
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {customers.links.find(link => link.label === 'Next &raquo;')?.url && (
                                        <Link
                                            href={customers.links.find(link => link.label === 'Next &raquo;')!.url!}
                                            className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Showing{' '}
                                            <span className="font-medium">
                                                {(customers.current_page - 1) * customers.per_page + 1}
                                            </span>{' '}
                                            to{' '}
                                            <span className="font-medium">
                                                {Math.min(customers.current_page * customers.per_page, customers.total)}
                                            </span>{' '}
                                            of{' '}
                                            <span className="font-medium">{customers.total}</span> customers
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {customers.links.map((link, index) => (
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
                                                        index === customers.links.length - 1 ? 'rounded-r-md' : ''
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {customers.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No customers found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Get started by adding your first customer to the system.
                        </p>
                        <Link href={route('customers.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ Add First Customer
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}