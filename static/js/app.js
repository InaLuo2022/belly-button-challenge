// Use the D3 library to read in samples.json from the URL as follows
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data.samples[0]);
    let data_sample = data.samples[0];
    let data_metadata = data.metadata[0]
    console.log(data_sample);
    console.log(data_metadata)
});

// Initialize the default plot with the first data sample
d3.json(url).then(function init(first_sample) {
    // bar chart
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
        height: 400,
        width: 600,
        rotation: 'h'
    };

    Plotly.newPlot("bar", data, layout);

    // bubble chart
    let bubble_size = []
        for (let z = 0; z < 80; z++) {
        bubble_size.push(data_sample.sample_values[z] * 0.8);}

    var data_bubble = [{
        x: data_sample.otu_ids,
        y: data_sample.sample_values,
        mode: 'markers',
        marker: { 
            size: bubble_size,
            color: data_sample.otu_ids,
        }
    }];

    var layout = {
        title: 'otu_lable',
        showlegend: false,
        height: 400,
        width: 800,
      };

    Plotly.newPlot('bubble', data_bubble, layout);

    //sample-metadata
    paragraphs = [];

    paragraphs.push('<p>' + "id: " + first_sample.metadata[0].id + '</p>');
    paragraphs.push('<p>' + "ethnicity: " + first_sample.metadata[0].ethnicity + '</p>');
    paragraphs.push('<p>' + "gender: " + first_sample.metadata[0].gender + '</p>');
    paragraphs.push('<p>' + "location: " + first_sample.metadata[0].location + '</p>');
    paragraphs.push('<p>' + "bbtype: " + first_sample.metadata[0].bbtype + '</p>');
    paragraphs.push('<p>' + "wfreq: " + first_sample.metadata[0].wfreq + '</p>')

    document.getElementById("sample-metadata").innerHTML = paragraphs;
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
            height: 400,
            width: 600,
            rotation: 'h'
        };

        Plotly.newPlot("bar", data, layout);});

    d3.json(url).then(function(chart_2){

        // let otu_lable = 'OTU' + data_sample.otu_lable[index];
        let bubble_size = []
        for (let z = 0; z < 153; z++) {
            bubble_size.push(chart_2.samples[index].sample_values[z] * 0.8);}

        var data_bubble = [{
            x: chart_2.samples[index].otu_ids,
            y: chart_2.samples[index].sample_values,
            mode: 'markers',
            marker: { 
                size: bubble_size,
                color: chart_2.samples[index].otu_ids,
            }
        }];

        var layout = {
            title: 'otu_lable',
            showlegend: false,
            height: 400,
            width: 800,
          };

    Plotly.newPlot('bubble', data_bubble, layout);
    });

    d3.json(url).then(function(Demo_info){
        paragraphs = [];

        paragraphs.push('<p>' + "id: " + Demo_info.metadata[index].id + '</p>');
        paragraphs.push('<p>' + "ethnicity: " + Demo_info.metadata[index].ethnicity + '</p>');
        paragraphs.push('<p>' + "gender: " + Demo_info.metadata[index].gender + '</p>');
        paragraphs.push('<p>' + "location: " + Demo_info.metadata[index].location + '</p>');
        paragraphs.push('<p>' + "bbtype: " + Demo_info.metadata[index].bbtype + '</p>');
        paragraphs.push('<p>' + "wfreq: " + Demo_info.metadata[index].wfreq + '</p>')

        document.getElementById("sample-metadata").innerHTML = paragraphs;

    });
};


