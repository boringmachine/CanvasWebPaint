function keyboardStandBy(){
//body要素にイベントリスナーを追加
document.body.addEventListener("keydown",function(evt){
	//押されたキーコードを求める
	var kc = evt.keyCode;
	//特殊キーの状態を取得
	ctrlKey = evt.ctrlKey;
	//alert(kc);

	//Z+Ctrl：Undo
	if(kc==90 && ctrlKey){
		undo();
	}
	//X+Ctrl：Undo
	if(kc==88 && ctrlKey){
		redo();
	}
	//Delete：Reset
	if(kc==46){
		reset();
	}
	//P：Pencil
	if(kc==80){
		$("#drawtype").val(5);
	}
	//R：Rectangle
	if(kc==82){
		$("#drawtype").val(6);
	}
	//C：Circle
	if(kc==67){
		$("#drawtype").val(7);
	}
	//L：Line
	if(kc==76){
		$("#drawtype").val(8);
	}
}, false);
}