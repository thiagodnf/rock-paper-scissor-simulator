const connect = require("connect");
serveStatic = require("serve-static");
network = require("network");
port = process.env.PORT || 3000;
project = require("./package.json");
liveReload = require("livereload");

const { createLogger, format, transports } = require("winston");

connect().use("/", serveStatic(__dirname)).listen(port);

liveReload.createServer().watch(__dirname);

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.simple()
    ),
    transports: [new transports.Console()]
});

logger.info("Running:");
logger.info(`\t${project.name}`);
logger.info();

logger.info("LiveReload Server is watching:");
logger.info("\t" + __dirname);
logger.info();

network.get_active_interface(function (err, obj) {
    logger.info("The magic happens at:");
    logger.info(`\thttp://localhost:${port}`);
    logger.info(`\thttp://${obj.ip_address}:${port}`);
});
