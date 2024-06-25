const express = require("express")
const app = express();
var cors = require('cors');
const cookieParser = require("cookie-parser")
app.use(cors());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

const userRouter = require("./routes/user.routes");
const adminRouter = require("./routes/admin.routes");


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin" , adminRouter);

module.exports = app