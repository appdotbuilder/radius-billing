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
        Schema::create('billing_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained();
            $table->string('invoice_number')->unique()->comment('Unique invoice number');
            $table->date('billing_period_start')->comment('Billing period start date');
            $table->date('billing_period_end')->comment('Billing period end date');
            $table->decimal('amount', 10, 2)->comment('Billing amount');
            $table->date('due_date')->comment('Payment due date');
            $table->enum('status', ['pending', 'paid', 'overdue', 'cancelled'])->default('pending')->comment('Payment status');
            $table->date('paid_date')->nullable()->comment('Date payment was received');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('customer_id');
            $table->index('invoice_number');
            $table->index('status');
            $table->index('due_date');
            $table->index(['customer_id', 'status']);
            $table->index(['status', 'due_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_records');
    }
};