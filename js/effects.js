$(function(){
	var selectValue;
	var effectOld ={
			"saturate":100,
			"contrast":100,
			"brightness":0,
			"opacity":100,
			"grayscale":0,
			"sepia":0,
			"invert":0,
			"blur":0
	};
	var effectDefault ={
			"saturate":100,
			"contrast":100,
			"brightness":0,
			"opacity":100,
			"grayscale":0,
			"sepia":0,
			"invert":0,
			"blur":0
	};
	

	$("#effectReset").click(function(){
			var param = selectValue;
			var value = effectDefault[param];
			$('#canvas01').cssFilterEffects('option',param,value);
			effectOld[param] = value;
			$("#slider").slider("value",value);
	});


	$("#allEffectReset").click(function(){
		$('#canvas01').cssFilterEffects(effectDefault);
		effectOld = $.extend(true,{},effectDefault); ;
		$('#slider').slider("value",effectOld[selectValue]);
	});


	$("#chooseEffect").change(function(){
		$("#chooseOption").hide();
		selectValue = $("#chooseEffect > option:selected").val();
		var max =
		(selectValue=="saturate"||selectValue=="contrast")?200:
		(selectValue=="hue")?360:
		(selectValue=="blur")?8:100;
		var min = (selectValue=="brightness")?-100:0;
		$("#slider").slider({
			max:max,
			min:min,
			value:effectOld[selectValue]
		});
	});
		

	$('#slider').slider({
		range:'min',
		change:function(event,ui){
			var param = selectValue;
			var value = ui.value;
			$('#canvas01').cssFilterEffects('option',param,value);
			effectOld[param] = value;
		}
	});
});
