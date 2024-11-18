import React, { useState } from 'react';
import { Send, Plus, Route, BotMessageSquare } from 'lucide-react';
import AcademicTreeVisualization from './tree2.js';
import StudentSelectionForm from './student.js';

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

const BOARD_CONFIGS = {
  CBSE: {
    requiredSubjects: 5,
    maxSubjects: 5,
    arraySize: 5,
    subjectOrder: [
      'English', 
      'Hindi/Kannada', 
      'Mathematics', 
      'Science', 
      'Social Science'
    ]
  },
  ICSE: {
    requiredSubjects: 6,
    maxSubjects: 6,
    arraySize: 15,
    subjectOrder: [
      'English', 
      'Second Language', 
      'History civics', 
      'Geography', 
      'Mathematics', 
      'Physics', 
      'Chemistry', 
      'Biology', 
      'Economics', 
      'Commercial studies',
      'Computer Applications', 
      'Computer science', 
      'Economic Applications', 
      'Commercial applications', 
      'Home Science'
    ]
  },
  STATE: {
    requiredSubjects: 6,
    maxSubjects: 6,
    arraySize: 6,
    subjectOrder: [
      'FIRST LANGUAGE', 
      'SECOND LANGUAGE', 
      'THIRD LANGUAGE', 
      'MATHEMATICS', 
      'SCIENCE', 
      'SOCIAL SCIENCE'

      
    ]
  }
};

