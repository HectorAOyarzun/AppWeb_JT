var options = ["¿Qué es LOTO?", "Fuentes de energía", "Reglas de oro Seg. Máquinas", "Candados de bloqueo", "Candado de bloqueo color negro"];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/maxitem;
  
  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;
  
  return RGB2Color(red,blue,red);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 95;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = ' 12px arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(67,65,65)";
      ctx.fillStyle = "black";
      
      var text = options[i];
      if (text.length > 10) {
        var splitText = text.split(' ');
        var halfIndex = Math.ceil(splitText.length / 2);
        var firstLine = splitText.slice(0, halfIndex).join(' ');
        var secondLine = splitText.slice(halfIndex).join(' ');
        
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                      250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(firstLine, -ctx.measureText(firstLine).width / 2, -5);
        ctx.fillText(secondLine, -ctx.measureText(secondLine).width / 2, 10);
      } else {
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                      250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      }
      
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  var selectedOption = options[index];

  // Definir opciones relacionadas para cada opción
  var relatedOptions = {
    "¿Qué es LOTO?": ["Bloqueo y Etiquetado", "-", "-"],
    "Fuentes de energía": ["Nombra 2 fuentes de energía", "-"],
    "Reglas de oro Seg. Máquinas": ["Nombra una regla de oro", "-", "-"],
    "Candados de bloqueo": ["Color azul correponde a ", "Color verde corresponde a ", "Color rojo corresponde a"],
    "Candado de bloqueo color negro": ["¿Quien los utiliza?", "-", "-"],
   
   
    // Agregar opciones relacionadas para el resto de las opciones
  };

    // Obtener las opciones relacionadas para la opción seleccionada
  var relatedOptionsText = relatedOptions[selectedOption] || ["No hay opciones relacionadas"];

  ctx.save();
  ctx.font = 'bold 20px Helvetica, Arial';
  ctx.fillText(selectedOption, 250 - ctx.measureText(selectedOption).width / 2, 250 + 10);

  // Mostrar opciones relacionadas en el centro
  ctx.font = 'bold 12px Helvetica, Arial';
  for (var i = 0; i < relatedOptionsText.length; i++) {
    ctx.fillText(relatedOptionsText[i], 250 - ctx.measureText(relatedOptionsText[i]).width / 2, 250 + 30 + i * 20);
  }
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();