// Use the D3 library to read in samples.json from the URL as follows
url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data.samples[0]);
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

    let yData = otu_ids;
    let xData = data_sample.sample_values.slice(0,10);
    let otu_labels = data_sample.otu_labels.slice(0,10);

    xData.reverse();

    var data = [{
        x: xData,
        y: yData,
        type: 'bar',
        orientation: 'h',
        text: otu_labels,
    }];

    var layout = {
        title: 'TOP 10 OTUs',
        height: 400,
        width: 600,
        rotation: 'h'
    };

    Plotly.newPlot("bar", data, layout);

    // Bubble Chart
    var data_bubble = [{
        x: data_sample.otu_ids,
        y: data_sample.sample_values,
        mode: 'markers',
        marker: { 
            size: data_sample.sample_values,
            color: data_sample.otu_ids,
        }
    }];

    var layout = {
        title: 'OTU ID',
        showlegend: false,
        height: 600,
        width: 1200,
      };

    Plotly.newPlot('bubble', data_bubble, layout);

    //sample-metadata
    let paragraphs = ['<p>'+"id: "+ first_sample.metadata[0].id+'</p>' 
        + '<p>' + "ethnicity: " + first_sample.metadata[0].ethnicity + '</p>'
        + '<p>' + "gender: " + first_sample.metadata[0].gender + '</p>'
        + '<p>' + "location: " + first_sample.metadata[0].location + '</p>'
        + '<p>' + "bbtype: " + first_sample.metadata[0].bbtype + '</p>'
        + '<p>' + "wfreq: " + first_sample.metadata[0].wfreq + '</p>'];

    document.getElementById("sample-metadata").innerHTML = paragraphs;

    gauge(first_sample.metadata[0].wfreq);
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

    console.log (index);

    d3.json(url).then(function(chart_1){

        for (let j = 0; j < 153; j++) {
            if (chart_1.samples[j].id == data_id) {
                index = j;
                console.log(index)
            }
        }
        
        let otu_ids = [];
        let data_sample = chart_1.samples[index]

        for (let i = 0; i < 10; i++) {
            otu_ids.push('OTU' + data_sample.otu_ids[i]);
        }
    
        console.log(otu_ids);
    
        let yData = otu_ids;
        let xData = data_sample.sample_values.slice(0,10);
        let otu_labels = data_sample.otu_labels.slice(0,10);

        xData.reverse();

        var data = [{
            x: xData,
            y: yData,
            text: otu_labels,
            type: 'bar',
            orientation: 'h',
        }];

        var layout = {
            title: 'TOP 10 OTUs',
            height: 400,
            width: 600,
            rotation: 'h'
        };

        Plotly.newPlot("bar", data, layout)});

    d3.json(url).then(function(chart_2){

        for (let j = 0; j < 153; j++) {
            if (chart_2.samples[j].id == data_id) {
                 index = j;
                 console.log(index)
            }
        }

        var data_bubble = [{
            x: chart_2.samples[index].otu_ids,
            y: chart_2.samples[index].sample_values,
            text: chart_2.samples[index].otu_labels,
            mode: 'markers',
            marker: { 
                size: chart_2.samples[index].sample_values,
                color: chart_2.samples[index].otu_ids,
            }
        }];

        var layout = {
            title: 'OTU ID',
            showlegend: false,
            height: 600,
            width: 1200,
          };

    Plotly.newPlot('bubble', data_bubble, layout);
    });

    d3.json(url).then(function(Demo_info){

        for (let j = 0; j < 153; j++) {
            if (Demo_info.metadata[j].id == data_id) {
                 index = j;
                 console.log(index)
            }
        }
        paragraphs = ['<p>'+"id: "+Demo_info.metadata[index].id+'</p>' 
           + '<p>' + "ethnicity: " + Demo_info.metadata[index].ethnicity + '</p>'
           + '<p>' + "gender: " + Demo_info.metadata[index].gender + '</p>'
           + '<p>' + "location: " + Demo_info.metadata[index].location + '</p>'
           + '<p>' + "bbtype: " + Demo_info.metadata[index].bbtype + '</p>'
           + '<p>' + "wfreq: " + Demo_info.metadata[index].wfreq + '</p>'];

        document.getElementById("sample-metadata").innerHTML = paragraphs;
    });

    d3.json(url).then(function(gauge_info){
        console.log(gauge_info.metadata[0]);

        for (let j = 0; j < 153; j++) {
            if (gauge_info.metadata[j].id == data_id) {
                index = j;
                console.log(index)
            }
    }
    gauge(gauge_info.metadata[index].wfreq);
    });
}

