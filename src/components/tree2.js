import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CollapsibleTree from 'react-collapsible-tree';

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
                name: 'Medicine Education',
                children: [
                  { name: 'MBBS' },
                  { name: 'BDS' },
                  { name: 'BAMS'},
                  { name: 'BHMS'},
                  { name: 'BUMS'},
                  { name: 'B.V.Sc'},
                  { name: 'B.P.T'},
                  { name: 'B.O.T'},
                  { name: 'B.Pharm' },
                  { name: 'B.Sc. Nursing' },
                  { name: 'B.Sc. Radiology and Imaging Technology'},
                  { name: 'B.Sc. Medical Lab Technology'},
                  { name: 'B.Sc. Optometry'},
                  { name: 'B.Sc. Nutrition and Dietetics'},
                  { name: 'B.Sc. Forensic Science'},
                  { name: 'B.Sc. Cardiovascular Technology'},
                  { name: 'B.Sc. Anaesthesia Technology'}
                ] 
              },
              { 
                name: 'Engineering & Technology',
                children: [
                  { 
                    name: 'B.Tech/BE',
                    children: [
                      { name: 'Mechanical Engineering' },
                      { name: 'Electrical Engineering' },
                      { name: 'Civil Engineering' },
                      { name: 'Computer Science Engineering' },
                      { name: 'Artificial Intelligence and Machine Learning'},
                      { name: 'Information Technology' },
                      { nmae: 'Electronics and Communication Engineering'},
                      { name: 'Biotechnology Engineering' },
                      { name: 'Chemical Engineering' },
                      { name: 'Aerospace Engineering' },
                      { name: 'Environmental Engineering' },
                      { name: 'Mechatronics Engineering' },
                      { name: 'Marine Engineering' },
                      { name: 'Petroleum Engineering' },
                      { name: 'Robotics and Automation' },
                      { name: 'Nanotechnology Engineering' }
                    ] 
                  },
                    {name:'B.Arch'},
                    {name:'B.Plan'},
                    {nmae:'BCA'}
                ]
              },
              { 
                name: 'Science and Allied Education' ,
                children:[
                  { name:'B.Sc.'},
                  { name:'B.Stat '},
                  { name:'B.Math'}
                ]
              },
            ] 
          },
          { name: 'PCMC', children: [{ name: 'Engineering Education',
            children:[
            { 
              name:'B.Tech/B.E',
              children:[
                {name:'Mechanical Engineering'},
                {name:'Civil Engineering'},
                {name:'Electrical Engineering'},
                {name:'Computer Science Engineering'},
                {name:'Electronics and Communication Engineering'},
                {name:'Information Technology Engineering'},
                {name:'Electronics and Instrumentation Engineering'},
                {name:'Mechatronics Engineering'},
                {name:'Artificial Intelligence and Machine Learning'},
                {name:'Robotics Engineering'},
                {name:'Automation Engineering'},
                {name:'Software Engineering'},
                {name:'Aerospace Engineering'},
                {name:'Biotechnology Engineering'},
                {name:'Chemical Engineering'},
                {name:'Environmental Engineering'},
                {name:'Data Science Engineering'}
              ]
            }     
            ]
           },
           { name: 'Information Technology (IT) Education',
            children:[
              {name:'BCA ',
                children:[{
                name:'B.Sc',
                children:[
                  {name:'Computer Science'},
                  {name:'Information Technology'},
                  {name:'Data Science'},
                  {name:'Software Engineering'},
                  {name:'Cybersecurity'}
                ]
              }
            ]}]
            }
          ] },
           { name: 'PCME', children: [{ name: 'Engineering Education',
            children:[
            { 
              name:'B.Tech/B.E',
              children:[
                {name:'Mechanical Engineering'},
                {name:'Civil Engineering'},
                {name:'Electrical Engineering'},
                {name:'Computer Science Engineering'},
                {name:'Electronics and Communication Engineering'},
                {name:'Information Technology Engineering'},
                {name:'Electronics and Instrumentation Engineering'},
                {name:'Mechatronics Engineering'},
                {name:'Artificial Intelligence and Machine Learning'},
                {name:'Robotics Engineering'},
                {name:'Automation Engineering'},
                {name:'Software Engineering'},
                {name:'Aerospace Engineering'},
                {name:'Biotechnology Engineering'},
                {name:'Chemical Engineering'},
                {name:'Environmental Engineering'},
                {name:'Data Science Engineering'}
              ]
            }     
            ]
           },
           { name: 'Information Technology (IT) Education',
            children:[
              {name:'BCA ',children:[{
                name:'B.Sc',
                children:[
                  {name:'Computer Science'},
                  {name:'Information Technology'},
                  {name:'Data Science'},
                  {name:'Software Engineering'},
                  {name:'Cybersecurity'}
                ]
              }
            ]
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
  }]},{name: 'Diploma'},{name: 'ITI'}]
};


const PAGE_SIZE = 9;

const AcademicNodeCard = ({ node, onClick }) => (
    <div
      className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(node)}
    >
      <h2 className="font-medium  text-base">{node.name}</h2>
      {node.children?.length > 0 && (
        <p className="text-gray-500  text-base">
          ({node.children.length} options)
        </p>
      )}
    </div>
  );
  
  const AcademicTreeVisualization = () => {
    const [currentNode, setCurrentNode] = useState(treeData);
    const [nodeHistory, setNodeHistory] = useState([treeData]);
    const [currentPage, setCurrentPage] = useState(0);
  
    const handleNodeClick = (node) => {
      setNodeHistory([...nodeHistory, node]);
      setCurrentNode(node);
      setCurrentPage(0);
    };
  
    const handleGoBack = () => {
      if (nodeHistory.length > 1) {
        setNodeHistory(nodeHistory.slice(0, -1));
        setCurrentNode(nodeHistory[nodeHistory.length - 2]);
        setCurrentPage(0);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      const childrenCount = currentNode.children?.length || 0;
      const pageCount = Math.ceil(childrenCount / PAGE_SIZE);
      if (currentPage < pageCount - 1) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const getPagedChildren = () => {
      const startIndex = currentPage * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      return currentNode.children?.slice(startIndex, endIndex) || [];
    };
  
    return (
        <div className="flex flex-col items-center justify-center h-full px-4 sm:px-0">
  <div className="flex justify-center w-full mb-4 p-2">
    <h1 className="text-2xl font-bold text-center">{currentNode.name}</h1>
  </div>

  <div className="flex items-center justify-center w-full max-w-4xl gap-6">
    {/* First column: Back or Previous button */}
    <div className="flex items-center justify-center w-1/12 mr-2">
      {(nodeHistory.length > 1 || currentPage > 0) && (
        <button
          className="flex items-center text-black-500 hover:text-gray-500 focus:outline-none"
          onClick={currentPage > 0 ? handlePreviousPage : handleGoBack}
        >
          <ChevronLeft className="mr-2" />
          {currentPage > 0 ? "Previous" : "Back"}
        </button>
      )}
    </div>

    {/* Second column: Grid of child nodes */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {getPagedChildren().map((child, index) => (
        <AcademicNodeCard key={index} node={child} onClick={handleNodeClick} />
      ))}
    </div>

    {/* Third column: Next button */}
    <div className="flex items-center justify-center w-1/12">
      {currentNode.children?.length > PAGE_SIZE * (currentPage + 1) && (
        <button
          className="flex items-center text-black-500 hover:text-gray-500 focus:outline-none"
          onClick={handleNextPage}
        >
          Next
          <ChevronRight className="ml-2" />
        </button>
      )}
    </div>
  </div>
</div>

  )};
  
  
  export default AcademicTreeVisualization;