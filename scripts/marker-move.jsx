

var windowsOptions = createDialog("Market moves", true, process);
windowsOptions.groupe.orientation = "column";

var groupe1 = windowsOptions.groupe.add("panel", undefined, "Parameters");
groupe1.orientation = "column";
groupe1.alignChildren = ["fill", "center"];

var g2 = groupe1.add('group');
g2.orientation = "row";
g2.add("statictext", undefined, "scope");

var markerMinS = g2.add("edittext", [0,0,50,20], 30);
g2.add("statictext", undefined, ":");
var markerMinF = g2.add("edittext", [0,0,40,20], 0);

g2.add("statictext", undefined, "<");

var markerMaxS = g2.add("edittext", [0,0,50,20], 60);
g2.add("statictext", undefined, ":");
var markerMaxF = g2.add("edittext", [0,0,40,20], 0);


var g3 = groupe1.add('group');
g3.orientation = "row";
g3.add("statictext", undefined, "delay");
var markerDelayS = g3.add("edittext", [0,0,50,20], 10);
g3.add("statictext", undefined, ":");
var markerDelayF = g3.add("edittext", [0,0,40,20], 0);


/*

		START

*/

start();
function start() {

	if ( 	app.project.activeItem === null ||
			app.project.activeItem.selectedLayers === null ||
			app.project.activeItem.selectedLayers.length < 1
		)
	{
		alert('Selects layers in your project (=^‥^=)');
	}
	else if ( app.project.activeItem.selectedLayers[0].property("marker").numKeys === 0 )
	{
		alert('You don\'t have markers (=^‥^=)');
	}
	else
	{
		markerMinS.text = Math.floor(app.project.activeItem.time);
		markerMinF.text = Math.round( (app.project.activeItem.time - Math.floor(app.project.activeItem.time)) * app.project.activeItem.frameRate );
		markerMaxS.text = Number( markerMinS.text ) + 1;
		markerMaxF.text = markerMinF.text;
		
		windowsOptions.show();
	}
	
}


/*

		PROCESS

*/

function process()
{
	var layer = app.project.activeItem.selectedLayers[0];
	
	
	var min = Number(markerMinS.text) + Number(markerMinF.text) / app.project.activeItem.frameRate;
	var max = Number(markerMaxS.text) + Number(markerMaxF.text) / app.project.activeItem.frameRate;
	var delay = Number(markerDelayS.text) + Number(markerDelayF.text) / app.project.activeItem.frameRate;
	
	
	
	var oldMarkers = layer.property("marker");
	
	
	
	app.beginUndoGroup("Marker move");
	
		// COPY MARKERS TO TEMP LAYER
		var tempLayer = app.project.activeItem.layers.addText("temp");
		for (var i=1; i<=oldMarkers.numKeys; i++)
		{
			if ( oldMarkers.keyTime(i) >= min && oldMarkers.keyTime(i) <= max )
			{
				tempLayer.property("marker").setValueAtTime( (oldMarkers.keyTime(i) + delay), oldMarkers.keyValue(i) );
			}
			else
			{
				tempLayer.property("marker").setValueAtTime( oldMarkers.keyTime(i), oldMarkers.keyValue(i) );
			}
		}
	
		while ( oldMarkers.numKeys > 0 )
		{
			oldMarkers.removeKey( 1 );
		}
	
		var newMarkers = tempLayer.property("marker");
		for (var i=1; i<=newMarkers.numKeys; i++)
		{
			layer.property("marker").setValueAtTime( newMarkers.keyTime(i), newMarkers.keyValue(i) );
		}
	

		tempLayer.remove();

	app.endUndoGroup();
	
	
}

function canMove( oldMarkers, i, min, max, newMarkers )
{
	if ( oldMarkers.keyTime(i) >= min && oldMarkers.keyTime(i) <= max )
	{
		alert( oldMarkers.keyTime(i) );
		
		newMarkers.push( {t:oldMarkers.keyTime(i), v:oldMarkers.keyValue(i)} );
		oldMarkers.removeKey( i );
		return true;
	}
	return false;
}

function moveMarker( layer, marker, delay )
{
	var t = (marker.t + delay);
	var v = markers.v;
	layer.property("marker").setValueAtTime( t, v );
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