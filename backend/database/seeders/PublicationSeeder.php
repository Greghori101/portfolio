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

        $publications = [
            [
                'title' => 'Quantum-Safe Blockchain and Distributed Ledger Technologies',
                'authors' => 'Souala, E.',
                'publication' => 'Survey paper in preparation. APA: Souala, E. (in preparation). Quantum-safe blockchain and distributed ledger technologies [Survey paper].',
                'link' => null,
                'sort_order' => 10,
            ],
            [
                'title' => 'A Hybrid Quantum-Classical State-Space Framework for Cyber-Defense Optimization: LQR-to-QUBO Formulation and IBM Quantum Validation',
                'authors' => 'Souala, E.',
                'publication' => 'Conference paper submitted. APA: Souala, E. (submitted). A hybrid quantum-classical state-space framework for cyber-defense optimization [Conference paper].',
                'link' => null,
                'sort_order' => 20,
            ],
            [
                'title' => 'Real-Time Detection and Identification of Spare Parts Using Deep Learning',
                'authors' => 'Souala, E.',
                'publication' => 'Master\'s thesis, ESI-SBA, Oct. 2024. APA: Souala, E. (2024). Real-time detection and identification of spare parts using deep learning.',
                'link' => null,
                'sort_order' => 30,
            ],
            [
                'title' => 'Development of an AI-Powered Platform for Solving Automotive Problems in Algeria Through Innovative Services',
                'authors' => 'Souala, E.',
                'publication' => 'Engineering thesis, ESI-SBA, Oct. 2024. APA: Souala, E. (2024). Development of an AI-powered platform for solving automotive problems in Algeria.',
                'link' => null,
                'sort_order' => 40,
            ],
        ];

        foreach ($publications as $publication) {
            Publication::create($publication);
        }
    }
}
