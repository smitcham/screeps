var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleManager = require('role.manager');

function reportSpawn(spawn) {
    if (spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️ ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }
}

var roles = {};


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:' + name);
        }
    }
    var spawn = Game.spawns['Spawn1'];

    roleManager.fillCreeps(spawn);

    reportSpawn(spawn);
    
    for (var name in Game.creeps) {        
        var creep = Game.creeps[name];
        roleManager.run(creep);
    }
}