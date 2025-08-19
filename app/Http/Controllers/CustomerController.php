<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Models\ServicePlan;
use App\Models\RadiusUser;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::with('servicePlan')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('customers/index', [
            'customers' => $customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $servicePlans = ServicePlan::active()->get();

        return Inertia::render('customers/create', [
            'servicePlans' => $servicePlans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $data = $request->validated();
        
        // Store the plain password for RADIUS before hashing
        $plainPassword = $data['password'];
        
        $customer = Customer::create($data);

        // Create RADIUS entries with plain password
        RadiusUser::createForCustomer($customer, $plainPassword);

        return redirect()->route('customers.show', $customer)
            ->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $customer->load(['servicePlan', 'billingRecords' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('customers/show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        $servicePlans = ServicePlan::active()->get();

        return Inertia::render('customers/edit', [
            'customer' => $customer,
            'servicePlans' => $servicePlans
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $data = $request->validated();
        
        // Handle password update
        $passwordChanged = !empty($data['password']);
        $plainPassword = null;
        
        if ($passwordChanged) {
            $plainPassword = $data['password'];
        } else {
            unset($data['password']);
        }

        $customer->update($data);

        // Update RADIUS entries if password changed or service plan changed
        if ($passwordChanged || $customer->wasChanged('service_plan_id')) {
            RadiusUser::updateForCustomer($customer, $plainPassword);
        }

        return redirect()->route('customers.show', $customer)
            ->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        // Delete RADIUS entries first
        RadiusUser::deleteForCustomer($customer);
        
        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully.');
    }
}