# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

A React expense tracker app used as a teaching project in a Claude Code course. It intentionally ships with a bug, poor UI, and messy code — these are fixed progressively as part of the course.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview production build
```

## Architecture

Single-page React app with no routing, no state management library, and no backend. All state lives in `App.jsx` via `useState`.

- `src/App.jsx` — entire app: state, filtering logic, form handling, and JSX
- `src/App.css` — component styles scoped to `.app` and its children
- `src/index.css` — global reset and body font
- `src/main.jsx` — React root mount

## Known Bug

Transaction `amount` values in the seed data are strings (`"5000"`, `"1200"`, etc.). The `reduce` calls that compute `totalIncome`, `totalExpenses`, and `balance` use `sum + t.amount`, which does string concatenation instead of numeric addition. Fix by parsing amounts to numbers in the reduce or at the point of storage.
