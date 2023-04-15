import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "127.0.0.1", //the host for you database
    user: "root", //the username for your database
    password: "John1234", //the password for your database
    database: "dmsupport" //the name of your database (database itself, not the schema)
})

//dependencies
app.use(express.json())
app.use(cors())

//gets the homepage, useful for testing
app.get("/", (req, res) => {
    res.json({ message: "Backend is up." })
})

db.connect(error => {
    if (error) throw error;
    console.log('Connected to database');
})

const Current_U_ID = 2; //Other USER ID change place is in TableSelect.

//-----------------------------------------------------------------------------------------------------------------------

//World:
//Display World: 
app.get("/World", (req, res) => {
    const {UserID} = req.query;
    console.log("WORLD, U_ID:", UserID);
    const query = "SELECT W_Name AS 'World Name', Lore, W_ID AS World_ID FROM world WHERE UserID = ?";

    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.json(result)
        }
    })
})

//Create World:
app.post("/World", (req, res) => {
    const W_Name = req.body.W_Name;
    const Lore = req.body.Lore;
    const UserID = Current_U_ID;
    const query = "INSERT INTO world(W_Name, Lore, UserID) VALUES (?, ?, ?)"

    db.query(query, [W_Name, Lore, UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update World:
app.put("/World/update", (req, res) => {
    let W_Name, Lore, W_ID;
    const updates = req.body.updates;
    updates.forEach((update, index) => {
        const columnName = update.columnName;
        const oldValue = update.oldValue;
        const newValue = update.newValue;

        if(index === 0) {
            W_Name = newValue;
        }

        if(index === 1) {
            Lore = newValue;
        }

        if(index === 2) {
            W_ID = newValue;
        }
        console.log(index);
        console.log(`Updating column "${columnName}" from "${oldValue}" to "${newValue}"`);
    });

    console.log(W_Name);
    console.log(Lore);
    console.log(W_ID);

    const query = "UPDATE world SET W_Name = ?, Lore = ? WHERE W_ID = ?";

    db.query(query, [W_Name, Lore, W_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Delete world:
app.delete("/World/delete", (req, res) => {
    const {W_ID} = req.body;
    const query = "DELETE FROM world WHERE W_ID = ?"

    db.query(query, [W_ID], (err, result) => {
         if (err) {
             console.log(err)
         } else {
             res.json(result)
         }
    })
})


//--------------------------------------------------------------------------------------------

//Entity:
//Display Entity:
//create view all_entities as select entity.E_Name, entity.Type, stat.S_Name, stat.S_Value from entity INNER JOIN stat on entity.E_ID = stat.E_ID where entity.U_ID = #
app.get("/Entity", (req, res) => {
    const {UserID} = req.query;
    console.log("Entity, U_ID:", UserID);
    const query = "select entity.E_Name AS 'Entity Name', entity.Type, stat.S_Name AS 'Stat Name', stat.S_Value AS 'Stat Value', entity.E_ID as Entity_ID from entity INNER JOIN stat on entity.E_ID = stat.E_ID where entity.UserID = ?"

    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Entity:
app.post("/Entity", (req, res) => {
    const {E_Name, E_Details, Player_Notes, Type, UserID} = req.body;
    const query = "INSERT INTO entity(E_Name, E_Details, Player_Notes, Type, UserID) VALUES (?, ?, ?, ?, ?)"


    db.query(query, [E_Name, E_Details, Player_Notes, Type], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Entity:
app.put("/Entity/update", (req, res) => {
    
    const {E_Name, E_Details, Player_Notes, Type, E_ID} = req.body;
    const query = "UPDATE entity SET E_Name = ?, E_Details = ?, Player_Notes = ?, Type = ? where E_ID = ?";

    db.query(query, [E_Name, E_Details, Player_Notes, Type, E_ID], (err, result) => {
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
app.delete("/Entity/delete", (req, res) => {
    const { E_ID } = req.body;
    const query = "Delete FROM entity WHERE E_ID = ?"

    db.query(query, [E_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//---------------------------------------------------------------------------------------------------

//Items:
//Display Items:
//CREATE VIEW all_items AS SELECT item.I_Name, stat.S_Name, stat.S_Value FROM item INNER JOIN stat ON item.I_ID = stat.I_ID WHERE item.U_ID = #
app.get("/Items", (req, res) => {
    const { UserID } = req.query;
    console.log("Items, U_ID:", UserID);
    const query = "SELECT item.I_Name AS 'Item Name', stat.S_Name AS 'Stat Name', stat.S_Value AS 'Stat Value', item.I_ID AS Item_ID FROM item INNER JOIN stat ON item.I_ID = stat.I_ID WHERE item.UserID = ?"

    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Items:
app.post("/Items", (req, res) => {
    const {I_Name, I_Details, Item_Notes, UserID} = req.body;
    const query = "INSERT INTO item (I_Name, I_Details, Item_Notes, UserID) VALUES (?, ?, ?, ?)"


    db.query(query, [I_Name, I_Details, Item_Notes, I_ID,
        User_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Items:
//Host variables: I_Name, I_Details, Item_Notes.
app.put("/Items/update", (req, res) => {
    const {I_Name, I_Details, Item_notes, I_ID} = req.body;
    const query = "UPDATE item SET I_Name = ?, I_Details = ?, Item_notes = ? where I_ID = ?";


    db.query(query, [I_Name, I_Details, Item_Notes, I_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Items:
//DELETE FROM item WHERE I_ID = #
//Host presses specific delete button when sends I_ID as variable to the statement.
app.delete("/Items/delete", (req, res) => {
    const { I_ID } = req.body;
    const query = "DELETE FROM item WHERE I_ID = ?"

    db.query(query, [I_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//---------------------------------------------------------------------------------------------------

//Scenarios
//Display Scenarios:
//CREATE VIEW all_scenarios SELECT * FROM scenario WHERE UID = #.
//Host Variables = U_ID
app.get("/Scenarios", (req, res) => {
    const {UserID} = req.query;
    console.log("Scenarios, U_ID:", UserID);
    const query = "SELECT S_Name AS 'Stat Name', S_ID AS Scenario_ID FROM scenario WHERE UserID = ?"

    db.query(query, [UserID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Scenarios:
//INSERT INTO scenario(S_Name, S_ID, U_ID, L_ID) VALUES(�-�, #, #, #).
//Host Variables: S_Name, L_ID
app.post("/Scenarios", (req, res) => {
    const query = "INSERT INTO scenario(S_Name, U_ID, L_ID) VALUES(?, ?, ?)"

    const {
        S_Name,
        U_ID,
        L_ID
    } = req.body;

    db.query(query, [S_Name, U_ID, L_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Scenarios:
//UPDATE scenario SET() = � �.
//Host Variables: S_Name, S_ID, L_ID.
app.put("/Scenarios/update/:id", (req, res) => {

    const query = "UPDATE scenario SET S_Name, U_ID, L_ID where S_ID = ?";

    const {
        S_Name,
        U_ID,
        L_ID,
        S_ID
    } = req.body;

    db.query(query, [S_Name, U_ID, L_ID, S_ID], (err, result) => {
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
app.delete("/Scenarios/delete", (req, res) => {
    const { S_ID } = req.body;
    const query = "DELETE FROM scenario WHERE S_ID = ?"

    db.query(query, [S_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//--------------------------------------------------------------------------------------------------

//Locations:
//Display Locations:
//CREATE VIEW all_locations AS SELECT * FROM location WHERE U_ID = #.
//Host variables = U_ID
app.get("/Locations", (req, res) => {
    const { U_ID } = req.body;
    const query = "SELECT * FROM location WHERE U_ID = ?"


    db.query(query, [W_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Locations:
//    INSERT INTO locations VALUES(L - Name, L_Description, L_ID) VALUES( �-�, �-�).
//Host variables: L_Name, L_Description.
app.post("/Locations", (req, res) => {
    const query = "INSERT INTO locations VALUES(L_Name, L_Description) VALUES( ?, ?)"

    const {
        L_Name,
        L_Description
    } = req.body;

    db.query(query, [L_Name, L_Description], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Locations:
//    UPDATE location SET() = � �.
//    Host variables: L_Name, L_Description.
app.put("/Locations/update/:id", (req, res) => {
    
    const query = "UPDATE location SET L_Name= ?, L_Description = ? where L_ID = ?";

    const {
        L_Name,
        L_Description,
        L_ID
    } = req.body;

    db.query(query, [L_Name, L_Description, L_ID], (err, result) => {
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
    const { L_ID } = req.body;
    const query = "DELETE FROM location WHERE L_ID = ?"

    db.query(query, [C_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//---------------------------------------------------------------------------------------------------

//    Campaign:
//Display Campaign:
//    CREATE VIEW all_campaigns AS SELECT * FROM campaign WHERE W_ID = #.
app.get("/Campaign", (req, res) => {
    const { W_ID } = req.body;
    const query = "SELECT * FROM campaign WHERE W_ID = ?"


    db.query(query, [U_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Locations:
//    INSERT INTO locations VALUES(L - Name, L_Description, L_ID) VALUES( �-�, �-�).
//Host variables: L_Name, L_Description.
app.post("/Locations", (req, res) => {
    const query = "INSERT INTO locations VALUES(L_Name, L_Description) VALUES( ?, ?)"

    const {
        Story,
        C_Name,
        W_ID
    } = req.body;

    db.query(query, [Story, C_Name, W_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Locations:
//    UPDATE location SET() = � �.
//    Host variables: L_Name, L_Description.
app.put("/Locations/update/:id", (req, res) => {
    
    const query = "UPDATE location SET L_Name= ?, L_Description = ? where L_ID = ?";

    const {
        Story,
        C_Name,
        C_ID
    } = req.body;

    db.query(query, [Story, C_Name, C_ID], (err, result) => {
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
    const { C_ID } = req.body;
    const query = "DELETE FROM world WHERE C_ID = ?"

    db.query(query, [L_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//------------------------------------------------------------------------------------------

//existsin:
//Display existsin:
//    SELECT e_name FROM existsin RIGHT JOIN entity ON existsin.e_id = entity.e_id WHERE s_id = #
//hostVariables = S_ID
app.get("/existsin", (req, res) => {
    const { S_ID } = req.body;
    const query = "SELECT e_name FROM existsin RIGHT JOIN entity ON existsin.E_ID = entity.E_ID WHERE S_ID = ?"


    db.query(query, [S_ID], (err, result) => {
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
    const query = "INSERT INTO existsin(E_ID, S_ID) VALUES(?, ?)"

    const {
        E_ID,
        S_ID
    } = req.body;

    db.query(query, [E_ID, S_ID], (err, result) => {
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

    const query = "DELETE FROM exists_in WHERE S_ID = ? AND E_ID = ?"

    const {
        S_ID,
        E_ID
    } = req.body;

    db.query(query, [S_ID, E_ID], (err, result) => {
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
    const { S_ID } = req.body;
    const query = "SELECT * FROM stat WHERE S_ID = ?"


    db.query(query, [S_ID], (err, result) => {
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
    const query = "INSERT INTO stat(s_name, s_value, i_id, e_id) VALUES(?, ?, ?, ?)"

    const {
        S_Name,
        S_Value,
        I_ID,
        E_ID
    } = req.body;

    db.query(query, [S_Name, S_Value, I_ID, E_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Stat:
//UPDATE stat SET S_value = ? WHERE = ?, ?
//    hostVariables = S_value, I_ID, E_ID
app.put("/Stat/update/:id", (req, res) => {
    
    const query = "UPDATE stat SET S_value = ? WHERE I_ID = ? AND E_ID = ?";

    const {
        S_Value,
        I_ID,
        E_ID
    } = req.body;

    db.query(query, [S_Value, I_ID, E_ID], (err, result) => {
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
    const { S_ID } = req.body;
    const query = "DELETE FROM stat WHERE S_ID = ?"

    db.query(query, [S_ID], (err, result) => {
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
//{�sql�:�SELECT * FROM action_ability WHERE A_Name = ?,
//�hostVariables�: [aId]}
app.get("/Action_ability", (req, res) => {
    const { A_Name } = req.body;
    const query = "SELECT * FROM action_ability WHERE A_Name = ?"


    db.query(query, [A_Name], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create Action_ability:
//{�sql�:�INSERT INTO action_ability VALUES( ?, ?)�,
//�hostVariables�: [name, value]}
app.post("/Action_ability", (req, res) => {
    const query = "INSERT INTO action_ability(A_Name, A_Value) VALUES(?, ?)"

    const {
        A_Name,
        A_Value
    } = req.body;

    db.query(query, [A_Name, A_Value], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Action_ability:
app.put("/Action_ability/update/:id", (req, res) => {
    const {
        A_Name,
        A_Value
    } = req.body;
    const query = "";


    db.query(query, [A_Name, A_Value], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete Action_ability:
//{�sql�:�DELETE FROM Action WHERE A_Name = ?�,
//�hostVariables�: [A_Name]�
app.delete("/Action_ability/delete/:id", (req, res) => {
    const { A_Name } = req.body;
    const query = "DELETE FROM Action WHERE A_Name = ?"

    db.query(query, [A_Name], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//        User:
//Display User:
//{�sql�:�SELECT u_id, nickname, email FROM  WHERE u_id = ?,
//�hostVariables�: [u_id]}
app.get("/User", (req, res) => {
    const { U_ID } = req.body;
    const query = "SELECT u_id, nickname, email FROM  WHERE u_id = ?"


    db.query(query, [U_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Create User:
//{�sql�:�INSERT INTO user VALUES( ?, ?, ?)�,
//�hostVariables�: [nickname, email, password]}
app.post("/User", (req, res) => {
    const query = "INSERT INTO user (nickname, email, password) VALUES(?, ?, ?)"

    const {
        nickname,
        email,
        password
    } = req.body;

    db.query(query, [nickname, email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update User:
//{�sql�:�UPDATE user SET?= ? WHERE = ?, ?�
//�hostVariables�: [change, changedValue, U_ID]}
app.put("/User/update/:id", (req, res) => {
    
    const query = "UPDATE user SET Nickname = ?, email = ?, Password = ? WHERE U_ID = ?";

    const {
        nickname,
        email,
        password,
        U_ID
    } = req.body;

    db.query(query, [nickname, email, password, U_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//Delete User:
//{�sql�:�DELETE FROM user WHERE U- ID = ?�,
//�hostVariables�: [U_ID]�
app.delete("/User/delete/:id", (req, res) => {
    const { U_ID } = req.body;
    const query = "DELETE FROM user WHERE U_ID = ?"

    db.query(query, [U_ID], (err, result) => {
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
    const { U_ID } = req.body;
    const query = "SELECT * FROM owns"


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
    const query = "INSERT INTO owns(E_ID, I_ID) VALUES(?, ?, ?)"

    const {
        E_ID,
        I_ID
    } = req.body;

    db.query(query, [E_ID, I_ID], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//Update Owns:
app.put("/Owns/update/:id", (req, res) => {
    
    const query = "";

    const {
        E_ID,
        I_ID
    } = req.body;

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
    
    const query = "DELETE FROM owns WHERE ? = ?"

    const {
        target,
        value
    } = req.body;

    db.query(query, [target, value], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//---------------------------------------------------------------------------------------------------------------------------------------------

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

    const {
        itemName
    } = req.body;

    db.query(query, [itemName], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

//EXAMPLE OF DELETE REQUEST
app.delete("/todos/delete/:id", (req, res) => {
    const { itemID } = req.body;
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
    const { itemID } = req.body;
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
