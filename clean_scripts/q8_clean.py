#!/usr/bin/python
# -*- coding: utf-8 -*-

import pandas as pd
import csv

def clean():
	PATH = '../csv_results/q8-result.csv'
	result = pd.read_csv(PATH, encoding='utf-8', quoting=csv.QUOTE_ALL, error_bad_lines=False)
	print(result.shape)
	print(result.head(5))

if __name__ == '__main__':
	clean()