var initObj = {
    quantityBalls: 80,
    quantityRandBall: 15,
}

document.getElementById('remove_numbers').addEventListener('click', function () {
    document.querySelectorAll('.button_board').forEach(e => {
        e.classList.remove('animated_button')
        e.classList.remove('balls_in_box')
        e.classList.remove('active')
    });
    payment.innerHTML = '<div class="title_payment"><span>Лунки</span><span>Очки</span><div>'
    playerSelectedBox = [];
    arrFiled = [];

}, false)
// document.getElementById('increment').addEventListener('click', function () {
//     let val=document.getElementById('stavka').value;
//     val+= 0.5;
//     document.getElementById('stavka').value= Number(val)
// }, false)
// document.getElementById('increment').addEventListener('click', function () {
//     let val=document.getElementById('stavka').value;
//     val-= 0.5;
//     document.getElementById('stavka').value= Number(val)
// }, false)


// Игрок выбирает количество цифров
let playerSelectedBox = [0];

// Функция инициализация проекта
function initGame() {

}

// Функция отправка события
function sendEvent() {

}

// Функция syncstate синхронизация состояния поля
function syncState() {

}
// Функция onrecieveSent полчение событий
function onRecieveEvent() {

}
let arrFiled = [];
let board = document.getElementById('board');
let circle = document.getElementById('circle');
let payment = document.getElementById('payment');
for (let i = 0; i < initObj.quantityBalls; i++) {
    let child = document.createElement('button');
    child.setAttribute('id', `id` + (i + 1));
    child.setAttribute('data-id', i + 1);
    child.setAttribute('data-click', false);
    child.textContent = i + 1;
    child.classList.add('button_board')
    arrFiled.push(i)
    board.append(child)
}
function addActiveButton(e) {
    let element = e.target;

    // console.log(element.getAttribute('data-click'), false)
    if (element.getAttribute('data-click') == "false") {
        element.classList.add('active');
        element.setAttribute('data-click', true);
    }
    else {
        element.classList.remove('active');
        element.setAttribute('data-click', false);
    }
    playerSelectedBox = []
    document.querySelectorAll('.button_board').forEach(e => {
        if (e.getAttribute('data-click') == "true") {
            let num = e.getAttribute('data-id');
            playerSelectedBox.push(Number(num))
        }
    });
    console.log(playerSelectedBox, 'playerSelectedBox')
    // Тут вызвать функцию которая создает для поле выплаты баллы и значение в зависимости от количество выбранных;
    paymentMonitor(countPayments(playerSelectedBox, arrPayments));
    document.getElementById('start').addEventListener('click', startGame, false);
}

function startGame() {
    document.querySelectorAll('.button_board').forEach(e => {
        e.classList.remove('animated_button');
        e.classList.remove('balls_in_box');
    });

    let arrBalls = shuffle(arrFiled).splice(0, 20);
    console.log(arrBalls, "arrballs after start")
    for (let x = 0; x < arrBalls.length; x++) {
        setTimeout(() => {
            setTimeout(()=>{
                let ballItem = document.createElement('div');
                ballItem.classList.add('ballItem');
                ballItem.innerHTML = arrBalls[x];
                circle.insertBefore(ballItem, circle.firstChild);
    
            },200)
           
            setTimeout(() => {
                let xy = arrBalls[x] % 10;
                if (xy == 0) {
                    xy = 10;
                }

                document.querySelectorAll('.left_animation')[0].classList.add("active");
                document.querySelectorAll('.top_animation')[0].classList.add("active");
                document.querySelectorAll('.left_animation.active')[0].style.left = (xy - 1) * 10 + 2 + `%`;
                document.querySelectorAll('.top_animation.active')[0].style.top = (((arrBalls[x] - xy) / 10) * 12.5) + 2 + `%`;
            },300)


            setTimeout(() => {
                document.getElementById(`id` + arrBalls[x]).classList.add('balls_in_box')
            }, 1000);

        }, 1500 * x);
        document.querySelectorAll('.left_animation.active').forEach(x => {
            x.classList.remove('active')
        });
        document.querySelectorAll('.top_animation.active').forEach(x => {
            x.classList.remove('active')
        });
    }
    document.querySelectorAll('.left_animation.active').forEach(x => {
        x.classList.remove('active')
    });
    document.querySelectorAll('.top_animation.active').forEach(x => {
        x.classList.remove('active')
    });
    console.log(arrBalls)

    let count1 = countPayments(playerSelectedBox, arrPayments);
    let count2 = countWin(playerSelectedBox, arrBalls)
    this.style.color = "#000";
    pointsPLayer(count2, count1);
    var returnObject = pointsPLayer(count2, count1);
    for (let i = 0; i < returnObject.boxes.length; i++) {
        document.getElementById(`id` + returnObject.boxes[i]).classList.add('animated_button');
    }
    document.getElementById(`item_payment` + returnObject.quantity).classList.add('animated_item');
    console.log(pointsPLayer(count2, count1), 21454545)
    document.getElementById('money').innerHTML = document.getElementById('stavka').value * returnObject.payment
}
console.log(playerSelectedBox, 'playerSelectedBox')
document.getElementById('board').addEventListener('click', addActiveButton, false)

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
shuffle(arrFiled);


