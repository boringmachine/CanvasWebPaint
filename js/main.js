$(function(){
	$("#panel")
	.accordion({ heightStyle: "fill"})
	.mouseover(function(e){
		$(".hidePanel").switchClass("hidePanel","showPanel",400);
	});

	$("#cnvs").mousedown(function(e){
		$(".showPanel").switchClass("showPanel","hidePanel",400);
	});
	$("button,#imageurl").button();
	$("#reset,#undo,#redo,#pickerSubmit").button().addClass("toolButton").removeClass("ui-widget");
	$("#pickerSubmit").css("top","5px");
});
