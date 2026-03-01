# Demo automation (Python + Playwright)

This script **controls the browser and records a video automatically**. No need to run a screen recorder — the script saves a `.webm` file when it finishes.

## Setup (one time)

```bash
pip install playwright
playwright install chromium
```

## Run

1. Start your app (e.g. `npm run dev` in the Education folder).
2. Run the script:

```bash
# Records video to scripts/recordings/ (default)
python scripts/demo_automation.py

# Slower steps (easier to watch in the video)
python scripts/demo_automation.py --slow

# Use your deployed URL
python scripts/demo_automation.py --url https://kid-quiz-platform.vercel.app

# Run without saving a video (browser only)
python scripts/demo_automation.py --no-record
```

3. When the run finishes, the script prints the path to the saved video (e.g. `scripts/recordings/xxx.webm`). Open that file to watch the demo.

## What it does

- Opens the app and **records the whole session** to a `.webm` file
- Clicks a subject (Mathematics), scrolls down, selects topics (e.g. Addition, Subtraction)
- Scrolls up, clicks Start Quiz, clicks an answer, Next Question if shown
- Clicks Home, scrolls down/up, opens Progress, then Settings, then closes modals

Videos are saved under `scripts/recordings/` (this folder is in `.gitignore`).
