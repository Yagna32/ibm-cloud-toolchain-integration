
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var products = [
    { id:1,name:'abc' },
    { id:2,name:'xyh'},
    { id:3,name:'bnmf'},
    { id:4,name:'ytyt'}
];
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public'));
  });

  app.get('/api/all', (req, res) => {
    res.send(products);
})
app.post('/api/get', async(req, res) => {
    const product = await products.find(({ id }) => id == req.body.id);

    if (!product)
        res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(product);
});

app.post('/api/students', async(req, res) => {
    console.log(req.body.id);
 var product = {
        id: req.body.id,
        name: req.body.name,
        //fn: req.body.fn,
        //ln: req.body.ln,
        //branch: req.body.branch,
        //sub: req.body.sub
    };
    await products.push(product);
    res.send(product);
});

app.post('/api/put', async(req, res) => {
 var product = await products.find(({ id }) => id == req.body.id);
    if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
    product.name = req.body.name;
    //product.fn = req.body.fn;
    //product.ln = req.body.ln;
    //product.branch = req.body.branch;
    //product.sub = req.body.sub;
    res.send(product);
});

app.post('/api/delete', async(req, res) => {

 const product = await products.find(({ id }) => id == req.body.id);
    if (!product) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});

app.listen(port);
