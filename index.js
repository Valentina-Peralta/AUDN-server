const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require('./routes/userRoutes')
const playlistsRoutes = require('./routes/playlistsRoutes')
const reproductionRoutes = require('./routes/reproductionRoutes')
const artistsRoutes = require('./routes/artistsRoutes')

//creamos el servidor con express
const app = express();

//middleware   
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// colocar rutas
app.get("/", (req, res) => { res.send('proyecto final Senpai') });
app.use("/api", userRoutes, playlistsRoutes, reproductionRoutes, artistsRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`)
})
