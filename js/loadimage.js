$(function() {

	$(init);


	$('#pasteImage').draggable({
		stop:function(event,ui){
			pos=ui.position;
		}
	});

	$("#savebutton").click(function(){
		var ctx=$("#canvas01")[0].getContext('2d');
		if(size==null){
			ctx.drawImage(img,pos.left,pos.top);
		}else{
			ctx.drawImage(img,pos.left,pos.top,size.width,size.height);
		}
		$("#pasteImage").text("");
		$(init);
	});
	

	function init(){
		$("#pasteImage").css(pos={top:0,left:0});
		size=null;
		img = new Image();

		var tagfileinput='<input type="file" id="file-input" name="loadimage"/>';
		$("#fileIt").html(tagfileinput);
		$('#file-input').change(function(e) { 
			$("#file-input").upload("loadimage.php",function(res){
				img.src = res;
			})

			$(img).load(function(){

				$('#pasteImage').html(img);
				$(img).resizable({
					stop:function(event,ui){
						size=ui.size;
					},
					ghost:true
				});
			});
		}); 
	}
});
