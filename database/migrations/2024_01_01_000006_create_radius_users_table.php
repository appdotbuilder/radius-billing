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
        Schema::create('radius_users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique()->comment('RADIUS username');
            $table->string('attribute')->comment('RADIUS attribute (e.g., Cleartext-Password)');
            $table->string('op')->default('==')->comment('RADIUS operator');
            $table->string('value')->comment('RADIUS attribute value');
            $table->foreignId('customer_id')->nullable()->constrained();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('username');
            $table->index('customer_id');
            $table->index(['username', 'attribute']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('radius_users');
    }
};