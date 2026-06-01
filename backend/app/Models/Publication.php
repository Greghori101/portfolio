<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    protected $fillable = [
        'title',
        'authors',
        'publication',
        'link',
        'sort_order',
    ];
}
