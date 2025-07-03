const form = document.getElementById('workout-form');
const tableBody = document.querySelector('#workout-table tbody');

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
    const exercise = document.getElementById('exercise').value.trim();
    const weight = document.getElementById('weight').value;
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
});

loadWorkouts();
