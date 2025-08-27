require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute.js");

const cors = require("cors");
const {HoldingsModel} = require("./model/HoldingsModel.js");
const {PositionsModel} = require("./model/PositionsModel.js");
const {OrdersModels} = require("./model/OrdersModels.js")


const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;
const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());




// app.get("/AddPostions",async(req,res) => {
//   let tempHolding = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
//  tempHolding.forEach((item) => {
//    let Position = new PositionsModel({
//     product: item.product,
//     name: item.name,
//     qty: item.qty,
//     avg: item.avg,
//     price: item.price,
//     net: item.net,
//     day: item.net,
//     isLoss: item.true,
//    });

//    Position.save();
//  });
//  res.send("Done posting");
// });

// connect Database 
mongoose.connect(URL)
.then(() => {
  console.log(`DB Connected!`);
})
.catch((err) => {
  console.log(err.message)
})

app.get("/allHoldings", async(req,res) => {
  let allHolding = await HoldingsModel.find({});
  res.json(allHolding);
});

app.get("/allPostings", async(req, res) => {
  let allPostings = await PositionsModel.find({});
  res.json(allPostings);
});

app.post("/newOrder", async(req,res) => {
    let newOrder = new OrdersModels({
      name: req.body.name,
      qty: req.body.qty,
      price:req.body.price,
      mode: req.body.mode,
    });

    newOrder.save();
    res.send("Order saved ");

});
app.use("/auth/user", authRoute);



app.listen(PORT, () => {
  console.log(`App started ! ${PORT} `);
  
  
});


//https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/#heading-how-to-set-up-mongodb