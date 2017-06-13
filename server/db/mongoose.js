const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {
    mlab : "mongodb://<todoapi>:<saravjot>@ds125262.mlab.com:25262/todoapi",
    local : 'mongodb://localhost:27017/TodoApp'
}

mongoose.connect("mongodb://<todoapi>:<saravjot>@ds125262.mlab.com:25262/todoapi");

module.exports = {mongoose}
