<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'company',
        'start',
        'end',
        'description',
        'highlight',
        'tech',
        'sort_order',
    ];

    protected $casts = [
        'tech' => 'array',
    ];
}
