// Server handles the XSRF cookie protection and generates the XSRF token cookie

const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const messages = [{
  message: "First message",
  user: "Mabel"
}];

app
  .use(cookieParser())
  .use(bodyParser.json())
  .listen(port, () =>
  {
    console.log(`Listening on port ${port}`);
  });

// generate the XSRF token cookie and send to the FrontEnd
// Do Not use this in production, this is just for the demo
/**
 * sameSite: 'Strict' - this will prevent the browser from sending the cookie in a cross-site request (e.g. from an external website)
 * cookie can only pass in a 1st party context
 * CORS isn't enabled
 */
app.get('/api/xsrfEndpoint', (req, res, next) =>
{
  const csrfTokenSecret = 'top secret';
  res.cookie('XSRF-TOKEN', csrfTokenSecret, { httpOnly: false, sameSite: 'strict' });
  res.json({});
});

app.get('/api/messages', (_, res) => res.send(messages));

app.post('/api/messages', (req, res) =>
{
  // should verify the CSRF Token cookie!
  const newMsg = req.body;
  messages.push(newMsg);
  return res.json(messages);
});
