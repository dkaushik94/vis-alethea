import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  {LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart} from 'recharts';
// import q from './q10-da.js'
var q = require('./q10-d.json');
var q8 = require('./q8-d.json')

let data = [];
let data8 = [];
// console.log(q)
// let data = [
//   {name: 'Jan', MOTOR_VEHICLE_THEFT: q["1"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["1"]["THEFT"]["prob"], 'ROBBERY': q["1"]["ROBERY"]["prob"], 'BURGLARY': q["1"]["BURGLARY"]["prob"]},
//   {name: 'Feb', MOTOR_VEHICLE_THEFT: q["2"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["2"]["THEFT"]["prob"], 'ROBBERY': q["2"]["ROBERY"]["prob"], 'BURGLARY': q["2"]["BURGLARY"]["prob"]},
//   {name: 'Mar', MOTOR_VEHICLE_THEFT: q["3"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["3"]["THEFT"]["prob"], 'ROBBERY': q["3"]["ROBERY"]["prob"], 'BURGLARY': q["3"]["BURGLARY"]["prob"]},
//   {name: 'Apr', MOTOR_VEHICLE_THEFT: q["4"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["4"]["THEFT"]["prob"], 'ROBBERY': q["4"]["ROBERY"]["prob"], 'BURGLARY': q["4"]["BURGLARY"]["prob"]},
//   {name: 'May', MOTOR_VEHICLE_THEFT: q["5"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["5"]["THEFT"]["prob"], 'ROBBERY': q["5"]["ROBERY"]["prob"], 'BURGLARY': q["5"]["BURGLARY"]["prob"]},
//   {name: 'Jun', MOTOR_VEHICLE_THEFT: q["6"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["6"]["THEFT"]["prob"], 'ROBBERY': q["6"]["ROBERY"]["prob"], 'BURGLARY': q["6"]["BURGLARY"]["prob"]},
//   {name: 'Jul', MOTOR_VEHICLE_THEFT: q["7"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["7"]["THEFT"]["prob"], 'ROBBERY': q["7"]["ROBERY"]["prob"], 'BURGLARY': q["7"]["BURGLARY"]["prob"]},
//   {name: 'Aug', MOTOR_VEHICLE_THEFT: q["8"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["8"]["THEFT"]["prob"], 'ROBBERY': q["8"]["ROBERY"]["prob"], 'BURGLARY': q["8"]["BURGLARY"]["prob"]},
//   {name: 'Sept', MOTOR_VEHICLE_THEFT: q["9"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["9"]["THEFT"]["prob"], 'ROBBERY': q["9"]["ROBERY"]["prob"], 'BURGLARY': q["9"]["BURGLARY"]["prob"]},
//   {name: 'Oct', MOTOR_VEHICLE_THEFT: q["10"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["10"]["THEFT"]["prob"], 'ROBBERY': q["10"]["ROBERY"]["prob"], 'BURGLARY': q["10"]["BURGLARY"]["prob"]},
//   {name: 'Nov', MOTOR_VEHICLE_THEFT: q["11"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["11"]["THEFT"]["prob"], 'ROBBERY': q["11"]["ROBERY"]["prob"], 'BURGLARY': q["11"]["BURGLARY"]["prob"]},
//   {name: 'Dec', MOTOR_VEHICLE_THEFT: q["12"]["MOTOR VEHICLE THEFT"]["prob"], 'THEFT': q["12"]["THEFT"]["prob"], 'ROBBERY': q["12"]["ROBERY"]["prob"], 'BURGLARY': q["12"]["BURGLARY"]["prob"]}
// ];

let months = {
  1: 'Jan', 2:'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'
}

for(var i = 1; i <=12; i++){
  let d = {};
  d.name = months[i];
  d.mvt = q[i]["MOTOR VEHICLE THEFT"]["prob"];
  d.THEFT = q[i]["THEFT"]["prob"];
  d.ROBBERY = q[i]["ROBBERY"]["prob"]
  d.BURGLARY = q[i]["BURGLARY"]["prob"];
  // console.log(q.BURGLARY.prob)
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

// for(var i = 1; i <= 12; i++){

//   console.log(q[i]["THEFT"]["prob"]);

// }

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
          <Line type="monotone" dataKey="MOTOR VEHICLE THEFT" stroke="#8884d8" />
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
          <Bar dataKey="MOTOR VEHICLE THEFT" fill="#8884d8" />
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
      </div>
    );
  }
}

export default App;
