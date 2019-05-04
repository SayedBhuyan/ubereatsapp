var app = new Vue({
  el: '#app',
  data: {
    apprunning: false,
    datetimestart: '',
    datetimeend: '',
    minutescalculation: '',
    minutesworked: '',
    mileagestart: '',
    mileageend: '',
    milesdriven: '',
    lastearned: '0',
    addTrip: '0',
    earned: '0',
    gaspergallon: '2.5', // settings
    carmpg: '25', // settings
    disiredsalery: '9', // settings
    yourcurrentscore: '',
    hourlyavgincome: '',
    netcurrentincome: '',
    location: ''
  },
  created: function () {
  	var d = new Date();
  	var year = d.getFullYear();
  	var month = ("0"+(d.getMonth()+1)).slice(-2);
  	var date = ("0" + d.getDate()).slice(-2);
  	var hours = d.getHours();
  	var minutes = ("0" + d.getMinutes()).slice(-2);

  	var str = year +"-"+ month +"-"+ date +"T"+ hours +":"+ minutes;

  	// this.datetimestart = "2019-05-04T10:40";
  	this.datetimestart = str;
	 if (localStorage.apprunning) {this.apprunning = localStorage.apprunning;}
	 if (localStorage.datetimestart) {this.datetimestart = localStorage.datetimestart;}
	if (localStorage.datetimestart) {this.datetimestart = localStorage.datetimestart}
	if (localStorage.datetimeend) {this.datetimeend = localStorage.datetimeend}
	if (localStorage.minutescalculation) {this.minutescalculation = localStorage.minutescalculation}
	if (localStorage.minutesworked) {this.minutesworked = localStorage.minutesworked}
	if (localStorage.mileagestart) {this.mileagestart = localStorage.mileagestart}
	if (localStorage.mileageend) {this.mileageend = localStorage.mileageend}
	if (localStorage.milesdriven) {this.milesdriven = localStorage.milesdriven}
	if (localStorage.lastearned) {this.lastearned = localStorage.lastearned}
	if (localStorage.addTrip) {this.addTrip = localStorage.addTrip}
	if (localStorage.earned) {this.earned = localStorage.earned}
	if (localStorage.gaspergallon) {this.gaspergallon = localStorage.gaspergallon}
	if (localStorage.carmpg) {this.carmpg = localStorage.carmpg}
	if (localStorage.disiredsalery) {this.disiredsalery = localStorage.disiredsalery}
	if (localStorage.yourcurrentscore) {this.yourcurrentscore = localStorage.yourcurrentscore}
	if (localStorage.hourlyavgincome) {this.hourlyavgincome = localStorage.hourlyavgincome}
	if (localStorage.netcurrentincome) {this.netcurrentincome = localStorage.netcurrentincome}
	if (localStorage.location) {this.location = localStorage.location}



  },
  methods: {
  	submitmileage: function() {


	if(this.datetimestart.length <= 20) {
		this.datetimestart = this.datetimestart+":00-04:00";  // timezone
	} else if(this.datetimestart.length > 20) {
		this.datetimestart = this.datetimestart;  // timezone
	}
	this.datetimestart = new Date(this.datetimestart);
	this.datetimeend = new Date(); //"now"
	this.minutescalculation = Math.abs(this.datetimestart-this.datetimeend) / 60000 / 60;  // difference in milliseconds to minutes
	this.minutesworked = (this.minutescalculation * 60).toFixed(0);  // difference in milliseconds to minutes

	// initial mileage
	this.mileageend = this.mileagestart;
	this.milesdriven = this.mileagestart - this.mileageend;

  	this.startApp(this);



// console.log("datetimestart: " + this.datetimestart);
// console.log("datetimeend: " + this.datetimeend);
// console.log("minutescalculation: " + this.minutescalculation);
// console.log("minutesworked: " + this.minutesworked);
// console.log("mileagestart: " + this.mileagestart);
// console.log("mileageend: " + this.mileageend);
// console.log("milesdriven: " + this.milesdriven);
// console.log("yourcurrentscore: " + this.yourcurrentscore);
// console.log("hourlyavgincome: " + this.hourlyavgincome);
// console.log("netcurrentincome: " + this.netcurrentincome);
  	},
  	getupdate: function() {
  		this.milesdriven = this.mileageend - this.mileagestart;
  		if(this.addTrip > 0) {
	  		this.earned = Number(this.earned) + Number(this.addTrip);
	  		this.lastearned = Number(this.addTrip);
	  	}
  		this.yourcurrentscore = this.earned / ((this.milesdriven / this.carmpg) * this.gaspergallon)
  								+ (this.disiredsalery * this.carmpg);
  		this.hourlyavgincome = (this.earned - (this.milesdriven / this.carmpg) * this.gaspergallon)
  								/ this.minutescalculation;
  		this.addTrip = 0;

  	},
  	startApp: function(data) {
  		this.apprunning = true;
		localStorage.setItem("apprunning", this.apprunning);
		localStorage.setItem("datetimestart", this.datetimestart);
		localStorage.setItem("datetimeend", this.datetimeend);
		localStorage.setItem("minutescalculation", this.minutescalculation);
		localStorage.setItem("minutesworked", this.minutesworked);
		localStorage.setItem("mileagestart", this.mileagestart);
		localStorage.setItem("mileageend", this.mileageend);
		localStorage.setItem("milesdriven", this.milesdriven);
		localStorage.setItem("lastearned", this.lastearned);
		localStorage.setItem("addTrip", this.addTrip);
		localStorage.setItem("earned", this.earned);
		localStorage.setItem("gaspergallon", this.gaspergallon);
		localStorage.setItem("carmpg", this.carmpg);
		localStorage.setItem("disiredsalery", this.disiredsalery);
		localStorage.setItem("yourcurrentscore", this.yourcurrentscore);
		localStorage.setItem("hourlyavgincome", this.hourlyavgincome);
		localStorage.setItem("netcurrentincome", this.netcurrentincome);
		localStorage.setItem("location", this.location);
  	},
  	resetApp: function() {
  		localStorage.clear();
  		location.reload();
  	}
  }
});




// var d = new Date();

// var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
// d.getHours() + ":" + d.getMinutes();

// console.log(datestring);