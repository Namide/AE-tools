Adobe After Effects 8.0 Keyframe Data

Time Remap
Expression Data
var vel = 4;
var begin = secFrames( 1, 06 );
var end = secFrames( 3, 06 );


// CALCULATIONS

var t = (time - inPoint) * vel;
if ( t > end ) {
	t =  begin + (t - begin) % (end - begin);
}
t;

function secFrames( sec, frames ) {
	return sec + framesToTime(frames, fps = 1.0 / thisComp.frameDuration);
}

End of Expression Data


End of Keyframe Data
