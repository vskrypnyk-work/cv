document.addEventListener('DOMContentLoaded', demoLogin);

const data = {
    login: {
        text: 'Vladyslav Skrypnyk',
        formElementSelectorId: 'email-input'
    },
    password: {
        text: '1234567890',
        formElementSelectorId: 'password-input'
    }
};

async function demoLogin() {
    let timeout = 100;
    await startTyping(data.login.text, data.login.formElementSelectorId, timeout);
    await new Promise(resolve => setTimeout(resolve, 500));
    await startTyping(data.password.text, data.password.formElementSelectorId, timeout);
    let form = document.getElementById('login-demo'),
        desktop = document.getElementById('desktop'),
        clock = document.getElementById('clock'),
        settingsIcon = document.getElementById('settings-icon');
    if (form) {
        form.parentElement.style.display = 'none';
    }
    if (desktop) {
        desktop.style.display = 'grid';
    }
    if (clock) {
        clock.style.display = 'block'
    }
    if (settingsIcon) {
        settingsIcon.style.display = 'inline-block';
    }
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