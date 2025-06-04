const mysql = require("mysql");
const express = require("express");
const app = express()
app.use(express.json()); // Add this line to parse JSON request bodies
require("dotenv").config();
const cors = require("cors");

app.use(cors());

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar na base de dados:", err);
        return;
    }
    console.log("Conectado na base de dados!");
})


app.get("/users", (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Erro ao buscar usuários" });
            return;
        }
        res.json(results);
    })   
})

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    connection.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Erro ao deletar usuário" });
            return;
        }
        res.json({ message: "Usuário deletado com sucesso" });
    })
})

app.post("/users", (req, res) => { // Changed /user to /users
    const {name, email, cpf, telephone, data_birth} = req.body;
    connection.query("INSERT INTO users (name, email, cpf, telephone, data_birth) VALUES (?,?,?,?,?)", [name, email, cpf, telephone, data_birth], (err, results) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Erro ao cadastrar usuário" });
            return;
        }
        res.json({ message: "Usuário cadastrado com sucesso" });
    })   
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server iniciado na porta ${process.env.PORT}`);
})
