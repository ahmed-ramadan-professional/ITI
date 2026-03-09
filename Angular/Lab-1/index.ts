const email: string = 'ahmed';
const password: string = 'ramadan';
const questionsCount: number = Math.floor(Math.random() * 4) + 4;
let currentQuestion: number = 0;
let num1: number = 0;
let num2: number = 0;
let sign: string = '+';
let solution: number = 0;

const form: HTMLFormElement | null =
    document.querySelector<HTMLFormElement>('#form');

const game: HTMLFormElement | null =
    document.querySelector<HTMLFormElement>('#game');

const end: HTMLFormElement | null =
    document.querySelector<HTMLFormElement>('#end');

const emailInput: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>('#email');

const passwordInput: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>('#password');

const answer: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>('#answer');

const progress: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>('#progress');

const questionInfo: HTMLSpanElement | null =
    document.querySelector<HTMLSpanElement>('#questionInfo');

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (emailInput?.value === email && passwordInput?.value === password) {
        form.style.display = 'none';
        if (game) game.style.display = '';
        runGame();
        form.classList.remove('wrong');
    } else form.classList.add('wrong');
});

function generateEquation(): void {
    const signs: Array<string> = ['+', '-', '*', '/'];
    sign = signs[Math.floor(Math.random() * 4)];
    num1 = Math.floor(Math.random() * 16) + 5;
    num2 =
        sign === '/'
            ? Math.floor(Math.random() * 8) + 3
            : Math.floor(Math.random() * 16) + 5;

    if (sign === '/' && num1 % num2 !== 0) generateEquation();
}

function generateSolution(): void {
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

function runGame(): void {
    currentQuestion++;
    if (progress) progress.innerHTML = `${currentQuestion} / ${questionsCount}`;
    if (answer) answer.value = '';
    game?.classList.remove('wrong');
    generateEquation();
    generateSolution();
    console.log(solution);
    if (questionInfo) questionInfo.innerHTML = `${num1} ${sign} ${num2} = `;
}

function endGame(): void {
    if (game) game.style.display = 'none';
    if (end) end.style.display = '';
}

game?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentQuestion >= questionsCount) endGame();
    if (Number(answer?.value) !== solution) game.classList.add('wrong');
    else runGame();
});
