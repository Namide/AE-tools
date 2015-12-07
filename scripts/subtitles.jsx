/*
	SRT subtitle import for AE CS5
	By August Bering
	Modified by Namide (Damien Doussaud)
	
	Usage: 
	Create a text layer in AE and select that layer. 
	Select File -> Script -> Run script... from the menu and run this script.
	In the dialog, select a .SRT subtitle file to import.
 */

function makeSubs()
{
	function getframe(timeInString, subNum)
	{
		try {
			var t = timeInString.split(":");
			var timeS = parseInt(t) * 3600 + parseInt( t[1] ) * 60 + parseFloat( t[2].replace(",", ".") );
			var frame = timeS * 25;
		}
		catch(e)
		{
			alert("Error in the time parsing of the SRT : " + timeInString + " (" + subNum + "subtitle ) (⁎˃ᆺ˂)");
		}
		
		return timeS;
	}
	
	var pb = progressBar("Creating keyframes", );
						 
	if ( app.project.activeItem.selectedLayers.length < 1 )
	{
		alert("You must to select a text layer (=^‥^=)");
		return;
	}
						 
	var layer = app.project.activeItem.selectedLayers[0];
	
	if (layer.property("sourceText") != null)
	{
		var textFile = File.openDialog("Select a text file to open.", "SRT subtitles:*.srt");
		if (textFile != null)
		{
			var textLines = new Array();
			textFile.open("r", "TEXT", "????");
			
			var sourceText = layer.property("sourceText");
			var subnr = 0;
			var nrSubs = 0;
			while (!textFile.eof)
			{
				if ("" == textFile.readln())
				nrSubs++;
			}
			textFile.seek(0);
			
			//begin with empty text
			sourceText.setValueAtTime(0, "");
			while (!textFile.eof)
			{
				pb.setValue(subnr / nrSubs);
				
				pb.p.update();
				if (pb.isCanceled ())
				{
					//for some reason this doesn't work at all, the window is unresponsive...
					pb.close();
					return;
				}
				
				subnr++;
				var line = textFile.readln();
				line = textFile.readln();
				var times = line.split('-->');
				var starttime = getframe(times[0], subnr);
				var stoptime = getframe(times[1], subnr);
				
				var text = "";
				while ((line = textFile.readln()) != "") {
					text += line+"\r\n";
				}
				sourceText.setValueAtTime(starttime, text);
				sourceText.setValueAtTime(stoptime, "");
			}
			
			textFile.close();
			pb.close();
		}
	}
}

function progressBar(title1)
{
	var result = new Object();
	result.running = true;
	result.p = new Window("palette");
	result.p.orientation = "column";
	result.p.alignChildren = "left";
	
	result.t1 = result.p.add("statictext",undefined,title1);
	result.b = result.p.add("progressbar");
	
	result.c = result.p.add("button",undefined,"Cancel");
	result.c.onClick = function()
	{
		this.running = false;
	}
	
	result.isRunning = function() { return this.running; }
	result.isCanceled = function() { return !this.isRunning(); }
	result.setValue = function(x) { this.b.value = x * 100; }
	result.setTitle1 = function(t1) { this.t1.text = t1; }
	result.close = function() { this.p.close(); }
	
	result.p.show();
	return result;
} 
makeSubs();