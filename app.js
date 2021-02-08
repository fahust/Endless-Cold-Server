
var WebSocketServer = require('websocket').server;
var http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
//const { start } = require('repl');
const { Worker } = require('worker_threads')

/*const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';*/

var key1 = "4r8949e4j94n46dher546j4n8frtj9rt847";
var key2 = "jr849jr8t4j98tr4hr49r8jt49e84yj894";
var key3 = "zr8y49zr84g89r498h4re98h4zr984g984h9er87";
var key4 = "2e1ger1h2re1h2er13z13hr1z2r1tj31321ht";
var key5 = "rtj46rt4h68rjh68rtyj68r7y4j68r7ty6j87r6";
var key6 = "az6z4a6raz4r64zr6a84a6z8r468e464e84vg8e";

var viewDistance = 50000;

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
//houses.nbrHouse = 0;
var stepHouse = 0;
var dateHouse = Date.now();
var listConnection = {};
var players = {};
var cargo = {};
var messages = {};
var listPlayers = {};
var listPlayersLite = {};
var logModerate = {};
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


const farming={"farmer" : {value:["food"],bonusPlace:"farm",need:[]},"leatherworker" : {value:["armor"],bonusPlace:"armory",need:["leather"]},"stonemason" : {value:["bricks"],bonusPlace:"stoneworks",need:["stone"]},"woodworker" : {value:["boards"],bonusPlace:"lumbermill",need:["wood"]},"lumberjack" : {value:["wood"],bonusPlace:"sawmill",need:[]},"hunter" : {value:["leather","food"],bonusPlace:"hunting house",need:[]},"stone miner":{value:["stone"],bonusPlace:"mining station",need:[]},"ammo technician":{value:["ammo"],bonusPlace:"armory",need:["metal"]},"craftsman":{value:["gear","screw","toolbox"],bonusPlace:"workshop",need:["copper","metal"]},"metalworker":{value:["copper","metal","gold","gunpowder"],bonusPlace:"furnace",need:["stone","wood"]}}

const ressProd={"wood":1,"food":1,"water":1,"ammo":200, "stone":1,"boards":2,"bricks":2,"leather":2,"armor":3,"copper":5,"metal":4,"gold":100,"gear":125,"screw":150,"toolbox":175,"gunpowder":250}

const jobList = ["farmer","cook","builder","bartender","doctor","farmer","leatherworker","stonemason","woodworker","lumberjack","hunter","stone miner","weapon technician","armor technician","ammo technician","craftsman","metalworker","instructor"]

