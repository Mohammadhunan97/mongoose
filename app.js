const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const Book = require('./book.model.js');
const myDB = 'mongodb://localhost/myBookApp';
const c = console.log;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}))



mongoose.connect(myDB);

app.get("/books/index",(req,res)=>{
	Book.find({}).exec((err,books)=>{
		if(!err){
			res.json(books);
		}
	})
})

app.get("/books/:id",(req,res)=>{
	Book.findOne({
		_id: req.params.id
	}).exec((err,book)=>res.json(book));
})

app.post("/books/new",(req,res)=>{
	let newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;

	newBook.save((err,book)=>{
		if(err){
			res.send("Error saving book");
		}else{
			res.send(book);
		}
	})

})

app.post("/books",(req,res)=>{
	Book.create(req.body,((err,book)=>{
		if(!err){
			res.send(book);
		}else{ 
			res.send("Error saving book");
		}
	}))
})


app.put("/books/:id",(req,res)=>{
	let query = {
		_id: req.params.id
	}
	let newData = {
		title: req.body.title,
		author: req.body.author,
		category: req.body.category		
	}

	Book.findById(req.params.id, (err, book) => {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        book.title = req.body.title || book.title;
        book.category = req.body.category || book.category;
        book.author = req.body.author || book.author;

        // Save the updated document back to the database
        book.save((err, book) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(book);
        });
    }
});
})

app.delete("/books/delete/:id",(req,res)=>{
	Book.findByIdAndRemove(req.params.id, (err, book) => {  
    let response = {
        message: "Todo successfully deleted",
        id: book._id
    };
    res.status(200).send(response);
	});
})

app.listen(port,(err)=>{
	if(!err){
		c("listening on port:",port);
	}else{
		c("err:\n\n",err);
	}
})