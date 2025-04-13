const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Multi Language"],
    answer: "Hyper Text Markup Language",
    marks: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
    marks: 1
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
    marks: 3
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Wordsworth", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare",
    marks: 2
  },
  {
    question: "What is the capital of Japan?",
    options: ["Kyoto", "Beijing", "Seoul", "Tokyo"],
    answer: "Tokyo",
    marks: 1
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const quizBox = document.getElementById("quiz-box");
  const resultBox = document.getElementById("result-box");
  const nextButton = document.getElementById("next-btn");
  const restartButton = document.getElementById("restart-btn");
  const questionTag = document.getElementById("question");
  const optionsList = document.getElementById("option-list");
  const scoreTag = document.getElementById("score");

  let totalScore = 0;
  let currentQuestion = 0;
  let selected = false;

  nextButton.innerText = "Start Quiz";

  nextButton.addEventListener('click', () => {
    if (nextButton.innerText === "Start Quiz") {
      nextButton.innerText = "Next";
      renderQuestion(questions[currentQuestion]);
      return;
    }

    if (!selected) {
      alert("Please select an answer!");
      return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion(questions[currentQuestion]);
      selected = false;
    } else {
      renderResult();
    }
  });

  restartButton.addEventListener("click", () => {
    totalScore = 0;
    currentQuestion = 0;
    selected = false;
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    nextButton.innerText = "Next";
    renderQuestion(questions[currentQuestion]);
  });

  function renderQuestion(data) {
    questionTag.innerText = data.question;
    optionsList.innerHTML = "";
    selected = false;

    data.options.forEach(option => {
      const li = document.createElement("li");
      li.innerText = option;

      li.addEventListener("click", () => {
        if (selected) return;
        selected = true;

        const correctAnswer = data.answer;

        if (option === correctAnswer) {
          totalScore += data.marks;
          li.classList.add("correct");
        } else {
          li.classList.add("incorrect");

          Array.from(optionsList.children).forEach(optEl => {
            if (optEl.innerText === correctAnswer) {
              optEl.classList.add("correct");
            }
          });
        }
      });

      optionsList.appendChild(li);
    });
  }

  function renderResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    const maxScore = questions.reduce((sum, q) => sum + q.marks, 0);
    scoreTag.innerText = `${totalScore} / ${maxScore}`;
  }
});
