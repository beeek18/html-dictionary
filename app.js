const engWord = document.getElementById('eng'),
  jpWord = document.getElementById('jp'),
  inputs = document.getElementsByClassName('input'),
  addButton = document.getElementById('add-word-btn'),
  table = document.getElementById('table');

let words;
let btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'))

const addWordToTable = (i) => {
  table.innerHTML += `
  <tr class="tr">
    <td class="eng-word">${words[i].english}</td>
    <td class="jp-word">${words[i].japanese}</td>
    <td>
      <button class="btn-delete"></button>
    </td>
  </tr>
  `
}

words.forEach((e, i) => {
  addWordToTable(i)
});


addButton.addEventListener('click', () => {
  if (engWord.value.length < 1
    || jpWord.value.length < 1
    || !isNaN(engWord.value)
    || !isNaN(jpWord.value)
  ) {
    for (key of inputs) {
      key.classList.add('error')
    }

  } else {

    for (key of inputs) {
      key.classList.remove('error')
    }

    words.push(new CreacteWord(engWord.value, jpWord.value))

    localStorage.setItem('words', JSON.stringify(words))

    addWordToTable(words.length - 1)

    engWord.value = null
    jpWord.value = null
  }
})

function CreacteWord(english, japanese) {
  this.english = english;
  this.japanese = japanese;
}

const deleteWord = (e) => {
  const wordIndex = e.target.parentNode.parentNode.rowIndex;

  e.target.parentNode.parentNode.parentNode.remove()
  words.splice(wordIndex, 1)

  localStorage.removeItem('words')
  localStorage.setItem('words', JSON.stringify(words))
}

const addEventDelete = () => {
  if (words.length > 0) {
    btnsDelete = document.querySelectorAll('.btn-delete');

    for (const btn of btnsDelete) {
      btn.addEventListener('click', e => deleteWord(e))
    }
  }
}

addEventDelete()