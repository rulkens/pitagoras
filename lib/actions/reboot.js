var reboot = require('reboot')
// WARNING: this module is totally NOT SAFE!!!!

module.exports = {
    help: 'Reboots Pithagoras',
    run: function(args, message, cb){
        cb('Turn on, Tune in, Drop out.');
        reboot.reboot();
    }
};