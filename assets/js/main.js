$(function(){

        var boxs = $(".box");

    $('.post-it').on('dragstart', function(e) {
        e.originalEvent.dataTransfer.setData("text/plain", e.target.getAttribute('id'));
    });
    
    boxs.on('dragover', function(e) {
                e.preventDefault();
                boxs.removeClass("drop-here");
                $(this).addClass("drop-here");        
    });
        
        boxs.on('drop', function(e) {
                $(this).removeClass("drop-here");
                var card = e.originalEvent.dataTransfer.getData("text/plain");
                
                if($(e.target).hasClass("box")){
                        e.target.appendChild(document.getElementById(card));
                }
                
                e.preventDefault();
        });

});
