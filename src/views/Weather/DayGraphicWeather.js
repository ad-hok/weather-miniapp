import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from '@vx/axis';
import moment from 'moment';

import { getMaxDayTemp, getMinDayTemp } from '../../utilities'

class DayGraphicWeather extends Component {
  constructor(){
    super();

    this.state = {
      width: 600,
      height: 300
    }
  }

  componentDidMount(){
    try {
      const width = document.getElementById("chart").offsetWidth;
      this.setState({ width });
    } catch (e) {
      //manejar el error
    }
  }

  render() {
    const { day } = this.props;
    const { height, width } = this.state;
    if(!day || !day.length) return '';
    const x = d => new Date(d.dt_txt);
    const y = d => parseFloat(d.main.temp);
    const minTemp = getMinDayTemp(day);
    const maxTemp = getMaxDayTemp(day);
    const minDate = new Date(day[0].dt_txt);
    const maxDate = new Date(minDate).setDate(minDate.getDate() + 1);
    const xScale = scaleTime({
      range: [0, width-80],
      domain: [minDate, maxDate]
    });
    const yScale = scaleLinear({
      range: [height-50, 0],
      domain: [minTemp-2, maxTemp+2],
    });
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              Hourly Graphic
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div id="chart">
              <svg width={width} height={height}>
                <rect x={80} y={10} width={width-80} height={height-50} fill="#EBEAEC" />
                <defs>
                  <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000" />
                    <stop offset="100%" stopColor="#000" />
                  </linearGradient>
                </defs>
                <Group top="10" left="80">
                  <AxisLeft
                    scale={yScale}
                    top={0}
                    label={'Temp ºC'}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                  />
                  <AxisBottom
                    scale={xScale}
                    top={height-50}
                    left={0}
                    label={'Hour'}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                    numTicks={6}
                    tickFormat={(val, i) => moment(val).format('HH:mm')}
                  />
                  <LinePath
                    data={day}
                    x={x}
                    y={y}
                    xScale={xScale}
                    yScale={yScale}
                    strokeWidth={3}
                    stroke="#000"
                    strokeLinecap="round"
                  />
                </Group>
              </svg>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DayGraphicWeather;
