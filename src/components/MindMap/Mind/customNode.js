import G6 from '@antv/g6'
// import uniqueId from 'lodash/uniqueId'
// import { Canvas } from '@antv/g-canvas';

const customNode = {
  init() {
    G6.registerNode('round-rect', {
      drawShape: function drawShape(cfg, group) {
        console.log("ssss")
        var width = cfg.style.width;
        var stroke = cfg.style.stroke;
        var rect = group.addShape('rect', {
          attrs: {
            x: -width / 2,
            y: -15,
            width: width,
            height: 30,
            radius: 15,
            stroke: stroke,
            lineWidth: 1.2,
            fillOpacity: 1
          }
        });
        group.addShape('circle', {
          attrs: {
            x: -width / 2,
            y: 0,
            r: 3,
            fill: stroke
          }
        });
        group.addShape('circle', {
          attrs: {
            x: width / 2,
            y: 0,
            r: 3,
            fill: stroke
          }
        });
        return rect;
      },
      getAnchorPoints: function getAnchorPoints() {
        return [[0, 0.5], [1, 0.5]];
      },
      update: function update(cfg, item) {
        var group = item.getContainer();
        var children = group.get('children');
        var node = children[0];
        var circleLeft = children[1];
        var circleRight = children[2];
  
        var stroke = cfg.style.stroke;
        // labelStyle = cfg.labelStyle;
  
  
        if (stroke) {
          node.attr('stroke', stroke);
          circleLeft.attr('fill', stroke);
          circleRight.attr('fill', stroke);
        }
      }
    }, 'single-shape');
  }
}

export default customNode
