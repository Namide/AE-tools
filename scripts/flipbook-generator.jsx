/*
	 _____ _     _  ____  ____  ____  ____  _  __   _____ _____ _     
	/    // \   / \/  __\/  _ \/  _ \/  _ \/ |/ /  /  __//  __// \  /|
	|  __\| |   | ||  \/|| | //| / \|| / \||   /   | |  _|  \  | |\ ||
	| |   | |_/\| ||  __/| |_\\| \_/|| \_/||   \   | |_//|  /_ | | \||
	\_/   \____/\_/\_/   \____/\____/\____/\_|\_\  \____\\____\\_/  \|
	
									   By Damien Doussaud - namide.com
	
	
    Usage: 
	
		Select layers in AE (the pages of your Flipbook). 
		Select File -> Script -> Run script... from the menu and run this script.

	To do list:
		
		Backface culling if flipbook is in composition 3D
		Book thickness if pages < 0 or > maximum
		Better effect for bending pages
		
 */

function start()
{
	if ( 	app.project.activeItem == null ||
			app.project.activeItem.selectedLayers == null ||
			app.project.activeItem.selectedLayers.length < 1 )
	{
		alert('Selects layers in your project Oo\''); 
		return false;
	}

	app.beginUndoGroup("Flipbook generator");
	generate();
	app.endUndoGroup();
	
	return true;
}
 
