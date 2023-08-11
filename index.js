
let express = require("express");
const productsDataScheme = require("./models/productsData");
let mongoDB = require("./database/connection");
let cors = require("cors");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
let mrgn = require("morgan");

let port = 3000 ;

//log request
app.use(mrgn("dev"));


let data = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    price: 1000
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    price: 2000
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    price: 3000
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    price: 4000
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    price: 5000
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    email: "Karley_Dach@jasper.info",
    price: 6000
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    email: "Telly.Hoeger@billy.biz",
    price: 7000
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    email: "Sherwood@rosamond.me",
    price: 8000
  },
  {
    id: 9,
    name: "Glenna Reichert",
    email: "Chaim_McDermott@dana.io",
    price: 9000
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    email: "Rey.Padberg@karina.biz",
    price: 10000
  }
]

let dataAdded = async() => {
  productsDataScheme.create(data)
  .then(savedInstances => {
      console.log("Data created:", savedInstances);
    })
    .catch(error => {
        console.error("Error creating data:", error);
    });
}



// Create  products
app.post("/create", async (req, res) => {
  try {
    const product = new productsDataScheme(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product." });
  }
});


// Get all products
app.get("/get", async (req, res) => {
  try {
    const products = await productsDataScheme.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});



// Get a specific product by ID
app.get("/get/:id", async (req, res) => {
  try {
    const product = await productsDataScheme.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product." });
  }
});



// Update a product
app.put("/update/:id", async (req, res) => {
  try {
    const product = await productsDataScheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product." });
  }
});



// Delete a product
app.delete("/delete/:id", async (req, res) => {
  try {
    const product = await productsDataScheme.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product." });
  }
});



const start = async () => {
  try {
      await mongoDB();
      // await dataAdded()
      app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
      });
  } catch (error) {
      console.log(error);
      console.log("Failed to connect to the database, server is not running.");
  }
};

start();