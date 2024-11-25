const { dom, div, span, textarea, button, img, h1 } = van.tags

// Elements
flashcards = document.getElementById('flashcards');
addCard = document.getElementById('add-card');
finishSet = document.getElementById('finish-set');
setTitle = document.getElementById('set-title');
setDescription = document.getElementById('set-description');

// Data
flashcardData = {
    'title': '',
    'description': '',
    'flashcards': []
}



// Utility functions
function getChildIndex(element) {
    let index = 0;
    while (element.previousElementSibling) {
        element = element.previousElementSibling;
        index++;
    }
    return index;
}

// Data functions
function addFlashcard(card, index = -1) {

    let term = card.querySelector('.flashcard-term').value
    let def = card.querySelector('.flashcard-def').value

    if (index != -1) {
        flashcardData.flashcards.splice(index, 0, { term, def })
    } else {
        flashcardData.flashcards.push({ term, def })
    }

    console.log(flashcardData)
}

function createCard(term, def) {

    let saved = false

    function save() {
        console.log('saving')
        let i = getChildIndex(flashcard)
        flashcardData.flashcards.splice(i, 1)
        addFlashcard(flashcard, i)
    }

    let flashcardTerm = textarea(
        {
            class: 'flashcard-attr flashcard-term', placeholder: 'Flashcard Term', oninput: (e) => {
                // replace the current flashcard with a new one
                save()
            }
        },
        term
    );
    let flashcardDef = textarea(
        {
            class: 'flashcard-attr flashcard-def', placeholder: 'Flashcard Definition', oninput: (e) => {
                // replace the current flashcard with a new one
                save()
            }
        },
        def
    )

    let trashButton = button(
        {
            class: 'secondary trash', onclick: (e) => {
                e.preventDefault();
                flashcardData.flashcards.splice(getChildIndex(flashcard), 1);
                flashcard.remove()

            }
        },
        img(
            { src: 'icons/trash.svg' }
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
            trashButton
        )
    )

    flashcards.appendChild(flashcard)

    return flashcard
}

// Event listeners
// finishSet.addEventListener('click', (e) => {
function submit(e) {
    // e.preventDefault() 

    flashcardData.title = setTitle.value
    flashcardData.description = setDescription.value
    console.log(flashcardData);

    window.onbeforeunload = null;
    window.location.href = '/practice.html?flashcardset=' + btoa(JSON.stringify(flashcardData))
}
// })

addCard.addEventListener('click', function (e) {
    e.preventDefault();

    addFlashcard(createCard('', ''))
})

// Load editor
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('flashcardset')) {
    flashcardset = urlParams.get('flashcardset');
    flashcardData = JSON.parse(atob(flashcardset));

    setTitle.value = flashcardData.title
    setDescription.value = flashcardData.description

    flashcardData.flashcards.forEach(card => {
        createCard(card.term, card.def)
    })
}


window.onbeforeunload = function () {
        return "Changes you made will not be saved.";
}