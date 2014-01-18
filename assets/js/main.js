$(function(){

    var boxs = $(".box");
    var trash = $(".trash");
    var note = $('.post-it');
    var newNote = $(".create-new");

    note.on('dragstart', noteDragStart);
    note.on('dragend', noteDragEnd);

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

    newNote.click(function(){
        var toDo = prompt("What you have to do?");

        if(toDo){
            var note = $('<div id="card-'+(boxs.length+1)+'" class="post-it" draggable="true"><p title="Click to edit" contenteditable="true">'+toDo+'</p></div>');
            boxs.push(note);

            note.on('dragstart', noteDragStart);
            note.on('dragend', noteDragEnd);

            boxs.first().append(note);
        }
    });

    function noteDragStart(e) {
        e.originalEvent.dataTransfer.setData("text/plain", e.target.getAttribute('id'));
        trash.css({
            opacity : 0.5
        });
    }

    function noteDragEnd(e){
        boxs.removeClass("drop-here");
        trash.css({
            opacity : 0.2
        });
        trash.removeClass("active");
    }
});
