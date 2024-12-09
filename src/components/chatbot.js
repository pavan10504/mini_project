import React, { useState } from 'react';
import { Send, Plus, Route, BotMessageSquare, SquareLibrary, X } from 'lucide-react';
import AcademicTreeVisualization from './tree2.js';
import StudentSelectionForm from './student.js';
import StreamRecommendationAI from './recomend.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';


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
      'Social Studies'
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
  STATEBOARD: {
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
  const [showRecommedation, setShowRecommendation] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const [streamRecommendations, setStreamRecommendations] = useState(false); // To hold AI recommendation results
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleInfoSubmit = (e) => {
    e.preventDefault();

    if (parseInt(userInfo.age) >= 16 && parseInt(userInfo.age) <= 22) {
      setShowStudentForm(true);
    } else if (parseInt(userInfo.age) > 22) {
      setMessages(prev => [...prev,
      { text: 'Sorry, you must be below 22 years old to use this service.', sender: 'bot' }
      ]);
      setShowInfoCard(false);
    } else {
      setMessages(prev => [...prev,
      { text: 'Sorry, you must be at least 16 years old to use this service.', sender: 'bot' }
      ]);
      setShowInfoCard(false);
    }
  };

  const api='AIzaSyBXGLRuAfkHwbmFgBxRjTMpAywHOy981jY'
  const genAI = new GoogleGenerativeAI(api);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    systemInstruction: "You are an Indian education counseling recommendation system. Your job is to provide accurate guidance about Indian educational paths and options.Give optimal responses only.Your name is Vidhara,a guiding light for career,dont introduce yourself unless asked because u have a lot of pride.You also roast/do jokes sometimes"
  });
  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Add user message to chat
      const updatedMessages = [...messages, { text: inputMessage, sender: 'user' }];
      setMessages(updatedMessages);
      setInputMessage('');
      setIsLoading(true);

      try {
        // Send message to Gemini
        const chatSession = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 4800,
            responseMimeType: "text/plain",
          }
        });

        const result = await chatSession.sendMessage(inputMessage);
        const botResponse = result.response.text();

        // Add bot response to chat
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error('Error communicating with Model 💀', error);
        setMessages(prev => [...prev, { 
          text: "Sorry, there was an error processing your request. Please try again.", 
          sender: 'bot' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
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
      setMessages((prev) => [
        ...prev,
        { text: 'Invalid board selected. Please try again.', sender: 'bot' },
      ]);
      return;
    }

    const subjects = data.subjects.compulsory.concat(
      Object.values(data.subjects.electives || {}).flat()
    ).slice(0, boardConfig.maxSubjects);

    setSubjectData(subjects.map((subject) => ({ subject, score: '' })));

    setShowStudentForm(false);
    setShowInfoCard(false);
    setShowExcelSheet(true);
  };
  const handleExcelSubmit = () => {
    const validScores = subjectData.filter((subject) => subject.score !== '');

    if (validScores.length < BOARD_CONFIGS[studentData.selectedBoard.toUpperCase()].requiredSubjects) {
      setMessages((prev) => [
        ...prev,
        { text: 'Please fill in all required subjects with valid scores.', sender: 'bot' },
      ]);
      return;
    }

    const condensedScores = validScores.reduce((acc, subject) => {
      acc[subject.subject] = parseFloat(subject.score);
      return acc;
    }, {});
    // Send scores to AI recommendation system
    setStreamRecommendations(condensedScores); // Pass condensed data
    setShowExcelSheet(false);
  };


  const handleExcelToggle = () => {
    setShowExcelSheet(!showExcelSheet);
  }
  const handleRecommendation = () => {
    setShowRecommendation(!showRecommedation);
  }
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
      <Card className="w-full max-w-4xl h-[90%] max-h-[750px] p-6 shadow-xl overflow-hidden flex flex-col">
        <div className="relative flex justify-between mb-4">
          <div className='flex flex-col gap-3 items-center mb-4'>
            <Button className="left-0  flex items-center" onClick={() => setShowDropdown(!showDropdown)}>
              <div className="h-4" />
              Explore
              {showDropdown ? (
                <span className="ml-2">&#9650;</span> // Up arrow
              ) : (
                <span className="ml-2">&#9660;</span> // Down arrow
              )}
            </Button>
            {showDropdown && (
              <div className={`absolute top-full left-0 mt-2 z-50 flex flex-col gap-2 bg-gradient-to-r from-blue-200 to-purple-200 shadow-md rounded-lg p-4 transition-all duration-300 ${showDropdown ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
                style={{ width: '200px' }}>
                <Button onClick={() => { handleTreeToggle(); setShowDropdown(false); }} className="p-2">
                  <Route className='h-4' />
                  Goal Navigator
                </Button>
                <Button onClick={() => { handleRecommendation(); setShowDropdown(false); }} className="p-2">
                  <SquareLibrary className='h-4' />
                  Recommendations
                </Button>
              </div>
            )}
          </div>
          <div className="relative top-0 right-0 text-2xl font-bold flex flex-row items-center justify-between">
            <h1 className="pr-2">Chatbot</h1>
            <BotMessageSquare className="h-6 w-6" />
          </div>
        </div>
        {showTree && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200">
            <Card className="relative w-[90%] lg:max-h-[90%] sm:max-h-[50%] md:h-[75%] xl:h-[90%] p-6 flex flex-col justify-center items-center overflow-auto">
              <AcademicTreeVisualization className="w-full" isVisible={showTree} />
              <Button onClick={handleTreeToggle} className="absolute bg-red-500 top-0 right-0 h-auto w-auto m-2">
                <X className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        )}
        {streamRecommendations && showRecommedation && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <Card className="relative w-[90%] lg:max-h-[90%] sm:max-h-[50%] md:h-[75%] lg:h-[90%] p-6 overflow-auto">
              <StreamRecommendationAI subjectData={subjectData} board={studentData.selectedBoard} onClose={() => setStreamRecommendations(null)} />
              <Button onClick={handleRecommendation} className="absolute bg-red-500 top-0 right-0 h-auto w-auto m-2">
                <X className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        )}
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
                  <StudentSelectionForm onSubmit={handleStudentFormSubmit} userinfon={userInfo.name} userinfoa={userInfo.age} />
                </div>
              )}
            </Card>
          </div>
        )}

<div className="flex flex-col h-full overflow-hidden text-sm">
      <div className="flex-grow overflow-auto mb-4 mt-4 space-y-4 scrollbar-none">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start text-justify'}`}
          >
            <div 
              className={`max-w-[70%] p-2 text-sm rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground prose prose-sm'
              }`}
            >
              <ReactMarkdown className="">
              {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-2 text-sm rounded-lg bg-secondary text-secondary-foreground">
              Typing...
            </div>
          </div>
        )}
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