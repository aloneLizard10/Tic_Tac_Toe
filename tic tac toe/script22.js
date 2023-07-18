const arrowContainer = document.getElementById('arrow-container');
const ball = document.getElementById('ball');
const bowString = document.getElementById('bow-string');
const bow = document.getElementById('bow-container');
const bowLimb = document.getElementsByClassName('bow-limb');

let arrowsLeft = 10;
let score = 0;
let arrowInMotion = false;

function checkCollision(rect1, rect2) {
	return !(rect1.right < rect2.left || 
			 rect1.left > rect2.right || 
			 rect1.bottom < rect2.top || 
			 rect1.top > rect2.bottom);
}

function moveArrow() {
	const arrow = document.createElement('div');
	arrow.classList.add('arrow');
	arrowContainer.appendChild(arrow);
	arrowsLeft--;
	arrowInMotion = true;

	const bowStringRect = bowString.getBoundingClientRect();
	const bowRect = bow.getBoundingClientRect();

	const arrowInterval = setInterval(() => {
		const arrowRect = arrow.getBoundingClientRect();
		const ballRect = ball.getBoundingClientRect();

		if (checkCollision(arrowRect, ballRect)) {
			score++;
			arrow.remove();
			clearInterval(arrowInterval);
			arrowInMotion = false;
		}

		if (arrow.offsetTop < 0) {
			arrow.remove();
			clearInterval(arrowInterval);
			arrowInMotion = false;
		}

		arrow.style.top = `${arrow.offsetTop - 10}px`;
	}, 50);
}

document.addEventListener('keydown', (event) => {
	if (event.code === 'ArrowUp' && arrowsLeft > 0 && !arrowInMotion) {
		moveArrow();
	}
});

setInterval(() => {
	const ballSpeed = Math.min(10, score + 1);
	ball.style.top = `${ball.offsetTop + ballSpeed}px`;

	if (ball.offsetTop > window.innerHeight) {
		alert(`Game over! You scored ${score} points.`);
		location.reload();
	}
}, 50);

document.addEventListener('mousemove', (event) => {
	const mouseX = event.clientX;
	const mouseY = event.clientY;
	const bowRect = bow.getBoundingClientRect();

	const bowCenterX = bowRect.left + bowRect.width / 2;
	const bowCenterY = bowRect.top + bowRect.height / 2;

	const angle = Math.atan2(mouseY - bowCenterY, mouseX - bowCenterX);
	const angleDeg = angle * 180 / Math.PI;

	bow.style.transform = `rotate(${angleDeg}deg)`;

	for (let i = 0; i < bowLimb.length; i++) {
		bowLimb[i].style.transform = `rotate(${angleDeg}deg)`;
	}
});

document.addEventListener('mouseup', () => {
	if (!arrowInMotion) {
		moveArrow();
	}
});

document.addEventListener('keyup', () => {
	clearInterval(arrowInterval);
	arrowInMotion = false;
});