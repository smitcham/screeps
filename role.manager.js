var roles = [];

module.exports.register = function (role, runFunc, buildFunc) {
    roles.push({ role: role, run: runFunc, build: buildFunc });
}

module.exports.fillRole = function(spawn, role, maxAmount) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

    if(creeps.length < 2) {
        var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: role});
        console.log('Spawning new ' + role + ': ' + newName);
    }
}
module.exports.run = function (creep) {
    var role = _.find(roles, r => r.role === creep.memory.role);
    if (role) {
        role.run(creep);
    } else {
        console.log("Unable to find run method for " + creep.memory.role);
    }
}

module.exports.fillCreeps = function (spawn) { 
    _.forEach(roles, r => r.build(spawn));
}