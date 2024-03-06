const quizData = [
    {
      question: "¿Cuántos minutos tiene una hora?",
      options: ["60'", "30'", "120'", "90'"],
      answer: 0
    },
    {
      question: "¿Cuál es el río más largo del mundo?",
      options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
      answer: 1
    },
    {
      question: "¿Cuántas patas tiene una araña?",
      options: ["6", "4", "8", "12"],
      answer: 2
    },
    {
      question: "¿En qué continente se encuentra Chile?",
      options: ["África", "Oceanía", "Asia", "América"],
      answer: 3
    },
    {
      question: "¿Cuál es la capital de Chile?",
      options: ["Talca", "Antofagasta", "Santiago", "Valdivia"],
      answer: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  
  const questionElement = document.getElementById("question");
  const optionsElements = document.getElementsByClassName("option");
  const submitButton = document.getElementById("submit-btn");
  
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
  
    for (let i = 0; i < optionsElements.length; i++) {
      optionsElements[i].innerText = currentQuizData.options[i];
    }
  
    startTimer();
  }
  
  function startTimer() {
    let timeLeft = 10; // Tiempo en segundos
    const timerElement = document.getElementById("time-left");
    timerElement.innerText = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerText = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(-1); // Pasa a la siguiente pregunta sin respuesta
      }
    }, 1000);
  }
  
  function checkAnswer(selectedOption) {
    clearInterval(timer); // Detiene el temporizador actual
  
    if (selectedOption === quizData[currentQuestion].answer) {
      score++;
    }
  
    for (let i = 0; i < optionsElements.length; i++) {
      optionsElements[i].classList.remove("selected");
    }
  
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      // Fin del juego
      alert("Juego terminado. Tu puntuación es: " + score);
      resetGame();
    }
  }
  
  function resetGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
  }
  
  loadQuestion();
  
  for (let i = 0; i < optionsElements.length; i++) {
    optionsElements[i].addEventListener("click", function() {
      for (let j = 0; j < optionsElements.length; j++) {
        optionsElements[j].classList.remove("selected");
      }
      this.classList.add("selected");
    });
  }
  
  submitButton.addEventListener("click", function() {
    let selectedOption = -1;
    for (let i = 0; i < optionsElements.length; i++) {
      if (optionsElements[i].classList.contains("selected")) {
        selectedOption = i;
        break;
      }
    }
    checkAnswer(selectedOption);
  });