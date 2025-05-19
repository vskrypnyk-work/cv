let isDragging = false;
let offsetX, offsetY;
let currentWindow = null;
let currentPosition = null;
const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];

function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = 'block';
        currentWindow = windowElement;
        const nextPosition = positions[(positions.indexOf(currentPosition) + 1) % positions.length];
        windowElement.classList.remove(currentPosition);
        windowElement.classList.add(nextPosition);
        currentPosition = nextPosition;
    }
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = 'none';
    }
}

function minimize(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        if (windowElement.classList.contains('minimized')) {
            windowElement.classList.remove('minimized');
            windowElement.children.item(1).style.display = 'block';
        } else {
            windowElement.classList.add('minimized');
            windowElement.children.item(1).style.display = 'none';
        }
    }
}

function startDragging(e) {
    isDragging = true;
    const windowElement = e.target.closest('.window');
    currentWindow = windowElement;

    let clientX, clientY;
    if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    offsetX = clientX - windowElement.offsetLeft;
    offsetY = clientY - windowElement.offsetTop;
}

function dragWindow(e) {
    if (!isDragging || !currentWindow) return;

    let clientX, clientY;
    if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const left = clientX - offsetX;
    const top = clientY - offsetY;
    currentWindow.style.left = left + 'px';
    currentWindow.style.top = top + 'px';
}

function stopDragging() {
    isDragging = false;
}

document.querySelectorAll('.title-bar').forEach(titleBar => {
    titleBar.addEventListener('mousedown', startDragging);
    titleBar.addEventListener('touchstart', startDragging, { passive: false });
});

document.addEventListener('mousemove', dragWindow);
document.addEventListener('touchmove', dragWindow, { passive: false });

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);