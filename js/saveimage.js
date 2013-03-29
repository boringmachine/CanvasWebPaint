$(function(){
	//画像の簡易番号
	var imageid = 0;
	//取得した画像を格納する変数
	var gettedImage = null;

	//セーブボタンクリック時のイベント
	$("#saveurl").click(function(){
		//base64形式の画像データを取得
		var image = returnimageurl();
		//取得したデータをフォームの送信データとして設定
		$("#imagedata").val(image);
		//画像サムネイル表示
		$("#savedimage").html(
			$('<img>',{
				src : image,
				alt : "image"+imageid,
				title : "image"+imageid,
			}).css({
				width : '150px',
				height : '150px',
				border : '1px solid black',
				backgroundColor : 'white'
			})
		);
		//画像データの文字列からmd5を取得し、キーとする。
		var key = MD5(image);
		//キーと画像データをプロパティとしてストレージに格納。
		sessionStorage.setItem(key,image);
		//現在選択されているセーブデータの選択を解除。
		$("#selectimage > option:selected").removeAttr("selected");
		//キーをセーブデータとしてセレクトメニューに追加し、選択する。
		$("#selectimage")
		.append($('<option value="'+key+'" selected>image'+imageid+'</option>'))
		//チェンジイベント発生時に選択された要素を取得。
		.change(function(){
			evilGettingItem();
		});
		//画像番号更新
		imageid++;
	});

	//画像削除ボタンのクリックイベントを設定。
	$("#removeurl").click(function(){
		//選択されたデータからキーを取得。
		gettedImageId = $("#selectimage > option:selected").val();
		//キーからデータを取得する前に改竄のチェック。
		if(MD5(sessionStorage.getItem(gettedImageId))==gettedImageId){
			//ストレージからキーのデータを消去。
			sessionStorage.removeItem(gettedImageId);
			//選択されたメニュー項目を消去。
			$("#selectimage > option:selected").remove();
			//オプションの先頭を選択要素として設定。
			$("#selectimage > option").eq(0).attr("selected","");
			//選択された要素を取得。
			evilGettingItem();
		}
	});
	
	//選択された要素を取得する際の処理。
	function evilGettingItem(){
		//選択されたデータのキーを取得。
		gettedImageId = $("#selectimage > option:selected").val();
		//改竄のチェック。
		if(MD5(sessionStorage.getItem(gettedImageId))==gettedImageId){
			//ストレージからキーに対応する値を取得。
			gettedImage=sessionStorage.getItem(gettedImageId);
			//取得データをフォームの送信データに設定。
			$("#imagedata").val(gettedImage);
			//取得データのサムネイル設定。
			$("#savedimage").html(
				$('<img>',{
					src : gettedImage
				}).css({
					width : '150px',
					height : '150px',
					border : '1px solid black',
					backgroundColor : 'white'
				})
			);
		}
	}

	//キャンバスからbase64の画像データURLを取得。
	function returnimageurl(){
		return $("#canvas01")[0].toDataURL('image/png');
	}
});

