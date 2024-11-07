import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
                        { name: 'Electronics and Communication Engineering'},
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
                    { name: 'B.Arch' },
                    { name: 'B.Plan' },
                    { name: 'BCA' }
                  ]
                },
                { 
                  name: 'Science and Allied Education',
                  children: [
                    { name: 'B.Sc.' },
                    { name: 'B.Stat' },
                    { name: 'B.Math' }
                  ]
                }
              ] 
            },
            { 
              name: 'PCMC', 
              children: [
                { 
                  name: 'Engineering Education',
                  children: [
                    { 
                      name: 'B.Tech/B.E',
                      children: [
                        { name: 'Mechanical Engineering' },
                        { name: 'Civil Engineering' },
                        { name: 'Electrical Engineering' },
                        { name: 'Computer Science Engineering' },
                        { name: 'Electronics and Communication Engineering' },
                        { name: 'Information Technology Engineering' },
                        { name: 'Electronics and Instrumentation Engineering' },
                        { name: 'Mechatronics Engineering' },
                        { name: 'Artificial Intelligence and Machine Learning' },
                        { name: 'Robotics Engineering' },
                        { name: 'Automation Engineering' },
                        { name: 'Software Engineering' },
                        { name: 'Aerospace Engineering' },
                        { name: 'Biotechnology Engineering' },
                        { name: 'Chemical Engineering' },
                        { name: 'Environmental Engineering' },
                        { name: 'Data Science Engineering' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
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
        }
      ]
    },
    { name: 'Diploma' },
    { name: 'ITI' }
  ]
};

const PAGE_SIZE = 9;

const AcademicNodeCard = ({ node, onClick }) => (
  <div
    className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100"
    onClick={() => onClick(node)}
  >
    <h2 className="font-medium text-base">{node.name}</h2>
    {node.children?.length > 0 && (
      <p className="text-gray-500 text-base">
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
    if (node.children?.length > 0) {
      setNodeHistory([...nodeHistory, node]);
      setCurrentNode(node);
      setCurrentPage(0);
    }
  };

  const handleGoBack = () => {
    if (nodeHistory.length > 1) {
      const newHistory = nodeHistory.slice(0, -1);
      setNodeHistory(newHistory);
      setCurrentNode(newHistory[newHistory.length - 1]);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">{currentNode.name}</h1>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-24 flex justify-start">
            {(nodeHistory.length > 1 || currentPage > 0) && (
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={currentPage > 0 ? handlePreviousPage : handleGoBack}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-1">{currentPage > 0 ? "Previous" : "Back"}</span>
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getPagedChildren().map((child, index) => (
                <AcademicNodeCard 
                  key={`${child.name}-${index}`} 
                  node={child} 
                  onClick={handleNodeClick} 
                />
              ))}
            </div>
          </div>

          <div className="w-24 flex justify-end">
            {currentNode.children?.length > PAGE_SIZE * (currentPage + 1) && (
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={handleNextPage}
              >
                <span className="mr-1">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicTreeVisualization;