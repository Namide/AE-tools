/*

	In development!
	
    Usage: 
	
		Select keyframes (2 per layer) in AE. 
		Select File -> Script -> Run script... from the menu and run this script.

 */


var dt = 1.0;

var windowsOptions = createDialog("Time add", true, process);
windowsOptions.groupe.orientation = "column";

var g1 = windowsOptions.groupe.add("panel", undefined, "Time");
g1.orientation = "column";
g1.alignChildren = ["fill", "center"];

var g2 = g1.add('group');
g2.orientation = "row";
g2.add("statictext", undefined, "Seconds");
var dtNumber = g2.add("edittext", [0,0,40,20], dt);

//var g3 = g1.add('group');
//g3.orientation = "row";
//g3.add('statictext', undefined, 'Only selected layers');
var onlySelectedLayers = g1.add("checkbox", undefined, "Only selected layers");



/*

		START

*/

start();
function start() {

	if (    app.project.activeItem == null ||
			app.project.activeItem.selectedLayers == null ||
			app.project.activeItem.selectedLayers.length < 1 ||
			app.project.activeItem.selectedProperties == null ||
			app.project.activeItem.selectedProperties.length < 1
		)
	{
		alert('Selects layer(s) and his keys in your project (=^‥^=)');
	}
	else
	{
		// test(app.project.activeItem.selectedProperties[0], app.project.activeItem.selectedProperties[0].selectedKeys);
        listLayers(app.project.activeItem.selectedLayers)
	}

}

function listLayers(layers)
{
    var css = "/*Cubic-bezier*/\n\n";
    for (var i = 0; i < layers.length; i++)
    {
        var layer = layers[i];

        if(layer.selectedProperties != null && layer.selectedProperties.length > 0)
        {
            var properties = layer.selectedProperties
            var n = 0

            css += "#" + layer.name + " {\n";
            css += "    transition: ";
            for (var j = 0; j < properties.length; j++)
            {
                var property = properties[j];
                if (property.selectedKeys != null && property.selectedKeys.length > 1)
                {
                    css += ((n > 0) ? ", " : "") + " " + listKeys(property, property.selectedKeys);
                    n++;
                }
            }
            css += ";\n}\n\n";
        }
    }
    alert( css )
}

function toFixed( val )
{
    var num = 2;
    val = Number( val.toFixed(num) ).toString();
    if (val.length > 1 && val[0] == "0" && val[1] == ".")
    {
        val = val.substring(1);
    }
    return val;
}

function listKeys(prop, keys)
{
    //var str = "";
    var transition = prop.name + " ";
    //var k = 0
    
    /*try
    {*/
        /*for(var i = 0; i < 2; i++)
        {
                k = parseInt(keys[i]);
                str += "key" + (i + 1) + "\n";
                str += "---------\n";
                str += " val:" + prop.keyValue(k).toString() + "\n";
                str += " time:" + prop.keyTime(k).toString() + "\n";
                str += " in type:" + prop.keyInInterpolationType(k).toString() + "\n";
                str += " out type:" + prop.keyOutInterpolationType(k).toString() + "\n";
                str += " in temporal ease:" + objToStr(prop.keyInTemporalEase(k), "  ") + "\n";
                str += " out temporal ease:" + objToStr(prop.keyOutTemporalEase(k), "  ") + "\n";
                str += " temporal auto bezier:" + prop.keyTemporalAutoBezier(k).toString() + "\n";
                str += " temporal continuous:" + prop.keyTemporalContinuous(k).toString() + "\n";
                str += "\n"
        }*/
    
        var a = keys[0],
              b = keys[1];
        transition += getTime(prop, a, b) + "s " + toFixed(prop.keyTime(a)) + "s cubic-bezier(" + getBezier(prop, a, b) + ")";
        
    /*}
    catch(e)
    {
            str = e
    }*/

    // alert(str)
    return transition;
}

function getTime(prop, a, b)
{
     return toFixed(prop.keyTime(b) - prop.keyTime(a))
}

