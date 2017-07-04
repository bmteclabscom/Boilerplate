 const winston = require('winston');

 const Logger = new(winston.Logger)({
     transports: [
         new(winston.transports.Console)({
             colorize: true,
             timestamp: function () {
                 const date = new Date();
                 return date.toUTCString()
             },
             formatter: function (options) {
                 // Return string will be passed to logger.
                 return winston.config.colorize(options.level, options.level.toUpperCase())  + ' [' + options.timestamp() + '] ' + (options.message ? options.message : '') +
                     (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
             }
         }),
     ]
 });

 winston.addColors({
     info: 'cyan'
 });

 module.exports = Logger;