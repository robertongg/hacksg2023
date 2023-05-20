// initMap();
// Initialize and display the map
function readFileAsString(filePath) {
  try {
    const fs = require('fs');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(fileContent);
    return fileContent;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

// readFileAsString('e-waste.csv')
extractCoordinatesFromFile('e-waste.csv')


function extractCoordinatesFromFile(filePath) {
  const coordinates = [];
  const fs = require('fs');

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  const regex = /destination=([-.\d]+),([-.\d]+)/;

  for (let line of lines) {
    if (line.includes('https')) {
      const match = regex.exec(line);
      if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        coordinates.push({ latitude, longitude });
      }
    }
  }
  console.log(coordinates);

  return coordinates;
}

// Example usage
// const filePath = 'path/to/file.txt';
// const extractedCoordinates = extractCoordinatesFromFile(filePath);
// console.log(extractedCoordinates);


function initMap() {



    // Create a new map instance
    const myLatLng = { lat: 1.3727824622487255, lng: 103.89378686837495 };

    // const myLatLng = { lat: destinationPairs[0].x, lng: destinationPairs[0].y };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: myLatLng,
    });
    // for (let i = 0; i < 2; i++) {
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
      });
    

  }
