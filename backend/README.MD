### SIGNUP
### ADMIN
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"usersurname@example8897yopmail.com","password":"secretpassword211","type":"admin"}' http://localhost:3000/register

curl -X POST -H "Content-Type: application/json" -d '{"email":"usersurname@example8897yopmail.com"}' http://localhost:3000/mfaverify

### USER
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"usersurname@example789yopmail.com","password":"secretpassword211","type":"user"}' http://localhost:3000/register

curl -X POST -H "Content-Type: application/json" -d '{"email":"usersurname@example789yopmail.com"}' http://localhost:3000/mfaverify

### LOGIN
### ADMIN
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"usersurname@example8897yopmail.com","password":"secretpassword211","type":"admin","verificationcode":"235296"}' http://localhost:3000/login

### USER
curl -X POST -H "Content-Type: application/json" -d '{"name":"user surname11","email":"usersurname@example789yopmail.com","password":"secretpassword211","type":"user","verificationcode":"345152"}' http://localhost:3000/login

### GET USER
### SINGLE USER BY ID
 curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcnN1cm5hbWVAZXhhbXBsZTc4OXlvcG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDgwODc0MzQsImV4cCI6MTcwODA5MTAzNH0.NQpI9vAos1jNvJ3CxFEersLZu7BYNkZ0A3b2-O3BXjY" http://localhost:3000/getSingleUser?userId=1


### MULTIPLE USER
curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcnN1cm5hbWVAZXhhbXBsZTg4OTd5b3BtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwODA4ODEwNywiZXhwIjoxNzA4MDkxNzA3fQ.V9ej23aFS14lUCP4TSA9JeWblE8AAL3rdW_D02oVOtg"  http://localhost:3000/getAllUserList


### FOR GRAPHQL
### CURD USING THIS CURL .

curl -X POST -H "Content-Type: application/json" -d '{"query": "mutation { createBook(title: \"New Book\", author: \"Author Name\",description:\"user\",price:12.45) { id title author }}" }' http://localhost:3000/graphql

curl -X POST -H "Content-Type: application/json" -d '{"query": "{ books { id title author }}" }' http://localhost:3000/graphql

curl -X POST -H "Content-Type: application/json" -d '{"query": "{ book(id: \"1\") { id title author }}" }' http://localhost:3000/graphql


curl -X POST -H "Content-Type: application/json" -d '{"query": "{ book(id: \"1\") { id title author }}" }' http://localhost:3000/graphql

curl -X POST -H "Content-Type: application/json" -d '{"query": "mutation { deleteBook(id: \"1\") {message }}" }' http://localhost:3000/graphql 
