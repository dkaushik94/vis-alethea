'''
    Written BY Debojit Kaushik (22nd April 2018)
'''

import pandas as pd
import numpy as numpy
import json, traceback, codecs
from q10_clean import MakeFile


if __name__ == '__main__':
    try:
        f = pd.read_csv('q1-result.csv', encoding = 'utf-8')

        data = {
            "2017": {
                "a": 0,
                "b": 0,
                "c": 0
            },
            "2018": {
                "a": 0,
                "b": 0,
                "c": 0
            }
        }

        for it, item in enumerate(f['Year']):
            data[str(item)][f['Business Type (a,b,c)'][it]] += int(f['#Crimes'][it])

        data['total_crimes'] = int(f['#Crimes'].sum())

        MakeFile('q1-d.json', data)

    except Exception:
        print(traceback.format_exc())

