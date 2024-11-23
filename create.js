const { dom, div, span, textarea, button, img, h1 } = van.tags

flashcards = document.getElementById('flashcards');
addCard = document.getElementById('add-card');
finishSet = document.getElementById('finish-set');
setTitle = document.getElementById('set-title');
setDescription = document.getElementById('set-description');

flashcardData = {
    'title': '',
    'description': '',
    'flashcards': []
}

function addFlashcard(card) {

    let term = card.querySelector('.flashcard-term').value
    let def = card.querySelector('.flashcard-def').value

    if (term && def) {
        flashcardData.flashcards.push({ term, def })
    }

    console.log(flashcardData)
}

function finish(e) {
    e.preventDefault()

    flashcardData.title = setTitle.value
    flashcardData.description = setDescription.value
    console.log(flashcardData);

    window.location.href = '/practice.html?flashcardset=' + btoa(JSON.stringify(flashcardData))

}
finishSet.addEventListener('click', finish)

addCard.addEventListener('click', function (e) {
    e.preventDefault();

    let flashcardTerm = textarea(
        { class: 'flashcard-attr flashcard-term', placeholder: 'Flashcard Term' }
    );
    let flashcardDef = textarea(
        { class: 'flashcard-attr flashcard-def', placeholder: 'Flashcard Definition' }
    )

    let trashButton = button(
        { class: 'secondary trash', onclick: (e) => { e.preventDefault(); flashcard.remove() } },
        img(
            { src: 'icons/trash.svg' }
        )
    )
    let addButton = button(
        { class: 'secondary plus', onclick: (e) => { e.preventDefault(); addFlashcard(flashcard) } },
        img(
            { src: 'icons/plus.svg' }
        )
    )

    let flashcard = div(
        { class: 'flashcard' },
        span(
            { class: 'flashcard-attrs' },
            flashcardTerm,
            flashcardDef
        ),
        span(
            { 'class': 'actions' },
            addButton,
            trashButton
        )
    )

    flashcards.appendChild(flashcard)
})