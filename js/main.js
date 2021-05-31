// grab dom elements
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//search the za.json and filter i
const searchCities = async (searchText) => {
  //get data from json
  const res = await fetch("./data/za.json"); //res for the response and await for the promise to finish when we run fetch
  const cities = await res.json(); // tell this to be json
  //Get matches to current input
  let matches = cities.filter((city) => {
    //regex = regualr expression
    const regex = new RegExp(`^${searchText}`, "gi"); //has to start with carat with whathever the search text is
    //return array 
    return city.city.match(regex); //|| city.abbr.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
};

//Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
            <h5>
                ${match.city} <span class="text-warning">(${match.admin_name})</span ${match.iso2}
            </h5>
            <br>
            <small>Lat:${match.lat} / Long: ${match.lng}</smalll>
            <br>
            <small>Population:${match.population}</small>
        </div>
         
        `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

// Event everytime to call a function
search.addEventListener("input", () => searchCities(search.value));
