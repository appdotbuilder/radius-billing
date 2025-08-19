import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface ServicePlan {
    id: number;
    name: string;
    description: string;
    price: string;
    bandwidth_mbps: number;
    data_limit_gb: number | null;
    is_active: boolean;
    customers_count: number;
}

interface PaginationData {
    data: ServicePlan[];
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
    servicePlans: PaginationData;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Service Plans',
        href: '/service-plans',
    },
];

export default function ServicePlansIndex({ servicePlans }: Props) {
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(amount));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service Plans" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            📋 Service Plans
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your internet service plans and pricing
                        </p>
                    </div>
                    <Link href={route('service-plans.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Add Service Plan
                        </Button>
                    </Link>
                </div>

                {/* Service Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicePlans.data.map((plan) => (
                        <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-block w-3 h-3 rounded-full ${plan.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        <span className={`text-sm ${plan.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                                            {plan.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    {plan.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(plan.price)}/mo
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Bandwidth:</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {plan.bandwidth_mbps} Mbps
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Data Limit:</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {plan.data_limit_gb ? `${plan.data_limit_gb} GB` : 'Unlimited'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Customers:</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {plan.customers_count || 0}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={route('service-plans.show', plan.id)}
                                        className="flex-1 text-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('service-plans.edit', plan.id)}
                                        className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {servicePlans.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No service plans found</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Create your first service plan to start offering internet services to customers.
                        </p>
                        <Link href={route('service-plans.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ Create First Service Plan
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {servicePlans.last_page > 1 && (
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg shadow border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {(servicePlans.current_page - 1) * servicePlans.per_page + 1}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {Math.min(servicePlans.current_page * servicePlans.per_page, servicePlans.total)}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">{servicePlans.total}</span> service plans
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {servicePlans.links.map((link, index) => (
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
                                                index === servicePlans.links.length - 1 ? 'rounded-r-md' : ''
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
        </AppLayout>
    );
}