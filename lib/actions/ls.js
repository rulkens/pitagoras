var sys = require('sys'),
    exec = require('child_process').exec;

// WARNING: this module is totally NOT SAFE!!!!

module.exports = {
    help: 'Lists files in a directory. Use like Linux command',
    run: function(args, message, cb){
        function puts(err, stdout, stderr){
            cb(stdout || stderr);
        }
        exec('ls ' + args[0], puts);
    }
};