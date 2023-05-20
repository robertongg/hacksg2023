// change originalData file path, fs.writeFile file path, json columns (ID, Town Councils etc) and run node geocode.mjs in terminal
import * as fs from "fs";
import fetch from "node-fetch";; // If you are running the code in a Node.js environment
import originalData from "./cash-for-trash.json" assert { type: 'json' };;

const convertPostalCodes = async () => {
  const results = [];

  for (const oData of originalData) {
    const postalCode = oData["Postal Code"]
    const url = `https://developers.onemap.sg/commonapi/search?searchVal=${encodeURIComponent(postalCode)}&returnGeom=Y&getAddrDetails=Y`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const latitude = data.results[0].LATITUDE;
        const longitude = data.results[0].LONGITUDE;

        results.push({
          "ID": oData["ID"],
          "Town Councils": oData["Town Councils"],
          "Location": oData["Location"],
          "Schedule": oData["Schedule"],
          "Timing": oData["Timing"],
          "Postal Code": postalCode,
          "Latitude": latitude,
          "Longitude": longitude
        });
      } else {
        console.log(`No results found for postal code: ${postalCode}`);
      }
    } catch (error) {
      console.log(`An error occurred while processing postal code ${postalCode}:`, error);
    }
  }
  const jsonString = JSON.stringify(results);
  fs.writeFile('./cash-for-trash-geocoded.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })
  return results;
};

convertPostalCodes()
  .then(results => {
    const jsonData = JSON.stringify(results, null, 2);
    // Store the jsonData in a file using file system operations, e.g., fs.writeFile for Node.js
    console.log(jsonData);
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });