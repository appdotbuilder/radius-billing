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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Customer full name');
            $table->string('email')->unique()->comment('Customer email address');
            $table->string('phone')->nullable()->comment('Customer phone number');
            $table->text('address')->nullable()->comment('Customer address');
            $table->string('username')->unique()->comment('Username for internet service');
            $table->string('password')->comment('Password for internet service');
            $table->string('ip_address')->nullable()->comment('Assigned IP address');
            $table->foreignId('service_plan_id')->constrained();
            $table->comment('Associated service plan');
            $table->enum('status', ['active', 'suspended', 'inactive'])->default('active')->comment('Customer status');
            $table->date('service_start_date')->comment('Service start date');
            $table->date('service_end_date')->nullable()->comment('Service end date');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('email');
            $table->index('username');
            $table->index('status');
            $table->index(['status', 'service_plan_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};