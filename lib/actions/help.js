var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    actionsPath = __dirname + '/';

module.exports = {
    help: 'Get some help',
    run: function(args, message, cb){
        var res = "Hi " + message.username + ", I'm here to help you :smile:\nType in the following:\n";

        // map all the modules
        fs.readdir(actionsPath, function(err, files){
            if(err){
                throw(err);
            }

            res += files
                // filter out hidden files
                .filter(function(file){
                    return file[0] !== '.' && path.extname(file) === '.js';
                })
                // strip the .js from the extension
                .map(function(file){
                    return _.initial(file.split('.')).join('.');
                })
                // read the file and display the help content
                .map(function(file){
                    action = require(actionsPath + file);
                    return '`' + file + '`\t\t\t' + action.help;
                })
                .join("\n");

            cb(res);
        });

    }
};