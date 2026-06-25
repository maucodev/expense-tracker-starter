Run the full deploy flow for this project following these steps in order. Stop immediately if any step fails and report the error to the user with clear context.

## Step 1 — Unit tests

Run all unit tests:

```bash
npm test
```

If tests fail, **do not continue**. Show the errors and ask the user to fix them before deploying.

## Step 2 — Production build

If tests passed, generate the optimized production build:

```bash
npm run build
```

Verify that the `dist/` folder was generated correctly. If the build fails, show the error and stop.

## Step 3 — Publish to staging

If the build succeeded, publish to staging:

```bash
npm run deploy:staging
```

## Final report

Once all steps are complete, deliver a summary with:
- Test results (how many passed / failed)
- Generated bundle size (extract it from the build output)
- URL or confirmation of the staging deploy
