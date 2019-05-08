const request = require("request");
let filmNumber = 1;

process.argv.forEach((val, index, array) => {
    filmNumber = val
});

function getData(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}

function main() {
    let url = `https://swapi.co/api/films/${filmNumber}/`;
    let mountains = "mountains";
    let planets = [];
    let availableDiameter = [];

    return getData(url).then((result) => {
        planets = result.planets;
        result = []; //array<Promise>
        for (let i in planets) {
            result.push(getData(planets[i]))
        }
        return Promise.all(result)
    }).catch((error) => {
        console.log('error', error);
    }).then((results) => {
        results.forEach(({surface_water, diameter, terrain}) => {
            if(surface_water >= 1 && surface_water !== 'unknown') {
                if(terrain.toLowerCase().indexOf(mountains ) !== -1) {
                    availableDiameter.push(diameter);
                }
            }
        });

        let som = 0;
        for(let i in availableDiameter) {
            som += parseInt(availableDiameter[i]);
            console.log(som);
            planets = [];
            availableDiameter = [];
        }
    }).catch((error) => {
        console.log('error', error);
    })
}

main();
