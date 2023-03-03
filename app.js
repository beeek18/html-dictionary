const wrapper = document.querySelector('.wrapper'),
  searchInput = wrapper.querySelector('input'),
  synonyms = wrapper.querySelector('.synonyms .list'),
  infoText = wrapper.querySelector('.info-text'),
  volumeIcon = wrapper.querySelector('.word i'),
  removeIcon = wrapper.querySelector('.search span');

let definitions, phonetic, example, synonymsWord, audio;

searchInput.addEventListener('keyup', e => {
  if (e.key === 'Enter' && e.target.value) {
    fetchApi(e.target.value)
  }
})

function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerText = `Searching the meaning of ${word}...`;

  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then(res => res.json())
    .then(result => data(result[0], word))
}

function search(word) {
  searchInput.value = word;
  fetchApi(word)
}

function data(result, word) {
  if (!result) {
    infoText.innerText = `Can't find the meaning of "${word}". \n Please, try to search for another word.`;
  } else {
    wrapper.classList.add('active')

    definitions = result.meanings[0].definitions[0];
    result.phonetic ? phonetic = `${result.meanings[0].partOfSpeech} ${result.phonetic}` : phonetic = '';
    result.meanings[0].synonyms.length > 0 ? synonymsWord = result.meanings[0].synonyms : synonymsWord = '';
    definitions.example ? example = definitions.example : example = '';

    document.querySelector('.word p').innerText = result.word;
    document.querySelector('.word span').innerText = phonetic;
    document.querySelector('.meaning span').innerText = definitions.definition;
    document.querySelector('.example span').innerText = example;

    for (let i = 0; i < result.phonetics.length; i++) {
      if (result.phonetics[i].audio !== "") audio = new Audio(result.phonetics[i].audio)
    }

    for (let i = 0; i < 5; i++) {
      synonyms.innerHTML = '';
      let tag = synonymsWord[i] ? `<span onclick=search('${synonymsWord[i]}')>${synonymsWord[i]} </span>` : ''
      synonyms.insertAdjacentHTML('beforeend', tag)
    }
  }
}

volumeIcon.addEventListener('click', () => {
  if (audio == undefined) {
    alert('Sorry, no sound')
  } else {
    audio.play()
  }
})

removeIcon.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus()
  wrapper.classList.remove('active')
  infoText.style.color = "#999";
  infoText.innerText = 'Type word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.'
})