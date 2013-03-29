// お絵描きソフト
var D = false; // マウスボタンが押されているかどうか（初期値false）
var X = 0; // マウスのX座標（初期値0）
var Y = 0; // マウスのY座標（初期値0）
var R = 5; // 描画する線の太さ（円の半径）
var C = "#00c"; // 描画する線の色（初期値青）
var beginX = -1;
var beginY = -1;
var top = 50;
var left = 50;
var drawtype=5;


$(function(){
	$("#brushsize").slider({
		slide:function(event,ui){
			R=ui.value;
			brush();
		},
		max:30,
		min:1,
		value:5,
		range:"min"
	});
	//全消しボタン
	$("#reset").click(function () {
		reset();
	});
	//アンドゥ
	$("#undo").click(function () {
		undo();
	});
	//リドゥ
	$("#redo").click(function () {
		redo();
	});
	//ブラシサイズ入力
	$("#brushSizeNum").attr({ 
		max: 255,
		min: 1
	});
	$("#brushSizeNum").change(function () {
		R = $("#brushSizeNum").attr("value");
		if(R > 30){
			R = 30;
		}else if(R <= 0){
			R = 1;
		}
		$("#brushSizeNum").attr("value",R);
		$("#brushsize").slider("value",R);
		brush();
	});
});

function brush(){
	var b01 = document.getElementById('brush').getContext('2d');
	b01.clearRect(0,0,100,100); // 小窓の表示を一旦リセット
	b01.beginPath();
	b01.fillStyle = C; // 塗りの色は変数Cに格納されている
	b01.arc(40, 40, R, 0, Math.PI*2, false);
	b01.fill();
	//$("#brushSizeNum").empty().append("<p>"+R+"</p>")
	$("#brushSizeNum").attr("value",R);
}


// マウスボタンが押されているかどうか，booleanで判別
function mDown(bool){
	if(!D && bool){
		undoPush();
	}
	D = bool; // マウスの状態（trueかfalse）を変数Dに代入
	if (D){ //マウスボタンを押していて，引数の値がtrueの場合は
		mMove(X,Y); // （ドラッグしなくてもクリックで描画）
	}else{
		beginX = -1;
		beginY = -1;
	}
}

// マウスカーソルが動いた時の処理
function mMove(x,y){
	//マウスの座標を引数から取得して，変数XとYに代入
	X = x;
	Y = y;
	drawtype=$("#drawtype > option:selected").val();

	if (D){ //マウスボタンを押している場合は
		if(drawtype==5){
			draw05(); // 描画する
		}else if(drawtype==6){
			draw06();
		}else if(drawtype==7){
			draw07();
		}else if(drawtype==8){
			draw08();
		}else{
			draw05();
		}
	}
}

// 指定された座標(X,Y)に太さRで直線を描画
function draw05(){
	var c01 = document.getElementById('canvas01');
	var ctx = c01.getContext('2d');

	ctx.beginPath();
	ctx.fillStyle = C; // 塗りの色は変数Cに格納されている
	if(beginX == -1 && beginY == -1){
		beginX = X;
		beginY = Y;		
	}
	//メインの線
	ctx.strokeStyle = C;
	ctx.lineCap = "round";
	ctx.moveTo(beginX, beginY);
	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = "source-over";
	ctx.lineWidth = R;
	ctx.lineTo(X, Y);
	beginX = X;
	beginY = Y;
	ctx.stroke();
}

function draw06(){
	tmpUndo();
	var canvas = document.getElementById("canvas01");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = C;
	if(beginX == -1 && beginY == -1){
		beginX = X;
		beginY = Y;		
	}
	ctx.lineWidth = R;
	ctx.strokeStyle = C;
	ctx.lineCap = "round";
	ctx.rect(beginX,beginY,X-beginX,Y-beginY);
	undoPush();
	ctx.stroke();
	
}

function draw07(){
	tmpUndo();
	var canvas = document.getElementById("canvas01");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = C;
	if(beginX == -1 && beginY == -1){
		beginX = X;
		beginY = Y;		
	}
	ctx.lineWidth = R;
	ctx.strokeStyle = C;
	ctx.lineCap = "round";
	ctx.arc(beginX,beginY,Math.max(Math.abs(X-beginX),Math.abs(Y-beginY)),0,2*Math.PI,false);
	undoPush();
	ctx.stroke();
	
}

