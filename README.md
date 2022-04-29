# Getting Started

To run the application locally you have to do a few steps: 
1) Clone repository from github - https://github.com/Anton-Sypavka/Superheros_Backend.
2) Copy the .env.example file to the root directory, rename it to .env and fill in all the variables with the correct data.
3) Run command `npm run start`.

Now you are able to send request on localhost:5000.

Also, the application is deployed on the heroku cloud service, so you can skip previous steps and send request directly to - https://superheros-application.herokuapp.com

# Application endpoints

GET - /superheros?page=1&limit=2 - returns all superheros from database according to the query params: page and limit pre page. 
if page and limit aren't specified - returns all documents from database. 

GET - /superheros/:superhero_id - returns specific superhero document.

POST - /superheros - creates superhero.

Required fields:
- nickname
- real_name
- origin_description
- superpowers
- catch_phrase
- image

PATCH - /superheros/:superhero_id - edit specific superhero document.

DELETE - /superheros/:superhero_id - delete specific superhero document from database.



 