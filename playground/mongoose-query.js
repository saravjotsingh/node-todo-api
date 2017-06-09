var {
    ObjectID
} = require('mongodb')


var {
    mongoose
} = require('./../server/db/mongoose.js');
var {
    Todo
} = require('./../server/models/todo.js');
var {
    User
} = require('./../server/models/user.js');

var _id = '5936d86173503100d4ef8437';

//if(!ObjectID.isValid(id)){
//    return console.log('Not Valid ID');
//}

//
//Todo.find({
//    _id : id
//}).then((todos)=>{
//    console.log('Todos',JSON.stringify(todos,undefined,2))
//});
//
//
//Todo.findOne({
//    _id : id
//}).then((todo)=>{
//    console.log('Todo',todo)
//});

//Todo.findById(id).then((todo)=>{
//    if(!todo){
//        return console.log('Id Not found');
//    }
//    console.log('Todo by id',todo);
//}).catch((e)=>{console.log(e)});
//

User.findById({_id}).then((user) => {
    if(!user){
        return console.log(e);
    }
    console.log(user);
}).catch((e)=>{console.log(e)});
