

const { workerData, parentPort } = require('worker_threads')

//var ratio = 3;
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {return deg * (Math.PI/180)} 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }



function blacksmith(house,refugee){
    if(house["place"]["armory"].build >= 1){
        var value = getRandomInt(5*house["place"]["armory"].build,10*house["place"]["armory"].build);
        var placeOk = false;
        if(Object.keys(house.cloth).length < house["place"]["store"].build*5){
            placeOk = true;
        }else{
            var clothLow = undefined;
            Object.keys(house.cloth).forEach(cloth => {
                if(!clothLow){
                    clothLow = house.cloth[cloth]
                }else if(clothLow.value > house.cloth[cloth].value){
                    clothLow = house.cloth[cloth]
                }
            });
            if(clothLow && clothLow.value < value){
                placeOk = true;
                delete house.cloth[clothLow];
            }else{
                placeOk = false;
            }
        }
        if(placeOk == true){
            if(getRandomInt(0,1000) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Pistol","type":"arme","value":value > 100 ? 100 : value,"poids":0.5,"equiped":0,"label":"Damage","repair":["Screw","Toolbox","Metal","Gear"],"need":"9 mm","icon":"pistol","durability":100}}else
            if(getRandomInt(0,1000) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Shootgun","type":"arme","value":value > 100 ? 100 : value,"poids":getRandomInt(3,4),"equiped":0,"label":"Damage","repair":["Screw","Toolbox","Metal","Gear"],"need":"12 mm","icon":"gun1","durability":100}}else
            if(getRandomInt(0,1000) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Ak47","type":"arme","value":value > 100 ? 100 : value,"poids":getRandomInt(3,4),"equiped":0,"label":"Damage","repair":["Screw","Toolbox","Metal","Gear"],"need":"7,62 mm","icon":"gun2","durability":100}}else
            if(getRandomInt(0,1000) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Rifle","type":"arme","value":value > 100 ? 100 : value,"poids":getRandomInt(4,5),"equiped":0,"label":"Damage","repair":["Screw","Toolbox","Metal","Gear"],"need":"12 mm","icon":"gun3","durability":100}}else
            if(getRandomInt(0,1000) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Sniper","type":"arme","value":value > 100 ? 100 : value,"poids":getRandomInt(5,6),"equiped":0,"label":"Damage","repair":["Screw","Toolbox","Metal","Gear"],"need":"5,56 mm","icon":"gun4","durability":100}}
            objSendable.cloth = house.cloth;
        }
    }
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

function armorsmith(house,refugee){
    if(house["place"]["weaving"].build >= 1){
        var value = getRandomInt(5*house["place"]["weaving"].build,10*house["place"]["weaving"].build);
        var placeOk = false;
        if(Object.keys(house.cloth).length < house["place"]["store"].build*5){
            placeOk = true;
        }else{
            var clothLow = undefined;
            Object.keys(house.cloth).forEach(cloth => {
                if(!clothLow){
                    clothLow = house.cloth[cloth]
                }else if(clothLow.value > house.cloth[cloth].value){
                    clothLow = house.cloth[cloth]
                }
            });
            if(clothLow && clothLow.value < value){
                placeOk = true;
                delete house.cloth[clothLow];
            }else{
                placeOk = false;
            }
        }
        if(placeOk == true){
            if(getRandomInt(0,100) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Hat","type":"vêtements","value":value > 100 ? 100 : value,"poids":0.5,"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"hat-fedora","durability":100}}else 
            if(getRandomInt(0,100) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Tshirt","type":"vêtements","value":value > 100 ? 100 : value,"poids":getRandomInt(1,3),"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"tshirt-v-outline","durability":100}}else 
            if(getRandomInt(0,100) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Sweat","type":"vêtements","value":value > 100 ? 100 : value,"poids":0.5,"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"tshirt-crew","durability":100}}else 
            if(getRandomInt(0,100) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Gloves","type":"vêtements","value":value > 100 ? 100 : value,"poids":0.5,"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"mixed-martial-arts","durability":100}}else 
            if(getRandomInt(0,100) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Pants","type":"vêtements","value":value > 100 ? 100 : value,"poids":getRandomInt(2,3),"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"gentoo","durability":100}}else 
            if(getRandomInt(0,100) == 1){ house.cloth[getRandomInt(0,100000)] = {"name":"Shooes","type":"vêtements","value":value > 100 ? 100 : value,"poids":getRandomInt(1,3),"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"shoe-formal","durability":100}}
            objSendable.cloth = house.cloth;
        }
    }
}

function deleteQueue(house,place){
    var unique = true;
    house.queue.forEach((queue,index) => {
        if(queue == place && unique == true){
            house.queue.splice(index, 1);
            unique = false;
        }
    });
}
   
    function instructor(house,refugee){
        var refugeeChoose = randomProperty(house["refugee"])
        if(refugeeChoose.job.f < 100)
            refugeeChoose.job.f += 0.1;
    }

function builder(house,refugee){
    if(house.queue[0] && house.queue.length>0){
        var ok = true;
        Object.keys(houseNeed[house.queue[0]]).forEach(ress => {
            if(house["ress"][ress] < Math.floor((houseNeed[house.queue[0]][ress]*(1+house["place"][house.queue[0]].build))*((0.1*Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.b/1000))))/(1+house["place"][house.queue[0]].build)))) ok = false;
        });
        if(ok == true){
            Object.keys(houseNeed[house.queue[0]]).forEach(ress => {
                if(house["ress"][ress] >= houseNeed[house.queue[0]][ress]*(1+house["place"][house.queue[0]].build)) house["ress"][ress] -= Math.floor((houseNeed[house.queue[0]][ress]*(1+house["place"][house.queue[0]].build))*((0.1*Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.b/1000))))/(1+house["place"][house.queue[0]].build)));
                
                house["prod"][ress].use += Math.floor((houseNeed[house.queue[0]][ress]*(1+house["place"][house.queue[0]].build))*((0.1*Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.b/1000))))/(1+house["place"][house.queue[0]].build)));
            });
            house["place"][house.queue[0]].progress +=((0.1*Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.b/1000))))/(1+house["place"][house.queue[0]].build));
            house["place"][house.queue[0]].progress = (Math.round(house["place"][house.queue[0]].progress*10000)/10000)
            if(house["place"][house.queue[0]].progress > 100){
                house["place"][house.queue[0]].build += 1;
                house["place"][house.queue[0]].progress = 0;
                house.queue.shift();
            }
        }
    }
}

