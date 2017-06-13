const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = {
    mlab : "mongodb://<todoapi>:<saravjot>@ds125262.mlab.com:25262/todoapi",
    local : "mongodb://localhost:27017/TodoApp"
}

mongoose.connect(process.env.PORT ? db.mlab : db.local);

module.exports = {mongoose}
