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
    let completed_requests = 0;

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
                            if(element[3] === '1') {
                                console.log(element);
                            }
                        });
                    }
                });
            }
        })
    });
}

main();
