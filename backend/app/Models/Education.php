<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'title',
        'institution',
        'start',
        'end',
        'thesis',
        'details',
        'sort_order',
    ];
}
