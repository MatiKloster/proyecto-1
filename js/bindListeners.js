$(".botonGrilla").mousedown(empiezaSeleccion);
$(".botonGrilla").mouseenter(mouseMove);
$(".botonGrilla").mouseup(finalizaSeleccion);
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
