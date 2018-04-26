'''
    Written by Debojit Kaushik (25th April 2018)
'''


import pandas as pd
import numpy as np
import traceback, json
from q10_clean import MakeFile

if __name__ == '__main__':
    try:
        f = pd.read_csv('../csv_results/plot_data.csv', encoding = 'utf-8')

        data = {
            'positive': {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0
            },
            'negative': {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0
            }
        }
        for it, item in enumerate(f['SentimentLabels']):
            if item == 1:
                data['positive'][str(f['ReviewRating'][it])] += 1
            elif item == 0:
                data['negative'][str(f['ReviewRating'][it])] += 1
            
        MakeFile('../src/q6-d.json', data)
    except Exception:
        print(traceback.format_exc())