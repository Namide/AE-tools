Adobe After Effects 8.0 Keyframe Data

Text	Source Text
Expression Data
/*
	PARAMETERS
*/

var timeBegin = 0;
var timeEnd = 0.5;

var valueBegin = 30;
var valueEnd = 1;


/*
	FUNCTIONS
*/

var timeMin = inPoint  + timeBegin;
var timeMax = outPoint - timeEnd; //outPoint - timeEnd;
var textField;
if ( time < timeMin )
{
	textField = valueBegin;
}
else if ( time < outPoint - timeEnd )
{

	textField =  easeOut( time, timeMin, timeMax, valueBegin, valueEnd);
	textField = Math.round( textField );
}
else
{
	textField = valueEnd;
}

textField = "+" + insertCharacter( textField, 3, " " ) + "%";

function insertCharacter( d_value, d_step, d_char )
{
	var a = [];
	a[0] = d_value % 10;
	d_value /= 10;
	while ( d_value > 0  )
	{
		a.push( Math.floor( d_value % 10 ) );
		d_value = Math.floor( d_value / 10 );
	}

	if ( a[a.length-1] == 0 ) a.splice(a.length-1, 1);

	var output = "";
	for( var i = 0; i < a.length; i++ )
	{
		if( i % d_step == 0 && i != 0 ) output = d_char + output;
		output = a[i] + output;
	}
	
	return output;
}
End of Expression Data


End of Keyframe Data
