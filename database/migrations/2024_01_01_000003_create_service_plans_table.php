<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Plan name (e.g., Basic, Premium)');
            $table->text('description')->nullable()->comment('Plan description');
            $table->decimal('price', 10, 2)->comment('Monthly price');
            $table->bigInteger('bandwidth_mbps')->comment('Bandwidth in Mbps');
            $table->bigInteger('data_limit_gb')->nullable()->comment('Monthly data limit in GB (null for unlimited)');
            $table->boolean('is_active')->default(true)->comment('Whether the plan is active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('is_active');
            $table->index(['is_active', 'price']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_plans');
    }
};