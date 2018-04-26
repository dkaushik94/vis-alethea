//Written by Debojit Kaushik (24th April)

import React, { Component } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import logo from './Logo.png';
import './App.css';
import Particles from 'react-particles-js';
import  {
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart,
  AreaChart, 
  Area,
  ComposedChart,
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis
} from 'recharts';

let background_url = require('./shots.jpg');
var q = require('./q10-d.json');
var q1 = require('./q1-d.json');
var q8 = require('./q8-d.json');
var q9 = require('./q9-d.json');
var q6 = require('./q6-d.json');
var q6_2 = require('./q6-d2.json');

let data = [];
let data2 = [];
let data6 = [];
let data8 = [];
let data9 = [];
let data6_2 = [];
var i = 0;

let months = {
  1: 'Jan', 2:'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'
}


data2 = [
  {Year: "2017", a: (q1["2017"]["a"]/q1["total_crimes"])*1000*0.1, b: (q1["2017"]["b"]/q1["total_crimes"])*100*0.01, c: (q1["2017"]["c"]/(q1["total_crimes"]))*100*0.001},
  {Year: "2018", a: (q1["2018"]["a"]/q1["total_crimes"])*100*0.1, b: (q1["2018"]["b"]/q1["total_crimes"])*100*0.01, c: (q1["2018"]["c"]/(q1["total_crimes"]))*100*0.001}
]


data9 = [
  {name: '1-5', Crimes: q9["range1"]},
  {name: '6-10', Crimes: q9["range2"]},
  {name: '11-15', Crimes: q9["range3"]},
  {name: '15-Above', Crimes: q9["range4"]},
]

data6 = [
  {name: '★', positive: q6["positive"]["1"], negative: q6["negative"]["1"], total: 8000},
  {name: '★★', positive: q6["positive"]["2"], negative: q6["negative"]["2"], total: 8000},
  {name: '★★★', positive: q6["positive"]["3"], negative: q6["negative"]["3"], total: 8000},
  {name: '★★★★', positive: q6["positive"]["4"], negative: q6["negative"]["4"], total: 8000},
  {name: '★★★★★', positive: q6["positive"]["5"], negative: q6["negative"]["5"], total: 8000}
]

data6_2 = []

for (i = 0; i < Object.keys(q6_2).length; i++) {
  let d = {};
  d.label = Object.keys(q6_2)[i];
  d.value = q6_2[Object.keys(q6_2)[i]][1];
  d.color = '#' + 
  data6_2.push(d);
}

//CONSTRUCT DATA DICTOINARIES FROM JSON OBJECTS.
for(i = 1; i <= 12; i++){
  let d = {};
  d.name = months[i];
  d.MOTOR_VEHICLE_THEFT = q[i]["MOTOR VEHICLE THEFT"]["prob"];
  d.THEFT = q[i]["THEFT"]["prob"];
  d.ROBBERY = q[i]["ROBBERY"]["prob"]
  d.BURGLARY = q[i]["BURGLARY"]["prob"];
  data.push(d);
}

for (i = 1; i <= 8; i++) {
	let d = {};
	d.years = i
	d.count = q8[i]
	d.name = i
	data8.push(d)
}

const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;
  
  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

const renderTooltipContent = (o) => {
	const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);
  
  return (
  	<div className="customized-tooltip-content">
    	<p className="total">{'${label} (Total: ${total})'}</p>
      <ul className="list">
      	{
        	payload.map((entry, index) => (
          	<li key={'item-${index}'} style={{color: entry.color}}>
            	{'${entry.name}: ${entry.value}(${getPercent(entry.value, total)})'}
            </li>
          ))
        }
      </ul>
    </div>
  );
};


class App extends Component {

  setMarker = () => {
    var uluru = { lat: 41.874306, lng: -87.647175 };
    var marker = new window.google.maps.Marker({
      position: uluru,
      map: window.gmaps['map1'].gmap
    });
  };

