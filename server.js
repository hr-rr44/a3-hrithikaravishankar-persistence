const express = require( 'express' );
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const mime = require("mime");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// models
const User = require("./models/User");
const Item = require("./models/Item");

//connecting to mongodb
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
.then(() => console.log("connected to mongodb!"))
.catch(err => {
  console.error("Oops... there is a database connection error:", err);
  process.exit(1);
});

// Middleware
app.use( express.json()) // parsing
app.use(express.urlencoded({ extended: true }));

//sessions stored in mongodb
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoUri, collectionName: "sessions" }),
  cookie: { 
    httpOnly: true, 
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));


let groceryList = []

// ---------------------
// ------ Routes ------
// ---------------------

// GET "/" --> show login page unless logged in
app.get("/", (req, res) => {
  if (req.session.userId) return res.redirect("/app");
  res.sendFile(path.join(__dirname, "public", "login.html"));  
});

// GET "/app" --> main grocery app (requires login)
app.get("/app", (req, res) => {
  if (!req.session.userId) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST "/login" --> create account if new user; otherwise check password
app.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  // user needs to input
  if (!username || !password) { 
    return res.status(400).json({ ok: false, message: "Username and password required" });
  }

  // try to find a user with the username inputted in the database
  try {
    let user = await User.findOne({ username });
    // if no user is found, create a new one
    if (!user) {
      user = new User({ username, password });
      await user.save();
      req.session.userId = user._id;
      return res.json({ ok: true, created: true });
    }

    //if user exists, compare passwords; if wrong, return error
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ ok: false, message: "Incorrect password" });

    req.session.userId = user._id;
    return res.json({ ok: true, created: false });
  } catch (err){
    console.error(err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// POST "/logout" --> clear session
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ ok: false });
    res.clearCookie()
    res.json({ ok: true });
  });
});

// ---------------------
// ------ END ------
// ---------------------
//middleware to require login
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ ok: false });
  next();
}

// items API

// GET /items --> fetch all items
app.get("/items", requireAuth, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// POST /submit --> add new item
app.post("/submit", requireAuth, async (req, res) => {
  const { item, category, expirationDate, urgent } = req.body;

  if (!item || !category || !expirationDate) { 
    return res.status(400).json({ ok: false, message: "Missing fields" }); 
  }

  try {
    const now = new Date();
    const expDate = new Date(expirationDate);
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysUntilExpiration = Math.ceil((expDate - now) / msPerDay);

    await new Item({
      userId: req.session.userId,
      item,
      category,
      expirationDate,
      daysUntilExpiration,
      urgent: !!urgent
    }).save();

    const items = await Item.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// POST /delete -->a delete item
app.post("/delete", requireAuth, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ ok: false, message: "Missing id" });

    await Item.deleteOne({ _id: id, userId: req.session.userId });
    const items = await Item.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// POST /update --> update item
app.post("/update", requireAuth, async (req, res) => {
  try {
    const { id, item, category, expirationDate, urgent } = req.body;
    const update = {};
    if (item) update.item = item;
    if (category) update.category = category;
    if (expirationDate) {
      update.expirationDate = expirationDate;
      const now = new Date();
      const expDate = new Date(expirationDate);
      const msPerDay = 1000 * 60 * 60 * 24;
      update.daysUntilExpiration = Math.ceil((expDate - now) / msPerDay);
    }

    if (urgent !== undefined) update.urgent = urgent;


    await Item.updateOne({ _id: id, userId: req.session.userId }, { $set: update });
    const items = await Item.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err){
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

// ---------------------
// ------ END ------
// ---------------------

// ---------- Static Files ----------
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => res.redirect("/"));

// start server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});