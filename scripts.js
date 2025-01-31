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

async function demoLogin() {
    const data = {
        login: {
            text: 'Vladyslav Skrypnyk',
            formElementSelectorId: 'email-input'
        },
        password: {
            text: '1234567890',
            formElementSelectorId: 'password-input'
        }
    }; let timeout = 100;

    await startTyping(data.login.text, data.login.formElementSelectorId, timeout);
    await new Promise(resolve => setTimeout(resolve, 500)); // Задержка между вводами
    await startTyping(data.password.text, data.password.formElementSelectorId, timeout);
    let form = document.getElementById('login-demo'), desktop = document.getElementById('desktop');
    if (form) {
        form.style.display = 'none';
    }
    if (desktop) {
        desktop.style.display = 'grid';
    }
}

function startTyping(text, formElementSelectorId, delay) {
    return new Promise(resolve => {
        const input = document.getElementById(formElementSelectorId);
        if (!input) return resolve(); // Если элемента нет, просто завершаем

        input.value = ""; // Очищаем поле перед началом
        let i = 0;

        function typeNextChar() {
            if (i < text.length) {
                input.value += text[i];
                i++;
                setTimeout(typeNextChar, delay);
            } else {
                resolve(); // Завершаем промис после окончания ввода
            }
        }

        typeNextChar();
    });
}

