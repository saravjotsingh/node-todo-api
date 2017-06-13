var express = require('express');
var bodyParser = require('body-parser');
var {
    ObjectID
} = require('mongodb');
var app = express();
app.use(bodyParser.json());


var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo.js');
var {
    User
} = require('./models/user.js');


app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });


    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });


});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Please Enter a Valid ID');
        //console.log('hello');
    }

    Todo.findById({
        _id: id
    }).then((todos) => {

        if (!todos) {
            return res.status(400).send('Enter Coreect ID');
        }
         res.status(200).send({todos} );
    }).catch((e) => {
        res.status(404).send()
    });

});


app.listen(3000, () => {
    console.log('listening on port 3000');
});


module.exports = {
    app
}
