function hexFromRGB(r, g, b) {
        var hex = [
            r.toString( 16 ),
            g.toString( 16 ),
            b.toString( 16 )
        ];
        $.each( hex, function( nr, val ) {
            if ( val.length === 1 ) {
                hex[ nr ] = "0" + val;
            }
        });
        return hex.join( "" ).toUpperCase();
    }
    function refreshSwatch() {
        var red = $( "#red" ).slider( "value" ),
            green = $( "#green" ).slider( "value" ),
            blue = $( "#blue" ).slider( "value" ),
            hex = hexFromRGB( red, green, blue );
	    C = "#" + hex ;
	    brush(); // 小窓の表示ブラシを再描画
        $( "#swatch" ).css( "background-color", "#" + hex );
	$( "#picker" ).attr("value", "#" + hex);
    }
    function setSwatch(){
	var r = C.substr(1,2);
	g = C.substr(3,2);
	b = C.substr(5,2);
	r = parseInt(r,16);
	g = parseInt(g,16);
	b = parseInt(b,16);
	$( "#red" ).slider( "value" ,r );
        $( "#green" ).slider( "value" ,g );
        $( "#blue" ).slider( "value" ,b );
	hex = C;
        $( "#swatch" ).css( "background-color", hex );
    }

    $(function() {
        $( "#red, #green, #blue" ).slider({
            orientation: "horizontal",
            range: "min",
            max: 255,
            value: 127,
            slide: refreshSwatch,
            change: refreshSwatch 
       });
        $( "#red" ).slider( "value", 0 );
        $( "#green" ).slider( "value", 0 );
        $( "#blue" ).slider( "value", 0 );
    });