// let arrballsbefore = shuffle(arrFiled).splice(0, 40);
// let arrayballs = []
// for (let i = 0; i < arrballsbefore.length; i++) {
//     let color = Math.floor(Math.random() * 16777215);
//     color = (+color).toString(16)
//     console.log(color, "color");
//     let childball = document.createElement('div');
//     childball.classList.add(`balls`);
//     childball.style.background = `radial-gradient(#fff, #` + color + `)`
//     circle.append(childball);
//     arrayballs.push(childball)
// }
// console.log(arrballsbefore, "arrballs before start")

// Таблица выплаты (Можно сгенерировать из админ панели)
let arrPayments = [
    [3, 0, 0, 0, 0, 0, 0, 0],
    [1, 6, 0, 0, 0, 0, 0, 0],
    [0, 2.5, 29, 0, 0, 0, 0, 0],
    [0, 1, 4.5, 115, 0, 0, 0, 0],
    [0, 0, 3, 30, 210, 0, 0, 0],
    [0, 0, 1.5, 11, 65, 330, 0, 0],
    [0, 0, 1, 5, 22, 140, 900, 0],
    [1, 1, 1, 3, 14, 65, 500, 1800]
]
// Функция котрая проверяет на наличие сходства чисел и возвращает их количество и значение
function countWin(playerSelectedBox, arrBalls) {
    let count = 0;
    let arrcount = []
    for (let i = 0; i < playerSelectedBox.length; i++) {
        for (j = 0; j < arrBalls.length; j++) {
            if (playerSelectedBox[i] == arrBalls[j]) {
                count++;
                arrcount.push(playerSelectedBox[i]);
            }
        }
    }
    return [count, arrcount]
}
console.log(countWin(playerSelectedBox, arrBalls));

// Функция которая получает на вход количество выбранных игроку цифры и возврашает таблицу  выплати (лунки очки)
function countPayments(playerSelectedBox, arrPayments) {
    if (playerSelectedBox.length > arrPayments.length) {
        console.log("Error!")
        return
    }
    let arr = []
    for (let i = 0; i < playerSelectedBox.length; i++) {
        let abc = [];
        abc[0] = i + 1;
        abc[1] = arrPayments[playerSelectedBox.length - 1][i];
        arr.push(abc)
    }
    return arr
}
payment.innerHTML = '<div class="title_payment"><span>Лунки</span><span>Очки</span><div>'
// Функция которая нарисует на доску выплаты их значение
function paymentMonitor(varPayment) {
    payment.innerHTML = '<div class="title_payment"><span>Лунки</span><span>Очки</span><div>'
    for (let i = 0; i < varPayment.length; i++) {
        let child = document.createElement('div');
        child.classList.add('item_payment');
        child.setAttribute('id', `item_payment` + (i + 1))
        child.innerHTML = `<span class="quantity_num">` + varPayment[i][0] + `</span> <span class="payment_of_num">` + varPayment[i][1] + `</span>`
        payment.append(child)
    }
}
console.log(countPayments(playerSelectedBox, arrPayments), 121212)
let count1 = countPayments(playerSelectedBox, arrPayments);
let count2 = countWin(playerSelectedBox, arrBalls)

// Функция которая ворзврашает сколько очков игрок выиграл всего и какие номера всего совпали
function pointsPLayer(countWin, countPayments) {
    let gameEnd = {};
    gameEnd.point = countPayments[countWin[0] - 1];
    gameEnd.quantity = countWin[0];
    gameEnd.boxes = countWin[1];
    gameEnd.payment = countPayments[countWin[0] - 1][1]
    return gameEnd
}
console.log(pointsPLayer(count2, count1));
