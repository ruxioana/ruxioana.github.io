const animals = ['Turtle','Snail','Corgi','Puffin Bird','Rabbit',
'Bear','Panda','Fish','Shark','Pig','Crab','Rhinoceros'];

const url = './animals_png/';

var images = animals.map(x => url + x + '.png');

images = images.concat(images); /* avem un array cu imaginile de 2 ori */

function shuffle(array) {
    let i = 0;
    for(i = 0; i < array.length; i ++) {
        let j = Math.floor(Math.random() * array.length) /* rotunjim in jos cu math.floor */
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffle(images); /* aici avem imaginile amestecate si de 2 ori */
console.log(images);

let i;
let content = ''; /* asa se defineste gol */
for(i = 0; i < images.length; i++) {
    let html = "<li><img src='" + images[i] + "'></li>"; /* punem imaginile in html */
    // let html = `<li><img src="${images[i]}"></li>`; /* asta se cheama interpolare si e o alta varianta de a scrie ce e mais us */
    content += html;
}
document.querySelector('ul').innerHTML = content; /* am legat li-urile de html-ul nostru - am creat dinamic lista */

document.querySelectorAll('li').forEach(e => e.addEventListener('click', onClick)) /* alegem toate elementele. nu doar unul, de aceea am scris selector all */

var active = [];
function onClick(event) { /* primeste ca paramentru event-ul */
    if (active.length == 0) {
        active.push(event.target); /* punem li-ul in elementele active; target-ul este cel pe care am dat click */
        event.target.querySelector('img').style.visibility = "visible";
        event.target.removeEventListener('click', onClick);
    } else if (active.length == 1) {
        active.push(event.target); /* punem li-ul in elementele active; target-ul este cel pe care am dat click */
        event.target.querySelector('img').style.visibility = "visible";
        event.target.removeEventListener('click', onClick);
        if(active[0].querySelector('img').src == active[1].querySelector('img').src) { /* ce facem daca ambele imagini sunt identice */
            active = []; /* golim array-ul de activ */
        } else {
            setTimeout(hide, 1000); /* mai intai scriem functia si apoi durata */
        }
    }
}

function hide() {
    active[0].querySelector('img').style.visibility = 'hidden';
    active[1].querySelector('img').style.visibility = 'hidden';
    active[0].addEventListener('click', onClick);
    active[1].addEventListener('click', onClick);
    active = [];
}