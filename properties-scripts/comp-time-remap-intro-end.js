Adobe After Effects 8.0 Keyframe Data

Time Remap
Expression Data
/*

	Used to change duration of a composition without change his content
	This composition must have 3 parts:
	1. introTimeduction
	2. Fixed image
	3. endTime

*/

var introTime = 5;
var endTime = 5;
var distordTime = true;


/*

	CALCULATIONS

*/
var t = time-inPoint;
var v = 0;
var l = outPoint-inPoint;
var m = source.duration;

if (t<introTime)
	v = t;
else if (time<outPoint-endTime)
{
	minG =  inPoint + introTime;
	maxG = outPoint - endTime;
	minC = introTime;
	maxC = m - endTime;
	if ( distordTime )
		v = (maxC - minC) * (time - minG) / (maxG - minG) + minC;
	else
		v = ((m-(introTime+endTime))/2)+introTime;
}
else
	v = (t+endTime-l)+(m-endTime);

v;
End of Expression Data


End of Keyframe Data
