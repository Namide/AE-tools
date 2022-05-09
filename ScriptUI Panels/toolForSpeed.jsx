{
  /*
    ________           ______   __________                 ________                 _________
        ___  __/______________  /   ___  ____/_____________    __  ___/_______________________  /
        __  /  _  __ \  __ \_  /    __  /_   _  __ \_  ___/    _____ \___  __ \  _ \  _ \  __  /
        _  /   / /_/ / /_/ /  /     _  __/   / /_/ /  /        ____/ /__  /_/ /  __/  __/ /_/ /
        /_/    \____/\____//_/      /_/      \____//_/         /____/ _  .___/\___/\___/\__,_/
                                                                      /_/
        by Greg & Namide !
        version: 1.4.0
  */

  // JSON polyfill
  "object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

  /*
    GENERAL PROPERTIES
  */

  var _name = "TFS 1.4.0";

  /*
    TWEENS PROPERTIES
  */

  var _initialPresets = [
    {
      name: "Default",
      property: 0,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [0, 0, 0],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [0, 0, 0],
      pause: true,
      relative: false,
    },
    {
      name: "Opacity",
      property: 5,
      inEasing: 0,
      inTime: 1,
      inType: 2,
      inValues: [0, 0, 0],
      outEasing: 0,
      outTime: 1,
      outType: 2,
      outValues: [0, 0, 0],
      pause: true,
      relative: false,
    },
    {
      name: "Position3D - to back",
      property: 2,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [0, 0, -500],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [0, 0, 500],
      pause: true,
      relative: true,
    },
    {
      name: "RotationX - flap",
      property: 8,
      inEasing: 10,
      inTime: 1.7,
      inType: 1,
      inValues: [90, 0, 0],
      outEasing: 0,
      outTime: 0,
      outType: 0,
      outValues: [0, 0, 0],
      pause: true,
      relative: false,
    },
    {
      name: "Position2D - to right",
      property: 2,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [-1920, 0, 0],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [1920, 0, 0],
      pause: true,
      relative: true,
    },
    {
      name: "Position2D - to left",
      property: 2,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [1920, 0, 0],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [-1920, 0, 0],
      pause: true,
      relative: true,
    },
    {
      name: "Position2D - to bottom",
      property: 2,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [0, -1080, 0],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [0, 1080, 0],
      pause: true,
      relative: true,
    },
    {
      name: "Position2D - to top",
      property: 2,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [0, 1080, 0],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [0, -1080, 0],
      pause: true,
      relative: true,
    },
    {
      name: "Orientation - Site",
      property: 7,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [90, -85, 10],
      outEasing: 6,
      outTime: 0,
      outType: 0,
      outValues: [0, 0, 0],
      pause: true,
      relative: false,
    },
    {
      name: "Position - Site",
      property: 2,
      inEasing: 6,
      inTime: 1,
      inType: 1,
      inValues: [0, 0, -2000],
      outEasing: 6,
      outTime: 0.7,
      outType: 0,
      outValues: [0, 1500, 0],
      pause: true,
      relative: true,
    },
    {
      name: "Fade Audio",
      property: 0,
      inEasing: 6,
      inTime: 3,
      inType: 1,
      inValues: [-99, -99, 0],
      outEasing: 6,
      outTime: 3,
      outType: 0,
      outValues: [-99, -99, 0],
      pause: true,
      relative: false,
    },
    {
      name: "Scale - Jelly",
      property: 3,
      inEasing: 10,
      inTime: 1,
      inType: 1,
      inValues: [85, 0, 0],
      outEasing: 6,
      outTime: 0.5,
      outType: 0,
      outValues: [0, 0, 0],
      pause: true,
      relative: false,
    },
    {
      name: "Scale - Cushion",
      property: 3,
      inEasing: 11,
      inTime: 1,
      inType: 1,
      inValues: [0, 0, 0],
      outEasing: 6,
      outTime: 1,
      outType: 0,
      outValues: [0, 0, 0],
      pause: true,
      relative: false,
    },
  ];

  var _tweenPropertiesArray = [
    "Selected layer",
    "-",
    "Position",
    "Scale",
    "Rotation",
    "Opacity",
    "-",
    "Orientation",
    "Rotation X",
    "Rotation Y",
    "Rotation Z",
  ];
  var _tweenEasingArray = [
    "None",
    "Quad",
    "Cubic",
    "Quart",
    "Quint",
    "Sine",
    "Expo",
    "Circ",
    "-",
    "Bounce",
    "Elastic",
    "Cushion",
    "Back",
  ];
  var _tweenTypeArray = ["In", "Out", "InOut", "OutIn"];

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

  function init(thisObj) {
    _mainWindow =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", _name, undefined, { resizeable: true });
    _mainWindow.margins = 2;
    _mainWindow.alignChildren = "center";

    try {
      var file = getAbsolutePath("toolForSpeed_logo.png");
      _mainWindow.add("image", undefined, file);
    } catch (e) {
      _mainWindow.add("statictext", [0, 50, 100, 70], "TOOL FOR SPEED");
    }

    var tabPanel = _mainWindow.add("tabbedpanel", undefined, "");
    tabPanel.margins = 0;
    var tweenGroup = tabPanel.add("tab", undefined, "Tweens");
    // tab = tabPanel.add("tab", undefined, "Properties").enabled = false;

    tweenInit(tweenGroup);

    _mainWindow.layout.layout(true);
    _mainWindow.layout.resize();
    _mainWindow.onResizing = _mainWindow.onResize = function () {
      this.layout.resize();
    };

    if (_mainWindow instanceof Window) {
      _mainWindow.show();
    } else {
      _mainWindow.layout.layout(true);
    }
  }

  /*
    TWEENS METHODS
  */

  function tweenInit(tweenGroup) {
    var group, list, panel, button; //, text;

    tweenGroup.orientation = "column";

    panel = tweenGroup.add("group");
    panel.margins = [0, 5, 0, 5];
    panel.alignChildren = "left";
    panel.orientation = "column";

    group = panel.add("group");
    group.add("statictext", undefined, "Presets:");
    group.spacing = 0;

    var presets = getPresets();
    var presetsNames = [];
    for (var i = 0; i < presets.length; i++) {
      presetsNames.push(presets[i].name);
    }
    _tweenInputs["preset"] = group.add("dropdownlist", undefined, presetsNames);
    _tweenInputs["preset"].selection = 0;
    _tweenInputs["preset"].onChange = tweenChangePreset;

    var btnSave = group.add(
      "iconbutton",
      undefined,
      getAbsolutePath("save.png"),
      {
        name: "iconbutton1",
        style: "toolbutton",
      }
    );
    btnSave.onClick = savePreset;
    btnSave.helpTip = "Save";

    var btnDelete = group.add(
      "iconbutton",
      undefined,
      getAbsolutePath("delete.png"),
      {
        name: "iconbutton1",
        style: "toolbutton",
      }
    );
    btnDelete.onClick = deletePreset;
    btnDelete.helpTip = "Delete";

    var btnEdit = group.add(
      "iconbutton",
      undefined,
      getAbsolutePath("edit.png"),
      {
        name: "iconbutton1",
        style: "toolbutton",
      }
    );
    btnEdit.onClick = editPresets;
    btnEdit.helpTip = "Edit";

    group = panel.add("group");
    group.add("statictext", undefined, "Properties:");
    _tweenInputs["property"] = group.add(
      "dropdownlist",
      undefined,
      _tweenPropertiesArray
    );
    _tweenInputs["property"].selection = 0;
    _tweenInputs["property"].onChange = tweenChangeProperty;

    // Options
    var options = tweenGroup.add("tabbedpanel", undefined, "");
    options.padding = 10;
    // options.margins = 10;

    panel = options.add("tab", undefined, "<< In");

    panel.alignChildren = "left";

    group = panel.add("group");
    group.add("statictext", undefined, "Easing:");
    _tweenInputs["inEasing"] = group.add(
      "dropdownlist",
      undefined,
      _tweenEasingArray
    );
    _tweenInputs["inEasing"].selection = 6;
    _tweenInputs["inType"] = group.add(
      "dropdownlist",
      undefined,
      _tweenTypeArray
    );
    _tweenInputs["inType"].selection = 1;

    group = panel.add("group");
    group.add("statictext", undefined, "Value(s):");
    _tweenInputs["inValues"] = [];
    _tweenInputs["inValues"][0] = group.add("edittext", [0, 0, 40, 19], 0);
    _tweenInputs["inValues"][1] = group.add("edittext", [0, 0, 40, 19], 0);
    _tweenInputs["inValues"][2] = group.add("edittext", [0, 0, 40, 19], 0);

    group = panel.add("group");
    group.add("statictext", undefined, "Time:");
    _tweenInputs["inTime"] = group.add("edittext", [0, 0, 40, 19], 1);
    group.add("statictext", undefined, "seconds");

    panel = options.add("tab", undefined, "Out >>");
    panel.alignChildren = "left";

    group = panel.add("group");
    group.add("statictext", undefined, "Easing:");
    _tweenInputs["outEasing"] = group.add(
      "dropdownlist",
      undefined,
      _tweenEasingArray
    );
    _tweenInputs["outEasing"].selection = 6;
    _tweenInputs["outType"] = group.add(
      "dropdownlist",
      undefined,
      _tweenTypeArray
    );
    _tweenInputs["outType"].selection = 0;

    group = panel.add("group");
    group.add("statictext", undefined, "Value(s):");
    _tweenInputs["outValues"] = [];
    _tweenInputs["outValues"][0] = group.add("edittext", [0, 0, 40, 19], 0);
    _tweenInputs["outValues"][1] = group.add("edittext", [0, 0, 40, 19], 0);
    _tweenInputs["outValues"][2] = group.add("edittext", [0, 0, 40, 19], 0);

    group = panel.add("group");
    group.add("statictext", undefined, "Time:");
    _tweenInputs["outTime"] = group.add("edittext", [0, 0, 40, 19], 1);
    group.add("statictext", undefined, "seconds");

    panel = options.add("tab", undefined, "Advanced");

    group = panel.add("group");

    _tweenInputs["relative"] = group.add(
      "checkbox",
      undefined,
      "Relative mode"
    );
    _tweenInputs["pause"] = group.add("checkbox", undefined, "Pause enable");
    _tweenInputs["pause"].value = true;

    (group = tweenGroup.add("group")),
      (button = group.add(
        "iconbutton",
        undefined,
        getAbsolutePath("apply.png"),
        {
          name: "iconbutton1",
          style: "toolbutton",
        }
      ));
    button.onClick = tweenGenerate;
  }

  function tweenGenerate() {
    var depth = [];
    var properties = [];

    if (_tweenInputs["property"].selection.index == 0) {
      if (app.project.activeItem.selectedProperties.length < 1)
        return alert(
          'Namide say: If you use "Selected layer" in "Property" you must to select 1 or more properties (=^‥^=)'
        );

      for (i = 0; i < app.project.activeItem.selectedProperties.length; i++) {
        properties[i] = app.project.activeItem.selectedProperties[i];

        //app.project.activeItem.selectedLayers[i].motionBlur = false;
        //app.project.activeItem.selectedLayers[i].adjustmentLayer = false;
        //app.project.activeItem.selectedLayers[i].threeDLayer = true;
      }
    } else {
      if (app.project.activeItem.selectedLayers.length < 1)
        return alert(
          'Greg say: If you use "' +
            _tweenInputs["property"].selection.text +
            '" in "Property" you must to select 1 or more layers (⁎˃ᆺ˂)'
        );

      for (i = 0; i < app.project.activeItem.selectedLayers.length; i++) {
        properties[i] =
          app.project.activeItem.selectedLayers[i].transform[
            _tweenInputs["property"].selection.text
          ];
        if (
          _tweenInputs["property"].selection.text == "Orientation" ||
          _tweenInputs["property"].selection.text == "Rotation X" ||
          _tweenInputs["property"].selection.text == "Rotation Y" ||
          _tweenInputs["property"].selection.text == "Rotation Z"
        ) {
          app.project.activeItem.selectedLayers[i].threeDLayer = true;
        }
      }
    }

    var easeInPoint = "ease";
    if (_tweenInputs["inEasing"].selection.text == "None")
      easeInPoint += "None";
    else
      easeInPoint +=
        _tweenInputs["inType"].selection.text +
        _tweenInputs["inEasing"].selection.text;

    var easeOutPoint = "ease";
    if (_tweenInputs["outEasing"].selection.text == "None")
      easeOutPoint += "None";
    else
      easeOutPoint +=
        _tweenInputs["outType"].selection.text +
        _tweenInputs["outEasing"].selection.text;

    _tweenInputs["inTime"].text = testNumber(_tweenInputs["inTime"].text);
    _tweenInputs["inValues"][0].text = testNumber(
      _tweenInputs["inValues"][0].text
    );
    _tweenInputs["inValues"][1].text = testNumber(
      _tweenInputs["inValues"][1].text
    );
    _tweenInputs["inValues"][2].text = testNumber(
      _tweenInputs["inValues"][2].text
    );
    _tweenInputs["outTime"].text = testNumber(_tweenInputs["outTime"].text);
    _tweenInputs["outValues"][0].text = testNumber(
      _tweenInputs["outValues"][0].text
    );
    _tweenInputs["outValues"][1].text = testNumber(
      _tweenInputs["outValues"][1].text
    );
    _tweenInputs["outValues"][2].text = testNumber(
      _tweenInputs["outValues"][2].text
    );

    var script = "var introTime = " + _tweenInputs["inTime"].text + ";\n";
    script +=
      "var introDatas = [ " +
      _tweenInputs["inValues"][0].text +
      "," +
      _tweenInputs["inValues"][1].text +
      "," +
      _tweenInputs["inValues"][2].text +
      " ];\n";
    script += "var introTween = " + easeInPoint + ";\n";
    script += "var endTime = " + _tweenInputs["outTime"].text + ";\n";
    script +=
      "var endDatas = [ " +
      _tweenInputs["outValues"][0].text +
      "," +
      _tweenInputs["outValues"][1].text +
      "," +
      _tweenInputs["outValues"][2].text +
      " ];\n";
    script += "var endTween = " + easeOutPoint + ";\n";
    script += "var dontStop = " + !_tweenInputs["pause"].value + ";\n";
    script += "var relative = " + _tweenInputs["relative"].value + ";\n";
    script += "//	CALCULATION\n";
    script +=
      "function easeNone(t,b,c,d){return(c*t)/d+b}function easeInQuad(t,b,c,d){return c*(t/=d)*t+b}function easeOutQuad(t,b,c,d){return-c*(t/=d)*(t-2)+b}function easeInOutQuad(t,b,c,d){if((t/=d/2)<1)return(c/2)*t*t+b;return(-c/2)*(--t*(t-2)-1)+b}function easeInCubic(t,b,c,d){return c*(t/=d)*t*t+b}function easeOutCubic(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b}function easeInOutCubic(t,b,c,d){if((t/=d/2)<1)return(c/2)*t*t*t+b;return(c/2)*((t-=2)*t*t+2)+b}function easeOutInCubic(t,b,c,d){if(t<d/2)return easeOutCubic(t*2,b,c/2,d);return easeInCubic(t*2-d,b+c/2,c/2,d)}function easeInQuart(t,b,c,d){return c*(t/=d)*t*t*t+b}function easeOutQuart(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b}function easeInOutQuart(t,b,c,d){if((t/=d/2)<1)return(c/2)*t*t*t*t+b;return(-c/2)*((t-=2)*t*t*t-2)+b}function easeOutInQuart(t,b,c,d){if(t<d/2)return easeOutQuart(t*2,b,c/2,d);return easeInQuart(t*2-d,b+c/2,c/2,d)}function easeInQuint(t,b,c,d){return c*(t/=d)*t*t*t*t+b}function easeOutQuint(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b}function easeInOutQuint(t,b,c,d){if((t/=d/2)<1)return(c/2)*t*t*t*t*t+b;return(c/2)*((t-=2)*t*t*t*t+2)+b}function easeOutInQuint(t,b,c,d){if(t<d/2)return easeOutQuint(t*2,b,c/2,d);return easeInQuint(t*2-d,b+c/2,c/2,d)}function easeInSine(t,b,c,d){return-c*Math.cos((t/d)*(Math.PI/2))+c+b}function easeOutSine(t,b,c,d){return c*Math.sin((t/d)*(Math.PI/2))+b}function easeInOutSine(t,b,c,d){return(-c/2)*(Math.cos((Math.PI*t)/d)-1)+b}function easeOutInSine(t,b,c,d){if(t<d/2)return easeOutSine(t*2,b,c/2,d);return easeInSine(t*2-d,b+c/2,c/2,d)}function easeInExpo(t,b,c,d){return t==0?b:c*Math.pow(2,10*(t/d-1))+b-c*0.001}function easeOutExpo(t,b,c,d){return t==d?b+c:c*1.001*(-Math.pow(2,(-10*t)/d)+1)+b}function easeInOutExpo(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return(c/2)*Math.pow(2,10*(t-1))+b-c*0.0005;return(c/2)*1.0005*(-Math.pow(2,-10*--t)+2)+b}function easeOutInExpo(t,b,c,d){if(t<d/2)return easeOutExpo(t*2,b,c/2,d);return easeInExpo(t*2-d,b+c/2,c/2,d)}function easeInCirc(t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b}function easeOutCirc(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b}function easeInOutCirc(t,b,c,d){if((t/=d/2)<1)return(-c/2)*(Math.sqrt(1-t*t)-1)+b;return(c/2)*(Math.sqrt(1-(t-=2)*t)+1)+b}function easeOutInCirc(t,b,c,d){if(t<d/2)return easeOutCirc(t*2,b,c/2,d);return easeInCirc(t*2-d,b+c/2,c/2,d)}function easeInElastic(t,b,c,d,a,p){var s;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*0.3;if(!a||a<Math.abs(c)){a=c;s=p/4}else s=(p/(2*Math.PI))*Math.asin(c/a);return(-(a*Math.pow(2,10*(t-=1))*Math.sin(((t*d-s)*(2*Math.PI))/p))+b)}function easeOutElastic(t,b,c,d,a,p){var s;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*0.3;if(!a||a<Math.abs(c)){a=c;s=p/4}else s=(p/(2*Math.PI))*Math.asin(c/a);return(a*Math.pow(2,-10*t)*Math.sin(((t*d-s)*(2*Math.PI))/p)+c+b)}function easeInOutElastic(t,b,c,d,a,p){var s;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(0.3*1.5);if(!a||a<Math.abs(c)){a=c;s=p/4}else s=(p/(2*Math.PI))*Math.asin(c/a);if(t<1)return(-0.5*(a*Math.pow(2,10*(t-=1))*Math.sin(((t*d-s)*(2*Math.PI))/p))+b);return(a*Math.pow(2,-10*(t-=1))*Math.sin(((t*d-s)*(2*Math.PI))/p)*0.5+c+b)}function easeOutInElastic(t,b,c,d,a,p){if(t<d/2)return easeOutElastic(t*2,b,c/2,d,a,p);return easeInElastic(t*2-d,b+c/2,c/2,d,a,p)}function easeInCushion(t,b,c,d,a,p){var s;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*0.7;if(!a||a<Math.abs(c)){a=c;s=p/4}else s=(p/(2*Math.PI))*Math.asin(c/a);return(-(a*Math.pow(2,10*(t-=1))*Math.sin(((t*d-s)*(2*Math.PI))/p))+b)}function easeOutCushion(t,b,c,d,a,p){var s;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*0.7;if(!a||a<Math.abs(c)){a=c;s=p/4}else s=(p/(2*Math.PI))*Math.asin(c/a);return(a*Math.pow(2,-10*t)*Math.sin(((t*d-s)*(2*Math.PI))/p)+c+b)}function easeInOutCushion(t,b,c,d,a,p){var s;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(0.7*1.5);if(!a||a<Math.abs(c)){a=c;s=p/4}else s=(p/(2*Math.PI))*Math.asin(c/a);if(t<1)return(-0.5*(a*Math.pow(2,10*(t-=1))*Math.sin(((t*d-s)*(2*Math.PI))/p))+b);return(a*Math.pow(2,-10*(t-=1))*Math.sin(((t*d-s)*(2*Math.PI))/p)*0.5+c+b)}function easeInBack(t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b}function easeOutBack(t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b}function easeInOutBack(t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return(c/2)*(t*t*(((s*=1.525)+1)*t-s))+b;return(c/2)*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b}function easeOutInBack(t,b,c,d,s){if(t<d/2)return easeOutBack(t*2,b,c/2,d,s);return easeInBack(t*2-d,b+c/2,c/2,d,s)}function easeInBounce(t,b,c,d){return c-easeOutBounce(d-t,0,c,d)+b}function easeOutBounce(t,b,c,d){if((t/=d)<1/2.75){return c*(7.5625*t*t)+b}else if(t<2/2.75){return c*(7.5625*(t-=1.5/2.75)*t+0.75)+b}else if(t<2.5/2.75){return c*(7.5625*(t-=2.25/2.75)*t+0.9375)+b}else{return c*(7.5625*(t-=2.625/2.75)*t+0.984375)+b}}function easeInOutBounce(t,b,c,d){if(t<d/2)return easeInBounce(t*2,0,c,d)*0.5+b;else return easeOutBounce(t*2-d,0,c,d)*0.5+c*0.5+b}function easeOutInBounce(t,b,c,d){if(t<d/2)return easeOutBounce(t*2,b,c/2,d);return easeInBounce(t*2-d,b+c/2,c/2,d)}var newDatas=[];var depth=Number(thisProperty.value)!=thisProperty.value?thisProperty.value.length:1;var datas=depth<2?new Array(thisProperty):thisProperty.value;var i;if(dontStop){var totalTime=outPoint-inPoint;var ratio=introTime/(introTime+endTime);introTime=totalTime*ratio;endTime=totalTime*(1-ratio)}if(relative){for(i=0;i<depth;i++){introDatas[i]+=datas[i];endDatas[i]+=datas[i]}}if(time<inPoint){for(i=0;i<depth;i++)newDatas[i]=introDatas[i]}else if(time<inPoint+introTime){for(i=0;i<depth;i++)newDatas[i]=introTween(time-inPoint,introDatas[i],datas[i]-introDatas[i],introTime);}else if(time>outPoint){for(i=0;i<depth;i++)newDatas[i]=endDatas[i]}else if(time>outPoint-endTime){for(i=0;i<depth;i++)newDatas[i]=endTween(time+endTime-outPoint,datas[i],endDatas[i]-datas[i],endTime);}else{for(i=0;i<depth;i++)newDatas[i]=datas[i]}if(depth<2)value=newDatas[0];else value=newDatas;";

    app.beginUndoGroup("TFS - apply tween");
    for (i = 0; i < properties.length; i++) {
      depth[i] = properties[i].propertyDepth;
      properties[i].expressionEnabled = true;
      properties[i].expression = script;
    }
    app.endUndoGroup();
  }

  function tweenChangeProperty() {
    var id = this.selection.index;
    var name = this.selection.text;

    var numValues = 3;

    if (name == "Rotation") numValues = 1;
    if (name == "Opacity") numValues = 1;
    if (name == "RotationX") numValues = 1;
    if (name == "RotationY") numValues = 1;
    if (name == "RotationZ") numValues = 1;

    if (name == "Position") _tweenInputs["relative"].value = true;
    if (name == "Scale") _tweenInputs["relative"].value = false;
    if (name == "Rotation") _tweenInputs["relative"].value = true;
    if (name == "Opacity") _tweenInputs["relative"].value = false;
    if (name == "RotationX") _tweenInputs["relative"].value = true;
    if (name == "RotationY") _tweenInputs["relative"].value = true;
    if (name == "RotationZ") _tweenInputs["relative"].value = true;

    if (numValues > 1) {
      _tweenInputs["inValues"][1].enabled = true;
      _tweenInputs["outValues"][1].enabled = true;
    } else {
      _tweenInputs["inValues"][1].enabled = false;
      _tweenInputs["outValues"][1].enabled = false;
    }

    if (numValues > 2) {
      _tweenInputs["inValues"][2].enabled = true;
      _tweenInputs["outValues"][2].enabled = true;
    } else {
      _tweenInputs["inValues"][2].enabled = false;
      _tweenInputs["outValues"][2].enabled = false;
    }
  }

  function tweenChangePreset() {
    var id = this.selection.index;

    var presets = getPresets();
    var preset = presets[id];

    _tweenInputs["property"].selection = preset["property"];

    _tweenInputs["inEasing"].selection = preset["inEasing"];
    _tweenInputs["inTime"].text = preset["inTime"];
    _tweenInputs["inType"].text = preset["inType"];
    _tweenInputs["inValues"][0].text = preset["inValues"][0];
    _tweenInputs["inValues"][1].text = preset["inValues"][1];
    _tweenInputs["inValues"][2].text = preset["inValues"][2];

    _tweenInputs["outEasing"].selection = preset["outEasing"];
    _tweenInputs["outTime"].text = preset["outTime"];
    _tweenInputs["outType"].selection = preset["outType"];
    _tweenInputs["outValues"][0].text = preset["outValues"][0];
    _tweenInputs["outValues"][1].text = preset["outValues"][1];
    _tweenInputs["outValues"][2].text = preset["outValues"][2];

    _tweenInputs["pause"].value = preset["pause"];
    _tweenInputs["relative"].value = preset["relative"];
  }

  function displayText(text, callback) {
    var pal = new Window("dialog", "Settings", undefined, { resizeable: true });

    pal.margins = [10, 10, 10, 10];

    var group = pal.add("group");
    group.orientation = "row";
    group.alignment = ["top", "right"];

    var button = group.add("iconbutton", undefined, undefined, {
      style: "toolbutton",
    });
    button.text = "Reset Presets";
    button.onClick = function () {
      const presets = _initialPresets;
      savePresets(presets);
      updatePresetDropdown(presets, 0);
      pal.close();
    };

    var input = pal.add("edittext", [0, 0, 500, 500], text, {
      multiline: true,
    });
    input.alignment = ["fill", "fill"];

    group = pal.add("group");
    group.orientation = "row";
    group.alignment = ["center", "bottom"];

    button = group.add("iconbutton", undefined, undefined, {
      style: "toolbutton",
    });
    button.text = "Save";
    button.onClick = function () {
      if (callback(input.text)) {
        pal.close();
      }
    };

    pal.layout.layout(true);
    pal.layout.resize();
    pal.onResizing = pal.onResize = function () {
      this.layout.resize();
    };
    pal.center();
    pal.show();
  }

  function savePreset() {
    var name = prompt(
      "Name of your preset",
      "Custom preset " + Math.floor(Math.random() * 1000)
    );

    if (!name) {
      return;
    }

    var preset = {
      name: String(name),
      property: _tweenInputs["property"].selection.index,
      inEasing: _tweenInputs["inEasing"].selection.index,
      inTime: Number(testNumber(_tweenInputs["inTime"].text)),
      inType: _tweenInputs["inType"].selection.index,
      inValues: [
        Number(testNumber(_tweenInputs["inValues"][0].text)),
        Number(testNumber(_tweenInputs["inValues"][1].text)),
        Number(testNumber(_tweenInputs["inValues"][2].text)),
      ],
      outEasing: _tweenInputs["outEasing"].selection.index,
      outTime: Number(testNumber(_tweenInputs["outTime"].text)),
      outType: _tweenInputs["outType"].selection.index,
      outValues: [
        Number(testNumber(_tweenInputs["outValues"][0].text)),
        Number(testNumber(_tweenInputs["outValues"][1].text)),
        Number(testNumber(_tweenInputs["outValues"][2].text)),
      ],
      pause: Boolean(_tweenInputs["pause"].value),
      relative: Boolean(_tweenInputs["relative"].value),
    };

    var presets = getPresets();
    presets.push(preset);
    updatePresetDropdown(presets, presets.length - 1);
    savePresets(presets);
  }

  function editPresets() {
    var presets = getPresets();
    displayText(
      JSON.stringify(presets, undefined, 2),
      function (newPresetsString) {
        try {
          var presets = JSON.parse(newPresetsString);
          savePresets(presets);
          updatePresetDropdown(presets, 0);
          return true;
        } catch (error) {
          alert(
            "Greg & Namide say: Your settings are not in good JSON format! ʕ•́ᴥ•̀ʔっ♡ "
          );
          return false;
        }
      }
    );
  }

  function updatePresetDropdown(presets, selectedIndex) {
    _tweenInputs["preset"].removeAll();
    for (var i = 0; i < presets.length; i++) {
      _tweenInputs["preset"].add("item", presets[i].name);
    }
    _tweenInputs["preset"].selection = selectedIndex;
  }

  function deletePreset() {
    var index = -1;
    var presets = getPresets();
    for (var i = 0; i < presets.length; i++) {
      var preset = presets[i];
      if (
        String(_tweenInputs["preset"].selection.text) == String(preset.name)
      ) {
        index = i;
      }
    }

    if (index < 0) {
      return;
    }
    presets.splice(index, 1);
    updatePresetDropdown(presets, 0);
    savePresets(presets);
  }

  function savePresets(presets) {
    const TFS_SETTINGS_NAME = "Tool for Speed";
    const TFS_TWEENS_PRESETS_NAME = "Tweens - presets";

    app.settings.saveSetting(
      TFS_SETTINGS_NAME,
      TFS_TWEENS_PRESETS_NAME,
      JSON.stringify(presets)
    );
  }

  function getPresets() {
    const TFS_SETTINGS_NAME = "Tool for Speed";
    const TFS_TWEENS_PRESETS_NAME = "Tweens - presets";

    if (app.settings.haveSetting(TFS_SETTINGS_NAME, TFS_TWEENS_PRESETS_NAME)) {
      return JSON.parse(
        app.settings.getSetting(TFS_SETTINGS_NAME, TFS_TWEENS_PRESETS_NAME)
      );
    }

    const settings = _initialPresets;
    savePresets(settings);
    return settings;
  }

  /*
    HELPERS
  */

  function getAbsolutePath(file) {
    var tfs = new File($.fileName);
    var dirTfs = tfs.parent.absoluteURI + "/toolForSpeed/";
    return dirTfs + file;
  }

  function testNumber(text) {
    text = text.split(",").join(".");
    if (Number(text) != text) {
      alert("Namide say: You can use only numbers in the texts inputs!");
      text = 0;
    }
    return text;
  }

  function trace(s) {
    alert(s);
    // $.writeln(s); // writes to the ExtendScript interface
    //writeLn(s); // writes in the AE info window
  }

  init(this);
}
