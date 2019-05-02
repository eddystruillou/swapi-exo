const request = require("request");
let filmNumber = 1;

process.argv.forEach(function (val, index, array) {
    filmNumber = val
});

function getData(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body)); //JSON.parse possible crash ?
            }
        })
    })
}

function main() {
    let url = `https://swapi.co/api/films/${filmNumber}/`;
    let planets = [];
    let planetsInfos = [];
    let mountains = "mountains";
    let completed_requests = 0;
    let diameterAvailable = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return new Promise(() => {
        getData(url).then((result) => {
            planets = result.planets;
            url = planets[0];
            return new Promise(() => {
                for (let i in planets) {
                    getData(planets[i]).then((result) => {
                        planetsInfos.push({name: result.name, diameter: result.diameter, terrain: result.terrain, sw: result.surface_water});
                        completed_requests++;
                        if (completed_requests === planets.length) {
                            planetsInfos.forEach((element) => {
                                if(element.sw >= 1 && element.sw !== 'unknown') {
                                    if(element.terrain.toLowerCase().indexOf(mountains.toLowerCase()) !== -1) {
                                        diameterAvailable = element.diameter;
                                        console.log(diameterAvailable);
                                    }
                                }
                            });
                        }
                    });
                }
            })
        })
    });
}

main();
