const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/authController')(app);
require('./controllers/storeController')(app);
require('./controllers/productsController')(app);
require('./controllers/listProductsController')(app);


app.listen(3333, () => console.info(`App listening on port: 3333`));



