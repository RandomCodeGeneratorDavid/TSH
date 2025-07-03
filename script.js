const form = document.getElementById('workout-form');
const list = document.getElementById('workout-list');

function loadWorkouts() {
    const items = JSON.parse(localStorage.getItem('workouts') || '[]');
    items.forEach(addItemToDOM);
}

function saveWorkouts() {
    const items = [];
    list.querySelectorAll('li').forEach(li => {
        items.push({ text: li.dataset.text });
    });
    localStorage.setItem('workouts', JSON.stringify(items));
}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.dataset.text = item.text;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Delete';
    removeBtn.addEventListener('click', () => {
        li.remove();
        saveWorkouts();
    });
    li.appendChild(removeBtn);
    list.appendChild(li);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const text = `${date} - ${exercise} ${sets}x${reps}`;
    addItemToDOM({ text });
    saveWorkouts();
    form.reset();
});

loadWorkouts();
