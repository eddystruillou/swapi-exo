let filmNumber = 1;

process.argv.forEach(function (val, index, array) {
    filmNumber = val
});

const request = require("request");

function getData(url) {
    return new Promise((resolve, reject) => {
        // Do async job
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
    let diameterFinal;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return new Promise(resolve => {
        getData(url).then((result) => {
            planets = result.planets;
            url = planets[0];
            for (let i in planets) {
                getData(planets[i]).then((result) => {
                    planetsInfos.push([result.name, result.diameter, result.terrain, result.surface_water]);
                    completed_requests++;
                    if (completed_requests === planets.length) {
                        planetsInfos.forEach((element) => {
                            if(parseInt(element[3]) >= 1 && element[3] !== 'unknown') {
                                if(element[2].toLowerCase().indexOf(mountains.toLowerCase()) !== -1) {
                                    diameterAvailable = parseInt(element[1]);
                                    console.log(diameterAvailable);
                                }
                            }
                        });
                    }
                });
            }
        })
    });
}

main();
