var districts = {
  'd': [  [42.37552,-71.11429],
          [42.37189,-71.11525],
          [42.36978,-71.11257],
          [42.36861,-71.10927],
          [42.36787,-71.1077],
          [42.36676,-71.10598],
          [42.36772,-71.10502],
          [42.37364,-71.1007],
          [42.3744,-71.10167],
          [42.3743,-71.10324],
          [42.37402,-71.10298],
          [42.37552,-71.11429]
        ],
  'e': [  [42.36558,-71.10394],
          [42.36634,-71.10528],
          [42.36809,-71.10811],
          [42.3691,-71.11064],
          [42.36999,-71.11291],
          [42.37189,-71.11523],
          [42.3724,-71.11515],
          [42.37335,-71.11862],
          [42.37364,-71.11931],
          [42.36986,-71.12244],
          [42.36961,-71.12171],
          [42.36986,-71.11944],
          [42.36945,-71.11794],
          [42.36844,-71.11669],
          [42.36679,-71.11613],
          [42.36466,-71.11609],
          [42.36289,-71.11609],
          [42.36146,-71.116],
          [42.36511,-71.10472],
          [42.36558,-71.10394]
        ]
}

function makeDistrict(pointsArray){
    // Takes an array of points and returns a polygon object
    var coords = [];
    var district;
    for(point in pointsArray){
      coords.push(new google.maps.LatLng(pointsArray[point][0],pointsArray[point][1]))
    }

    district = new google.maps.Polygon({
      paths: coords,
      // strokeColor: '#FF0000',
      // strokeOpacity: 0.8,
      // strokeWeight: 2,
      // fillColor: '#FF0000',
      // fillOpacity: 0.35
    });

    return district;
}

function initialize() {
  
  var myLatLng = new google.maps.LatLng(42.369451896762385, -71.10527515411377);
  navigator.geolocation.getCurrentPosition(function(){console.log("check!")});
  var mapOptions = {
    zoom: 14,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Construct the polygon
  // bermudaTriangle = new google.maps.Polygon({
  //   paths: triangleCoords,
  //   strokeColor: '#FF0000',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35
  // });
  
  var distD = makeDistrict(districts.d);
  distD.setMap(map);
  distD.setOptions({fillColor:'#FF0000'});

  var distE = makeDistrict(districts.e)
  distE.setMap(map);



  // function isWithinPoly(event){
  //    var isWithinPolygon = google.maps.geometry.poly.containsLocation(event.latLng, this);
  //     console.log(isWithinPolygon);
  //     console.log(event);
  //  }


}


google.maps.event.addDomListener(window, 'load', initialize);

/*

1. Find current position
2a. Load map at current position
2b. Define & draw polygons
3b. Find if current position is inside a given polygon
4b. Report: current polygon odd/even schedule
2b1. Color polygons based on all clear (green), odd OR even cleaning today OR tomorrow (red) -- future feature: # of days to leave car

*/


