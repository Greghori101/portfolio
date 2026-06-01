<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Education::truncate();

        Education::create([
            'title' => 'PhD in Quantum Computing',
            'institution' => 'ESI-SBA / National Doctoral Program',
            'start' => '2025',
            'end' => 'Present',
            'thesis' => 'Quantum-Safe Blockchain and Distributed Ledger Technologies',
            'details' => 'Researching post-quantum cryptography, distributed ledger technologies, and preparing scientific publications as part of doctoral research.',
            'sort_order' => 10,
        ]);

        Education::create([
            'title' => 'Master\'s Degree in Computer Science (Computer Systems Engineering)',
            'institution' => 'Higher School of Computer Science of Sidi Bel Abbès (ESI-SBA)',
            'start' => '2019',
            'end' => '2024',
            'thesis' => 'Deep Learning-Based Object Detection for Automotive Spare Parts',
            'details' => 'Developed CNN-based computer vision models for real-time detection of automotive spare parts as part of the master\'s research project and engineering graduation work.',
            'sort_order' => 20,
        ]);

        Education::create([
            'title' => 'Engineering Graduation Project',
            'institution' => 'Higher School of Computer Science of Sidi Bel Abbès (ESI-SBA)',
            'start' => '2023',
            'end' => '2024',
            'thesis' => 'AutoHub — Startup-Oriented Smart Automotive Ecosystem',
            'details' => 'Designed and developed AutoHub: a marketplace for spare parts, an AI-powered vision system for spare part recognition, and an on-demand towing/service dispatch component.',
            'sort_order' => 30,
        ]);
    }
}
