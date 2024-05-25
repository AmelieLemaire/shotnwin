document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container');
    let btn = document.querySelector('.start_btn');
    let scoreContainer = document.querySelector('.score');
    let timeContainer = document.querySelector('.time');

    btn.onclick = function () {
        let score = 0;
        let time = 10;
        container.innerHTML = '';
        container.style.width = '500px';
        container.style.height = '400px';

        let interval = setInterval(function showTarget() {
            let target = document.createElement('img');
            target.id = 'target';
            let randomNumber = Math.floor(Math.random() * 11) + 1;
            target.src = 'assets_folder/target-' + randomNumber + '.png';
            container.appendChild(target);

            target.style.position = 'absolute';
            target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
            target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';

            setTimeout(function () {
                target.remove();
            }, 2000);

            target.onclick = function () {
                score += 1;
                target.style.display = 'none';
                scoreContainer.innerHTML = 'Score: ' + score;
            };

            time -= 1;
            timeContainer.innerHTML = 'Time: ' + time;

            if (time === 0) {
                clearInterval(interval);
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
    };
});
