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

        Project::create([
            'title' => 'AutoHub Startup',
            'category' => 'Startup',
            'description' => 'AutoHub — a startup-oriented smart automotive ecosystem: spare parts marketplace, AI-powered spare part recognition, and on-demand towing/service dispatch.',
            'link' => 'https://github.com/Greghori101',
            'tech' => ['PHP', 'JavaScript', 'Laravel', 'React'],
            'featured' => true,
            'sort_order' => 10,
        ]);

        Project::create([
            'title' => 'Clinical Information System',
            'category' => 'Research',
            'description' => 'Designed a complete clinical information platform with patient, doctor, appointments, and medical record workflows, plus network and security planning.',
            'link' => 'https://github.com/Greghori101',
            'tech' => ['Laravel', 'Vue', 'MySQL', 'UML'],
            'featured' => true,
            'sort_order' => 20,
        ]);

        Project::create([
            'title' => 'Examination Planning System',
            'category' => 'Academic',
            'description' => 'Team-built examination planning system using PHP and JavaScript, created during the second year to manage schedules, student groups, and exam timetables.',
            'link' => 'https://github.com/Greghori101',
            'tech' => ['PHP', 'JavaScript', 'MySQL'],
            'featured' => true,
            'sort_order' => 30,
        ]);
    }
}
