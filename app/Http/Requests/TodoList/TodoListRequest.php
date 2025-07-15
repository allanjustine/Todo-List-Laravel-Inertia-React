<?php

namespace App\Http\Requests\TodoList;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;

class TodoListRequest extends FormRequest
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
            'task'          => ['required', 'min:5', 'max:255', 'string'],
            'description'   => ['required', 'min:5', 'max:255', 'string'],
            'due_date'      => ['required', 'after_or_equal:today', 'date'],
            'status'        => [Rule::in(['pending', 'completed', 'cancelled'])],
        ];
    }
}
