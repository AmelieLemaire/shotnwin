document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container');
    let btn = document.querySelector('.start_btn');
    let scoreContainer = document.querySelector('.score');
    let timeContainer = document.querySelector('.time');

    btn.onclick = function () {
        let score = 0;
        let time = 30;
        let intervalTime = 1000;
        container.innerHTML = '';
        container.style.width = '500px';
        container.style.height = '400px';
        container.style.position = 'relative';

        function showTarget() {
            let target = document.createElement('img');
            target.id = 'target';
            let randomNumber = Math.floor(Math.random() * 11) + 1;
            target.src = 'assets_folder/target-' + randomNumber + '.png';
            container.appendChild(target);

            target.style.position = 'absolute';
            target.style.top = Math.random() * (container.clientHeight - target.offsetHeight) + 'px';
            target.style.left = Math.random() * (container.clientWidth - target.offsetWidth) + 'px';

            setTimeout(function () {
                target.remove();
            }, 2000);

            target.onclick = function () {
                score += 1;
                target.style.display = 'none';
                scoreContainer.innerHTML = 'Score: ' + score;
                
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
            timeContainer.innerHTML = 'Time: ' + time;

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
            }
        }, 1000);

        let targetInterval = setInterval(showTarget, intervalTime);
    };
});
