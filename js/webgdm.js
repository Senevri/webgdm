/**
 * @author Esa
 */

$(function () {
	var limitRuntime = window.Scenes.fn.limitRuntime;
	
	var execJobOrTraining = function (self) {
		for(var i in self.changes) {
			window.Game.Girl[i] += self.changes[i];	
		}
		window.Game.Parent.wealth += self.pay;
		limitRuntime(self);
	}
	
	Scenes.fn.execJobOrTraining = execJobOrTraining;
	
	Scenes.fn.BuildJob = function (data){
		data.type = 'html';
		data.runtime = 3;
		data.Execute = Scenes.fn.execJobOrTraining;
		data.containerstyle ="";
		data.containerclass = "jobscene";
		return data;
	}
	
	
		
	
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
	
	window.Game.Parent = {
		income: 10,
		wealth: 0
	}
	
	window.Scenes.Statistics = Game.BuildScene({
			type: "html",
			htmlcontent: $("#StatsTemplate").html(),
			containerstyle: "",
			containerclass: "statistics",
			Execute: function (self) {
				self.$container.click(function(){self.End()});
				for (var i in Game.Girl) {
					if (undefined != i) {
						self.$container.html(
							self.$container.html().replace('{' + i +'}', Game.Girl[i])
						);
					}
				}
				for (var i in Game.Parent) {
					if (undefined != i) {
						self.$container.html(
							self.$container.html().replace('{' + i +'}', Game.Parent[i])
						);
					}
				}
			} 
		});
})
