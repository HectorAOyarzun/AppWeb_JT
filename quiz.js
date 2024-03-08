const quizData = [
    {
      question: "¿Dispositivo que proporciona una forma de cierre que certifica que unn sistema de corte de energía se mantenga en posición segura?",
      options: ["Alambre'", "Pestillo", "Bloqueo", "Cinta de pegar"],
      answer: 2
    },
    {
      question: "¿Qué color de cabdado identifica al mecanico?",
      options: ["Rosado", "Verde ", "Amarillo", "Rojo"],
      answer: 3
    },
    {
      question: "¿Qué color de candado identifica al operador?",
      options: ["Amarillo", "Violeta", "Celeste", "Azul"],
      answer: 0
    },
    {
      question: "¿Dispositivo de advertencia propio y de uso exclusivo del empleado autorizado provisto de un medio de sujeción que permita ajustarlo a un dispositivo de aislamiento de energía?",
      options: ["Tarjeta de Bloqueo", "Letrero", "Señaletica", "Cartel"],
      answer: 0
    },
    {
      question: "¿Que tipo de energía es aire comprimido?",
      options: ["Hidraulica", "Mecánica", "Neumatica", "Termica"],
      answer: 1
    },
    {
      question: "¿Cuando se ve instalado un bloqueo con tarjeta que se debe hacer ?",
      options: ["Retirarlo", "No tocarlo", "Limpiarlo", "Tomar una fotografía"],
      answer: 1
    },

     {
      question: "¿Cuando se interviene un equipo para realizar mantencion, limpieza o retiro de atascos que se debe hacer?",
      options: ["Ingresar", "Aplicar protocolo de bloqueo", "Informar a SSO", "Realizar la tarea"],
      answer: 1
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
    let timeLeft = 60; // Tiempo en segundos
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