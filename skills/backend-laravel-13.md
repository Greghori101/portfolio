# Backend Laravel 13 — Best Practices & Principles

## Overview

This skill provides comprehensive guidance for building robust, maintainable, and scalable backend applications using **Laravel 13**. It covers architecture, coding standards, Laravel-specific best practices, and the core software engineering principles that underpin high-quality Laravel development.

---

## 1. Architecture & Project Structure

### 1.1 Follow Laravel's Conventional Structure
- Stick to Laravel's default directory layout (`app/Http/Controllers`, `app/Models`, `app/Services`, etc.).
- Place **custom business logic** in `app/Services/` or `app/Actions/`.
- Use **Form Requests** (`app/Http/Requests/`) for validation.
- Use **Resources** (`app/Http/Resources/`) for API responses.
- Keep controllers **thin** — they should only orchestrate; logic lives in services/actions.

### 1.2 Domain-Driven Design (DDD) Alignment
- Organize by feature/domain rather than by technical layer when projects grow.
- Example: `app/Domains/User/`, `app/Domains/Order/` with their own Models, Actions, DTOs.

### 1.3 Separate Concerns
- **Routes**: `routes/web.php` for web, `routes/api.php` for API.
- **Middleware**: Authentication, logging, role-based access.
- **Events & Listeners**: Decouple side effects (notifications, logs).
- **Jobs**: Offload heavy processing to queues.

---

## 2. Core Laravel 13 Best Practices

### 2.1 Eloquent ORM
- Use **Eager Loading** (`with()`, `load()`) to avoid N+1 queries.
- Define **scopes** for reusable query constraints.
- Prefer **accessors/mutators** over raw attribute manipulation.
- Use **relationships** correctly: `belongsTo`, `hasMany`, `morphMany`, etc.
- Keep model files focused — avoid "god models".
- Use `$casts` for type safety.
- Use `$fillable` or `$guarded` to protect against mass assignment.

### 2.2 Validation
- Use **Form Request** classes for complex validation.
- Leverage Laravel's built-in validation rules.
- Create custom rules using `Rule::custom()` or custom rule classes.

### 2.3 API Development
- Use **API Resources** for consistent JSON responses.
- Return proper HTTP status codes.
- Implement **rate limiting** for public endpoints.
- Use **API versioning** (`v1/`, `v2/` or headers).
- Document APIs with **Scribe** or OpenAPI specs.
- Use **Sanctum** or **Passport** for authentication.

### 2.4 Testing
- Write **Feature tests** for HTTP endpoints.
- Write **Unit tests** for services, actions, and helpers.
- Use **factories** and **seeders** for test data.
- Mock external services with **Http::fake()**.
- Aim for **80%+ code coverage** on business logic.

### 2.5 Queues & Jobs
- Use **queues** for any slow or non-critical operation (email, file processing).
- Use **unique jobs** to prevent duplicate processing.
- Implement **failed-job handling** with `failed()` method.
- Monitor queue health with Horizon.

### 2.6 Security
- Use **CSRF protection** (enabled by default).
- Validate all user input.
- Use **authorization gates** and **policies**.
- Sanitize outputs.
- Avoid raw SQL queries; always use Eloquent or Query Builder.
- Keep dependencies updated.

### 2.7 Caching
- Use **Redis** or the file-based cache for expensive queries.
- Cache with **tags** for grouped invalidation.
- Use **query caching** sparingly and strategically.

### 2.8 Logging & Monitoring
- Use structured logging (`Log::channel()`).
- Integrate with external services (Laravel Pulse, Sentry).
- Log meaningful context — user ID, request ID, action.

---

## 3. Principles

### 3.1 SOLID Principles

| Principle | Application in Laravel |
|-----------|----------------------|
| **S** — Single Responsibility | One class = one concern. Controllers handle HTTP; Services handle business logic; Repositories handle data access. |
| **O** — Open/Closed | Extend behavior through Service Providers, Middleware, Events, without modifying core classes. |
| **L** — Liskov Substitution | Use interfaces and type-hint contracts. Any implementation should be swappable. |
| **I** — Interface Segregation | Define small, focused interfaces (e.g., `PaymentGatewayInterface`, `NotificationInterface`). |
| **D** — Dependency Inversion | Inject dependencies via constructors; use Laravel's service container to bind interfaces to implementations. |

