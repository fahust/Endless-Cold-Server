
var WebSocketServer = require('websocket').server;
var http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
//const { start } = require('repl');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(31095, function() {
    console.log((new Date()) + ' Server is listening on port 31095');
});


var names = [];
var houses = {};
houses.nbrHouse = 0;
var stepHouse = 0;
var dateHouse = Date.now();
var listConnection = {};
var players = {};
var cargo = {};
var messages = {};
var listPlayers = {};
var listPlayersLite = {};
var friends = {};
var market = {};
var cults = {};
var errors = {};
var forums = {"general":{},"suggestions":{},"bugs":{},"guilds":{},"trade":{},"help":{},"roleplay":{}};
var forumsLite = {"general":{},"suggestions":{},"bugs":{},"guilds":{},"trade":{},"help":{},"roleplay":{}};
var heatmap = {};
var dateHeatmap = Date.now();
var towers = {};
var stations = {};

function save(){
    try {
        //let data = JSON.stringify(houses);
        fs.writeFile('saveHouses.json', JSON.stringify(houses), (err) => {
            if (err) throw err;
        });
        //let data = JSON.stringify(message);
        fs.writeFile('saveMessages.json', JSON.stringify(messages), (err) => {
            if (err) throw err;
        });
        fs.writeFile('listPlayers.json', JSON.stringify(listPlayers), (err) => {
            if (err) throw err;
        });
        fs.writeFile('listPlayersLite.json', JSON.stringify(listPlayersLite), (err) => {
            if (err) throw err;
        });
        fs.writeFile('friends.json', JSON.stringify(friends), (err) => {
            if (err) throw err;
        });
        fs.writeFile('market.json', JSON.stringify(market), (err) => {
            if (err) throw err;
        });
        fs.writeFile('cults.json', JSON.stringify(cults), (err) => {
            if (err) throw err;
        });
        fs.writeFile('errors.json', JSON.stringify(errors), (err) => {
            if (err) throw err;
        });
        fs.writeFile('forums.json', JSON.stringify(forums), (err) => {
            if (err) throw err;
        });
        fs.writeFile('forumsLite.json', JSON.stringify(forumsLite), (err) => {
            if (err) throw err;
        });
        fs.writeFile('towers.json', JSON.stringify(towers), (err) => {
            if (err) throw err;
        });
        fs.writeFile('stations.json', JSON.stringify(stations), (err) => {
            if (err) throw err;
        });
    } catch (err) {
        console.error(err);
    }
}



