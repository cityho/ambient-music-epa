module.exports = {
  capability: "colorControl",
  command: "setColor",
  component: "main",
  //x : hue [0-99] , y: saturation [0-99], hue offset : 10~15
  colors: {
    joy: [
      { text: "yellow", hue: 4, saturation: 99 },
      { text: "yellow", hue: 4, saturation: 79 },
      { text: "yellow", hue: 11, saturation: 99 },
      { text: "yellow", hue: 11, saturation: 79 },
      { text: "pink", hue: 83, saturation: 70 },
    ],
    sadness: [
      { text: "blue", hue: 68, saturation: 99 },
      { text: "purple", hue: 70, saturation: 99 },
      { text: "blue", hue: 58, saturation: 99 },
      { text: "purple", hue: 70, saturation: 99 },
      { text: "blue", hue: 67, saturation: 69 },
      { text: "purple", hue: 70, saturation: 99 },
      { text: "blue", hue: 58, saturation: 69 },

      //{ text: "white", hue: 96, saturation: 34 },
      //{ text: "pink", hue: 83, saturation: 88 },
    ],
    anger: [
      { text: "red", hue: 0, saturation: 99 },
      { text: "white", hue: 96, saturation: 34 },
      { text: "blue", hue: 68, saturation: 89 },
    ],
    surprise: [
      { text: "purple", hue: 73, saturation: 99 },
      { text: "yellow", hue: 15, saturation: 85 },
      { text: "pink", hue: 83, saturation: 88 },
    ],
    fear: [
      { text: "purple", hue: 70, saturation: 99 },
      { text: "white", hue: 70, saturation: 34 },
      { text: "redOrange", hue: 98, saturation: 99 },
      { text: "white", hue: 98, saturation: 54 },
      //   { text: "blue", hue: 68, saturation: 89 },
      //   { text: "pink", hue: 83, saturation: 88 },
    ],
    disgust: [
      { text: "green", hue: 29, saturation: 99 },
      { text: "green", hue: 29, saturation: 67 },
      { text: "green", hue: 47, saturation: 99 },
      { text: "green", hue: 27, saturation: 67 },
      { text: "green", hue: 17, saturation: 99 },
    ],
    neutral: [
      { text: "pink", hue: 83, saturation: 88 },
      { text: "red", hue: 0, saturation: 99 },
      { text: "blue", hue: 68, saturation: 89 },
    ],
  },
};

// sadness : { text : 'blue', hue: 68, saturation: 89 },
// anger : { text: 'red', hue: 0, saturation: 99 },
// surprise : { text: 'purple' , hue: 73, saturation: 99 },
// fear : { text: 'white', hue: 96, saturation: 34 },
// disgust : {  text: 'white', hue: 96, saturation: 34 },
// neutral : { text: 'pink' ,hue: 83, saturation: 88 },
