pallets = new Array(10);
for(i = 0 ; i < 20 ; i++)
{
	pallets[i] = "#FFFFFF";
}

function createPallet(){
	//見出しの生成
	var header = document.createElement("h5");
	header.innerHTML = "パレット（左クリックで選択、右クリックで保存）";
	//div要素の末尾に追加
	document.getElementById("palletBase").appendChild(header);
	pallets.forEach(drawPallet);
}

function drawPallet(element,index){
	//カラーパレットを生成
	var pal = document.createElement("div");
	pal.className = "colorPallet";
	pal.style.backgroundColor  =  element;
	//枠線
	if((index+1)%10 == 0 ){
		pal.style.borderRight  = "#333 solid 1px";
	}
	if(index > pallets.length - 11 ){
		pal.style.borderBottom  = "#333 solid 1px";
	}
	pal.setAttribute("onClick", "getPallet("+index+")");
	pal.no = index;
	//pal.setAttribute("onContextMenu", "setPallet("+index+")");
	pal.addEventListener("contextmenu",function(evt){
		setPallet(evt.target.no);
		evt.preventDefault();
	}, false); 
	//div要素の末尾に追加
	document.getElementById("palletBase").appendChild(pal);
}

function refrashPallet(){
	var pBase = document.getElementById("palletBase");
	var loop = pallets.length+1;
	for(var i=0; i<loop; i++){
		pBase.removeChild(pBase.firstChild);
	}
}


function getPallet(no){
	C = pallets[no]; // 変数Cにパレットの色代入
	brush(); // 小窓の表示ブラシを再描画
	setSwatch();
}
function setPallet(no){
	pallets[no] = C; // パレットの色に現在の色を代入
	refrashPallet(); // パレットを再描画
	createPallet();
}

function pickerColorSet(){
	var color = document.getElementById("picker").value;
	C = color.substr(2,7);
	setSwatch();	
}

//ツールを展開
$(document).ready(function(){
    $('.toolHeader').click(function() {
        $(this).next().slideToggle(500);
    }).next().show();
});