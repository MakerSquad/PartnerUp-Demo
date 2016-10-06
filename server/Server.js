var LESS = require('node-less-endpoint');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.static(path.join(__dirname, '../bower_components')));

app.get('/vendor.css', LESS.serve('./client/style/reactorcore/index.less'));
app.get('/style.css', LESS.serve('./client/style/index.less'));

app.get('/signout', (req, res) => {
  req.session.destroy(); // clears session on logout
  res.redirect('/');
});

app.get('/currentUser', (req, res) => {
  db.authenticate(req.cookies.token, null, true)
  .then(userData => {
    MP.me(req.cookies.token) // MakerPass call to get personal data based on token
      .then(user => {
        user.admin = userData.admin;
        res.send(user); // sends user object
      }).catch(err => {
        res.status(401).send(String(err));
      });
  })
  .catch(err => {
    res.status(401).send(String(err));
  });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port ' + port);
module.exports = app;

