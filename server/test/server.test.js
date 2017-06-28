const expect = require('expect');
const request = require('supertest');
var {
    ObjectID
} = require('mongodb');
const {
    Todo
} = require('./../models/todo.js');
const {
    app
} = require('./../server.js');

const {User}  = require('./../models/user.js'); 

const {
    todos,
    populateTodos,
    populateUsers,
    users
} = require('./seed/seed.js');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = "Test todo text";

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });


    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();

                }).catch((e) => done(e));
            });

    });

});


describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
    })
})


describe('GET/todos/:id', () => {

    it("should return todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                expect(res.body.todos.text).toBe(todos[0].text);
            })
            .end(done);
    })

    it('should return 400 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexID}`)
            .expect(400)
            .end(done);
    });

    it('should return 404  for non object-id', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove todo', (done) => {
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.results._id).toBe(hexID);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 400 if todo not found', (done) => {
        var hexid = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexid}`)
            .expect(400)
            .end(done)
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should be updated', (done) => {
        var hexid = todos[0]._id.toHexString();
        var text = "saravjot"
        request(app)
            .patch(`/todos/${hexid}`)
            .send({
                text: text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');

            })
            .end(done);
    })

    it('should clear completedAt when todo is not completed', (done) => {
        var hexid = todos[1]._id.toHexString();
        var text = 'hello'
        request(app)
            .patch(`/todos/${hexid}`)
            .send({
                text: text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null)
            })
            .end(done);
    })


});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
    
    it('should return 401 if not autheticated',(done)=>{
        request(app)
        .get('/users/me')
        .set('x-auth','abc123')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });

});

describe('POST /users',()=>{
    it('should create a user',(done)=>{
       var email = 'patiala@gmail.com';
        var password = 'saravjot1234';
        request(app)
       .post('/users')
        .send({
            email,
            password
        })
        .expect(200)
        .expect((res)=>{
            expect(res.header['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end((err)=>{
            if(err){
                return done(err);
            }
            
            User.findOne({email}).then((user)=>{
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            })
        });
    });
    it('should return validation errors if request invalid',(done)=>{
        var email = 'example@gmail.com';
        var password = 'hel';
        request(app)
        .post('/users')
        .send({email,password})
        .expect(400)
        .end(done);
    })
    
    it('should not create user if email is in use',(done)=>{
        request(app)
        .post('/users')
        .send({
            email:users[0].email,
            password:'1234567'
        })
        .expect(400)
        .end(done);
    })
});