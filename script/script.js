/* selecting elements */
const rulebtn = document.getElementById('rules');
const ruleCard = document.querySelector(".rulescard");
const closebtn = document.getElementById('close');
const mainDiv = document.getElementById('first');
const secDiv = document.getElementById('second');
const scoreCard = document.getElementById('score');
const playagain = document.getElementById('finalMsg');
/* rule btn logic */
rulebtn.addEventListener('click', () => ruleCard.classList.toggle('showrule'));
closebtn.addEventListener('click', () => ruleCard.classList.remove('showrule'));
/* selection of image */
document.getElementById('scissor').addEventListener('click', clickbtn);
document.getElementById('paper').addEventListener('click', clickbtn);
document.getElementById('rock').addEventListener('click', clickbtn);
/* playagain logic */
playagain.addEventListener('click', () => {
    mainDiv.classList.remove('hide');
    secDiv.classList.remove('show');
});
/* button clicked logic */
function clickbtn(e) {
    /* get element id*/
    let myChoice = e.target.id;
    /* bot logic */
    let botChoice = botchoose();
    /* calclating scores */
    let scores = decideScore(myChoice, botChoice);
    /* winner logic */
    let decideWinner = winners(scores, myChoice, botChoice);
    /* on screen work */
    frotntend(myChoice, botChoice, decideWinner);
}
function botchoose() {
    const choices = ['rock', 'scissor', 'paper'];
    return choices[Math.floor(Math.random() * 3)];
}
function decideScore(myChoice, botChoice) {
    const rpsData = {
        'rock': { 'rock': 0.5, 'paper': 0, 'scissor': 1 },
        'scissor': { 'rock': 0, 'paper': 1, 'scissor': 0.5 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 }
    }
    let yourScore = rpsData[myChoice][botChoice];
    let botScore = rpsData[botChoice][myChoice];
    return [yourScore, botScore]
}
function winners([yourScore, botScore], myChoice, botChoice) {
    if (yourScore === 1) {
        scoreCard.innerHTML = ` ${parseInt(scoreCard.innerHTML) + 1}`;
        return {
            message: 'You won',
            'winner': myChoice,
            color: 'green',
        };
    }
    else if (yourScore === 0.5) {
        return { message: 'draw', 'winner': 'none', color: 'var(--scisoor-1)' }
    }
    else if (yourScore === 0) {
        scoreCard.innerHTML = ` ${parseInt(scoreCard.innerHTML) - 1}`;
        return { message: 'You lost', 'winner': botChoice, color: 'red' }
    }

}
function frotntend(myChoice, botChoice, decideWinner) {
    /* remove selection display */
    mainDiv.classList.add('hide');
    /* show result display */
    secDiv.classList.add('show');
    let humanDiv = document.getElementById('mychoice');
    let botDiv = document.getElementById('botchoice');
    let msgDiv = document.getElementById('finalMsg');
    humanDiv.innerHTML = `<h4>You picked</h4>
    <img src="images/icon-${myChoice}.svg" class="img img-${myChoice}" alt="">`;
    msgDiv.innerHTML = ` <h2>${decideWinner.message}</h2>
    <button id="playagain">Play again</button>`;
    botDiv.innerHTML = `<h4>The house picked</h4>
        <img src="images/icon-${botChoice}.svg" class="img img-${botChoice}" alt="">`
}
