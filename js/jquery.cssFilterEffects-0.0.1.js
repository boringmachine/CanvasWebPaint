/*!
 * CSS Filter Effects jQuery Plugin v0.0.1
 * 
 * The MIT License (MIT)
 * Copyright(c) 2012, Shun Sugiyama
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Date: Wed Oct 17 05:25:30 2012 JST
 */
(function($){
	var filterAll="";
	$.fn.cssFilterEffects = function(params,key,value){
		return this.webkitFilterEffects(params,key,value);
	}
	$.fn.webkitFilterEffects = function(params,key,value){
		var effectDefault = {
			"saturate":100,
			"contrast":100,
			"brightness":0,
			"opacity":100,
			"grayscale":0,
			"sepia":0,
			"invert":0,
			"hue":0,
			"blur":0
		};
		var css = "-webkit-filter";
		var selector = $(this);
		var effectFilter = "";
		var effectOneTime = params["onetime"];

		if(params=="option"){
			effectOneTime = false;
			regexEffectChange(key,value);
		}else{
			$.each(params,function(key){
				var value = this;
				if(key=="onetime"){
				}else{
					var unit = (key=="hue")?"deg":(key=="blur")?"px":"%";

					if(effectOneTime==true){
						var filter = key +"("+value+unit+") ";
						effectFilter += filter;
					}else{
						regexEffectChange(key,value);
					}
				}
			});
		}
		if(effectOneTime!=true){
			effectFilter = filterAll;
		}
		selector.css(css,effectFilter);
		
		//comment-out for debug.
		//$(element).html(effectFilter);
		 
		function regexEffectChange(key,value){
			var isHue = (key=="hue");
			if(isHue){
					key += "-rotate";
			}
			var unit = (key=="hue")?"deg":(key=="blur")?"px":"%";
			var filter = key + "(" + value+unit+") ";
			var regexStr = key +"\(.{2,6}\)\\s?";
			if(isHue){
				regexStr.replace("-","\-");
			}
			regex = new RegExp(regexStr);
			if(value==effectDefault[key]){
				filterAll=filterAll.replace(regex,"");
			}else{
				if(filterAll.match(regex)==null){
					filterAll+=filter;
				}else{
					filterAll=filterAll.replace(regex,filter);
				}
			}
		}
	};
})(jQuery);
