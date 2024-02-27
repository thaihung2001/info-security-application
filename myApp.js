const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

const app = express();

/* app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action:'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true,
  })
);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // Set defaultSrc to trust only your website address by default
      defaultSrc: ["'self'"],
      
      // Set scriptSrc to only allow scripts from your website ('self') and 'trusted-cdn.com'
      scriptSrc: ["'self'", 'trusted-cdn.com'],
      
      // Add other directives as needed
      // e.g., styleSrc, fontSrc, frameSrc, mediaSrc, etc.
    },
  })
); */
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))








































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
