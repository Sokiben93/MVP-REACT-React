const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const pool = require("./configs/database");
pool.connect((err) => {
  //Connected Database
  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});

/*---------- middleware -----------*/
app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

///////////////////////////////////////////////////////
/* ------------------------- CRUD ---------------------- */
/* --------------- GET ALL POSTS -------------------------- */
app.get("/posts", async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query("SELECT * FROM posts;");
    res.send(data.rows);
  } catch (err) {
    res.send("Error " + err);
  }
});
/* --------------- GET A POST -------------------------- */
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const data = await client.query(
      `SELECT * FROM posts WHERE post_id = $1`,
      [id]
    );
    res.status(200).send(data.rows[0]);
  } catch (err) {
    console.log("Internal Server Error");
    res.status(500).send(err);
  }
});
/* ---------------- CREATE A POST -------------------------- */
app.post("/posts", async (req, res) => {
  try {
    const { title, comment, mail, user_id } = req.body;
    // console.log("comment", comment);
    const client = await pool.connect();
    const { rows } = await client.query(
      `INSERT INTO posts (title, comment, mail, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [title, comment, mail, user_id]
    );
    console.log("result:", rows[0]);
    res.status(200).send(rows[0]);
  } catch (err) {
    console.log("Internal Server Error");
    res.status(500).send(err);
  }
});

///////////////////////////////////////////////////////
/* ---------------- GET A COMMENT FROM POST -------------------------- */
app.get("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const client = await pool.connect();
    const data = await client.query(
      `SELECT * FROM comments WHERE post_id = $1`,
      [postId]
    );
    console.log("Comment singel result:", data.rows);
    res.status(200).send(data.rows);
  } catch (err) {
    console.log("Internal Server Error");
    res.status(500).send(err);
  }
});
/* ----------------- POST A COMMENT -------------------------- */
app.post("/comments", async (req, res) => {
  try {
    const { commentofpost, post_id} = req.body;
    console.log('test',req.body)
    console.log("comment test", typeof commentofpost);
    console.log("post ID test", post_id);
    const {rows} = await pool.query(`INSERT INTO comments (commentofpost, post_id) VALUES ($1, $2) RETURNING *;`, [commentofpost, post_id])
    console.log("Comment result:", rows[0]);
    res.status(200).send(rows[0])
  } catch (err) {
    console.log("Internal Server Error");
    res.status(500).send(err);
  }
})
/* --------------- DELETE A COMMENT FROM POST -------------------------- */
app.delete("/comments/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const client = await pool.connect();
    const data = await client.query(
      `DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
      [commentId]
    );
    console.log("Comment delete results:", data.rows[0]);
    res.status(200).send(data.rows[0]);
  } catch (err) {
    console.log("Internal Server Error");
    res.status(500).send(err);
  }
})
/* -------------- UPDATE A COMMENT FROM POST -------------------------- */
//////////////////////////////////////////////////////////////
/* -------------------- REGISTER -------------------------- */
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    const data = await client.query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );
    if (data.rows.length === 0) {
      pool.query(
        `INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *;`,
        [username, password]
      );
      console.log("Pass:", password);
      return res
        .status(201)
        .send(`Thank you ${username}. Your account is ready!!`);
    } else {
      res.status(400).send("Your Username already exists!");
    }
  } catch (err) {
    res.send("Error" + err);
  }
});
/* -------------------- LOGIN -------------------------- */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    const data = await client.query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );
    if (password === data.rows[0].password) {
      console.log("Data:", data.rows[0]);
      console.log("Password:", password);
      // console.log('Pass:', data.rows[0].password)
      return res.send("User signed in!");
    } else {
      return res.status(401).send("Invalid username or password!!!");
    }
  } catch (err) {
    res.send("User is not registered, Sign Up first!");
  }
});

// handle all unknown HTTP requests
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
