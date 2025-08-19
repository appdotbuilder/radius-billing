<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\ServicePlan;
use App\Models\BillingRecord;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with billing statistics.
     */
    public function index()
    {
        $stats = [
            'total_customers' => Customer::count(),
            'active_customers' => Customer::where('status', 'active')->count(),
            'total_service_plans' => ServicePlan::count(),
            'active_service_plans' => ServicePlan::where('is_active', true)->count(),
            'pending_invoices' => BillingRecord::where('status', 'pending')->count(),
            'overdue_invoices' => BillingRecord::where('status', 'overdue')->count(),
            'monthly_revenue' => BillingRecord::where('status', 'paid')
                ->whereMonth('paid_date', now()->month)
                ->whereYear('paid_date', now()->year)
                ->sum('amount'),
            'total_revenue' => BillingRecord::where('status', 'paid')->sum('amount'),
        ];

        $recentCustomers = Customer::with('servicePlan')
            ->latest()
            ->take(5)
            ->get();

        $recentBilling = BillingRecord::with('customer')
            ->latest()
            ->take(5)
            ->get();

        $overdueInvoices = BillingRecord::with('customer')
            ->where('status', 'pending')
            ->where('due_date', '<', now())
            ->orderBy('due_date')
            ->take(10)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentCustomers' => $recentCustomers,
            'recentBilling' => $recentBilling,
            'overdueInvoices' => $overdueInvoices,
        ]);
    }
}