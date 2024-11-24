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

function getChildIndex(element) {
    let index = 0;
    while (element.previousElementSibling) {
        element = element.previousElementSibling;
        index++;
    }
    return index;
}

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

    let saved = false

    function save() {
        console.log('saving')
        let i = getChildIndex(flashcard)
        // flashcardData.flashcards.pop(i)
        console.log(i)
        console.log(JSON.stringify(flashcardData, null, 2))
        flashcardData.flashcards.splice(i, 1)
        console.log(JSON.stringify(flashcardData, null, 2))
        addFlashcard(flashcard, i)
    }

    let flashcardTerm = textarea(
        {
            class: 'flashcard-attr flashcard-term', placeholder: 'Flashcard Term', oninput: (e) => {
                // replace the current flashcard with a new one
                save()
            }
        }
    );
    let flashcardDef = textarea(
        {
            class: 'flashcard-attr flashcard-def', placeholder: 'Flashcard Definition', oninput: (e) => {
                // replace the current flashcard with a new one
                save()
            }
        }
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
    // let addButton = button(
    //     {
    //         class: 'secondary plus', onclick: (e) => {
    //             e.preventDefault();
    //             // replace the current flashcard with a new one
    //             flashcardData.flashcards.pop(getChildIndex(flashcard))
    //             addFlashcard(flashcard)

    //             saved = true;

    //             // replace the first child with a checkmark

    //             addButton.firstChild.src = 'icons/check.svg'
    //         },
    //     },
    //     img(
    //         { src: 'icons/plus.svg' }
    //     )
    // )

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

    addFlashcard(flashcard)
})