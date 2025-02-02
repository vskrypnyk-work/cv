document.addEventListener('DOMContentLoaded', demoLogin);

async function demoLogin() {
    let timeout = 100;
    await startTyping(data.login.text, data.login.formElementSelectorId, timeout);
    await new Promise(resolve => setTimeout(resolve, 500));
    await startTyping(data.password.text, data.password.formElementSelectorId, timeout);
    await showLoader();
}

function showLoader() {
    let button = document.getElementsByClassName('btn');
    if (button) {
        button = button[0];
        button.classList.add('loading');
        button.disabled = true;
        button.textContent = 'Logging in...';
    }
    setTimeout(
        function () {
            let form = document.getElementById('login-demo'),
                desktop = document.getElementById('desktop');
            if (form) {
                form.parentElement.style.display = 'none';
            }
            if (desktop) {
                desktop.style.display = 'grid';
            }
        },
        1000
    );
}

function startTyping(text, formElementSelectorId, delay) {
    return new Promise(resolve => {
        const input = document.getElementById(formElementSelectorId);
        if (!input) return resolve();

        input.value = "";
        let i = 0;

        function typeNextChar() {
            if (i < text.length) {
                input.value += text[i];
                i++;
                setTimeout(typeNextChar, delay);
            } else {
                resolve();
            }
        }

        typeNextChar();
    });
}