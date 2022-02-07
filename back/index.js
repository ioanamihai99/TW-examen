const express = require('express');
const cors = require('cors');
const app = express();
const model = require('./models');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 3001;
model.sequelize.sync();

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})