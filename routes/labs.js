const express = require('express');
const router = express.Router();
const db = require('../db');
const Lab = require('../models/labs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get labs list
router.get('/', (req, res) => {
    var labs = new Lab();
    labs.getAll()
    .then((labs) => {
        console.log("LABS ARE:"+labs);
        res.render('labs', {labs});
    })
    .catch(err => console.log(err));
});
// Display add gig form
// router.get('/add', (req, res) => res.render('add'));

// // Add a gig
// router.post('/add', (req, res) => {
//   let { title, technologies, budget, description, contact_email } = req.body;
//   let errors = [];

//   // Validate Fields
//   if(!title) {
//     errors.push({ text: 'Please add a title' });
//   }
//   if(!technologies) {
//     errors.push({ text: 'Please add some technologies' });
//   }
//   if(!description) {
//     errors.push({ text: 'Please add a description' });
//   }
//   if(!contact_email) {
//     errors.push({ text: 'Please add a contact email' });
//   }

//   // Check for errors
//   if(errors.length > 0) {
//     res.render('add', {
//       errors,
//       title, 
//       technologies, 
//       budget, 
//       description, 
//       contact_email
//     });
//   } else {
//     if(!budget) {
//       budget = 'Unknown';
//     } else {
//       budget = `$${budget}`;
//     }

//     // Make lowercase and remove space after comma
//     technologies = technologies.toLowerCase().replace(/, /g, ',');

//     // Insert into table
//     Gig.create({
//       title,
//       technologies,
//       description,
//       budget,
//       contact_email
//     })
//       .then(gig => res.redirect('/gigs'))
//       .catch(err => console.log(err));
//   }
// });

// // Search for gigs
// router.get('/search', (req, res) => {
//   let { term } = req.query;

//   // Make lowercase
//   term = term.toLowerCase();

//   Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
//     .then(gigs => res.render('gigs', { gigs }))
//     .catch(err => console.log(err));
// });

module.exports = router;