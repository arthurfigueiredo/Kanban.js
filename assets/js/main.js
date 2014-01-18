$(function(){

    var boxs = $(".box");
    var trash = $(".trash");
    var note = $('.post-it');

    note.on('dragstart', function(e) {
        e.originalEvent.dataTransfer.setData("text/plain", e.target.getAttribute('id'));
        trash.css({
            opacity : 0.5
        });
    });
    note.on('dragend',function(e){
        boxs.removeClass("drop-here");
        trash.css({
            opacity : 0.2
        });
        trash.removeClass("active");
    });

    boxs.on('dragover', function(e) {
            $(this).addClass("drop-here");   
            e.preventDefault();
    });
    boxs.on('dragleave',function(){
        $(this).removeClass("drop-here");
    });
    trash.on('dragover', function(e) {
        e.preventDefault();
        trash.addClass("active");
    });


    boxs.on('drop', function(e) {
            var card = e.originalEvent.dataTransfer.getData("text/plain");
            e.target.appendChild(document.getElementById(card));
            
            e.preventDefault();
    });

    trash.on('drop', function(e) {
            var card = e.originalEvent.dataTransfer.getData("text/plain");
            if(confirm("Want to delete this note?")){
                $("#"+card).remove();
            }
            e.preventDefault();
    });


});
