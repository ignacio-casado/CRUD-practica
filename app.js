const express = require('express');
const bodyParser = require('body-parser')
const app = express();


// body-parser
app.use(bodyParser.urlencoded({extended: true}))
//app use
const routes = require('./routes/routes')
app.use('/', routes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



