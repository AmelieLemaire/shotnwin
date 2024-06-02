document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container');
    let btn = document.querySelector('.start_btn');
    let scoreContainer = document.querySelector('.score');
    let timeContainer = document.querySelector('.time');
    let bestScoreContainer = document.querySelector('.best_score');
    let isGameRunning = false;

    function updateBestScoreDisplay() {
        let bestScore = getCookie('bestScore');
        bestScoreContainer.innerHTML = 'Meilleur Score : ' + (bestScore ? bestScore : 0);
    }

    updateBestScoreDisplay();

    btn.onclick = function () {
        if (isGameRunning) {
            return;
        }

        isGameRunning = true;
        let backgroundAudio = new Audio('https://universal-soundbank.com/sounds/5198.mp3');
        backgroundAudio.loop = true;
        backgroundAudio.play();
        let score = 0;
        let time = 30;
        let intervalTime = 1000;

        scoreContainer.innerHTML = 'Score : 0';

        container.innerHTML = '';
        container.style.position = 'relative';

        function showTarget() {
            let target = document.createElement('img');
            target.id = 'target';
            let randomNumber = Math.floor(Math.random() * 11) + 1;
            target.src = 'assets_folder/target-' + randomNumber + '.png';
            container.appendChild(target);

            target.style.position = 'absolute';
            target.style.top = Math.random() * (container.clientHeight - target.clientHeight) + 'px';
            target.style.left = Math.random() * (container.clientWidth - target.clientWidth) + 'px';

            setTimeout(function () {
                target.remove();
            }, 2000);

            target.onclick = function () {
                score += 1;
                target.style.display = 'none';
                scoreContainer.innerHTML = 'Score : ' + score;
                
                let audio = new Audio('https://universal-soundbank.com/sounds/3570.mp3');
                audio.play();

                if (intervalTime > 200) {
                    intervalTime -= 50;
                }

                clearInterval(targetInterval);
                targetInterval = setInterval(showTarget, intervalTime);
            };
        }

        let gameInterval = setInterval(function() {
            time -= 1;
            timeContainer.innerHTML = 'Temps : ' + time;

            if (time === 0) {
                clearInterval(gameInterval);
                clearInterval(targetInterval);
                container.innerHTML = 'Game over';
                container.style.color = 'white';
                container.style.textAlign = 'center';
                container.style.fontSize = '48px';
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.alignItems = 'center';
                container.style.height = '100%';

                backgroundAudio.pause();
                backgroundAudio.currentTime = 0;

                let audio = new Audio('https://universal-soundbank.com/sounds/253.mp3');
                audio.play();

                let bestScore = getCookie('bestScore');
                if (!bestScore || score > bestScore) {
                    setCookie('bestScore', score, 365);
                    updateBestScoreDisplay();
                }

                isGameRunning = false;
            }
        }, 1000);

        let targetInterval = setInterval(showTarget, intervalTime);
    };

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});