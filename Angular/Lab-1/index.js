const email = 'ahmed';
const password = 'ramadan';
const questionsCount = Math.floor(Math.random() * 4) + 4;
let currentQuestion = 0;
let num1 = 0;
let num2 = 0;
let sign = '+';
let solution = 0;
const form = document.querySelector('#form');
const game = document.querySelector('#game');
const end = document.querySelector('#end');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const answer = document.querySelector('#answer');
const progress = document.querySelector('#progress');
const questionInfo = document.querySelector('#questionInfo');
console.log('email: ahmed');
console.log('password: ramadan');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (emailInput?.value === email && passwordInput?.value === password) {
        form.style.display = 'none';
        if (game)
            game.style.display = '';
        runGame();
        form.classList.remove('wrong');
    }
    else
        form.classList.add('wrong');
});
function generateEquation() {
    const signs = ['+', '-', '*', '/'];
    sign = signs[Math.floor(Math.random() * 4)];
    num1 = Math.floor(Math.random() * 16) + 5;
    num2 =
        sign === '/'
            ? Math.floor(Math.random() * 8) + 3
            : Math.floor(Math.random() * 16) + 5;
    if (sign === '/' && num1 % num2 !== 0)
        generateEquation();
}
function generateSolution() {
    switch (sign) {
        case '+':
            solution = num1 + num2;
            break;
        case '-':
            solution = num1 - num2;
            break;
        case '*':
            solution = num1 * num2;
            break;
        case '/':
            solution = num1 / num2;
            break;
    }
}
function runGame() {
    currentQuestion++;
    if (progress)
        progress.innerHTML = `${currentQuestion} / ${questionsCount}`;
    game?.classList.remove('wrong');
    generateEquation();
    generateSolution();
    console.log(solution);
    if (questionInfo)
        questionInfo.innerHTML = `${num1} ${sign} ${num2} = `;
}
function endGame() {
    if (game)
        game.style.display = 'none';
    if (end)
        end.style.display = '';
}
game?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentQuestion >= questionsCount)
        endGame();
    if (Number(answer?.value) !== solution)
        game.classList.add('wrong');
    else
        runGame();
    if (answer)
        answer.value = '';
});
