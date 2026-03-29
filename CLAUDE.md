# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.



There are no test scripts configured. The app uses Expo, so testing requires a device or simulator.

Environment variables required in `.env`:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Architecture Overview

**Spotter** is a React Native gym tracking app (Expo + Expo Router) backed by Supabase.

### Tech Stack
- **Expo Router v6** — file-based routing (similar to Next.js App Router)
- **NativeWind 4** — Tailwind CSS utility classes for React Native styling
- **React Query (@tanstack/react-query)** — server state, caching, and synchronization
- **Zustand** — client-side state (active workout session, user preferences)
- **Supabase** — PostgreSQL backend with RLS, Auth (Google OAuth via PKCE)
- **Zod + react-hook-form** — form validation
- **React Native New Architecture** enabled (`newArchEnabled: true`)
- **React Compiler** experiment enabled

### Data Flow Pattern

All data access follows this layered pattern:

```
Component → Custom Hook (hooks/queries/) → Service (services/) → Supabase Client (lib/supabase.ts)
```

- **Server state** (routines, exercises, history, PRs) → React Query with query key invalidation on mutations
- **Active workout session** → Zustand (`stores/workout-store.ts`), persisted to AsyncStorage
- **App preferences** (weight unit kg/lb) → Zustand (`stores/app-store.ts`), persisted to AsyncStorage
- **Auth session** → React context (`lib/auth.tsx`), tokens in `expo-secure-store`


