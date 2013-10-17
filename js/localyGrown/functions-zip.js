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
            click: showPopupComp
        });
    }
      //use for the timeout
    var closeTooltip;
    //
    // popup functions: basic: centered element, Comp: other element
    //
    function showPopupBasic(e){
        var layer = e.target;
        showPopup(e,'Zip code - <strong> '+ layer.feature.properties.zipcode + '</strong>');
    }
    function showPopupComp(e){
        var layer = e.target;
        showPopup(e,'Zip code - <strong> '+ layer.feature.properties.zipcode + '</strong><br/><div style="text-align:center;"><strong>'+layer.feature.properties.dist+'</strong> miles from <strong>'+zipSearch+'</strong> and has data <strong>'+layer.feature.properties.data+'</strong></div>');
    }
    //common code
    function showPopup(e,content){
        var popup = new L.Popup({ autoPan: false });
        popup.setLatLng(e.latlng);
        popup.setContent(content);
        //if poput not already display
        if (!popup._map) popup.openOn(map);
        window.clearTimeout(closeTooltip);
    }
    //mouse event (common for both
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
    var statesCaching=[];
    var statesIdLoaded=[];
    //caching storing all the zipcode stored to avoid to load them multiple times
    
    window.foundZip=false;
      
    /*
    Return state by id
    */
    function findStateById(id){
        for(var i=0;i<statesCaching.length;i++){
            var state=statesCaching[i];
            if(state.state==id)
                return state;
        }
    }
    function checkIfPresent(vector,value){
        for(var i=0;i<vector.length;i++){
            if(vector[i]==value){
                return true;
            }
        }
        return false;
    }   
    function loadDataProximities(){
        $.ajax({
            crossDomain: true,
            cache: false,
            url: "/api/zipcodes/"+zipSearch+"/proximities?dist="+window.distance+"&offset="+window.offset+"&limit="+config.step,
            error: function(jqXHR,textStatus,errorThrown){
                alert("error");
                console.log(jqXHR+" "+textStatus+" "+errorThrown);
            }
        }).done(addProximity);  
    }
    function addProximity(data){
        if(data.proximities!=undefined && data.proximities.length>0){
            window.offset+=config.step;
//            console.log(data);
            //reconstruction process of topojson
            var finish=true;
            var numToProcess=data.proximities.length;
            var group=[];
            var prevState=data.proximities[0].state;
            group.push(data.proximities[0].geometries)
            var proceeded=1;
            while(proceeded<numToProcess){
                proceeded++;
                var currentProx=data.proximities[proceeded-1];
                if(currentProx.state!=prevState || proceeded==numToProcess){
                    //use the group and add topojson to map
                    //we have to topojson general info
                    if(proceeded==numToProcess)
                        group.push(currentProx.geometries)
                    var stateInfo=findStateById(prevState);
                    var topo={};
                    topo.transform=JSON.parse(stateInfo.transform);
                    topo.arcs=JSON.parse(stateInfo.arcs);
                    topo.objects=[];
                    topo.objects.push({
                        "type":"GeometryCollection",
                        "geometries":group
                    });
                    topo.type="Topology";
                    //console.log("add topo");
                    var neighborhoods = topojson.feature(topo, topo.objects[0]);
                    console.log(neighborhoods);
                    jsons.push(neighborhoods);
                    dataJson.addData(neighborhoods);
                    if(currentProx.state!=prevState){
                        group=[];
                        group.push(currentProx.geometries)
                    }
                }     
                else{
                    group.push(currentProx.geometries)
                }
                prevState=currentProx.state;
            }
            loadDataProximities()
        }
    }  
    //function called to add a zipcode to the map and the zipped close according to a certain distance
    function loadZipCodes(data){
            if(data!="error"){
                for(var i=0;i<data.states.length;i++){   
                    statesCaching.push(data.states[i]);
                    statesIdLoaded.push(data.states[i].state);
                }
                //remove if previous search
                dataJson.clearLayers();
                map.setView([data.zip.lat,data.zip.long],10);
                window.offset=0;
                loadDataProximities();
            }
            else{
              alert("this zip code does not exist");
            }
            
    }
    
    //function that is called to display the information: NEED REFACTORING
    function showInfo(id_input,id_distance){
        //close popup not immediately if displayed
        closeTooltip = window.setTimeout(function() {
            map.closePopup();
        }, 100);
        //global parameter of the search : distance and zipcode
        window.zipSearch=document.getElementById(id_input).value;
        /*window.distance=document.getElementById(id_distance).value;
        if(distance<10)
            distance=10;
        if(distance>200)
            distance=200;*/
        window.distance=80;
        $.ajax({
                    type:"POST",
                    crossDomain: true,
                    cache: false,
                    url: "/api/zipcodes/"+window.zipSearch+"/states",
                    data:{ 'statesLoaded':statesIdLoaded,'dist':distance},
                    error: function(jqXHR,textStatus,errorThrown){
                        console.log(jqXHR+" "+textStatus+" "+errorThrown);
                    }
        }).done(loadZipCodes);
       // }
    }   