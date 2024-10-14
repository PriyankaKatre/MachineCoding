
document.addEventListener('DOMContentLoaded', () => {

    const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars",
      },
      {
        question: "Who wrote 'Hamlet'?",
        choices: [
          "William Shakespeare",
          "Charles Dickens",
          "Mark Twain",
          "Jane Austen",
        ],
        answer: "William Shakespeare",
      },
      {
        question: "What is the largest ocean on Earth?",
        choices: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        answer: "Pacific Ocean",
      },
      {
        question: "What is the chemical symbol for gold?",
        choices: ["Au", "Ag", "Pb", "Fe"],
        answer: "Au",
      },
    //   {
    //     question: "Who painted the Mona Lisa?",
    //     choices: [
    //       "Vincent van Gogh",
    //       "Pablo Picasso",
    //       "Leonardo da Vinci",
    //       "Claude Monet",
    //     ],
    //     answer: "Leonardo da Vinci",
    //   },
    //   {
    //     question: "What is the smallest prime number?",
    //     choices: ["1", "2", "3", "5"],
    //     answer: "2",
    //   },
    //   {
    //     question: "Which country is known as the Land of the Rising Sun?",
    //     choices: ["China", "Japan", "South Korea", "Thailand"],
    //     answer: "Japan",
    //   },
    //   {
    //     question: "What is the hardest natural substance on Earth?",
    //     choices: ["Gold", "Iron", "Diamond", "Platinum"],
    //     answer: "Diamond",
    //   },
    //   {
    //     question: "Who developed the theory of relativity?",
    //     choices: [
    //       "Isaac Newton",
    //       "Albert Einstein",
    //       "Galileo Galilei",
    //       "Nikola Tesla",
    //     ],
    //     answer: "Albert Einstein",
    //   },
    ];

    const startQuizBtn = document.querySelector(".start-btn");
    const nextQuestionBtn = document.querySelector("#next-btn");
    const reStartQuizBtn = document.querySelector(".reStart-btn");
    const quizContent = document.querySelector(".quiz-content");

    const questionText = document.querySelector("#question-text");
    const choicesList = document.querySelector("#choices-list");
    const resultContainer = document.querySelector("#result-container");
    const scoreContent = document.querySelector("#score");

    let currentQuestionIndex = 0;
    let score = 0;

    const startQuiz = () => {
        startQuizBtn.classList.add('hidden')
        resultContainer.classList.add('hidden')
        quizContent.classList.remove('hidden')
        showQuestion()
    }

    const showQuestion = () => {
        nextQuestionBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "" //Clear Previous Choices
        questions[currentQuestionIndex].choices.forEach((choice) => {
            let li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener("click", () => selectAnswer(li, choice));
            choicesList.appendChild(li)
        })
    }

    const selectAnswer = (li, choice) => {
        let correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            score++

        }
        document.querySelectorAll('#choices-list li').forEach((item) => {
            item.classList.remove('active');
        })
        li.classList.add("active");
        nextQuestionBtn.classList.remove('hidden')
    }

    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult()
        }
    })

    const showResult = () => {
        quizContent.classList.add('hidden');
        resultContainer.classList.remove('hidden')
        scoreContent.textContent = `${score} out of ${questions.length}`;
    }

    reStartQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz()
    })
})
