const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const key = "digitalflake";

app.use(express.static("public"));
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : 'root',
    database : 'digitalflake'
})

app.get("/categories", (req, res) => {
    const sql = "select * from category";
    db.query(sql, (err, data) => {
        if(err)
        {
            return res.json(err);
        }
        return res.json(data);
    });
})


// Route for Login API
app.post("/", async (req, res) => {
  if (req.body.email && req.body.password) 
  {
    const sql = "select uid from users where email = '"+req.body.email+"' and password = '"+req.body.password+"'";

    db.query(sql, (err, result) => {
      if(err)
      {
        res.send({ message: "Invalid Credentials" });
      }else 
      {
        jwt.sign({ result }, key, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            console.log(err);
            res.send({ message: "Something went wrong" });
          } else {
            res.send({ result, token });
          }
        });
      }
    });
  } else {
    res.send({ message: "All fields are required" });
  }
});

// Route forAdding New Category API
app.post("/add-category", verifyToken, async (req, res) => {

  const sequence = req.body.sequenceNumber;
  const name = req.body.name;
  const sql = `INSERT INTO category (cname, sequence) VALUES ('${name}', ${sequence})`;
 
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Database error", error: err });
    }
    res.send({ message: "Category added successfully", result });
  });
  
});

// Route forAdding New SubCategory API
app.post("/add-Subcategory", verifyToken, async (req, res) => {
  const sequence = req.body.sequenceNumber;
  const scname = req.body.subCategoryName;
  const cname = req.body.categoryName;

  // First query to get cid based on cname
  const sql2 = `SELECT cid FROM category WHERE cname = '${cname}'`;

  db.query(sql2, (err, result) => {
    if (err) {
      console.log("error");
      return res.status(500).send({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(400).send({ message: "Category not found" });
    }

    const ncid = result[0].cid;

    // Second query to insert into subcategory
    const sql = `INSERT INTO subcategory (scname, sequence, cid) VALUES ('${scname}', ${sequence}, ${ncid})`;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Database error", error: err });
      }
      res.send({ message: "Subcategory added successfully", result });
    });
  });
});


// Route for Category List API
app.get("/category-list", verifyToken, async (req, res) => 
{
  const sql = "select * from category";

  db.query(sql, (err, data) => {
      if(err)
      {
          return res.send(err);
      }
      else
      {
        // console.log(data);
        return res.send(data);
      }
  });

});

// Route for SubCategory List API
app.get("/subCategory-list", verifyToken, async (req, res) => 
{
  const sql = "select subcategory.*, category.cname from subcategory inner join category on subcategory.cid = category.cid";

  db.query(sql, (err, data) => {
      if(err)
      {
          return res.send(err);
      }
      else
      {
        // console.log(data);
        return res.send(data);
      }
  });

});

// Route for Delete Particular Category API
app.delete("/delete-category/:id", verifyToken, async (req, res) => 
{

  const id = req.params.id;

  const sql = "delete from category where cid = "+id;

  db.query(sql, (err, data) =>{
    if(err)
    {
      return res.send(err);
    }
    return res.send(data);
  })
});


// Route for Delete Particular SubCategory API
app.delete("/delete-subCategory/:id", verifyToken, async (req, res) => 
{
  const id = req.params.id;
  const sql = "delete from subcategory where sid = "+id;

  db.query(sql, (err, data) =>{
    if(err)
    {
      return res.send(err);
    }
    return res.send(data);
  })
});

// // Route for Adding New Product API
// app.post("/add-product", verifyToken, async (req, res) => {
//   let product = new Product(req.body);
//   let result = await product.save();
//   res.send(result);
// });

// // Route for Product List API
// app.get("/product-list", verifyToken, async (req, res) => {
//   let product = await Product.find();
//   res.send(product);
// });

// // Route for Delete Particular Product API
// app.delete("/delete-product/:id", verifyToken, async (req, res) => {
//   let result = await Product.deleteOne({ _id: req.params.id });
//   res.send(result);
// });

// Function for verifying token
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, key, (err, valid) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      }
    });
  } else {
    res.status(401).send({ message: "Please provide token" });
  }
  next();
}
app.listen(5000, () =>{
    console.log("Listning on port 5000");
});
