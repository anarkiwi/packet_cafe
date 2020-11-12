import React from "react";
import { Segment } from "semantic-ui-react";
import Chart from "react-apexcharts";

const generateData = (baseval, count, yrange) => {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = Math.floor(Math.random() * (65000 - 1 + 1)) + 1;
    let y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    let z = Math.floor(Math.random() * (65000 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}

const options = {
  chart: {
    height: "auto",
    fontFamily: "Lato",
    redrawOnParentResize: true
  },
  theme: {
    mode: "light",
    monochrome: {
      enabled: true,
      color: "#00b5ad",
      shadeTo: "dark",
      shadeIntensity: 0.95
    }
  },
  dataLabels: {
    // set to true if you want to see total number of bytes
    enabled: false
  },
  annotations: {
    position: "back",
    xaxis: [
      {
        x: "0",
        xAxisIndex: 0,
        label: {
          offsetY: -10,
          offsetX: 10,
          show: true,
          borderColor: "transparent",
          position: "bottom",
          textAnchor: "start",
          orientation: "horizontal",
          text: "Privileged Ports (0-1023) ▶",
          style: {
            background: "#F5F5F5",
            fontSize: 16,
            fontWeight: 800
          }
        }
      },
      {
        x: "1024",
        xAxisIndex: 0,
        label: {
          offsetY: -10,
          offsetX: 10,
          show: true,
          borderColor: "transparent",
          position: "bottom",
          textAnchor: "start",
          orientation: "horizontal",
          text: "Registered Ports (1024-49151) ▶",
          style: {
            background: "#F5F5F5",
            fontSize: 16,
            fontWeight: 800
          }
        }
      },
      {
        x: "49152",
        xAxisIndex: 0,
        label: {
          offsetY: -10,
          offsetX: 10,
          show: true,
          borderColor: "transparent",
          position: "bottom",
          textAnchor: "start",
          orientation: "horizontal",
          text: "Private Ports (49152-65535) ▶",
          style: {
            background: "#F5F5F5",
            fontSize: 16,
            fontWeight: 800
          }
        }
      }
    ]
  },
  fill: {
    opacity: 0.7
  },
  title: {
    align: "center",
    text: "Port Listening Ranges (Multiple Devices)"
  },

  xaxis: {
    min: 0,
    max: 65535,
    logarithmic: true,
    title: {
      text: "Port Number",
      offsetX: 0,
      offsetY: 0
    }
  },
  yaxis: {
    // set shown to hide if you want to hide device confidence
    show: true,
    max: 100,
    labels: {
      formatter: (value) => value.toFixed(0) + "%"
    },
    title: {
      text: "Device Label Confidence ",
      offsetX: 7
    }
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center"
  }
};
const series = [
  {
    name: "Printer1",
    data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
      min: 0,
      max: 100
    })
  },
  {
    name: "Printer2",
    data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
      min: 0,
      max: 100
    })
  },
  {
    name: "PKIServer",
    data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
      min: 0,
      max: 100
    })
  },
  {
    name: "AdminController",
    data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
      min: 0,
      max: 100
    })
  }
];

const PortView = (props) => {
  return (
    <Segment
      piled
      style={{
        marginTop: "5em"
      }}
    >
      <div id="chart">
        <Chart
          options={options}
          series={series}
          type="bubble"
          height="450"
        />
      </div>
    </Segment>
  );
}

export default PortView;