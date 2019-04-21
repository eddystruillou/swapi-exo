let filmNumber = 1;

process.argv.forEach(function (val, index, array) {
    filmNumber = val
});

const request = require("request");
//let url = `https://swapi.co/api/films/${filmNumber}/`;
//let data = '';

function initialize() {
    let url = `https://swapi.co/api/films/${filmNumber}/`;

    return new Promise((resolve, reject) => {
        // Do async job
        request.get(url, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body); //JSON.parse possible crash ?
            }
        })
    })
}

function main() {
    let initializePromise = initialize();
    initializePromise.then((result) => {
        let userDetails = result;
        console.log(userDetails.planets)
    }, (err) => {
        console.log(err);
    }).then(() => {

    })
}

main();

/*https.get(url, res => {
    let planets = [];
    let responses = [];
    let completed_requests = 0;

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        data = JSON.parse(data);
        planets = data.planets;
        console.log('data', data);

        for (let i in planets) {
            https.get(planets[i], res => {
                responses.push(res);
                completed_requests++;
                if (completed_requests === planets.length) {
                    // All download done, process responses array
                    console.log(responses);
                }
                console.log(responses);
            });
        }
    });
});*/
