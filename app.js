const express = require('express');
const router = require('./routes/routes')
const bodyParser = require('body-parser')

const app = express();

//app use
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/', router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



