'''
    Written by Debojit Kaushik (April 24th 2018)
'''

import pandas as pd
import numpy as np
import os, sys, traceback, json
from q10_clean import MakeFile


if __name__ == '__main__':
    try:
        f = pd.read_csv('../csv_results/Q9_final.csv', encoding = 'utf-8')

        a = {'range1': 0, 'range2': 0, 'range3': 0, 'range4': 0}
        for it, item in enumerate(f['#Businesses with liquor licenses']):
            if item >= 1 and item <=5:
                a['range1'] += int(f['#Crimes'][it])
            elif item > 5 and item <=10:
                a['range2'] += int(f['#Crimes'][it])
            elif item > 10 and item <= 15:
                a['range3'] += int(f['#Crimes'][it])
            else:
                a['range4'] += int(f['#Crimes'][it])
        
        MakeFile('../src/q9-d.json', a)
    except Exception:
        print(traceback.format_exc())
