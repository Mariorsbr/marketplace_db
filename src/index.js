const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require('./controllers/authController')(app);
require('./controllers/storeController')(app);
require('./controllers/productsController')(app);
require('./controllers/listProductsController')(app);
require('./controllers/userController')(app);
require('./controllers/authStoreController')(app);


app.listen(3333, () => console.info(`App listening on port: 3333`));



