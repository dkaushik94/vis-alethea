//Written by Debojit Kaushik (24th April)

import React, { Component } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { Map, TileLayer,GeoJSON } from 'react-leaflet';
import logo from './Logo.png';
import axios from 'axios';
import './App.css';
import 'leaflet/dist/leaflet.css'
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
  Label, 
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

const osmTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [41.881832, -87.623177];  
const zoomLevel = 15;
const minZoomLevel= 10;



let background_url = require('./shots.jpg');
var q = require('./q10-d.json');
var q1 = require('./q1-d.json');
var q8 = require('./q8-d.json');
var q9 = require('./q9-d.json');
var q6 = require('./q6-d.json');
var q6_2 = require('./q6-d2.json');
var geojson = require('./data.json');
var shade ='#F79F1F';
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

	constructor(props) {
		super(props);
		this.state = {input:''};
	}

  setMarker = () => {
    var uluru = { lat: 41.874306, lng: -87.647175 };
    var marker = new window.google.maps.Marker({
      position: uluru,
      map: window.gmaps['map1'].gmap
    });
  };

  updateState = (event) => {
  	console.log(event.target.value);
  	// axios.post('http://35.193.72.219:9000/sentiment/dl', {
  	// 	"model_name": "lstm",
  	// 	"query": event.target.value
  	// })
  	// .then((res) => {
  	// 	console.log(res);
  	// })
  	// .catch((e) => {
  	// 	console.log(e);
  	// });
  	axios({
  		method: "post",
  		url: "http://35.193.72.219:9000/sentiment/dl",
  		crossDomain: true,
  		headers: {
  			"Access-Control-Allow-Origin": "*",
  			"Content-Type": "application/json"
  		},
  		data: {
  			"model_name": "lstm",
  			"query": event.target.value
  		}
  	})
  	.then((res) => {
  		// console.log(this.refs.conf.innerHTML + '1');
  		this.refs.conf.innerHTML = res.data.confidence
  		if (res.data.sentiment == 'P') {
  			this.refs.lab.innerHTML = 'Positive';
  		} else {
  			this.refs.lab.innerHTML = 'Negative';
  		}
  		// this.refs.lab.innerHTML = res.data.sentiment
  	});
  	// this.setState({input: event.target.value});
  }

  componentWillMount(){
    document.title = "Alethea | Data Viz"
    console.log(this)
  }
  onEachFeature(feature, layer) {
         
    layer.bindPopup(feature.properties.tract_bloc+"::"+"Liquor Business : "+feature.properties.name10+"::Crimes :  "+feature.properties.countyfp10);
        var x = feature.properties.countyfp10
    
    }

