// =====================
// TODO LIST
// =====================
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (!inputBox.value.trim()) return;

    const li = document.createElement("li");
    li.textContent = inputBox.value;

    const span = document.createElement("span");
    span.textContent = "×";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveTasks();
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }

    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

loadTasks();

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});


// =====================
// NAVIGATION
// =====================
const pages = {
    habits: document.getElementById("habitsPage"),
    streak: document.getElementById("streakPage"),
    progress: document.getElementById("progressPage"),
    settings: document.getElementById("settingsPage")
};

const navItems = document.querySelectorAll(".nav-item");

function showPage(page) {
    Object.values(pages).forEach(p => p.style.display = "none");
    if (pages[page]) pages[page].style.display = "block";
}

navItems.forEach(item => {
    item.addEventListener("click", () => {

        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        showPage(item.dataset.page);
    });
});

// default page
showPage("habits");
document.querySelector('[data-page="habits"]').classList.add("active");


// =====================
// HABITS SYSTEM
// =====================
let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {

    const name = document.getElementById("habitName").value;
    const type = document.getElementById("habitType").value;

    if (!name) return;

    if (type === "toggle") {
        habits.push({
            name,
            type: "toggle",
            done: false
        });
    } else {
        const goal = Number(document.getElementById("habitGoal").value);
        const step = Number(document.getElementById("habitStep").value) || 1;
        const unit = document.getElementById("habitUnit").value || "";

        habits.push({
            name,
            type: "counter",
            goal,
            step,
            unit,
            current: 0
        });
    }

    localStorage.setItem("habits", JSON.stringify(habits));

    renderHabits();
    renderHabitSettings();
}

function incrementHabit(i) {
    habits[i].current += habits[i].step;

    if (habits[i].current > habits[i].goal) {
        habits[i].current = habits[i].goal;
    }

    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

function renderHabits() {
    const container = document.getElementById("habits");
    container.innerHTML = "";

    habits.forEach((h, i) => {

        // TOGGLE HABIT
        if (h.type === "toggle") {
            container.innerHTML += `
                <div class="habit ${h.done ? "done" : ""}" onclick="toggleHabit(${i})">
                    ${h.name}
                </div>
            `;
        }

        // COUNTER HABIT
        else {
            container.innerHTML += `
                <div class="habit ${h.current >= h.goal ? "done" : ""}">
                    ${h.name}: ${h.current}/${h.goal} ${h.unit}

                    <button onclick="incrementHabit(${i})">
                        +${h.step} ${h.unit}
                    </button>
                </div>
            `;
        }
    });
}
renderHabits();


function toggleHabit(i) {
    habits[i].done = !habits[i].done;

    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

// ===================
// SETTINGS
// ===================

function resetAll() {
    habits = [];
    localStorage.clear();
    
    listContainer.innerHTML = "";

    renderHabits();

    alert("All data reset");
}

function renderHabitSettings() {
    const container = document.getElementById("habitSettingsList");
    container.innerHTML = "";

    habits.forEach((h, i) => {
        container.innerHTML += `
            <div class="settings-item">
                <span>
                    ${h.name} (${h.goal} ${h.unit})
                </span>

                <button onclick="deleteHabit(${i})">🗑️</button>
            </div>
        `;
    });
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));

    renderHabits();
    renderHabitSettings();
}

function updateHabitForm() {
    const type = document.getElementById("habitType").value;

    const goal = document.getElementById("habitGoal");
    const step = document.getElementById("habitStep");
    const unit = document.getElementById("habitUnit");

    if (type === "toggle") {
        goal.style.display = "none";
        step.style.display = "none";
        unit.style.display = "none";
    } else {
        goal.style.display = "block";
        step.style.display = "block";
        unit.style.display = "block";
    }
}
renderHabits();
renderHabitSettings();
updateHabitForm();
