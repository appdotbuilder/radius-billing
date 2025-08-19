<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServicePlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:service_plans,name',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|max:999999.99',
            'bandwidth_mbps' => 'required|integer|min:1',
            'data_limit_gb' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Service plan name is required.',
            'name.unique' => 'A service plan with this name already exists.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price cannot be negative.',
            'bandwidth_mbps.required' => 'Bandwidth is required.',
            'bandwidth_mbps.integer' => 'Bandwidth must be a whole number.',
            'bandwidth_mbps.min' => 'Bandwidth must be at least 1 Mbps.',
        ];
    }
}