### 3.2 DRY (Don't Repeat Yourself)
- Extract shared logic into **Services**, **Actions**, or **Traits**.
- Use **blade components** for repeated UI patterns.
- Use **repo/action classes** for repeated database queries.

### 3.3 KISS (Keep It Simple, Stupid)
- Don't over-engineer. Use Laravel's defaults unless there's a clear reason not to.
- Avoid deep inheritance chains.
- Favor clarity over cleverness.

### 3.4 YAGNI (You Ain't Gonna Need It)
- Don't build abstractions for features that don't exist yet.
- Add flexibility when the need arises, not preemptively.

### 3.5 Convention over Configuration
- Follow Laravel naming conventions:
  - Models: singular, `User`
  - Controllers: plural with `Controller` suffix, `UsersController`
  - Migrations: descriptive, `create_users_table`
  - Tables: plural snake_case, `users`
  - Routes: kebab-case, `/admin/users`

### 3.6 Fat Models vs. Skinny Controllers (Modern Take)
- Keep models focused on data relationships and scopes.
- Move business logic to **Actions** or **Services**.
- Controllers only call services and return responses.

---

## 4. Laravel 13 Specific Features

- **Folio** — Page-based routing for simple pages.
- **Volt** — Single-file components for Livewire.
- **Herd / Native** — Local development and desktop app support.
- **Pennant** — Feature flags.
- **Scout** (with Meilisearch/Algolia) — Full-text search.
- **Pail** — Real-time log viewing.
- **Prisma** — Database management (if used).

---

## 5. Project Setup Checklist

- [ ] Use Laravel 13 latest stable.
- [ ] Configure `.env` with strong app key.
- [ ] Set up database (MySQL / PostgreSQL / SQLite).
- [ ] Configure queue driver (Redis / Database).
- [ ] Set up caching driver (Redis / File).
- [ ] Configure mail driver.
- [ ] Install and configure authentication (Sanctum / Passport).
- [ ] Set up testing environment (PHPUnit / Pest).
- [ ] Set up CI/CD pipeline.
- [ ] Enable error tracking (Sentry / Flare).

---

## 6. Coding Standards

- Follow **PSR-12** coding style.
- Use **strict types** (`declare(strict_types=1)`).
- Use **return type declarations** on methods.
- Use **PHPStan** or **Larastan** for static analysis.
- Use **PHP CS Fixer** or **Pint** for formatting.
- Write **docblocks** for public methods describing parameters and return values.

---

## 7. Performance

- Use **indexes** on database columns used in `WHERE` / `JOIN` / `ORDER BY`.
- Use **cursor pagination** for large datasets.
- Use **Chunk** or **Lazy Collections** for memory-efficient processing.
- Enable **OPcache** in production.
- Use **Laravel Octane** for high-throughput applications.
- Minimize **N+1** with eager loading.

---

## 8. Deployment

- Use **Laravel Forge** or **Envoyer** for zero-downtime deployments.
- Run `php artisan optimize` on production.
- Use **supervisor** for queue workers.
- Set up **horizon** for queue monitoring.
- Configure **Vite** for asset bundling.
- Set up **Laravel Pulse** for production monitoring.

---

## Summary Checklist

- [ ] Understand and apply SOLID principles.
- [ ] Follow conventional Laravel structure.
- [ ] Keep controllers thin; use Services/Actions.
- [ ] Eloquent best practices (eager loading, scopes, casts).
- [ ] API Resources for consistent responses.
- [ ] Comprehensive testing (Feature + Unit).
- [ ] Queue heavy operations.
- [ ] Security-first mindset.
- [ ] Cache strategically.
- [ ] Log meaningfully.
- [ ] Follow PSR-12 and use static analysis.
- [ ] Optimize for performance (indexes, caching, Octane).