const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable To connect to MongoDB server');
    }
    console.log('connected To mongodb server');

    //    db.collection('Todos').find({
    //        _id: new ObjectID('59350147b5eb2d0b788b32ef'/)
    //    }).toArray().then((docs) => {
    //        console.log('Todos');
    //        console.log(JSON.stringify(docs, undefined, 2));
    //
    //
    //    }, (err) => {
    //        console.log('Unable to fetch data', err);
    //    });

    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count:', count);
        //console.log(JSON.stringify(docs, undefined, 2));


    }, (err) => {
        console.log('Unable to fetch data', err);
    });

    // Mongodb.close();
});
