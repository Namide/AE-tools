// Add markers



var mkNumber = 1;
var mkValue = 50;
var mkTime = 1;
var mkTween = "easeOutExpo";



/*

		INIT WINDOWS

*/


var windowsOptions = createDialog("Market tweens", true, process);
windowsOptions.groupe.orientation = "column";

var groupe1 = windowsOptions.groupe.add("panel", undefined, "Parameters");
groupe1.orientation = "column";
groupe1.alignChildren = ["fill", "center"];

var g2 = groupe1.add('group');
g2.orientation = "row";
g2.add("statictext", undefined, "number");
var markerNumber = g2.add("edittext", undefined, mkNumber);

var g3 = groupe1.add('group');
g3.orientation = "row";
g3.add("statictext", undefined, "value");
var markerDefaultValue = g3.add("edittext", undefined, mkValue);

var g4 = groupe1.add('group');
g4.orientation = "row";
g4.add("statictext", undefined, "time");
var markerDefaultTime = g4.add("edittext", undefined, mkTime);

var g5 = groupe1.add('group');
g5.orientation = "row";
g5.add("statictext", undefined, "tween");
var markerDefaultTween = g5.add("edittext", undefined, mkTween);



/*

		INIT PROCESS

*/

start();

function start() {

	if (app.project.activeItem == null) {
		return alert('Namide say: You must select 1 layer and 1 property (⁎˃ᆺ˂)');
	}

	if (app.project.activeItem.selectedLayers.length != 1) {
		return alert('Namide say: You must select 1 layer (⁎˃ᆺ˂)');
	}

	if (app.project.activeItem.selectedProperties.length < 1) {
		return alert('Namide say: You must select 1 or more properties (=^‥^=)');
	}

	windowsOptions.show();
}

function process() {

	app.beginUndoGroup("marker tweens");
	createMarker();
	injectScript();
	app.endUndoGroup();
}



/*

		FUNCTION

*/

function createMarker() {

	var i;
	var length = markerNumber.text;
	alert(length);

	for (i = 0; i < length; i++) {

		var mv = new MarkerValue("" /*"comment","chapter","url","frameTarget","cuePointName"*/ );

		var parms = new Object();
		parms.tfs1Value = markerDefaultValue.text;
		parms.tfs1Time = Number(markerDefaultTime.text);
		parms.tfs1Tween = markerDefaultTween.text;
		mv.setParameters(parms);

		app.project.activeItem.selectedLayers[0].property("Marker").setValueAtTime((app.project.activeItem.time + i + 1), mv);
	}

}

