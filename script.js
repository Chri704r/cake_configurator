"use script";

window.addEventListener("DOMContentLoaded", start);

// The model of all features
const features = {
	candles: false,
	flowers: false,
	wedding: false,
	birthday: false,
	texture1: false,
	texture2: false,
	texture3: false,
};

async function start() {
	console.log("ready");
	const response = await fetch("cake-01.svg");
	const cake = await response.text();

	//add cake image to container
	document.querySelector("#container_2").innerHTML += cake;

	init();
}

function init() {
	console.log("init");
	//declare variables for all parts of the cake
	const bottom_layer = document.querySelector("#bottom_layer");
	const middle_layer = document.querySelector("#middle_layer");
	const top_layer = document.querySelector("#top_layer");
	const border = document.querySelector("#border");

	let currentColor = "white";

	bottom_layer.style.fill = currentColor;
	middle_layer.style.fill = currentColor;
	top_layer.style.fill = currentColor;
	border.style.fill = currentColor;

	//add eventlistners to all parts of the cake
	bottom_layer.addEventListener("click", (event) => {
		setColor(event.target, currentColor);
		console.log("bottom_layer clicked");
	});

	middle_layer.addEventListener("click", (event) => {
		setColor(event.target, currentColor);
	});

	top_layer.addEventListener("click", (event) => {
		setColor(event.target, currentColor);
	});

	border.addEventListener("click", (event) => {
		console.log("border cliked");
		setColor(document.querySelector("#border"), currentColor);
	});

	//listen to clicked color and set the current color value equal to selected color
	document.querySelectorAll(".color").forEach((color) => {
		color.addEventListener("click", (event) => {
			currentColor = event.target.style.backgroundColor;
		});
	});

	//listen for color input
	document.querySelector("input[type=color]").addEventListener("input", (event) => {
		currentColor = document.querySelector("input[type=color]").value;
	});

	//listen for click on feature options
	document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function setColor(element, colorString) {
	console.log("setColor");
	console.log(element);
	element.style.fill = colorString;
}

function toggleOption(event) {
	const target = event.currentTarget;
	const feature = target.dataset.feature;

	//Toggle feature in "model"
	if (features[feature] === false) {
		features[feature] = true;
	} else {
		features[feature] = false;
	}

	if (features[feature]) {
		console.log(`Feature ${feature} is turned on!`);

		// - mark target as chosen (add class "chosen")
		target.classList.add("chosen");

		// - un-hide the feature-layer(s) in the #product-preview;
		document.querySelector(`#container_2 [data-feature="${feature}"]`).classList.remove("hide");

		// TODO: More code
	} else {
		console.log(`Feature ${feature} is turned off!`);

		// - no longer mark target as chosen
		target.classList.remove("chosen");

		// - hide the feature-layer(s) in the #product-preview
		document.querySelector(`#container_2 [data-feature="${feature}"]`).classList.add("hide");
	}
}
