# Demo video for the "Demo" button

Place your **how-to** video here so the in-app **Demo** button can play it.

- **Filename:** `demo-how-to.webm`
- **Full path:** `public/videos/demo-how-to.webm` → served as `/videos/demo-how-to.webm`

## How to get the video

1. **Option A – Use the automation script**  
   From the project root:
   ```bash
   npm run dev
   # In another terminal:
   python3 scripts/demo_automation.py --slow
   ```
   When it finishes, the script prints the path to the saved `.webm` (e.g. `scripts/recordings/xxx.webm`).  
   Copy that file to `public/videos/demo-how-to.webm`.

2. **Option B – Record your own**  
   Record a short screen recording of you using the app (subject → topics → Start Quiz → answer → etc.), export as `.webm` or `.mp4`, and put it here as `demo-how-to.webm`.  
   If you use `.mp4`, name it `demo-how-to.mp4` and we can point the Demo modal to it.

Once the file is in place, the **Demo** button on the home and category screens will open a modal and play this video.
