// Módulos
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const mainRouter = require("./routes/mainRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const localsMiddleware = require("./middleware/localsMiddle");
const recordameMiddleware = require("./middleware/recordameMiddle");

// Configuración
// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Define la ubicación de la carpeta de las Vistas
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret:"Secreto",
  resave: false ,
  saveUninitialized: true 
}));

app.use(recordameMiddleware);
app.use(localsMiddleware);

// Routers
app.use("/", mainRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Servidor arriba en el puerto 3000");
});
