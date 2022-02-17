let imgItem = document.querySelectorAll('.img-item');
let imgs = document.querySelectorAll('.img');
let temp = document.querySelectorAll('#cover');
let holdingValue = '';
let flips = document.getElementById('flips');
let score = document.getElementById('score');
let noOfFlips = 0;
let scoreNum = 0;
let unflipnum;
let pauseBool = false;
imgItem.forEach(
    (button) => {
        function removePause() {
            pauseBool = false;
            console.log('resuming');
        }
        function pause() {
            pauseBool = true;
            console.log('paused');
            setTimeout(removePause, 1000);
        }
        function flipIt(e) {
            let num = e.target.parentElement.dataset.num; // number of the item

            // If the holding value is empty and the image box is black color flip it
            if (holdingValue === '' && e.target.className !== 'img' && pauseBool !== true) {
                // if item is holding black color, flip it to image
                if (e.target.id === 'cover') {
                    imgs[num - 1].style.display = 'block';
                    temp[num - 1].style.display = 'none';
                    holdingValue = imgs[num - 1].parentElement.dataset.name;
                    unflipnum = num - 1;
                }
                noOfFlips += 1;
            }
            // if holding value is NOT empty and image box is still black color
            else if (holdingValue !== '' && e.target.className !== 'img' && pauseBool !== true) {
                // check for holding value
                if (e.target.parentElement.dataset.name === holdingValue) {
                    imgs[num - 1].style.display = 'block';
                    temp[num - 1].style.display = 'none';
                    holdingValue = '';
                    function updateScore() {
                        scoreNum += 10;
                        score.innerHTML = scoreNum;
                    }
                    setTimeout(updateScore, 200);
                    document.getElementById('mySound').play();
                    pause();
                } else {
                    function close() {
                        console.log('bad');
                        imgs[num - 1].style.display = 'none';
                        temp[num - 1].style.display = 'block';
                        imgs[unflipnum].style.display = 'none';
                        temp[unflipnum].style.display = 'block';
                        unflipnum = undefined;
                        holdingValue = '';
                        scoreNum -= 1;
                        score.innerHTML = scoreNum;
                    }
                    imgs[num - 1].style.display = 'block';
                    temp[num - 1].style.display = 'none';
                    document.getElementById('mySound2').play();
                    setTimeout(close, 1000);
                    pause();
                }
                noOfFlips += 1;
            }
            flips.innerHTML = noOfFlips;
        }
        button.addEventListener('click', flipIt); // Added event listener to every image box
    }
)