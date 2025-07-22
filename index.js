const questions = [
  {
    question: "What is the capital of Iran?",
    options: ["Shiraz", "Tehran", "Isfahan", "Tabriz"],
    answer: "Tehran",
  },
  {
    question: "What is 3 × 4?",
    options: ["7", "12", "9", "6"],
    answer: "12",
  },
  {
    question: "Which colors are in Iran’s flag?",
    options: [
      "Red, White, Blue",
      "Green, White, Red",
      "Yellow, White, Red",
      "Green, Blue, Red",
    ],
    answer: "Green, White, Red",
  },
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const resultBox = document.getElementById("result-box");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const questionCounter = document.getElementById("question-counter");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${
    questions.length
  }`;
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";

  q.options.forEach((opt) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = opt;
    label.appendChild(input);
    label.append(opt);
    optionsContainer.appendChild(label);
  });
}

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option.");
    return;
  }

  const answer = selected.value;
  if (answer === questions[currentQuestion].answer) {
    score++;
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "#2e7d32";
  } else {
    feedback.textContent = `❌ Incorrect. Correct answer is: ${questions[currentQuestion].answer}`;
    feedback.style.color = "#c62828";
  }

  submitBtn.disabled = true;

  setTimeout(() => {
    currentQuestion++;
    submitBtn.disabled = false;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1500);
});

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
  resultBox.textContent = `You got ${score} out of ${questions.length} correct! 🎉`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add("hidden");
  restartBtn.classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  loadQuestion();
});

window.onload = loadQuestion;
