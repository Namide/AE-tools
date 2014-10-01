
function remap( list )
{
    var d = 0;
    var tTrans = 1;
    var t = 0;
    
    for ( var i = list.length-1; i > -1; i-- )
    {
        var layer = list[i];
        
        
        layer.startTime = t;
        t += layer.outPoint - layer.inPoint;//layer.source.duration;
        t -= tTrans;
        
         //layer.outPoint = t + d;
        //if ( !hasTag( layer, ".unlinked" ) ) d += t;
    }
    
    return d;
}

function startRemmaping()
{
	if ( 	app.project.activeItem == null ||
			app.project.activeItem.selectedLayers == null ||
			app.project.activeItem.selectedLayers.length < 1
		)
	{
		alert('Selects layers in your project Oo\'');
	}
	else
	{
		app.beginUndoGroup("Time delayer");
			var layers = app.project.activeItem.selectedLayers;
			var t = remap( layers );
			//app.project.activeItem.workAreaDuration = t;
			//app.project.activeItem.duration = t + 1;
		app.endUndoGroup();
	
		return t;
	}
    return 0;
}

startRemmaping();
