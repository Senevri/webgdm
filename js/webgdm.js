/**
 * @author Esa
 */
$(function () {
	"use strict";
	var limitRuntime = window.Scenes.fn.limitRuntime;
	
	var execJobOrTraining = function (self) {
		if (undefined !== self.Custom) {
			self.Custom(self);
		}
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
            htmlcontent: "Working hard at farming... (could play an animation or show an image here)",                 
	     },
	     {   
        	name: "Gambling",     	
            changes: {stress: 2, energy: -2},
            pay: 0,
            htmlcontent: "Working hard at gambling... (could play an animation or show an image here)",
            Custom: function (self) { self.pay = Math.floor(Math.random(20))}                  
	     },
	     
	]
	
	var _Jobs = []
	
	for(var i in Jobs) {
		_Jobs.push(window.Game.BuildScene(Scenes.fn.BuildJob(Jobs[i])));
	}
	window.Scenes.Jobs = _Jobs
// end jobs.js

	var Studies = [
		{ 
			name: "Meditation", 
			changes: {stress: -1, energy: -1, health: +1},
			pay: -5,
			htmlcontent: "Meditating worries away."		
		},
	]
	
	var _Studies = []
	
	for (var i in Studies) {
		_Studies.push(window.Game.BuildScene(Scenes.fn.BuildJob(Studies[i])));		
	}
	window.Scenes.Studies = _Studies;
	
	var ShopItems = [
		{name: "demoknife", price: 10,  stats: {attack: 1, speed: 3, weight: 0.3}},
		{name: "demosword", price: 100, stats: {attack: 3, speed: 5, weight: 0.6}},
	];
		
		
	window.Game.Shop = {};
	window.Game.Shop.Items = ShopItems;
	window.Scenes.Shop = Game.BuildScene({		
		type: "html",
		htmlcontent: $("#ShopTemplate").html(),
		containerstyle: "", 
		containerclass: "shop",
		Execute: function(self) {
			for (var i in window.Game.Shop.Items) {
				self.$container.first("#ShopItems").append(
					["<li id='Item", i ,"'>",  
						ShopItems[i].name, " :", ShopItems[i].price, " GP", "</li>"].join(""));
				self.$container.click(function(){self.End()});
			};	
			
			// which item did we buy? TODO
			self.$container.first("#ShopItems li").click(function(item) {
				
				var index = item.target.id.slice(4);
				var titem = window.Game.Shop.Items[index];				
				console.log(titem);				
				if (titem.price <= window.Game.Parent.wealth) {
					window.Game.Parent.wealth -= titem.price;
					window.Game.Girl.items.push(titem);
					console.log(window.Game.Girl);
					alert(["Bought ", item.target.innerHTML].join(""));		
				} else {
					alert("Could not afford item!")
				}
				
				
			});
		},
		
	});
	
	/*
	window.Scenes.Inventory = Game.BuildScene({
		type: "html",
		htmlcontent: $("#InventoryTemplate").html(),
		containerstyle: "",
		containerclass: "inventory",
		Execute: function(self) {
			for (var i in window.Game.Girl.items) {
				
				
			}
		},
		
	});*/
	
	// Girl here
	window.Game.Girl = {
		stress: 10, 
		power: 10,
		health: 10,
		energy: 10,
		empathy: 10,
		items: [],
	}; 
	
	window.Game.Parent = {
		income: 10,
		wealth: 0,
	}
	
	window.Scenes.Statistics = Game.BuildScene({
		console.log("build statistics");
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
				
				/*var getItemStats = function(itemstats) {
							list = [],
							for (var key in itemstats) {
								list.push([key, ":", itemstats[key]].join(""));
							}
							console.log(list);
							return list.join(" ");
				};*/
						
				var items = Game.Girl.items
				console.log(self);
				console.log(self.$container);
				for (var i in Game.Girl.items) {
					if (undefined != i) {						
						var itemstr = ["<li id='Item", i ,"'>",  
							items[i].name, " ", 
							 "</li>"].join("");
						self.$container.find("#GirlItems").append(itemstr);
							
					}
					
				}

			} 
		});
});
