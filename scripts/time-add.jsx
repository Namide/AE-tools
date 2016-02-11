/*
	   __  _              
	  / /_(_)___ ___  ___ 
	 / __/ / __ `__ \/ _ \
	/ /_/ / / / / / /  __/
	\__/_/_/ /_/_/_/\___/ 
	   /   |  / __ \/ __ \
	  / /| | / / / / / / /
	 / ___ |/ /_/ / /_/ / 
	/_/  |_/_____/_____/ 
	
	  by Damien Doussaud - namide.com
		version: 1.0
	
    Usage: 
	
		Select layers in AE. 
		Select File -> Script -> Run script... from the menu and run this script.

 */


var dt = 1.0;

var windowsOptions = createDialog("Time add", true, process);
windowsOptions.groupe.orientation = "column";

var groupe1 = windowsOptions.groupe.add("panel", undefined, "Time");
groupe1.orientation = "column";
groupe1.alignChildren = ["fill", "center"];

var g2 = groupe1.add('group');
g2.orientation = "row";
g2.add("statictext", undefined, "Seconds");
var dtNumber = g2.add("edittext", [0,0,40,20], dt);


/*

		START

*/

start();
function start() {

	if ( 	app.project.activeItem == null ||
			app.project.activeItem.selectedLayers == null ||
			app.project.activeItem.selectedLayers.length < 1
		)
	{
		alert('Selects layers in your project (=^‥^=)');
	}
	else
	{
		windowsOptions.show();
	}
	
}


/*

		PROCESS

*/

function remapProp(layer, prop, dt)
{
	
	var datas = [];
	var toRemove = [];
	
	if (prop.propertyType == PropertyType.NAMED_GROUP)
	{
		for (var i = 1; i <= prop.numProperties; i++)
		{
			remapProp(layer, prop.property(i), dt);
		}
	}
	else if (prop.propertyType == PropertyType.PROPERTY &&
	   		 prop.matchName !== "ADBE Marker")
	{

		// Copy and remove keys
		for (var k = prop.numKeys; k > 0; k--)
		{
			if (prop.keyTime(k) > layer.time)
			{
				var data = {};
				data.value = prop.keyValue(k);
				data.time = (prop.keyTime(k) + dt);
				data.inInterpolationType = prop.keyInInterpolationType(k);
				data.outInterpolationType = prop.keyOutInterpolationType(k);
				data.inTemporalEase = prop.keyInTemporalEase(k);
				data.outTemporalEase = prop.keyOutTemporalEase(k);
				data.temporalAutoBezier = prop.keyTemporalAutoBezier(k);
				data.temporalContinuous = prop.keyTemporalContinuous(k);

				if (prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL ||
					prop.propertyValueType == PropertyValueType.TwoD_SPATIAL)
				{
					data.spatialAutoBezier = prop.keySpatialAutoBezier(k);
					data.spatialContinuous = prop.keySpatialContinuous(k);
				}

				datas.push(data);
				prop.removeKey(k);
			}
		}
		
		// Paste keys
		for (k = 0; k < datas.length; k++)
		{
			var data = datas[k];

			var keyValue = data.value;
			var keyTime = data.time;

			prop.setValueAtTime(keyTime, keyValue);	
			var keyIndex = prop.nearestKeyIndex(keyTime);

			prop.setTemporalEaseAtKey(keyIndex, data.inTemporalEase, data.outTemporalEase);
			prop.setInterpolationTypeAtKey(keyIndex, data.inInterpolationType, data.outInterpolationType);
			prop.setTemporalAutoBezierAtKey(keyIndex, data.temporalAutoBezier);
			prop.setTemporalContinuousAtKey(keyIndex, data.temporalContinuous);						

			if (prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL ||
				prop.propertyValueType == PropertyValueType.TwoD_SPATIAL)
			{
				prop.setSpatialAutoBezierAtKey(keyIndex, data.spatialAutoBezier);
				prop.setSpatialContinuousAtKey(keyIndex, data.spatialContinuous);		
			}
		}
	}
}

function remapCompo(compo, dt, recurs)
{
	if (recurs == undefined)
		recurs = true;
	
	// COMPO
	compo.duration += dt;
	if (compo.time < compo.workAreaStart)
	{
		compo.workAreaStart += dt;
	}	
	else if (compo.time < compo.workAreaStart + compo.workAreaDuration)
	{
		if (compo.workAreaDuration + dt <= compo.duration)
			compo.workAreaDuration += dt;
	}
	
	
	// LAYERS
	if (recurs)
	{
		var lc = compo.layers;
		for (var j = 1; j <= lc.length; j++)
		{
			remapLayer(lc[j], dt);
		}
	}
}

function remapLayer(layer, dt)
{
    // the layer is before
	if (layer.outPoint < layer.time)
	{
		// do nothin
	}
	// the layer is after
	else if (layer.inPoint > layer.time)
	{
		layer.startTime += dt;
		//layer.outPoint += dt;
	}
	// the cursor is over the layer
	else
	{

		// the layer is a composition
		if (layer.source != null &&
			layer.source.layers != null)
		{
			remapCompo(layer.source, dt);
		}

		var datas = [];

		// Remap properties of layer
		for (var j = 1; j <= layer.numProperties; j++)
		{
			remapProp(layer, layer.property(j), dt);
		}

		layer.outPoint += dt;
	}
    
}

function process()
{
	try
	{
		
		app.beginUndoGroup("Time add");
			dt = Number(eval(dtNumber.text));
			var layers = app.project.activeItem.selectedLayers;
			remapCompo(layers[0].containingComp, dt, false);
			for (var i = 0; i < layers.length; i++)
			{
				remapLayer(layers[i], dt);
			}
		app.endUndoGroup();
		
	}
	catch(e)
	{
		alert(e);
	}
	
}


/*

		WINDOWS

*/

function createDialog(titre, hasokbutton, okfonction) {
	var f = new Window("palette", titre, undefined, {
		closeButton: false,
		resizeable: false
	});
	f.spacing = 2;
	f.margins = 5;
	f.alignChildren = ["fill", "top"];
	f.groupe = f.add("group");
	f.groupe.alignChildren = ["fill", "top"];
	var fgroupeBoutons = addHGroup(f);
	fgroupeBoutons.alignment = ["fill", "bottom"];
	fgroupeBoutons.margins = 10;
	if (hasokbutton) {
		var fcancel = addButton(fgroupeBoutons, "Annuler");
		fcancel.onClick = function () {
			f.hide();
		};
		fcancel.alignment = ["left", "bottom"];
		var fok = addButton(fgroupeBoutons, "OK");
		fok.alignment = ["right", "bottom"];
		if (okfonction != undefined) fok.onClick = function () {
			f.hide();
			okfonction();
		}
	} else {
		var fcancel = addButton(fgroupeBoutons, "Fermer");
		fcancel.onClick = function () {
			f.hide();
		};
	}

	return f;
}

function addHGroup(conteneur) {
	var groupe = conteneur.add("group");
	groupe.alignChildren = ["fill", "fill"];
	groupe.orientation = "row";
	groupe.spacing = 2;
	groupe.margins = 0;
	return groupe;
}

function addButton(conteneur, texte) {
	var bouton = conteneur.add("button", undefined, texte);
	return bouton;
}
