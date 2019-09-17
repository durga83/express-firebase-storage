const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fireBaseRoute = require('./app/route/firebase.route');
const config = require('./app/config/config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/firebase', fireBaseRoute);
app.listen(config.port, () => console.log(`app listening on port ${config.port}!`));