//Written by Debojit Kaushik (24th April)

import React, { Component } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import logo from './Logo.png';
import './App.css';
import Particles from 'react-particles-js';
import  {
  Brush,
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
  PolarRadiusAxis,
  ResponsiveContainer
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

function assign_color(o) {
	switch(o) {
  	case 2:
  		return '#EA4335';
  	case 3:
  		return '#FBBC05';
  	case 4:
  		return '#34A853';
  	case 5:
  		return '#4285F4';
  	default:
  		return '#2c3e50';
  }
}

for (i = 0; i < Object.keys(q6_2).length; i++) {
  let d = {};
  // console.log(q6_2[Object.keys(q6_2)[i]])
  switch(q6_2[Object.keys(q6_2)[i]].length) {
  	case 2:
  		// 1 review rating for restaurant
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][1];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][0]);
  		break;
  	case 4:
  		// 2 review ratings for restaurant
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][1];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][0]);
  		data6_2.push(d);
  		d = [];
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][3];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][2]);
  		data6_2.push(d);
  		break;
  	case 6:
  		// 3 review ratings for restaurant
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][1];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][0]);
  		data6_2.push(d);
  		d = [];
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][3];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][2]);
  		data6_2.push(d);
  		d = [];
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][5];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][4]);
  		data6_2.push(d);
  		break;
  	case 8:
  		// 4 review ratings for restaurant
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][1];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][0]);
  		data6_2.push(d);
  		d = [];
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][3];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][2]);
  		data6_2.push(d);
  		d = [];
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][5];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][4]);
  		data6_2.push(d);
  		d = [];
  		d.label = Object.keys(q6_2)[i];
  		d.value = q6_2[Object.keys(q6_2)[i]][7];
  		d.color = assign_color(q6_2[Object.keys(q6_2)[i]][6]);
  		data6_2.push(d);
  		break;
  	default:
  		console.log('not printed')
  }
  // Object.keys(q6_2)[i][0] == 2
  // console.log(q6_2[Object.keys(q6_2)[i]][0])
  // d.color = '#' + ;
  data6_2.push(d);
}

