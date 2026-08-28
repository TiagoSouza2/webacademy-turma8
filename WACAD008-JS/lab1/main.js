const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText = "Durante uma batalha intensa, :insertx: decidiu seguir em frente sozinho, mesmo com a temperatura de 94 fahrenheit e pesando 300 pounds. Quando chegou em :inserty:, ficou parado por alguns segundos e então :insertz:. Todo mundo ficou surpreso, mas aquilo parecia completamente normal para :insertx: e para Bob.";

var insertX = [
  "Naruto Uzumaki",
  "Monkey D. Luffy",
  "Goku"
];

var insertY = [
  "uma vila ninja destruída",
  "uma ilha misteriosa",
  "um torneio de artes marciais"
];

var insertZ = [
  "usou seu golpe mais poderoso",
  "começou a gritar o nome de uma técnica",
  "derrotou o inimigo de um jeito completamente inesperado"
];

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray (insertX);
    let yItem = randomValueFromArray (insertY);
    let zItem = randomValueFromArray (insertZ);
    
    newStory = newStory.replace(":insertx:", xItem);
    newStory = newStory.replace(":insertx:", xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace("Bob", name);
    }


    if (document.getElementById("uk").checked) {
        const weight = Math.round(300 / 14) + " stone";
        const temperature = Math.round((94 - 32) * 5 / 9) + " centigrade";

        newStory = newStory.replace("94 fahrenheit", temperature);
        newStory = newStory.replace("300 pounds", weight);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}