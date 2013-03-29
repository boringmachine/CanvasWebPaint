bCanvas = new Array(100); //作業履歴を保存しておく配列
var undoIndex = 0; //ひとつ前の作業履歴を示す変数
fCanvas = new Array(50); //アンドゥ履歴を保存しておく配列
var redoIndex = 0; //ひとつ前のアンドゥ履歴を示す変数


// 図形描画用のUndo
function tmpUndo(){
	if(undoIndex > 0){
		//redoPush();
		undoIndex--;
		var c01 = document.getElementById('canvas01');
		var c00 = bCanvas[undoIndex];
		var ctx = c01.getContext('2d');
		ctx.clearRect(0,0,c01.width,c01.height);
		ctx.drawImage(c00,0,0);
		//undoIndex--;
	}
}

// Undo
function undo(){
	if(undoIndex > 0){
		redoPush();
		undoIndex--;
		var c01 = document.getElementById('canvas01');
		var c00 = bCanvas[undoIndex];
		var ctx = c01.getContext('2d');
		ctx.clearRect(0,0,c01.width,c01.height);
		ctx.drawImage(c00,0,0);
		//undoIndex--;
	}
}

//スタックに現在のキャンバスの状態を保存
function undoPush(){
	var c01 = document.getElementById('canvas01');
	if(undoIndex >= bCanvas.length-1){
		overHistory();
	}
	var c00 = bCanvas[undoIndex];
	var ctx = c00.getContext('2d');
	ctx.clearRect(0,0,800,600);
	ctx.drawImage(c01,0,0);
	if(undoIndex < bCanvas.length-1){
		undoIndex++;
	}
}

// 作業履歴がいっぱいになったときの処理
function overHistory(){
	for(var i=1; i<bCanvas.length; i++){
		bCanvas[i-1] = bCanvas[i];
	}
}



// Redo
function redo(){
	if(redoIndex > 0){
		undoPush();
		redoIndex--;
		var c01 = document.getElementById('canvas01');
		var c00 = fCanvas[redoIndex];
		var ctx = c01.getContext('2d');
		ctx.clearRect(0,0,c01.width,c01.height);
		ctx.drawImage(c00,0,0);
	}
}

//ReDoスタックに現在のキャンバスの状態を保存
function redoPush(){
	var c01 = document.getElementById('canvas01');
	if(redoIndex >= fCanvas.length-1){
		overHistoryRedo();
	}
	var c00 = fCanvas[redoIndex];
	var ctx = c00.getContext('2d');
	ctx.clearRect(0,0,800,600);
	ctx.drawImage(c01,0,0);
	if(redoIndex < fCanvas.length-1){
		redoIndex++;
	}
}

// 作業履歴がいっぱいになったときの処理
function overHistoryRedo(){
	for(var i=1; i<fCanvas.length; i++){
		fCanvas[i-1] = fCanvas[i];
	}
}


//
function redoClear(){
	redoIndex = 0;
}

//裏画面を作成
function createBackCanvas(){
	for(var i=0; i<bCanvas.length; i++){
		bc = document.createElement('canvas');
		bc.className = 'backCanvas';
		canvas01 = document.getElementById('canvas01');
		bc.width = canvas01.width;
		bc.height = canvas01.height;
		bCanvas[i] = bc;
	}
	for(var i=0; i<fCanvas.length; i++){
		fc = document.createElement('canvas');
		canvas01 = document.getElementById('canvas01');
		fc.width = canvas01.width;
		fc.height = canvas01.height;
		fCanvas[i] = fc;
	}

}
