
$(document).ready(function(){
    var listweek=$(".listweek")

    $(window).resize(function(){
        listweekW=listweek.width();
        
        $('embed').css({
            "width":listweekW*1-40,
            "height":listweekW*0.4,

        })  

    })

})  




