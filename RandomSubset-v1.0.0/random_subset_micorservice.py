# Course: CS361 - Software I
# Student Name: Alex Davies
# Assignment: Final project - microservice
# Description: This microservice, when running, will look into a specified text file and return a random set from it.
# Date: 4/30/22 (v1.0.0)

import random
import time
import json
from os.path import exists

if __name__ == "__main__":  # If this isn't being called
    filename = "inputs.txt"  # Define the file to communicate through
    execute = True  # Set the execution flag
    while execute:  # While we still want to execute
        if exists(filename):  # Check if the file exists
            file = open(filename, "r")  # Read the pipeline file
            try:  # Try to process the file as a JSON
                status = json.loads(file.read())  # Get the current file value/status
            except:  # If it can't process, the input isn't a valid JSON
                print("Input is empty. Verify contents of inputs.txt.")  # Warning
                status = dict()  # Set status to an empty dictionary
                pass  # Continue on
            file.close()  # Close the file
        else:  # Else the file doesn't exist
            print("No input file exists. Check directory for inputs.txt.")  # Print a warning to the user
            status = dict()  # Set status as an empty dictionary
        if type(dict()) != type(status):  # If the input isn't a dictionary
            print("Input is not in JSON format. Verify input format in inputs.txt.")  # Print warning (not valid JSON)
            status = dict()  # Set as an empty dictionary
        outputs = dict()  # Initialize a dictionary to store outputs in
        if "set" in status:  # If the JSON has an input set
            if "number" in status:  # If a number to pick from is specified
                number = status["number"]  # Set the number to pick as the input value
            else:  # Else, just return 1
                number = 1
            outputs["output"] = random.choices(status["set"], weights=[len(status["set"])] * len(status["set"]),
                                               k=number)  # Define the random outputs
            file = open(filename, 'w')  # Open the file to write
            json.dump(outputs, file)  # Write the outputs to the text file
            file.close()  # Close the file
            if "dwell" in status:  # If a dwell is commanded
                dt = status["dwell"]  # Define the dwell time
                print(f"Dwelling for {dt} seconds...")  # Print a notice that the script is dwelling
                time.sleep(dt)  # Dwell for the prescribed time
        if "kill" in status:  # If a cancel is commanded
            execute = False  # Change the execution flag to false
