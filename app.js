

const express = require("express");
const app = express();

app.use(express.json());


let products = []
//an array of objects
//each object contains: product name, quantity, and alert threshold



app.post("/products", (req, res) => {
    const items = Array.isArray(req.body) ? req.body : [req.body]; // array of products

    items.forEach(item => {

        if (!item.name || item.quantity == null || item.alert_threshold == null) {
            return res.status(400).send("Missing required fields");
        }

        const existing = products.find(p => p.name === item.name);

        if (existing) {
            existing.quantity = item.quantity;
            existing.alert_threshold = item.alert_threshold;
        } else {
            products.push(item);
        }
    });

    res.send("Inventory processed!");
});


app.post("/restock", (req, res) => {
    const messages = []


    products.forEach(product => {
        if (product.quantity <= product.alert_threshold) {

            messages.push(`RESTOCK ${product.name}, CURRENT QUANTITY: ${product.quantity}`);
             

        }
    });

    if (messages.length === 0) {
        res.send("No items need to be restocked");
    }
    else {
        res.send(`The following items need to be restocked: ${messages}`);
    }

});



if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;