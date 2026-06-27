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

        $educations = [
            [
                'title' => 'PhD in Quantum Computing',
                'institution' => 'University of Science and Technology Houari Boumediene (USTHB)',
                'start' => '2025-11',
                'end' => '2029-10',
                'thesis' => 'Quantum-Safe Blockchain and Distributed Ledger Technologies',
                'details' => 'In-progress doctoral research in quantum computing at USTHB, Algiers. Focus areas include quantum-safe blockchain, distributed ledger technologies, post-quantum cryptography, quantum algorithms, quantum optimization, cybersecurity, distributed systems, and secure computing.',
                'sort_order' => 10,
            ],
            [
                'title' => 'Computer Systems Engineering Degree & Master\'s Research Track',
                'institution' => 'Higher School of Computer Science 08 May 1945, Sidi Bel Abbès (ESI-SBA)',
                'start' => '2019-09',
                'end' => '2024-10',
                'thesis' => 'Real-Time Spare Parts Detection with Deep Learning; AutoHub AI Automotive Platform',
                'details' => 'Completed Computer Systems Engineering specialization (ISI). Studies covered mathematics, algorithms, data structures, computer architecture, operating systems, networks, cryptography, databases, distributed systems, cybersecurity, cloud concepts, web and mobile development, UML, project management, AI, machine learning, deep learning, computer vision, IoT, cloud computing, embedded systems, and research methodology.',
                'sort_order' => 20,
            ],
        ];

        foreach ($educations as $education) {
            Education::create($education);
        }
    }
}
