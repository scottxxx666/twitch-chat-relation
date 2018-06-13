var options = {
    options: {
    	client: 'omgox7wm9lrj9ilmgmug3kirtqshor',
        debug: true,
    },
    connection: {
        reconnect: true,
        secure: true,
    },
    channels: ["#scottxxx666"]
};

var client = new tmi.client(options);
var background = document.querySelector('#background');
var relation = document.querySelector('#relation');
var arrow = document.querySelector('#arrow');
var arrowIcon = document.querySelector('#arrow_icon');
var score = 0;
var step = 1;
var stages = ['敵對', '冷淡', '中立', '友好', '親密']
var stage = 2;

function handleMessage(message) {
	if (message.match(/\^{3,}/)) {
		addScore();
	}
	if (message.match(/v{3,}/i)) {
		subtrateScore();
	}
}

function addScore() {
	if (stage >= (stages.length - 1)) {
		return;
	}
	score++;
	if (score >= step) {
	    score = 0;
	    addStage();
	}
}

function subtrateScore() {
	if (stage <= 0) {
		return;
	}
	score--;
	if (score <= (-step)) {
	    score = 0;
	    subtrateStage();
	}
}

function addStage() {
	stage++;
	// arrow.innerText = '^';
	relation.innerText = stages[stage];
	resetArrow();
	arrowIcon.classList.add('up');
	arrow.classList.add('move-up');
	background.classList.add('show');
	arrow.style.color = 'blue';
}

function subtrateStage() {
	stage--;
	// arrow.innerText = 'V';
	relation.innerText = stages[stage];
	resetArrow();
	arrowIcon.classList.add('down');
	arrow.classList.add('move-down');
	background.classList.add('show');
	arrow.style.color = 'red';
}

function resetArrow() {
    arrowIcon.classList.remove('up', 'down');
    arrow.classList.remove('move-up', 'move-down');
    background.classList.remove('show');
}

arrow.addEventListener("animationend", resetArrow);
arrow.addEventListener("webkitAnimationEnd", resetArrow);

// Connect the client to the server..
client.connect();

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    // Do your stuff.
    handleMessage(message);
});