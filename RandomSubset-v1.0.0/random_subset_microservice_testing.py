# Course: CS361 - Software I
# Student Name: Alex Davies
# Assignment: Final project - microservice
# Description: This file runs test cases on the random subset microservice. Released with v1.1.0 of the microservice.
# Date: 5/1/22 (v1.0.0)

import random_subset_micorservice as rsm
import json
import time


def write_input(input_file, set_val="", number="", dwell="", kill=""):
    input_dict = dict()  # Create an empty  dictionary to write inputs to
    if set_val != "":  # If a set is provided
        input_dict["set"] = set_val  # Add the set info to the dictionary
    if number != "":  # If a number is provided
        input_dict["number"] = number
    if dwell != "":  # If a dwell is provided
        input_dict["dwell"] = dwell
    if kill != "":  # If a kill is commanded
        input_dict["kill"] = kill
    file = open(input_file, 'w')  # Open the input file to write to
    json.dump(input_dict, file)  # Write the inputs to the file
    file.close()  # Close the file
    return input_dict  # Retunrn the input dictionary for printing purposes


def run_case(input_file):
    """
    Runs the random subset microservice and checks the output
    :param input_file: (string) input filename to feed to the random subset microservice
    :return: output: (dictionary) the contents of the output file
    """
    output_file = "./Testing/outputs_" + input_file[-6:]  # Define the output file (using the input file suffix
    rsm.run_random_subset_microservice(input_file=input_file, output_file=output_file)
    time.sleep(0.5)
    file = open(output_file, 'r')  # Open the output file
    output = json.loads(file.read())  # Read the contents of the output file
    file.close()
    return output


def print_results(input_file, input_content, output_content):
    """
    Takes input and output data and displays it in the console for troubleshooting purposes
    :param input_file: (string) input file
    :param input_content: (dictionary) input file data
    :param output_content: (dictionary) output file data
    :return: None
    """
    print("-----------------------------")
    print("Input file:" + input_file)
    print("Input data: --------------- ")
    print(input_content)
    print("Output data: -------------- ")
    print(output_content)


# TEST 1
file = './Testing/inputs_1.json'  # Input file for test
input_data = write_input(file, set_val=[1, 2, 3, 4, 5], kill=1)
output_data = run_case(file)
print_results(file, input_data, output_data)

# TEST 2
file = './Testing/inputs_2.json'  # Input file for test
input_data = write_input(file, set_val=[1, 2, 3, 4, 5], number=3, kill=1)
output_data = run_case(file)
print_results(file, input_data, output_data)

# TEST 3
file = './Testing/inputs_3.json'  # Input file for test
input_data = write_input(file, set_val=[1, "abc", 3, "def", 5], number=3, kill=1)
output_data = run_case(file)
print_results(file, input_data, output_data)

# TEST 4
file = './Testing/inputs_4.json'  # Input file for test
input_data = write_input(file, set_val="string", number=3, kill=1)
output_data = run_case(file)
print_results(file, input_data, output_data)
