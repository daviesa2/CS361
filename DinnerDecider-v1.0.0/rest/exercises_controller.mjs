import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the parameters provided in body
 */
app.post('/exercises', (req, res) => {
    console.log(req.body)
    exercises.createFilter(req.body.location)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        })
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findFilterById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error : 'Resource not found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed'});
        })
});

/**
 * Retrieve exercises. 
 * If the query parameters include a name, then only the exercises with that name are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    // Is there a query parameter named name? If so add a filter based on its value.
    if(req.query.name !== undefined){
        filter = { name: req.query.name };
    }
    exercises.findFilters(filter, '', 0)
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.json({ Error: 'Request failed' });
        });

});

/**
 * Update the exercise whoses id is provided in the path parameter and set
 * its parameters to the values provided in the body.
 */
 app.put('/exercises/:_id', (req, res) => {
    exercises.replaceFilter(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
 app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});