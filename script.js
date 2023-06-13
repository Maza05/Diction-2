const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inputBox = document.getElementById("inp-word");
const listContainer = document.getElementById("list-container");

inputBox.addEventListener("keyup", (param) => {
    if(param.target.value && param.key === "Enter"){
        searchWord();
        addTask();
        setTimeout(() => {
            playSound();
        }, 1000);
    }   
});

function playSound(){
    sound.play()
};

function searchWord() {
    let iptWord = document.getElementById("inp-word").value;
        fetch(`${url}${iptWord}`)
            .then((response) => response.json())
            .then((data) => {
                result.innerHTML = `
                <div class="word">
                <h3>${iptWord}</h3><button><i class="fas fa-volume-up"></i></button>
                </div>
                <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic || ""}/</p>
                </div>
                <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
                <p class="word-synonyms">${data[0].meanings[0].synonyms[0] || ""}  ${data[0].meanings[0].synonyms[1] || ""}</p>`
                sound.setAttribute("src", data[0].phonetics[0].audio);
            })
};

function addTask(){
    if(inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();    
};


listContainer.addEventListener("click", function(AZ) {
    if(AZ.target.tagName === "LI") {
        AZ.target.classList.toggle("checked");
        saveData();
    } else if (AZ.target.tagName === "SPAN") {
        AZ.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
};

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();