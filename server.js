const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const connectDB = async () => {
        try {
            await mongoose.connect(process.env.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('x', err);
            process.exit(1);
        }
    };
connectDB();

//Database connection

const db = mongoose.connection;

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Conexion exitosa"))

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
app.get("/", (req, res) => {
    res.send("Hello world");
});
*/

app.use("/libros", require("./routes/librosRoutes"))
app.listen(port, () => console.log("El servidor esta funcionando"));
