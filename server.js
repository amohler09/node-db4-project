const express = require("express");

const db = require("./data/db-config");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "API Running " });
});

module.exports = server;
