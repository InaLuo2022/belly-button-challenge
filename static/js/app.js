// Use the D3 library to read in samples.json from the URL as follows
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data.samples[0]);
    let data_sample = data.samples[0];
    console.log(data_sample);
});

// Initialize the default plot with the first data sample
d3.json(url).then(function init(first_sample) {
    let otu_ids = [];
    let data_sample = first_sample.samples[0]

    for (let i = 0; i < 10; i++) {
    otu_ids.push('OTU' + data_sample.otu_ids[i]);
    }

    console.log(otu_ids);

    let xData = otu_ids;
    let yData = data_sample.sample_values.slice(0,10);

    var data = [{
        x: xData,
        y: yData,
        type: 'bar',
    }];

    var layout = {
        title: 'top 10 OTUs',
        height: 600,
        width: 800,
        rotation: 'h'
    };

    Plotly.newPlot("plot", data, layout);
});

// set dropdown box value
d3.json(url).then(function(dropdown_value) {
    let options = ""
    for (let j = 0; j < 153; j++){
        let y = dropdown_value.samples[j].id;
        options += "<option>"+ y +"</option>";
    };
    document.getElementById("selDataset").innerHTML = options});; 
   
d3.selectAll("#selDataset").on("change", getData);
    
function getData() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let data_id = dropdownMenu.property("value");

    let index = [];

    index = data_id - 940;

    console.log (index);

    d3.json(url).then(function(chart_1){
        let otu_ids = [];
        let data_sample = chart_1.samples[index]
    
        for (let i = 0; i < 10; i++) {
        otu_ids.push('OTU' + data_sample.otu_ids[i]);
        }
    
        console.log(otu_ids);
    
        let xData = otu_ids;
        let yData = data_sample.sample_values.slice(0,10); 

        var data = [{
            x: xData,
            y: yData,
            type: 'bar',
        }];

        var layout = {
            title: 'top 10 OTUs',
            height: 600,
            width: 800,
            rotation: 'h'
        };

        Plotly.newPlot("plot", data, layout);
    });
};