// https://forums.adobe.com/thread/1471138
function getBezier(prop, a, b)
{
    var t1 = prop.keyTime(a);
    var t2 = prop.keyTime(b);

    var val1 = prop.keyValue(a);
    var val2 = prop.keyValue(b);

    var delta_t = t2-t1;
    var delta = val2-val1;

    var avSpeed = Math.abs(val2-val1)/(t2-t1);
    var x1, x2, y1, y2;


    if (val1<val2)
    {
        x1 = prop.keyOutTemporalEase(a)[0].influence /100;
        y1 = x1*prop.keyOutTemporalEase(a)[0].speed / avSpeed;

        x2 = 1-prop.keyInTemporalEase(b)[0].influence /100;
        y2 = 1-(1-x2)*(prop.keyInTemporalEase(b)[0].speed / avSpeed);
    }
    else if (val2<val1)
    {
        //, to get a curve starting from point [0,1] going to point [1,0], it would be:
 
        x1 = prop.keyOutTemporalEase(a)[0].influence /100;
        y1 = (-x1)*prop.keyOutTemporalEase(a)[0].speed / avSpeed;
        x2 = prop.keyInTemporalEase(b)[0].influence /100;
        y2 = 1+x2*(prop.keyInTemporalEase(b)[0].speed / avSpeed);
        x2 = 1-x2;
    }
    else if (val1==val2)
    {
        x1 = prop.keyOutTemporalEase(a)[0].influence /100;
        y1 = (-x1)*prop.keyOutTemporalEase(a)[0].speed / ((prop.maxValue-prop.minValue)/(t2-t1)) ;
        x2 = prop.keyInTemporalEase(b)[0].influence /100;
        y2 = 1+x2*(prop.keyInTemporalEase(b)[0].speed / ((prop.maxValue-prop.minValue)/(t2-t1)));
        x2 = 1-x2;
    }

    // if speed == 0
    if ( isNaN(y1) )
    {
        y1 = 0
    }

    if ( isNaN(y2) )
    {
        y2 = 1
    }
    
    return toFixed(x1) + ", " + toFixed(y1) + ", " + toFixed(x2) + ", " + toFixed(y2);
    
    /*var t1 = prop.keyTime(a);
    var t2 = prop.keyTime(b);

    var val1 = prop.keyValue(a);
    var val2 = prop.keyValue(b);

    var dt = t2 - t1;
    
    var influence1 = prop.keyOutTemporalEase(a)[0].influence;
    var influence2 = prop.keyInTemporalEase(b)[0].influence;

    var speed1 = prop.keyOutTemporalEase(a)[0].speed;
    var speed2 = prop.keyInTemporalEase(b)[0].speed;

    var x1 = influence1 / 100;
    var y1 = speed1 / ((val2-val1)/(t2-t1));                // doesnt work if val2=val1...

    var x2 = 1 - (influence2 /100);
    var y2 = 1 - (speed2 / ((val2 - val1)/(t2 - t1)));        // same remark
       
    return toFixed(x1) + ", " + toFixed(y1) + ", " + toFixed(x2) + ", " + toFixed(y2);*/
    /*          "0, " +
              toFixed(1 - prop.keyInTemporalEase(b)[0]["influence"] / 100) + ", " +
              "1"
       
    return toFixed(prop.keyOutTemporalEase(a)[0]["influence"] / 100) + ", " +
              "0, " +
              toFixed(1 - prop.keyInTemporalEase(b)[0]["influence"] / 100) + ", " +
              "1"*/
    // prop, a, b
}

function objToStr( obj, tab )
{
    var type = typeof obj

    if (type == "object")
    {
        var str = "";
        for( var key in obj )
        {
            str +=  "\n" + tab + key + ":" + objToStr( obj[key], tab + "  " ) //"\n  " + key + ": " + obj[key].toString();
        }
        return str
    }
    
     return "\n" + tab + obj.toString();
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
	var locked = layer.locked;
	layer.locked = false;
	
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
    
	layer.locked = locked;
}

function process()
{
	try
	{
		
		app.beginUndoGroup("Time add");
			
			dt = Number(eval(dtNumber.text));
			var layers = app.project.activeItem.selectedLayers;
			remapCompo(layers[0].containingComp, dt, false);
			
			// only selected layers
			if (onlySelectedLayers.value)
			{
				for (var i = 0, l = layers.length; i < l; i++) {

					remapLayer(layers[i], dt);
				}
			}
			// all compo
			else
			{
				for (var j = 1, l = layers[0].containingComp.layers.length; j <= l; j++) {

					remapLayer(layers[0].containingComp.layers[j], dt);
				}
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
