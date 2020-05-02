// // from data.js
var tableData = data;

var tbody = d3.select("tbody");

// data.forEach((ufoReport) => {
//  var row = tbody.append("tr");
//  Object.entries(ufoReport).forEach(([key, value]) => {
//   var cell = row.append("td");
//    cell.text(value);
//  });
// });

var button = d3.select("#filter-btn");


//   console.log(tableData);

//   var filteredData = tableData.filter(ufo => tableData.datetime === inputValue);

//   console.log(filteredData);

updateTable(tableData);

//get filter criteria on button_click
button.on("click", function() {
    //  Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    // inputValue=checkDateFormat(inputElement.property("value"))

    inputValue=inputElement.property("value");
    console.log(inputValue)
    
    if(inputValue===""){
        //clear filter to show all data
        updateTable(tableData);
    
      } else{
        //show only data that matches the filter
        checkDateFormat(inputValue);
        fetchData(inputValue);
    }
});

//Remove zero from date  
function checkDateFormat(givenStr){
    var datedata = givenStr.split("/");
    var mm = datedata[0];
    var dd = datedata[1];
    var yyyy = datedata[2];

    if (mm.charAt(0) === "0"){
      datedata[0] = mm.replace("0", "");
    };
    if (dd.charAt(0) === "0") {
      datedata[1] = dd.replace("0", "");
    };
    return(datedata[0] + "/" + datedata[1] + "/" + datedata[2]);
}

//Select data that matches the filter
function fetchData(inputValue){
    var filteredData = tableData.filter(data => data.datetime === inputValue);
    if(filteredData.length>0){
        updateTable(filteredData);
    } else {
        // alert(`There are no UFO sightings data on ${inputValue}.`);
        tbody.html(`<tr><h3>There are no UFO sightings data on ${inputValue}.</h3></tbody>`);

    }
}

//Output result to the table
function updateTable(selectedData){
    tbody.html("");
    selectedData.forEach((ufoSightings)=>{
        var row = tbody.append("tr");
        Object.entries(ufoSightings).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search");
var $resetBtn = document.querySelector("#reset");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Add an event listener to the resetButton, call handleResetButtonClick when clicked
$resetBtn.addEventListener("click", handleResetButtonClick);


// Build table with non-filtered data
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < tableData.length; i++) {
    // Get current address object and fields
    var address = tableData[i];
    console.log(address)
    var fields = Object.keys(address);
    // Create new row in tbody, set index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For each field in address object, create new cell and set inner text to be current value at current address field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

// Build search table for filtered data
function handleSearchButtonClick() {
  var filterDate = $dateInput.value;
  
  // Filter on date
  if (filterDate != "") {
    tableData = data.filter(function (address) {
      var addressDate = address.datetime;
      return addressDate === filterDate;
    });
  }
  else { tableData };

  renderTable();
}

// Clear all the fields
function handleResetButtonClick(){
  renderTable();
}

// Render the table on page load
renderTable();