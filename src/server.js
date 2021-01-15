const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('./database');

const app = express();

//Templates
app.engine('handlebars', handlebars({
  defaultLayout:'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}))
app.set('view engine', 'handlebars');

//Body parser
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

app.use(express.json());
app.use(routes);

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/js/main.js');
})

app.listen(5000, () => {
  console.log('pai ta on')
});