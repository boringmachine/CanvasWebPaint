$(function(){
	$("#canvas01").bind('contextmenu', function() {
	        var canvas = document.getElementById('canvas01');
		var ctx = canvas.getContext('2d');
		var image = ctx.getImageData(X, Y, 1, 1);//RGBAの色情報取得
//alert( Array.prototype.slice.apply(image.data));
		imgArray = image.data;
		//透明度最大（何も描画してないピクセル）なら#FFFFFFにする
		if(imgArray[3] == 0){
			imgArray[0] = 255;
			imgArray[1] = 255;
			imgArray[2] = 255;
		}
		C ="#"+ hexFromRGB(imgArray[0],imgArray[1],imgArray[2]);
		setSwatch();
        return false;
    });
});

