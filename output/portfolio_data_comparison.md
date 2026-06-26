# Portfolio Data Comparison

Generated: 2026-06-26

## Scope

Compared:

- `output/souala_elhoussine_full_cv.json`
- Laravel seeders in `backend/database/seeders/`
- Rendered homepage data paths in `frontend/app/page.tsx`
- Static biography page in `frontend/app/bio/page.tsx`

## Executive Summary

The JSON CV is much richer and more accurate than the current seeders and homepage display.

| Section | JSON Count | Seeder Count | Display Status |
|---|---:|---:|---|
| Education | 2 main entries | 3 entries | Rendered on homepage, compact only |
| Experience | 6 entries | 5 entries | Rendered on homepage, but description/tech mostly hidden |
| Projects | 18 entries | 3 entries | Only featured projects render; current seeder has 3 featured projects |
| Publications / Research | 4 entries | 3 entries | Rendered on homepage, but missing one conference paper |
| Skills | Rich grouped skill map | Not seeded | Not rendered as structured skills section |
| Contact / Sites / Titles | Rich JSON | Hardcoded partially | Hardcoded in hero/about/socials |
| Certifications | 1 entry | Not seeded | Mentioned only in biography text |
| Official verification | Rich JSON | Not seeded | Not rendered |

## Main Findings

### 1. Education Seeder Mismatches

Current seeder:

- `PhD in Quantum Computing` at `ESI-SBA / National Doctoral Program`, `2025` to `Present`
- `Master's Degree in Computer Science (Computer Systems Engineering)` at ESI-SBA, `2019` to `2024`
- Separate `Engineering Graduation Project`, `2023` to `2024`

JSON says:

- PhD is at `University of Science and Technology Houari Boumediene (USTHB)`, Algiers, `2025-11` to `2029-10`, in progress.
- ESI-SBA education is one completed engineering/master-level track from `2019-09` to `2024-10-13`.
- The engineering thesis and master's thesis are both thesis outputs inside the ESI-SBA education entry, not necessarily separate education degrees.

Recommended fixes:

- Change PhD institution from `ESI-SBA / National Doctoral Program` to `University of Science and Technology Houari Boumediene (USTHB)`.
- Use exact dates where possible: `2025-11` to `2029-10` for PhD, `2019-09` to `2024-10-13` for ESI-SBA.
- Rename thesis titles to match JSON:
  - `Quantum-Safe Blockchain and Distributed Ledger Technologies`
  - `Real-Time Detection and Identification of Spare Parts Using Deep Learning`
  - `Development of an AI-Powered Platform for Solving Automotive Problems in Algeria Through Innovative Services`
- Consider keeping engineering project as a project/publication entry instead of a standalone education entry, unless you intentionally want it displayed separately.

### 2. Experience Seeder Mismatches

Current seeder issues:

- Missing `Freelance AI & Full-Stack Engineer — Upwork & Independent Consulting`, `2025-10` to present.
- SobiAPI ends at `2025-10`, but JSON says `2025-11`.
- SobiAPI tech is too generic: current `Node.js`, `PostgreSQL`, `REST`; JSON says `NestJS`, `React 19`, `Next.js`, `MongoDB`, `n8n`, `Docker`, `Docker Compose`, `Microservices`, `Azure Cloud`, `Google Cloud`.
- Apollo description is too generic and misses Jahir, CashMétaux, Tech360, Reverb, FilamentPHP, Apify, WooCommerce API.
- Sonelgaz Batna dates are wrong in seeder: current `2023-11` to `2024-01`; JSON says `2023-12` to `2024-01`.
- Sonelgaz Ain Djasser dates are wrong in seeder: current `2022-06` to `2022-07`; JSON says `2022-09` for one month.
- LabRI ends at `2024-06` in seeder; JSON says `2024-10`.

Recommended fixes:

- Add the freelance/Upwork experience at top.
- Update all dates to JSON values.
- Expand descriptions/highlights and tech arrays to match JSON.
- Keep public portfolio discrepancy note only in JSON/provenance, not necessarily on public homepage.

### 3. Project Seeder Is Severely Incomplete

Current seeder has only 3 projects:

- `AutoHub Startup`
- `Clinical Information System`
- `Examination Planning System`

JSON has 18 projects:

1. ESI Examination Planning & Faculty Coordination System
2. ESI Project Management & Supervisor Coordination Platform
3. CIB - Intelligent Clinical Information System
4. AutoHub - AI-Powered Automotive Ecosystem
5. AquaTracker - Smart Maritime Monitoring Platform
6. KAGEN - Intelligent Wildfire Detection & Environmental Monitoring System
7. Jahir - Enterprise Influencer Marketing Ecosystem
8. CashMétaux - Waste Management & Logistics Platform
9. Tech360 - Technology Marketplace
10. AI Agents & Intelligent Business Automation Platform
11. Medical AI Learning Platform & Annotation System
12. Smart Study Platform
13. OpenDesk - Business Scheduling Platform
14. E-Learning Platform
15. Kodotiq
16. Twreed - Manufacturing & Service Marketplace
17. CargoLoop - Collaborative Logistics Platform
18. Niro - Private School Management SaaS

Specific mismatches:

