const form = document.getElementById('workout-form');
const tableBody = document.querySelector('#workout-table tbody');
const exerciseSelect = document.getElementById('exercise');
const weightInput = document.getElementById('weight');

const goals = {};

// load exercise list and goals from the workout plan CSV
fetch('Fullbody Workout Plan.csv')
    .then(r => r.text())
    .then(text => {
        text.trim().split('\n').slice(1).forEach(line => {
            const [name, goal] = line.split(',');
            if (!name) return;
            const exercise = name.trim();
            goals[exercise] = parseFloat(goal);
            const opt = document.createElement('option');
            opt.value = exercise;
            opt.textContent = exercise;
            exerciseSelect.appendChild(opt);
        });
    });

function updateWeightColor() {
    const exercise = exerciseSelect.value;
    const goal = goals[exercise];
    const val = parseFloat(weightInput.value);
    weightInput.classList.remove('match', 'below', 'above');
    if (!goal || isNaN(val)) return;
    if (val === goal) weightInput.classList.add('match');
    else if (val < goal) weightInput.classList.add('below');
    else weightInput.classList.add('above');
}

exerciseSelect.addEventListener('change', updateWeightColor);
weightInput.addEventListener('input', updateWeightColor);

function loadWorkouts() {
    const items = JSON.parse(localStorage.getItem('workouts') || '[]');
    items.forEach(addRowToDOM);
}

function saveWorkouts() {
    const items = [];
    tableBody.querySelectorAll('tr').forEach(tr => {
        items.push({
            date: tr.dataset.date,
            exercise: tr.dataset.exercise,
            weight: tr.dataset.weight,
            reps: tr.dataset.reps,
            set: Number(tr.dataset.set)
        });
    });
    localStorage.setItem('workouts', JSON.stringify(items));
}

function formatDateWithDay(dateStr) {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString(undefined, { weekday: 'short' });
    return `${dateStr} (${day})`;
}

function addRowToDOM(item) {
    const tr = document.createElement('tr');
    tr.dataset.date = item.date;
    tr.dataset.exercise = item.exercise;
    tr.dataset.weight = item.weight;
    tr.dataset.reps = item.reps;
    tr.dataset.set = item.set;

    tr.innerHTML = `
        <td>${formatDateWithDay(item.date)}</td>
        <td>${item.exercise}</td>
        <td>${item.weight}</td>
        <td>${item.reps}</td>
        <td>${item.set}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    tr.querySelector('.delete-btn').addEventListener('click', () => {
        tr.remove();
        saveWorkouts();
    });

    tableBody.appendChild(tr);
}



form.addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const exercise = exerciseSelect.value;
    const weight = weightInput.value;
    const reps = document.getElementById('reps').value;

    let setNum = 1;
    tableBody.querySelectorAll('tr').forEach(tr => {
        if (tr.dataset.date === date && tr.dataset.exercise.toLowerCase() === exercise.toLowerCase()) {
            const s = Number(tr.dataset.set);
            if (s >= setNum) setNum = s + 1;
        }
    });

    const item = { date, exercise, weight, reps, set: setNum };
    addRowToDOM(item);
    saveWorkouts();
    form.reset();
    updateWeightColor();
});

loadWorkouts();
