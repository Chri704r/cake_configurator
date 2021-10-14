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

  const container2 = document.querySelector("#container_2");
  const cakeInDom = document.querySelector("#container_2 svg");

  container2.insertBefore(cakeInDom, container2.childNodes[0]);

  init();
}

function init() {
  //declare variables for all parts of the cake
  const bottom_layer = document.querySelector("#bottom_layer");
  const middle_layer = document.querySelector("#middle_layer");
  const top_layer = document.querySelector("#top_layer");
  const border = document.querySelector("#border");

  let currentColor = "white";

  document.querySelector("input[type=color]").value = "#CEBBBB";

  bottom_layer.style.fill = currentColor;
  middle_layer.style.fill = currentColor;
  top_layer.style.fill = currentColor;
  border.style.fill = currentColor;

  //add eventlistners to all parts of the cake
  bottom_layer.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  middle_layer.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  top_layer.addEventListener("click", (event) => {
    setColor(event.target, currentColor);
  });

  border.addEventListener("click", (event) => {
    setColor(document.querySelector("#border"), currentColor);
  });

  //listen to clicked color and set the current color value equal to selected color
  document.querySelectorAll(".color").forEach((color) => {
    color.addEventListener("click", (event) => {
      currentColor = event.target.style.backgroundColor;

      const prevChocen = document.querySelector("#color_container .chosen");

      if (prevChocen) {
        prevChocen.classList.remove("chosen");
      }

      event.target.classList.add("chosen");
    });
  });

  //listen for color input
  document
    .querySelector("input[type=color]")
    .addEventListener("input", (event) => {
      currentColor = document.querySelector("input[type=color]").value;
    });

  //listen for click on feature options
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));

  //listen for click on save button
  document
    .querySelector("#save_button_wrapper button")
    .addEventListener("click", () => {
      document.querySelector(".line").classList.add("saved");
      document.querySelector(".circle").style.stroke = "#d4af37";
      document.querySelector("#save_text").classList.remove("hide");
      document.querySelector("#save_text").classList.add("fadein");

      //clear storige
      localStorage.clear();

      //save cake with localStorage
      localStorage.setItem(
        "bottom",
        document.querySelector("#bottom_layer .cls-5").style.fill
      );
      localStorage.setItem(
        "middle",
        document.querySelector("#middle_layer .cls-5").style.fill
      );
      localStorage.setItem(
        "top",
        document.querySelector("#top_layer .cls-5").style.fill
      );
      localStorage.setItem(
        "border",
        document.querySelector("#border").style.fill
      );

      if (
        !document
          .querySelector(`#container_2 [data-feature="texture1"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("texture1", "hide");

        if (localStorage.texture2 == "hide") {
          localStorage.removeItem("texture2");
        }
        if (localStorage.texture3 == "hide") {
          localStorage.removeItem("texture3");
        }
      }
      if (
        !document
          .querySelector(`#container_2 [data-feature="texture2"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("texture2", "hide");

        if (localStorage.texture1 == "hide") {
          localStorage.removeItem("texture1");
        }
        if (localStorage.texture3 == "hide") {
          localStorage.removeItem("texture3");
        }
      }
      if (
        !document
          .querySelector(`#container_2 [data-feature="texture3"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("texture3", "hide");

        if (localStorage.texture1 == "hide") {
          localStorage.removeItem("texture1");
        }
        if (localStorage.texture2 == "hide") {
          localStorage.removeItem("texture2");
        }
      }
      if (
        !document
          .querySelector(`#container_2 [data-feature="candles"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("candles", "hide");
      }
      if (
        !document
          .querySelector(`#container_2 [data-feature="flowers"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("flowers", "hide");
      }
      if (
        !document
          .querySelector(`#container_2 [data-feature="birthday"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("birthday", "hide");
      }
      if (
        !document
          .querySelector(`#container_2 [data-feature="wedding"]`)
          .classList.contains("hide")
      ) {
        localStorage.setItem("wedding", "hide");
      }
    });

  if (localStorage.bottom) {
    bottom_layer.style.fill = localStorage.bottom;
  }
  if (localStorage.middle) {
    middle_layer.style.fill = localStorage.middle;
  }
  if (localStorage.top) {
    top_layer.style.fill = localStorage.top;
  }
  if (localStorage.border) {
    border.style.fill = localStorage.border;
  }
  if (localStorage.texture1 == "hide") {
    document
      .querySelector(`#container_2 [data-feature="texture2"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture3"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture1"]`)
      .classList.remove(localStorage.texture1);
  }
  if (localStorage.texture2 == "hide") {
    document
      .querySelector(`#container_2 [data-feature="texture1"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture3"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture2"]`)
      .classList.remove(localStorage.texture2);
  }
  if (localStorage.texture3 == "hide") {
    document
      .querySelector(`#container_2 [data-feature="texture1"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture2"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture3"]`)
      .classList.remove(localStorage.texture3);
  }
  if (localStorage.candles == "hide") {
    document
      .querySelector(`#container_2 [data-feature="candles"]`)
      .classList.remove(localStorage.candles);
  }
  if (localStorage.flowers == "hide") {
    document
      .querySelector(`#container_2 [data-feature="flowers"]`)
      .classList.remove(localStorage.flowers);
  }
  if (localStorage.birthday == "hide") {
    document
      .querySelector(`#container_2 [data-feature="birthday"]`)
      .classList.remove(localStorage.birthday);
  }
  if (localStorage.wedding == "hide") {
    document
      .querySelector(`#container_2 [data-feature="wedding"]`)
      .classList.remove(localStorage.wedding);
  }

  const ishidden = document.querySelectorAll(`#container_2 [data-feature]`);

  ishidden.forEach((item) => {
    if (!item.classList.contains("hide")) {
      const setTrue = item.dataset.feature;
      console.log("setTrue", setTrue);
      const setChosen = document.querySelector(
        `#container_1 [data-feature=${setTrue}`
      );
      const setChosenImg = setChosen.querySelector("img");

      features[setTrue] = true;
      setChosenImg.classList.add("chosen");

      addFeatureList(setTrue);
    }
  });
}

function setColor(element, colorString) {
  element.style.fill = colorString;

  document.querySelector(".line").classList.remove("saved");
  document.querySelector(".circle").style.stroke = "#b9b9b9";
  document.querySelector("#save_text").classList.add("hide");
  document.querySelector("#save_text").classList.remove("fadein");
}

function toggleOption(event) {
  const target = event.currentTarget;

  const feature = target.dataset.feature;

  const targetImg = target.querySelector(`img`);

  //texture dependencie
  if (
    feature === "texture1" ||
    feature === "texture2" ||
    feature === "texture3"
  ) {
    // set other textures to be false and remove chosen
    if (feature === "texture1") {
      features["texture2"] = false;
      features["texture3"] = false;
      document
        .querySelector(`#container_1 [data-feature="texture2"] img`)
        .classList.remove("chosen");
      document
        .querySelector(`#container_1 [data-feature="texture3"] img`)
        .classList.remove("chosen");
      document.querySelector;
    } else if (feature === "texture2") {
      features["texture1"] = false;
      features["texture3"] = false;
      document
        .querySelector(`#container_1 [data-feature="texture1"] img`)
        .classList.remove("chosen");
      document
        .querySelector(`#container_1 [data-feature="texture3"] img`)
        .classList.remove("chosen");
    } else if (feature === "texture3") {
      features["texture1"] = false;
      features["texture2"] = false;
      document
        .querySelector(`#container_1 [data-feature="texture1"] img`)
        .classList.remove("chosen");
      document
        .querySelector(`#container_1 [data-feature="texture2"] img`)
        .classList.remove("chosen");
    }

    // - no longer mark other features as chosen

    // - hide the feature-layer(s) in the #product-preview
    document
      .querySelector(`#container_2 [data-feature="texture1"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture2"]`)
      .classList.add("hide");
    document
      .querySelector(`#container_2 [data-feature="texture3"]`)
      .classList.add("hide");

    //remove from feature list
    const text1 = document.querySelector(`#feature_text .texture1`);
    const text2 = document.querySelector(`#feature_text .texture2`);
    const text3 = document.querySelector(`#feature_text .texture3`);
    if (text1) {
      text1.remove();
    }
    if (text2) {
      text2.remove();
    }
    if (text3) {
      text3.remove();
    }
  }

  //Toggle feature in "model"
  if (features[feature] === false) {
    features[feature] = true;
  } else {
    features[feature] = false;
  }

  if (features[feature]) {
    console.log(`Feature ${feature} is turned on!`);

    // - mark target as chosen (add class "chosen")
    targetImg.classList.add("chosen");
    if (
      feature === "texture1" ||
      feature === "texture2" ||
      feature === "texture3"
    ) {
      // - un-hide the feature-layer(s) in the #product-preview;
      document
        .querySelector(`#container_2 [data-feature="${feature}"]`)
        .classList.remove("hide");
    }
    if (
      feature === "candles" ||
      feature === "flowers" ||
      feature === "wedding" ||
      feature === "birthday"
    ) {
      removeHide();
      // - un-hide the feature-layer(s) in the #product-preview; with a setTimeout
      function removeHide() {
        setTimeout(() => {
          console.log("remove hide feature");

          document
            .querySelector(`#container_2 [data-feature="${feature}"]`)
            .classList.remove("hide");
        }, 900);
      }
      // - create featureElement and append to #container_2
      const cakeFeature = createFeatureElement(feature);
      // const cakeFeature = document.querySelector(`.item_wrapper[data-feature="${feature}"]`);

      document.querySelector("#container_2").append(cakeFeature);
      // FLIP animation

      //get bounding client rect, we get the information of an element
      const firstFrame = document
        .querySelector(
          `#container_1 .feature_container #item_features .item_wrapper[data-feature="${feature}"]`
        )
        .getBoundingClientRect();
      //console.log("firstframe", firstFrame);

      let lastFrame = cakeFeature.getBoundingClientRect();
      // console.log("lastFrame", lastFrame);

      const deltaX = firstFrame.left - lastFrame.left;
      const deltaY = firstFrame.top - lastFrame.top;

      0;
      let animation = cakeFeature.animate(
        [
          {
            transformOrigin: "top left",
            transform: `translate(${deltaX}px, ${deltaY}px)`,
          },
          { transformOrigin: "top left", transform: "none" },
        ],

        {
          duration: 900,
          easing: "ease-in-out",
        }
      );
      // - when animation is complete, remove featureElement from the DOM
      animation.onfinish = function () {
        cakeFeature.remove();
      };
    }

    //add feature to text list
    addFeatureList(feature);
  } else {
    console.log(`Feature ${feature} is turned off!`);

    // - no longer mark target as chosen
    targetImg.classList.remove("chosen");

    //remove from feature list
    document.querySelector(`#feature_text .${feature}`).remove();

    if (
      feature === "candles" ||
      feature === "flowers" ||
      feature === "wedding" ||
      feature === "birthday"
    ) {
      // - find the existing featureElement on the cake
      const exFeatureElement = document.querySelector(
        `#container_2 [data-feature="${feature}"]`
      );

      let animationHide = exFeatureElement.animate(
        [
          {
            transformOrigin: "top left",
            opacity: "1",
          },
          {
            transformOrigin: "top left",
            opacity: "0",
          },
        ],
        {
          duration: 600,
          easing: "ease-in-out",
        }
      );
      // - when animation is complete, add the class hide back
      animationHide.onfinish = function () {
        console.log("hide cake feature");
        document
          .querySelector(`#container_2 [data-feature="${feature}"]`)
          .classList.add("hide");
      };
    }
    if (
      feature === "texture1" ||
      feature === "texture2" ||
      feature === "texture3"
    ) {
      //adds the class hide back
      document
        .querySelector(`#container_2 [data-feature="${feature}"]`)
        .classList.add("hide");
    }
  }
}

//add text to feature list
function addFeatureList(feature) {
  const p = document.createElement("p");
  p.classList.add(`${feature}`);

  if (feature === "wedding") {
    p.textContent = `- wedding topper`;
  } else if (feature === "birthday") {
    p.textContent = `- birthday sign`;
  } else if (feature.includes("texture")) {
    p.textContent = `- cake texture`;
  } else {
    p.textContent = `- ${feature}`;
  }
  document.querySelector("#feature_text").append(p);
}
//the animation element that flies on to the cake
function createFeatureElement(feature) {
  const img = document.createElement("img");
  img.style.width = "95px";
  img.style.height = "105px";
  if (feature == "candles") {
    console.log("candless");
    img.src = "img/candles-small.png";
  } else if (feature == "birthday") {
    console.log("biday");
    img.src = "img/happy_birthday.png";
  } else if (feature == "wedding") {
    console.log("wedding");
    img.src = "img/wedding_topping.png";
  } else {
    console.log("flowers");
    img.src = `img/${feature}.png`;
  }
  return img;
}

//localStorage.clear();
