var request = require('request'),
    _ = require('underscore');

var postText = function(text){
    var data = { text: text };
    return request.post({ url: 'https://hooks.slack.com/services/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', form: JSON.stringify(data) }, function(err, res, body){
        console.log('[bot.startup] ', body);
    });
};
// main code for slack bot
// can be used as a middleware for express servers
module.exports = {
    hook: function(req, res){

        // TODO: resolve instructions
        var instruction = _.rest(req.body.text.split(' ')),
            args = _.rest(instruction) || [],
            responseHandler = function(text){
                var response = {};
                response.text = text;
                res.json(response);
            },
            action = instruction[0] || 'default';

        // auto execute the appropriate action
        // TODO: check if file exists
        try {
            require('./actions/' + action).run(args, req.body, responseHandler);
        } catch(e){
            console.warn('module could not be loaded');
            responseHandler("I don't know what you mean. Isn't it sunny outside?");
        }

        // using bodyParser
        console.log(req.body);

    },
    startup: function(){
        console.log('Bot started');
        postText("Hi dudes, I just woke up. Feelin mighty fine. Since I am a bot you can tell me what to do. Type `pi help` to get options");
    }
};