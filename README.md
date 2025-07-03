# TSH Workout Tracker

A simple web-based application to log workouts on your phone. Each entry is
stored locally in your browser and shown in a table for easy review.

When you log an exercise that already has previous entries, a small popup
displays your progress so far, including a simple line chart of weight over
time.

## Running the app

1. Clone or download this repository.
2. Open `index.html` directly in your mobile or desktop browser. All data is stored locally using `localStorage`.

The progress popup loads Chart.js from a CDN, so you'll need an internet connection the first time the library is fetched.

Alternatively, serve the files with a simple HTTP server and visit `http://localhost:8000`:

```bash
python3 -m http.server
```

### Columns in the log

| Column | Meaning |
| ------ | ------- |
| **Date** | The selected calendar date with day of the week |
| **Exercise** | Name of the exercise performed |
| **Weight** | Weight used for the set |
| **Reps** | Number of repetitions |
| **Set** | Automatically increments for each set of the same exercise on the same day |
