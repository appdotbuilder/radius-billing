<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\BillingRecord
 *
 * @property int $id
 * @property int $customer_id
 * @property string $invoice_number
 * @property string $billing_period_start
 * @property string $billing_period_end
 * @property string $amount
 * @property string $due_date
 * @property string $status
 * @property string|null $paid_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Customer $customer
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereBillingPeriodEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereBillingPeriodStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereInvoiceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord wherePaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BillingRecord overdue()
 * @method static \Database\Factories\BillingRecordFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BillingRecord extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'invoice_number',
        'billing_period_start',
        'billing_period_end',
        'amount',
        'due_date',
        'status',
        'paid_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'billing_period_start' => 'date',
        'billing_period_end' => 'date',
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the billing record.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Scope a query to only include overdue records.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'pending')
                    ->where('due_date', '<', now());
    }

    /**
     * Generate a unique invoice number.
     *
     * @return string
     */
    public static function generateInvoiceNumber(): string
    {
        $year = now()->format('Y');
        $month = now()->format('m');
        $count = static::whereYear('created_at', $year)
                      ->whereMonth('created_at', $month)
                      ->count() + 1;
        
        return sprintf('INV-%s-%s-%04d', $year, $month, $count);
    }

    /**
     * Get the status badge color.
     *
     * @return string
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'paid' => 'green',
            'pending' => 'blue',
            'overdue' => 'red',
            'cancelled' => 'gray',
            default => 'gray',
        };
    }

    /**
     * Mark the billing record as paid.
     *
     * @return void
     */
    public function markAsPaid(): void
    {
        $this->update([
            'status' => 'paid',
            'paid_date' => now(),
        ]);
    }
}