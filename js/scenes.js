/**
 * @author Senevri
 */
$(document).ready(function () {
	"use strict";
	var Scenes = {}
	Scenes.fn = {}
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
	
	Scenes.fn.limitRuntime = limitRuntime;
	
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
	            containerclass: 'jobscene',
	            htmlcontent: "It's the final countdown!",                 
	            Execute: function(self) {
	            	limitRuntime(self, function () {
	            		window.Game.Stop();	            		
	            	});	            	
	            }
	        }	
	];
	
	
	
	
	/*for(var i in Scenedata) {
		Scenes.push(window.Game.BuildScene(Scenedata[i]));		
	}*/
	
	//console.log(Scenes[0]);
	//Scenes[0].Play();
	console.log($('#menustyle').html());
	
	Scenes.startMenu = window.Game.BuildScene({		
		  name: "StartMenu",
		  type: "html",
		  containerstyle: $('#menustyle').html(),
		  htmlcontent: $('#startmenu').html(),
		  Execute: function(self) {
		  	$('#newgame').click(function () {
		  		//alert("new game clicked!");
		  		//Scenes[0].Play();
		  		self.End();
		  	});		
		  } 
		}).Play();
		
	//Jobs here		
		
	var execJobOrTraining = function (self) {
		for(var i in self.changes) {
			window.Game.Girl[i] += self.changes[i];	
		}
		window.Game.Parent.Wealth += self.pay;
		limitRuntime(self);
	}
	
	Scenes.fn.execJobOrTraining = execJobOrTraining;
		
	var Jobs = [
	     {   
        	name: "Farming",     	
            type: "html",
            runtime:5,
            changes: {stress: 2, energy: -2},
            pay: 5,
            htmlcontent: "Working hard at farming...",                 
            Execute: execJobOrTraining
	     },
	]
	
	Scenes.Jobs = []
	for(var i in Jobs) {
		Scenes.Jobs.push(window.Game.BuildScene(Jobs[i]));
	}
	
	window.Scenes = Scenes;
	
	// Girl here
	window.Game.Girl = {
		stress: 10, 
		power: 10,
		health: 10,
		energy: 10,
		empathy: 10
	}; 
	
	window.Game.Parent = {}
	window.Game.Parent.Income = 10;
	window.Game.Parent.Wealth = 0;
});