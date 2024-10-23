import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Tree data structure representing the Indian academic system
const treeData = {
  name: '10th',
  children: [
    {
      name: 'Science',
      children: [
        { name: 'PCMB', children: [{ name: 'MBBS' }, { name: 'Engineering' }] },
        { name: 'PCMC', children: [{ name: 'Engineering' }, { name: 'BCA' }] },
        { name: 'PCME', children: [{ name: 'Engineering' }] },
      ]
    },
    {
      name: 'Commerce',
      children: [{ name: 'B.Com' }, { name: 'CA' }, { name: 'BBA' }]
    },
    {
      name: 'Arts',
      children: [{ name: 'BA' }, { name: 'BFA' }, { name: 'BHM' }]
    }
  ]
};

const TreeVisualization = ({ isVisible },props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (isVisible && svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear previous render

      const width = 800;
      const height =600;
      const margin = { top: 20, right: 90, bottom: 30, left: 90 };
      svg.attr('viewBox', `0 0 ${width} ${height}`)
           .attr('preserveAspectRatio', 'xMidYMid meet');

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

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
          .attr('dy', '.35em')
          .attr('x', d => (d.children || d._children ? -13 : 13))
          .attr('text-anchor', d => (d.children || d._children ? 'end' : 'start'))
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
      }

      function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
      }

      
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
      <svg ref={svgRef} className='h-full w-full' {...props}></svg>
  );
};

export default TreeVisualization;
