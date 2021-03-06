
var worker;
var progress;
//there is 8 types of borders
//4 for each side top bottom left right
//and 4 for the corners, I make this distintion for the border-radius
function getBorderIndicator(j, i, boundx, boundy) {
  let borderIndicator;
  if (j == 0 && i == 0) {
    borderIndicator = 'botonGrilla cornerTopLeft';
  }
  else {
    if (j == boundx - 1 && i == 0) {
      borderIndicator = 'botonGrilla cornerTopRight';
    }
    else {
      if (j == 0 && i == boundy - 1) {
        borderIndicator = 'botonGrilla cornerBottomLeft';
      }
      else {
        if (j == boundx - 1 && i == boundy - 1) {
          borderIndicator = 'botonGrilla cornerBottomRight';
        }
        else {
          if (i == 0) {
            borderIndicator = 'botonGrilla topBordered';
          }
          else {
            if (i == boundy - 1) {
              borderIndicator = 'botonGrilla bottomBordered';
            }
            else {
              if (j == 0) {
                borderIndicator = 'botonGrilla leftBordered';
              }
              else {
                if (j == boundx - 1) {
                  borderIndicator = 'botonGrilla rightBordered';
                }
                else {
                  borderIndicator = 'botonGrilla';
                }
              }
            }
          }
        }
      }
    }
  }
  return borderIndicator;
}
var dibujarGrilla = function (puzzle, grilla) {
  let str = '#Grilla' + grilla;
  let hiddeable = 'hiddeable' + grilla;
  let borderIndicator;
  let yisusStr = 'troll' + grilla;
  let randomPic = (Math.random() >= 0.5) ? 'yisus' : 'roll';
  var output = '<div class="row justify-content-center"><img src="img/' + randomPic + '.jpg" id="' + yisusStr + '" hidden></div></div>';
  for (var i = 0, height = puzzle.length; i < height; i++) {
    var row = puzzle[i];
    output += '<div class="row justify-content-center ' + hiddeable + '">';
    for (var j = 0, width = row.length; j < width; j++) {
      borderIndicator = getBorderIndicator(j, i, row.length, puzzle.length);//
      output += '<div class="cols-2">';
      output += '<button class="' + borderIndicator + '" x="' + j + '" y="' + i + '">';
      output += row[j] || '&nbsp;';
      output += '</button></div>';
    }
    output += '</div>';
  }
  $(str).html(output);
};
var dibujarPalabras = function (palabras, grilla) {
  let str = '#Palabras' + grilla;
  var palabraMayus;
  var output = '<h5>Palabras</h5><ul class="list-group">';
  for (var i = 0; i < palabras.length; i++) {
    palabraMayus = palabras[i].toUpperCase();
    output += '<li class="list-group-item" id="' + palabras[i] + '">' + palabraMayus + '</li>';
  }
  output += '</ul>';
  $(str).html(output);
};
var agregarProp = function (clase, prop) {
  $(clase).addClass(prop);
};
var cambiarColor = function (celda, numero) {
  var found = 'found' + numero;
  $(celda).removeClass('selected');
  $(celda).attr('id', found);
}
var getAtributo = function (clase, atributo) {
  return $(clase).attr(atributo);
}
var delProp = function (clase, prop) {
  $(clase).removeClass(prop);
}
var toggleProp = function (clase, esta, poresta) {
  delProp(clase, esta);
  agregarProp(clase, poresta);
}
var seleccionarPalabra = function (palabra) {
  var palabraID = '#' + palabra;
  $(palabraID).toggleClass('list-group-item list-group-item disabled');
};
var toggleMode = function () {
  $('body').toggleClass('dark');
  $('#switch').toggleClass('active')
  $('#mainNav').toggleClass('navbar-dark bg-dark');
  var pathImgDarkMode = 'svg/sopaYellow.svg';
  var pathImgLightMode = 'svg/sopaBlack.svg';
  var pathCorrecto = $('body').hasClass('dark') ? pathImgDarkMode : pathImgLightMode
  $('#brandsvg').attr('src', pathCorrecto);
};
var cambiarCarousel = function (to) {
  $("#carouselNivel").carousel(parseInt(to));
};
var prevCarousel = function () {
  $("#carouselNivel").carousel("prev");
  if (actualLevel == 0)
    actualLevel = 4;
  else
    actualLevel--;
};
var nextCarousel = function () {
  $("#carouselNivel").carousel("next");
  if (actualLevel == 4)
    actualLevel = 0;
  else
    actualLevel++;
};
var carouselChangeHandler = function (event) {
  botonSelector = '#linkNavN' + event.to;
  actualLevel = event.to;
  $('li.nav-item.active').toggleClass('active');
  $(botonSelector).toggleClass('active');
  $("#carouselNivel").carousel("pause");
};
var showSuccess = function (grid) {
  worker.terminate();
  let pauseBut = '#pauseButton' + grid;
  onOffbutton(pauseBut);
  let segundos = (levels[actualLevel].tiempo * progress) / 100;
  let where = '#alert' + grid;
  let html;
  if (progress >= 100) {
    html = '<div class="col-8" ><div class="alert alert-warning alert-dismissible fade show" role="alert">'
    html += '<strong>Terminaste!</strong> Pero bueno... en ' + Math.floor(segundos / 60) + ':' + Math.floor(segundos % 60) + ' . No estas dentro del rango ganador, probá una vez mas!'
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
    html += '<span aria-hidden="true">&times;</span></button></div></div>'
  }
  else {
    html = '<div class="col-8" ><div class="alert alert-success alert-dismissible fade show" role="alert">'
    html += '<strong>Ganaste!</strong> Y solo lo hiciste en ' + Math.floor(segundos / 60) + ':' + Math.floor(segundos % 60) + '. Volvé cuando quieras!'
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
    html += '<span aria-hidden="true">&times;</span></button></div></div>'
  }
  $(where).html(html);
}
var mostrarUI = function (level) {
  let cuales = '.' + level;
  $(cuales).prop('hidden', false);
};
var startUIlevel = function (newLevel, actualLevel) {
  dibujarGrilla(newLevel.grid, actualLevel)
  dibujarPalabras(newLevel.draftedWords, actualLevel);
  mostrarUI(actualLevel);
}
var cambiarColorProgressBar = function (level) {
  let which = '#barra' + level;
  toggleProp(which, 'bg-danger', 'bg-success')

}
var aumentarProgressBar = function (level) {
  let pausaOn = '#pauseButton' + level;
  if (!($(pausaOn).prop('disabled'))) {
    let which = '#barra' + level;
    progress++;
    if (progress <= 100)
      $(which).css('width', progress + '%').attr('aria-valuenow', progress);
    if (progress == 100) {
      toggleProp(which, 'bg-success', 'bg-danger');
    }
  }
}
var ponerBotonPausa = function (button) {
  pauseStr = 'pauseButton' + actualLevel;
  toggleProp(button, 'start', pauseStr);
  let pauseToRet = '#' + pauseStr;
  $(button).attr('id', pauseStr);
  $(pauseToRet).html('PAUSA');
}
var onOffbutton = function (button) {
  $(button).toggleClass('disabled');
  ($(button).prop('disabled')) ? $(button).prop('disabled', false) : $(button).prop('disabled', true);
};
var trollear = function (cristo) {
  let yisusStr = '#troll' + actualLevel;
  $(yisusStr).prop('hidden', !cristo);
  let hiddeable = '.hiddeable' + actualLevel;
  $(hiddeable).prop('hidden', cristo);
}
function getScriptPath(foo) { return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]], { type: 'text/javascript' })); }
var createTheWorker = function (level) {
  worker = new Worker(getScriptPath(function () {
    self.addEventListener('message', function (e) {
      //juro por dios que no lo saque de StackOverFlow :P
      var sleep = function (time) {
        var d1 = new Date();
        var d2 = null;
        do {
          d2 = new Date();
          var timeDiff = Math.abs(d2.getTime() - d1.getTime());
        } while (timeDiff < time);
      };
      let rate = (e.data == 0) ? 600 : (e.data == 1) ? 1800 : 3600;
      let toRet = (e.data == 0) ? 'add0' : (e.data == 1) ? 'add1' : 'add2';
      //pongo limite de 5000 para generar un ciclo infinito. Es problable que se va a cortar antes
      for (var i = 0; i <= 5000; i++) {
        sleep(rate);
        self.postMessage(toRet);
      }
    }
      , false);
  }));
  worker.addEventListener('message', function (event) {
    aumentarProgressBar(actualLevel);
  });
  worker.addEventListener('error', function (event) {
    console.error('error received from worker => ', event);
  });
  worker.postMessage(level);
};
if (localStorage.getItem('Dark') == null) {
  localStorage.setItem('Dark', 'false');
} else {
  if (localStorage.getItem('Dark') === 'true') {
    toggleMode();
  }
}
if (!($('#resumeButton0').prop('disabled')))
  $('#resumeButton0').prop('disabled', true);
if (!($('#resumeButton1').prop('disabled')))
  $('#resumeButton1').prop('disabled', true);
if (!($('#resumeButton2').prop('disabled')))
  $('#resumeButton2').prop('disabled', true);
cambiarCarousel('4');
