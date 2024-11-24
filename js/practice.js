const { div, h1 } = van.tags

flashcards = document.getElementById('flashcards');

const urlParams = new URLSearchParams(window.location.search);
flashcardset = urlParams.get('flashcardset');


data = JSON.parse(atob(flashcardset));
console.log(data);

document.getElementById('set-title').innerText = data.title
document.getElementById('set-description').innerText = data.description



function addCard(term, def) {
    let innercard = div(
        { class: 'flashcard flashcard-deactive', onclick: (e) => { innercard.classList.toggle('flashcard-active'); innercard.classList.toggle('flashcard-deactive'); } },
        div(
            { class: 'side front' },
            h1(term)
        ),
        div(
            { class: 'side back' },
            h1(def)
        )
    )
    let finalcard = div(
        { class: 'final-card' },

        innercard
    )
    flashcards.appendChild(finalcard)
}

data.flashcards.forEach(card => {
    addCard(card.term, card.def)
})