### Routing Structure

```
app/
├── _layout.tsx         # Root: QueryClientProvider + AuthGuard (redirects based on auth state)
├── (auth)/             # Route group for login/signup (unauthenticated)
├── (tabs)/             # Route group with 5-tab bottom nav (authenticated)
│   ├── index.tsx       # Home/Dashboard
│   ├── routines/       # Routine management
│   ├── history/        # Workout history
│   ├── progress.tsx    # Progress & PRs
│   └── profile.tsx     # User profile
├── auth/callback.tsx   # Google OAuth callback (deep link: spotter://auth/callback)
├── workout/            # Full-screen modal for active workout session
└── import/             # Import routine by share code
```

**AuthGuard** in `app/_layout.tsx` enforces: unauthenticated → `/(auth)/login`, authenticated → `/(tabs)`.

### Database Schema

Migrations live in `database/`. Key tables:
- `profiles` — auto-created on signup via trigger
- `exercises` / `muscle_groups` — global read-only catalog
- `routines` / `routine_exercises` — user-owned routine definitions
- `workout_sessions` / `workout_sets` — logged workout data
- `personal_records` — auto-calculated via DB trigger (Epley formula)
- `shared_routines` — sharing with auto-generated `share_code`

All user-owned tables are protected with Row-Level Security (see `database/02_rls.sql`). PRs are calculated automatically by a Supabase trigger — never calculate or insert them manually.

### Styling

Use NativeWind Tailwind classes for all styling. The app uses a **dark-only Material Design theme** defined in `constants/colors.ts`. Key color tokens:
- `primary` / `primaryContainer` — lime green (`#f4ffc6` / `#d1fc00`)
- `secondary` — cyan (`#00e3fd`)
- `background` / `surface` / `surfaceContainer` — dark grays
- `onSurface` — white text; `onSurfaceVariant` — gray text

Fonts: **Space Grotesk** for headlines, **Inter** for body text. Custom base components are in `components/ui/` (button, card, input).

### Path Alias

`@/*` maps to the project root. Use `@/components/...`, `@/services/...`, etc.