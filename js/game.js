/* vim: set ts=2 sw=2 expandtab */ 
$(document).ready(function () {
    "use strict";

    var root = this;

    var previousGame = root.Game;

    var Game = {
        _framerate: 30,

        _last_tick: 0,
        
        _$fpscounter: $('<div id="fpscounter">Loading...</div>'), 

        Run: function() {
            $('header').append(this._$fpscounter);
            Game._last_tick = new Date().getTime();
            Game.Heartbeat(); 
        }, 

        Heartbeat: function () {
            var fpsdelay = 1000/Game._framerate;
            var new_tick = new Date().getTime();
            var delta = new_tick - Game._last_tick;            

            Game._last_tick = new_tick;
            this._$fpscounter.html('FPS: ' + 1000/delta );

            if (delta<fpsdelay) { 
                delta = fpsdelay + (fpsdelay-delta); 
            } else { delta = fpsdelay; }

            setTimeout(function () { Game.Heartbeat(); }, delta); 
        },

        BuildScene: function (sceneobj) {
            // create object with start method 
            var scene = sceneobj;
            if (undefined === scene) {
               scene = { 
                    type: "empty",
                    htmlcontent: ""
                };
            }
            scene.Play = function () {
                $("#scenecontainer").removeClass('hide');
                $scene = $("#scene");
                scene.$container = $scene;

                switch (scene.type) {
                    case "empty": {
                        $scene.html("<h1>Empty Scene</h1>")
                        break;
                    }
                    case "html": {
                        $scene.html(scene.htmlcontent);    
                        break;
                    }
                    default: {
                        console.log('error in scene.Play switch');
                        break;
                    }
                }
                return true;
            }

            scene.End = function () {
                scene.$container.html("");
                scene.$container.addClass('hide');
                return true;
            }
            
            return scene; 
        }
    }

    Game.Run();

    Game.scenes = {
        test: {
                type: "html",
                htmlcontent: "This is a test scene"
        }
    };

    Game.activescene = Game.BuildScene(Game.scenes.test);
    Game.activescene.Play();

    //for testing
    window.Game = Game;
});

