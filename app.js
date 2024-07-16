console.log("hello");

let empty = () => {
    textOutput.innerHTML = "Search in the above box to know the meaning of any word !!!";
    Meaning.innerHTML = "Your searched meaning will appear here...";
    textPartOfSpeech1.innerHTML = `
    `
    textPartOfSpeech2.innerHTML = `
    `

    textDefinition1.innerHTML = `
    `
    textDefinition2.innerHTML = `
    `

    textExample1.innerHTML = `
    `
    textExample2.innerHTML = `
    `

    Meaning.style.color = '#3e8e79c2';
    textAudio.hidden = true;
}


var audio;
// audio.play();

let meaningFind = () => {

    let textValue = textInput.value.toLowerCase();
    // console.log(textValue);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${textValue}`).then((response) => {
        return response.json();
    }).then((textInfo) => {
        // console.log(textInfo[0]);
        // console.log(textInfo[0].word);
        textOutput.innerHTML = textInfo[0].word.toUpperCase();

        textAudio.hidden = false;
        Meaning.innerHTML = "Meaning"
        // console.log(textInfo[0].phonetics[0].audio)
        for (phonetic of textInfo[0].phonetics) {
            if (phonetic.audio == "") {
                continue;
            } else {
                // console.log(phonetic.audio);
                audio = new Audio(phonetic.audio);
                break;
            }
        }

        textPartOfSpeech1.innerHTML = `
            <span>PartOfSpeech:  </span>${textInfo[0].meanings[0].partOfSpeech}
            `
        textPartOfSpeech2.innerHTML = `
            <span>PartOfSpeech:  </span>${textInfo[0].meanings[1].partOfSpeech}
            `

        textDefinition1.innerHTML = `
            <span>Definition:  </span><br>${textInfo[0].meanings[0].definitions[0].definition}
            `
        textDefinition2.innerHTML = `
            <span>Definition:  </span><br>${textInfo[0].meanings[1].definitions[0].definition}
            `

        if(typeof(textInfo[0].meanings[0].definitions[0].example) == 'undefined'){
            textExample1.innerHTML = `
            <span>Example:  </span>" Sorry!!! Example not found "
            `
        }else{
            textExample1.innerHTML = `
            <span>Example:  </span>${textInfo[0].meanings[0].definitions[0].example}
            `
        }


        if(typeof(textInfo[0].meanings[1].definitions[0].example) == 'undefined'){
            textExample2.innerHTML = `
            <span>Example:  </span>" Sorry!!! Example not found "
            `
        }else{
            textExample2.innerHTML = `
            <span>Example:  </span>${textInfo[0].meanings[1].definitions[0].example}
            `
        }
    }).catch(() => {
        Meaning.innerHTML = "Meaning not found ... <br>Check the spelling of the entered word !!!"
        Meaning.style.color = 'red';
    })

}


function playAudio() {
    audio.play();
}