{
    /*
        ________           ______   __________                 ________                 _________
        ___  __/______________  /   ___  ____/_____________    __  ___/_______________________  /
        __  /  _  __ \  __ \_  /    __  /_   _  __ \_  ___/    _____ \___  __ \  _ \  _ \  __  /
        _  /   / /_/ / /_/ /  /     _  __/   / /_/ /  /        ____/ /__  /_/ /  __/  __/ /_/ /
        /_/    \____/\____//_/      /_/      \____//_/         /____/ _  .___/\___/\___/\__,_/
                                                                      /_/

        by Greg & Namide !
        version: 1.3.2
    */



	/*
		GENERAL PROPERTIES
	*/

		var _name = "TFS 1.3.2";





	/*
		TWEENS PROPERTIES
	*/

		var _tweenGroup;
		var _tweenPresetsArray = [ "Default", "-", "Opacity", "Position3D - to back", "RotationX - flap", "Position2D - to right", "Position2D - to left", "Position2D - to bottom", "Position2D - to top", "Orientation - Site", "  Position - Site", "Fade Audio", "Scale - Jelly", "Scale - Cushion"];
		var _tweenPropertiesArray = [ "Selected layer", "-", "Position", "Scale", "Rotation", "Opacity", "-", "Orientation", "Rotation X", "Rotation Y", "Rotation Z" ];
		var _tweenEasingArray = [ "None", "Quad", "Cubic", "Quart", "Quint", "Sine", "Expo", "Circ", "-", "Bounce", "Elastic", "Cushion", "Back" ];
		var _tweenTypeArray = [ "In", "Out", "InOut", "OutIn" ];

		var _tweenPresetsDatas = [];
		_tweenPresetsDatas[0] = { property:0, inEasing:6, inTime:1, inType:1, inValues:[0,0,0], outEasing:6, outTime:1, outType:0, outValues:[0,0,0], pause:true, relative:false };
		_tweenPresetsDatas[2] = { property:5, inEasing:0, inTime:1, inType:2, inValues:[0,0,0], outEasing:0, outTime:1, outType:2, outValues:[0,0,0], pause:true, relative:false };
		_tweenPresetsDatas[3] = { property:2, inEasing:6, inTime:1, inType:1, inValues:[0,0,-500], outEasing:6, outTime:1, outType:0, outValues:[0,0,500], pause:true, relative:true };
		_tweenPresetsDatas[4] = { property:8, inEasing:10, inTime:1.7, inType:1, inValues:[90,0,0], outEasing:0, outTime:0, outType:0, outValues:[0,0,0], pause:true, relative:false };
		_tweenPresetsDatas[5] = { property:2, inEasing:6, inTime:1, inType:1, inValues:[-1920,0,0], outEasing:6, outTime:1, outType:0, outValues:[1920,0,0], pause:true, relative:true };
		_tweenPresetsDatas[6] = { property:2, inEasing:6, inTime:1, inType:1, inValues:[1920,0,0], outEasing:6, outTime:1, outType:0, outValues:[-1920,0,0], pause:true, relative:true };
		_tweenPresetsDatas[7] = { property:2, inEasing:6, inTime:1, inType:1, inValues:[0,-1080,0], outEasing:6, outTime:1, outType:0, outValues:[0,1080,0], pause:true, relative:true };
		_tweenPresetsDatas[8] = { property:2, inEasing:6, inTime:1, inType:1, inValues:[0,1080,0], outEasing:6, outTime:1, outType:0, outValues:[0,-1080,0], pause:true, relative:true }
		_tweenPresetsDatas[9] = { property:7, inEasing:6, inTime:1, inType:1, inValues:[90,-85,10], outEasing:6, outTime:0, outType:0, outValues:[0,0,0], pause:true, relative:false };
		_tweenPresetsDatas[10] = { property:2, inEasing:6, inTime:1, inType:1, inValues:[0,0,-2000], outEasing:6, outTime:0.7, outType:0, outValues:[0,1500,0], pause:true, relative:true };
		_tweenPresetsDatas[11] = { property:0, inEasing:6, inTime:3, inType:1, inValues:[-99,-99,0], outEasing:6, outTime:3, outType:0, outValues:[-99,-99,0], pause:true, relative:false };
		_tweenPresetsDatas[12] = { property:3, inEasing:10, inTime:1, inType:1, inValues:[85,0,0], outEasing:6, outTime:0.5, outType:0, outValues:[0,0,0], pause:true, relative:false };
		_tweenPresetsDatas[13] = { property:3, inEasing:11, inTime:1, inType:1, inValues:[0,0,0], outEasing:6, outTime:1, outType:0, outValues:[0,0,0], pause:true, relative:false };







	/*
		GENERAL DATAS
	*/

		var _mainWindow;



	/*
		TWEENS DATAS
	*/

		var _tweenInputs = {};



	/*
		GENERAL METHODS
	*/

    function init(thisObj)
    {
		_mainWindow = (thisObj instanceof Panel) ? thisObj : new Window("palette", _name, undefined, {resizeable:true});
		_mainWindow.margins = 2;
		_mainWindow.alignChildren = 'center';

		try
		{
			var tfs = new File($.fileName);
			var dirTfs = tfs.parent.absoluteURI + "/";
			_mainWindow.add("image", undefined, dirTfs + "/toolForSpeed/toolForSpeed_logo.png");
		}
		catch(e)
		{
			_mainWindow.add ("statictext", [0,50,100,70],  "TOOL FOR SPEED");
		}

		var tabPanel = _mainWindow.add( "tabbedpanel", undefined, "" );
			tabPanel.margins = 6;
			_tweenGroup = tabPanel.add("tab", undefined, "Tweens");
			tab = tabPanel.add("tab", undefined, "Properties").enabled = false;
			tab = tabPanel.add("tab", undefined, "Layer").enabled = false;
			tab = tabPanel.add("tab", undefined, "Project").enabled = false;


        tweenInit();

		_mainWindow.layout.layout(true);
		_mainWindow.layout.resize();
		_mainWindow.onResizing = _mainWindow.onResize = function () {this.layout.resize();}


		if (_mainWindow instanceof Window)
		{
			_mainWindow.show();
		}
		else
		{
			_mainWindow.layout.layout(true);
		}


    }

	/*
		TWEENS METHODS
	*/

    function tweenInit()
    {
		var group, list, panel, button;//, text;


		_tweenGroup.orientation = 'column';


		panel = _tweenGroup.add('group');
		panel.margins = [0, 10, 0, 10];;
		panel.alignChildren = 'left';
		panel.orientation = 'column';

			group = panel.add('group');
				group.add ("statictext", undefined,  "Presets:");
				_tweenInputs["preset"] = group.add("dropdownlist", undefined, _tweenPresetsArray );
				_tweenInputs["preset"].selection = 0;
				_tweenInputs["preset"].onChange = tweenChangePreset;

			group = panel.add('group');
				group.add ("statictext", undefined,  "Properties:");
				_tweenInputs["property"] = group.add("dropdownlist", undefined, _tweenPropertiesArray );
				_tweenInputs["property"].selection = 0;
				_tweenInputs["property"].onChange = tweenChangeProperty;



		panel = _tweenGroup.add('panel', undefined, 'inPoint');

		panel.alignChildren = 'left';

			group = panel.add('group');
				group.add ("statictext", undefined,  "Easing:");
				_tweenInputs["inEasing"] = group.add("dropdownlist", undefined, _tweenEasingArray );
				_tweenInputs["inEasing"].selection = 6;
				_tweenInputs["inType"] = group.add("dropdownlist", undefined, _tweenTypeArray );
				_tweenInputs["inType"].selection = 1;

			group = panel.add('group');
				group.add ("statictext", undefined,  "Value(s):");
				_tweenInputs["inValues"] = [];
				_tweenInputs["inValues"][0] = group.add('edittext', [0, 0, 40, 19], 0 );
				_tweenInputs["inValues"][1] = group.add('edittext', [0, 0, 40, 19], 0 );
				_tweenInputs["inValues"][2] = group.add('edittext', [0, 0, 40, 19], 0 );

			group = panel.add('group');
				group.add ("statictext", undefined,  "Time:");
				_tweenInputs["inTime"] = group.add('edittext', [0, 0, 40, 19], 1 );
				group.add ("statictext", undefined,  "seconds");

		panel = _tweenGroup.add('panel', undefined, 'outPoint');
		panel.alignChildren = 'left';

			group = panel.add('group');
				group.add ("statictext", undefined,  "Easing:");
				_tweenInputs["outEasing"] = group.add("dropdownlist", undefined, _tweenEasingArray );
				_tweenInputs["outEasing"].selection = 6;
				_tweenInputs["outType"] = group.add("dropdownlist", undefined, _tweenTypeArray );
				_tweenInputs["outType"].selection = 0;

			group = panel.add('group');
				group.add ("statictext", undefined,  "Value(s):");
				_tweenInputs["outValues"] = [];
				_tweenInputs["outValues"][0] = group.add('edittext', [0, 0, 40, 19], 0 );
				_tweenInputs["outValues"][1] = group.add('edittext', [0, 0, 40, 19], 0 );
				_tweenInputs["outValues"][2] = group.add('edittext', [0, 0, 40, 19], 0 );

			group = panel.add('group');
				group.add ("statictext", undefined,  "Time:");
				_tweenInputs["outTime"] = group.add('edittext', [0, 0, 40, 19], 1 );
				group.add ("statictext", undefined,  "seconds");

		panel = _tweenGroup.add('panel', undefined, 'Advanced');

			group = panel.add('group');

				_tweenInputs["relative"] = group.add('checkbox', undefined, 'Relative mode');
				_tweenInputs["pause"] = group.add('checkbox', undefined, 'Pause enable');
				_tweenInputs["pause"].value = true;

			var tfs = new File($.fileName);
			var dirTfs = tfs.parent.absoluteURI + "/";
		group = _tweenGroup.add('group'),
			button = group.add("iconbutton", undefined, dirTfs + "/toolForSpeed/apply.png");
			button.onClick = tweenGenerate;

    }

	function tweenGenerate()
	{
		var depth = [];
		var properties = [];

		if( _tweenInputs["property"].selection.index == 0 )
		{
			if ( app.project.activeItem.selectedProperties.length < 1 )
				return alert('Namide say: If you use "Selected layer" in "Property" you must to select 1 or more properties (=^‥^=)');

			for ( i=0; i<app.project.activeItem.selectedProperties.length; i++)
			{
				properties[i] = app.project.activeItem.selectedProperties[i];

				//app.project.activeItem.selectedLayers[i].motionBlur = false;
				//app.project.activeItem.selectedLayers[i].adjustmentLayer = false;
				//app.project.activeItem.selectedLayers[i].threeDLayer = true;
			}
		}
		else
		{
			if ( app.project.activeItem.selectedLayers.length < 1 )
				return alert('Greg say: If you use "' + _tweenInputs["property"].selection.text + '" in "Property" you must to select 1 or more layers (⁎˃ᆺ˂)');

			for ( i=0; i<app.project.activeItem.selectedLayers.length; i++)
			{
				properties[i] = app.project.activeItem.selectedLayers[i].transform[ _tweenInputs["property"].selection.text ];
				if ( _tweenInputs["property"].selection.text == "Orientation" ||
					 _tweenInputs["property"].selection.text == "Rotation X" ||
					 _tweenInputs["property"].selection.text == "Rotation Y" ||
					 _tweenInputs["property"].selection.text == "Rotation Z" )
				{
					 app.project.activeItem.selectedLayers[i].threeDLayer = true;
				}

			}

		}

		var easeInPoint = "ease";
		if ( _tweenInputs["inEasing"].selection.text == "None" ) easeInPoint += "None";
		else easeInPoint += _tweenInputs["inType"].selection.text + _tweenInputs["inEasing"].selection.text;

		var easeOutPoint = "ease";
		if ( _tweenInputs["outEasing"].selection.text == "None" ) easeOutPoint += "None";
		else easeOutPoint += _tweenInputs["outType"].selection.text + _tweenInputs["outEasing"].selection.text;


		_tweenInputs["inTime"].text = testNumber(_tweenInputs["inTime"].text);
		_tweenInputs["inValues"][0].text = testNumber(_tweenInputs["inValues"][0].text);
		_tweenInputs["inValues"][1].text = testNumber(_tweenInputs["inValues"][1].text);
		_tweenInputs["inValues"][2].text = testNumber(_tweenInputs["inValues"][2].text);
		_tweenInputs["outTime"].text = testNumber(_tweenInputs["outTime"].text);
		_tweenInputs["outValues"][0].text = testNumber(_tweenInputs["outValues"][0].text);
		_tweenInputs["outValues"][1].text = testNumber(_tweenInputs["outValues"][1].text);
		_tweenInputs["outValues"][2].text = testNumber(_tweenInputs["outValues"][2].text);


		var script = "var introTime = " + _tweenInputs["inTime"].text + ";\n";
		script += "var introDatas = [ " + _tweenInputs["inValues"][0].text + "," + _tweenInputs["inValues"][1].text + "," + _tweenInputs["inValues"][2].text + " ];\n";
		script += "var introTween = " + easeInPoint + ";\n";
		script += "var endTime = " + _tweenInputs["outTime"].text + ";\n";
		script += "var endDatas = [ " + _tweenInputs["outValues"][0].text + "," + _tweenInputs["outValues"][1].text + "," + _tweenInputs["outValues"][2].text + " ];\n";
		script += "var endTween = " + easeOutPoint + ";\n";
		script += "var dontStop = " + (!_tweenInputs["pause"].value) + ";\n";
		script += "var relative = " + _tweenInputs["relative"].value + ";\n";
		script += "//	CALCULATION\n";
		script += "function easeNone(t,b,c,d){return c*t/d+b}function easeInQuad(t,b,c,d){return c*(t/=d)*t+b}function easeOutQuad(t,b,c,d){return-c*(t/=d)*(t-2)+b}function easeInOutQuad(t,b,c,d){return(t/=d/2)<1?c/2*t*t+b:-c/2*(--t*(t-2)-1)+b}function easeInCubic(t,b,c,d){return c*(t/=d)*t*t+b}function easeOutCubic(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b}function easeInOutCubic(t,b,c,d){return(t/=d/2)<1?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b}function easeOutInCubic(t,b,c,d){return t<d/2?easeOutCubic(2*t,b,c/2,d):easeInCubic(2*t-d,b+c/2,c/2,d)}function easeInQuart(t,b,c,d){return c*(t/=d)*t*t*t+b}function easeOutQuart(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b}function easeInOutQuart(t,b,c,d){return(t/=d/2)<1?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b}function easeOutInQuart(t,b,c,d){return t<d/2?easeOutQuart(2*t,b,c/2,d):easeInQuart(2*t-d,b+c/2,c/2,d)}function easeInQuint(t,b,c,d){return c*(t/=d)*t*t*t*t+b}function easeOutQuint(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b}function easeInOutQuint(t,b,c,d){return(t/=d/2)<1?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b}function easeOutInQuint(t,b,c,d){return t<d/2?easeOutQuint(2*t,b,c/2,d):easeInQuint(2*t-d,b+c/2,c/2,d)}function easeInSine(t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b}function easeOutSine(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b}function easeInOutSine(t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b}function easeOutInSine(t,b,c,d){return t<d/2?easeOutSine(2*t,b,c/2,d):easeInSine(2*t-d,b+c/2,c/2,d)}function easeInExpo(t,b,c,d){return 0==t?b:c*Math.pow(2,10*(t/d-1))+b-.001*c}function easeOutExpo(t,b,c,d){return t==d?b+c:1.001*c*(1-Math.pow(2,-10*t/d))+b}function easeInOutExpo(t,b,c,d){return 0==t?b:t==d?b+c:(t/=d/2)<1?c/2*Math.pow(2,10*(t-1))+b-5e-4*c:c/2*1.0005*(2-Math.pow(2,-10*--t))+b}function easeOutInExpo(t,b,c,d){return t<d/2?easeOutExpo(2*t,b,c/2,d):easeInExpo(2*t-d,b+c/2,c/2,d)}function easeInCirc(t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b}function easeOutCirc(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b}function easeInOutCirc(t,b,c,d){return(t/=d/2)<1?-c/2*(Math.sqrt(1-t*t)-1)+b:c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}function easeOutInCirc(t,b,c,d){return t<d/2?easeOutCirc(2*t,b,c/2,d):easeInCirc(2*t-d,b+c/2,c/2,d)}function easeInElastic(t,b,c,d,a,p){var s;return 0==t?b:1==(t/=d)?b+c:(p||(p=.3*d),!a||a<Math.abs(c)?(a=c,s=p/4):s=p/(2*Math.PI)*Math.asin(c/a),-a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)+b)}function easeOutElastic(t,b,c,d,a,p){var s;return 0==t?b:1==(t/=d)?b+c:(p||(p=.3*d),!a||a<Math.abs(c)?(a=c,s=p/4):s=p/(2*Math.PI)*Math.asin(c/a),a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)}function easeInOutElastic(t,b,c,d,a,p){var s;return 0==t?b:2==(t/=d/2)?b+c:(p||(p=d*(.3*1.5)),!a||a<Math.abs(c)?(a=c,s=p/4):s=p/(2*Math.PI)*Math.asin(c/a),t<1?a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*-.5+b:a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b)}function easeOutInElastic(t,b,c,d,a,p){return t<d/2?easeOutElastic(2*t,b,c/2,d,a,p):easeInElastic(2*t-d,b+c/2,c/2,d,a,p)}function easeInCushion(t,b,c,d,a,p){var s;return 0==t?b:1==(t/=d)?b+c:(p||(p=.7*d),!a||a<Math.abs(c)?(a=c,s=p/4):s=p/(2*Math.PI)*Math.asin(c/a),-a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)+b)}function easeOutCushion(t,b,c,d,a,p){var s;return 0==t?b:1==(t/=d)?b+c:(p||(p=.7*d),!a||a<Math.abs(c)?(a=c,s=p/4):s=p/(2*Math.PI)*Math.asin(c/a),a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)}function easeInOutCushion(t,b,c,d,a,p){var s;return 0==t?b:2==(t/=d/2)?b+c:(p||(p=d*(.7*1.5)),!a||a<Math.abs(c)?(a=c,s=p/4):s=p/(2*Math.PI)*Math.asin(c/a),t<1?a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*-.5+b:a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b)}function easeInBack(t,b,c,d,s){return null==s&&(s=1.70158),c*(t/=d)*t*((s+1)*t-s)+b}function easeOutBack(t,b,c,d,s){return null==s&&(s=1.70158),c*((t=t/d-1)*t*((s+1)*t+s)+1)+b}function easeInOutBack(t,b,c,d,s){return null==s&&(s=1.70158),(t/=d/2)<1?c/2*(t*t*((1+(s*=1.525))*t-s))+b:c/2*((t-=2)*t*((1+(s*=1.525))*t+s)+2)+b}function easeOutInBack(t,b,c,d,s){return t<d/2?easeOutBack(2*t,b,c/2,d,s):easeInBack(2*t-d,b+c/2,c/2,d,s)}function easeInBounce(t,b,c,d){return c-easeOutBounce(d-t,0,c,d)+b}function easeOutBounce(t,b,c,d){return(t/=d)<1/2.75?c*(7.5625*t*t)+b:t<2/2.75?c*(7.5625*(t-=1.5/2.75)*t+.75)+b:t<2.5/2.75?c*(7.5625*(t-=2.25/2.75)*t+.9375)+b:c*(7.5625*(t-=2.625/2.75)*t+.984375)+b}function easeInOutBounce(t,b,c,d){return t<d/2?.5*easeInBounce(2*t,0,c,d)+b:.5*easeOutBounce(2*t-d,0,c,d)+.5*c+b}function easeOutInBounce(t,b,c,d){return t<d/2?easeOutBounce(2*t,b,c/2,d):easeInBounce(2*t-d,b+c/2,c/2,d)}var newDatas=[],depth=Array.isArray(thisProperty.value)?thisProperty.value.length:1,datas=depth<2?new Array(thisProperty):thisProperty.value,i;if(dontStop){var totalTime=outPoint-inPoint,ratio=introTime/(introTime+endTime);introTime=totalTime*ratio,endTime=totalTime*(1-ratio)}if(relative)for(i=0;i<depth;i++)introDatas[i]+=datas[i],endDatas[i]+=datas[i];if(time<inPoint)for(i=0;i<depth;i++)newDatas[i]=introDatas[i];else if(time<inPoint+introTime)for(i=0;i<depth;i++)newDatas[i]=introTween(time-inPoint,introDatas[i],datas[i]-introDatas[i],introTime);else if(time>outPoint)for(i=0;i<depth;i++)newDatas[i]=endDatas[i];else if(time>outPoint-endTime)for(i=0;i<depth;i++)newDatas[i]=endTween(time+endTime-outPoint,datas[i],endDatas[i]-datas[i],endTime);else for(i=0;i<depth;i++)newDatas[i]=datas[i];value=depth<2?newDatas[0]:newDatas;";

		app.beginUndoGroup("TFS - apply tween");
		for ( i=0; i<properties.length; i++)
		{
			depth[i] = properties[i].propertyDepth;
			properties[i].expressionEnabled = true;
			properties[i].expression = script;
		}
		app.endUndoGroup();
	}

    function tweenChangeProperty()
    {
		var id = this.selection.index;
		var name = this.selection.text;


		var numValues = 3;

		if ( name == "Rotation" ) numValues = 1;
		if ( name == "Opacity" ) numValues = 1;
		if ( name == "RotationX" ) numValues = 1;
		if ( name == "RotationY" ) numValues = 1;
		if ( name == "RotationZ" ) numValues = 1;

		if ( name == "Position" ) _tweenInputs["relative"].value = true;
		if ( name == "Scale" ) _tweenInputs["relative"].value = false;
		if ( name == "Rotation" ) _tweenInputs["relative"].value = true;
		if ( name == "Opacity" ) _tweenInputs["relative"].value = false;
		if ( name == "RotationX" ) _tweenInputs["relative"].value = true;
		if ( name == "RotationY" ) _tweenInputs["relative"].value = true;
		if ( name == "RotationZ" ) _tweenInputs["relative"].value = true;


		if ( numValues > 1 )
		{
			_tweenInputs["inValues"][1].enabled = true;
			_tweenInputs["outValues"][1].enabled = true;
		}
		else
		{
			_tweenInputs["inValues"][1].enabled = false;
			_tweenInputs["outValues"][1].enabled = false;
		}

		if ( numValues > 2 )
		{
			_tweenInputs["inValues"][2].enabled = true;
			_tweenInputs["outValues"][2].enabled = true;
		}
		else
		{
			_tweenInputs["inValues"][2].enabled = false;
			_tweenInputs["outValues"][2].enabled = false;
		}
    }

	function tweenChangePreset()
    {
        var id = this.selection.index;

		var presets = _tweenPresetsDatas[id];

		_tweenInputs["property"].selection = presets["property"];

		_tweenInputs["inEasing"].selection = presets["inEasing"];
		_tweenInputs["inTime"].text = presets["inTime"];
		_tweenInputs["inType"].text = presets["inType"];
		_tweenInputs["inValues"][0].text = presets["inValues"][0];
		_tweenInputs["inValues"][1].text = presets["inValues"][1];
		_tweenInputs["inValues"][2].text = presets["inValues"][2];

		_tweenInputs["outEasing"].selection = presets["outEasing"];
		_tweenInputs["outTime"].text = presets["outTime"];
		_tweenInputs["outType"].selection = presets["outType"];
		_tweenInputs["outValues"][0].text = presets["outValues"][0];
		_tweenInputs["outValues"][1].text = presets["outValues"][1];
		_tweenInputs["outValues"][2].text = presets["outValues"][2];

		_tweenInputs["pause"].value = presets["pause"];
		_tweenInputs["relative"].value = presets["relative"];
    }


	/*
		HELPERS
	*/

	function testNumber( text )
	{
		text = text.split(",").join(".");
		if ( Number( text ) != text )
		{
			alert("Namide say: You can use only numbers in the texts inputs!");
			text = 0;
		}
		return text;
	}

    function trace(s)
    {
		//alert(s);
		//$.writeln(s); // writes to the ExtendScript interface
		writeLn(s); // writes in the AE info window
    }

    init(this);
}
