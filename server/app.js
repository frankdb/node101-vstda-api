const express = require("express");
const morgan = require("morgan");

const app = express();

const mockData = [
  {
    todoItemId: 0,
    name: "an item",
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: "another item",
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: "a done item",
    priority: 1,
    completed: true
  }
];

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.get("/api/TodoItems", (req, res) => {
  res.send(mockData);
});

app.get("/api/TodoItems/:number", (req, res) => {
  let id = req.params.number;
  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i]["todoItemId"] == id) {
      res.send(mockData[i]);
    }
  }
});

app.post("/api/TodoItems/", (req, res) => {
  let newItem = {
    todoItemId: 0,
    name: "Bob",
    priority: 4,
    completed: false
  };

  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i]["todoItemId"] == newItem["todoItemId"]) {
      mockData[i] = newItem;
      return res.status(201).send(newItem);
    }
  }
  mockData.push(newItem);
  return res.status(201).send(newItem);
});

app.delete("/api/TodoItems/:number", (req, res) => {
  let id = req.params.number;
  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i]["todoItemId"] == id) {
      let deletedFile = mockData[i];
      mockData.splice(i, 1);
      res.send(deletedFile);
    }
  }
});

module.exports = app;
