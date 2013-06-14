/*
ToDo:


Wishlist:
-geojson integration
-dynamic updating of tow days
-street-by-street rendering with odd/even/one-way intelligence

*/

var testMode = "test"; // 'test' overrides geolocation with hard-coded location

var districts = {
  'b': {
        shape:[  
              [42.36676,-71.10596],
              [42.36747,-71.10504],
              [42.37364,-71.10073],
              [42.36834,-71.09425],
              [42.36576,-71.09107],
              [42.36538,-71.09103],
              [42.36479,-71.0894],
              [42.36479,-71.0891],
              [42.36275,-71.08425],
              [42.36233,-71.08365],
              [42.36208,-71.08223],
              [42.36103,-71.08171],
              [42.35924,-71.08704],
              [42.35735,-71.09268],
              [42.35915,-71.09362],
              [42.35997,-71.09468],
              [42.35509,-71.10459],
              [42.3555,-71.10476],
              [42.36032,-71.09519],
              [42.36048,-71.09538],
              [42.36676,-71.10596]  
              ],
        towDay: {
          odd: {nth:"1st", day:"Monday"}, 
          even: {nth:"1st", day:"Tuesday"}
        }
      },
  'c': {
        shape:[
              [42.36549,-71.10409],
              [42.3652,-71.10452],
              [42.36143,-71.116],
              [42.35894,-71.11564],
              [42.35772,-71.11534],
              [42.35648,-71.11444],
              [42.35563,-71.11311],
              [42.35464,-71.11139],
              [42.35383,-71.10978],
              [42.35586,-71.10749],
              [42.3552,-71.10633],
              [42.35672,-71.10473],
              [42.3574,-71.106],
              [42.35839,-71.10484],
              [42.35915,-71.10618],
              [42.36046,-71.10476],
              [42.35965,-71.1033],
              [42.36012,-71.10278],
              [42.36097,-71.10425],
              [42.3629,-71.10243],
              [42.36188,-71.10077],
              [42.36298,-71.09958],
              [42.36549,-71.10409]
              ],
        towDay: {
          odd: {nth:"1st", day:"Friday"}, 
          even: {nth:"2nd", day:"Monday"}
        }
      },
  'd': {
        shape:[  
              [42.37552,-71.11429],
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
        towDay: {
          odd: {nth:"2nd", day:"Tuesday"}, 
          even: {nth:"2nd", day:"Wednesday"}
        }
      },
  'e': {
        shape:[
              [42.36558,-71.10394],
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
              ],
        towDay: {
          odd: {nth:"2nd", day:"Thursday"}, 
          even: {nth:"2nd", day:"Friday"}
        }
      },
  'f':  {
        shape:[ 
              [42.37399,-71.10302],
              [42.37426,-71.10313],
              [42.37911,-71.10845],
              [42.37942,-71.10768],
              [42.38177,-71.11064],
              [42.38183,-71.11152],
              [42.38438,-71.11487],
              [42.38518,-71.11557],
              [42.38671,-71.11687],
              [42.38784,-71.11778],
              [42.38827,-71.11939],
              [42.38713,-71.11909],
              [42.38548,-71.11929],
              [42.3831,-71.11963],
              [42.38023,-71.11987],
              [42.37792,-71.12066],
              [42.37762,-71.12079],
              [42.37741,-71.12032],
              [42.37587,-71.1198],
              [42.37586,-71.11804],
              [42.37549,-71.11452],
              [42.37403,-71.10334],
              [42.37399,-71.10302]
              ],
        towDay: {
          odd: {nth:"2nd", day:"Thursday"}, 
          even: {nth:"2nd", day:"Friday"}
        }
      }
}

// function checkDanger(districtName){
//     Date.today()
// }

console.log(new Date());

function drawDistrict(pointsArray, dangerLevel){
    // Takes an array of points and returns a polygon object
    var coords = [];
    var districtObject, districtColor;

    for(point in pointsArray){
      coords.push(new google.maps.LatLng(pointsArray[point][0],pointsArray[point][1]))
    }

    switch(dangerLevel){
      case "low": districtColor = "#00FF00";
      break;

      case "high": districtColor = "#FF0000";
      break;

      default: districtColor = "#000000";
      console.log("warning: dangerLevel should be set to either 'low' or 'high'.");
    }

    districtObject = new google.maps.Polygon({
      paths: coords,
      fillColor: districtColor,
      strokeColor: districtColor,
      strokeWeight: 1
    });

    return districtObject;
}

function initialize() {

    if(!!navigator.geolocation) {
    
        var map;
    
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            if(testMode !== "test"){
              var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            } else {
              var geolocate = new google.maps.LatLng(42.37552, -71.11429)
            }
            
            map.setCenter(geolocate);
            
        });
        
    } else {
        document.getElementById('map-canvas').innerHTML = 'No Geolocation Support.';
    }

    for(district in districts){
        drawDistrict(districts[district].shape).setMap(map);
    }
    
};

google.maps.event.addDomListener(window, 'load', initialize);


/*

1. Find current position
2a. Load map at current position
2b. Define & draw polygons
3b. Find if current position is inside a given polygon
4b. Report: current polygon odd/even schedule
2b1. Color polygons based on all clear (green), odd OR even cleaning today OR tomorrow (red) -- future feature: # of days to leave car

*/


