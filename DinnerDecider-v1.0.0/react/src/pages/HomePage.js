import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {GiFoodTruck} from 'react-icons/gi';
import map from '../images/map.JPG';
import { ImStarFull, IoStarHalf } from 'react-icons/im';
import raw from '../results.txt';

/* Function defining the home page of the app. Handed the parameter setExerciseToEdit */
function HomePage() {
    const history = useHistory();

    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [range, setRange] = useState('');

    /* Async that uses POST to data to the database (row to the table) */
    const addFilter = async () => {
        const newFilter = { location, price, rating, cuisine, range };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newFilter),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            
        } else {
            alert(`Failed to submit. Status code = ${response.status}`);
        }
        const changeOutput = updateOutput();
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                updateOutput(text)
            });
        history.push("/");
    };

    const updateOutput = async (text) => {
        document.getElementById("output").innerHTML = text
    }

    /* Return the homepage; header, main, and footer present */
    return (
        <>
            <header className='header'>
                <h1>Dinner Decider</h1>
                <p><GiFoodTruck size={42}/></p>
                <p>For the "would you just pick" nights</p>
            </header>
            <main className='homepagebody'>
                <div class="row">
                    <div class="column">
                        <table id="add-exercise" className="table-wrapper">
                            <thead>
                                <tr>
                                    <th>Filter</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Location
                                    </td>
                                    <td>
                                        <input
                                        type="text"
                                        placeholder='Location'
                                        onChange={e => setLocation(e.target.value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Price
                                    </td>
                                    <td>
                                        <select onChange={e => setPrice(e.target.value)}>
                                        <option value="">Any</option>
                                        <option value="$">$</option>
                                        <option value="$$">$$</option>
                                        <option value="$$$">$$$</option>
                                        <option value="$$$$">$$$$</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Rating
                                    </td>
                                    <td>
                                        <select onChange={e => setRating(e.target.value)}>
                                        <option value="">Any</option>
                                        <option value="2star">2 stars</option>
                                        <option value="2.5stars">2.5 stars</option>
                                        <option value="3stars">3 stars</option>
                                        <option value="3.5stars">3.5 stars</option>
                                        <option value="4stars">4 stars</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cuisine
                                    </td>
                                    <td>
                                        <select onChange={e => setCuisine(e.target.value)}>
                                        <option value="">Any</option>
                                        <option value="American">American</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Thai">Thai</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Range
                                    </td>
                                    <td>
                                        <select onChange={e => setRange(e.target.value)}>
                                        <option value="" disabled selected>Max range</option>
                                        <option value="2.5">2.5 miles</option>
                                        <option value="5">5 miles</option>
                                        <option value="10">10 miles</option>
                                        <option value="20">20 miles</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={addFilter}>
                            Submit
                        </button>
                    </div>
                    <div class="column">
                        <img src={map} class="img"/>
                        <p id="output">OUTPUT GOES HERE</p>
                    </div>
                </div>
                {/*<ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>*/}
                {/*<Link to="/add-exercise">Add an exercise</Link>*/}
            </main>
            <footer className="footer">
                <p>Modified by Alex Davies (daviesa2) - &copy; 2022.</p>
            </footer>
        </>
    );
}

export default HomePage;