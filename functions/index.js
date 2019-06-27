const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const config = require('./firebase-config.json');

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://cv-carlossz.firebaseio.com'
});

exports.api = functions.https.onRequest((req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'GET') {
    const data = firebase.database().ref('/me')
    data.on('value', (snapshot) => {
      res.json(snapshot.val());
    });
  }
});