$(function() {
	//画像、サイズ、位置の設定領域の初期化。
	$(init);

	//#pasteImageをドラッグで移動可能にする。
	//移動が止まると、位置情報を保存する。
	$('#pasteImage').draggable({
		stop:function(event,ui){
			pos=ui.position;
		}
	});
 

	
	
	//#savebuttonのクリックイベントの設定
	//保存された画像、サイズ、位置の情報を使ってcanvasに描写する。
	//描写後に、画像、サイズ、位置、読み込んだファイルの情報を初期化する。
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
	
	//画像、サイズ、位置を保存する変数の初期化。
	//file apiで読み込んだファイルの初期化。
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
			//画像URLをimgに設定し、ロードイベントを設定。
			$(img).load(function(){
				//#pasteImageにimgをhtmlとして挿入。
				$('#pasteImage').html(img);
				//imgをサイズ変更可能にする。
				//サイズ変更が止まると、サイズ情報を保存。
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
