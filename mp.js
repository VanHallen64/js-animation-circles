"use strict";


let circleArray = [];
let ctx;
let animationInterval;

let maxRadius=100;
let radiusIncrement=2;


function setup () {
	ctx = document.getElementById("surface").getContext("2d");
}

function play() {
	if (animationInterval == undefined) {
		animationInterval = setInterval(draw,50);
	}
}

function pause() {
	clearInterval(animationInterval);
	animationInterval = undefined;
}

function Circle(x,y,r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.isExpanding = true;
	
	this.color = "hsl(" + Math.round(Math.random()*360) + ",100%,50%)";
	
	this.updateCircle = function() {
		if (this.isExpanding) {
			this.r += radiusIncrement;
			if (this.r >= maxRadius) {
				this.isExpanding = false;
			}
		} else {
			this.r -= radiusIncrement;
		}
	}
	
}

//Cavas click
function newCircle(e) {
	if (animationInterval == undefined) {
		return;
	}

	let newX = e.offsetX;
	let newY = e.offsetY;
	
	
	circleArray.push(new Circle(newX,newY,0));
	/*
	ctx.beginPath();
	ctx.arc(newX,newY,10,0,2*Math.PI);
	ctx.stroke();
	*/
}

function draw() {
	ctx.clearRect(0,0,400,400);
	
	for (let i = 0; i < circleArray.length; i++) {
		let c = circleArray[i];
		ctx.beginPath();
		ctx.strokeStyle = c.color;
		ctx.arc(c.x,c.y,c.r,0,2*Math.PI);
		ctx.stroke();
		c.updateCircle();
		if (c.r <= 0) {
			circleArray.splice(i,1);
			i--;
		}
		
	}
	
}


