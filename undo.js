bCanvas = new Array(100); //��Ɨ�����ۑ����Ă����z��
var undoIndex = 0; //�ЂƂO�̍�Ɨ����������ϐ�
fCanvas = new Array(50); //�A���h�D������ۑ����Ă����z��
var redoIndex = 0; //�ЂƂO�̃A���h�D�����������ϐ�


// �}�`�`��p��Undo
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

//�X�^�b�N�Ɍ��݂̃L�����o�X�̏�Ԃ�ۑ�
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

// ��Ɨ����������ς��ɂȂ����Ƃ��̏���
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

//ReDo�X�^�b�N�Ɍ��݂̃L�����o�X�̏�Ԃ�ۑ�
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

// ��Ɨ����������ς��ɂȂ����Ƃ��̏���
function overHistoryRedo(){
	for(var i=1; i<fCanvas.length; i++){
		fCanvas[i-1] = fCanvas[i];
	}
}


//
function redoClear(){
	redoIndex = 0;
}

//����ʂ��쐬
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
