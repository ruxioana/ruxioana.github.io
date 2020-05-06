function addListeners() {
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
}

function toggleMenu() {
    // get menu element
    let menu = document.querySelector('.menu');
    // if menu is visible hide it, else show it
    if (menu.classList.contains('visible')) { /* verificam daca in class list-ul lui menu exista clasa visible */
        menu.classList.remove('visible');
    } else {
        menu.classList.add('visible');
    }
}

window.addEventListener('load', addListeners); /* cand s-a incarcat pagina din fereastra, se va apela functia addListeners; asta ca sa nu mai folosim 'defer' in html */