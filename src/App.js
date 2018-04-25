import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
} from 'recharts';
// import q from './q10-da.js'
var q = require('./q10-d.json');
var q8 = require('./q8-d.json');
let data8 = [];

var q1 = require('./q1-d.json');

let data = [];
let data2 = [];

let months = {
  1: 'Jan', 2:'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'
}

data2 = [
  {Year: "2017", a: (q1["2017"]["a"]/q1["total_crimes"])*100, b: (q1["2017"]["b"]/q1["total_crimes"])*100, c: (q1["2017"]["c"]/(q1["total_crimes"]))*100},
  {Year: "2018", a: (q1["2018"]["a"]/q1["total_crimes"])*100, b: (q1["2018"]["b"]/q1["total_crimes"])*100, c: (q1["2018"]["c"]/(q1["total_crimes"]))*100}
]


for(var i = 1; i <= 12; i++){
  let d = {};
  d.name = months[i];
  d.mvt = q[i]["MOTOR VEHICLE THEFT"]["prob"];
  d.THEFT = q[i]["THEFT"]["prob"];
  d.ROBBERY = q[i]["ROBBERY"]["prob"]
  d.BURGLARY = q[i]["BURGLARY"]["prob"];
  data.push(d);
}

for (var i = 1; i <= 8; i++) {
	let d = {};
	d.years = i
	d.count = q8[i]
	d.name = i
	console.log(d)
	data8.push(d)
}

console.log(data8)
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
    	<p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
      	{
        	payload.map((entry, index) => (
          	<li key={`item-${index}`} style={{color: entry.color}}>
            	{`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Alethea</h1>
        </header>
        <h1 className="App-intro">
          Visualizations!
        </h1>
        <div>
          <p>
            Line Chart representation of monthly probabilities of every crime
          </p>
        </div>
        <LineChart width={800} height={250} data = {data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mvt" stroke="#8884d8" />
          <Line type="monotone" dataKey="THEFT" stroke="#82ca9d" />
          <Line type="monotone" dataKey="ROBBERY" stroke="#000000" />
          <Line type="monotone" dataKey="BURGLARY" stroke="#900" />
        </LineChart>
        <br/>
          <p>Bar Chart representation of monthly probabilities of every crime</p>
          <BarChart height = {250} width = {800} data = {data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokedDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="mvt" fill="#8884d8" />
          <Bar dataKey="THEFT" fill="#82ca9d" />
          <Bar dataKey="ROBBERY" fill="#000000" />
          <Bar dataKey="BURGLARY" fill="#900" />
          </BarChart>
        <br/>
          <p>Bar Chart representation of number of restaurants open after x years of failed inspection</p>
          <BarChart height = {250} width = {800} data = {data8}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokedDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#900" />
          </BarChart>

          <AreaChart width={800} height={400} data={data2} stackOffset="expand"
            margin={{top: 10, right: 30, left: 0, bottom: 0}} >
            <XAxis dataKey="Year"/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip/>
            <Area type='monotone' dataKey='a' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='b' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            <Area type='monotone' dataKey='c' stackId="1" stroke='#ffc658' fill='#ffc658' />
          </AreaChart>
      </div>
    );
  }
}

export default App;
