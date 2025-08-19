<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServicePlanRequest;
use App\Http\Requests\UpdateServicePlanRequest;
use App\Models\ServicePlan;
use Inertia\Inertia;

class ServicePlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $servicePlans = ServicePlan::latest()->paginate(10);
        
        return Inertia::render('service-plans/index', [
            'servicePlans' => $servicePlans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('service-plans/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServicePlanRequest $request)
    {
        $servicePlan = ServicePlan::create($request->validated());

        return redirect()->route('service-plans.show', $servicePlan)
            ->with('success', 'Service plan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServicePlan $servicePlan)
    {
        $servicePlan->load(['customers' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('service-plans/show', [
            'servicePlan' => $servicePlan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServicePlan $servicePlan)
    {
        return Inertia::render('service-plans/edit', [
            'servicePlan' => $servicePlan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServicePlanRequest $request, ServicePlan $servicePlan)
    {
        $servicePlan->update($request->validated());

        return redirect()->route('service-plans.show', $servicePlan)
            ->with('success', 'Service plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServicePlan $servicePlan)
    {
        // Check if there are customers using this plan
        if ($servicePlan->customers()->count() > 0) {
            return redirect()->route('service-plans.index')
                ->with('error', 'Cannot delete service plan. It is currently being used by customers.');
        }

        $servicePlan->delete();

        return redirect()->route('service-plans.index')
            ->with('success', 'Service plan deleted successfully.');
    }
}