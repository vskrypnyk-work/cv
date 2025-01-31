let isDragging = false;
let offsetX, offsetY;
let currentWindow = null;

function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = 'block'; // Показываем окно
        currentWindow = windowElement;
    }
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none'; // Скрываем окно
}

function startDragging(e) {
    isDragging = true;
    const windowElement = e.target.closest('.window');
    currentWindow = windowElement;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
}

function dragWindow(e) {
    if (isDragging && currentWindow) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;
        currentWindow.style.left = left + 'px';
        currentWindow.style.top = top + 'px';
    }
}

function stopDragging() {
    isDragging = false;
}

document.querySelectorAll('.title-bar').forEach(titleBar => {
    titleBar.addEventListener('mousedown', startDragging); // Начало перетаскивания
});

document.addEventListener('mousemove', dragWindow); // Перемещение
document.addEventListener('mouseup', stopDragging); // Конец перетаскивания