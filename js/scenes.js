/**
 * @author Senevri
 */
$(document).ready(function () {
	"use strict";
	var Scenes = []
	var sceneIndex = 0;
	
	var limitRuntime = function (self, callback) {
				
			var index = Game._heartbeat_queue.length;
			Game._heartbeat_queue.push(function () {
			var _now = new Date().getTime();  
			if (_now - self.startTime > 1000*self.runtime) {			
				self.End();
				sceneIndex++;
				if (Scenes.length > sceneIndex) {
					Scenes[sceneIndex].Play();
				}
				delete (Game._heartbeat_queue[index]);
				if (undefined !== callback) {
					callback();					
				}
			}
		});
	}
	
	var Scenedata = [
		    {
	    	    name: "first",
	            type: "html",
	            htmlcontent: "Test Scene 1",
	            runtime: 4,                 
	            Execute: limitRuntime             
	        },	
	        {   
	        	name: "second",     	
	            type: "html",
	            runtime: 1,
	            htmlcontent: "Second scene of testing",                 
	            Execute: limitRuntime
	        },	
	        {  
	        	name: "third",      	
	            type: "html",	            
	            runtime: 3,
	            htmlcontent: "It's the final countdown!",                 
	            Execute: function(self) {
	            	limitRuntime(self, function () {
	            		window.Game.Stop();	            		
	            	});	            	
	            }
	        }	
	];
	
	
	
	
	for(var i in Scenedata) {
		Scenes.push(window.Game.BuildScene(Scenedata[i]));		
	}
	window.Scenes = Scenes;
	//console.log(Scenes[0]);
	//Scenes[0].Play();
	console.log($('#menustyle').html());
	
	window.Game.BuildScene({		
		  name: "StartMenu",
		  type: "html",
		  containerstyle: $('#menustyle').html(),
		  htmlcontent: $('#startmenu').html(),
		  Execute: function(self) {
		  	$('#newgame').click(function () {
		  		alert("new game clicked!");
		  		Scenes[0].Play();
		  		});		
		  } 
		}).Play();
	
	
});