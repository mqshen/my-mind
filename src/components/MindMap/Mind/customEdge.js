import G6 from '@antv/g6'
// import uniqueId from 'lodash/uniqueId'

var colorMap = {
  '凭证开立': '#72CC4A',
  '凭证转让': '#1A91FF',
  '凭证融资': '#FFAA15'
};

const customEdge = {
  init() {
    G6.registerEdge('polyline', {
        itemType: 'edge',
        draw: function draw(cfg, group) {
          var startPoint = cfg.startPoint;
          var endPoint = cfg.endPoint;
          // var centerPoint = {
          //   x: (startPoint.x + endPoint.x) / 2,
          //   y: (startPoint.y + endPoint.y) / 2
          // };
    
          var Ydiff = endPoint.y - startPoint.y;
    
          var slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;
    
          var cpOffset = 16;
          var offset = Ydiff < 0 ? cpOffset : -cpOffset;
    
          var line1EndPoint = {
            x: startPoint.x + slope,
            y: endPoint.y + offset
          };
          var line2StartPoint = {
            x: line1EndPoint.x + cpOffset,
            y: endPoint.y
          };
    
          // 控制点坐标
          var controlPoint = {
            x: (line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y) / (line1EndPoint.y - startPoint.y) + startPoint.x,
            y: endPoint.y
          };
    
          var path = [['M', startPoint.x, startPoint.y], ['L', line1EndPoint.x, line1EndPoint.y], ['Q', controlPoint.x, controlPoint.y, line2StartPoint.x, line2StartPoint.y], ['L', endPoint.x, endPoint.y]];
    
          if (Ydiff === 0) {
            path = [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]];
          }
    
          var line = group.addShape('path', {
            attrs: {
              path: path,
              stroke: colorMap[cfg.data.type],
              lineWidth: 1.2,
              endArrow: false
            }
          });
    
          var labelLeftOffset = 8;
          var labelTopOffset = 8;
          // amount
          var amount = group.addShape('text', {
            attrs: {
              text: cfg.data.amount,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y - labelTopOffset - 2,
              fontSize: 14,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#000000D9'
            }
          });
          // type
          group.addShape('text', {
            attrs: {
              text: cfg.data.type,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y - labelTopOffset - amount.getBBox().height - 2,
              fontSize: 10,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#000000D9'
            }
          });
          // date
          group.addShape('text', {
            attrs: {
              text: cfg.data.date,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y + labelTopOffset + 4,
              fontSize: 12,
              fontWeight: 300,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#000000D9'
            }
          });
          return line;
        }
      });
  }
}

export default customEdge