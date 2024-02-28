#### Tasks

- Task 1:
    Create a logic to handle request to all the pages which actually does not exists,
    send a response 404.html page to them.

- Task 2:
    Write a code to manage a simple endpoint "/details" which should be called using get method only,
    and it must contain a variable called id,
    if id doesn't exists send a message for invalid request,
    if the it contains a variable check it must have a value,
    if value is blank send a message "Specify the value" 
    and if all ok send a message "Request received with value of id".

*e.g.*
1. http://localhost:3000/details

"Invalid Request"

2. http://localhost:3000/details?id=

"Specify the value"

3. http://localhost:3000/details?id=1

"Request received with value 1"
