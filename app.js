const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let today = new Date().toDateString();
let savedDate = localStorage.getItem("date");

if (savedDate !== today) {
    localStorage.setItem("water", 0);
    localStorage.setItem("reading", 0);
    localStorage.setItem("date", today);
}

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("you must write something");
        inputBox.value = "";
        return;
    } else {
        let li = document.createElement("li");
        li.textContent  = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent  = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }   else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
showTask();

let water = Number(localStorage.getItem("water")) || 0;
    document.getElementById("waterValue").textContent = water;
let reading = Number(localStorage.getItem("reading")) || 0;
    document.getElementById("readingValue").textContent = reading;

function addWater() {
    water += 250;
    document.getElementById("waterValue").textContent = water;

    localStorage.setItem("water", water);

    if (water >= 2500) {
        document.querySelector(".habit-water").classList.add("done");
    } else {
        document.querySelector(".habit-water").classList.remove("done");
    }
}

function addReading() {
    reading += 5;
    document.getElementById("readingValue").textContent = reading;

    localStorage.setItem("reading", reading);

    if (reading >= 30) {
        document.querySelector(".habit-reading").classList.add("done");
    } else
    if (reading < 30) {
        document.querySelector(".habit-reading").classList.remove("done");
    }
}

function gymDone() {
    document.querySelector(".habit-gym").classList.toggle("done");
}

