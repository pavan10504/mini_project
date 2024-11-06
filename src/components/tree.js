import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Tree data structure representing the Indian academic system
const treeData = {
  name: '10th',
  children: [
    {
      name: 'PUC',
      children: [
        {
          name: 'Science',
          children: [
        { 
          name: 'PCMB', 
          children: [
            {
            },
            { 
              
            },
            { 
              
            },
          ] 
        },
        { name: 'PCMC', children: [{ name: 'Engineering Education',
          children:[
          { 
            
          }     
          ]
         },
         { 
          }
        ] },
         { name: 'PCME', children: [{ name: 'Engineering Education',
          children:[
          { 
            
          }     
          ]
         },
         { name: 'Information Technology (IT) Education',
          children:[
            {
          }
        ] },
    
  ]
}]},{
  name: 'Commerce',
  children: [
    { name: 'B.Com' }, 
    { name: 'CA' }, 
    { name: 'BBA' }
  ]
},
{
  name: 'Arts',
  children: [
    { name: 'BA' }, 
    { name: 'BFA' }, 
    { name: 'BHM' }
  ]
}]},{name: 'Diploma'},{name: 'ITI'}]};

const TreeVisualization = ({ isVisible }, props) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Helper function to update dimensions based on container size
  const updateDimensions = () => {
    if (svgRef.current) {
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    // Set initial dimensions
    updateDimensions();
    
    // Listen to window resize and update dimensions
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (isVisible && svgRef.current && dimensions.width && dimensions.height) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear previous render

      const margin = { top: 20, right: 90, bottom: 30, left: 90 };
      const width = dimensions.width - margin.left - margin.right;
      const height = dimensions.height - margin.top - margin.bottom;

      svg.attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const treeLayout = d3.tree().size([height, width]);

      // Prepare the root node and set initial positions
      const root = d3.hierarchy(treeData);
      root.x0 = height / 2;
      root.y0 = 0;
      root.children.forEach(collapse); // Collapse the children of the root node

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      update(root);

      function update(source) {
        const duration = 750;
        const treeData = treeLayout(root);

        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        nodes.forEach(d => { d.y = d.depth * 180; });
        let i = 0;

        const node = g.selectAll('.node').data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr('transform', d => `translate(${source.y0},${source.x0})`)
          .on('click', (event, d) => {
            if (d.children) {
              d._children = d.children;
              d.children = null;
            } else {
              d.children = d._children;
              d._children = null;
            }
            update(d);
          });

        nodeEnter.append('circle')
          .attr('r', 1e-6)
          .style('fill', d => (d._children ? '#fd0' : '#0df'))
          .style('cursor', 'pointer'); // Make cursor a pointer on hover

        nodeEnter.append('text')
          .attr('dy', d => (d.children || d._children ? '-1.5rem': '.35em'))
          .attr('x', d => (d.children || d._children ? -13 : 13))
          .attr('text-anchor', d => (d.children || d._children ? 'middle' : 'start'))
          .text(d => d.data.name)
          .style('cursor', 'pointer') // Pointer for text as well
          .attr('fill', 'currentColor');

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
          .duration(duration)
          .attr('transform', d => `translate(${d.y},${d.x})`);

        nodeUpdate.select('circle')
          .attr('r', 10)
          .style('fill', d => (d._children ? '#f4b9fa' : '#87d0f5'));

        const nodeExit = node.exit().transition()
          .duration(duration)
          .attr('transform', d => `translate(${source.y},${source.x})`)
          .remove();

        nodeExit.select('circle')
          .attr('r', 1e-6);

        nodeExit.select('text')
          .style('fill-opacity', 1e-6);

        const link = g.selectAll('.link').data(links, d => d.id);

        const linkEnter = link.enter().insert('path', 'g')
          .attr('class', 'link')
          .attr('d', d => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
          })
          .attr('fill', 'none')
          .attr('stroke', '#ccc')
          .attr('stroke-width', 2);

        const linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
          .duration(duration)
          .attr('d', d => diagonal(d, d.parent));

        link.exit().transition()
          .duration(duration)
          .attr('d', d => {
            const o = { x: source.x, y: source.y };
            return diagonal(o, o);
          })
          .remove();

        nodes.forEach(d => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
        const zoom = d3.zoom()
        .scaleExtent([0.005, 3])  // Adjust zoom scale limits as necessary
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      // Function to calculate the bounding box and adjust zoom to fit tree
      function fitToScreen(nodes) {
        const bounds = {
          left: d3.min(nodes, d => d.y)-50,
          right: d3.max(nodes, d => d.y),
          top: d3.min(nodes, d => d.x)-50,
          bottom: d3.max(nodes, d => d.x),
        };

        const fullWidth = bounds.right - bounds.left+100;
        const fullHeight = bounds.bottom - bounds.top+100;

        const scale = Math.min(width / fullWidth, height / fullHeight);

        const translateX = width / 2 - (bounds.left + fullWidth / 2) * scale;
        const translateY = height / 2 - (bounds.top + fullHeight / 2) * scale;

        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity.translate(translateX, translateY).scale(scale)
        );
      }

        // Automatically adjust zoom to fit the tree in the screen
        fitToScreen(nodes);
      }

      function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
      }

      // Zoom and Pan functionality
      
    }
  }, [isVisible, dimensions]);

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />;
};

export default TreeVisualization;
