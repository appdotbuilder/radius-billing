<?php

use App\Http\Controllers\BillingRecordController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ServicePlanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // ISP Billing Management Routes
    Route::resource('service-plans', ServicePlanController::class);
    Route::resource('customers', CustomerController::class);
    Route::resource('billing-records', BillingRecordController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
