/*
    Bind listeners e iniciar el juego
*/
var actualLevel;
var startingLevel=function(level){
    actualLevel=level;
    wordCount[actualLevel]=0;
    delProp('.selected', 'selected');
    celdaInicial = null;
    celdasSeleccionadas = [];
    palabraActual = '';
    curOrientation = null;
    var levelAux=makeLevelGreatAgain(actualLevel)
    startUIlevel(levelAux,actualLevel);
    $(".botonGrilla").mousedown(empiezaSeleccion);
    $(".botonGrilla").mouseenter(mouseMove);
    $(".botonGrilla").mouseup(finalizaSeleccion);
    progress=0;
    cambiarColorProgressBar(actualLevel);
    createTheWorker(actualLevel);
};

$('#startButton0').on('click',function(){
    startingLevel(0);
    $('#startButton0').off('click');
    ponerBotonPausa('#startButton0');
    $('#pauseButton0').on('click',function(){
        worker.terminate();
        onOffbutton('#pauseButton0');
        onOffbutton('#resumeButton0');
        onOffbutton('.restart.0');
        trollear(true);
    });

});
$('#startButton1').on('click',function(){
    startingLevel(1);
    $('#startButton1').off('click');
    ponerBotonPausa('#startButton1');
    $('#pauseButton1').on('click',function(){
        worker.terminate();
        onOffbutton('#pauseButton1');
        onOffbutton('#resumeButton1');
        onOffbutton('.restart.1');
        trollear(true);
    });
});
$('#startButton2').on('click',function(){
    startingLevel(2);
    $('#startButton2').off('click');
    ponerBotonPausa('#startButton2');
    $('#pauseButton2').on('click',function(){
        worker.terminate();
        onOffbutton('#pauseButton2');
        onOffbutton('#resumeButton2');
        onOffbutton('.restart.2');
        trollear(true);
    });
});
$('#resumeButton0').on('click',function(){
    createTheWorker(actualLevel);
    onOffbutton('#pauseButton0');
    onOffbutton('#resumeButton0');
    onOffbutton('.restart.0');
    trollear(false);
});
$('#resumeButton1').on('click',function(){
    createTheWorker(actualLevel);
    onOffbutton('#pauseButton1');
    onOffbutton('#resumeButton1');
    onOffbutton('.restart.1');
    trollear(false);
});
$('#resumeButton2').on('click',function(){
    createTheWorker(actualLevel);
    onOffbutton('#pauseButton2');
    onOffbutton('#resumeButton2');
    onOffbutton('.restart.2');
    trollear(false);
});
$(".restart").on('click', function(){
    worker.terminate();
    startingLevel(actualLevel);
});
$("#switch").mousedown(function(){
    toggleMode();
    if(localStorage.getItem('Dark')==='true')
        localStorage.setItem('Dark','false');
    else
        localStorage.setItem('Dark','true');
});

$('.nav-link').mousedown(function(){
    cambiarCarousel(getAtributo(this,'number'));
}); 
$('.carousel-control-next').mousedown(nextCarousel);
$('.carousel-control-prev').mousedown(prevCarousel);
$('#carouselNivel').on('slid.bs.carousel', function (event){
    carouselChangeHandler(event);
});

