var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://haran:selvaraj@haran-v98ur.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err
    } else {
        console.log('MongoDb Connected');
        
    }
});

//schema

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);

var logSchema = new mongoose.Schema({
    item: String,
    price: Number,
    img: String

});

var cakes = mongoose.model('cakes',logSchema);

// var item = Todo({ item: 'hi,good morning' }).save( (err) => {
//     if (err) {
//         throw err
//     } else {
//         console.log('stored');
        
//     }
    
// });

// var data = [ {item: 'get milk' },{item: 'study for test'},{item: 'write home work'} ]

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {

app.get('/',(req,res) => {

    Todo.find({},(err,data) => {
        if(err){
            throw err
        }else{
            res.render('todo',{todos: data});
        }
    });
    

});

app.get('/login',(_req,res) => {    
    res.render('login')
});

app.post('/login',(req,res) =>{
    var login = cakes(req.body).save((err,data) => {
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    });
});

app.post('/',urlencodedParser, (req,res) => {
    console.log(req.body);

    var newTodo = Todo(req.body).save((err,data) => {
        if(err){
            throw err;
        }
        else{
            res.json(data);
        }
    });
    
    // data.push(req.body);
    // res.json(data);

});

app.delete('/todo/:item',(req,res) => {
    Todo.deleteOne({item: req.params.item.replace(/-/g," ")}, (err,data) => {
        if(err){
            throw err;
        }else{
            res.json(data);
            console.log('Deleted ' + JSON.stringify(data));
            
        }
    })

});

};