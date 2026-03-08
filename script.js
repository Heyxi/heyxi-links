const clickAudio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm");
let eggClicks = 0;



if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 50 }, "color": { "value": "#ffb7c5" },
            "shape": { "type": "circle" }, "opacity": { "value": 0.7 },
            "size": { "value": 7, "random": true },
            "move": { "enable": true, "speed": 2, "direction": "bottom", "out_mode": "out" }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    const items = document.querySelectorAll('.item');
    const avatar = document.getElementById('avatar-trigger');
    const card = document.querySelector('.card');

    items.forEach((item, index) => {
        setTimeout(() => item.classList.add('visible'), 600 + (index * 150));
        item.addEventListener('mousedown', () => {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(()=>{});
        });
    });

    avatar.addEventListener('click', () => {
        eggClicks++;
        if (eggClicks === 10) {
            card.classList.add('easter-egg-spin');
            if (window.pJSDom) window.pJSDom.pJS.fn.modes.pushParticles(50);
            setTimeout(() => card.classList.remove('easter-egg-spin'), 1000);
            eggClicks = 0;
        }
    });
});

function toggleMusic() {
    const audio = document.getElementById('bg-audio');
    const player = document.querySelector('.music-player');
    const icon = document.getElementById('music-icon');
    const pJS = window.pJSDom && window.pJSDom.pJS;
    if (audio.paused) {
        audio.play().catch(() => {});
        icon.innerText = "🔊";
        if (pJS) pJS.particles.move.speed = 8;
    } else {
        audio.pause();
        icon.innerText = "🔇";
        if (pJS) pJS.particles.move.speed = 2;
    }
}

function copyValue(val, id, original) {
    const btn = document.getElementById(id);
    const span = btn.querySelector('span');
    navigator.clipboard.writeText(val).then(() => {
        btn.classList.add('shake-animation');
        span.innerText = "Скопировано!";
        setTimeout(() => {
            btn.classList.remove('shake-animation');
            span.innerText = original;
        }, 1000);
    });
}
