//nav
var nav = function(){
    $('nav li').hover( 
        function(){
            $(this).find('ul').slideDown('fast'); 
        }, 
        function(){
            $(this).find('ul').slideUp('fast'); 
        } 
    ); 
}

$(function(){ 
    nav();  //nav
}); 
