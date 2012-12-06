/**
 * @author Esa
 */
$(function () {
	$('#displayJobList').click(function () {
		console.log("displayJobMenu");
		var selector = window.Game.BuildScene({
			name: "",
			type: "html",			
			containerclass: 'joblist'
		});
		
		selector.htmlcontent = "<ul>"
			
		for(var i in window.Scenes.Jobs) {
			console.log(i)
			var name = window.Scenes.Jobs[i].name;
			if (undefined != name) {
				selector.htmlcontent += '<li onClick="window.Scenes.Jobs[' + i + '].Play()">' + name + "</li>";
			}
		}
		selector.htmlcontent += "</ul>"
		console.log(selector.htmlcontent);
		selector.Play();
	});
	
})