  render() {
    let mapOptions = {
      zoom: 15,
      center: { lat: 41.874306, lng: -87.647175 }
    };
    return (
      <div>
        <Particles style = {styles.particles} 
        params = {{
          particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#3CA9D1",
            opacity: 0.5,
            width: 1
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 1,
              "color": "#000000"
            },
            polygon: {
              nb_sides: 7
            }
          }
         },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              }
            }
          },
          "retina_detect": true}}
        />
        <div className="App" style = {styles.parentBox}>
          <header>
            <style>
              @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,700|Raleway:400,500,600,700');
            </style>
            <img src={logo} style={styles.logo} alt="logo" />
            <h1 style = {styles.fontHeaderProps}>Alethea</h1>
          </header>
          <h3 style = {styles.fontHeaderProps}>
            Visualizations!
          </h3>
          {/* Line Chart */}
          <div style = {styles.centerBox} class = "card">
            <div style = {styles.divBoxes}>
              <p style = {{fontFamily: '"Raleway", sans-serif'}}>
                This is the data visualization page for various data about the City of Chicago.
              </p>
            </div>
            <div style={styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif'}}>Line Chart representation of monthly probabilities of every crime</p>
              <LineChart width={800} height={250} data = {data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="MOTOR_VEHICLE_THEFT" stroke="#8884d8" />
                <Line type="monotone" dataKey="THEFT" stroke="#82ca9d" />
                <Line type="monotone" dataKey="ROBBERY" stroke="#000000" />
                <Line type="monotone" dataKey="BURGLARY" stroke="#900" />
              </LineChart>
            </div>
            {/* Bar Chart */}
            <div style = {styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif'}}>Bar Chart representation of monthly probabilities of every crime</p>
              <BarChart height = {250} width = {800} data = {data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokedDasharray="3 3" />
              <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mvt" fill="#8884d8" />
              <Bar dataKey="THEFT" fill="#82ca9d" />
              <Bar dataKey="ROBBERY" fill="#000000" />
              <Bar dataKey="BURGLARY" fill="#900" />
              </BarChart>
            </div>

            <div style = {styles.divBoxes}>
            <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif'}}>Bar Chart representation of number of restaurants open after x years of failed inspection</p>
            <BarChart height = {250} width = {800} data = {data8}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokedDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#900" />
            </BarChart>
            </div>

            <div style = {styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif'}}>Area Chart representation of type of establishment with percentage of crimes.</p>
              <AreaChart width={800} height={400} data={data2} stackOffset="expand"
                margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                <XAxis dataKey="Year" padding={{left: 30, right: 30}}/>
                <YAxis tickFormatter={toPercent}/>
                <Tooltip/>
                <Area type='monotone' dataKey='a' stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='b' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                <Area type='monotone' dataKey='c' stackId="1" stroke='#ffc658' fill='#ffc658' />
              </AreaChart>
            </div>

            <div style = {styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif'}}>Composed Charts representation of Range of liquor licenses with Crimes taking place</p>
              <ComposedChart width={800} height={400} data={data9}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                  <CartesianGrid stroke='#f5f5f5'/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey='Crimes' barSize={20} fill='#413ea0'/>
                  <Line type='monotone' dataKey='Crimes' stroke='#ff7300'/>
              </ComposedChart>
            </div>
            <div style = {styles.divBoxes}>
            <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif'}}>Radar Chart representation for Review Rating VS Predicted Sentiment fo the reviews.</p>
              <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={data6}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 8000]}/>
                <Radar name="Positive" dataKey="positive" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
                <Legend stroke = "#000000"/>
              </RadarChart>
            
              <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={data6}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 4000]}/>
                <Radar name="Negative" dataKey="negative" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5}/>
                <Legend />
              </RadarChart>
            </div>
            <div style = {[styles.centerBox, styles.divBoxes]}>
              <BubbleChart
              style = {[styles.centerBox, styles.divBoxes]}
                    graph = {{
                      zoom: 1.1,
                      offsetX: 0,
                      offsetY: -0.01,
                    }}
                    width={900}
                    height={800}
                    showLegend={true} // optional value, pass false to disable the legend.
                    legendPercentage={20} // number that represent the % of with that legend going to use.
                    legendFont={{
                          family: 'Arial',
                          size: 12,
                          color: '#000',
                          weight: 'bold',
                        }}
                    valueFont={{
                          family: 'Arial',
                          size: 12,
                          color: '#fff',
                          weight: 'bold',
                        }}
                    labelFont={{
                          family: 'Arial',
                          size: 16,
                          color: '#fff',
                          weight: 'bold',
                        }}
                    data={data6_2} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const styles = {
  logo: {
    height: '60px',
    width: '60px'
  },
  divBoxes: {
    boxShadow: '2px 2px 10px #888886',
    margin: '10px',
    borderRadius: '3px',
    backgroundColor: 'white',
    width: '75%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  parentBox: {
    backgroundSize: 'inherit',
    overflow: 'hidden',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    zIndex: '1000',
    color: 'F6F6F6'
  },
  centerBox: {
    padding: '10px',
    width: '85%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  particles: {
    backgroundColor: '#F6F6F6',
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '-1000' 
  },
  fontHeaderProps: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
    color: 'black',
    fontSize: '2rem',
    margin: '5px'
  }
}

export default App;
