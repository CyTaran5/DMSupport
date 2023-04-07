import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost:3306", //the host for you database
    user: "root", //the username for your database
    password: "John1234", //the password for your database
    database: "355 Lab" //the name of your database (database itself, not the schema)
})

//dependencies
app.use(express.json())
app.use(cors())

//gets the homepage, useful for testing
app.get("/", (req, res) => {
    res.json({ message: "Hello World" })
})

//World:
//Display World: 
app.get("/World", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})
//Create World:
app.post("/World", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})
//Update World:
app.put("/World/update/:id", (req, res) => {
    
    const query = "UPDATE world SET W_Name= ?, Lore = ? where W_ID = ?";

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.W_ID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})
//Delete world:
app.delete("/World/delete/:id", (req, res) => {
    const W_ID = req.params.W_ID;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [W_ID], (err, result) => {
         if (err) {
             console.log(err)
         } else {
             res.json(result)
         }
    })
})


//Entity:

//Display Entity:
//create view all_entities as select entity.E_Name, entity.Type, stat.S_Name, stat.S_Value from entity INNER JOIN stat on entity.E_ID = stat.E_ID where entity.UserID = #
app.get("/Entity", (req, res) => {
    const UserID = req.params.UserID;
    const query = "select entity.E_Name, entity.Type, stat.S_Name, stat.S_Value from entity INNER JOIN stat on entity.E_ID = stat.E_ID where entity.UserID = ?"


    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Entity:
//INSERT INTO entity(E_Name, E_Details, Player_Notes, Type) Values(“-“, “-“, “-“, “-“);
//Host variables: E_Name, E_Details, Player_Notes, Type.
app.post("/Entity", (req, res) => {
    const query = "INSERT INTO entity(E_Name, E_Details, Player_Notes, Type) Values(?, ?, ?, ?)"

    const VALUES = [
        req.body.E_Name,
        req.body.E_Details,
        req.body.Player_Notes,
        req.body.Type
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Entity:
//UPDATE entity SET() = “ “ where E_ID = #.
//Host variables: host can choose to update any combination of  E_Name, E_Details, Player_Notes, or Type
app.put("/Entity/update/:id", (req, res) => {
    
    const query = "UPDATE entity SET E_Name = ?, E_Details = ?, Player_Notes = ?, Type = ? where E_ID = ?";

    const VALUES = [
        req.body.E_Name,
        req.body.E_Details,
        req.body.Player_Notes,
        req.body.Type,
        req.params.E_ID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Entity:
//Delete FROM entity WHERE E_ID = #.
//Host presses delete button when sends E_ID as variable to the statement.
app.delete("/Entity/delete/:id", (req, res) => {
    const W_ID = req.params.E_ID;
    const query = "Delete FROM entity WHERE E_ID = ?"

    db.query(query, [W_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//    Items:
//Display Items:
//CREATE VIEW all_items AS SELECT item.I_Name, stat.S_Name, stat.S_Value FROM item INNER JOIN stat ON item.I_ID = stat.I_ID WHERE item.UserID = #
app.get("/Items", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT item.I_Name, stat.S_Name, stat.S_Value FROM item INNER JOIN stat ON item.I_ID = stat.I_ID WHERE item.UserID = ?"

    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Items:
//INSERT INTO item(I_Name, I_Details, Item_Notes, I_ID, User_ID)  Values("-", "-", “-", #, #).
//Host variables: I_Name, I_Details, Item_Notes..
app.post("/Items", (req, res) => {
    const query = "INSERT INTO item(I_Name, I_Details, Item_Notes, I_ID, User_ID)  Values(?, ?, ?, ?, ?))"

    const VALUES = [
        req.body.I_Name,
        req.body.I_Details,
        req.body.Item_Notes,
        req.params.I_ID,
        req.params.User_ID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Items:
//    UPDATE item SET() = “ “.where I_ID = #.
//Host variables: I_Name, I_Details, Item_Notes.
app.put("/Items/update/:id", (req, res) => {

    const query = "UPDATE item SET I_Name = ?, I_Details = ?, Item_Notes = ? where I_ID = ?";

    const VALUES = [
        req.body.I_Name,
        req.body.I_Details,
        req.body.Item_Notes,
        req.params.I_ID,
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Items:
//    DELETE FROM item WHERE I_ID = #
//Host presses specific delete button when sends I_ID as variable to the statement.
app.delete("/Items/delete/:id", (req, res) => {
    const I_ID = req.params.I_ID;
    const query = "DELETE FROM item WHERE I_ID = ?"

    db.query(query, [I_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//    Locations:
//Display Locations:
//    CREATE VIEW all_locations AS SELECT * FROM location WHERE UserID = #.
//Host variables = UserID
app.get("/Locations", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM location WHERE UserID = ?"


    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Locations:
//    INSERT INTO locations VALUES(L - Name, L_Description, L_ID) VALUES( “-”, “-”).
//Host variables: L_Name, L_Description.
app.post("/Locations", (req, res) => {
    const query = "INSERT INTO locations VALUES(L_Name, L_Description) VALUES( ?, ?)"

    const VALUES = [
        req.body.L_Name,
        req.body.L_Description
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Locations:
//    UPDATE location SET() = “ “.
//    Host variables: L_Name, L_Description.
app.put("/Locations/update/:id", (req, res) => {
    
    const query = "UPDATE location SET L_Name= ?, L_Description = ? where L_ID = ?";

    const VALUES = [
        req.body.L_Name,
        req.body.L_Description,
        req.params.L_ID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Locations:
//    DELETE FROM location WHERE L_ID = #.
//Host presses specific delete button when sends L_ID as variable to the statement.
app.delete("/Locations/delete/:id", (req, res) => {
    const L_ID = req.params.L_ID;
    const query = "DELETE FROM location WHERE L_ID = ?"

    db.query(query, [L_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//    Campaign:
//Display Campaign:
//    CREATE VIEW all_campaigns AS SELECT * FROM campaign WHERE W_ID = #.
app.get("/Campaign", (req, res) => {
    const W_ID = req.params.W_ID;
    const query = "SELECT * FROM campaign WHERE W_ID = ?"


    db.query(query, [W_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Campaign:
//    INSERT INTO campaign(Story, C_Name, W_ID) VALUES(“-”, “-”).
//Host variables(Story, C_Name)
app.post("/Campaign", (req, res) => {
    const query = "INSERT INTO campaign(Story, C_Name, W_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.Story,
        req.body.C_Name,
        req.params.W_ID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Campaign:
//    UPDATE campaign SET() = “ “.
//    Host Variables: Story, C_Name.
app.put("/Campaign/update/:id", (req, res) => {
    
    const query = "UPDATE campaign SET Story = ?, C_Name = ? where C_ID = ?";

    const VALUES = [
        req.body.Story,
        req.body.C_Name,
        req.params.C_ID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Campaign:
//    DELETE FROM campaign WHERE C_ID = #
//Host presses specific delete button when sends C_ID as variable to the statement.
app.delete("/Campaign/delete/:id", (req, res) => {
    const C_ID = req.params.C_ID;
    const query = "DELETE FROM world WHERE C_ID = ?"

    db.query(query, [C_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//    Scenarios
//Display Scenarios:
//CREATE VIEW all_scenarios SELECT * FROM scenario WHERE UID = #.
//Host Variables = U_ID
app.get("/Scenarios", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Scenarios:
//INSERT INTO scenario(S_Name, S_ID, UserID, L_ID) VALUES(“-”, #, #, #).
//Host Variables: S_Name, L_ID
app.post("/Scenarios", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Scenarios:
//UPDATE scenario SET() = “ “.
//Host Variables: S_Name, S_ID, L_ID.
app.put("/Scenarios/update/:id", (req, res) => {
    const W_Name = req.body.W_Name;
    const Lore = req.body.Lore;
    const W_ID = req.body.W_ID;
    const query = "UPDATE world SET W_Name= ?, Lore = ? where W_ID = ?";


    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Scenarios:
//DELETE FROM scenario WHERE S_ID = ?
//Host presses specific delete button when sends S_ID as variable to the statement.
app.delete("/Scenarios/delete/:id", (req, res) => {
    const W_ID = req.params.id;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//existsin:
//Display existsin:
//    SELECT e_name FROM existsin RIGHT JOIN entity ON existsin.e_id = entity.e_id WHERE s_id = #
//hostVariables = S_ID
app.get("/existsin", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create existsin:
//INSERT INTO existsin(e_id, s_id) VALUES(E_ID, S_ID)
//hostVariables = E_ID, S_ID
app.post("/existsin", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Delete existsin:
//DELETE FROM exists_in WHERE S_ID = # AND E_ID = #
//hostVariables = s_id, e_id
app.delete("/existsin/delete/:id", (req, res) => {
    const W_ID = req.params.id;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Stat:
//Display Stat:
//SELECT * FROM stat WHERE s_id = ?
//hostVariables = s_id
app.get("/Stats", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Stat:
//INSERT INTO stat(s_name, s_value, i_id, e_id) VALUES( ?, ?, ?, ?)
//Hostvariables = name, value, i_id, e_id
app.post("/Stat", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Stat:
//UPDATE stat SET S_value = ? WHERE = ?, ?
//    hostVariables = S_value, L_ID, U_ID
app.put("/Stat/update/:id", (req, res) => {
    const W_Name = req.body.W_Name;
    const Lore = req.body.Lore;
    const W_ID = req.body.W_ID;
    const query = "UPDATE world SET W_Name= ?, Lore = ? where W_ID = ?";


    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Stat:
//DELETE FROM stat WHERE S_ID = ?
//    hostVariables = s_id
app.delete("/Stat/delete/:id", (req, res) => {
    const W_ID = req.params.id;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Action_ability:
//Display Action_ability:
//    Select action
//{“sql”:”SELECT * FROM action_ability WHERE A_Name = ?,
//“hostVariables”: [aId]}
app.get("/Action_ability", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Action_ability:
//{“sql”:”INSERT INTO action_ability VALUES( ?, ?)”,
//“hostVariables”: [name, value]}
app.post("/Action_ability", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Action_ability:
app.put("/Action_ability/update/:id", (req, res) => {
    const W_Name = req.body.W_Name;
    const Lore = req.body.Lore;
    const W_ID = req.body.W_ID;
    const query = "UPDATE world SET W_Name= ?, Lore = ? where W_ID = ?";


    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Action_ability:
//{“sql”:”DELETE FROM Action WHERE A_Name = ?”,
//“hostVariables”: [A_Name]”
app.delete("/Action_ability/delete/:id", (req, res) => {
    const W_ID = req.params.id;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//        User:
//Display User:
//{“sql”:”SELECT u_id, nickname, email FROM  WHERE u_id = ?,
//“hostVariables”: [u_id]}
app.get("/User", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create User:
//{“sql”:”INSERT INTO user VALUES( ?, ?, ?)”,
//“hostVariables”: [nickname, email, password]}
app.post("/User", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update User:
//{“sql”:”UPDATE user SET?= ? WHERE = ?, ?”
//“hostVariables”: [change, changedValue, U_ID]}
app.put("/User/update/:id", (req, res) => {
    const W_Name = req.body.W_Name;
    const Lore = req.body.Lore;
    const W_ID = req.body.W_ID;
    const query = "UPDATE world SET W_Name= ?, Lore = ? where W_ID = ?";


    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete User:
//{“sql”:”DELETE FROM user WHERE U- ID = ?”,
//“hostVariables”: [U_ID]”
app.delete("/User/delete/:id", (req, res) => {
    const W_ID = req.params.id;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//    Owns:
//Display Owns:
//    CREATE VIEW ownership SELECT * FROM owns
app.get("/Owns", (req, res) => {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM world WHERE UserID = ?"


    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Owns:
//    INSERT INTO owns(E_ID, I_ID) VALUES(#, #)
app.post("/Owns", (req, res) => {
    const query = "INSERT INTO world(W_Name, W_ID, Lore, USER_ID) VALUES(?, ?, ?)"

    const VALUES = [
        req.body.W_Name,
        req.body.Lore,
        req.params.UserID
    ]

    db.query(query, [VALUES], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Owns:
app.put("/Owns/update/:id", (req, res) => {
    const W_Name = req.body.W_Name;
    const Lore = req.body.Lore;
    const W_ID = req.body.W_ID;
    const query = "UPDATE world SET W_Name= ?, Lore = ? where W_ID = ?";


    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Owns:
//    DELETE FROM owns WHERE E_ID / I_ID = #
//Host Variables: Host either deletes from entity or item.
app.delete("/Owns/delete/:id", (req, res) => {
    const W_ID = req.params.id;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [itemID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
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
