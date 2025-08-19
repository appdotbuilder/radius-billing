<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test admin user
        User::factory()->create([
            'name' => 'ISP Admin',
            'email' => 'admin@isp.local',
        ]);

        // Seed ISP billing system data
        $this->call(ISPBillingSeeder::class);
    }
}
