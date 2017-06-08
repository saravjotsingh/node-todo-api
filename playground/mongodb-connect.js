const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
//        db.collection('Todos').insertOne({
//            text:'Something to do',
//            completed : false
//        },(err,result)=>{
//            if(err){
//                return console.log('Unable to insert todos',err);
//            }
//           
//            console.log(JSON.stringify(result.ops,undefined,2));
//        });
//    
    
    db.collection('Todos').insertOne({
        name:'Saravjot',
        age:19,
        location:'Patiala,Punjab,India'
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert to users',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    })
    
    db.close();
});