<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $this->route('customer')->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'username' => 'required|string|max:255|unique:customers,username,' . $this->route('customer')->id,
            'password' => 'nullable|string|min:6',
            'ip_address' => 'nullable|ip',
            'service_plan_id' => 'required|exists:service_plans,id',
            'status' => 'required|in:active,suspended,inactive',
            'service_start_date' => 'required|date',
            'service_end_date' => 'nullable|date|after:service_start_date',
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
            'name.required' => 'Customer name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered to another customer.',
            'username.required' => 'Username is required.',
            'username.unique' => 'This username is already taken by another customer.',
            'password.min' => 'Password must be at least 6 characters long.',
            'service_plan_id.required' => 'Please select a service plan.',
            'service_plan_id.exists' => 'Selected service plan is invalid.',
            'service_start_date.required' => 'Service start date is required.',
            'service_end_date.after' => 'Service end date must be after start date.',
        ];
    }
}