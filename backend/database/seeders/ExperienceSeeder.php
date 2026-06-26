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

        $experiences = [
            [
                'title' => 'Freelance AI & Full-Stack Engineer',
                'company' => 'Upwork & Independent Consulting',
                'start' => '2025-10',
                'end' => null,
                'description' => 'Working with international clients to design AI-powered software systems, healthcare platforms, enterprise web applications, intelligent automation solutions, and cloud-native backend services. Projects include RAG systems for medical education, MRI/X-ray annotation workflows, SaaS platforms, marketplaces, scheduling systems, and business management tools.',
                'highlight' => 'RAG systems, medical AI, SaaS platforms, full-stack delivery, Dockerized deployments',
                'tech' => ['FastAPI', 'Laravel', 'React 19', 'Next.js', 'MySQL', 'PostgreSQL', 'Docker', 'Docker Compose', 'REST APIs', 'AI Integration'],
                'sort_order' => 10,
            ],
            [
                'title' => 'Backend Engineer',
                'company' => 'SobiAPI',
                'start' => '2025-08',
                'end' => '2025-11',
                'description' => 'Designed production AI agents and automated workflows for French real estate agencies. Built multi-step systems for coaching sessions, AI customer calls, appointment scheduling, CRM synchronization, lead management, calendar coordination, document processing, and event-driven automation.',
                'highlight' => 'AI agents, n8n workflows, NestJS microservices, Azure/Google Cloud integrations',
                'tech' => ['NestJS', 'React 19', 'Next.js', 'MongoDB', 'n8n', 'Docker', 'Docker Compose', 'Microservices', 'Azure Cloud', 'Google Cloud'],
                'sort_order' => 20,
            ],
            [
                'title' => 'Software Engineer',
                'company' => 'Apollo Digital Solutions',
                'start' => '2024-07',
                'end' => '2025-09',
                'description' => 'Worked on production SaaS platforms across influencer marketing, waste management, and digital commerce. Contributed to Jahir, CashMétaux, and Tech360 through backend services, APIs, real-time communication, admin dashboards, scraping pipelines, frontend optimization, deployment, debugging, and production monitoring.',
                'highlight' => 'Jahir, CashMétaux, Tech360, SaaS delivery, APIs, dashboards, scraping, marketplace UX',
                'tech' => ['Laravel', 'Vue.js', 'Next.js', 'Laravel Reverb', 'FilamentPHP', 'MySQL', 'Apify', 'WooCommerce API', 'Docker'],
                'sort_order' => 30,
            ],
            [
                'title' => 'Research Intern',
                'company' => 'LabRI-SBA, ESI-SBA',
                'start' => '2024-01',
                'end' => '2024-10',
                'description' => 'Completed a research internship at the Computer Science Research Laboratory of Sidi Bel Abbès. Worked on literature reviews, experimental design, deep learning research, scientific writing, dataset collection and labeling, CNN evaluation, and AI model development supporting the master\'s thesis and engineering graduation project.',
                'highlight' => 'Deep learning research, computer vision, literature review, CNN evaluation, thesis support',
                'tech' => ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'FastAPI', 'NumPy', 'Pandas'],
                'sort_order' => 40,
            ],
            [
                'title' => 'Computer Science Engineer Intern',
                'company' => 'Sonelgaz - Batna Distribution Company',
                'start' => '2023-12',
                'end' => '2024-01',
                'description' => 'Completed an engineering internship under the supervision of the Chief Computer Science Engineer. Monitored enterprise servers, diagnosed software and system issues, supported IT infrastructure maintenance, and developed internal tools to automate repetitive operational tasks.',
                'highlight' => 'Server monitoring, enterprise IT support, bug fixing, internal automation tools',
                'tech' => ['Server Monitoring', 'Enterprise IT', 'System Maintenance', 'Internal Automation'],
                'sort_order' => 50,
            ],
            [
                'title' => 'Computer Science Engineer Intern',
                'company' => 'Sonelgaz - Ain Djasser Distribution Company',
                'start' => '2022-09',
                'end' => '2022-09',
                'description' => 'Completed a one-month internship under the supervision of the Chief Computer Science Engineer. Gained practical exposure to enterprise IT operations, server administration, network infrastructure, software maintenance, troubleshooting, and small internal automation applications.',
                'highlight' => 'Enterprise IT operations, infrastructure monitoring, system administration, automation basics',
                'tech' => ['Server Monitoring', 'Networking', 'System Administration', 'Software Maintenance'],
                'sort_order' => 60,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::create($experience);
        }
    }
}
