Adobe After Effects 8.0 Keyframe Data

Transform	Position
Expression Data
/*
	PARAMETERS
*/

var frameDelay = 12;	// Frames between two moves
var amplitude = 20;	// Maximum moves in pixels


/*
	FUNCTIONS
*/

var frame = timeToFrames(t = time + thisComp.displayStartTime, fps = 1.0 / thisComp.frameDuration, isDuration = false);
if( frame % frameDelay == 0 )
{
	var pos = [];
	pos[0] = transform.position[0] + decal(time + 1);
	pos[1] = transform.position[1] + decal(time);
	pos;
}
else
{
	var t = frame - (frame % frameDelay);
	t = framesToTime(t, 1.0 / thisComp.frameDuration);
	var pos = [];
	pos[0] = transform.position.valueAtTime( t )[0] + decal(t + 1);
	pos[1] = transform.position.valueAtTime( t )[1] + decal(t);
	pos;
}

function decal( val )
{
	return amplitude  * 0.5 * Math.cos( val * 2 * Math.PI * Math.E - index ) * Math.sin( val * Math.SQRT2 * index );
}
End of Expression Data

Transform	Rotation
Expression Data
/*
	PARAMETERS
*/

var frameDelay = 12;	// Frames between two moves
var amplitude = 20;	// Maximum rotation in degrees


/*
	FUNCTIONS
*/

var frame = timeToFrames(t = time + thisComp.displayStartTime, fps = 1.0 / thisComp.frameDuration, isDuration = false);
if( frame % frameDelay == 0 )
{
	var rot = transform.rotation + decal(time);
	rot;
}
else
{
	var t = frame - (frame % frameDelay);
	t = framesToTime(t, 1.0 / thisComp.frameDuration);
	var rot = transform.rotation.valueAtTime( t ) + decal(t);
	rot;
}

function decal( val )
{
	return amplitude  * 0.5 * Math.cos( val * 2 * Math.PI * Math.E - index ) * Math.sin( val * Math.SQRT2 * index );
}
End of Expression Data


End of Keyframe Data
