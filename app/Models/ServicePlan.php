<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ServicePlan
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $price
 * @property int $bandwidth_mbps
 * @property int|null $data_limit_gb
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Customer> $customers
 * @property-read int|null $customers_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereBandwidthMbps($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereDataLimitGb($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ServicePlan active()
 * @method static \Database\Factories\ServicePlanFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ServicePlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'bandwidth_mbps',
        'data_limit_gb',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'bandwidth_mbps' => 'integer',
        'data_limit_gb' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the customers that have this service plan.
     */
    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    /**
     * Scope a query to only include active plans.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the formatted data limit for display.
     *
     * @return string
     */
    public function getFormattedDataLimitAttribute(): string
    {
        return $this->data_limit_gb ? $this->data_limit_gb . ' GB' : 'Unlimited';
    }

    /**
     * Get the formatted bandwidth for display.
     *
     * @return string
     */
    public function getFormattedBandwidthAttribute(): string
    {
        return $this->bandwidth_mbps . ' Mbps';
    }
}