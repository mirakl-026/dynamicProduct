const express = require("express");
const path = require("path");

const app = express();

// регистрация папки public как статической
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(3000, () => {
    console.log("i feel you...");
})