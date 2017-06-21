const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id:10
};

var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);

//var message = "I m saravjot";
//var hash = SHA256(message).toString();
//
//console.log(`Message ${message}`);
//console.log(`Hash ${hash}`);
//
//var data = {
//    id:4
//}
//
//var token = {
//    data,
//    hash:SHA256(JSON.stringify(data) + 'somesecret').toString()
//}
//
//
////this line changed the value of data so as hash also changed
////token.data.id = 3;
////token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//var resulthash = SHA256(JSON.stringify(token.data)+"somesecret").toString();
//
//if(resulthash===token.hash){
//    console.log('Data Not change');
//}else{
//    console.log('Data changed');
//}