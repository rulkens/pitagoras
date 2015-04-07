var request = require('request'),
    _ = require('underscore'),
    Slack = require('./slack/client');

var DEFAULT_CHANNEL = 'pithagoras',
    DEFAULT_USERNAME = 'pi',
    DEFAULT_EMOJI = ':cake:',
    DEFAULT_MESSAGE = {
        username: DEFAULT_USERNAME,
        icon_emoji: DEFAULT_EMOJI
    };

// main code for slack bot
// can be used as a middleware for express servers
var Pi = function(token){
    this.token = token;
    // connect to slack
    this.slack = new Slack(token);

    // join the default channel
    this.slack.joinChannel(DEFAULT_CHANNEL);

    this.slack.on('open', this.openHandler.bind(this));
    this.slack.on('message', this.messageHandler.bind(this));

    process.on('exit', this.exitHandler);

    this.slack.login();
};

Pi.prototype = {
    defaultChannel: function(){
        return this.slack.getChannelByName(DEFAULT_CHANNEL);
    },
    channelMessage: function(text, channel){
        var data = _.extend(DEFAULT_MESSAGE, { text: text });
        return this.defaultChannel().postMessage(data);
    },
    privateMessage: function(text, channel){
        channel = channel || this.defaultChannel();
        return channel.postMessage(_.extend(DEFAULT_MESSAGE, { text: text }));
    },
    openHandler: function(){
        console.log('Bot started');
        this.channelMessage("Hi dudes, I just woke up. Feelin' mighty fine. Since I am a bot you can tell me what to do. Type `pi help` to get options");
    },
    messageHandler: function(message){
        var channel = this.slack.getChannelGroupOrDMByID(message.channel);

        // only respond to messages that aren't coming from me
        if(message.user === this.slack.self.id || message.username === DEFAULT_USERNAME) return;

        var user = this.slack.getUserByID(message.user);

        // add username to message
        message.username = user ? user.name : '';

        // TODO: resolve instructions
        var instruction = message.text.split(' '),
            args = _.rest(instruction) || [],
            action = instruction[0] || 'default';

        // auto execute the appropriate action
        // TODO: check if file exists
        try {
            require('./actions/' + action).run(args, message, function(text){
                this.privateMessage(text, channel);
            }.bind(this));
        } catch(e){
            console.warn('module ' + action + ' could not be loaded', e);
            this.privateMessage("I don't know what you mean. Isn't it sunny outside?", channel);
        }
    },
    exitHandler: function(code){
        this.channelMessage('Goodbye for now folks!');
    }
};


module.exports = Pi;
