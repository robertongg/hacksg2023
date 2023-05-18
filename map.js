initMap();
// Initialize and display the map
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
