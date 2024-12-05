import React, { useState, useRef, useEffect, useCallback,useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background 
        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
      file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
))
Card.displayName = "Card"

const StreamRecommendationAI = ({ subjectData, board }) => {
  const [recommendations, setRecommendations] = useState([]);
  const svgRef = useRef(null);

  const streamData = useMemo(()=>({
    "Stream": [
      "Science (PCMB)", "Science (PCMC)", "Commerce", "Arts",
      "Computer Science (Diploma)", "Electronics", "Electrical", "Mechanical", "Civil",
      "Electrician", "Fitter", "Turner", "Welder", "Machinist", "Plumber"
    ],
    "Maths_Weight": [
      0.5, 0.6, 0.4, 0.2,
      0.6, 0.5, 0.5, 0.4, 0.4,
      0.3, 0.3, 0.3, 0.3, 0.3, 0.2
    ],
    "Science_Weight": [
      0.6, 0.5, 0.2, 0.1,
      0.5, 0.6, 0.5, 0.5, 0.4,
      0.4, 0.4, 0.4, 0.4, 0.4, 0.3
    ],
    "Languages_Weight": [
      0.1, 0.1, 0.3, 0.45,
      0.1, 0.1, 0.2, 0.1, 0.2,
      0.2, 0.2, 0.2, 0.2, 0.2, 0.2
    ],
    "Social_Studies_Weight": [
      0.1, 0.1, 0.4, 0.5,
      0.1, 0.1, 0.1, 0.1, 0.3,
      0.2, 0.2, 0.2, 0.2, 0.2, 0.4
    ],}),[]);

  const BOARD_CATEGORIES = useMemo(
    () => ({
      ICSE: {
        Science: ["Physics", "Chemistry", "Biology"],
        Languages: ["English", "Second Language"],
        Social_Studies: ["History civics", "Geography"],
        Mathematics: ["Mathematics"],
      },
      CBSE: {
        Science: ["Science"],
        Languages: ["English", "Hindi/Kannada"],
        Social_Studies: ["Social Studies"],
        Mathematics: ["Mathematics"],
      },
      STATEBOARD: {
        Science: ["Science"],
        Languages: ["FIRST LANGUAGE", "SECOND LANGUAGE", "THIRD LANGUAGE"],
        Social_Studies: ["SOCIAL SCIENCE"],
        Mathematics: ["MATHEMATICS"],
      },
    }),
    []
  );

  const streams = [
    { name: "Science (PCMB)", category: "PUC", y: 100 },
    { name: "Science (PCMC)", category: "PUC", y: 150 },
    { name: "Commerce", category: "PUC", y: 200 },
    { name: "Arts", category: "PUC", y: 250 },
    { name: "Mechanical", category: "Diploma", y: 300 },
    { name: "Civil", category: "Diploma", y: 350 },
    { name: "Electrical", category: "Diploma", y: 400 },
    { name: "Computer Science", category: "Diploma", y: 450 },
    { name: "Electronics", category: "Diploma", y: 500 },
    { name: "Fitter", category: "ITI", y: 550 },
    { name: "Electrician", category: "ITI", y: 600 },
    { name: "Turner", category: "ITI", y: 650 },
    { name: "Welder", category: "ITI", y: 700 },
    { name: "Machinist", category: "ITI", y: 750 },
    { name: "Plumber", category: "ITI", y: 800 }
  ];

  const prepareSubjectMarks = useCallback(() => {
    const config = BOARD_CATEGORIES[board?.toUpperCase()];
    if (!config) {
      console.error("Invalid board selected:", board);
      return null;
    }

    const normalize = (str) => str.trim().toLowerCase();

    const getAverageScore = (subjects) => {
      const matchingSubjects = subjects
        .map((subject) =>
          subjectData.find((data) =>
            normalize(data.subject).includes(normalize(subject))
          )
        )
        .filter(Boolean);

      if (matchingSubjects.length === 0) return 0;

      return (
        matchingSubjects.reduce((sum, subject) => sum + subject.score, 0) /
        matchingSubjects.length
      );
    };

    return [
      getAverageScore(config.Mathematics),
      getAverageScore(config.Science),
      getAverageScore(config.Languages),
      getAverageScore(config.Social_Studies),
    ];
  }, [BOARD_CATEGORIES, board, subjectData]);

  
  

  const streamGroups = useMemo(
    () => ({
      PUC: streamData.Stream.slice(0, 4),
      Diploma: streamData.Stream.slice(4, 9),
      ITI: streamData.Stream.slice(9),
    }),
    [streamData.Stream]
  );


  const prioritizeStreamsWithinGroup = useCallback(
    (studentMarks, group) => {
      const subjectStrengths = studentMarks
        .map((mark, index) => ({ mark, index }))
        .sort((a, b) => b.mark - a.mark);

      const priorityBoost = [1.2, 1.1, 1.05, 1.0];

      return group
        .map((stream, idx) => {
          const subjectWeights = [
            streamData.Maths_Weight[idx] * (subjectStrengths[0].index === 0 ? priorityBoost[0] : 1),
            streamData.Science_Weight[idx] * (subjectStrengths[1].index === 1 ? priorityBoost[1] : 1),
            streamData.Languages_Weight[idx] * (subjectStrengths[2].index === 2 ? priorityBoost[2] : 1),
            streamData.Social_Studies_Weight[idx] * (subjectStrengths[3].index === 3 ? priorityBoost[3] : 1),
          ];

          const fitScore = subjectWeights.reduce(
            (sum, weight, i) => sum + studentMarks[i] * weight,
            0
          );
          return { stream, fitScore };
        })
        .sort((a, b) => b.fitScore - a.fitScore);
    },
    [streamData]
  );const recommendStreams = useCallback(() => {
    const studentMarks = prepareSubjectMarks();
    if (!studentMarks) return;

    const avgMarks = studentMarks.reduce((a, b) => a + b, 0) / studentMarks.length;
    console.log(studentMarks);
    let eligibleGroup;
    if (avgMarks >= 65) {
      eligibleGroup = streamGroups.PUC;
    } else if (avgMarks >= 45) {
      eligibleGroup = streamGroups.Diploma;
    } else {
      eligibleGroup = streamGroups.ITI;
    }

    const recommendations = prioritizeStreamsWithinGroup(studentMarks, eligibleGroup);
    setRecommendations(recommendations.slice(0, 5));
  }, [prepareSubjectMarks, streamGroups, prioritizeStreamsWithinGroup]);

  useEffect(() => {
    if (subjectData && subjectData.length > 0 && board) {
      recommendStreams();
    }
  }, [subjectData, board, recommendStreams]);

  const generateCurvyBracePath = (startX, startY, endX, endY) => {
    // Create a more curly brace-like path
    const midX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - Math.abs(startY - endY) * 0.5;

    return `
      M${startX},${startY}
      Q${midX},${controlY} ${endX},${endY}
    `;
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center">
      <div className="w-full  bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">
          Stream Navigator
        </h1>

        <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
          <svg ref={svgRef} viewBox="0 0 1600 1000" className="w-full left-0 top-0 h-full">
            <motion.g
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 100, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >

              {/* Student */}
              <circle cx="100" cy="200" r="40" fill="#3B82F6" />
              <path
                d="M100,240 L100,400 L60,500 M100,400 L140,500"
                stroke="#3B82F6"
                strokeWidth="15"
                fill="none"
              />
              <circle 
                cx="150" 
                cy="350" 
                r="10" 
                fill="#FF6B6B" 
                style={{ opacity: 0.5 }}
              />
            </motion.g>

            <AnimatePresence>
              {recommendations.map((recommendation, index) => {
                const targetStream = streams.find(
                  (s) => s.name === recommendation.stream
                );

                if (!targetStream) return null;

                return (
                  <motion.path
                    key={recommendation.stream}
                    initial={{pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ x:1100,pathLength: 0, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.3,
                      type: "spring",
                    }}
                    d={generateCurvyBracePath(
                      250,
                      350,
                      1100,
                      targetStream.y
                    )}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}
            </AnimatePresence>

            {streams.map((stream) => (
              <motion.g key={stream.name}>
                <circle cx="1100" cy={stream.y} r="15" fill="#10B981" />
                <text x="1130" y={stream.y + 5} fill="#000" fontSize="12">
                  {stream.name} ({stream.category})
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {recommendations.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.3 }}
                className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-md"
              >
                <p className="text-xl font-bold text-green-800 mb-2">
                  {rec.stream}
                </p>
                <p className="text-green-600">
                  Recommendation Score: {rec.fitScore.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamRecommendationAI;