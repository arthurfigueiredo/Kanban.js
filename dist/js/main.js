/*
 *  To Do Experiment - v1.0.0
 *  Simple and fast task manager.
 *  http://arthurfigueiredo.github.io/ToDoExperiment/
 *
 *  Made by Arthur Figueiredo
 *  Under MIT License
 */
$(function(){"use strict";function a(a){a.originalEvent.dataTransfer.setData("text/plain",a.target.getAttribute("id")),f.css({opacity:.5})}function b(){e.removeClass("drop-here"),f.css({opacity:.2}),f.removeClass("active"),c()}!function(){d()&&$(".main-content").html(d())}();var c=function(){localStorage.setItem("app",$(".main-content").html())},d=function(){return localStorage.getItem("app")},e=$(".box"),f=$(".trash"),g=$(".post-it"),h=$(".create-new");g.on("dragstart",a),g.on("dragend",b),e.on("dragover",function(a){$(this).addClass("drop-here"),a.preventDefault()}),e.on("dragleave",function(){$(this).removeClass("drop-here")}),f.on("dragover",function(a){a.preventDefault(),f.addClass("active")}),e.on("drop",function(a){var b=a.originalEvent.dataTransfer.getData("text/plain");a.target.appendChild(document.getElementById(b)),a.preventDefault()}),f.on("drop",function(a){var b=a.originalEvent.dataTransfer.getData("text/plain");confirm("Want to delete this note?")&&($("#"+b).remove(),c()),a.preventDefault()}),f.click(function(){confirm("Want to clear?")&&(localStorage.clear(),$(".post-it").remove())}),h.click(function(){var d=prompt("What you have to do?");d&&(g=$('<div id="card-'+(e.length+1)+'" class="post-it" draggable="true"><p title="Click to edit" contenteditable="true">'+d+"</p></div>"),e.push(g),g.on("dragstart",a),g.on("dragend",b),e.first().prepend(g),c())}),$(".post-it").on("keyup",function(){c()})});
