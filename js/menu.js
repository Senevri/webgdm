/**
 * @author Esa
 */
$(function () {
	
	var generateSceneList = function(scenesource) {
		var selector = window.Game.BuildScene({
			name: "",
			type: "html",	
			containerstyle: "",		
			containerclass: 'joblist'
		});
		
		selector.htmlcontent = "<ul>"
			
		for(var i in scenesource) {
			//console.log(i)
			var name = scenesource[i].name;
			if (undefined != name) {
				//selector.htmlcontent += '<li onClick="window.Scenes.Jobs[' + i + '].Play()">' + name + "</li>";
				selector.htmlcontent += '<li style="cursor:pointer" id="scene' + name +'">' + name + "</li>";				
			}
		}
		selector.htmlcontent += "</ul>"
		return selector;
	}
	
	/* callback */
	var PlayScene = function(i, scenesource) {
		return function() {
			console.log(scenesource[i].name, i);
			scenesource[i].Play();
		}
	}
	
	var activateClickEvents = function (scenesource) {
		for (var i in scenesource) {			
			var name = scenesource[i].name;
			if (undefined != name) {
				//console.log('#scene'+ name);
				$("#scene" + name).click(PlayScene(i, scenesource));
			}
		}
	}
	
	$('#displayJobList').click(function () {
		console.log("displayJobMenu");
		var selector = generateSceneList(window.Scenes.Jobs);
		selector.Play();
		activateClickEvents(window.Scenes.Jobs);
	});
	
	$('#displayTrainingList').click(function () {
		var selector = generateSceneList(window.Scenes.Studies);
		selector.Play();
		activateClickEvents(window.Scenes.Studies);
		//window.Scenes.notImplementedYet.Play();
	});
	
	$('#displayShop').click(function () {
		/*var selector = generateSceneList(window.Scenes.Shop);
		selector.Play();
		activateClickEvents(window.Scenes.Shop);*/
		//window.Scenes.notImplementedYet.Play();
		window.Scenes.Shop.Play();
	});
	
	$('#displayStats').click(function () {
		//var selector = generateSceneList(window.Scenes.Jobs);
		//selector.Play();
		//activateClickEvents(window.Scenes.Jobs);
		window.Scenes.Statistics.Play();
	});
	
	$('#displayInventory').click(function () {
		//var selector = generateSceneList(window.Scenes.Jobs);
		//selector.Play();
		//activateClickEvents(window.Scenes.Jobs);
		window.Scenes.notImplementedYet.Play();
	});


	
})
