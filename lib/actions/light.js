request = require('request');

module.exports = {
    help: 'Control the EOS lamp',
    run: function(args, message, cb){
        var action = args[0];
        console.log(args);
        request.get('http://127.0.0.1:' + process.env.EOS_SERVER_PORT + '/api/' + action)
            .on('response', function(response){
                //console.log(response);
                cb("Response received");
            })
            .on('error', function(response){
                cb("Error in running API");
            });

    }
};