<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Experience::truncate();

        Experience::create([
            'title' => 'Backend Engineer',
            'company' => 'SobiAPI',
            'start' => '2025-08',
            'end' => '2025-10',
            'description' => 'Backend development focusing on APIs, databases, and server-side architecture for production services.',
            'highlight' => 'Backend APIs, database design, and platform maintenance',
            'tech' => ['Node.js', 'PostgreSQL', 'REST'],
            'sort_order' => 10,
        ]);

        Experience::create([
            'title' => 'Software Engineer',
            'company' => 'Apollo Digital Solutions',
            'start' => '2024-07',
            'end' => '2025-09',
            'description' => 'Worked on modern web applications, backend APIs, cloud deployments, and production-grade systems.',
            'highlight' => 'End-to-end SaaS delivery, API design, and cloud deployments',
            'tech' => ['Next.js', 'Laravel', 'Docker', 'AWS'],
            'sort_order' => 20,
        ]);

        Experience::create([
            'title' => 'Software Engineer Intern',
            'company' => 'Sonelgaz',
            'start' => '2023-11',
            'end' => '2024-01',
            'description' => 'Supported IT operations, infrastructure automation, and enterprise systems during a software engineering internship.',
            'highlight' => 'Infrastructure support and automation for enterprise IT',
            'tech' => ['PHP', 'JavaScript', 'Linux'],
            'sort_order' => 30,
        ]);

        // Additional internships and research internship entries from the biography
        Experience::create([
            'title' => 'IT Systems Intern',
            'company' => 'Sonelgaz',
            'start' => '2022-06',
            'end' => '2022-07',
            'description' => 'One-month internship working on network maintenance, system administration, and infrastructure monitoring.',
            'highlight' => 'Network maintenance and system administration',
            'tech' => ['Linux', 'Networking'],
            'sort_order' => 40,
        ]);

        Experience::create([
            'title' => 'Research Intern',
            'company' => 'LabRI-SBA (Computer Science Research Laboratory of Sidi Bel Abbès)',
            'start' => '2024-01',
            'end' => '2024-06',
            'description' => 'Six-month research internship involving literature reviews, experimentation, academic writing, and research methodology training.',
            'highlight' => 'Research methodology, experimentation, and literature review',
            'tech' => ['Scientific Research', 'Python', 'Machine Learning'],
            'sort_order' => 60,
        ]);
    }
}