function load(){
    fs.readFile('saveHouses.json', (err, data) => {
        if (err) throw err;
        houses = JSON.parse(data);
        fs.readFile('saveMessages.json', (err, data) => {
            if (err) throw err;
            messages = JSON.parse(data);
            fs.readFile('listPlayers.json', (err, data) => {
                if (err) throw err;
                listPlayers = JSON.parse(data);
                fs.readFile('listPlayersLite.json', (err, data) => {
                    if (err) throw err;
                    listPlayersLite = JSON.parse(data);
                    fs.readFile('friends.json', (err, data) => {
                        if (err) throw err;
                        friends = JSON.parse(data);
                        fs.readFile('market.json', (err, data) => {
                            if (err) throw err;
                            market = JSON.parse(data);
                            fs.readFile('cults.json', (err, data) => {
                                if (err) throw err;
                                cults = JSON.parse(data);
                                fs.readFile('errors.json', (err, data) => {
                                    if (err) throw err;
                                    errors = JSON.parse(data);
                                    fs.readFile('forums.json', (err, data) => {
                                        if (err) throw err;
                                        forums = JSON.parse(data);
                                        fs.readFile('forumsLite.json', (err, data) => {
                                            if (err) throw err;
                                            forumsLite = JSON.parse(data);
                                            fs.readFile('towers.json', (err, data) => {
                                                if (err) throw err;
                                                towers = JSON.parse(data);
                                                fs.readFile('stations.json', (err, data) => {
                                                    if (err) throw err;
                                                    stations = JSON.parse(data);
                                                    fs.readFile('name.json', (err, data) => {
                                                        if (err) throw err;
                                                        names = JSON.parse(data);
                                                        start();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            
        });
    });
}


function start(){
    /*houses = {
        0:{
            lat:48.8961845,
            lng:2.8115658,
            "refugee":{
                0:{s:0,//sexe 0 = femme
                    a:1,//age
                    l:100,//life
                    e:-1,//enceinte
                    ap:1,//ageprogress
                    h:100,//hapiness
                    n:names[getRandomInt(0,names.length)].name,//name
                    m:names[getRandomInt(0,names.length)].name,//mother name
                    f:names[getRandomInt(0,names.length)].name,//father name
                    lf:"",//last fucker
                    v:0,//seekness
                    job:{
                        h:1,//harvest //ressource
                        m:1,//medic
                        t:1,//teacher
                        p:1,//psychologue
                        b:1,//builder
                    }
                },
                1:{s:1,a:1,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:""},
                2:{s:1,a:15,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:""},
                3:{s:0,a:14,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:""},
                4:{s:0,a:18,l:100,e:8,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:""},
                5:{s:1,a:19,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:""},
            },
            "ress":{"wood":365*5,"food":365*5,"water":365*5,"ammo":10},
            "place":{
                "bar":{"progress":100,"build":1},
                "school":{"progress":0,"build":1},
                "church":{"progress":30,"build":1},
                "medical":{"progress":100,"build":1},
                "restaurant":{"progress":0,"build":0},
                "weaving":{"progress":0,"build":0},
                "store":{"progress":0,"build":0},
                "workshop":{"progress":0,"build":0},
            },
            "law":{
                "workHourByDay":18,
                "ageForWork":3,
                "ageForReproduce":12,
                "foodByDay":3,
                "woodByDay":6,
                "waterByDay":4,//litre
            },
            "log":{}
            "cloth":{}
            progress:1,
            level:1,
            id:0,
            birth:6,
            teacher:0,
            build:0,
            medic:0,
            psycho:0,
            malade:0,
            proprio:-1,
            freeze:-1,
            {"fortress":{
            "enemy":{
                "1":{"id":1,"life":100,"dmg":10,"p":3,"s":0,"n":"eyump vissor"},
            },
            "allie":{
                
            }
},
        },
    }*/
    //save();
    setInterval(() => {
        const params = {
            access_key: 'aced64c9d1efb8ba1f855f001dab39f2',
            latitude: getRandomArbitrary(-80,80) ,
            longitude: getRandomArbitrary(-180,180) ,
          }
        fetch('http://api.positionstack.com/v1/reverse?access_key='+params.access_key+'&query='+params.latitude+','+params.longitude, {method: 'GET',})
        .then((response) => response.json())
        .then((responseJson) => {
        if(responseJson.data && responseJson.data[0] && responseJson.data[0].latitude && responseJson.data[0].longitude){
            if(responseJson.data[0].type != "ocean" && responseJson.data[0].type != "marinearea"){
                var date = Date.now();
                if(!cargo[date]){
                    cargo[date]={id:date,lat:responseJson.data[0].latitude,lng:responseJson.data[0].longitude}

                    Object.keys(listConnection).forEach(function(client) {//console.log(listPlayers[player].lat,listPlayers[player].lng,house.lat,house.lng)
                        if(getDistanceFromLatLonInKm(listConnection[client].lat,listConnection[client].lng,responseJson.data[0].latitude,responseJson.data[0].longitude) < 100){
                            var message = { 
                                app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                headings: {"en": 'Air-Drop',"fr": 'Air-Drop'},
                                contents: {"en": "An air drop falls close to you","fr": "An air drop falls close to you"},
                                filters: [
                                    {"field": "tag", "key": "id", "relation": "=", "value":client }, 
                                    {"operator": "AND"}, {"field": "tag", "key": "cargo", "relation": "=", "value": "true"}
                                ]
                            };
                            sendNotification(message);
                        }
                        if(listConnection[client].connected == true)
                            listConnection[client].send(JSON.stringify({"action":"newCargo",cargo:cargo[date]}));
                    });
                }
            }
        }
        }).catch((error) => {console.error(error);});
        
        save();
    }, 60000*10);
    setInterval(() => {
        if(Date.now() > dateHouse+(60000/houses.nbrHouse)){//dateHouse+(60000/houses.nbrHouse)
            houseProcess(houses[stepHouse]);
            dateHouse = Date.now()
            if(stepHouse < houses.nbrHouse){
                stepHouse++
            }else{
                stepHouse = 0
            }
        }
        if(Date.now() > dateHeatmap+(60000)){
            dateHeatmap = Date.now()
            for (let index = 0; index < 100; index++) {
                if(!heatmap[index]){
                    //heatmap = {"latitude": 48.8961845, "longitude": 2.8315658,"up":1}
                    heatmap[index]={
                        latitude: getRandomArbitrary(-80,80) ,
                        longitude: getRandomArbitrary(-140,140) ,
                        up:getRandomInt(0,2),
                    }
                }else{
                    if(heatmap[index].longitude < 180){
                        heatmap[index].longitude += getRandomArbitrary(0.01,0.02);
                    }else{
                        heatmap[index].longitude = -180
                    }
                    if(heatmap[index].up == 1){
                        if(heatmap[index].latitude > -80){
                            heatmap[index].latitude -= getRandomArbitrary(0.01,0.02)
                        }else{
                            heatmap[index].up = 0 
                        }
                    }else{
                        if(heatmap[index].latitude < 80){
                            heatmap[index].latitude += getRandomArbitrary(0.01,0.02)
                        }else{
                            heatmap[index].up = 1
                        }
                    }
                }
            }
            Object.keys(listConnection).forEach(function(client) {
                if(listConnection[client] && listConnection[client].connected == true){
                    listConnection[client].send(JSON.stringify({"action":"heatmap","heatmap":heatmap}))
                    }
            })
        }
    }, 10*1);
}


load();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function totalyDeletePlayer(player){
    if(Date.now() > listPlayers[player].lastCo+(60000*60*24*30*2)){
        delete messages[player];
        delete friends[player];
        market.forEach(item => {
            if(item.id == player)
                delete item
        });
        cults.forEach(cult => {
            if(cult.users[player])
                delete cult.users[player]
        });
        delete listPlayers[player];
        delete listPlayersLite[player];
    }
}


function houseProcess(house){
        //console.log(houses[house],Object.keys(houses[house]["refugee"]).length)
        var hommes = [];
        var femmes = [];
        var teacher = 0;
        var build = 0;
        var medic = 0;
        var psycho = 0;
        var malade = 0;
        var femmeEnceinte = 0;
        Object.keys(house["refugee"]).forEach(refugee => {
            
            //AJOUT DES RESSOURCES PAR RAPPORT A L AGE ET TEMP DE TRAVAIL 
            if(house["refugee"][refugee].a >= house["law"]["ageForWork"] && house["refugee"][refugee].a < 70){
                house["refugee"][refugee].job.h = Math.round(house["refugee"][refugee].job.h)
                house["refugee"][refugee].job.m = Math.round(house["refugee"][refugee].job.m)
                house["refugee"][refugee].job.t = Math.round(house["refugee"][refugee].job.t)
                house["refugee"][refugee].job.p = Math.round(house["refugee"][refugee].job.p)
                house["refugee"][refugee].job.b = Math.round(house["refugee"][refugee].job.b)

                if(house["ress"].wood < 5000*(1+(house["place"]["store"].progress/100))) house["ress"].wood += Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.h/1000)))
                if(house["ress"].food < 5000*(1+(house["place"]["store"].progress/100))) house["ress"].food += Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.h/1000)))
                if(house["ress"].water < 5000*(1+(house["place"]["store"].progress/100))) house["ress"].water += Math.round(house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.h/1000)))
                if(house["ress"].ammo < 300*(1+(house["place"]["store"].progress/100))) house["ress"].ammo += Math.round((house["law"]["workHourByDay"]*(1+(house["refugee"][refugee].job.h/1000)))/10)
                if(house["ress"].wood > 100){
                    if(house["place"]["school"].progress < 100 && house["place"]["school"].build == 1){
                        house["place"]["school"].progress += 0.1*(1+house.build);
                        house["place"]["school"].progress = (Math.round(house["place"]["school"].progress*1000)/1000)
                    }
                    if(house["place"]["medical"].progress < 100 && house["place"]["medical"].build == 1){
                        house["place"]["medical"].progress += 0.1*(1+house.build);
                        house["place"]["medical"].progress = (Math.round(house["place"]["medical"].progress*1000)/1000)
                    }
                    if(house["place"]["church"].progress < 100 && house["place"]["church"].build == 1){
                        house["place"]["church"].progress += 0.1*(1+house.build);
                        house["place"]["church"].progress = (Math.round(house["place"]["church"].progress*1000)/1000)
                    }
                    if(house["place"]["bar"].progress < 100 && house["place"]["bar"].build == 1){
                        house["place"]["bar"].progress += 0.1*(1+house.build);
                        house["place"]["bar"].progress = (Math.round(house["place"]["bar"].progress*1000)/1000)
                    }
                    if(house["place"]["restaurant"].progress < 100 && house["place"]["restaurant"].build == 1){
                        house["place"]["restaurant"].progress += 0.1*(1+house.build);
                        house["place"]["restaurant"].progress = (Math.round(house["place"]["restaurant"].progress*1000)/1000)
                    }
                    if(house["place"]["weaving"].progress < 100 && house["place"]["weaving"].build == 1){
                        house["place"]["weaving"].progress += 0.1*(1+house.build);
                        house["place"]["weaving"].progress = (Math.round(house["place"]["weaving"].progress*1000)/1000)
                    }
                    if(house["place"]["store"].progress < 100 && house["place"]["store"].build == 1){
                        house["place"]["store"].progress += 0.1*(1+house.build);
                        house["place"]["store"].progress = (Math.round(house["place"]["store"].progress*1000)/1000)
                    }
                    if(house["place"]["workshop"].progress < 100 && house["place"]["workshop"].build == 1){
                        house["place"]["workshop"].progress += 0.1*(1+house.build);
                        house["place"]["workshop"].progress = (Math.round(house["place"]["workshop"].progress*1000)/1000)
                    }
                    if(house["place"]["weaving"].progress >= 100){
                        if(Object.keys(house.cloth).length < house.level*2){
                            if(getRandomInt(0,1000) == 1) house.cloth[getRandomInt(0,100000)] = {"name":"Hat","type":"vêtements","value":getRandomInt(30,100),"poids":0.5,"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"hat-fedora","durability":100}
                            if(getRandomInt(0,1000) == 1) house.cloth[getRandomInt(0,100000)] = {"name":"Tshirt","type":"vêtements","value":getRandomInt(30,100),"poids":getRandomInt(1,3),"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"tshirt-v-outline","durability":100}
                            if(getRandomInt(0,1000) == 1) house.cloth[getRandomInt(0,100000)] = {"name":"Sweat","type":"vêtements","value":getRandomInt(30,100),"poids":0.5,"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"tshirt-crew","durability":100}
                            if(getRandomInt(0,1000) == 1) house.cloth[getRandomInt(0,100000)] = {"name":"Gloves","type":"vêtements","value":getRandomInt(30,100),"poids":0.5,"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"mixed-martial-arts","durability":100}
                            if(getRandomInt(0,1000) == 1) house.cloth[getRandomInt(0,100000)] = {"name":"Pants","type":"vêtements","value":getRandomInt(30,100),"poids":getRandomInt(2,3),"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"gentoo","durability":100}
                            if(getRandomInt(0,1000) == 1) house.cloth[getRandomInt(0,100000)] = {"name":"Shooes","type":"vêtements","value":getRandomInt(30,100),"poids":getRandomInt(1,3),"equiped":0,"label":"Protection","repair":["Cloth","Skin"],"icon":"shoe-formal","durability":100}
                        }
                    }
                    
                    if(house["ress"].wood > 200) house["ress"].wood -= 1*house.level;
                    house.progress += (0.1*(1+house.build))/(house.level+1)
                    house.progress = (Math.floor(house.progress*100000)/100000)
                    if(house.progress > 100){
                        house.level += 1;//bloquer côter client nombre d'enfant par rapport au level et l'afficher (4/5 place)
                        house.progress = 0;
                    }
                }      
                teacher += house["refugee"][refugee].job.t;
                build += house["refugee"][refugee].job.b;
                medic += house["refugee"][refugee].job.m;
                psycho += house["refugee"][refugee].job.p;
            }else if(house["refugee"][refugee].a < house["law"]["ageForWork"] && house["place"]["school"].progress >= 100){//SCHOOL
                if(house["refugee"][refugee].job.h < 100) house["refugee"][refugee].job.h += getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.02 : 0.04))*(1+house.teacher)
                if(house["refugee"][refugee].job.m < 100) house["refugee"][refugee].job.m += getRandomArbitrary(0,0.04)*(1+house.teacher)
                if(house["refugee"][refugee].job.t < 100) house["refugee"][refugee].job.t += getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.04 : 0.02))*(1+house.teacher)
                if(house["refugee"][refugee].job.p < 100) house["refugee"][refugee].job.p += getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.04 : 0.02))*(1+house.teacher)
                if(house["refugee"][refugee].job.b < 100) house["refugee"][refugee].job.b += getRandomArbitrary(0,(house["refugee"][refugee].s == 0 ? 0.02 : 0.04))*(1+house.teacher)
            }
            //HAPINESS (declenche fugue, déprime)
            house["refugee"][refugee].h = 0
            house["refugee"][refugee].h -= house["law"]["workHourByDay"]/(1+house.psycho)
            house["refugee"][refugee].h -= (18-house["law"]["ageForReproduce"])/(1+house.psycho)
            house["refugee"][refugee].h += house["law"]["ageForWork"]*(1+house.psycho)
            house["refugee"][refugee].h += (house["law"]["foodByDay"]*2)*(1+house.psycho)
            house["refugee"][refugee].h += (house["law"]["woodByDay"]*2)*(1+house.psycho)
            house["refugee"][refugee].h += (house["law"]["waterByDay"]*2)*(1+house.psycho)
            house["refugee"][refugee].h += (house["place"]["school"].progress/20)*(1+house.psycho)
            house["refugee"][refugee].h += (house["place"]["medical"].progress/20)*(1+house.psycho)
            house["refugee"][refugee].h += (house["place"]["church"].progress/20)*(1+house.psycho)
            house["refugee"][refugee].h += (house["place"]["bar"].progress/10)*(1+house.psycho)
            
            
            
            house["refugee"][refugee].h += ((house["refugee"][refugee].job.h/25)+(house["refugee"][refugee].job.m/25)+(house["refugee"][refugee].job.t/25)+(house["refugee"][refugee].job.p/25)+(house["refugee"][refugee].job.b/25))*(1+house.psycho)
            if(house["refugee"][refugee].h > 100) {house["refugee"][refugee].h = 100}else if(house["refugee"][refugee].h < 0){house["refugee"][refugee].h = 0}else{house["refugee"][refugee].h = Math.floor(house["refugee"][refugee].h)}
            
            /*if(house["refugee"][refugee].h < 50 && getRandomArbitrary(0,2000) < getRandomArbitrary(0,1) && Object.keys(house.refugee).length > 5 && house["refugee"][refugee].a < house["law"]["ageForWork"]){
                house[Object.keys(house["log"]).length] = {t:"Gone",c1:house["refugee"][refugee].n,d:Date.now()}
                delete house["refugee"][refugee];
                var message = { 
                    app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                    headings: {"en": 'Refuge'},
                    contents: {"en": "One of your unfortunate refugees has left your refuge."},
                    filters: [
                        {"field": "tag", "key": "id", "relation": "=", "value":house.proprio }, 
                        {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
                    ]
                };
                sendNotification(message);
            }else */if(getRandomArbitrary(0,Object.keys(houses).length) < getRandomArbitrary(0,1) && ((Object.keys(house.refugee).length > (house.level*3)-2 || house["refugee"][refugee].h < 50 || house["refugee"][refugee].l < 50 || getRandomArbitrary(0,10) > getRandomArbitrary(0,100) ) )){
                var housesNear = []
                Object.keys(houses).forEach(houseNow => {
                    if(getDistanceFromLatLonInKm(houses[houseNow].lat,houses[houseNow].lng,house.lat,house.lng) < 30 && house.id != houses[houseNow].id && Object.keys(houses[houseNow].refugee).length < (house.level*3)-2)
                        housesNear.push(houses[houseNow])
                });
                if(housesNear.length > 0){
                    houseNear = housesNear[getRandomInt(0,housesNear.length)]
                    //console.log(Object.keys(houseNear.refugee).length,Object.keys(house.refugee).length)
                    houseNear.refugee[refugee] = Object.assign({}, house["refugee"][refugee], {})
                    delete house["refugee"][refugee]
                    //console.log(Object.keys(houseNear.refugee).length,Object.keys(house.refugee).length)
                    var dist = getDistanceFromLatLonInKm(house.lat,house.lng,houseNear.lat,houseNear.lng)
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client] && listConnection[client].connected == true && listConnection[client].lat && listConnection[client].lng && getDistanceFromLatLonInKm(houseNear.lat,houseNear.lng,listConnection[client].lat,listConnection[client].lng) < 1000){
                            listConnection[client].send(JSON.stringify({"action":"moveRefugee","refugee":{
                                sLat:house.lat,slng:house.lng,eLat:houseNear.lat,eLng:houseNear.lng,dist:dist,byId:house.id,toId:houseNear.id}}))
                            }
                    })
                }
            }else{//console.log(Object.keys(house.refugee).length,(house.level*10)-2);
                //maladie par rapport au level house medic
                if(getRandomArbitrary(0,4000) < getRandomArbitrary(0,1+(house.malade*20)) && Object.keys(house["refugee"][refugee]) > 3){
                    house[Object.keys(house["log"]).length] = {t:"Disease",c1:house["refugee"][refugee].n,d:Date.now()}
                    house["refugee"][refugee].v += 1;
                }
                if(house["refugee"][refugee].v > 0 && Object.keys(house["refugee"][refugee]) > 3){
                    house["refugee"][refugee].l -= 0.1
                    house["refugee"][refugee].v -= (house["place"]["medical"].progress/1000)*(1+house.medic)
                    malade += 1
                }
                //FREEZE
                house.freeze += getRandomInt(5,-5)
                if(house.freeze > 0){ house.freeze = 0}else if(house.freeze < -50){house.freeze = -50}
                //EVENEMENT CATASTROPHE
                if(getRandomArbitrary(0,5000) < getRandomArbitrary(0,1) && Object.keys(house.refugee).length > 5){
                    var enemies = {}
                    var nbrEnemy = 0;
                    var totalEnemy = getRandomInt(10,75);
                    for (let index = 0; index < totalEnemy; index++) {
                        nbrEnemy++
                        enemies[nbrEnemy] = {"id":nbrEnemy,"life":100,"dmg":getRandomInt(2,22),"p":getRandomInt(1,11),"s":getRandomInt(0,2),"n":names[getRandomInt(0,names.length)].name}
                    }
                    house.fortress = {
                        "enemy":enemies,
                        "allie":{}
                    }
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].connected == true){
                            listConnection[client].send(JSON.stringify({"action":"newFortress","house":{
                                f : 1,
                                lat : house.lat,
                                lng : house.lng,
                                id : house.id,}}))
                            }
                    })
                    Object.keys(listPlayers).forEach(player => {//console.log(listPlayers[player].lat,listPlayers[player].lng,house.lat,house.lng)
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
                        totalyDeletePlayer(player);
                    });
                }
                if(getRandomArbitrary(0,3000) < getRandomArbitrary(0,1)){
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
                    house["log"][Object.keys(house["log"]).length] = {t:"The refuge caught fire",c1:house["refugee"][refugee].n,c2:house["refugee"][refugee].a,d:Date.now()}
                    delete house["refugee"][refugee];
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
                }else if(getRandomArbitrary(0,3000) < getRandomArbitrary(0,1)){
                    var wood = getRandomInt(50,150);
                    var food = getRandomInt(50,150);
                    var water = getRandomInt(50,150);
                    var ammo = getRandomInt(50,150);
                    house["ress"]["wood"] -= wood
                    if(house["ress"]["wood"] < 0 ) house["ress"]["wood"] = 0
                    house["ress"]["food"] -= food
                    if(house["ress"]["food"] < 0 ) house["ress"]["food"] = 0
                    house["ress"]["water"] -= water
                    if(house["ress"]["water"] < 0 ) house["ress"]["water"] = 0
                    house["ress"]["ammo"] -= ammo
                    if(house["ress"]["ammo"] < 0 ) house["ress"]["ammo"] = 0
                    house["log"][Object.keys(house["log"]).length] = {t:"The refuge was attacked by robbers",c1:house["refugee"][refugee].n,c2:house["refugee"][refugee].a,c3:wood,c4:food,c5:water,c6:ammo,d:Date.now()}
                    delete house["refugee"][refugee];
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
                }
                
                if(house["refugee"][refugee]){
                    //accouchement
                    if(house["refugee"][refugee].s == 0 && house["refugee"][refugee].e > 0) {
                        house["refugee"][refugee].e -= 1
                        if(house["refugee"][refugee].e <= 0) {
                            var name = names[getRandomInt(0,names.length)].name;
                            house["log"][Object.keys(house["log"]).length] = {t:"Birth",c1:house["refugee"][refugee].n.name,c2:house["refugee"][refugee].lf,c3:name.name,d:Date.now()}
                            house["refugee"][house.birth] = {s:getRandomInt(0,2),a:1,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:name,m:house["refugee"][refugee].n,f:house["refugee"][refugee].lf,lf:""}
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
                        }
                    }else if (house["refugee"][refugee].e > 0){
                        femmeEnceinte += 1
                    }
                    //couple
                    if(house["refugee"][refugee].s == 1 && house["refugee"][refugee].a > house["law"]["ageForReproduce"]) hommes.push(house["refugee"][refugee])
                    if(house["refugee"][refugee].s == 0 && house["refugee"][refugee].a > house["law"]["ageForReproduce"] && house["refugee"][refugee].a < 50 && house["refugee"][refugee].e < 0) femmes.push(house["refugee"][refugee])
                    //age by day
                    if(house["refugee"][refugee].ap < 365){
                        house["refugee"][refugee].ap += 1
                    }else{
                        house["refugee"][refugee].ap = 1;
                        house["refugee"][refugee].a += 1;
                    }
                    //utilisation de ressource et perte ou gain de vie
                    if(house["ress"]["wood"] > 0){house["ress"]["wood"] -= (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["woodByDay"]);if(house["refugee"][refugee].l <= 100){ house["refugee"][refugee].l -= (house["refugee"][refugee].a >= house["law"]["ageForWork"] ? Math.floor((Math.abs(house.freeze)/10)-house["law"]["woodByDay"]+(1+house.medic)) : 0)}else{house["refugee"][refugee].l = 99}
                    }else{house["ress"]["wood"] = 0;if(house["refugee"][refugee].l > 0)house["refugee"][refugee].l -= getRandomInt(1,(Math.abs(house.freeze)))}

                    if(house["ress"]["food"] > 0){house["ress"]["food"] -= (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["foodByDay"]);if(house["refugee"][refugee].l <= 100){ house["refugee"][refugee].l -= (house["refugee"][refugee].a >= house["law"]["ageForWork"] ? Math.floor(2-house["law"]["foodByDay"]+(1+house.medic)) : 0)}else{house["refugee"][refugee].l = 99}
                    }else{house["ress"]["food"] = 0;if(house["refugee"][refugee].l > 0)house["refugee"][refugee].l -= getRandomInt(1,3)}
                    

                    if(house["ress"]["water"] > 0){house["ress"]["water"] -= (house["refugee"][refugee].a < house["law"]["ageForWork"] ? 1 : house["law"]["waterByDay"]);if(house["refugee"][refugee].l <= 100) {house["refugee"][refugee].l -= (house["refugee"][refugee].a >= house["law"]["ageForWork"] ? Math.floor(3-house["law"]["waterByDay"]+(1+house.medic)) : 0)}else{house["refugee"][refugee].l = 99}
                    }else{house["ress"]["water"] = 0;if(house["refugee"][refugee].l > 0) house["refugee"][refugee].l -= getRandomInt(1,3)}
                    
                    
                    //mort
                    if(house["refugee"][refugee].a > 100 || house["refugee"][refugee].l <= 1){
                        if(house["refugee"][refugee].a > 100) {
                            if(getRandomInt(0,100) == 1) {
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
                        }
                    }
                }
            }
        });

        //Besoin de trois repas par jour, 6 kilo de bois en moyenne et 4 litre d'eau par jour pour être en bonne forme
        //7 heure de travail par jour serait un bon conpromis entre liberté et survie
        //l'école obligatoire jusqu'a 18 ans est conseillé
        //les enfants qui ne travail pas ne consome qu'une ressource par jour

        house.teacher = teacher/10000;
        house.build = build/10000;
        house.medic = medic/10000;
        house.psycho = psycho/10000;
        house.malade = malade;
        if(hommes.length > 0 && femmes.length > 0){
            if(Object.keys(house["refugee"]).length + femmeEnceinte < house.level*3){//capacité max du refuge
                femmes.forEach(femme => {
                    if(getRandomInt(0,20) == 1) {femme.e = 270;femme.lf = hommes[getRandomInt(0,hommes.length)].n }
                });
            }
        }
        if(Object.keys(house["log"]).length > 50 ){//console.log(house["log"][Object.keys(house["log"]).shift()])
            delete house["log"][Object.keys(house["log"]).shift()]
        }

        if(listPlayers[house.proprio]){
            if(Date.now() > listPlayers[house.proprio].lastCo+(60000*60*24*30*1)){
                house.proprio = -1
                Object.keys(listConnection).forEach(function(client) {
                    if(listConnection[client].connected == true){
                        listConnection[client].send(JSON.stringify({"action":"newFortress","house":{
                            f : 1,
                            lat : house.lat,
                            lng : house.lng,
                            id : house.id,}}))
                    }
                })
            }
        }else if(house.proprio != -1){
            house.proprio = -1
            Object.keys(listConnection).forEach(function(client) {
                if(listConnection[client].connected == true){
                    listConnection[client].send(JSON.stringify({"action":"newFortress","house":{
                        f : 1,
                        lat : house.lat,
                        lng : house.lng,
                        id : house.id,}}))
                }
            })
        }
}

function lawUpdate(body){
    houses[body.id]["law"][body.type] = parseInt(body.text);
    return {"action":"lawUpdate","house":houses[body.id]}
}

function usePlace(body){
    houses[body.id]["ress"][body.type] -= body.value
    return {"action":"usePlace","house":houses[body.id]}
}

function buyItem(body){
    if(houses[body.id].cloth[body.item])
        delete houses[body.id].cloth[body.item]
    return {"action":"buyItem","house":houses[body.id]}
}

function buildPlace(body){
    if(houses[body.id]["place"][body.type].build == 0){
        houses[body.id]["place"][body.type].build = 1;
    }else{
        houses[body.id]["place"][body.type].build = 0;
    }
    return {"action":"buildPlace","house":houses[body.id]}
}

function addHouse(body){
    var near = false
    Object.keys(houses).forEach(house => {
        if(getDistanceFromLatLonInKm(houses[house].lat, houses[house].lng, body.lat, body.lng) < 2){
            near = true
        }
    });
    if(near == false){
        houses.nbrHouse++
        var house={
            "refugee":{},
            "ress":{"wood":0,"food":0,"water":0,"ammo":0},
            "place":{
                "bar":{"progress":0,"build":0},
                "school":{"progress":0,"build":0},
                "church":{"progress":0,"build":0},
                "medical":{"progress":0,"build":0},
                "restaurant":{"progress":0,"build":0},
                "weaving":{"progress":0,"build":0},
                "store":{"progress":0,"build":0},
                "workshop":{"progress":0,"build":0},
            },
            "law":{
                "workHourByDay":7,
                "ageForWork":18,
                "ageForReproduce":21,
                "foodByDay":4,
                "woodByDay":8,
                "waterByDay":5,
            },
            "fortress":{
                "enemy":{},
                "allie":{},
            },
            "log":{},
            "cloth":{},
            progress:1,
            level:1,
            id:houses.nbrHouse,
            birth:6,
            teacher:0,
            build:0,
            medic:0,
            psycho:0,
            malade:0,
            proprio:body.idPlayer,
            freeze:-1,
            lat:body.lat,
            lng:body.lng,
        };
        houses[houses.nbrHouse] = house
        return {action:"addHouse",house:{lat:body.lat,lng:body.lng,id:houses.nbrHouse}};
    }else{
        
    return {action:"addHouse",impossible:true};
    }
}

function addTower(body){
    var near = false
    Object.keys(towers).forEach(tower => {
        if(getDistanceFromLatLonInKm(towers[tower].lat, towers[tower].lng, body.lat, body.lng) < 100){
            near = true
        }
    });
    if(near == false){
        towers.nbrTower++
        var tower={
            id:towers.nbrTower,
            proprio:body.idPlayer,
            lat:body.lat,
            lng:body.lng,
        };
        towers[towers.nbrTower] = tower
        return {action:"addTower",tower:{lat:body.lat,lng:body.lng,id:towers.nbrTower}};
    }else{
        
    return {action:"addTower",impossible:true};
    }
}

function addCarStation(body){
    var near = false
    Object.keys(stations).forEach(station => {
        if(getDistanceFromLatLonInKm(stations[station].lat, stations[station].lng, body.lat, body.lng) < 100){
            near = true
        }
    });
    if(near == false){
        stations.nbrStation++
        var station={
            id:stations.nbrStation,
            proprio:body.idPlayer,
            lat:body.lat,
            lng:body.lng,
        };
        stations[stations.nbrStation] = station
        return {action:"addCarStation",station:{lat:body.lat,lng:body.lng,id:stations.nbrStation}};
    }else{
        
    return {action:"addCarStation",impossible:true};
    }
}



function addRefugee(body){
    var name = names[getRandomInt(0,names.length)].name;
    houses[body.id]["log"][Object.keys(houses[body.id]["log"]).length] = {t:"Birth",c1:body.mother,c2:body.father,c3:name,d:Date.now()}
    houses[body.id]["refugee"][houses[body.id].birth] = {s:getRandomInt(0,2),a:1,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:name,m:body.mother,f:body.father,lf:""};
    houses[body.id].birth+=1
    var message = { 
        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
        headings: {"en": 'Refuge',"fr": 'Refuge'},
        contents: {"en": "A player gives birth in your refuge.","fr": "A player gives birth in your refuge."},
        filters: [
            {"field": "tag", "key": "id", "relation": "=", "value":houses[body.id].proprio }, 
            {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
        ]
    };
    sendNotification(message);
}

function addRefugeeAdulte(body){
    //houses[body.id]["log"][Object.keys(houses[body.id]["log"]).length] = {t:"Join",c1:body.mother,c2:body.father,c3:name,d:Date.now()}
    if(Object.keys(houses[body.id]["refugee"]).length < houses[body.id].level*10){
        houses[body.id]["refugee"][houses[body.id].birth] = {s:getRandomInt(0,2),a:getRandomInt(12,40),l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:""};
    }
    houses[body.id].birth+=1
    /*var message = { 
        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
        headings: {"en": 'Refuge',"fr": 'Refuge'},
        contents: {"en": "A refugee gives birth in your refuge.","fr": "A player gives birth in your refuge."},
        filters: [
            {"field": "tag", "key": "id", "relation": "=", "value":houses[body.id].proprio }, 
            {"operator": "AND"}, {"field": "tag", "key": "myRefuge", "relation": "=", "value": "true"}
        ]
    };
    sendNotification(message);*/
}

function addRessource(body){houses[body.id]["ress"][body.type == "combustible" ? "wood" : body.type == "nourriture" ? "food" : body.type == "boisson" ? "water" : "ammo"] += body.value;return {action:body.action,house:houseView(body)};}
function subRessource(body){body.type == "ammo" ? houses[body.id]["ress"][body.type] -= 1 : houses[body.id]["ress"][body.type] -= 7;return {type:body.type,action:body.action,house:houseView(body)};}//bloquer coter client si < 0

function messageList(id){
    if(!messages[id])
        messages[id] = {receive:{},sended:{}};
    return messages[id];
}

function friendsCreate(id){
    if(!friends[id])
        friends[id] = {};
    return friends[id];
}

function sendMessage(body){
    var message = { 
        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
        headings: {"en": 'Message received by '+listPlayers[body.byId].name,"fr": 'Message received by '+listPlayers[body.byId].name},
        contents: {"en": body.t2,"fr": body.t2},
        filters: [
            {"field": "tag", "key": "id", "relation": "=", "value":body.id }, 
            {"operator": "AND"}, {"field": "tag", "key": "message", "relation": "=", "value": "true"}
        ]
    };
    sendNotification(message);

    if(!messages[body.id])
        messages[body.id] = {receive:{},sended:{}};
    if(!messages[body.byId])
        messages[body.byId] = {receive:{},sended:{}};
    messages[body.byId].sended[Date.now()] = {"t1":listPlayers[body.id].name,p:body.p,"t2":body.t2,id:body.id,byId:body.byId,toP:listPlayers[body.id].portrait,toS:listPlayers[body.id].stats.sexe,toN:listPlayers[body.id].name,s:body.s,date:Date.now()}
    messages[body.id].receive[Date.now()] = {"t1":body.t1,p:body.p,"t2":body.t2,id:body.id,byId:body.byId,toP:listPlayers[body.id].portrait,toS:listPlayers[body.id].stats.sexe,toN:listPlayers[body.id].name,s:body.s,date:Date.now()}
    if(listConnection[body.byId] && listConnection[body.byId].connected == true)
        listConnection[body.byId].send(JSON.stringify({"action":"sendedMessages",message:{"t1":listPlayers[body.id].name,p:body.p,"t2":body.t2,id:body.id,byId:body.byId,toP:listPlayers[body.id].portrait,toS:listPlayers[body.id].stats.sexe,toN:listPlayers[body.id].name,s:body.s,date:Date.now()}}))
    if(listConnection[body.id] && listConnection[body.id].connected == true)
        listConnection[body.id].send(JSON.stringify({"action":"receiveMessages",message:{"t1":body.t1,p:body.p,"t2":body.t2,id:body.id,byId:body.byId,toP:listPlayers[body.id].portrait,toS:listPlayers[body.id].stats.sexe,toN:listPlayers[body.id].name,s:body.s,date:Date.now()}}))
}

function houseList(){
    var listHouse = {};
    Object.keys(houses).forEach(house => {//console.log(house)
        if(houses[house].lat){
            listHouse[house] = {};
            listHouse[house].f = Object.keys(houses[house].fortress.enemy).length > 0 || houses[house].proprio == -1 ? 1 : 0;
            listHouse[house].lat = houses[house].lat;
            listHouse[house].lng = houses[house].lng;
            listHouse[house].id = houses[house].id;
            listHouse[house].nbr = Object.keys(houses[house].refugee).length;
        }
    });//console.log(listHouse)
    return listHouse;
}

function houseView(body){
    if(houses[body.id].proprio == -1){
        houses[body.id].proprio = body.idPlayer;
        if(Object.keys(houses[body.id].fortress.enemy).length <= 0){
            Object.keys(listConnection).forEach(function(client) {
                if(listConnection[client].connected == true){
                    listConnection[client].send(JSON.stringify({"action":"newFortress","house":{
                        f : 0,
                        lat : houses[body.id].lat,
                        lng : houses[body.id].lng,
                        id : houses[body.id].id,}}))
                }
            })
        }
        listConnection[body.idPlayer].send(JSON.stringify({"action":"newProprio"}))
    }
    
    return {"action":"houseView","house":houses[body.id]}
}

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

function playerReturn(body){
    var player={};
    var playerNear={};
    player.lat=body.latitude;
    player.lng=body.longitude;
    player.id=body.idPlayer;
    player.name=body.name;
    player.sexe=body.sexe;
    player.rest=body.rest;
    player.p=body.p;
    //player.date = Date.now();
    players[body.idPlayer] = player;
    player.action = "move";
    return player;//playerNear
}

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  return true;
}
 
wsServer.on('request', function(request) {//console.log('request')
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            try {
                //console.log('Received Message: ' + message.utf8Data);
                if(JSON.parse(message.utf8Data)["action"] == "move"){
                    var data = JSON.stringify(playerReturn(JSON.parse(message.utf8Data)))
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["latitude"]
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["longitude"]
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]]){
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["latitude"]
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["longitude"]
                    }
                    
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].connected == false)
                            delete listConnection[connection.idSearch];
                        if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true && getDistanceFromLatLonInKm(JSON.parse(message.utf8Data)["latitude"],JSON.parse(message.utf8Data)["longitude"],listConnection[client].lat,listConnection[client].lng) < 1000)
                            listConnection[client].send(data);
                    });
                }else if(JSON.parse(message.utf8Data)["action"] == "fire"){
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true)
                            listConnection[client].send(message.utf8Data);
                    });
                }else if(JSON.parse(message.utf8Data)["action"] == "sendReproduce"){
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"sendReproduce","idPlayer":connection.idPlayer,sexe:JSON.parse(message.utf8Data).sexe,name:JSON.parse(message.utf8Data).name}))
                    /*Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idPlayer == JSON.parse(message.utf8Data)["idPlayer"])
                            listConnection[client].send(JSON.stringify({"action":"sendReproduce","idPlayer":connection.idPlayer,sexe:JSON.parse(message.utf8Data).sexe,name:JSON.parse(message.utf8Data).name}))
                    })*/
                }else if(JSON.parse(message.utf8Data)["action"] == "acceptReproduce"){
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send((JSON.stringify({"action":"acceptReproduce",sexe:JSON.parse(message.utf8Data).sexe,name:JSON.parse(message.utf8Data).name})))
                    /*Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idPlayer == JSON.parse(message.utf8Data)["idPlayer"])
                            listConnection[client].send(JSON.stringify({"action":"acceptReproduce",sexe:JSON.parse(message.utf8Data).sexe,name:JSON.parse(message.utf8Data).name}))
                    })*/
                }else if(JSON.parse(message.utf8Data)["action"] == "houseList"){
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]] = connection
                    connection.idSearch = JSON.parse(message.utf8Data)["idPlayer"];
                    connection.idPlayer = JSON.parse(message.utf8Data)["idPlayer"];
                    var cult = undefined;
                    var invit = {};
                    var vote = 0;
                    var kicked = undefined;
                    var moderator = undefined;
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){//on garde cult avant de remmetre profil
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult)
                            cult = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult
                    }
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit)
                            invit = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit
                    }
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k)
                            kicked = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k
                    }
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m)
                            moderator = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m
                    }
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote)
                        vote = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote
                    }
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] = JSON.parse(message.utf8Data)["profil"];
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote = vote
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult = cult
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["latitude"]
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["longitude"]
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k = kicked
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m = moderator
                    if(cult){
                        cult.r = 0
                        Object.keys(cult.users).forEach(userCult => {
                            if(listPlayers[cult.users[userCult].id])
                            cult.r += listPlayers[cult.users[userCult].id].reput
                        });
                        if(cults[cult.id]){
                            cults[cult.id].r = cult.r
                            cult = cults[cult.id]
                        }
                    }
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit = invit
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lastCo = Date.now()
                    listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]] = {cl:JSON.parse(message.utf8Data)["profil"]["class"],n:JSON.parse(message.utf8Data)["profil"]["name"],r:JSON.parse(message.utf8Data)["profil"]["reput"]+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,p:JSON.parse(message.utf8Data)["profil"]["portrait"],id:JSON.parse(message.utf8Data)["idPlayer"],s:JSON.parse(message.utf8Data)["profil"]["stats"]["sexe"],/*v:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,*/c:1,lastCo:Date.now(),k:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k,m:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m};
                    
                    connection.send(JSON.stringify({"action":"houseList",list:houseList(),towers:towers,stations:stations,messages:messageList(JSON.parse(message.utf8Data)["idPlayer"]),listPlayersLite:listPlayersLite,cult:cult,friends:friendsCreate(JSON.parse(message.utf8Data)["idPlayer"]),kicked:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k}))
                }else if(JSON.parse(message.utf8Data)["action"] == "houseView"){
                    connection.send(JSON.stringify(houseView(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "addHouse"){
                    var house = addHouse(JSON.parse(message.utf8Data));
                    if(house.impossible){
                        connection.send(JSON.stringify(house));
                    }else{
                        Object.keys(listConnection).forEach(function(client) {
                            listConnection[client].send(JSON.stringify(house))
                        })
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "addTower"){
                    var tower = addTower(JSON.parse(message.utf8Data));
                    if(tower.impossible){
                        connection.send(JSON.stringify(tower));
                    }else{
                        Object.keys(listConnection).forEach(function(client) {
                            listConnection[client].send(JSON.stringify(tower))
                        })
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "addCarStation"){
                    var station = addCarStation(JSON.parse(message.utf8Data));
                    if(station.impossible){
                        connection.send(JSON.stringify(station));
                    }else{
                        Object.keys(listConnection).forEach(function(client) {
                            listConnection[client].send(JSON.stringify(station))
                        })
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "addRefugee"){
                    connection.send(JSON.stringify(addRefugee(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "addRessource"){
                    connection.send(JSON.stringify(addRessource(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "subRessource"){
                    connection.send(JSON.stringify(subRessource(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "giveitem"){
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send((message.utf8Data))
                    /*Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idPlayer == JSON.parse(message.utf8Data)["idPlayer"])
                            listConnection[client].send((message.utf8Data))
                    })*/
                }else if(JSON.parse(message.utf8Data)["action"] == "lawUpdate"){
                    connection.send(JSON.stringify(lawUpdate(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "buildPlace"){
                    connection.send(JSON.stringify(buildPlace(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "usePlace"){
                    connection.send(JSON.stringify(usePlace(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "buyItem"){
                    connection.send(JSON.stringify(buyItem(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "sendChatMessage"){
                    Object.keys(listConnection).forEach(function(client) {
                        listConnection[client].send(message.utf8Data)
                    })
                }else if(JSON.parse(message.utf8Data)["action"] == "demandeProfil"){
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({action:"demandeProfil",id:JSON.parse(message.utf8Data)["idPlayer"],n:listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]].n,r:listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]].r,r:listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]].r}))
                    /*Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idPlayer == JSON.parse(message.utf8Data)["idPlayer"])
                            listConnection[client].send((message.utf8Data))
                    })*/
                }else if(JSON.parse(message.utf8Data)["action"] == "demandeProfilOffline"){
                    connection.send(JSON.stringify({action:"demandeProfilOffline",profil:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]}))
                    /*Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idPlayer == JSON.parse(message.utf8Data)["idPlayer"])
                            listConnection[client].send((message.utf8Data))
                    })*/
                }else if(JSON.parse(message.utf8Data)["action"] == "sendProfil"){
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send((message.utf8Data))
                    /*Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idPlayer == JSON.parse(message.utf8Data)["idPlayer"])
                            listConnection[client].send((message.utf8Data))
                    })*/
                }else if(JSON.parse(message.utf8Data)["action"] == "lootCargo"){
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].connected == true)
                            listConnection[client].send((message.utf8Data))
                    })
                }else if(JSON.parse(message.utf8Data)["action"] == "sendMessage"){
                    sendMessage(JSON.parse(message.utf8Data));
                }else if(JSON.parse(message.utf8Data)["action"] == "deleteMessage"){
                    if(messages[JSON.parse(message.utf8Data)["idPlayer"]].sended[JSON.parse(message.utf8Data)["id"]])
                        delete messages[JSON.parse(message.utf8Data)["idPlayer"]].sended[JSON.parse(message.utf8Data)["id"]]
                    if(messages[JSON.parse(message.utf8Data)["idPlayer"]].receive[JSON.parse(message.utf8Data)["id"]])
                        delete messages[JSON.parse(message.utf8Data)["idPlayer"]].receive[JSON.parse(message.utf8Data)["id"]]
                    connection.send(JSON.stringify({action:"listMessages",messages:messageList(JSON.parse(message.utf8Data)["idPlayer"])}))
                }else if(JSON.parse(message.utf8Data)["action"] == "addFriend"){
                    var date = Date.now();
                    friends[JSON.parse(message.utf8Data)["idPlayer"]][JSON.parse(message.utf8Data)["idOrigin"]] = {profil:listPlayersLite[JSON.parse(message.utf8Data)["idOrigin"]],active:0,request:JSON.parse(message.utf8Data)["idOrigin"]}
                    friends[JSON.parse(message.utf8Data)["idOrigin"]][JSON.parse(message.utf8Data)["idPlayer"]] = {profil:listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]],active:0,request:JSON.parse(message.utf8Data)["idOrigin"]}
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"addFriend",friends:friendsCreate(JSON.parse(message.utf8Data)["idPlayer"])}))
                    if(listConnection[JSON.parse(message.utf8Data)["idOrigin"]] && listConnection[JSON.parse(message.utf8Data)["idOrigin"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idOrigin"]].send(JSON.stringify({"action":"addFriend",friends:friendsCreate(JSON.parse(message.utf8Data)["idOrigin"])}))
                }else if(JSON.parse(message.utf8Data)["action"] == "acceptFriend"){
                    var date = Date.now();
                    friends[JSON.parse(message.utf8Data)["idPlayer"]][JSON.parse(message.utf8Data)["idOrigin"]] = {profil:listPlayersLite[JSON.parse(message.utf8Data)["idOrigin"]],active:1}
                    friends[JSON.parse(message.utf8Data)["idOrigin"]][JSON.parse(message.utf8Data)["idPlayer"]] = {profil:listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]],active:1}
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"addFriend",friends:friendsCreate(JSON.parse(message.utf8Data)["idPlayer"])}))
                    if(listConnection[JSON.parse(message.utf8Data)["idOrigin"]] && listConnection[JSON.parse(message.utf8Data)["idOrigin"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idOrigin"]].send(JSON.stringify({"action":"addFriend",friends:friendsCreate(JSON.parse(message.utf8Data)["idOrigin"])}))
                    var message = { 
                        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                        headings: {"en": 'Friends',"fr": 'Friends'},
                        contents: {"en": listPlayersLite[JSON.parse(message.utf8Data)["idOrigin"]].n+" sent to you a friend invitation","fr": listPlayersLite[JSON.parse(message.utf8Data)["idOrigin"]].n+" sent to you a friend invitation"},
                        filters: [
                            {"field": "tag", "key": "id", "relation": "=", "value":JSON.parse(message.utf8Data)["idPlayer"] }, 
                            {"operator": "AND"}, {"field": "tag", "key": "friends", "relation": "=", "value": "true"}
                        ]
                    };
                    sendNotification(message);
                }else if(JSON.parse(message.utf8Data)["action"] == "declineFriend"){
                    if(friends[JSON.parse(message.utf8Data)["idPlayer"]][JSON.parse(message.utf8Data)["idOrigin"]])
                        delete friends[JSON.parse(message.utf8Data)["idPlayer"]][JSON.parse(message.utf8Data)["idOrigin"]];
                    if(friends[JSON.parse(message.utf8Data)["idOrigin"]][JSON.parse(message.utf8Data)["idPlayer"]])
                        delete friends[JSON.parse(message.utf8Data)["idOrigin"]][JSON.parse(message.utf8Data)["idPlayer"]]
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"addFriend",friends:friendsCreate(JSON.parse(message.utf8Data)["idPlayer"])}))
                    if(listConnection[JSON.parse(message.utf8Data)["idOrigin"]] && listConnection[JSON.parse(message.utf8Data)["idOrigin"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idOrigin"]].send(JSON.stringify({"action":"addFriend",friends:friendsCreate(JSON.parse(message.utf8Data)["idOrigin"])}))
                }else if(JSON.parse(message.utf8Data)["action"] == "sendMarket"){
                    var date = Date.now();
                    market[date] = {id:JSON.parse(message.utf8Data)["id"],item:JSON.parse(message.utf8Data)["item"],nbr:JSON.parse(message.utf8Data)["nbr"],price:JSON.parse(message.utf8Data)["price"]}
                    connection.send(JSON.stringify({"action":"sendMarket","market":market}))
                    
                    if(JSON.parse(message.utf8Data)["item"].value > 80){
                        var message = { 
                            app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                            headings: {"en": 'Market',"fr": 'Market'},
                            contents: {"en": "A legendary "+JSON.parse(message.utf8Data)["item"].name+" has just been deposited at the market for "+JSON.parse(message.utf8Data)["price"]+" $.","fr": "A legendary "+JSON.parse(message.utf8Data)["item"].name+" has just been deposited at the market for "+JSON.parse(message.utf8Data)["price"]+" $."},
                            filters: [
                                {"field": "tag", "key": "market", "relation": "=", "value":true }, 
                            ]
                        };
                        sendNotification(message);
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "listMarket"){
                    connection.send(JSON.stringify({"action":"listMarket","market":market}))
                }else if(JSON.parse(message.utf8Data)["action"] == "buyMarket"){
                    if(market[JSON.parse(message.utf8Data)["key"]])
                        market[JSON.parse(message.utf8Data)["key"]].buy = 1
                    connection.send(JSON.stringify({"action":"listMarket","market":market}))
                    var message = { 
                        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                        headings: {"en": 'Market',"fr": 'Market'},
                        contents: {"en": "You sell an item "+market[JSON.parse(message.utf8Data)["key"]].name,"fr": "You sell an item "+market[JSON.parse(message.utf8Data)["key"]].name},
                        filters: [
                            {"field": "tag", "key": "id", "relation": "=", "value":market[JSON.parse(message.utf8Data)["key"]].id }, 
                            {"operator": "AND"}, {"field": "tag", "key": "market", "relation": "=", "value": "true"}
                        ]
                    };
                    sendNotification(message);
                }else if(JSON.parse(message.utf8Data)["action"] == "deleteMarket"){
                    delete market[JSON.parse(message.utf8Data)["key"]]
                    connection.send(JSON.stringify({"action":"listMarket","market":market}))
                }else if(JSON.parse(message.utf8Data)["action"] == "enterRaid"){
                    houses[JSON.parse(message.utf8Data)["idRaid"]].fortress.allie[JSON.parse(message.utf8Data)["player"].id] = JSON.parse(message.utf8Data)["player"]
                }else if(JSON.parse(message.utf8Data)["action"] == "quitRaid"){
                    if(houses[JSON.parse(message.utf8Data)["idRaid"]].fortress.allie[JSON.parse(message.utf8Data)["idPlayer"]])
                        delete houses[JSON.parse(message.utf8Data)["idRaid"]].fortress.allie[JSON.parse(message.utf8Data)["idPlayer"]]
                    //connection.send(JSON.stringify({"action":"listMarket","market":market}))
                }else if(JSON.parse(message.utf8Data)["action"] == "actionRaid"){
                    houses[JSON.parse(message.utf8Data)["house"].id] = JSON.parse(message.utf8Data)["house"]
                    if(Object.keys(houses[JSON.parse(message.utf8Data)["house"].id].fortress.enemy).length <= 0){
                        Object.keys(houses[JSON.parse(message.utf8Data)["house"].id].fortress.allie).forEach(allie => {
                            if(listConnection[allie] && listConnection[allie].connected == true){
                                listConnection[allie].send(JSON.stringify({"action":"endRaid"}))
                            }
                        });
                        houses[JSON.parse(message.utf8Data)["house"].id].fortress.allie = {}
                    }
                    Object.keys(houses[JSON.parse(message.utf8Data)["house"].id].fortress.allie).forEach(allie => {
                        if(listConnection[allie] && listConnection[allie].connected == true){
                            listConnection[allie].send(message.utf8Data)
                        }
                    });
                }else if(JSON.parse(message.utf8Data)["action"] == "healPlayer"){
                    houses[JSON.parse(message.utf8Data)["houseId"]].fortress.allie[JSON.parse(message.utf8Data)["id"]].v += JSON.parse(message.utf8Data)["value"]
                    if(houses[JSON.parse(message.utf8Data)["houseId"]].fortress.allie[JSON.parse(message.utf8Data)["id"]].v > 100) houses[JSON.parse(message.utf8Data)["houseId"]].fortress.allie[JSON.parse(message.utf8Data)["id"]].v = 100
                    if(listConnection[JSON.parse(message.utf8Data)["id"]] && listConnection[JSON.parse(message.utf8Data)["id"]].connected == true){
                        listConnection[JSON.parse(message.utf8Data)["id"]].send(message.utf8Data)
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "createCult"){
                    var now = Date.now();
                    cults[now] = {
                        id:now,
                        master:JSON.parse(message.utf8Data)["idPlayer"],
                        name:JSON.parse(message.utf8Data).name,
                        uri:'',
                        users:{
                            [JSON.parse(message.utf8Data)["idPlayer"]]:{
                                role:5,
                                name:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name,
                                s:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].stats.sexe,
                                portrait:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].portrait,
                                id:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].id,
                                reput:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].reput,
                            }
                        },
                        messages:{},
                        items:{},
                        r:0,
                    }
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult  = cults[now]
                    connection.send(JSON.stringify({"action":"createCult",cult:cults[now]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "viewCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        if(cult.users[JSON.parse(message.utf8Data)["idPlayer"]])
                            cult.users[JSON.parse(message.utf8Data)["idPlayer"]].rep = JSON.parse(message.utf8Data)["rep"]
                        connection.send(JSON.stringify({"action":"viewCult","cult":{id:cult.id,name:cult.name,users:cult.users,uri:cult.uri}}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "deleteCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        Object.keys(cult.users).forEach(user => {
                            listConnection[user].send(JSON.stringify({"action":"deleteCult"}))
                        });
                        delete cult;
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "invitCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    var message = { 
                        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                        headings: {"en": 'Cult',"fr": 'Cult'},
                        contents: {"en": "You were invited in cult : "+cult.name,"fr": "You were invited in cult : "+cult.name},
                        filters: [
                            {"field": "tag", "key": "id", "relation": "=", "value":JSON.parse(message.utf8Data)["idPlayer"] }, 
                            {"operator": "AND"}, {"field": "tag", "key": "cult", "relation": "=", "value": "true"}
                        ]
                    };
                    sendNotification(message);
                    if(cult){
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]])
                            listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit[JSON.parse(message.utf8Data)["id"]]  = cult
                        //cult.users[JSON.parse(message.utf8Data)["idPlayer"]] = {role:"invited"}
                        connection.send(JSON.stringify({"action":"viewCult","cult":{id:cult.id,name:cult.name,users:cult.users,uri:cult.uri}}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "joinCult"){//console.log(JSON.parse(message.utf8Data)["id"])
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult  = cult
                        //if(cult.users[JSON.parse(message.utf8Data)["idPlayer"]]/* && cult.users[JSON.parse(message.utf8Data)["idPlayer"]].role == "invited"*/)
                            cult.users[JSON.parse(message.utf8Data)["idPlayer"]] = {
                                role:1,
                                name:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name,
                                s:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].stats.sexe,
                                portrait:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].portrait,
                                id:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].id,
                                reput:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].reput,
                            }
                        connection.send(JSON.stringify({"action":"joinCult","cult":cult}))
                        Object.keys(cult.users).forEach(user => {
                            var message = { 
                                app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                headings: {"en": 'Cult',"fr": 'Cult'},
                                contents: {"en": "A new member joins the cult. Say welcome to "+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name,"fr": "A new member joins the cult. Say welcome to "+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name},
                                filters: [
                                    {"field": "tag", "key": "id", "relation": "=", "value":cult.users[user].id}, 
                                    {"operator": "AND"}, {"field": "tag", "key": "cult", "relation": "=", "value": "true"}
                                ]
                            };
                            sendNotification(message);
                        });
                    }else{
                        delete listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit[JSON.parse(message.utf8Data)["id"]]
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "listCult"){
                    var listCult = {};
                    Object.keys(cults).forEach(cult => {
                        listCult[cult] = {n:cults[cult].name,uri:cults[cult].uri,r:cults[cult].r,id:cults[cult].id,u:Object.keys(cults[cult].users).length,m:cults[cult].master}
                    })
                    connection.send(JSON.stringify({"action":"listCult","cult":listCult}))
                }else if(JSON.parse(message.utf8Data)["action"] == "sendMessageCult"){
                    var body = JSON.parse(message.utf8Data);
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        cult.messages[Date.now()] = {"t1":body.t1,p:body.p,"t2":body.t2,id:body.id,byId:body.byId,toP:listPlayers[body.byId].portrait,toS:listPlayers[body.byId].stats.sexe,toN:listPlayers[body.byId].name,s:body.s,date:Date.now()}
                        Object.keys(cult.users).forEach(user => {
                            var message = { 
                                app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                headings: {"en": 'Cult Message received by '+body.t1,"fr": 'Cult Message received by '+body.t1},
                                contents: {"en": body.t2,"fr": body.t2},
                                filters: [
                                    {"field": "tag", "key": "id", "relation": "=", "value":cult.users[user].id}, 
                                    {"operator": "AND"}, {"field": "tag", "key": "cultMessage", "relation": "=", "value": "true"}
                                ]
                            };
                            sendNotification(message);
                        });
                        //connection.send(JSON.stringify({"action":"listMessagesCult","messages":cult.messages}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "listMessagesCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        connection.send(JSON.stringify({"action":"listMessagesCult","messages":cult.messages}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "searchInvitCult"){
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]])
                    connection.send(JSON.stringify({"action":"searchInvitCult","invit":listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit}))
                }else if(JSON.parse(message.utf8Data)["action"] == "addItemCult"){
                    //state.ws.send(JSON.stringify({"action":"addItemCult",id:state.id,idGuild:state.cult.id,item:state.items[action.payload.item],nbr:action.payload.nbr,price:action.payload.price}));
                    var cult = cults[JSON.parse(message.utf8Data)["idGuild"]];
                    if(cult){
                        cult.items[Date.now()] = {id:JSON.parse(message.utf8Data)["id"],item:JSON.parse(message.utf8Data)["item"],nbr:JSON.parse(message.utf8Data)["nbr"],price:JSON.parse(message.utf8Data)["price"]}
                        connection.send(JSON.stringify({"action":"listItemCult","items":cult.items}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "takeItemCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["idGuild"]];
                    if(cult){
                        delete cult.items[JSON.parse(message.utf8Data)["key"]];
                        Object.keys(cult.users).forEach(user => {
                            if(listConnection[cult.users[user].id] && listConnection[cult.users[user].id].connected == true)
                                listConnection[cult.users[user].id].send(JSON.stringify({"action":"listItemCult","items":cult.items}))
                        });
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "listItemCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        connection.send(JSON.stringify({"action":"listItemCult","items":cult.items}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "upgradeRank"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult.users[JSON.parse(message.utf8Data)["idPlayer"]])
                        cult.users[JSON.parse(message.utf8Data)["idPlayer"]].role += 1
                    if(cult){
                        connection.send(JSON.stringify({"action":"upgradeRank","cult":cult}))
                        var message = { 
                            app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                            headings: {"en": 'Cult',"fr": 'Cult'},
                            contents: {"en": "You have been promoted to the rank of your cult","fr": "You have been promoted to the rank of your cult"},
                            filters: [
                                {"field": "tag", "key": "id", "relation": "=", "value":JSON.parse(message.utf8Data)["idPlayer"] }, 
                                {"operator": "AND"}, {"field": "tag", "key": "cult", "relation": "=", "value": "true"}
                            ]
                        };
                        sendNotification(message);
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "kickCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        var cult = cults[JSON.parse(message.utf8Data)["id"]];
                        delete cult.users[JSON.parse(message.utf8Data)["idPlayer"]]
                        listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult = undefined
                        if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                            listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"kickCult","cult":undefined}))
                        var message = { 
                            app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                            headings: {"en": 'Cult',"fr": 'Cult'},
                            contents: {"en": "You've been ejected from your cult","fr": "You've been ejected from your cult"},
                            filters: [
                                {"field": "tag", "key": "id", "relation": "=", "value":JSON.parse(message.utf8Data)["idPlayer"] }, 
                                {"operator": "AND"}, {"field": "tag", "key": "cult", "relation": "=", "value": "true"}
                            ]
                        };
                        sendNotification(message);
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "quitCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        if(cult.master == JSON.parse(message.utf8Data)["idPlayer"]){
                            delete cults[JSON.parse(message.utf8Data)["id"]];
                        }else{
                            delete cult.users[JSON.parse(message.utf8Data)["idPlayer"]];
                        }
                        listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult = undefined;
                    }
                    connection.send(JSON.stringify({"action":"quitCult"}))
                    Object.keys(cult.users).forEach(user => {
                        var message = { 
                            app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                            headings: {"en": 'Cult',"fr": 'Cult'},
                            contents: {"en": listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name+" leaves the cult.","fr": listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name+" leaves the cult."},
                            filters: [
                                {"field": "tag", "key": "id", "relation": "=", "value":cult.users[user].id }, 
                                {"operator": "AND"}, {"field": "tag", "key": "cult", "relation": "=", "value": "true"}
                            ]
                        };
                        sendNotification(message);
                    })
                }else if(JSON.parse(message.utf8Data)["action"] == "changeName"){
                    var name = JSON.parse(message.utf8Data)["name"];
                    var idPlayer = JSON.parse(message.utf8Data)["idPlayer"];
                    listPlayers[idPlayer].name = name
                    listPlayersLite[idPlayer].n = name
                    Object.keys(friends).forEach(friend => {
                        if(friend[idPlayer])
                            friend[idPlayer].profil.n = name
                    });
                    if(listPlayers[idPlayer].cult && cults[listPlayers[idPlayer].cult.id].users[idPlayer])
                        cults[listPlayers[idPlayer].cult.id].users[idPlayer].name = name
                }else if(JSON.parse(message.utf8Data)["action"] == "changePortrait"){
                    var p = JSON.parse(message.utf8Data)["p"];
                    var idPlayer = JSON.parse(message.utf8Data)["idPlayer"];
                    listPlayers[idPlayer].p = p
                    listPlayersLite[idPlayer].p = p
                    Object.keys(friends).forEach(friend => {
                        if(friend[idPlayer])
                            friend[idPlayer].profil.p = p
                    });
                    if(listPlayers[idPlayer].cult && cults[listPlayers[idPlayer].cult.id].users[idPlayer])
                        cults[listPlayers[idPlayer].cult.id].users[idPlayer].p = p
                }else if(JSON.parse(message.utf8Data)["action"] == "changeIconHttp"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        cult.uri = JSON.parse(message.utf8Data).uri
                        connection.send(JSON.stringify({"action":"cultRefresh","cult":cults[JSON.parse(message.utf8Data)["id"]]}))
                        //connection.send(JSON.stringify({"action":"viewCult","cult":{id:cult.id,name:cult.name,users:cult.users,uri:cult.uri}}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "changeDescCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        cult.description = JSON.parse(message.utf8Data).text
                        connection.send(JSON.stringify({"action":"cultRefresh","cult":cults[JSON.parse(message.utf8Data)["id"]]}))
                    }
                }else if(JSON.parse(message.utf8Data)["action"] == "changeNameCult"){
                    var cult = cults[JSON.parse(message.utf8Data)["id"]];
                    if(cult){
                        cult.name = JSON.parse(message.utf8Data).text
                        connection.send(JSON.stringify({"action":"cultRefresh","cult":cults[JSON.parse(message.utf8Data)["id"]]}))
                        Object.keys(cult.users).forEach(user => {
                            var message = { 
                                app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                                headings: {"en": 'Cult',"fr": 'Cult'},
                                contents: {"en": "The name of your cult changes to "+JSON.parse(message.utf8Data).text,"fr": "The name of your cult changes to "+JSON.parse(message.utf8Data).text},
                                filters: [
                                    {"field": "tag", "key": "id", "relation": "=", "value":cult.users[user].id }, 
                                    {"operator": "AND"}, {"field": "tag", "key": "tag", "key": "cult", "relation": "=", "value": "true"}
                                ]
                            };
                            sendNotification(message);
                        })
                    }
                    //
                }else if(JSON.parse(message.utf8Data)["action"] == "giveModeration"){//Donne pouvoir mod, need player co
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m = true
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult && cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]])
                        cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]].m = true
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"giveModeration"}))
                }else if(JSON.parse(message.utf8Data)["action"] == "ungiveModeration"){//Donne pouvoir mod, need player co
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m = false
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult && cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]])
                        cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]].m = false
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"ungiveModeration"}))
                }else if(JSON.parse(message.utf8Data)["action"] == "kickModeration"){//A FAIRE UNE MODERATION KICK BAN
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k = true
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult && cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]])
                        cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]].k = true
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"kickModeration"}))
                }else if(JSON.parse(message.utf8Data)["action"] == "unkickModeration"){//A FAIRE UNE MODERATION UNKICK BAN
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k = undefined
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult && cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]])
                        cults[listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult.id].users[JSON.parse(message.utf8Data)["idPlayer"]].k = undefined
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]] && listConnection[JSON.parse(message.utf8Data)["idPlayer"]].connected == true)
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].send(JSON.stringify({"action":"unkickModeration"}))
                }else if(JSON.parse(message.utf8Data)["action"] == "forumsList"){
                    connection.send(JSON.stringify({"action":"forumsList","forums":forumsLite[JSON.parse(message.utf8Data)["type"]],type:JSON.parse(message.utf8Data)["type"]}))   
                }else if(JSON.parse(message.utf8Data)["action"] == "getTopic"){
                    connection.send(JSON.stringify({"action":"getTopic","topic":forums[JSON.parse(message.utf8Data)["type"]][JSON.parse(message.utf8Data)["id"]]}))   
                }else if(JSON.parse(message.utf8Data)["action"] == "addForums"){
                    var date = Date.now();
                    var body = JSON.parse(message.utf8Data);
                    forumsLite[body.type][date] = {idP:body.idP,t:body.t,c:body.c.substring(0,20)+'...',p:body.p,s:body.s,n:1,name:body.name}
                    forums[body.type][date] = {idP:body.idP,t:body.t,c:body.c,p:body.p,s:body.s,answer:{},name:body.name}
                    connection.send(JSON.stringify({"action":"forumsList","forums":forumsLite[JSON.parse(message.utf8Data)["type"]],type:JSON.parse(message.utf8Data)["type"]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "answerForums"){
                    var date = Date.now();
                    var body = JSON.parse(message.utf8Data);
                    forumsLite[body.type][body.id].n++;
                    forums[body.type][body.id].answer[date] = {idP:body.idP,t:body.t,c:body.c,p:body.p,s:body.s,name:body.name}
                    connection.send(JSON.stringify({"action":"getTopic","topic":forums[JSON.parse(message.utf8Data)["type"]][JSON.parse(message.utf8Data)["id"]]}))   
                }else if(JSON.parse(message.utf8Data)["action"] == "deleteForums"){
                    var date = Date.now();
                    var body = JSON.parse(message.utf8Data);
                    delete forumsLite[body.type][body.id];
                    delete forums[body.type][body.id];
                    connection.send(JSON.stringify({"action":"forumsList","forums":forumsLite[JSON.parse(message.utf8Data)["type"]],type:JSON.parse(message.utf8Data)["type"]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "deleteAnswerForums"){
                    var body = JSON.parse(message.utf8Data);
                    forumsLite[body.type][body.id].n--;
                    delete forums[body.type][body.id].answer[body.date];
                    connection.send(JSON.stringify({"action":"forumsList","forums":forumsLite[JSON.parse(message.utf8Data)["type"]],type:JSON.parse(message.utf8Data)["type"]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "vote"){
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){
                        listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote += JSON.parse(message.utf8Data)["vote"]
                        listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]].r += JSON.parse(message.utf8Data)["vote"];
                    }
                    connection.send(JSON.stringify({"action":"listPlayersRefresh","listPlayersLite":listPlayersLite}))
                    /*var message = { 
                        app_id: "5dc2b6c6-0a28-483b-b7a4-10cdeb9b2489",
                        headings: {"en": 'Cult'},
                        contents: {"en": "The name of your cult changes to "+JSON.parse(message.utf8Data).text},
                        filters: [
                            {"field": "tag", "key": "id", "relation": "=", "value":cult.users[user].id }, 
                            {"operator": "AND"}, {"field": "tag", "key": "tag", "key": "cult", "relation": "=", "value": "true"}
                        ]
                    };
                    sendNotification(message);*/
                }else if(JSON.parse(message.utf8Data)["action"] == "addRefugeeAdulte"){
                    addRefugeeAdulte(JSON.parse(message.utf8Data));
                }else if(JSON.parse(message.utf8Data)["action"] == "addCorpse"){
                    //corpses[JSON.parse(message.utf8Data)["idPlayer"]] = JSON.parse(message.utf8Data)["corpse"]
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].connected == true)
                            listConnection[client].send(JSON.stringify({"action":"addCorpse","id":JSON.parse(message.utf8Data)["idPlayer"],"corpse":JSON.parse(message.utf8Data)["corpse"]}))
                    })
                }else if(JSON.parse(message.utf8Data)["action"] == "takeCorpse"){
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].connected == true)
                            listConnection[client].send(JSON.stringify({"action":"takeCorpse","id":JSON.parse(message.utf8Data)["id"]}))
                    })
                }else if(JSON.parse(message.utf8Data)["action"] == "listPlayersRefresh"){
                    var cult;
                    var invit;
                    var latitude;
                    var longitude;
                    var vote = 0;
                    var kicked = undefined;
                    var moderator = undefined;
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult)//on garde cult avant de remmetre profil
                        cult = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit)
                        invit = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]]){
                        if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote)
                            vote = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote
                    }
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].latitude)
                        latitude = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].longitude)
                        longitude = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k)
                        kicked = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m)
                        moderator = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] = JSON.parse(message.utf8Data)["profil"];
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult = cult
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote = vote
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat = latitude
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng = longitude
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k = kicked
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m = moderator
                    //listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] = JSON.parse(message.utf8Data)["profil"]
                    listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]] = {cl:JSON.parse(message.utf8Data)["profil"]["class"],n:JSON.parse(message.utf8Data)["profil"]["name"],r:JSON.parse(message.utf8Data)["profil"]["reput"]+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,p:JSON.parse(message.utf8Data)["profil"]["portrait"],id:JSON.parse(message.utf8Data)["idPlayer"],s:JSON.parse(message.utf8Data)["profil"]["stats"]["sexe"],/*v:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,*/c:1,lastCo:Date.now(),k:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k,m:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m};
                    connection.send(JSON.stringify({"action":"listPlayersRefresh","listPlayersLite":listPlayersLite}))
                }else if(JSON.parse(message.utf8Data)["action"] == "friendsRefresh"){
                    connection.send(JSON.stringify({"action":"friendsRefresh","friends":friends[JSON.parse(message.utf8Data)["idPlayer"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "messagesRefresh"){
                    connection.send(JSON.stringify({"action":"messagesRefresh","messages":messages[JSON.parse(message.utf8Data)["idPlayer"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "houseRefresh"){
                    connection.send(JSON.stringify({"action":"houseRefresh","house":houses[JSON.parse(message.utf8Data)["id"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "marketRefresh"){
                    connection.send(JSON.stringify({"action":"marketRefresh","market":market}))
                }else if(JSON.parse(message.utf8Data)["action"] == "cultRefresh"){
                    connection.send(JSON.stringify({"action":"cultRefresh","cult":cults[JSON.parse(message.utf8Data)["id"]]}))
                }
                
                
            } catch (error) {
                errors[Date.now()] = {"error":error};
                console.log("error : ",error)
            }
            //connection.sendUTF(JSON.stringify(playerReturn(JSON.parse(message.utf8Data))));
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        Object.keys(listConnection).forEach(function(client) {
            if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true)
                listConnection[client].send(JSON.stringify({"action":"discoUser",id:connection.idPlayer}));
        })
        //console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        delete listConnection[connection.idSearch];
        if(listPlayersLite[connection.idSearch])
            listPlayersLite[connection.idSearch].c = 0;
    });
});




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
        //console.log("Response:");
        //console.log(JSON.parse(data));
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
  
  //sendNotification(message);