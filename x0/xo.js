var app = new Vue({
    el: '#app',
    data: {
        table: [
            '', '', '',
            '', '', '',
            '', '', ''
        ],
        activePlayer: 'X',
        finished: false
    },
    methods: {
        // index reprezinta celula din tabel pe care se face mutarea (0-8)
        makeMove(index) {
            // (guard clause) verificam daca este deja ceva in acea casuta
            if (this.table[index] != '') return;
            // folosim splice pentru a permite reactivitatea proprietatii table
            this.table.splice(index, 1, this.activePlayer);
            // schimbam jucatorul activ
            this.activePlayer = this.activePlayer == 'X' ? 'O' : 'X';
            // verificam daca s-a terminat jocul 
            this.checkFinished();
        },
        checkEndGame() {
            this.checkComplete(this.table.filter((value, index) => index < 3)); /* se verifica daca ai castigat pe prima linie */
            this.checkComplete(this.table.filter((value, index) => index > 2 && index < 6));
            this.checkComplete(this.table.filter((value, index) => index > 5));
            this.checkComplete(this.table.filter((value, index) => index % 3 == 0)); /* se verifica daca ai castigat pe prima coloana, adica in casutele [0],[3],[6] */
            this.checkComplete(this.table.filter((value, index) => index % 3 == 1));
            this.checkComplete(this.table.filter((value, index) => index % 3 == 2));
            this.checkComplete(this.table.filter((value, index) => index % 4 == 0)); /* se verifica prima diagonala */
            this.checkComplete(this.table.filter((value, index) => [2, 4, 6].includes(index))); /* verificam si a doua diagonala, daca al nostru index se afla in acest array 2,4,6 */
        },
        checkComplete(cells) {
            if(cells.every(cell => cell == 'X') || cells.every(cell => cell == 'O')) { /* $(cell).text() ia textul din paranteze, adica cell, pentru a verifica daca este egal cu X sau O */
                this.finished = true;
            }
        }
    }
});

var activePlayer = 'X';
$('.table div').click(makeMove);

function makeMove() { /* this reprezinta elementul pe care s-a intamplat actiunea */
    $(this).text(activePlayer)
           .addClass(activePlayer == 'X' ? 'x' : 'o' ) /* ? este varianta prescurtata de la 'if', iar else este':' */
           .unbind('click', makeMove); /* scoatem makeMove de pe acel element, pentru a nu mai putea da click din nou dupa ce am pus deja X sau O */
    activePlayer = activePlayer == 'X' ? 'O' : 'X';
    checkEndGame();
}

function checkEndGame() {
    let cells = $('.table div').toArray();
    checkComplete(cells.filter((value, index) => index < 3)); /* se verifica daca ai castigat pe prima linie */
    checkComplete(cells.filter((value, index) => index > 2 && index < 6));
    checkComplete(cells.filter((value, index) => index > 5));
    checkComplete(cells.filter((value, index) => index % 3 == 0)); /* se verifica daca ai castigat pe prima coloana, adica in casutele [0],[3],[6] */
    checkComplete(cells.filter((value, index) => index % 3 == 1));
    checkComplete(cells.filter((value, index) => index % 3 == 2));
    checkComplete(cells.filter((value, index) => index % 4 == 0)); /* se verifica prima diagonala */
    checkComplete(cells.filter((value, index) => [2, 4, 6].includes(index))); /* verificam si a doua diagonala, daca al nostru index se afla in acest array 2,4,6 */
}

/**
 * asta este o documentatie de tip JavaScript, in care putem scrie tipul parametrului intre acolade; ne ajuta pentru ca asa isi da seama IDE ce fel de autocomplete ne trebuie in functie dupa punct
 * @param {Array} cells 
 */
function checkComplete(cells) {
    if(cells.every(cell => $(cell).text() == 'X') || cells.every(cell => $(cell).text() == 'O')) { /* $(cell).text() ia textul din paranteze, adica cell, pentru a verifica daca este egal cu X sau O */
        $('.end').addClass('visible');
    }
}