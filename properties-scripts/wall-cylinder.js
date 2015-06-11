Adobe After Effects 8.0 Keyframe Data

	Units Per Second	25
	Source Width	1600
	Source Height	1200
	Source Pixel Aspect Ratio	1
	Comp Pixel Aspect Ratio	1

Transform	Y Rotation
	Frame	degrees	
		0	

Expression Data
var columns = 5;
var pitchX = 1600;
var pitchY = 1200;
var diam = columns * pitchX * 3;


// FUNCTIONS

var i = index - 1;

var yI = Math.floor( (i / columns) );
var xI = i - yI * columns;

var per = Math.PI * diam;
var angMax = (pitchX * (columns-1)) / per;
var ang = 2 * Math.PI * ( xI / (columns-1) ) * angMax - angMax * Math.PI;


transform.yRotation + ang * 180 / Math.PI;

End of Expression Data

Transform	Position
	Frame	X pixels	Y pixels	Z pixels	
		0	0	0	

Expression Data
var columns = 5;
var pitchX = 1600;
var pitchY = 1200;
var diam = columns * pitchX * 3;


// FUNCTIONS

var i = index - 1;

var yI = Math.floor( (i / columns) );
var xI = i - yI * columns;

var per = Math.PI * diam;
var angMax = (pitchX * (columns-1)) / per;
var ang = angMax * Math.PI - 2 * Math.PI * ( xI / (columns-1) ) * angMax + Math.PI / 2;

var x = diam * 0.5 * Math.cos( ang );
var y = yI * pitchY;
var z = diam * 0.5 * Math.sin( ang );

[ transform.position[0] + x, transform.position[1] + y, transform.position[2] + z - diam * 0.5 ];


End of Expression Data


End of Keyframe Data