function farmer(house,refugee){
    var ressNecessaire = true;
    var full = true;
    house.rGreve = 1
    if(house.greve <= 0){
        house.greve = 1
    }else if(house.greve > 500){
        house.rGreve = 10
    }
    if(house.greve > 1000) house.greve = 1000
    farming[house["refugee"][refugee].work].need.forEach(needItem => {
        if(house["ress"][needItem] < Math.round((((((10*house["law"]["workHourByDay"])*(farming[house["refugee"][refugee].work].bonusPlace ? 1+(house["place"][farming[house["refugee"][refugee].work].bonusPlace].build/10) : 1))*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["factory"].build/20)))/house.rGreve)/(ressProd[needItem]))) 
        ressNecessaire = false;
    });
    if(ressNecessaire == true) {

        farming[house["refugee"][refugee].work].value.forEach(value => {
            if(house["ress"][value] < (5000*(1+(house["place"]["store"].build*house["place"]["store"].build)))/(ressProd[value])){
                full = false;
            }
        });
        if(full == false){
            farming[house["refugee"][refugee].work].need.forEach(needItem => {
                house["ress"][needItem] -= Math.round((((((10*house["law"]["workHourByDay"])*(farming[house["refugee"][refugee].work].bonusPlace ? 1+(house["place"][farming[house["refugee"][refugee].work].bonusPlace].build/10) : 1))*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["factory"].build/20)))/house.rGreve)/(ressProd[needItem]));
                house["prod"][needItem].use += Math.round((((((10*house["law"]["workHourByDay"])*(farming[house["refugee"][refugee].work].bonusPlace ? 1+(house["place"][farming[house["refugee"][refugee].work].bonusPlace].build/10) : 1))*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["factory"].build/20)))/house.rGreve)/(ressProd[needItem]));
            });
            //array pour fonte de pierre donne cuivre metal ou or
            farming[house["refugee"][refugee].work].value.forEach(value => {
                if(house["ress"][value] < (5000*(1+(house["place"]["store"].build*house["place"]["store"].build)))/(ressProd[value])){
                    house["ress"][value] += Math.round((((((10*house["law"]["workHourByDay"])*(farming[house["refugee"][refugee].work].bonusPlace ? 1+(house["place"][farming[house["refugee"][refugee].work].bonusPlace].build/10) : 1))*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["factory"].build/20)))/house.rGreve)/(ressProd[value]))
                    
                    if(house["ress"][value] > (5000*(1+(house["place"]["store"].build*house["place"]["store"].build)))/(ressProd[value]))
                    house["ress"][value] = (5000*(1+(house["place"]["store"].build*house["place"]["store"].build))/(ressProd[value]))

                }
                
                if(house["prod"][value]) house["prod"][value].prod += Math.round((((((10*house["law"]["workHourByDay"])*(farming[house["refugee"][refugee].work].bonusPlace ? 1+(house["place"][farming[house["refugee"][refugee].work].bonusPlace].build/10) : 1))*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["factory"].build/20)))/house.rGreve)/(ressProd[value]));
            });


        }
        

    }
    
}