const ChatbotLanding = ({ onToggleTree }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showInfoCard, setShowInfoCard] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: '', age: '' });
  const [showExcelSheet, setShowExcelSheet] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);

  const validateScores = (scores, board) => {
    // Normalize board name
    const normalizedBoard = board.replace(/\bBOARD\b/gi, '').trim().toUpperCase();
    const config = BOARD_CONFIGS[normalizedBoard];
    
    if (!config) {
      console.error('Invalid board:', board, 'Normalized:', normalizedBoard);
      return false;
    }

    const filledScores = scores.filter(subject => subject.score !== '');
    return filledScores.length >= config.requiredSubjects;
  };

  const convertMarksToArray = (subjectData, board) => {
    // Normalize board name
    const normalizedBoard = board.replace(/\bBOARD\b/gi, '').trim().toUpperCase();
    const config = BOARD_CONFIGS[normalizedBoard];
    
    if (!config) {
      throw new Error(`Invalid board selected: ${board}`);
    }

    const marksArray = new Array(config.arraySize).fill(0);
    subjectData.forEach((subjectEntry) => {
      const orderIndex = config.subjectOrder.findIndex((s) => subjectEntry.subject.includes(s));
      if (orderIndex !== 0 && subjectEntry.score) {
        marksArray[orderIndex] = parseFloat(subjectEntry.score);
      }
    });

    return marksArray;
  };

  const sendDataToBackend = async () => {
    try {
      if (!studentData || !studentData.selectedBoard) {
        throw new Error('No board selected');
      }

      // Normalize board name
      const normalizedBoard = studentData.selectedBoard
        .replace(/\bBOARD\b/gi, '')
        .trim()
        .toLowerCase();

      // Debug logs
      console.log('Original board:', studentData.selectedBoard);
      console.log('Normalized board:', normalizedBoard);
      console.log('Available boards:', Object.keys(BOARD_CONFIGS));
      
      // Validate scores based on board requirements
      if (!validateScores(subjectData, studentData.selectedBoard)) {
        const config = BOARD_CONFIGS[normalizedBoard.toUpperCase()];
        if (!config) {
          throw new Error(`Invalid board selected: ${studentData.selectedBoard}`);
        }
        setMessages(prev => [...prev, 
          { text: `Please fill in at least ${config.requiredSubjects} subjects for ${normalizedBoard.toUpperCase()} board.`, sender: 'bot' }
        ]);
        return;
      }

      // Convert subject data to array format based on board
      const marksArray = convertMarksToArray(subjectData, studentData.selectedBoard);

      // Prepare the request body
      const requestBody = {
        marks: marksArray
      };

      console.log('Sending to backend:', requestBody); // For debugging
      console.log(`http://localhost:5000/predict/${normalizedBoard}`)
      // Then make the POST request
      const response = await fetch(`http://localhost:5000/predict/${normalizedBoard}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get prediction');
      }
  
      const result = await response.json();
      setPredictionResult(result);
      if(result){
      // Add prediction result to chat
      const resultMessage = `Based on your academic performance, here are your predicted course options:\n
      Recommended Course: ${result.predicted_course}\n
      Confidence: ${(Math.max(...result.probabilities[0]) * 100).toFixed(2)}%`;}

      setMessages(prev => [
        ...prev,
        { text: inputMessage, sender: 'user' },
        { text: "I'm here to help you with course predictions. Please provide your academic details using the + button.", sender: 'bot' }
      ]);
      setInputMessage('');

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, 
        { text: `Sorry, there was an error processing your results: ${error.message}`, sender: 'bot' }
      ]);
    }
  };
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userInfo.age) >= 16) {
      setShowStudentForm(true);
    } else {
      setMessages(prev => [...prev, 
        { text: 'Sorry, you must be at least 16 years old to use this service.', sender: 'bot' }
      ]);
      setShowInfoCard(false);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      
      // Add bot response if needed
      setMessages(prev => [...prev, 
        { text: "I'm here to help you with course predictions. Please provide your academic details using the + button.", sender: 'bot' }
      ]);
      
      setInputMessage('');
    }
  };

  const handleExcelSubmit = () => {
    // Check if all required scores are filled
    const board = studentData.selectedBoard.toUpperCase();
    const config = BOARD_CONFIGS[board];
    
    // Validate scores
    if (!validateScores(subjectData, board)) {
      setMessages(prev => [...prev, 
        { text: `Please fill in at least ${config.requiredSubjects} subjects for ${board} board.`, sender: 'bot' }
      ]);
      return;
    }

    // Check if scores are within valid range (0-100)
    const invalidScores = subjectData.filter(
      subject => subject.score !== '' && (parseFloat(subject.score) < 0 || parseFloat(subject.score) > 100)
    );

    if (invalidScores.length > 0) {
      setMessages(prev => [...prev, 
        { text: 'Please ensure all scores are between 0 and 100.', sender: 'bot' }
      ]);
      return;
    }
    
    sendDataToBackend();
    setShowExcelSheet(false);
  };

  const handleStudentFormSubmit = (data) => {
    setStudentData(data);
    // Normalize board name to uppercase and trim any whitespace
    const boardName = data.selectedBoard
      .replace(/\bBOARD\b/gi, '')  // Remove the word "BOARD" (case-insensitive)
      .trim()                      // Remove leading/trailing spaces
      .toUpperCase();
    
    // Add debugging console log
    console.log('Selected Board:', boardName);
    console.log('Available Boards:', Object.keys(BOARD_CONFIGS));
    
    const boardConfig = BOARD_CONFIGS[boardName];
    
    if (!boardConfig) {
      setMessages(prev => [...prev, 
        { text: `Invalid board selected: ${boardName}. Available boards are: ${Object.keys(BOARD_CONFIGS).join(', ')}`, sender: 'bot' }
      ]);
      return;
    }

    // Set subject data based on board configuration
    let subjects = [];
    if (data.subjects.compulsory) {
      subjects = [...data.subjects.compulsory];
    }
    
    if (data.subjects.electives) {
      Object.values(data.subjects.electives).forEach(electiveGroup => {
        if (Array.isArray(electiveGroup)) {
          subjects.push(...electiveGroup);
        }
      });
    }

    // Limit subjects based on board configuration
    const limitedSubjects = subjects.slice(0, boardConfig.maxSubjects);
    
    setSubjectData(limitedSubjects.map(subject => ({
      subject,
      score: ''
    })));

    setShowStudentForm(false);
    setShowInfoCard(false);
    setShowExcelSheet(true);
  };

  const handleExcelToggle = () => {
    setShowExcelSheet(!showExcelSheet);
  };

  const handleTreeToggle = () => {
    setShowTree(!showTree);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="absolute top-0 left-0 m-4">
        <svg width="291.33000793457035" height="21.85620578894537" viewBox="0 0 380.8247841337083 28.570296999498833" className="looka-1j8o68f">
          {/* ... SVG content ... */}
        </svg>
      </div>
      <Card className="w-full max-w-4xl h-[600px] p-6 shadow-xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleTreeToggle} className="p-2">
            <Route className="h-4 w-4 mr-2" />
            Goal Navigator
          </Button>
          {showTree && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <Card className="w-3/4 h-[600px] p-6 flex flex-col justify-center items-center overflow-auto">
                <AcademicTreeVisualization className="relative w-full" isVisible={showTree}/>
                <Button onClick={handleTreeToggle} className="h-[50px] w-[50px] m-2">Close</Button>
              </Card>
            </div>
          )}
          <div className="text-2xl font-bold flex flex-row items-center justify-between">
            <h1 className="pr-2">Chatbot</h1>
            <BotMessageSquare className="h-4 w-4"/>
          </div>
        </div>

        {showInfoCard && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <Card className="w-96 p-6">
              {!showStudentForm ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
                  <form onSubmit={handleInfoSubmit}>
                    <Input
                      className="mb-4"
                      placeholder="Name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                      required
                    />
                    <Input
                      className="mb-4"
                      placeholder="Age"
                      type="number"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full">Continue</Button>
                  </form>
                </>
              ) : (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Student Information</h2>
                  <StudentSelectionForm onSubmit={handleStudentFormSubmit} userinfon={userInfo.name} userinfoa={userInfo.age}/>
                </div>
              )}
            </Card>
          </div>
        )}

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-grow overflow-auto mb-4 mt-4 space-y-4 scrollbar-none">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-2 text-sm rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Button onClick={handleExcelToggle} className="p-2">
              <Plus className="h-4 w-4" />
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="p-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {showExcelSheet && studentData && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <Card className="min-w-0 min-h-0 p-6 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Student Performance Sheet</h2>
            <div className="mb-4 flex flex-col items-center justify-center p-2 gap-2">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Age:</strong> {userInfo.age}</p>
              <p><strong>Board:</strong> {studentData.selectedBoard}</p>
            </div>
            <table className="w-4/4 border-collapse flex items-center justify-center left-1/2">
              <div className="left-1/2">
                <thead>
                  <tr>
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectData.map((subject, index) => (
                    <tr key={index}>
                      <td className="border p-2 w-1/4">{subject.subject}</td>
                      <td className="border p-2 w-1/4">
                        <Input 
                          placeholder="Enter score"
                          type="number"
                          value={subject.score}
                          onChange={(e) => {
                            const newSubjectData = [...subjectData];
                            newSubjectData[index].score = e.target.value;
                            setSubjectData(newSubjectData);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </table>
            <div className="flex justify-between mt-4">
              <Button onClick={handleExcelToggle}>Close</Button>
              <Button onClick={handleExcelSubmit} className="bg-green-500 hover:bg-green-600">
                Submit Scores
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatbotLanding;