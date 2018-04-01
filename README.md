# Geo point tsv search
The project focuses on finding closest points from given TSV file.</br>
User is allowed to enter radius, latitude, longitude.</br>
Input latitude & longitude will be the center point from which points from given TSV file will be plotted on map based on radius(in KM).</br>
Creates JSON from TSV when server starts.</br>
Uses Haversine algorithm to calculate distance between given coordinates.


/api/v1/search/?radius=5&latitude=43.50&longitude=28.50


### Demo
https://geo-pointer-tsv.herokuapp.com/


### Prerequisites

Please install all node packages from package.json

### Installing

npm install


## Built With
* [Node](https://nodejs.org/en/) - Server
* [Express](https://github.com/expressjs) - The web framework used
* [Haversine]( https://www.npmjs.com/package/haversine) - Haversine algorithm
* [Structure](https://github.com/prajyotpro/node-app) - Custom structure
* [Mustache](https://github.com/janl/mustache.js) - Templating engine


## Authors

* **Prajyot Khandeparkar** - *Initial work* - [prajyotpro](https://github.com/prajyotpro)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