function hapiness(house,refugee){
    house["refugee"][refugee].h = 0
    house["refugee"][refugee].h -= house["law"]["workHourByDay"]/(1+house.psycho)
    house["refugee"][refugee].h -= (18-house["law"]["ageForReproduce"])/(1+house.psycho)
    house["refugee"][refugee].h += house["law"]["ageForWork"]*(1+house.psycho)
    house["refugee"][refugee].h += (house["law"]["foodByDay"]*2)*(1+house.psycho)
    house["refugee"][refugee].h += (house["law"]["woodByDay"]*2)*(1+house.psycho)
    house["refugee"][refugee].h += (house["law"]["waterByDay"]*2)*(1+house.psycho)
    house["refugee"][refugee].h += (1+(house["place"]["school"].build/20))*(1+house.psycho)
    house["refugee"][refugee].h += (1+(house["place"]["medical"].build/20))*(1+house.psycho)
    house["refugee"][refugee].h += (1+(house["place"]["church"].build/20))*(1+house.psycho)
    house["refugee"][refugee].h += (1+(house["place"]["bar"].build/10))*(1+house.psycho)
    
    house["refugee"][refugee].h += ((house["refugee"][refugee].job.h/25)+(house["refugee"][refugee].job.m/25)+(house["refugee"][refugee].job.t/25)+(house["refugee"][refugee].job.p/25)+(house["refugee"][refugee].job.b/25))*(1+house.psycho)
    if(house["refugee"][refugee].h > 100) {house["refugee"][refugee].h = 100}else if(house["refugee"][refugee].h < 0){house["refugee"][refugee].h = 0}else{house["refugee"][refugee].h = Math.floor(house["refugee"][refugee].h)}

    if(house["refugee"][refugee].h < 50){
        house.greve += (50-(house["refugee"][refugee].h))/10000
    }else{
        house.greve -= (house["refugee"][refugee].h/10000)
    }
    house.greve = Math.floor(house.greve*1000)/1000
}


var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic NjQ4MTdjZjQtMTNkNS00MjM2LWE2N2YtYjg3M2E2MTU0NzQ2"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
      });
    });

    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  };

  var message = {
    app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
    contents: {"en": "Server Restarted"},
    included_segments: ["All"]
  };