- `Clinical Information System` should be `CIB - Intelligent Clinical Information System`.
- Current CIB tech is too small: `Laravel`, `Vue`, `MySQL`, `UML`; JSON includes React, Laravel, FastAPI, TensorFlow, Scikit-Learn, Keras, Pandas, NumPy, MySQL, PostgreSQL, Cisco Packet Tracer, Cisco, AWS Cloud.
- `AutoHub Startup` tech is too small and inaccurate: current includes PHP/JavaScript; JSON uses React, Laravel, Laravel Reverb, FastAPI, CNN, TensorFlow, Pandas, OpenCV, NumPy, MySQL, PostgreSQL.
- `Examination Planning System` missing HTML5/CSS3 and faculty coordination wording.
- Missing all professional/freelance/independent projects after the first three.

Display limitation:

- `frontend/app/page.tsx` displays only `featured` projects if any exist.
- Since all 3 current seeder projects are `featured: true`, even if you seed all 18 but mark only 3 as featured, homepage will still show only featured ones.
- If you want all projects visible, either mark all as featured or change the UI to show a selected subset plus a full projects page.

### 4. Publications Seeder Missing Conference Paper

Current seeder has 3 publication/research items.

Missing from seeder:

- `A Hybrid Quantum-Classical State-Space Framework for Cyber-Defense Optimization: LQR-to-QUBO Formulation and IBM Quantum Validation` — conference paper, submitted.

Title mismatches:

- Seeder: `Real-time Object Detection for Automotive Spare Parts`
- JSON: `Real-Time Detection and Identification of Spare Parts Using Deep Learning`

- Seeder: `AutoHub: Intelligent Automotive Services Platform`
- JSON: `Development of an AI-Powered Platform for Solving Automotive Problems in Algeria Through Innovative Services`

APA/source gap:

- JSON contains APA-style citations.
- Seeder has only `authors` and `publication`, no APA field.
- Current UI only renders `title`, `authors`, `publication`, and optional `link`.

### 5. Skills Are Not Represented In Backend Or UI

JSON contains detailed grouped skills:

- Quantum computing and research
- AI and data science
- Backend engineering
- Frontend engineering
- Databases and data platforms
- Systems, networking, and security
- Cloud, DevOps, and deployment
- IoT and embedded systems
- Software engineering and product
- Mathematics and scientific foundations

Current backend has no skill model/seeder.
Current frontend has no structured skills section.
Hero has hardcoded high-level positioning only.

Recommended options:

- Quick option: add a hardcoded skills section from JSON in `frontend/app/page.tsx`.
- Better option: add `skills` table/model/controller/seeder and render grouped skills from API.

### 6. Certifications Are Not Structured In Backend Or UI

JSON has:

- `Hands-on Quantum Error Correction with Google Quantum AI`, Google Quantum AI / Coursera, 2026.

Current state:

- Mentioned in `/bio` text.
- Not seeded.
- Not displayed as a structured certification card/list.

Recommended options:

- Add certification model/seeder/API/UI section.
- Or include it inside education/research details if you want to avoid schema changes.

### 7. Homepage Hardcoded Content Is Partially Aligned

Hardcoded hero/about content in `frontend/app/page.tsx` is broadly aligned:

- `PhD Candidate in Quantum Computing`
- `Full-Stack Engineer & AI Systems Designer`
- Algiers, Algeria
- GitHub, LinkedIn, email
- `3+ Years`, `20+ Completed`

Potential mismatch:

- JSON primary titles include `PhD Researcher`, `Computer Systems Engineer`, `Software Engineer`, `AI Engineer`, `Frontend Engineer`, `Backend Engineer`, `Database Administrator`, `System Design Practitioner`.
- Homepage compresses this to `Full-Stack Engineer & AI Systems Designer`, which is fine stylistically but less complete.

### 8. Biography Page Is Rich But Older Than JSON

`frontend/app/bio/page.tsx` contains a strong narrative, but it predates the latest JSON additions.

Missing or underrepresented compared with JSON:

- Niro project.
- Detailed list of all 18 projects.
- Official ESI-SBA ISI competency verification.
- GitHub/portfolio public findings.
- Full professional project breakdown for Jahir, CashMétaux, Tech360, SobiAPI AI agents, Medical AI, OpenDesk, Twreed, CargoLoop, Kodotiq.
- Exact PhD date range `2025-11` to `2029-10`.
- Exact ESI end date `2024-10-13`.

### 9. Schema Limits

Current DB schema cannot store the full JSON without losing structure.

Current models:

- `experiences`: title, company, start, end, description, highlight, tech, sort_order.
- `projects`: title, category, description, link, tech, featured, sort_order.
- `educations`: title, institution, start, end, thesis, details, sort_order.
- `publications`: title, authors, publication, link, sort_order.

Not supported structurally:

- Project system architecture field.
- Project results/responsibilities.
- Education place, status, specialization, official verification, skill/discipline arrays, multiple theses per education.
- Experience location, responsibilities array, results array, supervision, duration.
- APA citations separate from publication venue/status.
- Skills grouped by field.
- Certifications.
- Source provenance.

## Suggested Next Step

Best practical path:

1. Update current seeders to align with JSON using existing schema.
2. Add missing 15 projects and missing freelance/conference-paper entries.
3. Improve frontend display to show project descriptions and more than 4 tech labels, or add project detail pages.
4. Later, extend schema for skills, certifications, source verification, system architecture, responsibilities, and results.