const houseNeed = {//coter client en découvre un pour chaque level de batiment en plus
    "stoneworks":{"wood":50,"stone":150},//stonemason
    "lumbermill":{"wood":150,"stone":50},//woodworker
    "house":{"boards":50,"bricks":50,"stone":50},
    "farm":{"boards":250,"bricks":200},//farmer
    "hunting house":{"boards":200,"bricks":100,"stone":50},
    "church":{"boards":150,"bricks":200,"stone":1000},
    "school":{"boards":300,"bricks":200},
    "weaving":{"boards":200,"bricks":250},
    "furnace":{"stone":700,"bricks":1200},
    "sawmill":{"metal":200,"boards":400,"bricks":600},
    "mining station":{"metal":300,"boards":700,"bricks":200},
    "bar":{"boards":450,"bricks":300,"copper":600},
    "restaurant":{"boards":500,"bricks":300,"copper":300},
    "medical":{"boards":200,"bricks":150,"metal":50,"copper":150},
    "store":{"boards":500,"stone":350,"metal":200},
    "water station":{"stone":300,"metal":700,"copper":100},
    "workshop":{"boards":650,"bricks":500,"metal":250,"copper":170},
  
    
    "factory":{"boards":400,"bricks":300,"metal":800,"copper":600},
    "barracks":{"boards":1400,"bricks":1500,"metal":300,"copper":150},
    "armory":{"boards":300,"bricks":800,"metal":700,"copper":300},//leatherworker
   }

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
        fs.writeFile('logModerate.json', JSON.stringify(logModerate), (err) => {
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
                                                    fs.readFile('logModerate.json', (err, data) => {
                                                        if (err) throw err;
                                                        logModerate = JSON.parse(data);
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
    });
}

function totalyDeletePlayer(){
    try {
        Object.keys(listPlayers).forEach(player => {
            if(Date.now() > listPlayers[player].lastCo+(60000*60*24*30*1)){
                delete messages[player];
                delete friends[player];
                Object.keys(market).forEach(item => {
                    if(market[item].id == player)
                        delete market[item]
                });
                Object.keys(cults).forEach(cult => {
                    if(cults[cult].users[player])
                        delete cults[cult].users[player]
                });
                delete listPlayers[player];
                delete listPlayersLite[player];
            }
        }); 
    } catch (error) {
        console.log(error)
    }
}

function start(){
    //var job = ["farmer","cook","builder","bartender","doctor","blacksmith","farmer","leatherworker","stonemason","woodworker","lumberjack","hunter"]
    /*houses = {
        1:{
            lat:48.8961845,
            lng:2.8115658,
            "refugee":{
                0:{s:0,//sexe 0 = femme
                    a:15,//age
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
                        f:1,//fighter
                    },
                    work:"builder",
                },
                1:{s:1,a:15,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:"",work:"farmer"},
                2:{s:1,a:15,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:"",work:"stonemason"},
                3:{s:0,a:14,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:"",work:"woodworker"},
                4:{s:0,a:18,l:100,e:8,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:"",work:"lumberjack"},
                5:{s:1,a:19,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:"",work:"stone miner"},
            },
            "queue":[],
            "users":{},
            "ress":{"wood":365*5,"food":365*5,"water":365*5,"ammo":10, "stone":0,"boards":0,"bricks":0,"leather":0,"armor":0,"copper":0,"metal":0,"gold":0,"gear":0,"screw":0,"toolbox":0,"gunpowder":0},
            "prod":{"wood":0,"food":0,"water":0,"ammo":0, "stone":0,"boards":0,"bricks":0,"leather":0,"armor":0,"copper":0,"metal":0,"gold":0,"gear":0,"screw":0,"toolbox":0,"gunpowder":0},
            "place":{
                "lumbermill":{"progress":0,"build":0},//woodworker
                "stoneworks":{"progress":0,"build":0},//stonemason
                "house":{"progress":0,"build":0},
                "farm":{"progress":0,"build":0},//farmer
                "hunting house":{"progress":0,"build":0},
                "school":{"progress":0,"build":0},
                "church":{"progress":0,"build":0},
                "weaving":{"progress":0,"build":0},
                "furnace":{"progress":0,"build":0},
                "sawmill":{"progress":0,"build":0},
                "mining station":{"progress":0,"build":0},
                "store":{"progress":0,"build":0},
                "bar":{"progress":0,"build":0},
                "restaurant":{"progress":0,"build":0},
                "medical":{"progress":0,"build":0},
                "water station":{"progress":0,"build":0},
                "workshop":{"progress":0,"build":0},

                "factory":{"progress":0,"build":0},
                "barracks":{"progress":0,"build":0},
                "armory":{"progress":0,"build":0},//leatherworker

            },
            "law":{
                "workHourByDay":18,
                "ageForWork":3,
                "ageForReproduce":12,
                "foodByDay":3,
                "woodByDay":6,
                "waterByDay":4,//litre
            },
            "greve":0,
            "rGreve":1,
            "log":{},
            "cloth":{},
            progress:1,
            level:1,
            id:1,
            birth:6,
            teacher:0,
            build:0,
            medic:0,
            psycho:0,
            malade:0,
            proprio:-1,
            freeze:-1,
            "fortress":{
                "enemy":{
                },
                "allie":{

                }
            },
        },
        nbrHouse : 1,
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
                        if(getDistanceFromLatLonInKm(listConnection[client].lat,listConnection[client].lng,responseJson.data[0].latitude,responseJson.data[0].longitude) < viewDistance){
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
        //totalyDeletePlayer();
        save();
    }, 60000*10);//60000
    setInterval(() => {//console.log(dateHouse+(60000/houses.nbrHouse))
        try {
            if(Date.now() > dateHouse+(2000/Object.keys(houses).length)){
                var dateTest = Date.now();
                if(houses[Object.keys(houses)[stepHouse]] && houses[Object.keys(houses)[stepHouse]].ress && houses[Object.keys(houses)[stepHouse]].birth > 0){
                    if(Object.keys(houses[Object.keys(houses)[stepHouse]].fortress.enemy).length <= 0){
                        runService({"house":houses[Object.keys(houses)[stepHouse]],"houses":houses,"names":names,"listPlayers":listPlayers,"farming":farming,"jobList":jobList,"houseNeed":houseNeed,"ressProd":ressProd,}).then((data)=>{
                            var usersTemp = Object.assign({}, houses[data.id].users, {})
                            if(houses[data.id].block != 1)//Pour eviter rollback client
                                houses[data.id] = data.house;
                            houses[data.id].block = 0;
                            houses[data.id].users = usersTemp;
                            if(data.destroyHouse == 1)
                                delete houses[data.id];
                            listPlayers = data.listPlayers;
                            if(houses[data.id] && data.exportMessage.newFortress){
                                Object.keys(listConnection).forEach(function(client) {
                                    if(listConnection[client].connected == true){
                                        listConnection[client].send(JSON.stringify({"action":"newFortress","house":{
                                            f : 1,
                                            lat : data.exportMessage.newFortress.lat,
                                            lng : data.exportMessage.newFortress.lng,
                                            id : data.exportMessage.newFortress.id,}}))
                                    }
                                })
                            }
                            if(houses[data.id] && data.exportMessage.moveRefugee){
                                houses[data.exportMessage.moveRefugee.houseNear.id].refugee = data.exportMessage.moveRefugee.houseNear.refugee;
                                Object.keys(listConnection).forEach(function(client) {
                                    if(listConnection[client] && listConnection[client].connected == true && listConnection[client].lat && listConnection[client].lng && getDistanceFromLatLonInKm(data.exportMessage.moveRefugee.houseNear.lat,data.exportMessage.moveRefugee.houseNear.lng,listConnection[client].lat,listConnection[client].lng) < viewDistance){
                                        listConnection[client].send(JSON.stringify({"action":"moveRefugee","refugee":{
                                            sLat:data.exportMessage.moveRefugee.sLat,slng:data.exportMessage.moveRefugee.slng,eLat:data.exportMessage.moveRefugee.eLat,eLng:data.exportMessage.moveRefugee.eLng,dist:data.exportMessage.moveRefugee.dist,byId:data.exportMessage.moveRefugee.byId,toId:data.exportMessage.moveRefugee.toId}}))
                                        }
                                })
                            }
                            if(houses[data.id] && Object.keys(houses[data.id].users).length > 0){
                                Object.keys(houses[data.id].users).forEach(function(client) {
                                    if(listConnection[client] && listConnection[client].connected == true){
                                        listConnection[client].send(JSON.stringify({"action":"houseViewLite","house":data.objSendable}))
                                    }
                                })
                            }
                        })
                    }
                }
                if(houses[Object.keys(houses)[stepHouse]]){
                    if(listPlayers[houses[Object.keys(houses)[stepHouse]].proprio]){//perds proprio si un mois sans connect
                        if(Date.now() > listPlayers[houses[Object.keys(houses)[stepHouse]].proprio].lastCo+(60000*60*24*30*1))
                            houses[Object.keys(houses)[stepHouse]].proprio = -1
                    }else if(houses[Object.keys(houses)[stepHouse]].la){//si pas de proprio et 2 mois depuis last action alors destroy
                        if(Date.now() > houses[Object.keys(houses)[stepHouse]].la+(60000*60*24*30*2))
                            delete houses[Object.keys(houses)[stepHouse]];
                    }
                }
                //houseProcess(houses[stepHouse]);
                dateHouse = Date.now()
                if(stepHouse < Object.keys(houses).length){
                    stepHouse++
                }else{
                    stepHouse = 0
                }
                //console.log(Date.now()-dateTest)
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
            
        } catch (error) {
            console.log(error)
        }
    }, 10*1);
}

function runService(workerData) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./workerHouse-min.js', { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      })
    })
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

function deleteQueue(house,place){
    var unique = true;
    house.queue.forEach((queue,index) => {
        if(queue == place && unique == true){
            house.queue.splice(index, 1);
            unique = false;
        }
    });
    return {"action":"houseView","house":house}
}

function addQueue(house,place){
    house.queue.push(place)
    return {"action":"houseView","house":house}
}

function changeWork(house,idRefugee,job){
    house["refugee"][idRefugee].work = job;
    return {"action":"houseView","house":house}
}

function kickRefugee(house,idRefugee){
    house.greve+= 200;
    delete house["refugee"][idRefugee];
    return {"action":"houseView","house":house}
}



function addHouse(body){
    var near = false
    Object.keys(houses).forEach(house => {
        if(getDistanceFromLatLonInKm(houses[house].lat, houses[house].lng, body.lat, body.lng) < 1*(5+Object.keys(houses[house].refugee).length)){
            near = true
        }
    });
    if(near == false){
        //houses.nbrHouse++
        var id = Date.now();
        var house={
            "la":Date.now(),
            "refugee":{},
            "queue":[],
            "users":{},
            "ress":{"wood":0,"food":0,"water":0, "stone":0,"boards":0,"bricks":0,"leather":0,"armor":0,"copper":0,"metal":0,"gold":0,"gear":0,"screw":0,"toolbox":0,"gunpowder":0,"ammo":0},
            "prod":{"wood":0,"food":0,"water":0, "stone":0,"boards":0,"bricks":0,"leather":0,"armor":0,"copper":0,"metal":0,"gold":0,"gear":0,"screw":0,"toolbox":0,"gunpowder":0,"ammo":0},
            "place":{
                "lumbermill":{"progress":0,"build":0},//woodworker
                "stoneworks":{"progress":0,"build":0},//stonemason
                "house":{"progress":0,"build":0},
                "farm":{"progress":0,"build":0},//farmer
                "hunting house":{"progress":0,"build":0},
                "school":{"progress":0,"build":0},
                "church":{"progress":0,"build":0},
                "weaving":{"progress":0,"build":0},
                "furnace":{"progress":0,"build":0},
                "sawmill":{"progress":0,"build":0},
                "mining station":{"progress":0,"build":0},
                "store":{"progress":0,"build":0},
                "bar":{"progress":0,"build":0},
                "restaurant":{"progress":0,"build":0},
                "medical":{"progress":0,"build":0},
                "water station":{"progress":0,"build":0},
                "workshop":{"progress":0,"build":0},

                "factory":{"progress":0,"build":0},
                "barracks":{"progress":0,"build":0},
                "armory":{"progress":0,"build":0},//leatherworker

            },
            "law":{
                "workHourByDay":10,
                "ageForWork":17,
                "ageForReproduce":17,
                "foodByDay":4,
                "woodByDay":6,
                "waterByDay":4,
            },
            "fortress":{
                "enemy":{},
                "allie":{},
            },
            "greve":0,
            "rGreve":1,
            "log":{},
            "cloth":{},
            /*progress:1,
            level:1,*/
            id:id,
            birth:0,
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
        houses[id] = house
        return {action:"addHouse",house:{lat:body.lat,lng:body.lng,id:id,nbr:0}};
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
    houses[body.id]["refugee"][Date.now()] = {s:getRandomInt(0,2),a:1,l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:name,m:body.mother,f:body.father,lf:"",work:"farmer",p:getRandomInt(1,41)};
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
    var distance = 1000;
    var id = undefined;
    Object.keys(houses).forEach(house => {
        if(Object.keys(houses[house]["refugee"]).length < ((2+houses[house]["place"].house.build)*2)){
            var dist = getDistanceFromLatLonInKm(body.lat,body.lng,houses[house].lat,houses[house].lng)
            if(dist < distance){
                distance = dist;
                id = house;
            }
        }
    });
    //houses[body.id]["log"][Object.keys(houses[body.id]["log"]).length] = {t:"Join",c1:body.mother,c2:body.father,c3:name,d:Date.now()}
    if(id && houses[id]){
        houses[id].block = 1;
        houses[id]["refugee"][Date.now()] = {s:getRandomInt(0,2),a:getRandomInt(12,40),l:100,e:-1,ap:1,h:100,v:0,job:{h:1,m:1,t:1,p:1,b:1,f:1},n:names[getRandomInt(0,names.length)].name,m:names[getRandomInt(0,names.length)].name,f:names[getRandomInt(0,names.length)].name,lf:"",work:"farmer",p:getRandomInt(1,41)};
        houses[id].birth+=1;
    }
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

function addRessource(body){
    if(body.nbr){
        houses[body.id]["ress"][body.type] += body.nbr;
    }else{
        houses[body.id]["ress"][body.type == "combustible" ? "wood" : body.type == "nourriture" ? "food" : body.type == "boisson" ? "water" : "ammo"] += body.value;
    }
    return {action:body.action,house:houseView(body)};
}
function subRessource(body){
    if(body.type =="leather" || body.type=="metal" || body.type=="gold" || body.type=="gear" || body.type=="screw" || body.type=="gunpowder" || body.type=="toolbox" || body.type=="ammo"){
        houses[body.id]["ress"][body.type] -= body.nbr
    }else{
        houses[body.id]["ress"][body.type] -= 7;
    }
    //body.type == "ammo" ? houses[body.id]["ress"][body.type] -= 1 : houses[body.id]["ress"][body.type] -= 7;
    return {type:body.type,nbr:body.nbr,action:body.action,house:houseView(body)};
}//bloquer coter client si < 0

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
                        id : houses[body.id].id,
                        nbr : Object.keys(houses[body.id].refugee).length
                    }}))
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
    /*{cl:JSON.parse(message.utf8Data)["profil"]["class"],n:JSON.parse(message.utf8Data)["profil"]["name"],r:JSON.parse(message.utf8Data)["profil"]["reput"]+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,p:JSON.parse(message.utf8Data)["profil"]["portrait"],id:JSON.parse(message.utf8Data)["idPlayer"],s:JSON.parse(message.utf8Data)["profil"]["stats"]["sexe"],c:1,lastCo:Date.now(),k:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k,m:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m,lat:JSON.parse(message.utf8Data)["latitude"],lng:JSON.parse(message.utf8Data)["longitude"]}*/
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
                    if(listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]]){
                        listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["latitude"]
                        listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["longitude"]
                    }
                    if(listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]]){
                        listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["latitude"]
                        listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["longitude"]
                    }
                    if(listConnection[JSON.parse(message.utf8Data)["idPlayer"]]){
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["latitude"]
                        listConnection[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["longitude"]
                    }

                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].connected == false)
                            delete listConnection[connection.idSearch];
                        if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true && getDistanceFromLatLonInKm(JSON.parse(message.utf8Data)["latitude"],JSON.parse(message.utf8Data)["longitude"],listConnection[client].lat,listConnection[client].lng) < viewDistance)
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
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["profil"]["latitude"]
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["profil"]["longitude"]
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]].lat = JSON.parse(message.utf8Data)["profil"]["latitude"]
                    listConnection[JSON.parse(message.utf8Data)["idPlayer"]].lng = JSON.parse(message.utf8Data)["profil"]["longitude"]
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
                    //console.log(JSON.parse(message.utf8Data))
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].invit = invit
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lastCo = Date.now()
                    listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]] = {cl:JSON.parse(message.utf8Data)["profil"]["class"],n:JSON.parse(message.utf8Data)["profil"]["name"],r:JSON.parse(message.utf8Data)["profil"]["reput"]+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,p:JSON.parse(message.utf8Data)["profil"]["portrait"],id:JSON.parse(message.utf8Data)["idPlayer"],s:JSON.parse(message.utf8Data)["profil"]["stats"]["sexe"],/*v:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,*/c:1,lastCo:Date.now(),k:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k,m:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m,lat:JSON.parse(message.utf8Data)["profil"]["latitude"],lng:JSON.parse(message.utf8Data)["profil"]["longitude"]};
                    //console.log(listPlayersLite)
                    connection.send(JSON.stringify({"action":"houseList",list:houseList(),towers:towers,stations:stations,messages:messageList(JSON.parse(message.utf8Data)["idPlayer"]),listPlayersLite:listPlayersLite,cult:cult,friends:friendsCreate(JSON.parse(message.utf8Data)["idPlayer"]),kicked:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k}))
                    var data = JSON.stringify({"action":"move","lat":JSON.parse(message.utf8Data)["profil"]["latitude"],"lng":JSON.parse(message.utf8Data)["profil"]["longitude"],"sexe":listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].stats.sexe,"rest":0,"p":listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].portrait,"name":listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name,"id":JSON.parse(message.utf8Data)["idPlayer"]})
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true && getDistanceFromLatLonInKm(JSON.parse(message.utf8Data)["profil"]["latitude"],JSON.parse(message.utf8Data)["profil"]["longitude"],listConnection[client].lat,listConnection[client].lng) < viewDistance)
                            listConnection[client].send(data);
                    });
                }else if(JSON.parse(message.utf8Data)["action"] == "houseView"){
                    houses[JSON.parse(message.utf8Data).id].users[JSON.parse(message.utf8Data).idPlayer] = JSON.parse(message.utf8Data).idPlayer
                    connection.send(JSON.stringify(houseView(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "houseExit"){
                    delete houses[JSON.parse(message.utf8Data).id].users[JSON.parse(message.utf8Data).idPlayer]
                }else if(JSON.parse(message.utf8Data)["action"] == "deleteQueue"){
                    houses[JSON.parse(message.utf8Data).id].la = Date.now();
                    houses[JSON.parse(message.utf8Data).id].block = 1;
                    connection.send(JSON.stringify(deleteQueue(houses[JSON.parse(message.utf8Data).id],JSON.parse(message.utf8Data).type)))
                }else if(JSON.parse(message.utf8Data)["action"] == "addQueue"){
                    houses[JSON.parse(message.utf8Data).id].la = Date.now();
                    houses[JSON.parse(message.utf8Data).id].block = 1;
                    connection.send(JSON.stringify(addQueue(houses[JSON.parse(message.utf8Data).id],JSON.parse(message.utf8Data).type)))
                }else if(JSON.parse(message.utf8Data)["action"] == "changeWork"){
                    houses[JSON.parse(message.utf8Data).id].la = Date.now();
                    houses[JSON.parse(message.utf8Data).id].block = 1;
                    connection.send(JSON.stringify(changeWork(houses[JSON.parse(message.utf8Data).id],JSON.parse(message.utf8Data).idRefugee,JSON.parse(message.utf8Data).type)))
                }else if(JSON.parse(message.utf8Data)["action"] == "kickRefugee"){
                    houses[JSON.parse(message.utf8Data).id].la = Date.now();
                    houses[JSON.parse(message.utf8Data).id].block = 1;
                    connection.send(JSON.stringify(kickRefugee(houses[JSON.parse(message.utf8Data).id],JSON.parse(message.utf8Data).idRefugee)))
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
                    houses[JSON.parse(message.utf8Data).id].la = Date.now();
                    houses[JSON.parse(message.utf8Data).id].block = 1;
                    houses[JSON.parse(message.utf8Data).id].users[JSON.parse(message.utf8Data).idPlayer] = JSON.parse(message.utf8Data).idPlayer
                    connection.send(JSON.stringify(addRessource(JSON.parse(message.utf8Data))))
                }else if(JSON.parse(message.utf8Data)["action"] == "subRessource"){
                    houses[JSON.parse(message.utf8Data).id].la = Date.now();
                    houses[JSON.parse(message.utf8Data).id].block = 1;
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
                    houses[JSON.parse(message.utf8Data)["house"].id].block = 1;
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
                        logModerate[Date.now()] = JSON.parse(message.utf8Data)["idPlayer"]+" destroy guild "+cult.name
                        Object.keys(cult.users).forEach(user => {
                            if(listConnection[user] && listConnection[user].connected == true)
                                listConnection[user].send(JSON.stringify({"action":"quitCult"}))
                            //listConnection[user].send(JSON.stringify({"action":"deleteCult"}))
                        });
                        delete cults[JSON.parse(message.utf8Data)["id"]];
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
                    logModerate[Date.now()] = JSON.parse(message.utf8Data)["idOrigin"]+" kick "+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].name
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
                    var lastco;
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
                    if(listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] && listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lastCo)
                        lastco = listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lastCo
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] = JSON.parse(message.utf8Data)["profil"];
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].cult = cult
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote = vote
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lat = latitude
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].lng = longitude
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k = kicked
                    listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m = moderator
                    //listPlayers[JSON.parse(message.utf8Data)["idPlayer"]] = JSON.parse(message.utf8Data)["profil"]
                    listPlayersLite[JSON.parse(message.utf8Data)["idPlayer"]] = {cl:JSON.parse(message.utf8Data)["profil"]["class"],n:JSON.parse(message.utf8Data)["profil"]["name"],r:JSON.parse(message.utf8Data)["profil"]["reput"]+listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,p:JSON.parse(message.utf8Data)["profil"]["portrait"],id:JSON.parse(message.utf8Data)["idPlayer"],s:JSON.parse(message.utf8Data)["profil"]["stats"]["sexe"],/*v:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].vote,*/c:1,lastCo:lastco,k:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].k,m:listPlayers[JSON.parse(message.utf8Data)["idPlayer"]].m,lat:latitude,lng:longitude};
                    connection.send(JSON.stringify({"action":"listPlayersRefresh","listPlayersLite":listPlayersLite}))
                }else if(JSON.parse(message.utf8Data)["action"] == "friendsRefresh"){
                    connection.send(JSON.stringify({"action":"friendsRefresh","friends":friends[JSON.parse(message.utf8Data)["idPlayer"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "messagesRefresh"){
                    connection.send(JSON.stringify({"action":"messagesRefresh","messages":messages[JSON.parse(message.utf8Data)["idPlayer"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "houseRefresh"){
                    /*const size = new TextEncoder().encode(JSON.stringify(houses[JSON.parse(message.utf8Data)["id"]])).length
                    const kiloBytes = size / 1024;
                    const megaBytes = kiloBytes / 1024;
                    console.log(size);*/
                    connection.send(JSON.stringify({"action":"houseRefresh","house":houses[JSON.parse(message.utf8Data)["id"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "marketRefresh"){
                    connection.send(JSON.stringify({"action":"marketRefresh","market":market}))
                }else if(JSON.parse(message.utf8Data)["action"] == "cultRefresh"){
                    connection.send(JSON.stringify({"action":"cultRefresh","cult":cults[JSON.parse(message.utf8Data)["id"]]}))
                }else if(JSON.parse(message.utf8Data)["action"] == "backgroundApp"){
                    Object.keys(houses).forEach(function(house) {
                        if(houses[house] && houses[house].users && houses[house].users[connection.idPlayer])
                            delete houses[house].users[connection.idPlayer]
                    });
                    Object.keys(listConnection).forEach(function(client) {
                        if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true)
                            listConnection[client].send(JSON.stringify({"action":"discoUser",id:connection.idPlayer}));
                    })
                    delete listConnection[connection.idSearch];
                    if(listPlayersLite[connection.idSearch])
                        listPlayersLite[connection.idSearch].c = 0;
                    delete connection;
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
    connection.on('close', function(reasonCode, description) {//console.log(reasonCode, description)
        Object.keys(houses).forEach(function(house) {
            if(houses[house] && houses[house].users && houses[house].users[connection.idPlayer])
                delete houses[house].users[connection.idPlayer]
        });
        Object.keys(listConnection).forEach(function(client) {
            if(listConnection[client].idSearch != connection.idSearch && listConnection[client].connected == true)
                listConnection[client].send(JSON.stringify({"action":"discoUser",id:connection.idPlayer}));
        })
        //console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        delete listConnection[connection.idSearch];
        if(listPlayersLite[connection.idSearch])
            listPlayersLite[connection.idSearch].c = 0;
        delete connection;
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