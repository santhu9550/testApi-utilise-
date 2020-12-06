const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

router.post("/", async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

router.get("/list", async (req, res) => {
  const orders = await Orders.find();
  if (!orders) {
    res.send("No Orders Found");
  }
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  try {
    const orders = await Orders.findOne({ _id: req.params.id });
    if (!orders) {
      res.send("No Orders Found");
    }
    res.send(orders);
  } catch (err) {
    res.send(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const order = await Orders.findOne({ _id: req.params.id });
    if (!order) {
      res.send("No Orders Found");
    }
    const { customer_name, customer_email, product, quantity } = req.body;
    if (customer_name) {
      order.customer_name = customer_name;
    }
    if (customer_email) {
      order.customer_email = customer_email;
    }
    if (product) {
      order.product = product;
    }
    if (quantity) {
      order.quantity = quantity;
    }
    order
      .save()
      .then((data) => res.json({ msg: "Order Updated" }))
      .catch((err) => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Orders.findOne({ _id: req.params.id });
    if (!order) {
      res.send("No Orders Found");
    }
    await order.remove();
    res.send("deleted");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
