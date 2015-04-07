var externalip = require('externalip');

module.exports = {
    help: 'Get the IP of the server',
    run: function(args, message, cb){
        externalip(function(err, ip){
            cb('My external IP is <http://' + ip + ':' + process.env.EXTERNAL_IP + '>');
        });
    }
};