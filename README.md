# CS361
Repo for all of CS361

Dinner Decider v1.0.0 - Release of the MVP
  - Utilizes Node, Mongoose, and MongoDB; UI via React and database via REST.
  - Outputs filter content in JSON format to filters.txt in the rest folder.
  - Reads Google Maps scrapper outputs from results.txt in the rest folder.

Random Subset v1.0.0 - Release of microservice
  - Utilizes Python.
  - Reads and writes to inputs.txt in the working directory. Expects inputs in JSON format and writes in JSON format with the key "output" providing an array.
  - Current JSON-driven functionality:
    - "set" [required][array]: defines the set/list of values to pick from.
    - "number" [optional][int]: defines the number of random values to be selected from the provided set. If nothing is provided, 1 is assumed.
    - "dwell" [optional][float]: defines the dwell time between cycles. If nothing is provided, no dwell is executed.
    - "kill" [optional][any]: if this key exists, the run will be terminated. The value of that key doesn't matter, just that it exists.
  - As an example, a text file containing "{ "set": [1,2,3,4,5], "number": 3 }" would yield a return along the lines of "{ "output": [3,5,1] }" in which no dwell is executed and the script continues running.
  - The current assumption is that if n values are wanted in return, there are n instances avaiable of each value in the set. That is, for the example above it'd be possible to return an output of [x,x,x] (where x is any of the values in the set list).