function draw08(){
	tmpUndo();
	var c01 = document.getElementById('canvas01');
	var ctx = c01.getContext('2d');

	ctx.beginPath();
	ctx.fillStyle = C; // 塗りの色は変数Cに格納されている
	if(beginX == -1 && beginY == -1){
		beginX = X;
		beginY = Y;		
	}
	//メインの線
	ctx.lineWidth = R;
	ctx.strokeStyle = C;
	ctx.lineCap = "round";
	ctx.moveTo(beginX,beginY);
	ctx.lineTo(X, Y);
	undoPush();
	ctx.stroke();
}




// スライダーで用いる変数の宣言
var sD = false; // スライダーのキャンバス内でマウスが押されているかどうか
var sX = 0; // スライダーのつまみのX座標

// ブラシサイズを設定するスライダーの描画
/*
function drawSlider(){
	var slider = document.getElementById('brushSize').getContext('2d');
	slider.clearRect(0,0,160,50); // スライダー描画初期化
	drawLine(); // 水平ラインの描画
	drawGage(); // 目盛の描画
	drawKnob(); // つまみの描画
}
*/

// 描画を初期状態にする
function reset(){
	undoPush();
	var c01 = document.getElementById('canvas01');
	var ctx = c01.getContext('2d');
	ctx.clearRect(0,0,800,600);
}

// 水平ラインの描画
function drawLine(){
	var slider = document.getElementById('brushSize').getContext('2d');
	
	slider.beginPath();
	slider.lineWidth = 5; // ラインの太さ
	slider.lineCap = "round"; // ラインの両端を丸める
	slider.strokeStyle = "#99f"; // ラインの色
	slider.moveTo(30, 25); // ラインの始点
	slider.lineTo(130, 25); // ラインの終点
	slider.stroke();
}

// 目盛を10ピクセルおきに並べて描画
function drawGage(){
	var slider = document.getElementById('brushSize').getContext('2d');
	
	for(i=0;i<11;i++){
		slider.beginPath();
		slider.lineWidth = 2; // ラインの太さ
		slider.strokeStyle = "#006"; // ラインの色
		slider.moveTo(30+i*10, 20); // ラインの始点
		slider.lineTo(30+i*10, 30); // ラインの終点
		slider.stroke();
	}
}

// つまみの描画
function drawKnob(){
	var slider = document.getElementById('brushSize').getContext('2d');
	
	var setX = R*2+30; // 基準点のX座標
	var setY = 20; // 基準点のY座標
	slider.beginPath();
	slider.lineWidth = 1; // ラインの太さ
	slider.fillStyle = "#333"; // 塗りの色
	slider.moveTo(setX, setY); // 基準点から描画を始める
	slider.lineTo(setX+5, setY+15); // 基準点の右下に
	slider.lineTo(setX+5, setY+25); // 10ピクセル下に
	slider.lineTo(setX-5, setY+25); // 10ピクセル左に
	slider.lineTo(setX-5, setY+15); // 10ピクセル上に
	slider.closePath(); // 基準点に戻る
	slider.fill();
	
}

// スライダーの操作を受け付けるかどうか
function sDown(boolS){
	sD = boolS; // マウスの状態（trueかfalse）を変数sDに代入
	if (sD){ //マウスボタンを押していて，引数の値がtrueの場合は
		moveKnob(sX); // スライダーのつまみを動かす
	}
}

//つまみを動かす
function moveKnob(s){
	sX = s; // マウスのX座標を取得
	var offsetX = 355; // スライダーの目盛左端のX座標を指定
	if(sD){ // もしスライダー部分でマウスが押されていたら
		if(sX < offsetX){ // もしマウスが目盛左端より左にあれば
			R = 1; // Rが0にならないように最小値1に設定
		}else if(sX > offsetX+100){ // もしマウスが目盛右端より右にあれば
			R = 50; // Rの最大値50に設定
		}else{ // マウスが目盛の範囲内にあれば
			R = parseInt((sX-offsetX)/2)+1; // 1～50の範囲でRの値を設定
		}
		
		drawSlider(); // スライダーの更新
		brush(); // ブラシ表示エリア更新
	}
}

//カラーピッカーから選んだ色をブラシの色に設定
function getColor(col){
	C = col; // 引数colを変数Cに代入
	brush(); // 小窓の表示ブラシを再描画
}