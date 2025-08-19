<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\RadiusUser
 *
 * @property int $id
 * @property string $username
 * @property string $attribute
 * @property string $op
 * @property string $value
 * @property int|null $customer_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Customer|null $customer
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereAttribute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereOp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RadiusUser whereValue($value)
 * @method static \Database\Factories\RadiusUserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RadiusUser extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'attribute',
        'op',
        'value',
        'customer_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the RADIUS user.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Create RADIUS entries for a customer.
     *
     * @param Customer $customer
     * @param string|null $plainPassword
     * @return void
     */
    public static function createForCustomer(Customer $customer, ?string $plainPassword = null): void
    {
        // Use provided plain password or try to get from original attributes
        $password = $plainPassword ?: ($customer->getOriginal('password') ?: 'password123');
        
        // Create password entry
        static::create([
            'username' => $customer->username,
            'attribute' => 'Cleartext-Password',
            'op' => '==',
            'value' => $password,
            'customer_id' => $customer->id,
        ]);

        // Create bandwidth limits based on service plan
        if ($customer->servicePlan !== null) {
            $bandwidthKbps = $customer->servicePlan->bandwidth_mbps * 1024;
            
            // Download speed limit
            static::create([
                'username' => $customer->username,
                'attribute' => 'WISPr-Bandwidth-Max-Down',
                'op' => '==',
                'value' => (string) $bandwidthKbps,
                'customer_id' => $customer->id,
            ]);

            // Upload speed limit
            static::create([
                'username' => $customer->username,
                'attribute' => 'WISPr-Bandwidth-Max-Up',
                'op' => '==',
                'value' => (string) $bandwidthKbps,
                'customer_id' => $customer->id,
            ]);
        }
    }

    /**
     * Update RADIUS entries for a customer.
     *
     * @param Customer $customer
     * @param string|null $newPassword
     * @return void
     */
    public static function updateForCustomer(Customer $customer, ?string $newPassword = null): void
    {
        // Delete existing entries
        static::where('customer_id', $customer->id)->delete();

        // Recreate with updated values
        static::createForCustomer($customer, $newPassword);
    }

    /**
     * Delete RADIUS entries for a customer.
     *
     * @param Customer $customer
     * @return void
     */
    public static function deleteForCustomer(Customer $customer): void
    {
        static::where('customer_id', $customer->id)->delete();
    }
}