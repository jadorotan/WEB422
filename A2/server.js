/********************************************************************************
*  WEB422 – Assignment 1
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Jerus Allen Dorotan Student ID: 110225216 Date: 02-01-2024
*
*  Published URL: https://drab-blue-bullfrog-boot.cyclic.app
*
********************************************************************************/

require('dotenv').config(); 
const express = require('express'); 
const app = express(); 
const cors = require('cors');
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();
const HTTP_PORT = process.env.PORT || 8080; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "API Listening"});
});

app.post('/api/listings', async (req, res) => {
    try {
      const newListingObj = await db.addNewListing(req.body);
      res.status(201).json(newListingObj);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/listings', async (req, res) => {
    try{
        const listingObjs = await db.getAllListings(req.query.page, req.query.perPage, req.query.name);
        res.status(200).json(listingObjs);
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/listings/:id', async (req, res) => {
    try{
       const listingObj = await db.getListingById(req.params.id);

       if(!listingObj) {
            res.status(404).json({error: "Resource Not Found"});
       }

       res.status(200).json(listingObj);
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/listings/:id', async (req, res) => {
    try{
        const updatedListingObj = await db.updateListingById(req.body, req.params.id);

        if(!updatedListingObj){
            res.status(404).json({ error: 'Resource Not Found' });
        }

        res.status(200).json(updatedListingObj);
     } catch(error) {
         res.status(500).json({ error: 'Internal Server Error' });
     }
});

app.delete('/api/listings/:id', async (req, res) => {
    try{
        const listingObj = await db.deleteListingById(req.params.id);

        if(!listingObj){
            res.status(404).json({ error: 'Resource Not Found' });
        }

        res.status(204).json(listingObj);
     } catch(error) {
         res.status(500).json({ error: 'Internal Server Error' });
     }
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});