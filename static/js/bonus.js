// function for generating gauge chart for washing frequency each week
function gauge(wfreq_data){
    var data = [
        {
          type: "indicator",
          domain: { x: [0, 1], y: [0, 1] },
          marker: {size: 28, color:"850000"},
          showlegend:false,
          value: wfreq_data,
          title: { text: "Belly Button Washing Frequency for each week" },
          
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 2], color:'rgba(210, 206, 145, .5)'},
              { range: [2,4], color: 'rgba(202, 209, 95, .5)'},
              { range: [4,6], color: 'rgba(170, 202, 42, .5)'},
              { range: [6,8], color: 'rgba(110, 154, 22, .5)'},
              { range: [8,10], color: 'rgba(14, 127, 0, .5)'}
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}