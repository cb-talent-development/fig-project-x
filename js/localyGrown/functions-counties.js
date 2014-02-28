//load data thanks to an url
function loadData(url){
    window.loaded=false;
    $.get(url,function(data){
        window.loaded=true;
        window.worldData=data;
    }).fail(function() { alert("error, the file "+url+" does not exits"); });

}
// Set base style of vector data: basic: centered element, comp: other one
function style(feature) {
  return {
        weight: 2,
        opacity: 0.2,
        color: 'black',
        fillOpacity: 0.4,
        fillColor: getColorData(feature.properties.data)
  };
}
var maxData=500;
//color depending on distance
function getColorData(d) {

    //we can use of course another alternaive fo colors
    return d > 7*maxData/8 ? '#8B0000' :
        d > 6*maxData/8  ? '#B22222' :
        d > 5*maxData/8  ? '#DD2222' :
        d > 4*maxData/8  ? '#FF0000' :
        d > 3*maxData/8   ? '#FF4500' :
        d > 2*maxData/8   ? '#FF8C00' :
        d > maxData/8   ? '#FFA500' :
        '#FFD700';
}
//fonction to apply for a polygon displayed : basic: centered polygon, Comp: other one
function onFeature(feature, layer) {
    layer.on({
        mousemove: mousemove,
        mouseout: mouseout,
        click: showPopupContent
    });
}
  //use for the timeout
var closeTooltip;
//
// popup functions: basic: centered element, Comp: other element
//
function showPopupContent(e){
    var layer = e.target;
    showPopup(e,'County - <strong> '+ layer.feature.properties.longName + '</strong><br/><div style="text-align:center;"><strong>'+layer.feature.properties.dist+'</strong> miles from <strong>'+window.zipSearch+'</strong> and has data <strong>'+layer.feature.properties.data+'</strong></div>');
}
//function that allow to open a popup
function showPopup(e,content){
    var popup = new L.Popup({ autoPan: false });
    popup.setLatLng(e.latlng);
    popup.setContent(content);
    //if poput not already display
    if (!popup._map) popup.openOn(map);
    window.clearTimeout(closeTooltip);
}
//mouse events (common for both)
function mousemove(e) {
    var layer = e.target;
    // highlight feature
    layer.setStyle({
        weight: 3,
        opacity: 0.4,
        fillOpacity: 0.6
    });
    //browser updates
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function mouseout(e) {
    //get to previous style
    var layer = e.target;
    // highlight feature
    layer.setStyle({
        weight: 2,
        opacity: 0.2,
        fillOpacity: 0.4
    });
}
//not used
function zoomToFeature(e) {
    //zoom on click !
    map.fitBounds(e.target.getBounds());
}

//array used to do multiple search and remove previous one

var jsons=[];
//variables used to avoid loading many times the states information
var countiesCaching=[];
var countiesLoaded=[];
//caching storing all the zipcode stored to avoid to load them multiple times

window.foundZip=false;


//Return state by id    
function findStateById(id){
    for(var i=0;i<statesCaching.length;i++){
        var state=statesCaching[i];
        if(state.state==id)
            return state;
    }
}
//Small function that check if an element is present in a vector
function checkIfPresent(vector,value){
    for(var i=0;i<vector.length;i++){
        if(vector[i]==value){
            return true;
        }
    }
    return false;
}  
//Load the boundaries that are close a given zipcode
function loadDataProximities(){
    $.ajax({
        crossDomain: true,
        cache: false,
        url: "/api/zipcodes/"+zipSearch+"/counties?dist="+window.distance+"&offset="+window.offset+"&limit="+config.step_counties,
        error: function(jqXHR,textStatus,errorThrown){
            alert("error");
            console.log(jqXHR+" "+textStatus+" "+errorThrown);
        }
    }).done(addProximity);  
}
//Add the previously loaded proximities to the map
function addProximity(data){
    if(data.proximities!=undefined && data.proximities.length>0){
        window.offset+=config.step_counties;
        //reconstruction process of topojson
        var group=[];
        for(var i=0;i<data.proximities.length;i++){
            var county=data.proximities[i];
            //countiesCaching.push(county.geometries);
            //countiesLoaded.push(county.counties_id);
            group.push(county.geometries);
        }
        window.topo={};
        topo.transform=worldData.transform;
        topo.arcs=worldData.arcs;
        topo.objects=[];
        topo.objects.push({
            "type":"GeometryCollection",
            "geometries":group
        });
        topo.type="Topology";
        var neighborhoods = topojson.feature(topo, topo.objects[0]);
        dataJson.addData(neighborhoods);
        loadDataProximities()
    }
}  
//function called to add a zipcode to the map and the zipped close according to a certain distance
function loadCounties(data){
        if(data!="error"){
            //remove if previous search
            dataJson.clearLayers();
            map.setView([data.lat,data.long],10);
            window.offset=0;
            loadDataProximities();
        }
        else{
          alert("this zip code does not exist");
        }

}

//function that is called to display the information: NEED REFACTORING
function showInfo(id_input,id_distance){
    if(window.loaded){
       /* 
        var neighborhoods = topojson.feature(window.worldData, window.worldData.objects["tl_2013_us_county"]);
        console.log(neighborhoods);
        dataJson.addData(neighborhoods);//*/

        //close popup not immediately if displayed
        closeTooltip = window.setTimeout(function() {
            map.closePopup();
        }, 100);
        //global parameter of the search : distance and zipcode
        window.zipSearch=document.getElementById(id_input).value;
        //distance (if not imposed that could be used if an input is added)
       /* window.distance=document.getElementById(id_distance).value;
        if(distance<50)
            distance=50;*/
        window.distance=200;
        $.ajax({
                    crossDomain: true,
                    cache: false,
                    url: "/api/zipcodes/"+window.zipSearch,
                    error: function(jqXHR,textStatus,errorThrown){
                        console.log(jqXHR+" "+textStatus+" "+errorThrown);
                    }
        }).done(loadCounties);
    }
}   