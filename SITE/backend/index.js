import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost:3306", //the host for you database
    user: "root", //the username for your database
    password: "John1234", //the password for your database
    database: "Todo" //the name of your database (database itself, not the schema)
})

//dependencies
app.use(express.json())
app.use(cors())

//gets the homepage, useful for testing
app.get("/", (req, res) => {
    res.json({ message: "Hello World" })
})

//EXAMPLE OF GET REQUEST
app.get("/todos", (req, res) => {
    const query = "SELECT * FROM items"
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//EXAMPLE OF POST REQUEST
app.post("/todos", (req, res) => {
    const query = "INSERT INTO items (itemName, isCompleted) VALUES (?, false)"

    const VALUES = [
        req.body.itemName
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//EXAMPLE OF DELETE REQUEST
app.delete("/todos/delete/:id", (req, res) => {
    const itemID = req.params.id;
    const query = "DELETE FROM items WHERE itemID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//EXAMPLE OF PUT REQUEST
app.put("/todos/update/:id", (req, res) => {
    const itemID = req.params.id;
    const query = "UPDATE items SET isCompleted = NOT isCompleted WHERE itemID = ?";

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//listen on port 8080
app.listen(8080, () => {
  console.log("Server is running")
});
