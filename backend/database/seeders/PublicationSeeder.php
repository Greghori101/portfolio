<?php

namespace Database\Seeders;

use App\Models\Publication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PublicationSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Publication::truncate();

        Publication::create([
            'title' => 'Quantum-Safe Blockchain and Distributed Ledger Technologies',
            'authors' => 'S. Elhoussine',
            'publication' => 'Doctoral manuscript in preparation, 2026',
            'link' => null,
            'sort_order' => 10,
        ]);

        Publication::create([
            'title' => 'Real-time Object Detection for Automotive Spare Parts',
            'authors' => 'S. Elhoussine',
            'publication' => 'Master\'s research report, ESI-SBA, 2024',
            'link' => null,
            'sort_order' => 20,
        ]);

        Publication::create([
            'title' => 'AutoHub: Intelligent Automotive Services Platform',
            'authors' => 'S. Elhoussine',
            'publication' => 'Engineering graduation project report, ESI-SBA, 2024',
            'link' => null,
            'sort_order' => 30,
        ]);
    }
}
