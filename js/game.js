$(document).ready(function () {
    "use strict";
    var root = this;

    var previousGame = root.Game;

    var Game = {
        _framerate: 30,
        _last_tick: 0,
        run: function() {
            $('#content').append($('<div id="fpscounter">Loading...</div>'));
            Game._last_tick = new Date().getTime();
            Game.heartbeat(); 
        
        }, 
        heartbeat: function () {
            var fpsdelay = 1000/Game._framerate;
            var new_tick = new Date().getTime();
            var delta = new_tick - Game._last_tick;            
            Game._last_tick = new_tick;
            $('#fpscounter').html('FPS: ' + 1000/delta );
            if (delta<fpsdelay) { delta = fpsdelay + (fpsdelay-delta); 
            } else { delta = fpsdelay; }
            setTimeout(function () { Game.heartbeat();}, delta); 
        }
    }

    Game.run();

});

