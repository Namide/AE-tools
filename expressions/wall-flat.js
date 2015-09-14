Adobe After Effects 8.0 Keyframe Data

Transform	Position
Expression Data
var columns = 5;
var pitchX = 1920;
var pitchY = 1080;


// FUNCTIONS

var i = index - 1;

var yI = Math.floor( (i / columns) );
var xI = i - yI * columns;


var x = (xI + 0.5 - columns / 2) * pitchX;
var y = yI * pitchY;

[ transform.position[0] + x, transform.position[1] + y ];



End of Expression Data


End of Keyframe Data
