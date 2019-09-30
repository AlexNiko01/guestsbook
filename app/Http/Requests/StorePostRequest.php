<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 27.09.19
 * Time: 14:51
 */

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ];
    }
}
