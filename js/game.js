$(document).ready(function () {
    "use strict";
    var root = this;

    var previousGame = root.Game;

    var Game = {
        _framerate: 10,
        _last_tick: 0,
        _heartbeat_queue: [],
        run: function() {
            $('#content').append($('<div id="fpscounter">Loading...</div>'));
            $('#content').append($('<div id="test">+</div>'));
            Game._last_tick = new Date().getTime();
            Game.heartbeat(); 
        }, 
        heartbeat: function () {
            var fpsdelay = 1000/Game._framerate;
            var new_tick = new Date().getTime();
            var delta = new_tick - Game._last_tick;            
            Game._last_tick = new_tick;
            Game.delta = delta;
            $.each(Game._heartbeat_queue, function (i, item) { item() });
            if (delta<fpsdelay) { delta = fpsdelay + (fpsdelay-delta); 
            } else { delta = fpsdelay; }
            setTimeout(function () { Game.heartbeat();}, delta); 
        }
    }

    Game.$fpscounter = $('#fpscounter');
    Game.last = 0;

    Game._heartbeat_queue.push(function () { 
            $('#fpscounter').html('FPS: ' + 1000/Game.delta );
    });
    Game._heartbeat_queue.push(function () { 
        var tokens = "|,/,-,\\".split(',');
        /*if ($('#test').html() == '+') {
            $('#test').html('-');
        } else {
            $('#test').html('+');
        }*/
        $('#test').html(tokens[Game.last]);
        Game.last += 1;
        if (Game.last == 4) Game.last = 0;
    });
    Game.run();

});

