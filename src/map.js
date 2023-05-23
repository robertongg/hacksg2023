import locationData from "./cash-for-trash-geocoded.json" assert { type: 'json' };

initMap();
// Initialize and display the map
function initMap() {
  // Create a new map instance
  const myLatLng = { lat: 1.3727824622487255, lng: 103.89378686837495 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myLatLng,
  });
  // Centers map and increases zoom if postal code was entered
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postalCode = urlParams.get("postal");
  const apiUrl = `https://developers.onemap.sg/commonapi/search?searchVal=${encodeURIComponent(postalCode)}&returnGeom=Y&getAddrDetails=Y`
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the API response
    // Extract the geolocation data from the response
    const results = data.results;
    if (results.length > 0) {
      const latitude = parseFloat(results[0].LATITUDE);
      const longitude = parseFloat(results[0].LONGITUDE);
      map.setCenter({lat: latitude, lng: longitude});
      map.setZoom(16);
    } else {
      console.log('No geolocation data found for the postal code:', postalCode);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
  // Add markers and info windows
  let prev_infowindow = false; 
  locationData.map((location, i) => {
    let marker = new google.maps.Marker({
      position: {
        lat: parseFloat(location["Latitude"]),
        lng: parseFloat(location["Longitude"])
      },
      map: map,
    });
    const infowindow = new google.maps.InfoWindow({
      content: `<div>Cash For Trash</div><div>${location["Location"]}, ${location["Postal Code"]}</div>`,
      disableAutoPan: true
    });

    marker.addListener("click", () => {
      if( prev_infowindow ) {
         prev_infowindow.close();
      }
      prev_infowindow = infowindow;
      infowindow.open({
        anchor: marker,
        map,
      });
    });
    // Add locations to pin points section in left sidebar
    let nameNode = document.createElement("h4");
    nameNode.append("Cash For Trash");
    let locationNode = document.createElement("p");
    locationNode.append(location["Location"] + ", " + location["Postal Code"]);

    let pinPointNode = document.createElement("div");
    pinPointNode.classList.add("pin-point-details");
    pinPointNode.append(nameNode);
    pinPointNode.append(locationNode);

    let pinPointsSection = document.getElementById("pin-points-section");
    pinPointsSection.append(pinPointNode);
  });
}

// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: { lat: 1.3727824622487255, lng: 103.89378686837495 },
//   });
//   const infoWindow = new google.maps.InfoWindow({
//     content: "",
//     disableAutoPan: true,
//   });
//   // Create an array of alphabetical characters used to label the markers.
//   // Add some markers to the map.
//   const markers = locationData.map((location, i) => {
//     console.log("Latitude", parseFloat(location["Latitude"]));
//     console.log("Longitude", parseFloat(location["Longitude"]));
//     const marker = new google.maps.Marker({
//       position: {
//         lat: parseFloat(location["Latitude"]),
//         lng: parseFloat(location["Longitude"])
//       },
//     });
//     console.log("whuttt");


//     // markers can only be keyboard focusable when they have click listeners
//     // open info window when marker is clicked
//     marker.addListener("click", () => {
//       // infoWindow.setContent(label);
//       infoWindow.open(map, marker);
//     });
//     return marker;


//   });

//   // Add a marker clusterer to manage the markers.
//   const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
  
// }

// const locations = [
//   { lat: -31.56391, lng: 147.154312 },
//   { lat: -33.718234, lng: 150.363181 },
//   { lat: -33.727111, lng: 150.371124 },
//   { lat: -33.848588, lng: 151.209834 },
//   { lat: -33.851702, lng: 151.216968 },
//   { lat: -34.671264, lng: 150.863657 },
//   { lat: -35.304724, lng: 148.662905 },
//   { lat: -36.817685, lng: 175.699196 },
//   { lat: -36.828611, lng: 175.790222 },
//   { lat: -37.75, lng: 145.116667 },
//   { lat: -37.759859, lng: 145.128708 },
//   { lat: -37.765015, lng: 145.133858 },
//   { lat: -37.770104, lng: 145.143299 },
//   { lat: -37.7737, lng: 145.145187 },
//   { lat: -37.774785, lng: 145.137978 },
//   { lat: -37.819616, lng: 144.968119 },
//   { lat: -38.330766, lng: 144.695692 },
//   { lat: -39.927193, lng: 175.053218 },
//   { lat: -41.330162, lng: 174.865694 },
//   { lat: -42.734358, lng: 147.439506 },
//   { lat: -42.734358, lng: 147.501315 },
//   { lat: -42.735258, lng: 147.438 },
//   { lat: -43.999792, lng: 170.463352 },
// ];

// initMap();