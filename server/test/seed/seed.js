const {
    ObjectID
} = require('mongodb');
const {
    Todo
} = require('./../../models/todo.js');

const {
    User
} = require('./../../models/user.js');
const jwt = require('jsonwebtoken');

var userOne = new ObjectID();
var userTwo = new ObjectID();


const todos = [{
    _id: new ObjectID(),
    text: 'Hello there',
    _creator:userOne
}, {
    _id: new ObjectID(),
    text: 'Bye there',
    completed: true,
    completedAt: 333,
    _creator:userTwo
}]



const users = [{
        _id: userOne,
        email: 'saravjot@gmail.com',
        password: 'abc12345',
        tokens: [{
            access: 'auth',
            token:jwt.sign({
                _id: userOne,
                access: 'auth'
            }, process.env.JWT_SECRET).toString()
    }]
},{
    _id: userTwo,
    email: 'sarav@gmail.com',
    password: '1234abc',
    tokens: [{
            access: 'auth',
            token:jwt.sign({
                _id: userTwo,
                access: 'auth'
            }, process.env.JWT_SECRET).toString()
    }]

}];





const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();
        return Promise.all([user1,user2])
        
    }).then(()=>done());
}


module.exports = {
    todos,
    populateTodos,
    populateUsers,
    users
};
