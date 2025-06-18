# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `bun run dev` - Development mode with watch
- `bun run build` - Build the package
- `bun run typecheck` - Type check without emitting files
- `bun run test` - Run tests

## Code Style Guidelines
- TypeScript with strict mode and React 18+
- React functional components with hooks
- Client components use 'use client' directive at top
- JSDoc comments for public API components/functions
- Imports: React imports first, followed by types, then relative imports
- Naming: PascalCase for components, camelCase for functions/hooks
- Interfaces for component props with descriptive comments
- Error handling: use proper error boundaries and context error handling
- Follow headless UI pattern - no styling opinions
- Maintain clear component/hook separation following existing architecture
- Core providers → hooks for state → components for UI

## Project Structure
- `/src/core` - Main providers and core functionality
- `/src/hooks` - Custom React hooks
- `/src/components` - Headless UI components (ConsentGate supports custom messages)
- `/src/types` - TypeScript interfaces/types (includes ConsentGateMessages interface)
- `/examples` - Reference implementations

## Custom Messages Feature
The ConsentGate component supports customizable messages through the `messages` prop:
- `consentRequired`: Message when consent is needed (supports {category} placeholder)
- `managePreferences`: Button text for managing preferences
- `loading`: Loading state message
- Default values are provided via `DEFAULT_CONSENT_GATE_MESSAGES`