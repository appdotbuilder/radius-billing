<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\RadiusUser;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RadiusUser>
 */
class RadiusUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\RadiusUser>
     */
    protected $model = RadiusUser::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->userName(),
            'attribute' => 'Cleartext-Password',
            'op' => '==',
            'value' => 'password123',
            'customer_id' => Customer::factory(),
        ];
    }

    /**
     * Create a bandwidth limit entry.
     */
    public function bandwidthLimit(): static
    {
        return $this->state(fn (array $attributes) => [
            'attribute' => $this->faker->randomElement(['WISPr-Bandwidth-Max-Down', 'WISPr-Bandwidth-Max-Up']),
            'value' => (string) ($this->faker->numberBetween(1, 100) * 1024), // Kbps
        ]);
    }

    /**
     * Create a password entry.
     */
    public function password(): static
    {
        return $this->state(fn (array $attributes) => [
            'attribute' => 'Cleartext-Password',
            'value' => 'password123',
        ]);
    }
}