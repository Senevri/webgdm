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
			console.log(i)
			var name = scenesource[i].name;
			if (undefined != name) {
				//selector.htmlcontent += '<li onClick="window.Scenes.Jobs[' + i + '].Play()">' + name + "</li>";
				selector.htmlcontent += '<li style="cursor:pointer" id="scene' + name +'">' + name + "</li>";				
			}
		}
		selector.htmlcontent += "</ul>"
		console.log(selector.htmlcontent);
		return selector;
	}
	
	var activateClickEvents = function (scenesource) {
		for (var i in scenesource) {
			var name = scenesource[i].name;
			if (undefined != name) {
				$("#scene" + name).click(function() { scenesource[i].Play() });
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
		//var selector = generateSceneList(window.Scenes.Jobs);
		//selector.Play();
		//activateClickEvents(window.Scenes.Jobs);
		window.Scenes.notImplementedYet.Play();
	});
	
	$('#displayShop').click(function () {
		//var selector = generateSceneList(window.Scenes.Jobs);
		//selector.Play();
		//activateClickEvents(window.Scenes.Jobs);
		window.Scenes.notImplementedYet.Play();
	});
	
})
