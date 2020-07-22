const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const store_a = require('./models/store_A');
const store_b = require('./models/store_B');
const store_c = require('./models/store_C');
const user = require('./models/user');

const app = express();
const hostName = 'localhost';
const port = process.env.port || 4000 ;
const jsonParser = bodyParser.json();
const URI = "mongodb+srv://ravindra281298:ravindra281298@devconnector-pxenm.mongodb.net/store?retryWrites=true&w=majority";



mongoose.connect( URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get('/',(req,res) =>{

    let result = [];

    store_a.find({}, (err,docs) => {
        if(err) res.send(err);
        else result.push(docs);
    })

    store_b.find({}, (err,docs) => {
        if(err) res.send(err);
        else result.push(docs);
    })

    store_c.find({}, (err,docs) => {
        if(err) res.send(err);
        else result.push(docs);
        res.send(result);
    })
});






app.post('/', jsonParser, (req,res) => {
    let query = req.body.name;
    query=query.replace(' ','|');
    const result = {
        "Most_popular": {name:'Item is not Available', rating:0,},
        "Economical": {name:'Item is not Available', price:-1},
        "You_might_like": {name:'You have not tried it before',rating:-1}
    }

    store_a.find({ name: {$regex: query, $options: 'i'}}, (err,docs) => {
        if(err) res.send(err);
        else{
            docs.map(item => {
                if(item.rating>result.Most_popular.rating){
                    result.Most_popular=item;
                }
                if(item.price<result.Economical.price || result.Economical.price==-1){
                    result.Economical=item;
                }
            })
            // console.log(result);
        }
    })

    store_b.find({ name: {$regex: query, $options: 'i'}}, (err,docs) => {
        if(err) res.send(err);
        else{
            docs.map(item => {
                if(item.rating>result.Most_popular.rating){
                    result.Most_popular=item;
                }
                if(item.price<result.Economical.price || result.Economical.price==-1){
                    result.Economical=item;
                }
            })
            // console.log(result);
        }
    })

    store_c.find({ name: {$regex: query, $options: 'i'}}, (err,docs) => {
        if(err) res.send(err);
        else{
            docs.map(item => {
                if(item.rating>result.Most_popular.rating){
                    result.Most_popular=item;
                }
                if(item.price<result.Economical.price || result.Economical.price==-1){
                    result.Economical=item;
                }
            })
            // res.send(result);
        }
    })

    user.find({ name: {$regex: query, $options: 'i'}}, (err,docs) => {
        if(err) res.send(err);
        else{
            docs.map(item => {
                if(item.rating>result.You_might_like.rating){
                    result.You_might_like=item;
                }
            })
            res.send(result);
        }
    })
})



app.listen(port,hostName, () =>{
    console.log(`listening at http://${hostName}:${port}`);
});
