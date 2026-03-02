#!/usr/bin/env node
/**
 * Load test: simulate many users using the app at the same time.
 *
 * Prerequisites:
 *   1. Start the app: npm run dev
 *   2. Ensure .env.local has Supabase vars (for /api/quiz to work)
 *
 * Usage:
 *   node scripts/load-test-parallel.mjs [parallelUsers] [baseUrl]
 *
 * Examples:
 *   node scripts/load-test-parallel.mjs 10
 *   node scripts/load-test-parallel.mjs 20 http://localhost:3000
 *   node scripts/load-test-parallel.mjs 50
 */

const parallelUsers = parseInt(process.argv[2] || '10', 10);
const baseUrl = (process.argv[3] || 'http://localhost:3000').replace(/\/$/, '');

const CATEGORIES_URL = `${baseUrl}/api/quiz/categories?subject=Mathematics`;
const SESSION_URL = `${baseUrl}/api/quiz/session?categories=Addition,Subtraction&subject=Mathematics`;

async function oneUser(userId) {
  const results = { userId, categories: null, session: null, error: null };
  try {
    const catRes = await fetch(CATEGORIES_URL);
    results.categories = catRes.ok ? 'ok' : `categories ${catRes.status}`;
    if (!catRes.ok) return results;

    const sessionRes = await fetch(SESSION_URL);
    const data = await sessionRes.json().catch(() => ({}));
    results.session = sessionRes.ok && data.questions?.length ? 'ok' : sessionRes.ok ? 'no-questions' : `session ${sessionRes.status}`;
  } catch (e) {
    results.error = e.message || String(e);
  }
  return results;
}

async function run() {
  console.log(`\nLoad test: ${parallelUsers} parallel users → ${baseUrl}`);
  console.log(`  Categories: GET ${CATEGORIES_URL}`);
  console.log(`  Session:   GET ${SESSION_URL}\n`);

  const preCheck = await fetch(CATEGORIES_URL);
  if (!preCheck.ok) {
    console.error(`Pre-check failed: GET ${CATEGORIES_URL} → ${preCheck.status}`);
    console.error('Make sure: 1) "npm run dev" is running  2) App is at', baseUrl, '(e.g. port 3000)');
    console.error('Try opening the URL above in your browser.\n');
    process.exit(1);
  }

  const start = Date.now();
  const promises = Array.from({ length: parallelUsers }, (_, i) => oneUser(i + 1));
  const results = await Promise.all(promises);
  const elapsed = (Date.now() - start) / 1000;

  const ok = results.filter((r) => r.categories === 'ok' && (r.session === 'ok' || r.session === 'no-questions'));
  const failed = results.filter((r) => r.error || r.categories !== 'ok' || (r.session !== 'ok' && r.session !== 'no-questions'));

  console.log(`Finished in ${elapsed.toFixed(2)}s`);
  console.log(`Success (categories + session ok): ${ok.length}/${parallelUsers}`);
  if (failed.length) {
    console.log(`Failed: ${failed.length}`);
    failed.slice(0, 5).forEach((r) => console.log(`  User ${r.userId}: ${r.error || r.categories || r.session}`));
    if (failed.length > 5) console.log(`  ... and ${failed.length - 5} more`);
  }
  console.log(`Throughput: ${(parallelUsers * 2 / elapsed).toFixed(1)} requests/s (${parallelUsers} users × 2 requests)\n`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
