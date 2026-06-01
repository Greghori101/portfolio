<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'link',
        'tech',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'tech' => 'array',
        'featured' => 'boolean',
    ];
}