function generate()
{
	var list = app.project.activeItem.selectedLayers;
    
	var nullName = "flipbook" + Math.round( Math.random() * 1000 );
	
	var nullObj = app.project.activeItem.layers.addNull();
	nullObj.threeDLayer = true;
	nullObj.name = nullName;
	
	var slider1 = nullObj.property("Effects").addProperty("ADBE Slider Control");
	slider1.name = "page"
	slider1.property(1).setValue(0.0);
	slider1.property(1).expression = "time;";
	
	var slider2 = nullObj.property("Effects").addProperty("ADBE Slider Control");
	slider2.name = "slow"
	slider2.property(1).setValue(1.0);
	var slider3 = nullObj.property("Effects").addProperty("ADBE Slider Control");
	slider3.name = "distord"
	slider3.property(1).setValue(40.0);
	var slider4 = nullObj.property("Effects").addProperty("ADBE Slider Control");
	slider4.name = "thickness"
	slider4.property(1).setValue(0.5);
	
	
	var light = app.project.activeItem.layers.addLight( nullName+"light", [0,0] );
	light.lightType = LightType.POINT;
	light.lightOption.castsShadows.setValue( 1 ); 
	light.lightOption.shadowDarkness.setValue( 20 );
	light.lightOption.shadowDiffusion.setValue( 16 );
	light.parent = nullObj;
	light.transform.position.setValue([ 0, 0, -2048]);
	
    for ( var i = list.length-1; i > -1; i-- )
    {
        var layer = list[i];
        layer.motionBlur = true;
        layer.threeDLayer = true;
        layer.parent = nullObj;
		
		layer.materialOption.castsShadows.setValue( 1 );
		layer.materialOption.acceptsShadows.setValue( true );
		layer.materialOption.acceptsLights.setValue( false );
    }
    
    for ( i = list.length-1; i > -1; i-- )
    {
        var layer = list[i];
		
		var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        var script = 'var flipbookObj = thisComp.layer("'+nullName+'");\n';
		script += 'var pageNum = index - flipbookObj.index;\n';
		script += '[ transform.position[0], transform.position[1], Math.abs( (thisComp.layer("'+nullName+'").effect("page")("Curseur") - pageNum) * flipbookObj.effect("thickness")("Curseur") ) ];\n';
        p.expression = script;
		
        p = layer.transform[ "anchorPoint" ];
        p.expressionEnabled = true;
        script = 'var flipbookObj = thisComp.layer("'+nullName+'");\n';
		script += 'var i0 = flipbookObj.index;\n';
		script += 'var output = transform.anchorPoint;\n';
		script += 'if ( (index - i0) % 2 == 1 ) { output  = [ 0, output[1] ]; }\n';
		script += 'else { output  = [ output[0] * 2, output[1] ]; }\n';
		p.expression = script;
		
		p = layer.transform[ "yRotation" ];
        p.expressionEnabled = true;
        script = 'var flipbookObj = thisComp.layer("'+nullName+'");\n';
		script += 'var pageNum = index - flipbookObj.index;\n';
		script += '\n';
		script += '\n';
		script += 'var output = transform.anchorPoint;\n';
		script += 'var rota = 0;\n';
		script += 'if ( pageNum % 2 == 0 )\n';
		script += '{\n';
		script += '	rota = thisComp.layer(index-1).transform.yRotation - 180;\n';
		script += '}\n';
		script += 'else\n';
		script += '{\n';
		script += '	var r = flipbookObj.effect("page")("Curseur");\n';
		script += '	var rMin = pageNum - flipbookObj.effect("slow")("Curseur");\n';
		script += '	var rMax = pageNum + flipbookObj.effect("slow")("Curseur");\n';
		script += '\n';
		script += '	if ( r <= rMin  ) rota  = 0;\n';
		script += '	else if ( r >= rMax  ) rota  = 180;\n';
		script += '	else\n';
		script += '	{\n';
		script += '		rota = 180 * (r - rMin) / (rMax - rMin);\n';
		script += '	}\n';
		script += '}\n';
		script += '\n';
		script += 'rota ;\n';
		p.expression = script;
		
		p = layer.transform[ "opacity" ];
        p.expressionEnabled = true;
        script = 'if (toCompVec([0, 0, 1])[2] > 0 ) value else 0;\n';
		p.expression = script;
		
		//myLayer.property(“Effects”).property(“boxBlur”);
		//var slider = curLayer.Effects.addProperty("ADBE Fast Blur");
		
		var effectBender = layer.Effects.addProperty( "CC Bender" );
		
		p = effectBender[ "Amount" ];
        p.expressionEnabled = true;
        script = 'var flipbookObj = thisComp.layer("'+nullName+'");\n';
		script += 'var pageNum = index - flipbookObj.index;\n';
		script += '\n';
		script += 'var output = transform.anchorPoint;\n';
		script += 'var am = 0.0;\n';
		script += 'if ( pageNum % 2 == 0 )\n';
		script += '{\n';
		script += '	var r = flipbookObj.effect("page")("Curseur");\n';
		script += '	var rMin = pageNum - 1 - flipbookObj.effect("slow")("Curseur");\n';
		script += '	var rMax = pageNum - 1 + flipbookObj.effect("slow")("Curseur");\n';
		script += '	var rMid = (rMax - rMin) * 0.5 + rMin;\n';
		script += '\n';
		script += '	if ( r <= rMid ) am = 0.0;\n';
		script += '	else if ( r >= rMax ) am = 0.0;\n';
		script += '	else\n';
		script += '	{\n';
		script += '		var a = 2 * Math.PI * (r - rMid) / (rMax - rMid);\n';
		script += '		var am1 = 1 - (0.5 + 0.5 * Math.cos( a ));\n';
		script += '		am = flipbookObj.effect("distord")("Curseur") * am1;\n';
		script += '	}\n';
		script += '}\n';
		script += 'else\n';
		script += '{\n';
		script += '	var r = flipbookObj.effect("page")("Curseur");\n';
		script += '	var rMin = pageNum - flipbookObj.effect("slow")("Curseur");\n';
		script += '	var rMax = pageNum + flipbookObj.effect("slow")("Curseur");\n';
		script += '	var rMid = (rMax - rMin) * 0.5 + rMin;\n';
		script += '\n';
		script += '	var am = 0.0;\n';
		script += '	if ( r <= rMin ) am = 0.0;\n';
		script += '	else if ( r >= rMid ) am = 0.0;\n';
		script += '	else\n';
		script += '	{\n';
		script += '		var a = 2 * Math.PI * (r - rMin) / (rMid - rMin);\n';
		script += '		var am1 = 1 - (0.5 + 0.5 * Math.cos( a ));\n';
		script += '		am = - flipbookObj.effect("distord")("Curseur") *  am1;\n';
		script += '	}\n';
		script += '}\n';
		script += '\n';
		script += 'am;\n';
		p.expression = script;
		
		p = effectBender[ "Top" ];
        p.expressionEnabled = true;
        script = 'var flipbookObj = thisComp.layer("'+nullName+'");\n';
		script += 'var pageNum = index - flipbookObj.index;\n';
		script += '\n';
		script += 'var output = [0,0];\n';
		script += 'if ( pageNum % 2 == 0 ) 	output = [ 0 , effect("CC Bender")(4)[1] * 2 ];\n';
		script += 'else			output = [ effect("CC Bender")(4)[0] * 2 , effect("CC Bender")(4)[1] * 2 ];\n';
		script += '\n';
		script += 'output;\n';
		p.expression = script;
		
		p = effectBender[ "Base" ];
        p.expressionEnabled = true;
        script = 'var flipbookObj = thisComp.layer("'+nullName+'");\n';
		script += 'var pageNum = index - flipbookObj.index;\n';
		script += '\n';
		script += 'var output = [0,0];\n';
		script += 'if ( pageNum % 2 == 0 ) 	output = [ effect("CC Bender")("Base")[0] * 2, effect("CC Bender")("Top")[1]];\n';
		script += 'else			output = [ 0 , effect("CC Bender")("Top")[1] ];\n';
		script += '\n';
		script += 'output;\n';
		p.expression = script;
		
    }
}

start();
