const joke = document.getElementById("text");
const btn  = document.getElementById("btn");
const voice = document.getElementById('voice');
let speech = new SpeechSynthesisUtterance();

// fetch jokes from joke-API
function jokes(){
        speechSynthesis.cancel()
        fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
        .then(res => res.json())
        .then(data =>{
            console.log(data.joke)
             joke.innerText = data.joke
            tellJoke()
        })
}

function updateVoice(){
    const voices = speechSynthesis.getVoices()
    voices.map((v,i)=>{
        const option = document.createElement('option');
        option.value = i;
        option.textContent = v.name;
        voice.appendChild(option);
    })

    voice.addEventListener('change',(e)=>{
        speechSynthesis.cancel()
        const selectedVoice = e.target.value;
        speech.voice = voices[selectedVoice]

        tellJoke()
    })
}

function tellJoke(){
    speech.text = joke.innerText;
    window.speechSynthesis.speak(speech);
}

btn.addEventListener('click',jokes);
speechSynthesis.addEventListener('voiceschanged',updateVoice);