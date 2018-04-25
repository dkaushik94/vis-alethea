'''
    Written BY Debojit Kaushik (22nd April 2018)
'''

import pandas as pd
import numpy as numpy
import json, traceback, codecs


if __name__ == '__main__':
    try:
        f = pd.read_csv('q10-result.csv' , encoding  = 'utf-8')
        type_of_robbery = [
            'MOTOR VEHICLE THEFT', 
            'THEFT', 
            'ROBBERY', 
            'BURGLARY'
        ]
        data = [
            {'name': 'MOTOR VEHICLE THEFT', 'min_temp': 10000, 'max_temp':0, 'avg_temp': 0, 'probability': 0, 'count': 0},
            {'name': 'THEFT', 'min_temp': 100000, 'max_temp': 0, 'avg_temp': 0, 'probability': 0, 'count': 0},
            {'name': 'ROBBERY', 'min_temp': 10000, 'max_temp': 0, 'avg_temp': 0, 'probability': 0, 'count': 0},
            {'name': 'BURGLARY', 'min_temp': 10000, 'max_temp': 0, 'avg_temp': 0, 'probability': 0, 'count': 0}
        ]
        
        for it, item in enumerate(f['TYPE OF ROBBERY']):
            if item in type_of_robbery and f['CENSUS BLOCK'][it] != 'nan':
                data[type_of_robbery.index(item)]['avg_temp'] += f['AVG TEMPERATURE'][it]
                data[type_of_robbery.index(item)]['probability'] += f['PROBABILITY'][it]
                data[type_of_robbery.index(item)]['count'] += 1
                if data[type_of_robbery.index(item)]['min_temp'] > f['AVG TEMPERATURE'][it]:
                    data[type_of_robbery.index(item)]['min_temp'] = f['AVG TEMPERATURE'][it]
                else:
                    pass
                if data[type_of_robbery.index(item)]['max_temp'] < f['AVG TEMPERATURE'][it]:
                    data[type_of_robbery.index(item)]['max_temp'] = f['AVG TEMPERATURE'][it]
                else:
                    pass
            else:
                pass

        months = {}
        for it, item in enumerate(f['TYPE OF ROBBERY']):
            if item in type_of_robbery:
                if str(f['MONTH'][it]) in months:
                    months[str(f['MONTH'][it])][f['TYPE OF ROBBERY'][it]]['prob'] += f['PROBABILITY'][it]
                    months[str(f['MONTH'][it])][f['TYPE OF ROBBERY'][it]]['count'] += 1
                else:
                    months[str(f['MONTH'][it])] = {
                        'MOTOR VEHICLE THEFT': {'prob': 0, 'count': 0},
                        'THEFT': {'prob': 0, 'count': 0},
                        'ROBBERY': {'prob': 0, 'count': 0},
                        'BURGLARY': {'prob': 0, 'count': 0}
                    }
                    months[str(f['MONTH'][it])][f['TYPE OF ROBBERY'][it]]['prob'] += f['PROBABILITY'][it]
                    months[str(f['MONTH'][it])][f['TYPE OF ROBBERY'][it]]['count'] += 1
        print(months)
        
        f = codecs.open('q10-d.json', 'w+', encoding = 'utf-8')
        f.write(json.dumps(months, indent = 4))
        f.close()

    except Exception:
        print(traceback.format_exc())