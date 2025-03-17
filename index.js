const express = require('express');

const app = express ();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

let books = [];
books.push({
    "id": "1",
  "title": "To Kill a Mockingbird",
  "details": [
    {
      "id": "1",
      "author": "Harper Lee",
      "genre": "Fiction",
      "publicationYear": 1960
    }
  ]
});

app.get("/whoami", (request, response) => {
   response.send("studentNumber: 2652142");
});

app.get("/books", (request, response) => {
    response.send(books);
 });

 app.get("/books/:id", (request, response) => {
    const book = books.find(b=> b.id === request.params.id);
    if (book == undefined) {
        return response.status(404).json({ 
            error: 'Not found' });
      }
      response.send(book);
 });

 app.post("/books", (request, response) => {
    const things = request.body;
    

    if(!things){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Missing information' });
    }
    if(!things.details){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Missing required book details' });
    }
    if(!Array.isArray(details) || details.length == 0){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Missing required book details' }); 
    }
    if(!things.id){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Book ID missing' });
    }
    if(!things.title){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Book title missing' });
    }


    books.push(things);

    response.status(200).send;
    
  });

  app.put("/books/:id", (request, response) => {
   
    let book ={};

    for(let b of books){
        if(b.id == request.params.id){
            book = b;
        }
    }
    if(!book){
        return response.status(404).send();
    }
    const bookStuff = request.body;

    if(!bookStuff){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Missing information' });
    }
    if(!bookStuff.details){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Missing required book details' });
    }
    if(!Array.isArray(details) || details.length == 0){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Missing required book details' }); 
    }
    if(!bookStuff.id){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Book ID missing' });
    }
    if(!bookStuff.title){
        return response.status(400).json({ 
            status: 'Bad Request',
            error: 'Book title missing' });
    }

    for(let b of bookStuff.details){
        if(!b.id||b.author||b.genre||b.publicatinYear){
            return response.status(400).json({ 
                status: 'Bad Request',
                error: 'Missing required book details' }); 
        }
    }

    const bookIndex = books.indexOf(book);
    books[bookIndex] = bookStuff;
    return response.status(200).send()    

 });
 app.delete("/books/:id", (request, response) => {
    
    const book = books.findIndex(b=> b.id == request.params.id);

    if(book == -1){
        return response.status(404).json({ error: 'Book not found' });
    }
    books.splice(book,1);
    response.status(204).end();
 });


 app.post("/books/:id/details", (request, response) => {
    const things = request.body;
    const book = books.find(b => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if(!things.details.author){
    return res.status(400).json({ error: 'Author missing' });
  }
  if(!things.details.genre){
    return res.status(400).json({ error: 'genre missing' });
  }
  if(!things.details.publicationYear){
    return res.status(400).json({ error: 'publication year missing' });
  }

    const newThings = {
        id: things.details.id,
        author: things.details.author,
        genre: things.details.genre,
        publicationYear: things.details.publicationYear
    };

    book.details.push(newThings);
    response.status(201).json(newThings);
    
  });
  app.delete("/books/:id/details/:detailId", (request, response) => {

    const book = books.find(b => b.id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
    
    const detailIndex = books.details.findIndex(b=> b.id == request.params.id);

    if(detailIndex == -1){
        return response.status(404).json({ error: 'Book detail not found' });
    }
    books.details.splice(detailIndex,1);
    response.status(204).end();
 });





  
 


