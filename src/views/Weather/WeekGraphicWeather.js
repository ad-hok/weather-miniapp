import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from '@vx/axis';
import moment from 'moment';
import { getWeekWeather } from '../../api/Weather/weather';
import { getMaxDayTemp, getMaxWeekTemp, getMinWeekTemp } from '../../utilities'

class WeekGraphicWeather extends Component {
  constructor(){
    super();

    this.state = {
      chartData: null,
      width: 800,
      height: 300
    }
  }

  async componentDidMount(){
    try {
      let res = await getWeekWeather();
      this._getDays(res.data.list);

      const width = document.getElementById("chart").offsetWidth;
      this.setState({ width });
    } catch (e) {
      //manejar el error
    }
  }

  _getDays(list){
    const days = []
    const today = moment().format('YYYY-MM-DD');
    list.forEach( d => {
      const day = moment(d.dt_txt).format('YYYY-MM-DD');
      const i = moment(day).diff(today, 'days');
      if( !days[i] ) days[i] = [];
      days[i].push(d);
    });
    const chartData = days.map( d => {
      const avgTemp = getMaxDayTemp(d);
      const date = moment(d[0].dt_txt).format('YYYY-MM-DD');
      return {
        date,
        temp: avgTemp
      };
    });
    this.setState({
      chartData
    });
  }

  render() {
    const { chartData, height, width } = this.state;
    if(!chartData) return '';
    const minTemp = getMinWeekTemp(chartData);
    const maxTemp = getMaxWeekTemp(chartData);
    const minDate = new Date(chartData[0].date);
    const maxDate = new Date(minDate).setDate(minDate.getDate() + 6);
    const x = d => new Date(d.date);
    const y = d => parseFloat(d.temp);
    const xScale = scaleTime({
      range: [20, width-80],
      domain: [minDate, maxDate]
    });
    const yScale = scaleLinear({
      range: [height-50, 0],
      domain: [minTemp-2, maxTemp+2],
    });
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Graph</CardTitle>
        </CardHeader>
        <CardBody>
          <div id="chart">
            <svg width={width} height={height}>
              <rect x={80} y={10} width={width-100} height={height-50} fill="#EBEAEC" />
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
                  left={-30}
                  label={'Day'}
                  stroke={'#1b1a1e'}
                  tickTextFill={'#1b1a1e'}
                  numTicks={6}
                  tickFormat={(val, i) => moment(val).format('ddd')}
                />
                <LinePath
                  data={chartData}
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
    );
  }
}

export default WeekGraphicWeather;
