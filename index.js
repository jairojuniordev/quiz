const _começarButton = document.querySelector(".começar-button");
const _questõesContenção = document.querySelector(".questões-Contenção");
const _centroPerguntas = document.querySelector(".respostas-Contenção");
const _alertaMensagem = document.querySelector(".perguntas");
const _proPergunta = document.querySelector(".próxima-questão");

_começarButton.addEventListener("click", estartaJogo);
_proPergunta.addEventListener("click", próximaQuestão);

let currentQuestionIndex = 0;
let totalCorreta = 0;

function estartaJogo() {
  _começarButton.classList.add("hide");
  _questõesContenção.classList.remove("hide"); // funções feitas para começar o jogo sem dá erro, escondendo e removendo butões visuais //
  próximaQuestão();
}

function próximaQuestão() {
  while (_centroPerguntas.firstChild) {
    _centroPerguntas.removeChild(_centroPerguntas.firstChild);
  }

  document.body.removeAttribute("class");

  if (perguntas.length === currentQuestionIndex) {
    return fimGame();
  }

  _alertaMensagem.textContent = perguntas[currentQuestionIndex].pergunta;
  perguntas[currentQuestionIndex].respostas.forEach((respostas) => {
    const res = document.createElement("button");
    res.classList.add("button", "respostas");
    res.textContent = respostas.text;
    if (respostas.correct) {
      res.dataset.correta = respostas.correct;
    }
    _centroPerguntas.appendChild(res);

    res.addEventListener("click", selectAnwer);
  });
}

function selectAnwer(event) {
  const anClicked = event.target;
  if (anClicked.dataset.correta) {
    anClicked.classList.add("select-correct-option");
    totalCorreta++;
  } else {
    anClicked.classList.add("select-incorrect-option");
    document.body.classList.add("incorrect");
  }
  document.querySelectorAll(".respostas").forEach((button) => {
    if (button.dataset.correta) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });
  _proPergunta.classList.remove("hide");
  currentQuestionIndex++;
}

const perguntas = [
  {
    pergunta: " Em que dia se comemora o dia mundial da mulher?",
    respostas: [
      { text: "<10 de junho?>", correct: false },
      { text: "<8 de março?>", correct: true },
      { text: "<20 de março?>", correct: false },
      { text: "<8 de abril?>", correct: false },
    ],
  },
  {
    pergunta: " Quntos dias tem um ano?",
    respostas: [
      { text: "<250?>", correct: false },
      { text: "<400?>", correct: false },
      { text: "<365?>", correct: true },
      { text: "<230?>", correct: false },
    ],
  },
  {
    pergunta: " Que nome se dá ao medico especializado em crianças?",
    respostas: [
      { text: "<Ortopedia?>", correct: false },
      { text: "<Pediatra?>", correct: true },
      { text: "<Patologia?>", correct: false },
      { text: "<Angiologia?>", correct: false },
    ],
  },
  {
    pergunta: " Quem instituiu os primeiros jogos olímpicos da era moderna?",
    respostas: [
      { text: "<Barão de Anhumas?>", correct: false },
      { text: "<Barão de Coubertain?>", correct: true },
      { text: "<Lula?>", correct: false },
      { text: "<Greta Thunberg?>", correct: false },
    ],
  },
];

function fimGame() {
  const totalPerguntas = perguntas.length;
  const resultado = Math.floor((totalCorreta * 100) / totalPerguntas);

  _questõesContenção.innerHTML = `
    <p style="color: white;" > sua performace foi ${totalCorreta} de ${totalPerguntas} com ${resultado}% de acertos das questões!
    <button onclick=window.location.reload()> Refazer teste </button>
`;
}

function onLoad() {
  const mainContainer = document.querySelector(".Contenção");
  const loadindContaine = document.querySelector(".loading-container");
  setTimeout(() => {
    loadindContaine.classList.add("hiden");
    mainContainer.classList.remove("hiden");
  }, 2000);
}
