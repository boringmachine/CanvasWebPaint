$(function(){

	var imageid = 0;
	var gettedImage = null;

	$("#saveurl").click(function(){

		var image = returnimageurl();

		$("#imagedata").val(image);
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

		var key = MD5(image);

		sessionStorage.setItem(key,image);
		$("#selectimage > option:selected").removeAttr("selected");
		$("#selectimage")
		.append($('<option value="'+key+'" selected>image'+imageid+'</option>'))
		.change(function(){
			evilGettingItem();
		});

		imageid++;
	});


	$("#removeurl").click(function(){
		gettedImageId = $("#selectimage > option:selected").val();
		if(MD5(sessionStorage.getItem(gettedImageId))==gettedImageId){

			sessionStorage.removeItem(gettedImageId);
			$("#selectimage > option:selected").remove();
			$("#selectimage > option").eq(0).attr("selected","");
			evilGettingItem();
		}
	});
	
	function evilGettingItem(){

		gettedImageId = $("#selectimage > option:selected").val();

		if(MD5(sessionStorage.getItem(gettedImageId))==gettedImageId){
			gettedImage=sessionStorage.getItem(gettedImageId);
			$("#imagedata").val(gettedImage);
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

	function returnimageurl(){
		return $("#canvas01")[0].toDataURL('image/png');
	}
});

