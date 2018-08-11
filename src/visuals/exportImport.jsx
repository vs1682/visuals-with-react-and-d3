import React, { Component } from 'react';
import { chord, ribbon } from 'd3-chord';
import { arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import dataMatrix from '../datasets/exportsAndImports';
import ToolTip from '../components/tool-tip';

const width = 500;
const height = 500;
const outerRadius = 250;
const innerRadius = 0.95 * outerRadius;

const names = ['US', 'India', 'China', 'UK', 'Germany', 'France'];

const fill = scaleOrdinal()
  .domain([0, 1, 2, 3, 4, 5])
  .range(['#B22234', '#FFA500', '#D32910', '#012169', '#000000', '#0050A4']);

const chordData = chord().padAngle(0.01)(dataMatrix);
const ribbonData = ribbon().radius(innerRadius - 2);
const arcData = arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

class ExportImport extends Component {
  state = { selectedRibbon: null };

  onMouseOver = (e, ribbon) => {
    this.setState({ selectedRibbon: ribbon, cursorPosition: { x: e.clientX, y: e.clientY } });
  }

  onMouseLeave = () => {
    this.setState({ selectedRibbon: null });
  }

  getGradientId = (ribbon) => {
    return `linkGrad-${ribbon.source.index}${ribbon.target.index}`;
  }

  fillColor = (ribbon) => {
    const { selectedRibbon } = this.state;
    if (selectedRibbon === null) {
      return `url(#${this.getGradientId(ribbon)})`
    }

    if (
      selectedRibbon.source.index === ribbon.source.index &&
      selectedRibbon.target.index === ribbon.target.index
    ) {
      return `url(#${this.getGradientId(ribbon)})`
    }

    return '#EFEFEF';
  }

  getLinearGradients = () => {
    return (
      <defs>
        {
          chordData.map(chord => {
            const { source, target } = chord;
            const x1 = (innerRadius - 2) * Math.cos((source.endAngle - source.startAngle)/2 + source.startAngle - Math.PI/2);
            const y1 = (innerRadius - 2) * Math.sin((source.endAngle - source.startAngle)/2 + source.startAngle - Math.PI/2);
            const x2 = (innerRadius - 2) * Math.cos((target.endAngle - target.startAngle)/2 + target.startAngle - Math.PI/2);
            const y2 = (innerRadius - 2) * Math.sin((target.endAngle - target.startAngle)/2 + target.startAngle - Math.PI/2);
            return (
              <linearGradient
                key={this.getGradientId(chord)}
                id={this.getGradientId(chord)}
                gradientUnits="userSpaceOnUse"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              >
                <stop
                  offset="0%"
                  stopColor={fill(source.index)}
                />
                <stop
                  offset="100%"
                  stopColor={fill(target.index)}
                />
              </linearGradient>
            );
          })
        }
      </defs>
    )
  }

  render() {
    const { selectedRibbon, cursorPosition } = this.state;
    return (
      <svg width={width + 200} height={height + 200}>
        <g transform={`translate(${width/2 + 100}, ${height/2 + 100})`}>
          {this.getLinearGradients()}
          {
            chordData.groups.map((group, i) => {
              const { startAngle, endAngle } = group;
              const angle = startAngle + (endAngle - startAngle) / 2;
              const rotateAngle = angle / Math.PI * 180 - 90;
              return (
                <g key={names[i]}>
                  <path
                    fill={fill(i)}
                    d={arcData(group)}
                  />
                  <text
                    transform={`
                      rotate(${rotateAngle})
                      translate(${outerRadius + 10})
                      ${angle > Math.PI ? 'rotate(180)' : ''}
                    `}
                    textAnchor={angle > Math.PI ? 'end' : null}
                  >
                    {names[i]}
                  </text>
                </g>
              )
            })
          }
          {
            chordData.map((data, i) => {
              return (
                <path
                  key={i}
                  d={ribbonData(data)}
                  stroke={this.fillColor(data)}
                  fill={this.fillColor(data)}
                  opacity="0.7"
                  onMouseOver={(e) => this.onMouseOver(e, data)}
                  onMouseLeave={this.onMouseLeave}
                />
              )
            })
          }
        </g>
        {
          selectedRibbon && (
            <ToolTip
              cursorPosition={cursorPosition}
              value={dataMatrix[selectedRibbon.source.index][selectedRibbon.target.index]}
            >
            </ToolTip>
          )
        }
      </svg>
    );
  }
}

export default ExportImport;