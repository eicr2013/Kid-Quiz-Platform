#!/usr/bin/env python3
"""
Browser automation for demo — controls the app and records a video automatically.
Uses Playwright to: open the app, click elements, scroll, and save a .webm video.

Setup:
  pip install playwright
  playwright install chromium

Run:
  python scripts/demo_automation.py
  # Video is saved to scripts/recordings/ (created automatically)

  python scripts/demo_automation.py --url https://your-app.vercel.app
  python scripts/demo_automation.py --slow
  python scripts/demo_automation.py --no-record   # no video file, browser only
"""

import asyncio
import argparse
import os
from pathlib import Path
from playwright.async_api import async_playwright


# Default: local dev server
DEFAULT_URL = "http://localhost:3000"
# Delay between actions (seconds) - increase for recording
STEP_DELAY = 1.5
# Where to save recorded video (relative to repo root or cwd)
RECORDINGS_DIR = Path(__file__).resolve().parent / "recordings"


async def run_demo(url: str, slow: bool, record: bool) -> None:
    delay = STEP_DELAY * 2 if slow else STEP_DELAY

    async with async_playwright() as p:
        # Launch visible browser
        browser = await p.chromium.launch(headless=False)

        context_options = {
            "viewport": {"width": 1280, "height": 720},
            "ignore_https_errors": True,
        }
        if record:
            RECORDINGS_DIR.mkdir(parents=True, exist_ok=True)
            context_options["record_video_dir"] = str(RECORDINGS_DIR)
            context_options["record_video_size"] = {"width": 1280, "height": 720}

        context = await browser.new_context(**context_options)
        page = await context.new_page()

        try:
            # 1) Go to app
            await page.goto(url, wait_until="networkidle", timeout=15000)
            await asyncio.sleep(delay)

            # 2) Click a subject (e.g. Mathematics)
            math_btn = page.get_by_role("button", name="Mathematics").first
            if await math_btn.count() > 0:
                await math_btn.click()
                await asyncio.sleep(delay)
            else:
                # Fallback: click by text
                await page.click("text=Mathematics", timeout=5000)
                await asyncio.sleep(delay)

            # 3) Scroll down to see topics
            await page.evaluate("window.scrollTo(0, 400)")
            await asyncio.sleep(delay)

            # 4) Click a category (e.g. Addition)
            add_btn = page.get_by_role("button", name="Addition").first
            if await add_btn.count() > 0:
                await add_btn.click()
                await asyncio.sleep(0.5)
            # Optionally select another
            sub_btn = page.get_by_role("button", name="Subtraction").first
            if await sub_btn.count() > 0:
                await sub_btn.click()
                await asyncio.sleep(0.5)

            # 5) Scroll up to see Start Quiz at top
            await page.evaluate("window.scrollTo(0, 0)")
            await asyncio.sleep(delay)

            # 6) Click Start Quiz
            start_btn = page.get_by_role("button", name="Start Quiz! 🚀").first
            if await start_btn.count() > 0:
                await start_btn.click()
                await asyncio.sleep(delay * 2)
            else:
                await page.click("text=Start Quiz", timeout=5000)
                await asyncio.sleep(delay * 2)

            # 7) Scroll down (quiz question / options)
            await page.evaluate("window.scrollTo(0, 300)")
            await asyncio.sleep(delay)

            # 8) Click first answer option (any)
            first_option = page.locator("button:has-text('✓'), button.p-5").first
            if await first_option.count() > 0:
                await first_option.click()
                await asyncio.sleep(delay * 2)

            # 9) If "Next Question" appears, click it
            next_btn = page.get_by_role("button", name="Next Question →").first
            if await next_btn.count() > 0:
                await next_btn.click()
                await asyncio.sleep(delay)

            # 10) Go Home
            home_btn = page.get_by_role("button", name="Home").first
            if await home_btn.count() > 0:
                await home_btn.click()
                await asyncio.sleep(delay)

            # 11) Scroll down then up (demo scroll)
            await page.evaluate("window.scrollTo(0, 500)")
            await asyncio.sleep(delay)
            await page.evaluate("window.scrollTo(0, 0)")
            await asyncio.sleep(delay)

            # 12) Open Progress
            progress_btn = page.get_by_role("button", name="Progress").first
            if await progress_btn.count() > 0:
                await progress_btn.click()
                await asyncio.sleep(delay * 2)

            # 13) Close modal if any (click outside or Close)
            close_btn = page.get_by_role("button", name="×").first
            if await close_btn.count() > 0:
                await close_btn.click()
            await asyncio.sleep(delay)

            # 14) Open Settings (for timer)
            settings_btn = page.get_by_role("button", name="Settings").first
            if await settings_btn.count() > 0:
                await settings_btn.click()
                await asyncio.sleep(delay * 2)
            # Close settings
            if await close_btn.count() > 0:
                await close_btn.click()

            await asyncio.sleep(2)
        finally:
            if record and page.video:
                # Close context first so the video file is written
                await context.close()
                try:
                    path = await page.video.path()
                    print(f"\nVideo saved: {path}")
                except Exception as e:
                    print(f"\nVideo path not available: {e}")
            await browser.close()


def main():
    parser = argparse.ArgumentParser(
        description="Run demo automation and optionally record a video."
    )
    parser.add_argument(
        "--url",
        default=DEFAULT_URL,
        help=f"App URL (default: {DEFAULT_URL})",
    )
    parser.add_argument(
        "--slow",
        action="store_true",
        help="Slower delays (better for watching the recording)",
    )
    parser.add_argument(
        "--no-record",
        action="store_true",
        help="Do not save a video file (browser only)",
    )
    args = parser.parse_args()
    asyncio.run(run_demo(args.url, args.slow, record=not args.no_record))


if __name__ == "__main__":
    main()
