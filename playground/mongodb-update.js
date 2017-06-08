const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable To connect to MongoDB server');
    }
    console.log('connected To mongodb server');

    
//    db.collection('Todos').findOneAndUpdate({
//        _id:new ObjectID('59350147b5eb2d0b788b32ef')
//    },{
//        $set:{
//             completed:true  
//        }
//    },{
//        returnOriginal:false
//    }).then((result)=>{
//      console.log(result);  
//    })
//   
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('593667d1c81c5e2518e173b6')
    },{
        $set:{
            name:'Sarav'
        },
        $inc:{
            age:-2
        }
        
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })
    
    
    //db.close();
});
