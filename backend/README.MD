### SIGNUP
### ADMIN
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"example mail.com","password":"password","type":"admin"}' http://localhost:3000/register

curl -X POST -H "Content-Type: application/json" -d '{"email":"example.com"}' http://localhost:3000/mfaverify

### USER
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"example mail.com","password":"password","type":"user"}' http://localhost:3000/register

curl -X POST -H "Content-Type: application/json" -d '{"email":"examplemail.com"}' http://localhost:3000/mfaverify

### LOGIN
### ADMIN
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"example.com","password":"password","type":"admin","verificationcode":"235296"}' http://localhost:3000/login

### USER
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"example.com","password":"password","type":"user","verificationcode":"345152"}' http://localhost:3000/login

### GET USER
### SINGLE USER BY ID
 curl -H "Authorization:Bearer token" http://localhost:3000/getSingleUser?userId=1


### MULTIPLE USER
curl -H "Authorization:Bearer  token"  http://localhost:3000/getAllUserList


### FOR GRAPHQL
### CURD USING THIS CURL .

curl -X POST -H "Content-Type: application/json" -d '{"query": "mutation { createBook(title: \"New Book\", author: \"Author Name\",description:\"user\",price:12.45) { id title author }}" }' http://localhost:3000/graphql

curl -X POST -H "Content-Type: application/json" -d '{"query": "{ books { id title author }}" }' http://localhost:3000/graphql

curl -X POST -H "Content-Type: application/json" -d '{"query": "{ book(id: \"1\") { id title author }}" }' http://localhost:3000/graphql


curl -X POST -H "Content-Type: application/json" -d '{"query": "{ book(id: \"1\") { id title author }}" }' http://localhost:3000/graphql

curl -X POST -H "Content-Type: application/json" -d '{"query": "mutation { deleteBook(id: \"1\") {message }}" }' http://localhost:3000/graphql 
