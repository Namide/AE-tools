Adobe After Effects 8.0 Keyframe Data

Transform	Position
Expression Data
// initial position
posInit = [ 960, 512, -30 ];

// time of introduction
t = 2;


/*
	CALCULATIONS
*/
posFinale = transform.position;
pos = [ 0, 0 , 0];
if( time < inPoint + t )
{
	pos[0] = easeOutQuint( time - inPoint, posInit[0], posFinale[0] - posInit[0], t  );
	pos[1] = easeOutQuint( time - inPoint, posInit[1], posFinale[1] - posInit[1], t );	pos[2] = easeOutQuint( time - inPoint, posInit[2], posFinale[2] - posInit[2], t );
	pos;
}
else
{
	posFinale;
}

function easeOutQuint (t, b, c, d)
{
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
}
End of Expression Data

Transform	Rotation
Expression Data
rot = transform.zRotation + (transform.position[0] + transform.position[1] + transform.position[2] ) / 2;
rot;
End of Expression Data


End of Keyframe Data
