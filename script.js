const quiz = [
  {
    question: "Preferisci la luna piena o le stelle cadenti?",
    answers: ["Luna piena", "Stelle cadenti"],
    correct: "Stelle cadenti"
  },
  {
    question: "Quale colore ti rappresenta di più?",
    answers: ["Blu Notte", "Rosa Magico", "Giallo Solare"],
    correct: "Rosa Magico"
  },
  {
    question: "Un potere speciale, quale scegli?",
    answers: ["Trasformazione", "Teletrasporto", "Luce Curativa"],
    correct: "Trasformazione"
  },
  {
    question: "Quale luogo preferiresti per rilassarti?",
    answers: ["Spiaggia sotto le stelle", "Foresta incantata", "Città futuristica"],
    correct: "Spiaggia sotto le stelle"
  },
  {
    question: "Scegli un simbolo magico:",
    answers: ["Stella", "Cuore", "Luna crescente"],
    correct: "Luna crescente"
  },
  {
    question: "Che tipo di potere useresti?",
    answers: ["Velocità della luce", "Scudo astrale", "Raggio di amore"],
    correct: "Scudo astrale"
  }
];

let currentQuestion = 0;
let score = 0;

const container = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  const q = quiz[currentQuestion];
  const shuffledAnswers = [...q.answers];
  shuffleArray(shuffledAnswers);

  container.innerHTML = `<h2>${q.question}</h2>` +
    shuffledAnswers.map(answer =>
      `<button class="answer-btn">${answer}</button>`).join("");

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);
      if (btn.innerText === q.correct) score++;
      currentQuestion++;

      setTimeout(() => {
        if (currentQuestion < quiz.length) {
          showQuestion();
        } else {
          showResult();
        }
      }, 300);
    };
  });
}

function showResult() {
  container.style.display = "none";
  nextBtn.style.display = "none";
  result.style.display = "block";

  if (score >= 4) {
    result.innerHTML = `
      <h2>✨ Sei vicinissima al tuo destino galattico!</h2>
      <p>Hai risposto correttamente a ${score} su ${quiz.length} domande!</p>
      <p>Il tuo regalo è in arrivo tra le stelle…</p>
      <div class="finale">
        <div class="question-mark">❓</div>
        <div class="confetti"></div>
        <div class="gift-image hidden">
          <img src="assets/pantaloncino.png" alt="Il regalo" />
        </div>
      </div>
    `;

    setTimeout(() => {
      document.querySelector('.question-mark')?.classList.add('hidden');
      document.querySelector('.gift-image')?.classList.remove('hidden');

      const confettiContainer = document.querySelector('.confetti');
      confettiContainer.classList.add('show');
      confettiContainer.innerHTML = '';

      for (let i = 0; i < 150; i++) {
        const dot = document.createElement('span');
        dot.classList.add('confetto');

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 250 + 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        dot.style.setProperty('--x', `${x}px`);
        dot.style.setProperty('--y', `${y}px`);
        dot.style.background = ['#f08dd1', '#ffd700', '#88e3ff', '#ffffff'][i % 4];
        dot.style.animation = `popConfetti 1.4s ease-out forwards`;
        dot.style.animationDelay = `${Math.random() * 0.3}s`;

        confettiContainer.appendChild(dot);
      }

      // Mostra la frase luminosa
      const frase = document.createElement("div");
      frase.className = "frase-luminosa";
      frase.textContent = `Però non disperare, un altro pensiero è già arrivato e ti verrà donato.
      Cosa nasconde l’universo fatato? Domenica il segreto sarà svelato.`;
      result.appendChild(frase);

    }, 1000);

  } else {
    result.innerHTML = `
      <h2>🌑 La luna è velata…</h2>
      <p>Hai risposto correttamente a ${score} su ${quiz.length} domande.</p>
      <p>Ritenta per avvicinarti alla verità cosmica...</p>
    `;
    setTimeout(() => {
      resetQuiz();
    }, 3000);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  result.style.display = "none";
  container.style.display = "block";
  startBtn.style.display = "none";
  shuffleArray(quiz);

  const confettiContainer = document.querySelector('.confetti');
  if (confettiContainer) {
    confettiContainer.classList.remove('show');
    confettiContainer.innerHTML = '';
  }

  showQuestion();
}

startBtn.onclick = () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  shuffleArray(quiz);
  showQuestion();
};
