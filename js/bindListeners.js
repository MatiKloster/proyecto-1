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
    });

});
$('#startButton1').on('click',function(){
    startingLevel(1);
    ponerBotonPausa('#startButton1');
    $('#pauseButton1').on('click',function(){
        worker.terminate();
        onOffbutton('#pauseButton1');
        onOffbutton('#resumeButton1');
    });
});
$('#startButton2').on('click',function(){
    startingLevel(2);
    ponerBotonPausa('#startButton2');
    $('#pauseButton2').on('click',function(){
        worker.terminate();
        onOffbutton('#pauseButton2');
        onOffbutton('#resumeButton2');
    });
});
$('#resumeButton0').on('click',function(){
    createTheWorker(actualLevel);
    onOffbutton('#pauseButton0');
    onOffbutton('#resumeButton0');
});
$('#resumeButton1').on('click',function(){
    createTheWorker(actualLevel);
    onOffbutton('#pauseButton1');
    onOffbutton('#resumeButton1');
});
$('#resumeButton2').on('click',function(){
    createTheWorker(actualLevel);
    onOffbutton('#pauseButton2');
    onOffbutton('#resumeButton2');
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

