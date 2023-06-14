// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

let PORT = process.env.PORT || 3000
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let timestamp;
  if (!date) {
    // Si no se proporciona ninguna fecha, devuelve la fecha y hora actual
    timestamp = new Date();
  } else {
    // Intenta analizar la fecha proporcionada
    if (!isNaN(date)) {
      // Si el parámetro es un número, considerarlo como un timestamp en milisegundos
      timestamp = new Date(parseInt(date));
    } else {
      // Si el parámetro no es un número, considerarlo como una cadena de fecha
      timestamp = new Date(date);
    }
  }

  if (isNaN(timestamp.getTime())) {
    // Si la fecha es inválida, devuelve un objeto de error
    res.json({ error: 'Invalid Date' });
  } else {
    // Construye la respuesta con el timestamp en formato Unix y UTC
    res.json({
      unix: timestamp.getTime(),
      utc: timestamp.toUTCString()
    });
  }
});


// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
