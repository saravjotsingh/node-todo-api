const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to mongodb Server',err);
    }
    
    console.log('connected to Server');
    
    //deleteMany
    
//    db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
//        console.log(result);
//    })
//    
    
//    db.collection('users').findOneAndDelete({_id : new ObjectID('593503130c8df305b02d5b89')}).then((results)=>{
//        console.log(results);
//    });
//    
    //deleteOne
    
//    db.collection('Todos').deleteOne({text:'Eat lunch'}).then((results)=>{
//        console.log(results);
//    })
//    
    
    
    //findOneAndDelte
    
    db.collection('Todos').findOneAndDelete({completed:false}).then((results)=>{
        console.log(results);
    }); 
    
    
    
})