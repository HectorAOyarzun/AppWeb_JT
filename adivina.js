//total preguntas del juego
const TOTAL_PREGUNTAS = 10;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 90;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:" Qué color de candado identifica al operador | Comienza con A ",
      respuesta:"amarillo"
  },
  {
    id:'B',
    pregunta:"Es la colocación de un dispositivo de corte de energía, con el objeto de asegurar que dicho dispositivo no pueda ser puesto en marcha | Comienza con B",
    respuesta:"bloqueo"
  },
  {
    id:'C',
    pregunta:"Dispositivo cuya finalidad es resguardar las llaves de los candados y a través de esta asegurar que que se liberen energías por error | Comienza con C y son dos palabras",
    respuesta:"caja roja"
  },
  {
    id:'D',
    pregunta:"Remover todos los dispositivos de bloqueo e identificación (Tarjeta de bloqueo de energías y dispositivos de bloqueo) | Comienza con D",
    respuesta:"desbloquear"
  },
  {
    id:'E',
    pregunta:"Es un tipo de energía | Comienza con E",
    respuesta:"electrica"
  },
  {
    id:'F',
    pregunta:"Permite desarrollar capacidades y aptitudes para llevar a cabo los trabajos de forma segura y eficiente. | Comienza con For",
    respuesta:"formacion"
  },
  {
    id:'G',
    pregunta:"Dispositivo implementado en cada área de producción, en su interior esta la caja roja, candados de bloqueo, y dispositivos específicos de bloqueo | Comienza con G",
    respuesta:"gabinete"
  },
  {
    id:'H',
    pregunta:"Quienes usa el candado de bloqueo color rojos |  Comienza con M",
    respuesta:"mantenimiento"
  },
  {
    id:'I',
    pregunta:"Colocación de un dispositivo de etiquetado en un mecanismo de aislamiento de energía | Comienza con I",
    respuesta:"identificacion"
  },
  {
    id:'J',
    pregunta:"Color de candado utilizado para desbloquear todo tablero eléctrico  | Comienza con N",
    respuesta:"negro"
  },
 
]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta acual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

  const responderBtn = document.getElementById("responder");
  responderBtn.addEventListener("click", function(event) {
    const txtRespuesta = document.getElementById("respuesta").value.toLowerCase();
    controlarRespuesta(txtRespuesta);
  });

  function controlarRespuesta(txtRespuesta) {
    if (txtRespuesta === bd_juego[numPreguntaActual].respuesta.toLowerCase()) {
      cantidadAcertadas++;
      estadoPreguntas[numPreguntaActual] = 1;
      document.getElementById(bd_juego[numPreguntaActual].id).classList.remove("pregunta-actual");
      document.getElementById(bd_juego[numPreguntaActual].id).classList.add("bien-respondida");
    } else {
      estadoPreguntas[numPreguntaActual] = 1;
      document.getElementById(bd_juego[numPreguntaActual].id).classList.remove("pregunta-actual");
      document.getElementById(bd_juego[numPreguntaActual].id).classList.add("mal-respondida");
    }
    document.getElementById("respuesta").value = "";
    cargarPregunta();
  }


//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(95 + 120 * Math.cos(angle));
  const y = Math.round(95 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}




//Función que carga la pregunta
  function cargarPregunta() {
    numPreguntaActual++;
    if (numPreguntaActual >= TOTAL_PREGUNTAS) {
      numPreguntaActual = 0;
    }

    if (estadoPreguntas.indexOf(0) >= 0) {
      while (estadoPreguntas[numPreguntaActual] === 1) {
        numPreguntaActual++;
        if (numPreguntaActual >= TOTAL_PREGUNTAS) {
          numPreguntaActual = 0;
        }
      }

      document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id;
      document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
      const letra = bd_juego[numPreguntaActual].id;
      document.getElementById(letra).classList.add("pregunta-actual");
    } else {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }


//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Debe ingresar un valor!!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  //controlo si la respuesta es correcta
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta")
    cantidadAcertadas++;

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");

  }
  respuesta.value="";
  cargarPregunta();
}


//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var letra =  bd_juego[numPreguntaActual].id;
  document.getElementById(letra).classList.remove("pregunta-actual");

  cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  countdown = setInterval(() => {
    // Restar un segundo al tiempo restante
    timeLeft--;
  
    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;
  
    // Si el tiempo llega a 0, detener el cronómetro
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

  //quito las clases de los circulos
  var circulos = document.getElementsByClassName("circle");
  for(i=0;i<circulos.length;i++){
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});