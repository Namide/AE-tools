/*
	  __  _                                    
	 / /_(_)_ _  ___                           
	/ __/ /  ' \/ -_)                          
	\__/_/_/_/_/\__/______   ___  ___  _______ 
	  / _ \/ __/  |/  / _ | / _ \/ _ \/ __/ _ \
	 / , _/ _// /|_/ / __ |/ ___/ ___/ _// , _/
	/_/|_/___/_/  /_/_/ |_/_/  /_/  /___/_/|_| 
	
			  by Damien Doussaud - namide.com
				version: 2.0
	
    Usage: 
	
		Select layers in AE. 
		Select File -> Script -> Run script... from the menu and run this script.

		
    Tags (adds to layer's name) :
	
		.unlinked (no time)
		.t[x] (time in milliseconds, example .t6000 = 6 seconds)
		.noTransition (unactive alpha and transition time)

		.up (bottom to top transition)
		.down (top to bottom transition)
		.right (left to right transition)
		.left (right to left transition)
		.back (front to back transition)
		.front (back to front transition)
		//.alpha (alpha transition [default])
    
 */

var velocity = 1.0;

var windowsOptions = createDialog("Time remapper", true, process);
windowsOptions.groupe.orientation = "column";

var groupe1 = windowsOptions.groupe.add("panel", undefined, "Parameters");
groupe1.orientation = "column";
groupe1.alignChildren = ["fill", "center"];

var g2 = groupe1.add('group');
g2.orientation = "row";
g2.add("statictext", undefined, "velocity");
var velNumber = g2.add("edittext", [0,0,40,20], velocity);


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

function hasTag( layer, tag )
{
	if( tag == ".time" )
	{
		var n = layer.name;
		var a = n.split(".");
		
		for ( var i = 0; i < a.length; i++ )
		{
			if (    a[i].charAt(0) == "t" &&
					a[i].substr(1) == String(Number( a[i].substr(1) )) )
			{
				return true;
			}
		}
	}

	return layer.name.indexOf(tag) > -1;
}

function getTimeByTag( layer )
{
    var n = layer.name;
    var a = n.split(".");
    for ( var i = 0; i < a.length; i++ )
    {
        if ( a[i].charAt(0) == "t" )
        {
            var n = Number( a[i].substr(1) );
            n /= 1000;
            if ( n == null || n == NaN || n < 0 || n >= Infinity ) n = velocity;
            return n;
         }
    }
    return velocity;
}

function remap( list, velocity )
{
    var d = 0;
    for ( var i = list.length-1; i > -1; i-- )
    {
        var layer = list[i];
        var tTrans = 0;
    
        var t = 0;
        if ( layer.source != null && layer.source.layers != null )
        {
		    var lc = layer.source.layers;
            var list2 = [];
            for ( var j = 1; j <= lc.length ; j++ )
            {
                list2.push(lc[j]);
            }
            t = remap( list2, velocity );
            layer.source.duration = t;
        }
        else if ( layer instanceof TextLayer )
        {
            var carPerS = 25 / velocity;
            t = layer.property("sourceText").value.text.length / carPerS;
            if ( t < velocity ) t = velocity;
            if ( hasTag( layer, ".time" ) ) t = getTimeByTag(layer);    
            if ( !hasTag( layer, ".noTransition" ) ) tTrans = addTween(layer, "alpha");
        }
        else
        {
            t = 3 * velocity;
            if ( hasTag( layer, ".time" ) ) t = getTimeByTag(layer);    
            if ( !hasTag( layer, ".noTransition" ) ) tTrans = addTween(layer, "alpha");
        }
        
        if ( hasTag( layer, ".up" ) ) tTrans = addTween( layer, "up" );
        if ( hasTag( layer, ".down" ) ) tTrans = addTween( layer, "down" );
        if ( hasTag( layer, ".right" ) ) tTrans = addTween( layer, "right" );
        if ( hasTag( layer, ".left" ) ) tTrans = addTween( layer, "left" );
        if ( hasTag( layer, ".back" ) ) tTrans = addTween( layer, "back" );
        if ( hasTag( layer, ".front" ) ) tTrans = addTween( layer, "front" );     
        
        t = (t + tTrans);
        
        layer.startTime = d;
        layer.outPoint = Number(t + d);
        if ( !hasTag( layer, ".unlinked" ) ) d += t;
    }
    
    return d;
}

function process()
{
	
	app.beginUndoGroup("Time remapper");
		velocity = 1 / Number(velNumber.text);
		var layers = app.project.activeItem.selectedLayers;
		var t = remap( layers, velocity );
		app.project.activeItem.workAreaDuration = t;
		app.project.activeItem.duration = t;
	app.endUndoGroup();

	//return t;
	
    //return 0;
}

