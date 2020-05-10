
// Game state
var celdaInicial, celdasSeleccionadas = [], curOrientation, palabraActual = '';

var wordCount = [0,0,0];

/**
* Evento que se dispara cuando se clickea una celda nueva. Inicializa la potencial palabra
* que el usuario va a seleccionar
*/
var empiezaSeleccion = function () {
  agregarProp(this, 'selected');
  celdaInicial = this;
  celdasSeleccionadas.push(this);
  palabraActual = $(this).text();
};



/**
*   Evento que maneja el mouse over(manteniendo pulsado) sobre una celda nueva. Realiza checkeos 
* para corroborar que la nueva celda sea adyacente a la anterior y que represente un camino valido
* target representa la celda que capturo el mouseover
*/
var select = function (target) {
  //si no se ha elegido la primera letra, nada que hacer
  if (!celdaInicial) {
    return;
  }

  //control para que no considere 2 veces a la misma letra dentro de la misma celda
  var ultimaCelda = celdasSeleccionadas[celdasSeleccionadas.length - 1];
  if (ultimaCelda == target) {
    return;
  }

  //checkeo si volvio sobre una palabra seleccionada y corregimos la ultima 
  //necesario por si el user se equivoca
  var backTo;
  for (var i = 0, len = celdasSeleccionadas.length; i < len; i++) {
    if (celdasSeleccionadas[i] == target) {
      backTo = i + 1;
      break;
    }
  }

  while (backTo < celdasSeleccionadas.length) {
    $(celdasSeleccionadas[celdasSeleccionadas.length - 1]).removeClass('selected');
    celdasSeleccionadas.splice(backTo, 1);
    palabraActual = palabraActual.substr(0, palabraActual.length - 1);
  }



  var newOrientation = calcOrientation(
    getAtributo(celdaInicial, 'x') - 0,
    getAtributo(celdaInicial, 'y') - 0,
    getAtributo(target, 'x') - 0,
    getAtributo(target, 'y') - 0
  );
  //Si hay nueva orientacion quiere decir que recien seleccionamos una celca adyacente a la inicial
  //y ya tenemos la orientacion con respecto a la inicial que tienen que respetar todas las futuras celdas

  if (newOrientation) {
    celdasSeleccionadas = [celdaInicial];
    palabraActual = $(celdaInicial).text();
    if (ultimaCelda !== celdaInicial) {
      delProp(ultimaCelda, 'selected');
      ultimaCelda = celdaInicial;
    }
    curOrientation = newOrientation;
  }

  // checkea que el ultimo movimiento sea en la misma orientacion que el anterior
  var orientation = calcOrientation(
    getAtributo(ultimaCelda, 'x') - 0,
    getAtributo(ultimaCelda, 'y') - 0,
    getAtributo(target, 'x') - 0,
    getAtributo(target, 'y') - 0
  );

  //checkeo necesario para que no sea tan frustante seleccionar las palabras en diagonales
  if (!orientation) {
    return;
  }

  // finalmente si el ultimo mov fue acorde a los anteriores, contamos la celda
  if (!curOrientation || curOrientation === orientation) {
    curOrientation = orientation;
    contarCelda(target);
  }
};

var mouseMove = function () {
  select(this);
};
var touchMove = function (e) {
  var xPos = e.originalEvent.touches[0].pageX;
  var yPos = e.originalEvent.touches[0].pageY;
  var targetElement = document.elementFromPoint(xPos, yPos);
  select(targetElement)
};
var contarCelda = function (celda) {

  agregarProp(celda, 'selected');
  celdasSeleccionadas.push(celda);
  palabraActual += $(celda).text();
};

/**
* Event that handles mouse up on a square. Checks to see if a valid word
* was created and updates the class of the letters and word if it was. Then
* resets the game state to start a new word.
*
*/
var finalizaSeleccion = function () {
let draftedWords=draftedWordsPerLevel[actualLevel];
  // see if we formed a valid word
  for (var i = 0; i < draftedWords.length; i++) {
    if (draftedWords[i] === palabraActual) {

      seleccionarPalabra(palabraActual);
      draftedWords.splice(i, 1);
      hubo = true;
      celdasSeleccionadas.forEach(function (e) {
        cambiarColor(e, wordCount[actualLevel]);
      })
      wordCount[actualLevel]++;

    }

    if (draftedWords.length === 0) {
      showSuccess();
    }
  }

  // borramos lo seleccionado si no hubo wordmatch
  delProp('.selected', 'selected');
  celdaInicial = null;
  celdasSeleccionadas = [];
  palabraActual = '';
  curOrientation = null;
};
var orientations = {
  horizontal: function (x, y, i) { return { x: x + i, y: y }; },
  horizontalBack: function (x, y, i) { return { x: x - i, y: y }; },
  vertical: function (x, y, i) { return { x: x, y: y + i }; },
  verticalUp: function (x, y, i) { return { x: x, y: y - i }; },
  diagonal: function (x, y, i) { return { x: x + i, y: y + i }; },
  diagonalBack: function (x, y, i) { return { x: x - i, y: y + i }; },
  diagonalUp: function (x, y, i) { return { x: x + i, y: y - i }; },
  diagonalUpBack: function (x, y, i) { return { x: x - i, y: y - i }; }
};
/*
 * Dados 2 puntos, se asegura que sean adyacentes y determina la orientacion relativa
 * que tiene el 2do sobre el 1ero
*/
var calcOrientation = function (x1, y1, x2, y2) {

  for (var orientation in orientations) {
    var nextFn = orientations[orientation];
    var nextPos = nextFn(x1, y1, 1);

    if (nextPos.x === x2 && nextPos.y === y2) {
      return orientation;
    }
  }

  return null;
};