getStyle(feature, layer) {
    var x = feature.properties.countyfp10
    switch (true) {
        case (x < 6):
        shade = '#99FF00'
            break;
        case (x < 10):
        shade = '#999900';
            break;
        case (x < 15):
        shade = '#999900';
            break;
       
         case (x < 20 ):
         shade = '#CC6600';
         break;

         case (x < 25):
         shade = '#CC3300';
         break;

         case (x < 30):
         shade = '#FF3300';
         break;
       
         case (x < 40):
         shade = '#FF3333';
         break;

         case (x < 50):
         shade = '#CC9900';
         break;

         case (x < 74):
         shade = '#990000';
         break;

         default:
        shade = '#6ab04c';            
        break;
    }

    return {
      color: shade,
      weight: 2,
      opacity: 0.75
    }
  }

  render() {
    let mapOptions = {
      zoom: 15,
      center: { lat: 41.874306, lng: -87.647175 }
    };
    return (
      <div>
        
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
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> Crime probabilities vs Month</p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Weather + Crimes + Census</p>
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
            <Bar dataKey="count" name = "No. of restaurants" fill="#FFB6C1" />
            </BarChart>
            <div style = {{display: 'flex', width: '100%', textAlign: 'left', flexDirection: 'column', margin: '10px'}}>
                
                <ul>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> Number of restaurants vs Number of years alive after failed inspection</p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Food Inspections + Business Licenses</p>
                  {/* <li style = {{listStyle: 'none',fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}></li> */}
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Inferences:</b></p>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>A majority of restaurants who fail their food inspections close down by year 1-2 after the failed inspection date. Surprisingly, many restaurants survive year 3-4 too displaying the lax in strictness by the proper authorities.</li>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>The distribution of the count of restaurants surviving over the years is not linear. This at least shows that when the years increase, the amount of restaurants go down above linear scale. This is good news for patrons in Chicago!</li>
                </ul>
              </div>
            </div>

            <div style = {styles.divBoxes}>
              <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Area Chart representation of type of establishment with percentage of crimes -</p>
              <AreaChart width={800} height={400} data={data2} stackOffset="expand"
                margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                <XAxis dataKey="Year" padding={{left: 30, right: 30}}/>
                <YAxis tickFormatter={toPercent}/>
                <Tooltip/>
                <Legend />
                <Area type='monotone' dataKey='a' name = "Grocery Store" stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='b' name = "Schools" stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                <Area type='monotone' dataKey='c' name = "Restaurants" stackId="1" stroke='#ffc658' fill='#ffc658' />
              </AreaChart>
              <div style = {{display: 'flex', width: '100%', textAlign: 'left', flexDirection: 'column', margin: '10px'}}>
                
                <ul>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> Crime percentage vs Type of establishment</p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Crimes + Business License</p>
                  {/* <li style = {{listStyle: 'none',fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}></li> */}
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Inferences:</b></p>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>We can clearly see that crimes happening at grocery stores and restaurants have gone down from 2017 to 2018. This shows the trend of more crimes being prevented due to stricter rules.</li>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>Surprisingly, crimes occuring at schools have increased from 2017 to 2018. These crimes may happen around the school area that can contribute to this statistic.</li>
                </ul>
              </div>
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
              <div style = {{display: 'flex', width: '100%', textAlign: 'left', flexDirection: 'column', margin: '10px'}}>
                
                <ul>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> No. of Crimes at establishement VS Liquor Licenses</p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Businesses + Crime </p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Inferences:</b></p>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>We can see restaurants with less licenses see a higher number of crimes. This is suggestive of these establishments don't enforce proper decorum and law within their control giving a rise to susceptibility towards crimes taking place.</li>
                </ul>
              </div>
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
              <div style = {{display: 'flex', width: '100%', textAlign: 'left', flexDirection: 'column', margin: '10px'}}>
                
                <ul>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> Review Ratings vs Sentiment Labels</p>
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Yelp Reviews + Yelp Dataset</p>
                  {/* <li style = {{listStyle: 'none',fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}></li> */}
                  <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Inferences:</b></p>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>One of the biggest correlations we see is that positive (+) sentiments are linked more towards 4-5 review ratings for a particular restaurant. Almost 8000 reviews that have given 5 star ratings have a positive sentiment with 4 star reviews tagging behind at about 6000.</li>
                  <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>Negative (-) sentiments are linked more with review ratings of 1-3. This is expected and makes sense. The most number of review ratings class that correlates with negative sentiments is review with ratings of 3 at about 3000 reviews.</li>
                </ul>
              </div>
            </div>
            <div style = {styles.divBoxes}>
            <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Top 20 Reviews Count Aggregated by Restaurant and Ratings -</p>
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
                    <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '0.8rem'}}> <b>Rating to Color</b> - 5: Green 4: Blue 3: Yellow 2: Red 1: Black </p>
                    <div style = {{display: 'flex', width: '100%', textAlign: 'left', flexDirection: 'column', margin: '10px'}}>
                      <ul>
                        <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Title:</b> Review Ratings vs Review Counts</p>
                        <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Data used:</b> Yelp Dataset + Yelp Reviews</p>
                        {/* <li style = {{listStyle: 'none',fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}></li> */}
                        <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.1rem'}}><b>Inferences:</b></p>
                        <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>We can clearly see that people are more prone to report a restaurant's positive qualities much more than the negative qualities.</li>
                        <li style = {{fontFamily: '"Raleway", sans-serif', fontSize : '0.8rem'}}>A majority of the popular reviews in terms of count for a particular restaurant seem to hover around 4-5 stars. We can also see that people usually review more on the same restaurant with different ratings. This can show which restaurants have contensting reviews.</li>
                      </ul>
                    </div>
            </div>
            <div style = {styles.divBoxes}>
            <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Live Sentiment Analysis of Text! -</p>
            	<input type="text" onChange={this.updateState}/>
            	<p style = {{fontFamily: '"Raleway", sans-serif', textAlign:'left!important', margin: '15px'}}><b>Confidence:</b> <span id="conf" ref="conf"></span></p>
            	<p style = {{fontFamily: '"Raleway", sans-serif', textAlign:'left!important', margin: '15px'}}><b>Sentiment:</b> <span id="lab" ref="lab"></span></p>
            	<p style = {{fontFamily: '"Raleway", sans-serif', textAlign:'left!important', margin: '15px'}}>Yes! Seriously. You get live analysis of your text in the above text box. We call our custom API running Keras Multiplicative LSTM and LSTM models on a Flask Server. Go nuts!</p>
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
            <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1.3rem'}}>REFERENCES & LIBRARIES USED</p>
            <div style = {styles.divBoxes}>
              <p style = {{fontFamily: '"Raleway", sans-serif', fontSize: '1rem', margin: '5px'}}>On top of the cleaning and development code written we found a lot of help online and the libraries which made this possible in the time frame are:</p>
              <ul style = {{textAlign: 'left', width: '100%', margin: '5px auto'}}>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Keras for Deep Learning</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- NumPy</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- SciPy</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- scikit-learn</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Pandas python library</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- ScraPy</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- usaddress</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- TensorFlow</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- scrapy-beautifulsoup</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- ReactJS for website</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- ReCharts for data Visualization</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- react-leaflet for Heatmap</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- City of Chicago data portal for data sources</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- census.gov for data sources</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Wunderground API for weather data</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Python documentation, ReactJS Documentation</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- create-react-app for bootstrapping the project</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- Flask</li>
                <li style = {{listStyle: 'None', fontFamily: '"Raleway", sans-serif'}}>- ParticlesJS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div style = {styles.parentBox}>
      <p style = {{color: 'black', fontFamily: '"Raleway", sans-serif', fontSize: '1.2rem'}}>- Interactive Map with Census Block vs Business Licenses vs Crimes -</p>
      <Map ref={m => { this.leafletMap = m; }}
            center={mapCenter}
            zoom={zoomLevel}
            minZoom={minZoomLevel}>
                    <TileLayer
                        attribution={osmAttr}
                        url={osmTiles}
                    />

                     {geojson['features'].map((item, index)=>{
                      return(
                        <GeoJSON id={index} data ={item} style={this.getStyle} onEachFeature ={this.onEachFeature} />
                      )
                  })}
            </Map>    
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
