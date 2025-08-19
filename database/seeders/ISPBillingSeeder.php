<?php

namespace Database\Seeders;

use App\Models\BillingRecord;
use App\Models\Customer;
use App\Models\RadiusUser;
use App\Models\ServicePlan;
use Illuminate\Database\Seeder;

class ISPBillingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create service plans
        $servicePlans = [
            [
                'name' => 'Basic Home',
                'description' => 'Perfect for light browsing and email. Ideal for single users.',
                'price' => 29.99,
                'bandwidth_mbps' => 10,
                'data_limit_gb' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Family Plus',
                'description' => 'Great for families with streaming needs. Multiple device support.',
                'price' => 49.99,
                'bandwidth_mbps' => 25,
                'data_limit_gb' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Power User',
                'description' => 'High-speed internet for power users and small businesses.',
                'price' => 79.99,
                'bandwidth_mbps' => 50,
                'data_limit_gb' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Business Pro',
                'description' => 'Professional grade internet for businesses with priority support.',
                'price' => 129.99,
                'bandwidth_mbps' => 100,
                'data_limit_gb' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'Ultra-high speed for enterprise customers with dedicated support.',
                'price' => 249.99,
                'bandwidth_mbps' => 200,
                'data_limit_gb' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Legacy Basic',
                'description' => 'Old basic plan (discontinued).',
                'price' => 19.99,
                'bandwidth_mbps' => 5,
                'data_limit_gb' => 100,
                'is_active' => false,
            ],
        ];

        foreach ($servicePlans as $planData) {
            ServicePlan::create($planData);
        }

        // Create customers with realistic data
        $activeServicePlans = ServicePlan::where('is_active', true)->get();
        
        // Create 25 customers
        for ($i = 0; $i < 25; $i++) {
            $customer = Customer::create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->address(),
                'username' => fake()->unique()->userName(),
                'password' => 'password123',
                'ip_address' => fake()->optional(0.7)->localIpv4(),
                'service_plan_id' => $activeServicePlans->random()->id,
                'status' => fake()->randomElement(['active', 'active', 'active', 'active', 'suspended', 'inactive']), // Bias towards active
                'service_start_date' => fake()->dateTimeBetween('-2 years', '-1 month'),
                'service_end_date' => fake()->optional(0.1)->dateTimeBetween('now', '+1 year'),
            ]);

            // Create RADIUS entries for each customer
            RadiusUser::createForCustomer($customer);

            // Create billing records for each customer (2-6 records each)
            $recordCount = fake()->numberBetween(2, 6);
            for ($j = 0; $j < $recordCount; $j++) {
                $billingStart = fake()->dateTimeBetween('-6 months', 'now');
                $billingEnd = (clone $billingStart)->modify('+1 month');
                $dueDate = (clone $billingEnd)->modify('+15 days');
                
                // Determine status based on due date
                $status = 'pending';
                $paidDate = null;
                
                if ($dueDate < now()) {
                    // Overdue or paid
                    if (fake()->boolean(70)) { // 70% chance of being paid even if overdue
                        $status = 'paid';
                        $paidDate = fake()->dateTimeBetween($billingEnd, now());
                    } else {
                        $status = 'overdue';
                    }
                } else if (fake()->boolean(30)) { // 30% chance of early payment
                    $status = 'paid';
                    $paidDate = fake()->dateTimeBetween($billingEnd, $dueDate);
                }

                BillingRecord::create([
                    'customer_id' => $customer->id,
                    'invoice_number' => BillingRecord::generateInvoiceNumber(),
                    'billing_period_start' => $billingStart,
                    'billing_period_end' => $billingEnd,
                    'amount' => $customer->servicePlan->price,
                    'due_date' => $dueDate,
                    'status' => $status,
                    'paid_date' => $paidDate,
                    'notes' => fake()->optional(0.2)->sentence(),
                ]);
            }
        }

        $this->command->info('✅ Created ISP billing system data:');
        $this->command->info('   - ' . ServicePlan::count() . ' service plans');
        $this->command->info('   - ' . Customer::count() . ' customers');
        $this->command->info('   - ' . RadiusUser::count() . ' RADIUS entries');
        $this->command->info('   - ' . BillingRecord::count() . ' billing records');
    }
}