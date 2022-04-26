// Get the mongoose object
import mongoose from 'mongoose';
import fs from 'fs';
import { writeFile, readFile } from 'fs/promises';
import { Buffer } from 'buffer';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const filterSchema = mongoose.Schema({
    location: { type: String, required: true },
    price: { type: String, required: false },
    rating: { type: String, required: false},
    cuisine: { type: String, required: false },
    hours: { type: String, required: false},
    range: { type: String, required: false}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Filter = mongoose.model("Filters", filterSchema);

/**
 * Create an exercise
 * @param {String} location
 * @param {String} price
 * @param {String} rating
 * @param {String} cuisine
 * @param {String} hours
 * @param {String} range
 * @returns A promise. Resolves to JSON object for the document created by calling save
 */
const createFilter = async (location, price, rating, cuisine, hours, range) => {
    // Call the constructor to create an instance of the model class Exercise
    const filter = new Filter({ location: location, price: price, rating: rating, cuisine: cuisine, hours: hours, range: range });
    // Write the object to a text file for microservice
    const promise = await writeFile('filters.txt', JSON.stringify(filter));
    // Delete any possible element present
    const read = await readFile('results.txt');
    const readJSON = JSON.parse(read);
    const optionsArray = readJSON.options;
    console.log(optionsArray);
    const randomElement = optionsArray[Math.floor(Math.random() * optionsArray.length)];
    console.log(randomElement.pick)
    const outputPromise = await writeFile('../daviesa2_react/src/results.txt', JSON.stringify(randomElement.pick))
    const clear = await Filter.deleteOne({});
    return ;
}

/**
 * Populate filters
 * @param {String} location
 * @param {String} price
 * @param {String} rating
 * @param {String} cuisine
 * @param {String} hours
 * @param {String} range
 * @returns A promise. Resolves to JSON object for the document created by calling save
 */
 const populateFilter = async () => {
    // Call the constructor to create an instance of the model class Exercise
    const filter = new Filter({ location: "", price: "", rating: "", cuisine: "", hours: "", range: "" });
    // Call save to persist this object as a document in MongoDB
    return filter.save();
}

/**
 * Retrieve exercises based on the filter, projection, and limit parameters.
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findFilters = async (filter, projection, limit) => {
    const query = Filter.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the exercise via ID
 * @param {String} _id
 * @returns
 */
const findFilterById = async (_id) => {
    const query = Filter.findById(_id);
    return query.exec();
}

/**
 * Replace the properties of the filter with the id value provided
 * @param {String} _id 
 * @param {String} location
 * @param {String} price
 * @param {String} rating
 * @param {String} cuisine
 * @param {String} hours
 * @param {String} range
 * @returns A promise. Resolves to the number of documents modified
 */
 const replaceFilter = async (_id, location, price, rating, cuisine, hours, range) => {
    const result = await Filter.replaceOne({ _id: _id },
        { location: location, price: price, rating: rating, cuisine: cuisine, hours: hours, range: range });
    return result.modifiedCount;
}


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    console.log('Trying to write file...')
    const data = await findFilterById({_id: _id});
    console.log(data)
    const promise = await writeFile('message.txt', JSON.stringify(data));
    // Abort the request before the promise settles.
    const result = await Filter.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { createFilter, populateFilter, findFilters, findFilterById, replaceFilter, deleteById };