function injectScript() {

	var i;

	for (i = 0; i < app.project.activeItem.selectedProperties.length; i++) {

		app.project.activeItem.selectedProperties[i].expression = "m = thisLayer.marker;\n" +

			"var tweens = initTweens();\n" +


			"// CALCULATIONS\n" +


			"var depth = ( thisProperty.value == Number(thisProperty.value) ) ? 1 : thisProperty.value.length;\n" +

			"if ( time < m.key(1).time ) thisProperty.value;\n" +
			"else if ( time > outPoint ) thisProperty.value;\n" +
			"else\n" +
			"{\n" +
			" for( var i=0; i<m.numKeys; i++ )\n" +
			" {\n" +

			" var lastValue = getTotalArrayValueByItem( i );\n" +
			" tTemp = time - (m.key(i+1).time);\n" +

			' if ( time < ( m.key(i+1).time + Number(m.key(i+1).parameters["tfs1Time"]) ) )\n' +
			" {\n" +

			" var finalValue = [];\n" +
			" var nextValue = getTotalArrayValueByItem( i+1 );\n" +
			' for ( j = 0; j < depth; j++ ) finalValue[j] = tweens[m.key(i+1).parameters["tfs1Tween"]]( tTemp, Number(lastValue[j]), Number(nextValue[j]) - Number(lastValue[j]), Number(m.key(i+1).parameters["tfs1Time"]) );\n' +
			" if (depth < 2) finalValue[0];\n" +
			" else finalValue;\n" +
			" break;\n" +
			" }\n" +
			" nextTime = (i + 1< m.numKeys) ? m.key(i+2).time : outPoint;\n" +
			" if ( time < nextTime  )\n" +
			" {\n" +
			" var finalValue = getTotalArrayValueByItem( i+1 );\n" +
			" if (depth < 2) finalValue[0];\n" +
			" else finalValue;\n" +

			" break;\n" +
			" }\n" +

			" }\n" +
			"};\n" +

			"function getTotalArrayValueByItem( idItem )\n" +
			"{\n" +

			" var depth = ( thisProperty.value == Number(thisProperty.value) ) ? 1 : thisProperty.value.length;\n" +


			" var val0 = (depth<2) ? [ thisProperty.value ] : thisProperty.value;\n" +
			" val1 = new Array();\n" +
			" for ( var i = 0; i < depth; i++ ) val1[i] = val0[i];\n" +

			" for ( i = 1; i <= idItem; i++ )\n" +
			" {\n" +
			' markVal = (depth<2) ? [ m.key(i).parameters["tfs1Value"] ] : m.key(i).parameters["tfs1Value"].split(",");\n' +
			" while ( markVal.length < depth ) markVal.push( 0 );\n" +

			" for ( var j = 0; j < depth; j++ ) val1[j] = markVal[j];\n" +

			" }\n" +


			" return val1;\n" +
			"}\n" +




			"// TWEENS\n" +

			"function initTweens()\n" +
			"{\n" +
			" var tweens = [];\n" +
			' tweens["easeNone"] = easeNone;\n' +
			' tweens["easeInQuad"] = easeInQuad;\n' +
			' tweens["easeInOutQuad"] = easeInOutQuad;\n' +
			' tweens["easeInCubic"] = easeInCubic;\n' +
			' tweens["easeOutCubic"] = easeOutCubic;\n' +
			' tweens["easeInOutCubic"] = easeInOutCubic;\n' +
			' tweens["easeOutInCubic"] = easeOutInCubic;\n' +
			' tweens["easeInQuart"] = easeInQuart;\n' +
			' tweens["easeOutQuart"] = easeOutQuart;\n' +
			' tweens["easeInOutQuart"] = easeInOutQuart;\n' +
			' tweens["easeOutInQuart"] = easeOutInQuart;\n' +
			' tweens["easeOutQuart"] = easeOutQuart;\n' +
			' tweens["easeInQuint"] = easeInQuint;\n' +
			' tweens["easeOutQuint"] = easeOutQuint;\n' +
			' tweens["easeInOutQuint"] = easeInOutQuint;\n' +
			' tweens["easeOutInQuint"] = easeOutInQuint;\n' +
			' tweens["easeInSine"] = easeInSine;\n' +
			' tweens["easeOutSine"] = easeOutSine;\n' +
			' tweens["easeInOutSine"] = easeInOutSine;\n' +
			' tweens["easeOutInSine"] = easeOutInSine;\n' +
			' tweens["easeInExpo"] = easeInExpo;\n' +
			' tweens["easeOutExpo"] = easeOutExpo;\n' +
			' tweens["easeInOutExpo"] = easeInOutExpo;\n' +
			' tweens["easeOutInExpo"] = easeOutInExpo;\n' +
			' tweens["easeInCirc"] = easeInCirc;\n' +
			' tweens["easeOutCirc"] = easeOutCirc;\n' +
			' tweens["easeInOutCirc"] = easeInOutCirc;\n' +
			' tweens["easeOutInCirc"] = easeOutInCirc;\n' +
			' tweens["easeInElastic"] = easeInElastic;\n' +
			' tweens["easeOutElastic"] = easeOutElastic;\n' +
			' tweens["easeInOutElastic"] = easeInOutElastic;\n' +
			' tweens["easeOutInElastic"] = easeOutInElastic;\n' +
			' tweens["easeInBack"] = easeInBack;\n' +
			' tweens["easeOutBack"] = easeOutBack;\n' +
			' tweens["easeInOutBack"] = easeInOutBack;\n' +
			' tweens["easeOutInBack"] = easeOutInBack;\n' +
			' tweens["easeInBounce"] = easeInBounce;\n' +
			' tweens["easeOutBounce"] = easeOutBounce;\n' +
			' tweens["easeInOutBounce"] = easeInOutBounce;\n' +
			' tweens["easeOutInBounce"] = easeOutInBounce;\n' +
			" return tweens;\n" +
			"}\n" +



			"function easeNone(t, b, c, d)\n" +
			"{\n" +
			" return c*t/d + b;\n" +
			"}  \n" +
			"function easeInQuad(t, b, c, d)\n" +
			"{\n" +
			" return c*(t/=d)*t + b;\n" +
			"}\n" +
			"function easeOutQuad(t, b, c, d)\n" +
			"{\n" +
			" return -c *(t/=d)*(t-2) + b;\n" +
			"} \n" +
			"function easeInOutQuad(t, b, c, d)\n" +
			"{\n" +
			" if((t/=d/2) < 1) return c/2*t*t + b;\n" +
			" return -c/2 *((--t)*(t-2) - 1) + b;\n" +
			"}  \n" +
			"function easeInCubic(t, b, c, d)\n" +
			"{\n" +
			" return c*(t/=d)*t*t + b;\n" +
			"}   \n" +
			"function easeOutCubic(t, b, c, d)\n" +
			"{\n" +
			" return c*((t=t/d-1)*t*t + 1) + b;\n" +
			"}   \n" +
			"function easeInOutCubic(t, b, c, d)\n" +
			"{\n" +
			" if((t/=d/2) < 1) return c/2*t*t*t + b;\n" +
			" return c/2*((t-=2)*t*t + 2) + b;\n" +
			"}   \n" +
			"function easeOutInCubic(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutCubic(t*2, b, c/2, d);\n" +
			" return easeInCubic((t*2)-d, b+c/2, c/2, d);\n" +
			"}\n" +
			"function easeInQuart(t, b, c, d)\n" +
			"{\n" +
			" return c*(t/=d)*t*t*t + b;\n" +
			"}  \n" +
			"function easeOutQuart(t, b, c, d)\n" +
			"{\n" +
			" return -c *((t=t/d-1)*t*t*t - 1) + b;\n" +
			"}   \n" +
			"function easeInOutQuart(t, b, c, d)\n" +
			"{\n" +
			" if((t/=d/2) < 1) return c/2*t*t*t*t + b;\n" +
			" return -c/2 *((t-=2)*t*t*t - 2) + b;\n" +
			"}    \n" +
			"function easeOutInQuart(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutQuart(t*2, b, c/2, d);\n" +
			" return easeInQuart((t*2)-d, b+c/2, c/2, d);\n" +
			"} \n" +
			"function easeInQuint(t, b, c, d)\n" +
			"{\n" +
			" return c*(t/=d)*t*t*t*t + b;\n" +
			"}    \n" +
			"function easeOutQuint(t, b, c, d)\n" +
			"{\n" +
			" return c*((t=t/d-1)*t*t*t*t + 1) + b;\n" +
			"}    \n" +
			"function easeInOutQuint(t, b, c, d)\n" +
			"{\n" +
			" if((t/=d/2) < 1) return c/2*t*t*t*t*t + b;\n" +
			" return c/2*((t-=2)*t*t*t*t + 2) + b;\n" +
			"}    \n" +
			"function easeOutInQuint(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutQuint(t*2, b, c/2, d);\n" +
			" return easeInQuint((t*2)-d, b+c/2, c/2, d);\n" +
			"}    \n" +
			"function easeInSine(t, b, c, d)\n" +
			"{\n" +
			" return -c * Math.cos(t/d *(Math.PI/2)) + c + b;\n" +
			"}    \n" +
			"function easeOutSine(t, b, c, d)\n" +
			"{\n" +
			" return c * Math.sin(t/d *(Math.PI/2)) + b;\n" +
			"}    \n" +
			"function easeInOutSine(t, b, c, d)\n" +
			"{\n" +
			" return -c/2 *(Math.cos(Math.PI*t/d) - 1) + b;\n" +
			"}    \n" +
			"function easeOutInSine(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutSine(t*2, b, c/2, d);\n" +
			" return easeInSine((t*2)-d, b+c/2, c/2, d);\n" +
			"}    \n" +
			"function easeInExpo(t, b, c, d)\n" +
			"{\n" +
			" return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001;\n" +
			"}    \n" +
			"function easeOutExpo(t, b, c, d)\n" +
			"{\n" +
			" return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b;\n" +
			"}    \n" +
			"function easeInOutExpo(t, b, c, d)\n" +
			"{\n" +
			" if(t==0) return b;\n" +
			" if(t==d) return b+c;\n" +
			" if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 *(t - 1)) + b - c * 0.0005;\n" +
			" return c/2 * 1.0005 *(-Math.pow(2, -10 * --t) + 2) + b;\n" +
			"}    \n" +
			"function easeOutInExpo(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutExpo(t*2, b, c/2, d);\n" +
			" return easeInExpo((t*2)-d, b+c/2, c/2, d);\n" +
			"}    \n" +
			"function easeInCirc(t, b, c, d)\n" +
			"{\n" +
			" return -c *(Math.sqrt(1 -(t/=d)*t) - 1) + b;\n" +
			"}    \n" +
			"function easeOutCirc(t, b, c, d)\n" +
			"{\n" +
			" return c * Math.sqrt(1 -(t=t/d-1)*t) + b;\n" +
			"}    \n" +
			"function easeInOutCirc(t, b, c, d)\n" +
			"{\n" +
			" if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b;\n" +
			" return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b;\n" +
			"}    \n" +
			"function easeOutInCirc(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutCirc(t*2, b, c/2, d);\n" +
			" return easeInCirc((t*2)-d, b+c/2, c/2, d);\n" +
			"}    \n" +
			"function easeInElastic(t, b, c, d, a, p)\n" +
			"{\n" +
			" var s;\n" +
			" if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;\n" +
			" if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);\n" +
			" return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;\n" +
			"}    \n" +
			"function easeOutElastic(t, b, c, d, a, p)\n" +
			"{\n" +
			" var s;\n" +
			" if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;\n" +
			" if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);\n" +
			" return(a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p ) + c + b);\n" +
			"}    \n" +
			"function easeInOutElastic(t, b, c, d, a, p)\n" +
			"{\n" +
			" var s;\n" +
			" if(t==0) return b;  if((t/=d/2)==2) return b+c;  if(!p) p=d*(.3*1.5);\n" +
			" if(!a || a < Math.abs(c)) { a=c; s=p/4; }       else s = p/(2*Math.PI) * Math.asin(c/a);\n" +
			" if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;\n" +
			" return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5 + c + b;\n" +
			"}    \n" +
			"function easeOutInElastic(t, b, c, d, a, p)\n" +
			"{\n" +
			" if(t < d/2) return easeOutElastic(t*2, b, c/2, d, a, p);\n" +
			" return easeInElastic((t*2)-d, b+c/2, c/2, d, a, p);\n" +
			"}    \n" +
			"function easeInBack(t, b, c, d, s)\n" +
			"{\n" +
			" if(s == undefined) s = 1.70158;\n" +
			" return c*(t/=d)*t*((s+1)*t - s) + b;\n" +
			"}    \n" +
			"function easeOutBack(t, b, c, d, s)\n" +
			"{\n" +
			" if(s == undefined) s = 1.70158;\n" +
			" return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;\n" +
			"}    \n" +
			"function easeInOutBack(t, b, c, d, s)\n" +
			"{\n" +
			" if(s == undefined) s = 1.70158;\n" +
			" if((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;\n" +
			" return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;\n" +
			"}    \n" +
			"function easeOutInBack(t, b, c, d, s)\n" +
			"{\n" +
			" if(t < d/2) return easeOutBack(t*2, b, c/2, d, s);\n" +
			" return easeInBack((t*2)-d, b+c/2, c/2, d, s);\n" +
			"}    \n" +
			"function easeInBounce(t, b, c, d)\n" +
			"{\n" +
			" return c - easeOutBounce(d-t, 0, c, d) + b;\n" +
			"}    \n" +
			"function easeOutBounce(t, b, c, d)\n" +
			"{\n" +
			" if((t/=d) <(1/2.75)) {\n" +
			" return c*(7.5625*t*t) + b;\n" +
			" } else if(t <(2/2.75)) {\n" +
			" return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;\n" +
			" } else if(t <(2.5/2.75)) {\n" +
			" return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;\n" +
			" } else {\n" +
			" return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;\n" +
			" }\n" +
			"}    \n" +
			"function easeInOutBounce(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeInBounce(t*2, 0, c, d) * .5 + b;\n" +
			" else return easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;\n" +
			"}    \n" +
			"function easeOutInBounce(t, b, c, d)\n" +
			"{\n" +
			" if(t < d/2) return easeOutBounce(t*2, b, c/2, d);\n" +
			" return easeInBounce((t*2)-d, b+c/2, c/2, d);\n" +
			"}";

	}
}

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