// 1. НАСТРОЙКА ПАДЕНИЯ САКУРЫ (PARTICLES.JS)
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffb7c5" }, // Цвет лепестков
            "shape": { "type": "circle" },
            "opacity": { "value": 0.7, "random": true },
            "size": { "value": 7, "random": true },
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 2, // Скорость падения
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// 2. ЗВУК КЛИКА (BASE64)
const clickAudio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm");

// 3. ПЕРЕМЕННЫЕ И ПАСХАЛКА
let eggClicks = 0;

// 4. ОСНОВНАЯ ЛОГИКА ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const avatar = document.getElementById('avatar-trigger');
    const card = document.querySelector('.card');
    const audio = document.getElementById('bg-audio');
    const volumeSlider = document.getElementById('volume-slider');

    // Настройка громкости
    if (audio && volumeSlider) {
        audio.volume = volumeSlider.value;
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            const icon = document.getElementById('music-icon');
            if (audio.volume == 0) icon.innerText = "🔇";
            else if (!audio.paused) icon.innerText = "🔊";
        });
    }

    // КАСКАДНОЕ ПЛАВНОЕ ПОЯВЛЕНИЕ КНОПОК
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 600 + (index * 150));

        item.addEventListener('mousedown', () => {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => {});
        });
    });

    // ПАСХАЛКА (10 КЛИКОВ ПО ФОТО)
    if (avatar) {
        avatar.addEventListener('click', () => {
            eggClicks++;
            if (eggClicks === 10) {
                card.classList.add('easter-egg-spin');
                if (window.pJSDom) window.pJSDom[0].pJS.fn.modes.pushParticles(50);
                setTimeout(() => card.classList.remove('easter-egg-spin'), 1000);
                eggClicks = 0;
            }
        });
    }
});

// 5. УПРАВЛЕНИЕ МУЗЫКОЙ И ВЕТРОМ
function toggleMusic() {
    const audio = document.getElementById('bg-audio');
    const player = document.querySelector('.music-player');
    const icon = document.getElementById('music-icon');
    const pJS = window.pJSDom && window.pJSDom[0].pJS;

    if (audio.paused) {
        audio.play().catch(() => {
            alert("Кликните в любом месте сайта, чтобы разрешить музыку!");
        });
        icon.innerText = "🔊";
        player.classList.add('music-playing');
        if (pJS) pJS.particles.move.speed = 8; // Ускоряем сакуру (ветер)
    } else {
        audio.pause();
        icon.innerText = "🔇";
        player.classList.remove('music-playing');
        if (pJS) pJS.particles.move.speed = 2; // Замедляем
    }
}

// 6. КОПИРОВАНИЕ (DISCORD / ССЫЛКА)
function copyValue(val, id, originalText) {
    const btn = document.getElementById(id);
    const span = btn.querySelector('span');

    // Если мы на компьютере (file://), window.location.href может выдать путь к файлу. 
    // Если сайт уже в сети, он выдаст ссылку https://.
    const textToCopy = val;

    if (navigator.clipboard && window.isSecureContext) {
        // Современный способ
        navigator.clipboard.writeText(textToCopy).then(() => {
            showSuccess(btn, span, originalText);
        });
    } else {
        // Запасной способ для локальных файлов
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showSuccess(btn, span, originalText);
        } catch (err) {
            console.error('Не удалось скопировать', err);
        }
        document.body.removeChild(textArea);
    }
}

// Вспомогательная функция для эффектов
function showSuccess(btn, span, originalText) {
    btn.classList.add('shake-animation');
    span.innerText = "Скопировано!";
    setTimeout(() => {
        btn.classList.remove('shake-animation');
        span.innerText = originalText;
    }, 1200);
}
function updateStatus() {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    const hour = new Date().getHours();

    // Настройка времени: спит с 00:00 до 08:00
    if (hour >= 0 && hour < 8) {
        dot.className = 'offline-dot';
        text.innerText = 'Хэй-Кси сейчас спит 💤';
    } else {
        dot.className = 'online-dot';
        text.innerText = 'Хэй-Кси сейчас в сети 🟢';
    }
}

// Запускаем проверку при загрузке
updateStatus();
// И обновляем каждую минуту на случай, если вкладка открыта долго
setInterval(updateStatus, 60000);




