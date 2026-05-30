# Frontend React 19 — Best Practices & Principles

## Overview

This skill provides comprehensive guidance for building modern, performant, and maintainable frontend applications using **React 19**, **Next.js**, **Tailwind CSS v4**, and **shadcn/ui**. It covers component architecture, data fetching, error handling, layouts, and the latest React 19 features.

---

## 1. React 19 Core Features & Best Practices

### 1.1 Server Components (RSC)
- Use **Server Components** by default in Next.js App Router.
- Server Components reduce client-side JavaScript bundle.
- They can directly access databases, files, and backend services.
- Use `"use client"` only when you need:
  - Interactivity (`onClick`, `onChange`, etc.)
  - Hooks (`useState`, `useEffect`, etc.)
  - Browser-only APIs
  - Custom event listeners

### 1.2 React 19 Actions
- **Server Actions** — functions that run on the server, callable from the client.
- Use `"use server"` directive to mark functions as Server Actions.
- Use with `<form action={action}>` for progressive enhancement.
- Actions can be defined inline in Server Components or in separate files.
- Support **revalidation** via `revalidatePath()` and `revalidateTag()`.

```tsx
// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name");
  // validate, save to DB
  revalidatePath("/users");
}

// app/page.tsx
import { createUser } from "./actions";

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

### 1.3 Actions with `useActionState`
- Use `useActionState()` (React 19) for pending states and validation feedback.
- Returns `[state, action, isPending]`.

```tsx
"use client";
import { useActionState } from "react";
import { createUser } from "./actions";

export function UserForm() {
  const [state, action, isPending] = useActionState(createUser, null);

  return (
    <form action={action}>
      <input name="name" required />
      {state?.error && <p className="text-destructive">{state.error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Create"}
      </button>
    </form>
  );
}
```

### 1.4 `use()` Hook
- Read context or promise values directly in render.
- Can be used inside conditionals and early returns.
- Integrates with **Suspense** boundaries automatically.

```tsx
import { use, Suspense } from "react";

function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

export default function Page() {
  const userPromise = fetchUser(1);
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

---

## 2. Suspense & Streaming

### 2.1 React Suspense
- Wrap asynchronous components in `<Suspense>` with a `fallback`.
- Enables **streaming** — parts of the page render as they become ready.
- Nest Suspense boundaries for granular loading states.

```tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserList } from "./user-list";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        <UserList />
      </Suspense>
    </div>
  );
}
```

### 2.2 Next.js Loading Pages
- Create `app/dashboard/loading.tsx` for page-level loading UI.
- Shows immediately as the page streams in.
- Mirrors the same layout structure.

```tsx
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}
```

---

## 3. Error Boundaries & Error Pages

### 3.1 Next.js Error Pages
- Create `app/dashboard/error.tsx` for graceful error recovery.
- Must be a Client Component (`"use client"`).
- Receives `error` and `reset` props.

```tsx
// app/dashboard/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### 3.2 Global Error Boundary
- Create `app/global-error.tsx` for root-level errors.
- Includes `<html>` and `<body>` tags (replaces root layout).

```tsx
// app/global-error.tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-4xl font-bold">Critical Error</h1>
          <p className="text-muted-foreground">{error.message}</p>
          <button onClick={reset}>Reload</button>
        </div>
      </body>
    </html>
  );
}
```

### 3.3 Granular Error Boundaries
- Wrap specific sections of a page with error boundaries.
- Prevents one failing section from crashing the entire page.

```tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>Something went wrong.</p>;
    }
    return this.props.children;
  }
}
```

Usage:
```tsx
<ErrorBoundary fallback={<DashboardErrorFallback />}>
  <Suspense fallback={<Skeleton />}>
    <DashboardCharts />
  </Suspense>
</ErrorBoundary>
```

---

## 4. Layouts

### 4.1 Root Layout
- `app/layout.tsx` wraps all pages.
- Includes `<html>`, `<body>`, providers, fonts, global styles.

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "Built with React 19, Next.js, Tailwind, shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4.2 Nested Layouts
- Create `app/dashboard/layout.tsx` for shared sidebar, header, nav.
- Layouts persist across page navigations (no re-render).

```tsx
// app/dashboard/layout.tsx
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

### 4.3 Route Groups
- Use `(marketing)` and `(dashboard)` route groups for separate layouts.
- Example: `app/(marketing)/layout.tsx` vs `app/(dashboard)/layout.tsx`.

---

## 5. Tailwind CSS v4

