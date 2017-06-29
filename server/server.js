var env = process.env.NODE_ENV || 'development';
console.log('env*****', env);
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp"
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest"
}


const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {
    ObjectID
} = require('mongodb');
var app = express();
app.use(bodyParser.json());

var port = process.env.PORT;

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo.js');
var {
    User
} = require('./models/user.js');


var {
    authenticate
} = require('./middleware/authenticate.js')



app.post('/todos',authenticate,(req, res) => {

    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        _creator:req.user._id
    });


    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', authenticate,(req, res) => {
    Todo.find({
        _creator:req.user._id
    }).then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });


});

app.get('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Please Enter a Valid ID');
        //console.log('hello');
    }

    Todo.findOne({
        _id: id,
        _creator:req.user._id
    }).then((todos) => {

        if (!todos) {
            return res.status(400).send('Enter Coreect ID');
        }
        res.status(200).send({
            todos
        });
    }).catch((e) => {
        res.status(404).send()
    });

});

app.delete('/todos/:id', authenticate,(req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Please Enter a Valid ID');

    }

    Todo.findOneAndRemove({
        _id: id,
        _creator:req.user._id
    }).then((results) => {

        if (!results) {
            return res.status(404).send('No Document found');
        }

        res.status(200).send({
            results
        });
    }, (e) => {
        res.status(400).send(e);
    });


});


app.patch('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Please Enter a Valid ID');

    }

    if (_.isBoolean(body.completed) && (body.completed)) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    }, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(400).send('Data not found');
        }
        res.status(200).send({
            todo
        });
    }, (e) => {
        res.status(400).send(e);
    })


});



app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        return res.status(400).send(e);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login',(req,res)=>{
   var body = _.pick(req.body,['email','password']);
    
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
          res.header('x-auth', token).send(user);   
        });
//        res.send(user);
    }).catch((e)=>{
        res.status(400).send(e);   
    })
//    res.send(body); 
    
    
});

app.delete('/users/me/token',authenticate,(req,res)=>{
   req.user.removeToken(req.token).then(()=>{
       res.status(200).send();
   },()=>{
       res.status(400).send();
   }) 
});


app.listen(port, () => {
    console.log(`listening ${port} this`);
});


module.exports = {
    app
}
