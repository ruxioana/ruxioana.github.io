Vue.config.devtools = true;

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
            this.checkComplete();
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
        activePlayer = '';
    }
} 

const quotes = [
    '"Nimic nu valorează mai mult decât ziua de azi.” – Goethe',
    '“O faptă bună este precum un clopot care cheamă oamenii la închinare.” – proverb danez',
    '“Întoarce-ți fața către soare și umbrele vor rămâne în urma ta.” – proverb din Noua Zeelandă',
    '“Pot rezuma în două cuvinte tot ce am învățat despre viață: merge înainte.” – Robert Frost',
    '“Viața este ceva ce faci când nu te poți duce la culcare.” – Fran Lebowitz',
    '“Cei doi mari inamici ai fericirii sunt durerea și plictiseala.” – Arthur Schopenhauer',
    '“A avea un prieten este mai vital decât a avea un înger.” – Nichita Stănescu',
    '“Copilăria e cadoul pe care ni-l dă viaţa.” – Horaţiu Mălăele',
    '“Fericirea este ca o minge: alergăm după ea și cum am prins-o îi dăm cu piciorul.” – Duisseux',
    '“Viața este ca mersul pe bicicletă. Pentru a-ți menține echilibrul trebuie să continui să mergi inainte.” – Albert Einstein',
    '“Când puterea de iubire va depăși iubirea de putere, în lume va fi pace.” - Jimi Hendrix',
    '“Valorezi atât cât te apreciezi.” – F. Rabelais',
    '“Glumind putem spune orice, chiar şi adevărul.” – Sigmund Freud',
    '“Gândiţi critic şi nu memoraţi doar ceea ce vor alţii să gândiţi.” – N.D. Walsch',
    '“Ceea ce nu trăim la timp, nu trăim niciodată.” - Octavian Paler',
    '“Nu permite ca opiniile celorlalţi să devină realitatea ta.” – Les Brown',
    '“Adevărata ignoranţă nu este absenţa cunoaşterii, ci refuzul de a o dobândi.” – Karl Popper',
    '“Trebuie să-ţi doreşti să fii puternic. Altfel, nu vei ajunge niciodată aşa.” – Friedrich Nietzsche',
    '“Copiii găsesc totul în nimic, oamenii găsesc nimic în tot.” – Giacomo Leopardi',
    '“Secretul geniului este transferul spiritului copilăriei în maturitate.” – Thomas Henry Huxley',
    '“Atâta timp cât nu-ţi pasă unde eşti, nu te poţi rătăci.” - Legile lui Murphy',
    '“Convingerea este de multe ori mai eficientă decât forţa.” – Esop',
    '“În viață nu primești niciodată ceea ce meriți, ci ceea ce negociezi.” – Thomas Edison',
    '“Mulţi dintre cei care eşuează o fac pentru că nu şi-au dat seama cât de aproape au fost de succes înainte de a renunţa.” – Thomas Edison',
    '“Să pari slab atunci când eşti puternic şi puternic atunci când eşti slab.” – Sun Tzu',
    '“În momentul în care te mulţumeşti cu mai puţin decât meriţi, vei primi chiar mai puţin decât atât.” – Maureen Dowd'
];

var text = quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById("quote").innerHTML = text;