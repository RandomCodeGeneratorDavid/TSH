# TSH Workout Tracker

A simple web-based application to log workouts on your phone. Each entry is
stored locally in your browser and shown in a table for easy review.

## Running the app

1. Clone or download this repository.
2. Start a local server (required for loading the workout plan) and visit `http://localhost:8000`:

```bash
python3 -m http.server
```

Place your exercise plan in `Fullbody Workout Plan.csv` with two columns:

```
Exercise,Goal
Squat,100
Bench Press,80
```

The listed exercises appear in the dropdown. When entering weight, the field
turns green when you hit the goal, red if below and yellow if above.

All workouts are stored locally in your browser using `localStorage`.

### Columns in the log

| Column | Meaning |
| ------ | ------- |
| **Date** | The selected calendar date with day of the week |
| **Exercise** | Name of the exercise performed |
| **Weight** | Weight used for the set |
| **Reps** | Number of repetitions |
| **Set** | Automatically increments for each set of the same exercise on the same day |
