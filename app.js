

const express = require("express");
const app = express();

app.use(express.json());


let products = []
//an array of objects
//each object contains: product name, quantity, and alert threshold


app.post("/products", (req,res) => {
    //called when changes are made to inventory

    products.forEach(product => {
        if (product.name === req.body.name) {
            //if item is in list, updates values 
            product.quantity === req.body.quantity;
            product.alert_threshold === req.body.alert_threshold;
        }
        else {
            //adds object into list if did not exist before
            products.push(req.body);
        }
    });

    console.log("Products: ", products)
    res.send("Inventory processed!")

});



app.post("/restock", (req, res) => {
    const messages = []


    products.forEach(product => {
        if (product.quantity <= product.alert_threshold) {

            messages.push(`RESTOCK ${product.name}, CURRENT QUANTITY: ${product.quantity}`);
            console.log(rule.message);           

        }
    });

    if (messages.length === 0) {
        res.send("No items need to be restocked");
    }
    else {
        res.send(`The following items need to be restocked: ${messages}`);
    }

    res.send("Event processed");
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});