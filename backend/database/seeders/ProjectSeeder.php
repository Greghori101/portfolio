<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Project::truncate();

        $projects = [
            [
                'title' => 'ESI Examination Planning & Faculty Coordination System',
                'category' => 'Academic',
                'description' => 'Centralized examination planning platform for organizing schedules, coordinating teacher supervision assignments, allocating classrooms, and managing examination sessions through a unified web interface.',
                'tech' => ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL'],
            ],
            [
                'title' => 'ESI Project Management & Supervisor Coordination Platform',
                'category' => 'Academic',
                'description' => 'Platform for academic project lifecycle management at ESI-SBA, including fair project allocation, team formation, supervisor assignment, proposal validation, progress tracking, document submission, and student-supervisor coordination.',
                'tech' => ['React', 'Laravel', 'MySQL'],
            ],
            [
                'title' => 'CIB - Intelligent Clinical Information System',
                'category' => 'Healthcare',
                'description' => 'Complete digital ecosystem for a clinic under construction, covering network topology, Cisco configuration, security planning, staff administration, patients, doctors, appointments, medical records, service coordination, and AI-ready services.',
                'tech' => ['React', 'Laravel', 'FastAPI', 'TensorFlow', 'Scikit-Learn', 'Keras', 'Pandas', 'NumPy', 'MySQL', 'PostgreSQL', 'Cisco', 'AWS Cloud'],
            ],
            [
                'title' => 'AutoHub - AI-Powered Automotive Ecosystem',
                'category' => 'Startup',
                'description' => 'Engineering thesis and startup platform integrating an AutoSpares marketplace with AI-powered image search, TowLink Uber-like towing services, and mechanic-client management, communication, scheduling, and service tracking.',
                'tech' => ['React', 'Laravel', 'Laravel Reverb', 'FastAPI', 'CNN', 'TensorFlow', 'Pandas', 'OpenCV', 'NumPy', 'MySQL', 'PostgreSQL'],
            ],
            [
                'title' => 'AquaTracker - Smart Maritime Monitoring Platform',
                'category' => 'IoT',
                'description' => 'Maritime and fishermen support platform using LoRaWAN and IoT for long-range vessel tracking, marine communication, GPS monitoring, and sensor data collection in isolated marine environments.',
                'tech' => ['React', 'Laravel', 'C++', 'MySQL', 'Arduino', 'IoT', 'LoRaWAN', 'ESP32'],
            ],
            [
                'title' => 'KAGEN - Wildfire Detection & Environmental Monitoring',
                'category' => 'IoT',
                'description' => 'Remote wildfire detection and weather monitoring platform for isolated locations, collecting humidity, temperature, environmental conditions, and fire indicators through distributed IoT devices.',
                'tech' => ['React', 'Laravel', 'C++', 'MySQL', 'Arduino', 'IoT', 'LoRaWAN', 'ESP32'],
            ],
            [
                'title' => 'Jahir - Enterprise Influencer Marketing Ecosystem',
                'category' => 'SaaS',
                'description' => 'Multi-platform influencer marketing SaaS with admin operations, influencer services, company hiring and collaboration workflows, subscription plans, conflict management, and social media intelligence through automated scraping and analytics.',
                'tech' => ['Vue.js', 'Laravel', 'Laravel Reverb', 'FilamentPHP', 'MySQL', 'Apify', 'Social Scraping', 'Data Pipelines'],
            ],
            [
                'title' => 'CashMétaux - Waste Management & Logistics Platform',
                'category' => 'Enterprise',
                'description' => 'French waste management platform for coordinating waste locations, companies, dumpster renting, buying and selling waste, delivery, routing, recycling operations, commercial workflows, and logistics management.',
                'tech' => ['Laravel API', 'FilamentPHP', 'MySQL'],
            ],
            [
                'title' => 'Tech360 - Technology Marketplace',
                'category' => 'Marketplace',
                'description' => 'Technology marketplace for shops and clients with reels-style ads, WooCommerce API integrations, scraped product data, automated synchronization pipelines, optimized frontend UX, and dynamic UI.',
                'tech' => ['Next.js 16', 'WooCommerce API', 'Automated Scraping', 'Data Pipelines', 'Frontend Optimization'],
            ],
            [
                'title' => 'AI Agents & Intelligent Business Automation Platform',
                'category' => 'AI Automation',
                'description' => 'AI agent and automation platform for French real estate agencies, covering coaching sessions, AI calls, appointment scheduling, CRM/calendar coordination, document processing, cloud integrations, and workflow orchestration.',
                'tech' => ['n8n', 'MongoDB', 'React 19', 'Next.js', 'NestJS', 'Microservices', 'Docker', 'Docker Compose', 'Azure', 'Google Cloud'],
            ],
            [
                'title' => 'Medical AI Learning Platform & Annotation System',
                'category' => 'Healthcare AI',
                'description' => 'RAG AI system for medical students and medical image annotation application for MRI and X-ray scans, built with radiologists for learning workflows and structured dataset preparation.',
                'tech' => ['FastAPI', 'MySQL', 'Laravel', 'React 19', 'REST APIs', 'RAG', 'Medical Annotation'],
            ],
            [
                'title' => 'Smart Study Platform',
                'category' => 'Education',
                'description' => 'Study application for managing PDFs, notes, time tracking, smart study plans, configurable Pomodoro-style sessions including 30/5 cycles, personalized scheduling, and progress analytics.',
                'tech' => ['Web Application', 'PDF Management', 'Notes Management', 'Time Tracking', 'Smart Planning'],
            ],
            [
                'title' => 'OpenDesk - Business Scheduling Platform',
                'category' => 'Freelance',
                'description' => 'Client service and scheduling management system for service providers, including customer records, appointment booking, calendar workflows, communication, service management, and real-time updates.',
                'tech' => ['Laravel', 'Laravel Reverb', 'React', 'MySQL'],
            ],
            [
                'title' => 'E-Learning Platform',
                'category' => 'Education',
                'description' => 'Subscription-based online learning platform for publishing educational content, managing enrollments, controlling subscription plans, organizing digital courses, and delivering learning materials.',
                'tech' => ['Web Platform', 'Subscription Model', 'Course Management', 'Student Management'],
            ],
            [
                'title' => 'Kodotiq',
                'category' => 'IT Consulting',
                'description' => 'Independent IT consulting company designed and launched to provide software engineering, AI development, cloud solutions, automation services, and digital transformation solutions for startups and businesses.',
                'tech' => ['Software Engineering', 'AI Development', 'Cloud Solutions', 'Automation', 'Digital Transformation'],
            ],
            [
                'title' => 'Twreed - Manufacturing & Service Marketplace',
                'category' => 'Marketplace',
                'description' => 'Marketplace connecting clients with small factories, agencies, workshops, woodworking providers, sewing/tailoring providers, and other local service/product providers, including quotation, order, production, and delivery management.',
                'tech' => ['Marketplace Platform', 'Delivery Management', 'Order Coordination', 'Provider Workflows'],
            ],
            [
                'title' => 'CargoLoop - Collaborative Logistics Platform',
                'category' => 'Logistics',
                'description' => 'Logistics platform that reduces empty return trips by matching available cargo capacity on returning trucks and large vehicles with people or businesses needing package delivery along compatible routes.',
                'tech' => ['Logistics Platform', 'Route Matching', 'Marketplace Coordination', 'Delivery Optimization'],
            ],
            [
                'title' => 'Niro - Private School Management SaaS',
                'category' => 'SaaS',
                'description' => 'SaaS platform for private school management, centralizing administrative operations while integrating smart e-learning features for digital education workflows and school coordination.',
                'tech' => ['SaaS Platform', 'School Management', 'Smart E-Learning', 'Education Technology', 'Admin Workflows'],
            ],
        ];

        foreach ($projects as $index => $project) {
            Project::create([
                ...$project,
                'link' => 'https://github.com/Greghori101',
                'featured' => false,
                'sort_order' => ($index + 1) * 10,
            ]);
        }
    }
}
