<?php

namespace Database\Factories;

use App\Models\BillingRecord;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingRecord>
 */
class BillingRecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\BillingRecord>
     */
    protected $model = BillingRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = Customer::factory()->create();
        $billingStart = $this->faker->dateTimeBetween('-6 months', 'now');
        $billingEnd = (clone $billingStart)->modify('+1 month');
        $dueDate = (clone $billingEnd)->modify('+15 days');
        
        $status = $this->faker->randomElement(['pending', 'paid', 'overdue', 'cancelled']);
        $paidDate = $status === 'paid' ? $this->faker->dateTimeBetween($billingEnd, $dueDate) : null;

        return [
            'customer_id' => $customer->id,
            'invoice_number' => 'INV-' . now()->format('Y-m') . '-' . str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT),
            'billing_period_start' => $billingStart,
            'billing_period_end' => $billingEnd,
            'amount' => $this->faker->randomFloat(2, 20, 200),
            'due_date' => $dueDate,
            'status' => $status,
            'paid_date' => $paidDate,
            'notes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the billing record is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_date' => $this->faker->dateTimeBetween($attributes['billing_period_end'], $attributes['due_date']),
        ]);
    }

    /**
     * Indicate that the billing record is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_date' => null,
        ]);
    }

    /**
     * Indicate that the billing record is overdue.
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'overdue',
            'due_date' => $this->faker->dateTimeBetween('-30 days', '-1 day'),
            'paid_date' => null,
        ]);
    }
}