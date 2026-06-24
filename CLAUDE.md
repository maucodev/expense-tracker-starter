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

Single-page React app with no routing, no state management library, and no backend. The only shared state is the `transactions` array, which lives in `App.jsx` and is passed down as props.

- `src/App.jsx` — root component; owns the `transactions` state and passes it to children
- `src/Summary.jsx` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally
- `src/TransactionForm.jsx` — owns its own form state; calls the `onAdd(transaction)` prop when submitted
- `src/TransactionList.jsx` — receives `transactions`, owns its own filter state (type and category)
- `src/App.css` — all component styles
- `src/index.css` — global reset and body font
- `src/main.jsx` — React root mount

The `categories` constant is duplicated in `TransactionForm.jsx` and `TransactionList.jsx`; it could be extracted to a shared file if it grows.
