<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'idVoyage',
        'idUser',
        'nbPlaceAReserver',
    ];

    /**
     *
     * @return bool
     */


    public function voyage()
    {
        return $this->belongsTo(Voyage::class, 'idVoyage');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }
}