//CONSTRUCT DATA DICTOINARIES FROM JSON OBJECTS.
for(i = 1; i <= 12; i++){
  let d = {};
  d.name = months[i];
  d.MOTOR_VEHICLE_THEFT = q[i]["MOTOR VEHICLE THEFT"]["prob"]/q[i]["MOTOR VEHICLE THEFT"]["count"];
  d.THEFT = q[i]["THEFT"]["prob"]/q[i]["THEFT"]["count"];
  d.ROBBERY = q[i]["ROBBERY"]["prob"]/q[i]["ROBBERY"]["count"]
  d.BURGLARY = q[i]["BURGLARY"]["prob"]/q[i]["BURGLARY"]["count"];
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

  componentWillMount(){
    document.title = "Alethea | Data Viz"
  }

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
              "width": 2,
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
            <title>Alethea | Data Viz</title>
            <img src={logo} style={styles.logo} alt="logo" />
            <h1 style = {styles.fontHeaderProps}>Alethea</h1>
          </header>
          <h3 style = {styles.fontHeaderProps}>
            Visualizations for the City of Chicago!
          </h3>
          {/* Line Chart */}
          <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.3rem'}}>INTRODUCTION</p>
          <div style = {styles.centerBox} class = "card">
            <div style = {styles.divBoxes}>
              <p style = {{fontFamily: '"Raleway", sans-serif', textAlign:'left!important', margin: '15px'}}>
                Welcome to our data visualization page for the City of Chicago! This is our attempt to illustrate and differentiate the different aspects of Chicago from various datasets. All data shown here is an amalgamation of predictions and analytics curated from datasets available at data.cityofchicago.org. <br /><br />
We start the visualization journey by exploring the relationship between various types of robberies and the number of their occurrences throughout the year month-wise. You can view it through the eyes of a line graph. The next plot is a bar chart which aims to focus on the actual differences in occurrences of crime over different months of the year. Next, we move on to an interesting view which shows a bar chart with the number of restaurants open after failing a food inspection review for a certain range of years. Fortunately, the data here shows majority of the restaurants close within two years of a failed inspection! Next, we see an area chart showing the decrease in crimes by types of establishment throughout Chicago. <br /><br />
We then move on to a composed chart showing the relationship between the number of liquor licenses and the number of crimes occurring in or around the establishment. We then move on to two extremely interesting yet expected radar charts. These charts show the correlation between positive or negative sentiment labels of a restaurant’s review with the actual rating given to that restaurant. As we can see, positive sentiments correlate to ratings of 4-5 while negative correlate to 1-3. <br /><br />
Finally, we see a bubble chart with restaurants and the number of reviews they received. Each bubble shows one (restaurant, review rating) pair combination. Green means 5 stars, blue means 4 stars, yellow means 3 stars, and red means 2 stars. As we can see, most of reviews accumulated to each restaurant is usually in the 4-5 range. This gives us a glimpse into the distribution of the dataset which shows people are NOT highly invested in rating a restaurant too bad. If there are complaints, they are less expressed than a praise.

              </p>
            </div>
            <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.3rem'}}>VIZ: GRAPHS & INFERENCES</p>
            <div style={styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Line Chart representation of monthly probabilities of every crime -</p>
              <LineChart width={800} height={250} data = {data}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="MOTOR_VEHICLE_THEFT" stroke="#f98866" />
                <Line type="monotone" dataKey="THEFT" stroke="#FFAA00"/>
                <Line type="monotone" dataKey="ROBBERY" stroke="#008081" />
                <Line type="monotone" dataKey="BURGLARY" stroke="#89da59" />
                <Brush style = {{margin: '10px'}} />
              </LineChart>
            <br />
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Bar Chart representation of monthly probabilities of every crime -</p>
              <BarChart height = {250} width = {800} data = {data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokedDasharray="3 3" />
                <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="MOTOR_VEHICLE_THEFT" fill="#f98866" />
                <Bar dataKey="THEFT" fill="#FFAA00" />
                <Bar dataKey="ROBBERY" fill="#008081" />
                <Bar dataKey="BURGLARY" fill="#89da59" />
                <Brush style = {{margin: '10px'}} />
              </BarChart>
              <div style = {{display: 'flex', width: '100%', textAlign: 'left', flexDirection: 'column', margin: '10px'}}>
                
                <ul>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> Crime probabilities VS Month</p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Weather+ Crimes + Census</p>
                  {/* <li style = {{listStyle: 'none',fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}></li> */}
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Inferences:</b></p>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>We see a dip in Motor Vehicle Theft after a peak in starting of the year. This might be due to the fact that a lot of people buy new automobiles and are susceptible to theft.</li>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>Robberies have a higher probability of taking place in the months of September and December. This might be due to student moving and shifting during the month of deptember and robberies tend to take place in DEcember due to people going on vacations due to Christmas leaving their houses vulnerable.</li>
                </ul>
              </div>
            </div>

            <div style = {styles.divBoxes}>
            <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Bar Chart representation of number of restaurants open after x years of failed inspection -</p>
            <BarChart height = {250} width = {800} data = {data8}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokedDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FFB6C1" />
            </BarChart>
            </div>

            <div style = {styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Area Chart representation of type of establishment with percentage of crimes -</p>
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
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Composed Charts representation of Range of liquor licenses with Crimes taking place -</p>
              <ComposedChart width={800} height={400} data={data9}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                  <CartesianGrid stroke='#f5f5f5'/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey='Crimes' barSize={20} fill='#66a5ad'/>
                  <Line type='monotone' dataKey='Crimes' stroke='#ff7300'/>
              </ComposedChart>
            </div>
            <div style = {styles.divBoxes}>
            <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Radar Chart representation for Review Rating VS Predicted Sentiment fo the reviews -</p>
              <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={data6}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={45} domain={[0, 8000]}/>
                <Tooltip />
                <Radar name="Positive" dataKey="positive" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
                <Legend stroke = "#000000"/>
                <Brush />
              </RadarChart>
            
              <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500} data={data6}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={45} domain={[0, 4000]}/>
                <Tooltip />
                <Radar name="Negative" dataKey="negative" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5}/>
                <Legend />
                <Brush />
              </RadarChart>
            </div>
            <div style = {[styles.centerBox, styles.divBoxes]}>
              <BubbleChart
              style = {[styles.centerBox, styles.divBoxes]}
                    graph = {{
                      zoom: 1,
                      offsetX: 0,
                      offsetY: 0.01,
                    }}
                    width={900}
                    height={900}
                    showLegend={false} // optional value, pass false to disable the legend.
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
                    <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', background: 'white', width: 'auto', display: 'inline-block'}}>Fig: Bubble Chart representation for top K  restaurants with their ratings aggregated.</p>
            </div>
            <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.3rem'}}>ARTIFACTS & CODE</p>
            <div style = {styles.divBoxes}>
              <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1rem', margin: '5px'}}>All of the code from data pulling, cleaning, loading and visualization are available at:</p>
              <ul style = {{textAlign: 'left', width: '100%', margin: '5px auto'}}>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- ETL/ Data pipeline Code Repository: <a href= 'https://github.com/titu1994/IDS-Course-Project' target = '_blank'>Github</a></li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Visualization Code Repository: <a href= 'https://github.com/dkaushik94/vis-alethea' target = '_blank'>Github</a></li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Project Updates website <a href= 'https://titu1994.github.io/IDS-Course-Project/' target = '_blank'> here.</a></li>
              </ul>
            </div>
            <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.3rem'}}>TEAM MEMBERS</p>
            <div style = {styles.divBoxes}>
            <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1rem', margin: '5px'}}>
              The project was developed by team 'ALETHEA' for the course of Introduction to Data Science for the Spring of 2018 at University of Illinois at Chicago.
              <br />
              <br />
              This course was designed and taught by <a href = "https://www.cs.uic.edu/Cruz/" target = "_blank"><b>Prof. Isabel Cruz.</b></a>
              <br />
              <br />
              The teaching assistants for the course were:
              <div style = {{display: 'flex', justifyContent: 'center'}}>
                <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b><a href="http://www.vivekrs.com/" target = '_blank'>Vivek R. Shivaprabhu</a></b></li>
                <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b><a href="http://boomasb.com/" target = '_blank'>Booma S. Balasubramani</a></b></li>
                <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b>"Ellen" Zhu Wang</b></li>
              </div>
            </p>
            <br />
            <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: "1.2rem", margin: "0px"}}>Team members: </p>
            <div style = {{display: 'flex'}}>
              <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b><a href="https://github.com/titu1994" target = '_blank'>Somshubra Majumdar</a></b></li>
              <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b> • <a href= "https://github.com/abhoi" target = "_blank">Amlaan Bhoi</a></b></li>
              <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b> • <a href= "https://github.com/dkaushik94" target = "_blank">Debojit Kaushik</a></b></li>
              <li style = {{listStyle: "None", fontFamily: '"Raleway", sans-serif', margin: '3px'}}><b> • <a href= "https://github.com/calphones" target = "_blank">Christopher Alphones</a></b></li>
            </div>
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
    padding: '10px',
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
