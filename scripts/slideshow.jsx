
function createSlideshow(comp,layer)
{
	var rulesOfThirdsPoints = [[1/3,1/3],[2/3,1/3],[1/3,2/3],[2/3,2/3]];
	var zoomModes = ["IN","OUT"];
		
	var rdIdx = Math.floor(Math.random() * rulesOfThirdsPoints.length);
	var f = rulesOfThirdsPoints[rdIdx];
	var deltaZoomPoint =  [f[0] * comp.width, f[1] * comp.height] - [comp.width/2,comp.height/2];
	
	var rdIdx = Math.floor(Math.random() * zoomModes.length);
	var zoomMode = zoomModes[rdIdx];

	var keyTimes = [0,slideshowTime+slideshowTransition+slideshowTransition];
	var keyValues;

	switch(zoomMode)
	{
		case "IN": 
			keyValues = [[100,100],[150,150]]; 
			break;
		case "OUT":
			keyValues = [[150,150],[100,100]]; 
			break;
		default: 
			break;
	}
	
	
	var nullL = comp.layers.addNull();
	
	layer.scale.expression = 
	"sx = 100 * thisComp.width / width; \r" +
	"sy = 100 * thisComp.height / height; \r" +
	"s = Math.max(sx,sy); \r" +
	"[s,s];";
	
	layer.parent = nullL;
	
	nullL.anchorPoint.setValue(nullL.anchorPoint.value + deltaZoomPoint);
	nullL.position.setValue(nullL.position.value + deltaZoomPoint);
	nullL.scale.setValuesAtTimes(keyTimes,keyValues);

	return nullL;
}

function initSlideshow(layers)
{
	for (var i = 0; i < layers.length; i++)
	{
		var layer = layers[i];
		layer.startTime = i * (slideshowTime+slideshowTransition) - ( (i>0)?+slideshowTransition:0 );
		layer.outPoint = (i+1) * (slideshowTime+slideshowTransition);
		layer.scale.expression = 
			"sx = 100 * thisComp.width / width; \r" +
			"sy = 100 * thisComp.height / height; \r" +
			"s = Math.max(sx,sy); \r" +
			"[s,s];";

		var keyTimes = [i * slideshowTime, i * slideshowTime+0.5,
						(i+1) * (slideshowTime+slideshowTransition)-0.5, (i+1) * (slideshowTime+slideshowTransition)];
		var keyValues = [0,100,100,0];
		layer.opacity.setValuesAtTimes(keyTimes,keyValues);

		var nullL = createSlideshow(layer.containingComp,layers[i]);
		nullL.startTime = layer.startTime;
		nullL.outPoint = layer.outPoint;
	}
}

var slideshowTime = 3;
var slideshowTransition = 1;

function start()
{
	if ( 	app.project.activeItem == null ||
			app.project.activeItem.selectedLayers == null ||
			app.project.activeItem.selectedLayers.length < 1
		)
	{
		alert('Selects layers in your project Oo\'');
	}
	else
	{
		app.beginUndoGroup("Slideshow");
			var layers = app.project.activeItem.selectedLayers;
			var t = initSlideshow( layers );
		app.endUndoGroup();
	
		return 1;
	}
    return 0;
}

start();
