function keyboardStandBy(){
//body�v�f�ɃC�x���g���X�i�[��ǉ�
document.body.addEventListener("keydown",function(evt){
	//�����ꂽ�L�[�R�[�h�����߂�
	var kc = evt.keyCode;
	//����L�[�̏�Ԃ��擾
	ctrlKey = evt.ctrlKey;
	//alert(kc);

	//Z+Ctrl�FUndo
	if(kc==90 && ctrlKey){
		undo();
	}
	//X+Ctrl�FUndo
	if(kc==88 && ctrlKey){
		redo();
	}
	//Delete�FReset
	if(kc==46){
		reset();
	}
	//P�FPencil
	if(kc==80){
		$("#drawtype").val(5);
	}
	//R�FRectangle
	if(kc==82){
		$("#drawtype").val(6);
	}
	//C�FCircle
	if(kc==67){
		$("#drawtype").val(7);
	}
	//L�FLine
	if(kc==76){
		$("#drawtype").val(8);
	}
}, false);
}