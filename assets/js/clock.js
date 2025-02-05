const settingsBtn = document.querySelector(".settings-btn");
const settingsMenu = document.getElementById("settings-menu");
const showSecondsCheckbox = document.getElementById("show-seconds");
const toggle24hCheckbox = document.getElementById("toggle-24h");

settingsBtn.addEventListener("click", () => {
    if (settingsMenu) {
        settingsMenu.style.display = "block";
    }
});

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    if (!toggle24hCheckbox.checked) {
        hours = hours % 12 || 12;
    }

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let timeString = toggle24hCheckbox.checked
        ? `${hours}:${minutes}${showSecondsCheckbox.checked ? ":" + seconds : ""}`
        : `${hours}:${minutes}${showSecondsCheckbox.checked ? ":" + seconds : ""} ${ampm}`;

    document.querySelector(".clock").innerText = timeString;
}

function saveSettings() {
    localStorage.setItem("showSeconds", showSecondsCheckbox.checked);
    localStorage.setItem("toggle24h", toggle24hCheckbox.checked);
}

function loadSettings() {
    const showSeconds = localStorage.getItem("showSeconds") === "true";
    const toggle24h = localStorage.getItem("toggle24h") === "true";

    showSecondsCheckbox.checked = showSeconds;
    toggle24hCheckbox.checked = toggle24h;
}

showSecondsCheckbox.addEventListener("change", () => {
    saveSettings();
    updateClock();
});

toggle24hCheckbox.addEventListener("change", () => {
    saveSettings();
    updateClock();
});

loadSettings();
updateClock();
setInterval(updateClock, 1000);