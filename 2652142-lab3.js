function getMusicTitlesByYear(tracks){
    const titlesByYear = {}

    if (!Array.isArray(tracks)){
        throw new Error("Input must be an array of music tracks")
    }

    tracks.forEach(t=> {
        if(t.year == undefined){
            throw new TypeError("A year property is needed in the tracks object")
        }
        if(typeof t.year != "number"){
            throw new TypeError("year needs to be a number")
        }
        if(t.artist == undefined){
            throw new TypeError("A artist property is needed in the tracks object")
        }
        if(typeof t.artist != "string"){
            throw new TypeError("Artist needs to be a string of characters")
        }
        if(t.title == undefined){
            throw new TypeError("A title property is needed in the tracks object")
        }
        if(typeof t.title != "string"){
            throw new TypeError("Title of a song needs to be a string of characters")
        }

        let title = t.title;
        let year = t.year;

        if (isNaN(year)|| year <= 0){
            throw new Error("Invalid year entered")
        }

        if (!titlesByYear[year]){
            titlesByYear[year] = [];
        }
        titlesByYear[year].push(title);

    });
    Object.keys(titlesByYear).forEach(y =>{
        titlesByYear[y].sort();
    });
    return titlesByYear;
}

module.exports = {getMusicTitlesByYear}