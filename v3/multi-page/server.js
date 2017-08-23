var express = require('express');
var app = express();

var port = 8070;

app.use(express.static('./dist'));

app.get('/', function (req, res) {
  res.send('Hello Webpack');
});

app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
  console.log(`open http://localhost:${port}/user/login.html`);
});
