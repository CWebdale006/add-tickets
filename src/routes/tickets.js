const router = require('express').Router();
let ticket = require('../models/ticket.model');

// GET
router.route('/').get((req, res) => {
    ticket.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const departDate = req.body.departDate;
    const returnDate = req.body.returnDate;
    const price = Number(req.body.price);

    // gets the ticket data, and creates a new ticket 
    const newTicket = new ticket({
        from, 
        to, 
        departDate, 
        returnDate, 
        price,
    });

    newTicket.save()
    .then(() => res.json('ticket added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// returning a ticket item given an id
router.route('/:id').get((req, res) => {
    ticket.findById(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;