const express = require("express");
const cors = require("express");
const mysql = require("mysql");
const config = require("./config.json");
const app = express();
const port = 3333;
const connect = mysql.createConnection(config.DATABASE);
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("inin");
  res.send("okoko!");
});

const secretKy = "BANK";
const alg = "HS256";
const option = { expiresIn: "7d", issuer: "consolekakao", subject: "bankapp" };

const makeToken = (payload) => {
  return jwt.sign({ ...payload }, secretKy, option);
};

const decodeToken = (token) => {
  return jwt.verify(token, secretKy);
};

app.get("/select", async (req, res) => {
  const sql = `select * from user`;
  await connect.query(sql, (err, result) => {
    try {
      if (err) {
        console.log("eeeeeerr", err);
        res.send("Errrrrr", err);
      }

      console.log(result);
      res.send(result);
    } catch (e) {
      console.log("Eeeeeeedafasf", e);
    }
  });
});

app.post("/signin", async (req, res) => {
  const { id, password } = req.body;
  if (!(id && password)) {
    console.log("필수값이 없음.");
    res.send("필수값이 없음.");
    return;
  }

  await connect.query(
    `select * from user where id="${id}" and password="${password}"`,
    (err, result) => {
      if (err) {
        console.log("eeeeeerr", err);
        res.send("Errrrrr", err);
        return;
      }
      if (result.length !== 1) {
        console.log("not invaild user info");
        res.send("로그인 실패");
        return;
      }
      console.log(result);

      res.send(makeToken(result[0]));
    }
  );
});

app.post("/signup", async (req, res) => {
  console.log("sign up", req.body);
  const { id, password, name } = req.body;
  if (!(id && password && name)) {
    console.log("필수값이 없음.");
    res.send("필수값이 없음.");
    return;
  }
  const sql = `select count(*) as cnt from user where id="${req.body.id}"`;
  try {
    await connect.query(sql, (err, result) => {
      if (err) {
        console.log("eeeeeerr", err);
        res.send("Errrrrr", err);
      }

      if (result[0].cnt === 0) {
        console.log("Success Join Us new User");
        connect.query(
          `insert into user (id, password, name) values ("${id}", "${password}", "${name}")`
        );
        res.send("회원가입 완료");
      } else {
        console.log("Already Exist Id");
        res.send("중복이라 안됨!");
      }
    });
  } catch (e) {
    console.log("EEEERr", e);
  }
});

app.listen(port, () => {
  console.log("server open! for " + port);
});
