<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBillingRecordRequest;
use App\Models\BillingRecord;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $billingRecords = BillingRecord::with('customer')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('billing-records/index', [
            'billingRecords' => $billingRecords
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::active()->get();

        return Inertia::render('billing-records/create', [
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillingRecordRequest $request)
    {
        $data = $request->validated();
        $data['invoice_number'] = BillingRecord::generateInvoiceNumber();
        
        $billingRecord = BillingRecord::create($data);

        return redirect()->route('billing-records.show', $billingRecord)
            ->with('success', 'Billing record created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BillingRecord $billingRecord)
    {
        $billingRecord->load('customer.servicePlan');

        return Inertia::render('billing-records/show', [
            'billingRecord' => $billingRecord
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BillingRecord $billingRecord)
    {
        $customers = Customer::active()->get();

        return Inertia::render('billing-records/edit', [
            'billingRecord' => $billingRecord,
            'customers' => $customers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BillingRecord $billingRecord)
    {
        $validated = $request->validate([
            'billing_period_start' => 'required|date',
            'billing_period_end' => 'required|date|after:billing_period_start',
            'amount' => 'required|numeric|min:0|max:999999.99',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,paid,overdue,cancelled',
            'notes' => 'nullable|string',
        ]);

        $billingRecord->update($validated);

        return redirect()->route('billing-records.show', $billingRecord)
            ->with('success', 'Billing record updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BillingRecord $billingRecord)
    {
        $billingRecord->delete();

        return redirect()->route('billing-records.index')
            ->with('success', 'Billing record deleted successfully.');
    }
}