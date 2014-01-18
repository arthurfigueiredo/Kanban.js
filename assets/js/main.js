$(function(){
    
    var saveApplication = function(){
        localStorage.setItem('app', $(".main-content").html());
        console.log($(".main-content").html());
    }
    var getApplication = function(){
        return localStorage.getItem('app'); 
    }

    var runApplication = (function(reboot){
        if(getApplication()){
            $(".main-content").html(getApplication());
        }
    })();

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
                saveApplication();
            }
            e.preventDefault();
    });
    trash.click(function(){
        if(confirm("Want to clear?")){
            localStorage.setItem("app",'<div class="col-12"><div class="operations"><div class="create-new"><img src="https://cdn1.iconfinder.com/data/icons/Mobile-Icons/128/07_note.png" alt="Create new" width="85" title="Create new note"></div><div class="trash" style="opacity: 0.2;"><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/trash-128.png" alt="Trash" width="60"></div></div></div><div class="col-4"><div class="box"><h3>To Do</h3></div></div><div class="col-4"><div class="box"><h3>In Progress</h3></div></div><div class="col-4"><div class="box"><h3>Done</h3></div></div>');            
            $(".main-content").html(getApplication());
        }
    });
    newNote.click(function(){
        var toDo = prompt("What you have to do?");

        if(toDo){
            var note = $('<div id="card-'+(boxs.length+1)+'" class="post-it" draggable="true"><p title="Click to edit" contenteditable="true">'+toDo+'</p></div>');
            boxs.push(note);

            note.on('dragstart', noteDragStart);
            note.on('dragend', noteDragEnd);

            boxs.first().append(note);
            saveApplication();
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
        saveApplication();
    }
    $(".post-it").on("keyup",function(){
        saveApplication();
    });

});
