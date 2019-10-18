const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded());

require("./routes")(app);

app.get('/', (req, res) => {
    res.send({
        text: 'PORT 5000'
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));