const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const config = require("../config");

//Define routes and events
const { bind } = require('./routes');
const events = require("./events.js");
const {sequelize} = require('./model')

const { port } = config.server;

//Start Express-js.
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SQLite binding
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

//Bind the app with routes.
bind(app);

//Start listen mode.
app.listen(port, () => events.onListen(port));

//Define server "special" event to handle situations.
server.on("error", events.onServerError);
process.on("SIGINT", () => events.onProcessKill(server));
process.on("SIGTERM", () => events.onProcessKill(server));
process.on("unhandledRejection", events.onException);
process.on("uncaughtException", (err) => events.onException(err));


