const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// =====================
// STATE
// =====================
let today = new Date().toDateString();
let savedDate = localStorage.getItem("date");

// reset daily data
if (savedDate !== today) {
    localStorage.setItem("water", 0);
    localStorage.setItem("reading", 0);
    localStorage.setItem("gym", "false");
    localStorage.setItem("date", today);
}

// load state
let water = Number(localStorage.getItem("water")) || 0;
let reading = Number(localStorage.getItem("reading")) || 0;
let gym = localStorage.getItem("gym") === "true";

// =====================
// INIT UI
// =====================
function updateUI() {
    document.getElementById("waterValue").textContent = water;
    document.getElementById("readingValue").textContent = reading;

    document.querySelector(".habit-water")
        .classList.toggle("done", water >= 2500);

    document.querySelector(".habit-reading")
        .classList.toggle("done", reading >= 30);

    document.querySelector(".habit-gym")
        .classList.toggle("done", gym);
}

updateUI();

// =====================
// HABITS
// =====================
function addWater() {
    water += 250;
    localStorage.setItem("water", water);
    updateUI();
}

function addReading() {
    reading += 5;
    localStorage.setItem("reading", reading);
    updateUI();
}

function gymDone() {
    gym = !gym;
    localStorage.setItem("gym", gym);
    updateUI();
}

// =====================
// TODO LIST
// =====================
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("you must write something");
        return;
    }

    let li = document.createElement("li");
    li.textContent = inputBox.value;

    let span = document.createElement("span");
    span.textContent = "\u00d7";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// =====================
// STORAGE (TODO)
// =====================
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

loadData();

// =====================
// ENTER SUPPORT
// =====================
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});


const pages = {
    habits: document.getElementById("habitsPage"),
    streak: document.getElementById("streakPage"),
    progress: document.getElementById("progressPage"),
    settings: document.getElementById("settingsPage")
};

const navItems = document.querySelectorAll(".nav-item");

function showPage(page) {
    Object.values(pages).forEach(p => p.style.display = "none");
    pages[page].style.display = "block";
}

navItems.forEach(item => {
    item.addEventListener("click", () => {

        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const page = item.dataset.page;
        showPage(page);
    });
});

// default page
showPage("habits");

// 👇 sem to přidej
document.querySelector('[data-page="habits"]').classList.add("active");