function houseProcess(house){
        var dateProcess = Date.now()
        house["prod"]={"wood":{prod:0,use:0},"food":{prod:0,use:0},"water":{prod:0,use:0},"ammo":{prod:0,use:0}, "stone":{prod:0,use:0},"boards":{prod:0,use:0},"bricks":{prod:0,use:0},"leather":{prod:0,use:0},"armor":{prod:0,use:0},"copper":{prod:0,use:0},"metal":{prod:0,use:0},"gold":{prod:0,use:0},"gear":{prod:0,use:0},"screw":{prod:0,use:0},"toolbox":{prod:0,use:0},"gunpowder":{prod:0,use:0}};
        var hommes = [];
        var femmes = [];
        var teacher = 0;
        var build = 0;
        var medic = 0;
        var psycho = 0;
        var malade = 0;
        var adulte = 0;
        var femmeEnceinte = 0;
        Object.keys(house["refugee"]).forEach(refugee => {
            if(house["refugee"][refugee].a >= house["law"]["ageForWork"] && house["refugee"][refugee].a < 70){
                adulte += 1;
                house["refugee"][refugee].job.h = Math.round(house["refugee"][refugee].job.h)
                house["refugee"][refugee].job.m = Math.round(house["refugee"][refugee].job.m)
                house["refugee"][refugee].job.t = Math.round(house["refugee"][refugee].job.t)
                house["refugee"][refugee].job.p = Math.round(house["refugee"][refugee].job.p)
                house["refugee"][refugee].job.b = Math.round(house["refugee"][refugee].job.b)

                if(house["ress"]["wood"] < 6*Object.keys(house["refugee"]).length) house["refugee"][refugee].work = "lumberjack"
                if(house["ress"]["food"] < 3*Object.keys(house["refugee"]).length) house["refugee"][refugee].work = "farmer"

                if(house["refugee"][refugee].work == "farmer" || house["refugee"][refugee].work == "leatherworker" || house["refugee"][refugee].work == "stonemason" || house["refugee"][refugee].work == "woodworker" || house["refugee"][refugee].work == "lumberjack" || house["refugee"][refugee].work == "hunter" || house["refugee"][refugee].work == "stone miner" || house["refugee"][refugee].work == "ammo technician" || house["refugee"][refugee].work == "craftsman" || house["refugee"][refugee].work == "metalworker"){
                    farmer(house,refugee)
                }else if(house["refugee"][refugee].work == "weapon technician"){
                    blacksmith(house,refugee)
                }else if(house["refugee"][refugee].work == "armor technician"){
                    armorsmith(house,refugee)
                }else if(house["refugee"][refugee].work == "builder"){
                    builder(house,refugee);
                }else if(house["refugee"][refugee].work == "instructor"){
                    instructor(house,refugee);
                }
                
                if(house["ress"].water < 5000*(1+(house["place"]["store"].build*house["place"]["store"].build))) house["ress"].water += Math.round((house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["water station"].build/10)))

                if(house["ress"].water > 5000*(1+(house["place"]["store"].build*house["place"]["store"].build)))
                    house["ress"].water = 5000*(1+(house["place"]["store"].build*house["place"]["store"].build))

                if(house["prod"]["water"]) house["prod"]["water"].prod += Math.round((house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.h/1000)))*(1+(house["place"]["water station"].build/10)))

                teacher += house["refugee"][refugee].job.t;
                build += house["refugee"][refugee].job.b;
                medic += house["refugee"][refugee].job.m;
                psycho += house["refugee"][refugee].job.p;
            }else if(house["refugee"][refugee].a < house["law"]["ageForWork"] && house["place"]["school"].build >= 1){//SCHOOL
                if(house["refugee"][refugee].job.h < 100) house["refugee"][refugee].job.h += (getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.02 : 0.04))*(1+house.teacher))*(1+(house["place"]["school"].build/20))
                if(house["refugee"][refugee].job.m < 100) house["refugee"][refugee].job.m += (getRandomArbitrary(0,0.04)*(1+house.teacher))*(1+(house["place"]["school"].build/20))
                if(house["refugee"][refugee].job.t < 100) house["refugee"][refugee].job.t += (getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.04 : 0.02))*(1+house.teacher))*(1+(house["place"]["school"].build/20))
                if(house["refugee"][refugee].job.p < 100) house["refugee"][refugee].job.p += (getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.04 : 0.02))*(1+house.teacher))*(1+(house["place"]["school"].build/20))
                if(house["refugee"][refugee].job.b < 100) house["refugee"][refugee].job.b += (getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.02 : 0.04))*(1+house.teacher))*(1+(house["place"]["school"].build/20))
            }

            hapiness(house,refugee)
            
            if(getRandomArbitrary(0,Object.keys(houses).length) < getRandomArbitrary(0,1) && house["refugee"][refugee].a > 18 && house["refugee"][refugee].a < 70 && ((Object.keys(house.refugee).length > ((2+house["place"].house.build)*2)-2 || house["refugee"][refugee].h < 50 || house["refugee"][refugee].l < 50 || getRandomArbitrary(0,10) > getRandomArbitrary(0,100) ) ) && !exportMessage.moveRefugee && getRandomInt(0,Object.keys(houses).length) == 1 && adulte >= 4){
                var housesNear = []
                Object.keys(houses).forEach(houseNow => {//pourrais ne pas avoir envi
                    if(getDistanceFromLatLonInKm(houses[houseNow].lat,houses[houseNow].lng,house.lat,house.lng) < 200 && house.id != houses[houseNow].id && Object.keys(houses[houseNow].refugee).length < ((2+houses[houseNow]["place"].house.build)*2)-2 && houses[houseNow].birth > 2) 
                        housesNear.push(houses[houseNow])
                });
                if(housesNear.length > 0){
                    houseNear = housesNear[getRandomInt(0,housesNear.length)]
                    houseNear.refugee[refugee] = Object.assign({}, house["refugee"][refugee], {})
                    delete house["refugee"][refugee]
                    var dist = getDistanceFromLatLonInKm(house.lat,house.lng,houseNear.lat,houseNear.lng)
                    exportMessage.moveRefugee = {houseNear:{id:houseNear.id,refugee:houseNear.refugee[refugee]},
                        sLat:house.lat,slng:house.lng,eLat:houseNear.lat,eLng:houseNear.lng,dist:dist,byId:house.id,toId:houseNear.id,houseNear:houseNear
                    }
                }
            }else{
                //maladie par rapport au level house medic
                if(getRandomArbitrary(0,4000) < getRandomArbitrary(0,1+(house.malade*20)) && Object.keys(house["refugee"][refugee]) > 3){
                    house[Object.keys(house["log"]).length] = {t:"Disease",c1:house["refugee"][refugee].n,d:Date.now()}
                    house["refugee"][refugee].v += 1;
                    objSendable.log = house.log;
                }
                if(house["refugee"][refugee].v > 0 && Object.keys(house["refugee"][refugee]) > 3){
                    house["refugee"][refugee].l -= 0.1
                    house["refugee"][refugee].v -= 0.1+((house["place"]["medical"].build/100)*(1+house.medic))
                    malade += 1
                }
                //FREEZE
                house.freeze += getRandomInt(5,-5)
                if(house.freeze > 0){ house.freeze = 0}else if(house.freeze < -50){house.freeze = -50}
                
                if(house["refugee"][refugee]){
                    //accouchement
                    if(house["refugee"][refugee].s == 0 && house["refugee"][refugee].e > 0) {
                        femmeEnceinte += 1
                        house["refugee"][refugee].e -= 1
                        if(house["refugee"][refugee].e <= 0) {
                            var name = names[getRandomInt(0,names.length)].name;
                            house["log"][Object.keys(house["log"]).length] = {t:"Birth",c1:house["refugee"][refugee].n.name,c2:house["refugee"][refugee].lf,c3:name.name,d:Date.now()}
                            house["refugee"][house.birth] = {s:getRandomInt(0,2),a:1,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:name,m:house["refugee"][refugee].n,f:house["refugee"][refugee].lf,lf:"",work:"farmer",p:getRandomInt(1,41)}
                            house["refugee"][refugee].e = -1
                            house.birth+=1
                            var message = { 
                                app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                headings: {"en": 'Refuge',"fr": 'Refuge'},
                                contents: {"en": "A baby was born in your refuge.","fr": "A baby was born in your refuge."},
                                filters: [
                                    {"field": "tag", "key": "id", "relation": "=", "value":house.proprio }, 
                                    {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
                                ]
                            };
                            sendNotification(message);
                            objSendable.log = house.log;
                        }
                    }
                    //couple
                    if(house["refugee"][refugee].s == 1 && house["refugee"][refugee].a > house["law"]["ageForReproduce"]) hommes.push(house["refugee"][refugee])
                    if(house["refugee"][refugee].s == 0 && house["refugee"][refugee].a > house["law"]["ageForReproduce"] && house["refugee"][refugee].a < 50 && house["refugee"][refugee].e < 0) femmes.push(house["refugee"][refugee])
                    //age by day
                    if(house["refugee"][refugee].ap < (365*3)){
                        house["refugee"][refugee].ap += 1
                    }else{
                        house["refugee"][refugee].ap = 1;
                        house["refugee"][refugee].a += 1;
                    }
                    //utilisation de ressource et perte ou gain de vie
                    if(house["ress"]["wood"] > 0){
                        house["ress"]["wood"] -= (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["woodByDay"]);
                        house["prod"]["wood"].use += (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["woodByDay"]);
                        if(house["refugee"][refugee].l <= 100){ house["refugee"][refugee].l -= (house["refugee"][refugee].a >= house["law"]["ageForWork"] ? Math.floor((Math.abs(house.freeze)/10)-house["law"]["woodByDay"]+(1+house.medic)) : 0)}else{house["refugee"][refugee].l = 99}
                    }else{house["ress"]["wood"] = 0;if(house["refugee"][refugee].l > 0)house["refugee"][refugee].l -= getRandomInt(1,(Math.abs(house.freeze)))}

                    if(house["ress"]["food"] > 0){
                        house["ress"]["food"] -= (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["foodByDay"]);
                        house["prod"]["food"].use += (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["foodByDay"]);
                        if(house["refugee"][refugee].l <= 100){ house["refugee"][refugee].l -= (house["refugee"][refugee].a >= house["law"]["ageForWork"] ? Math.floor(2-house["law"]["foodByDay"]+(1+house.medic)) : 0)}else{house["refugee"][refugee].l = 99}
                    }else{house["ress"]["food"] = 0;if(house["refugee"][refugee].l > 0)house["refugee"][refugee].l -= getRandomInt(1,3)}
                    

                    if(house["ress"]["water"] > 0){
                        house["ress"]["water"] -= (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["waterByDay"]);
                        house["prod"]["water"].use += (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["waterByDay"]);
                        if(house["refugee"][refugee].l <= 100) {house["refugee"][refugee].l -= (house["refugee"][refugee].a >= house["law"]["ageForWork"] ? Math.floor(3-house["law"]["waterByDay"]+(1+house.medic)) : 0)}else{house["refugee"][refugee].l = 99}
                    }else{house["ress"]["water"] = 0;if(house["refugee"][refugee].l > 0) house["refugee"][refugee].l -= getRandomInt(1,3)}
                    
                    
                    //mort
                    if(house["refugee"][refugee].a > 70 || house["refugee"][refugee].l <= 1){
                        if(house["refugee"][refugee].a > 70) {
                            if(getRandomInt(0,5000) == 1) {
                                house["log"][Object.keys(house["log"]).length] = {t:"Death of old age",c1:house["refugee"][refugee].n,c2:house["refugee"][refugee].a,d:Date.now()}
                                delete house["refugee"][refugee];
                                var message = { 
                                    app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                    headings: {"en": 'Refuge',"fr": 'Refuge'},
                                    contents: {"en": "A refugee is death of old age in your refuge.","fr": "A refugee is death of old age in your refuge."},
                                    filters: [
                                        {"field": "tag", "key": "id", "relation": "=", "value":house.proprio }, 
                                        {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
                                    ]
                                };
                                sendNotification(message);
                                objSendable.log = house.log;
                            }
                        }else{
                            house["log"][Object.keys(house["log"]).length] = {t:"Death",c1:house["refugee"][refugee].n,c2:house["refugee"][refugee].a,d:Date.now()}
                            delete house["refugee"][refugee];
                            var message = { 
                                app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                headings: {"en": 'Refuge',"fr": 'Refuge'},
                                contents: {"en": "A refugee died from a lack of resources in your refuge.","fr": "A refugee died from a lack of resources in your refuge."},
                                filters: [
                                    {"field": "tag", "key": "id", "relation": "=", "value":house.proprio }, 
                                    {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
                                ]
                            };
                            sendNotification(message);
                            objSendable.log = house.log;
                        }
                    }
                }
            }
        });
        //console.log(house["refugee"])
        
        //EVENEMENT CATASTROPHE
        if(getRandomArbitrary(0,150000) < getRandomArbitrary(0,1) && Object.keys(house.refugee).length > 5){
            var enemies = {}
            var nbrEnemy = 0;
            for (let index = 0; index < Object.keys(house["refugee"]).length+getRandomInt(1,6); index++) {
                nbrEnemy++
                enemies[nbrEnemy] = {"id":nbrEnemy,"life":100,"dmg":getRandomInt(2,22),"p":getRandomInt(1,11),"s":getRandomInt(0,2),"n":names[getRandomInt(0,names.length)].name}
            }
            house.fortress = {
                "enemy":enemies,
                "allie":{}
            }
            exportMessage.newFortress = {
                f : 1,lat : house.lat,lng : house.lng,id : house.id,
            }
            Object.keys(listPlayers).forEach(player => {
                if(getDistanceFromLatLonInKm(listPlayers[player].lat,listPlayers[player].lng,house.lat,house.lng) < 100){
                    var message = { 
                        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                        headings: {"en": 'Refuge',"fr": 'Refuge'},
                        contents: {"en": "A close refuge is raided by enemies","fr": 'Refuge'},
                        filters: [
                            {"field": "tag", "key": "id", "relation": "=", "value":player }, 
                            {"operator": "AND"}, {"field": "tag", "key": "raid", "relation": "=", "value": "true"}
                        ]
                    };
                    sendNotification(message);
                }
            });
            objSendable.fortress = house.fortress;
        }
        if(getRandomArbitrary(0,5000) < getRandomArbitrary(0,1) && house.birth > 5){
            var f = 0;
            var fAdverse = getRandomArbitrary(0,(Object.keys(house["refugee"]).length)*101)
            Object.keys(house["refugee"]).forEach(refugee => {
                f += house["refugee"][refugee].job.f
            });
            if(fAdverse > f && Object.keys(house["refugee"]).length > 0){
                var refugeeChoose = randomProperty(house["refugee"])
                house["place"]["school"].progress -=  getRandomInt(5,75);
                if(house["place"]["school"].progress < 0 ) house["place"]["school"].progress = 0
                house["place"]["medical"].progress -=  getRandomInt(5,75);
                if(house["place"]["medical"].progress < 0 ) house["place"]["medical"].progress = 0
                house["place"]["church"].progress -=  getRandomInt(5,75);
                if(house["place"]["church"].progress < 0 ) house["place"]["church"].progress = 0
                house["place"]["bar"].progress -=  getRandomInt(5,75);
                if(house["place"]["bar"].progress < 0 ) house["place"]["bar"].progress = 0
                house["place"]["store"].progress -=  getRandomInt(5,75);
                if(house["place"]["store"].progress < 0 ) house["place"]["store"].progress = 0
                house["place"]["workshop"].progress -=  getRandomInt(5,75);
                if(house["place"]["workshop"].progress < 0 ) house["place"]["workshop"].progress = 0
                house["log"][Object.keys(house["log"]).length] = {t:"The refuge caught fire",c1:refugeeChoose.n,c2:refugeeChoose.a,d:Date.now()}
                delete refugeeChoose;
                var message = { 
                    app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                    headings: {"en": 'Refuge',"fr": 'Refuge'},
                    contents: {"en": "Your buildings were damaged and a refugee died in the flames.","fr": "Your buildings were damaged and a refugee died in the flames."},
                    filters: [
                        {"field": "tag", "key": "id", "relation": "=", "value":house.proprio }, 
                        {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
                    ]
                };
                sendNotification(message);
            }else if(Object.keys(house["refugee"]).length <= 0){
                var buildFall = undefined
                Object.keys(house["place"]).forEach(place => {
                    if(house["place"][place].build > 0 && !buildFall){
                        house["place"][place].build -= 1;
                        buildFall = place;
                    }
                });
                if(!buildFall){
                    destroyHouse = 1
                }
                house["log"][Object.keys(house["log"]).length] = {t:"The refuge fall in ruins",d:Date.now()}
            }else{
                house["log"][Object.keys(house["log"]).length] = {t:"The fire but it's under control",d:Date.now()}
            }
            objSendable.log = house.log;
        }else if(getRandomArbitrary(0,3000) < getRandomArbitrary(0,1) && house.birth > 5){
            var f = 0;
            var fAdverse = getRandomArbitrary(0,(Object.keys(house["refugee"]).length)*101)
            Object.keys(house["refugee"]).forEach(refugee => {
                f += house["refugee"][refugee].job.f
            });
            var ammo = getRandomInt(50,150);
            if(house.ress["ammo"] >= ammo){
                f += getRandomInt(50,150);
                house.ress["ammo"] -= ammo
            }
            if(fAdverse > f && Object.keys(house["refugee"]).length > 0){
                var refugeeChoose = randomProperty(house["refugee"])
                var wood = getRandomInt(50,150);
                var food = getRandomInt(50,150);
                var water = getRandomInt(50,150);
                house["ress"]["wood"] -= wood
                if(house["ress"]["wood"] < 0 ) house["ress"]["wood"] = 0
                house["ress"]["food"] -= food
                if(house["ress"]["food"] < 0 ) house["ress"]["food"] = 0
                house["ress"]["water"] -= water
                if(house["ress"]["water"] < 0 ) house["ress"]["water"] = 0
                house["ress"]["ammo"] -= ammo
                if(house["ress"]["ammo"] < 0 ) house["ress"]["ammo"] = 0
                house["log"][Object.keys(house["log"]).length] = {t:"The refuge was attacked by robbers",c1:refugeeChoose.n,c2:refugeeChoose.a,c3:wood,c4:food,c5:water,c6:ammo,d:Date.now()}
                delete refugeeChoose;
                var message = { 
                    app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                    headings: {"en": 'Refuge',"fr": 'Refuge'},
                    contents: {"en": "The refuge was attacked by robbers and a refugee died in the fight.","fr": "The refuge was attacked by robbers and a refugee died in the fight."},
                    filters: [
                        {"field": "tag", "key": "id", "relation": "=", "value":house.proprio }, 
                        {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
                    ]
                };
                sendNotification(message);
            }else if(Object.keys(house["refugee"]).length <= 0){
                var buildFall = undefined
                Object.keys(house["place"]).forEach(place => {
                    if(house["place"][place].build > 0 && !buildFall){
                        house["place"][place].build -= 1;
                        buildFall = place;
                    }
                });
                if(!buildFall){
                    destroyHouse = 1
                }
                house["log"][Object.keys(house["log"]).length] = {t:"The refuge fall in ruins",d:Date.now()}
            }else{
                house["log"][Object.keys(house["log"]).length] = {t:"The refuge was defended",c6:ammo,d:Date.now()}
            }
            objSendable.log = house.log;
        }

        house.teacher = teacher/10000;
        house.build = build/10000;
        house.medic = medic/10000;
        house.psycho = psycho/10000;
        house.malade = malade;
        if(hommes.length > 0 && femmes.length > 0){
            if(Object.keys(house["refugee"]).length + femmeEnceinte < ((2+house["place"].house.build)*2)){//capacité max du refuge
                var counterFemme = ((2+house["place"].house.build)*2)-(Object.keys(house["refugee"]).length + femmeEnceinte);
                femmes.forEach(femme => {
                    if(getRandomInt(0,500) == 1 && counterFemme > 0) {
                        femme.e = 270;femme.lf = hommes[getRandomInt(0,hommes.length)].n;counterFemme-- 
                    }
                });
            }
        }
        if(Object.keys(house["log"]).length > 50 ){
            delete house["log"][Object.keys(house["log"]).shift()]
        }

        if(listPlayers[house.proprio]){
            if(Date.now() > listPlayers[house.proprio].lastCo+(60000*60*24*30*1)){
                house.proprio = -1
                exportMessage.newFortress = {
                    f : 1,lat : house.lat,lng : house.lng,id : house.id,
                }
            }
        }else if(house.proprio != -1){
            house.proprio = -1
            exportMessage.newFortress = {
                f : 1,lat : house.lat,lng : house.lng,id : house.id,
            }
        }else{
            if(Date.now() > house.la+(60000*60*24*30*2))
                destroyHouse = 1
        }
        //return house;

        objSendable["queue"] = house.queue;
        objSendable["refugee"] = house.refugee;
        //objSendable["law"] = house.law;
        objSendable["ress"] = house.ress;
        objSendable["prod"] = house.prod;
        objSendable["place"] = house.place;
        objSendable["greve"] = house.greve;
        objSendable["rGreve"] = house.rGreve;
        parentPort.postMessage({ house: house ,id:house.id,exportMessage:exportMessage,listPlayers:listPlayers,objSendable:objSendable,destroyHouse:destroyHouse})
}

houses = workerData.houses;
names = workerData.names;
listPlayers = workerData.listPlayers;
farming = workerData.farming;
jobList = workerData.jobList;
houseNeed = workerData.houseNeed;
ressProd = workerData.ressProd;


var destroyHouse = 0;
var objSendable = {};

exportMessage = {
    newFortress : undefined,
    moveRefugee : undefined,
}
houseProcess(workerData.house);