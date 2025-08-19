<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\ServicePlan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Customer>
     */
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-2 years', '-1 month');

        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->optional(0.8)->phoneNumber(),
            'address' => $this->faker->optional(0.7)->address(),
            'username' => $this->faker->unique()->userName(),
            'password' => 'password123',
            'ip_address' => $this->faker->optional(0.6)->localIpv4(),
            'service_plan_id' => ServicePlan::factory(),
            'status' => $this->faker->randomElement(['active', 'suspended', 'inactive']),
            'service_start_date' => $startDate,
            'service_end_date' => $this->faker->optional(0.2)->dateTimeBetween($startDate, '+1 year'),
        ];
    }

    /**
     * Indicate that the customer is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'service_end_date' => null,
        ]);
    }

    /**
     * Indicate that the customer is suspended.
     */
    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'suspended',
        ]);
    }

    /**
     * Indicate that the customer is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
            'service_end_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ]);
    }
}