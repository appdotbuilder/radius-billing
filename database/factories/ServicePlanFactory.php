<?php

namespace Database\Factories;

use App\Models\ServicePlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServicePlan>
 */
class ServicePlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\ServicePlan>
     */
    protected $model = ServicePlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $plans = [
            ['name' => 'Basic', 'bandwidth' => 10, 'price_min' => 20, 'price_max' => 30],
            ['name' => 'Standard', 'bandwidth' => 25, 'price_min' => 35, 'price_max' => 50],
            ['name' => 'Premium', 'bandwidth' => 50, 'price_min' => 60, 'price_max' => 80],
            ['name' => 'Business', 'bandwidth' => 100, 'price_min' => 100, 'price_max' => 150],
            ['name' => 'Enterprise', 'bandwidth' => 200, 'price_min' => 200, 'price_max' => 300],
        ];

        $plan = $this->faker->randomElement($plans);

        return [
            'name' => $plan['name'] . ' ' . $this->faker->randomNumber(2),
            'description' => $this->faker->sentence(8),
            'price' => $this->faker->randomFloat(2, $plan['price_min'], $plan['price_max']),
            'bandwidth_mbps' => $plan['bandwidth'],
            'data_limit_gb' => $this->faker->optional(0.3)->numberBetween(100, 1000),
            'is_active' => $this->faker->boolean(85),
        ];
    }

    /**
     * Indicate that the service plan is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the service plan is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}