function addTween( layer, tween )
{
    if ( tween == "alpha" )
    {
        var p = layer.transform[ "Opacity" ];
        p.expressionEnabled = true;
        
        var script = "var o = 100;\n";
        script += "if ( time < inPoint + "+velocity+" ) { o = linear(time, inPoint, inPoint + "+velocity+", 0, 100); }\n";
        script += "else if ( time > outPoint - "+velocity+" ) { o = linear(time, outPoint - "+velocity+", outPoint, 100, 0); }\n";
        script += "o;\n";
        p.expression = script;
    }
    if ( tween == "down" )
    {
        var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        
        var script = "var p = [transform.position[0], transform.position[1]];\n";
        script += "if ( time < inPoint + "+velocity+" ) { p[1] = easeOutExpo( time-inPoint, p[1] - 1080, 1080, "+velocity+" ); }\n";
        script += "else if ( time > outPoint - "+velocity+" ) { p[1] = easeInExpo( time-(outPoint-1), p[1], 1080, "+velocity+" ); }\n";
        script += "p;\n";
        script += "function easeInExpo(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }\n";
        script += "function easeOutExpo(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }\n";
        p.expression = script;
    }
    if ( tween == "up" )
    {
        var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        
        var script = "var p = [transform.position[0], transform.position[1]];\n";
        script += "if ( time < inPoint + "+velocity+" ) { p[1] = easeOutExpo( time-inPoint, p[1] + 1080, -1080, "+velocity+" ); }\n";
        script += "else if ( time > outPoint - "+velocity+" ) { p[1] = easeInExpo( time-(outPoint-1), p[1], -1080, "+velocity+" ); }\n";
        script += "p;\n";
        script += "function easeInExpo(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }\n";
        script += "function easeOutExpo(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }\n";
        p.expression = script;
    }
    if ( tween == "left" )
    {
        var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        
        var script = "var p = [transform.position[0], transform.position[1]];\n";
        script += "if ( time < inPoint + "+velocity+" ) { p[0] = easeOutExpo( time-inPoint, p[0] + 1920, -1920, "+velocity+" ); }\n";
        script += "else if ( time > outPoint - "+velocity+" ) { p[0] = easeInExpo( time-(outPoint-1), p[0], -1920, "+velocity+" ); }\n";
        script += "p;\n";
        script += "function easeInExpo(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }\n";
        script += "function easeOutExpo(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }\n";
        p.expression = script;
    }
    if ( tween == "right" )
    {
        var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        
        var script = "var p = [transform.position[0], transform.position[1]];\n";
        script += "if ( time < inPoint + "+velocity+" ) { p[0] = easeOutExpo( time-inPoint, p[0] - 1920, 1920, "+velocity+" ); }\n";
        script += "else if ( time > outPoint - "+velocity+" ) { p[0] = easeInExpo( time-(outPoint-1), p[0], 1920, "+velocity+" ); }\n";
        script += "p;\n";
        script += "function easeInExpo(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }\n";
        script += "function easeOutExpo(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }\n";
        p.expression = script;
    }
    if ( tween == "back" )
    {
        layer.threeDLayer = true;
        var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        
        var script = "var p = [transform.position[0], transform.position[1], transform.position[2]];\n";
        script += "if ( time < inPoint + "+velocity+" ) { p[2] = easeOutExpo( time-inPoint, p[2] - 2048, 2048, "+velocity+" ); }\n";
        script += "else if ( time > outPoint - "+velocity+" ) { p[2] = easeInExpo( time-(outPoint-1), p[2], 16000, "+velocity+" ); }\n";
        script += "p;\n";
        script += "function easeInExpo(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }\n";
        script += "function easeOutExpo(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }\n";
        p.expression = script;
    }
    if ( tween == "front" )
    {
        layer.threeDLayer = true;
        var p = layer.transform[ "Position" ];
        p.expressionEnabled = true;
        
        var script = "var p = [transform.position[0], transform.position[1], transform.position[2]];\n";
        script += "if ( time < inPoint + "+velocity+" ) { p[2] = easeOutExpo( time-inPoint, p[2] + 16000, -16000, "+velocity+" ); }\n";
        script += "else if ( time > outPoint - 1 ) { p[2] = easeInExpo( time-(outPoint-1), p[2], -2048, "+velocity+" ); }\n";
        script += "p;\n";
        script += "function easeInExpo(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }\n";
        script += "function easeOutExpo(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }\n";
        p.expression = script;
    }
    return 2 * velocity;
}

//startRemmaping();

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