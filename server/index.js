const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fibRoutes = require('./routes/fibonacci');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/fib/', fibRoutes);

app.listen(5000, () => {
    console.log('Listening on PORT 5000...')
})