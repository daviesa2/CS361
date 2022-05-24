# Course: CS361 - Software I
# Student Name: Alex Davies
# Assignment: Final project - microservice
# Description: This microservice, when running, will look into a specified text file and return a random set from it.
# Date: 5/1/22 (v1.1.0)

import random
import time
import json
from os.path import exists


def run_random_subset_microservice(input_file="", output_file=""):
    """
    Launches the random subset microservice. It will run until it is terminated by the user or receives a kill command
    from the input file.
    :param input_file: (string) defines the input file that the service will read from. If no input is provided, it
                            will assume the input file to be inputs.txt.
    :param output_file: (string) defines the output file that the service will write to. If no input is provided, it
                            will write to the input file.
    :return: N/A. Writes to a text file in json format

    Text file inputs:
    "set" - required - array or string
    "number" - optional  - integer
    "dwell" - optional - float
    "kill" - optional - any
    """
    # If an input file is provided to the method and is a valid type, then set the input_file to that.
    # Else, default to inputs.txt.
    if input_file != "" and type(input_file) == str:
        input_filename = input_file
    else:
        input_filename = "inputs.txt"

    # If an output file is provided to the method and is a valid type, then set the output_file to that.
    # Else, default to the input file.
    if output_file != "" and type(output_file) == str:
        output_filename = output_file
    else:
        output_filename = input_filename

    # Begin looping while the execute flag is true
    execute = True
    while execute:

        # If the the input file exists (in the directory), then try to open it as a JSON and store contents as status
        # If it can't be opened as a JSON, create an empty dictionary for the status (file value)
        # If no file exists with that name in the directory, then print a warning.
        if exists(input_filename):
            file = open(input_filename, "r")
            try:
                status = json.load(file)
            except:
                print('File is not in JSON format. Check input.')
                status = dict()
                pass
            file.close()
        else:
            print("No input file exists. Check directory for inputs.txt.")
            status = dict()

        # If the file contents aren't in JSON format (not a dictionary), then print a warning.
        if type(dict()) != type(status):
            print("Input is not in JSON format. Verify input format in inputs.txt.")
            status = dict()

        # Initialize an output dictionary to store results in.
        # If the input contains a set, indicated by "set" as a key, then pick a random number from the set.
        outputs = dict()
        if "set" in status:

            # If there is a number defined in the input file, which controls number selected from subset, then assign it
            # Else, assign the default value of 1.
            if "number" in status:
                number = status["number"]
            else:
                number = 1

            outputs["output"] = random.choices(status["set"], weights=[len(status["set"])] * len(status["set"]),
                                               k=number)

            # Write the output (dictionary) in JSON format to the output file.
            file = open(output_filename, 'w')
            json.dump(outputs, file)
            file.close()

            # If a dwell command is provided by the user via the key "dwell", then pause for the provided time.
            if "dwell" in status:
                dt = status["dwell"]
                print(f"Dwelling for {dt} seconds...")
                time.sleep(dt)

        # If a kill command is provided via the key "kill", then set the execution flag to false.
        if "kill" in status:  # If a cancel is commanded
            execute = False  # Change the execution flag to false


if __name__ == "__main__":  # If this file isn't being called, then run the microservice
    run_random_subset_microservice()