### 5.1 Configuration
- Tailwind v4 uses CSS-based configuration via `@import "tailwindcss"`.
- `postcss.config.mjs` imports `@tailwindcss/postcss`.
- Customize via `@theme` directive in `globals.css`.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
  --color-primary: oklch(0.585 0.233 277.117);
  --color-destructive: oklch(0.577 0.245 27.325);
  --font-family-sans: "Inter", sans-serif;
}
```

### 5.2 Best Practices
- Use **utility classes** directly in JSX.
- Extract repeated patterns into **components**, not CSS classes.
- Use `cn()` from `@/lib/utils` (from shadcn) to merge classes.
- Use **Tailwind's design tokens** (colors, spacing, typography).
- Avoid custom CSS unless absolutely necessary.
- Responsive design: use `sm:`, `md:`, `lg:`, `xl:` prefixes.

```tsx
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
}
```

---

## 6. shadcn/ui Components

### 6.1 Principles
- **Copy-paste** components into your project — full ownership.
- Components use **Radix UI** primitives for accessibility.
- Styled with **Tailwind CSS** and customizable via `cn()`.
- Each component is a single file, max ~300 lines.

### 6.2 Component Structure Pattern
- One component per file.
- Include types, variants, and styling in the same file.
- Use `cva()` (class-variance-authority) for variant management.
- Use `forwardRef` for ref forwarding.
- Export named component and (optionally) a default.

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

### 6.3 Using shadcn Components
- Import from `@/components/ui/<component>`.
- Use `cn()` for class overrides.
- Leverage variants for different visual states.
- Compose components together (e.g., `Card` + `Button` + `Badge`).

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {product.name}
          <Badge variant={product.inStock ? "default" : "destructive"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{product.description}</p>
        <Button className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
}
```

### 6.4 Customization
- Modify the `cn()` utility to add custom class merging.
- Override component styles directly in the component file.
- Use CSS variables defined in `globals.css` for theming.
- shadcn respects the project's Tailwind theme.

---

## 7. One Component Per File — Max 300 Lines

### 7.1 Rule
- **One component per file** — no exceptions.
- **Maximum 300 lines** per component file.
- If a component exceeds 300 lines, extract sub-components.

### 7.2 File Structure Pattern

```
components/
├── ui/              # shadcn primitives (button, card, input, etc.)
├── layout/          # Header, Sidebar, Footer, Navbar
├── forms/           # LoginForm, SignupForm, ProductForm
├── features/        # DashboardCharts, UserTable, ProductCard
└── shared/          # LoadingState, ErrorFallback, EmptyState
```

### 7.3 Example Component (< 300 lines)

```tsx
// components/features/user-table.tsx
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "editor";
  status: "active" | "inactive";
}

const users: User[] = []; // fetched from API

export function UserTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="pl-9"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 8. Data Fetching Patterns

### 8.1 Server-side Fetching (Default)
- Fetch data directly in Server Components.
- Use `fetch()` with `cache: "force-cache"` (default) or `"no-store"`.
- Use `revalidatePath()` / `revalidateTag()` for mutations.

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const res = await fetch("https://api.example.com/users", {
    next: { tags: ["users"] },
  });
  const users = await res.json();

  return <UserTable users={users} />;
}
```

### 8.2 Client-side Fetching
- Use `useEffect` + `fetch` for client-side data.
- Use **SWR** or **TanStack Query** for caching and revalidation.
- Combine with Suspense boundaries.

```tsx
"use client";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function ClientUsers() {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (error) return <p className="text-destructive">Failed to load users.</p>;

  return <UserTable users={data} />;
}
```

---

## 9. Accessibility (a11y)

- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`).
- shadcn components (Radix-based) are accessible by default.
- Add `aria-label`, `aria-describedby` where needed.
- Ensure proper keyboard navigation.
- Use `sr-only` for screen-reader-only content.
- Test with Lighthouse and axe DevTools.

---

## 10. Performance

- Use **Server Components** to minimize client JS.
- Use `next/image` for optimized images.
- Use `next/link` for prefetching and client-side navigation.
- Lazy load client components with `next/dynamic`.
- Use **React.memo** sparingly — profile first.
- Use **Tailwind CSS** — purges unused styles in production.

```tsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false, // disable SSR for browser-only components
});
```

---

## 11. Summary Checklist

- [ ] Prefer Server Components by default.
- [ ] Use `"use client"` only when interactivity is needed.
- [ ] Use Server Actions for form submissions with `useActionState`.
- [ ] Use `use()` for reading promises inside components.
- [ ] Wrap async components in `<Suspense>` with skeleton fallbacks.
- [ ] Create `loading.tsx` for each route segment.
- [ ] Create `error.tsx` for each route segment (Client Component).
- [ ] Create `global-error.tsx` for root-level errors.
- [ ] Use granular Error Boundaries for isolated sections.
- [ ] Use nested layouts for persistent UI (sidebars, headers).
- [ ] Use Tailwind utility classes directly in JSX.
- [ ] Use `cn()` from shadcn for class merging.
- [ ] Use shadcn components — one component per file, max 300 lines.
- [ ] Extract complex UI into focused, reusable components.
- [ ] Keep component files under 300 lines; extract sub-components.
- [ ] Server-side fetch by default; SWR/TanStack Query for client.
- [ ] Follow a11y best practices (semantic HTML, Radix primitives).
- [ ] Optimize with `next/image`, `next/link`, `next/dynamic`.
- [ ] Run `npm run build` to check for errors before deployment.