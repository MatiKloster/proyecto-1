/*
    Bind listeners e iniciar el juego
*/
var actualLevel;
var startingLevel=function(level){
    wordCount[level]=0;
    delProp('.selected', 'selected');
    celdaInicial = null;
    celdasSeleccionadas = [];
    palabraActual = '';
    curOrientation = null;
    var levelAux=makeLevelGreatAgain(level)
    startUIlevel(levelAux,level);
    $(".botonGrilla").mousedown(empiezaSeleccion);
    $(".botonGrilla").mouseenter(mouseMove);
    $(".botonGrilla").mouseup(finalizaSeleccion);
    actualLevel=level;
    progress=0;
    createTheWorker(actualLevel);
};
$('#startButton0').on('click',function(){startingLevel(0)});
$('#startButton1').on('click',function(){startingLevel(1)});
$('#startButton2').on('click',function(){startingLevel(2)});
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
;
