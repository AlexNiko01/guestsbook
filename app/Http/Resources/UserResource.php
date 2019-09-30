<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    private $includePersonalData = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name
        ];
        if($this->includePersonalData) {
            $data['email'] = $this->email;
        }
        return $data;
    }

    public function withPersonal(): self
    {
        $this->includePersonalData = true;

        return $this;
    }
}
