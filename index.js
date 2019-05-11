const request = require("request");
const args = process.argv.slice(2);
let filmNumber = args[0];

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
        }
        if(som !== 0) {
            console.log('Total diameter :', som);
        } else {
            console.log('Recherche tu dois approfondir. Rien nous trouverons ici');
        }
    }).catch((error) => {
        console.log('error', error);
    })
}

main();
