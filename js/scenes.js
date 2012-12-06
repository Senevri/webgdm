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
				/*sceneIndex++;
				if (Scenes.length > sceneIndex) {
					Scenes[sceneIndex].Play();
				}*/
				delete (Game._heartbeat_queue[index]);
				if (undefined !== callback) {
					callback();					
				}
			}
		});
	}
	
	Scenes.fn.limitRuntime = limitRuntime;
	
	/*
	var example_Scenedata = [
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
	*/
	
	
	
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
	
	Scenes.notImplementedYet = window.Game.BuildScene({
		    	name: "third",      	
	            type: "html",	            
	            runtime: 2,
	            htmlcontent: "This feature hasn't been implemented yet", 
	            Execute: limitRuntime
	})
		
	var execJobOrTraining = function (self) {
		for(var i in self.changes) {
			window.Game.Girl[i] += self.changes[i];	
		}
		window.Game.Parent.Wealth += self.pay;
		limitRuntime(self);
	}
	
	Scenes.fn.BuildJob = function (data){
		data.type = 'html';
		data.runtime = 3;
		data.Execute = Scenes.fn.execJobOrTraining;
		data.containerstyle ="";
		data.containerclass = "jobscene";
		return data;
	}
	
	Scenes.fn.execJobOrTraining = execJobOrTraining;
		
	
	
	window.Scenes = Scenes;
	
	
	//jobs.js
	var Jobs = [
	     {   
        	name: "Farming",     	
            changes: {stress: 2, energy: -2},
            pay: 5,
            htmlcontent: "Working hard at farming...",                 
	     },
	]
	
	var _Jobs = []
	
	for(var i in Jobs) {
		_Jobs.push(window.Game.BuildScene(Scenes.fn.BuildJob(Jobs[i])));
	}
	window.Scenes.Jobs = _Jobs
// end jobs.js
	
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