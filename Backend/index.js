const express = require('express');
const cors = require("cors");
require('./db/config')
const user = require('./db/User');
const Product = require('./db/Product')
const User = require('./db/User');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();


app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result=result.toObject();
    delete result.password
    //res.send(result);
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result : "somwthing went wrong,try after some time"})
        }
        res.send({result,auth:token})
    })
})

app.post("/login", async (req, res) => {

    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result : "somwthing went wrong,try after some time"})
                }
                res.send({user,auth:token})
            })
            
        } else {
            res.send({ result: 'No user found' })
        }
    }else {
        res.send({ result: 'No user found' })
    }
});

app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
});

app.get("/products",async(req,res)=>{
    let products = await Product.find();
    if(products.length > 0){
        res.send(products)
    }else{
        res.send({result:"No Products Found"})
    }
});

app.delete("/product/:id",async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})

app.put("/product/:id",async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    res.send(result)
});

app.get("/product/:id",async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({result:"No Record Found"})
    }
})

app.get("/search/:key",async(req,res)=>{
    let result =await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {userId:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    res.send(result)
})

app.listen(5000);