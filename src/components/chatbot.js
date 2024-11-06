import React, { useState } from 'react';
import { Send, Plus, Route,BotMessageSquare} from 'lucide-react';
import TreeVisualization from './tree.js';
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

  const getSubjectsForBoard = (board) => {
    switch(board) {
      case 'ICSE':
        return ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'];
      case 'CBSE':
        return ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'];
      case 'State Board':
        return ['Physics', 'Chemistry', 'Mathematics', 'Language', 'Social Studies'];
      case 'Engineering':
        return ['Calculus', 'Programming', 'Electronics', 'Mechanics', 'Digital Systems'];
      default:
        return [];
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      // Mock bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'This is a mock response.', sender: 'bot' }]);
      }, 1000);
      setInputMessage('');
    }
  };
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userInfo.age) >= 16) {
      setShowStudentForm(true);
    } else {
      setShowInfoCard(false);
    }
  };
  const handleStudentFormSubmit = (data) => {
    setStudentData(data);
    const subjects = getSubjectsForBoard(data.selectedBoard);
    setSubjectData(subjects.map(subject => ({
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
      <svg width="291.33000793457035" height="21.85620578894537" viewBox="0 0 380.8247841337083 28.570296999498833" class="looka-1j8o68f"><defs id="SvgjsDefs5247"></defs><g id="SvgjsG5248" featurekey="nameLeftFeature-0" transform="matrix(0.5516992342508144,0,0,0.5516992342508144,0.2693601892200865,0.5886872545826014)" fill="#000000"><path d="M5.4102 40.39063 q-2.4609375 0 -4.19921875 -1.73828125 q-1.69921875 -1.69921875 -1.69921875 -4.08203125 l0 -16.484 q0 -2.3828125 1.71875 -4.1015625 t4.1797 -1.7188 l11.582 0 q2.48046875 0 4.19921875 1.7578125 q1.69921875 1.6796875 1.69921875 4.0625 l0 2.4609 l-5.6055 0 l0 -2.4609 q0 -0.1953125 -0.1171875 -0.29296875 q-0.09765625 -0.09765625 -0.17578125 -0.09765625 l-11.582 0 q-0.078125 0 -0.1953125 0.1171875 q-0.078125 0.078125 -0.078125 0.2734375 l0 16.484 q0 0.21484375 0.09765625 0.33203125 q0.078125 0.05859375 0.17578125 0.05859375 l11.582 0 q0.09765625 0 0.17578125 -0.078125 q0.1171875 -0.1171875 0.1171875 -0.3125 l0 -2.4219 l5.6055 0 l0 2.4219 q0 2.3828125 -1.69921875 4.08203125 q-1.71875 1.73828125 -4.19921875 1.73828125 l-11.582 0 z M73.17419140625 40.39063 l-6.2305 0 l-1.875 -3.8672 l-5.4688 0 l0 -5.4297 l2.8125 0 l-4.0039 -8.2227 l-8.5547 17.52 l-6.2305 0 l14.785 -28.77 z M93.7900403125 12.245999999999999 l5.6445 0 l0 28.145 l-5.6445 0 l0 -28.145 z M118.2433203125 36.8359 l-7.1484 0 l-10.723 -13.281 l6.7969 0 q2.87109375 -0.078125 3.828125 -1.015625 q0.56640625 -0.546875 0.56640625 -1.71875 q0 -1.71875 -0.78125 -2.44140625 q-0.72265625 -0.703125 -1.9921875 -0.703125 l-0.11719 0 l-5.8398 0 l0 -5.4297 l5.7617 0 q3.6328125 -0.1171875 6.1328125 2.24609375 q2.4609375 2.32421875 2.4609375 6.328125 q0 3.37890625 -2.1875 5.5078125 q-1.5625 1.58203125 -3.53515625 2.0703125 z M134.71826296875 23.613 l13.633 0 l0 5.4297 l-13.633 0 l0 -5.4297 z M134.71826296875 34.9609 l22.637 0 l0 5.4297 l-22.637 0 l0 -5.4297 z M134.71826296875 12.227 l22.637 0 l0 5.4297 l-22.637 0 l0 -5.4297 z M178.302735625 23.613 l13.633 0 l0 5.4297 l-13.633 0 l0 -5.4297 z M178.302735625 34.9609 l22.637 0 l0 5.4297 l-22.637 0 l0 -5.4297 z M178.302735625 12.227 l22.637 0 l0 5.4297 l-22.637 0 l0 -5.4297 z M221.88720828125 12.245999999999999 l5.6445 0 l0 28.145 l-5.6445 0 l0 -28.145 z M246.34048828125 
      36.8359 l-7.1484 0 l-10.723 -13.281 l6.7969 0 q2.87109375 -0.078125 3.828125 -1.015625 q0.56640625 -0.546875 0.56640625 -1.71875 q0 -1.71875 -0.78125 -2.44140625 q-0.72265625 -0.703125 -1.9921875 -0.703125 l-0.11719 0 l-5.8398 0 l0 -5.4297 l5.7617 0 q3.6328125 -0.1171875 6.1328125 2.24609375 q2.4609375 2.32421875 2.4609375 6.328125 q0 3.37890625 -2.1875 5.5078125 q-1.5625 1.58203125 -3.53515625 2.0703125 z"></path></g><g id="SvgjsG5249" featurekey="inlineSymbolFeature-0" transform="matrix(1.020367680475069,0,0,1.020367680475069,152.8019126733727,-2.040735360950138)" fill="#000000"><g xmlns="http://www.w3.org/2000/svg"><path d="M16,18.567c-5.58,0-10.119,4.539-10.119,10.119v0.276C5.881,29.536,6.345,30,6.918,30s1.037-0.464,1.037-1.037v-0.276   c0-4.436,3.609-8.045,8.045-8.045s8.045,3.609,8.045,8.045v0.276c0,0.573,0.464,1.037,1.037,1.037s1.037-0.464,1.037-1.037v-0.276   C26.119,23.106,21.58,18.567,16,18.567z"></path><path d="M28.583,15.434L26.33,13.18c-0.181-0.181-0.427-0.283-0.683-0.283c-0.861,0-1.292,1.041-0.683,1.65l0.534,0.533h-4.756   c1.079-1.159,1.745-2.707,1.745-4.411c0-3.576-2.91-6.486-6.486-6.486H6.503L7.037,3.65C7.646,3.041,7.215,2,6.354,2   C6.097,2,5.852,2.102,5.67,2.283L3.417,4.537c-0.377,0.377-0.377,0.989,0,1.367L5.67,8.157C5.852,8.338,6.097,8.44,6.354,8.44   c0.861,0,1.292-1.041,0.683-1.65L6.503,6.257h4.756c-1.079,1.159-1.745,2.707-1.745,4.411c0,3.576,2.91,6.486,6.486,6.486h9.496   l-0.533,0.533c-0.609,0.609-0.178,1.65,0.683,1.65c0.256,0,0.502-0.102,0.683-0.283l2.254-2.254   C28.961,16.423,28.961,15.811,28.583,15.434z M16,6.257c2.433,0,4.411,1.979,4.411,4.411S18.433,15.08,16,15.08   s-4.411-1.979-4.411-4.411S13.567,6.257,16,6.257z"></path></g></g><g id="SvgjsG5250" featurekey="nameRightFeature-0" transform="matrix(0.5516992342508144,0,0,0.5516992342508144,193.0184486818324,0.5886872545826014)" fill="#000000"><path d="M28.64306640625 40.39063 l-6.4453 0 q-2.48046875 0 -4.21875 -1.73828125 q-1.69921875 -1.69921875 -1.69921875 -4.08203125 l0 -16.484 q0 -2.3828125 1.71875 -4.1015625 t4.1992 -1.7188 l11.563 0 q2.48046875 0 4.19921875 1.7578125 q1.69921875 1.6796875 1.69921875 4.0625 l0 2.4609 l-5.6055 0 l0 -2.4609 q0 -0.1953125 -0.1171875 -0.29296875 q-0.09765625 -0.09765625 -0.17578125 -0.09765625 
      l-11.563 0 q-0.09765625 0 -0.21484375 0.1171875 q-0.078125 0.078125 -0.078125 0.2734375 l0 16.484 q0 0.21484375 0.09765625 0.33203125 q0.078125 0.05859375 0.1953125 0.05859375 l6.4453 0 l0 5.4297 z M39.65906640625 32.9687 l-5.6055 0 l0 -3.9453 l-6.3672 0.019531 l-0.019531 -5.4297 l11.992 -0.019531 l0 9.375 z M71.2116640625 34.9609 l0 5.4297 l-4.7266 0 q-2.48046875 0 -4.21875 -1.73828125 q-1.69921875 -1.69921875 -1.69921875 -4.0625 l0 -22.344 l5.625 0 l0 22.344 q0 0.1953125 0.09765625 0.3125 q0.078125 0.05859375 0.1953125 0.05859375 l4.7266 0 z M78.3406640625 12.245999999999999 l5.6055 0 l0 28.145 l-5.6055 0 l0 -28.145 z M104.85498171875 12.245999999999999 l5.625 0 l0 28.145 l-5.625 0 l0 -28.145 z M137.228496875 40.39063 l-5.625 0 l0 -28.145 l17.48 0 q2.48046875 0 4.19921875 1.7578125 q1.69921875 1.6796875 1.69921875 4.0625 l0 16.484 q0 2.3828125 -1.69921875 4.08203125 q-1.71875 1.73828125 -4.19921875 1.73828125 l-4.8438 0 l0 -5.4297 l4.8438 0 q0.078125 0 0.17578125 -0.09765625 q0.1171875 -0.09765625 0.1171875 -0.29296875 l0 -16.484 q0 -0.1953125 -0.1171875 -0.29296875 q-0.09765625 -0.09765625 -0.17578125 -0.09765625 l-11.855 0 l0 22.715 z M205.20739453125 40.39063 l-6.2305 0 l-1.875 -3.8672 l-5.4688 0 l0 -5.4297 l2.8125 0 l-4.0039 -8.2227 l-8.5547 17.52 l-6.2305 0 l14.785 -28.77 z M252.5225234375 12.245999999999999 l0 28.145 l-5.6055 0 l0 -28.145 l5.6055 0 z M231.2138234375 12.245999999999999 l8.4375 10.293 l0 8.7695 l-8.2031 -10.02 l0 19.102 l-5.625 0 l0 -28.145 l5.3906 0 z M279.32963359375 40.39063 q-2.4609375 0 -4.19921875 -1.73828125 q-1.69921875 -1.69921875 -1.69921875 -4.08203125 l0 -16.484 q0 -2.3828125 1.71875 -4.1015625 t4.1797 -1.7188 l11.582 0 q2.48046875 0 4.19921875 1.7578125 q1.69921875 1.6796875 1.69921875 4.0625 l0 2.4609 l-5.6055 0 l0 -2.4609 q0 -0.1953125 -0.1171875 -0.29296875 q-0.09765625 -0.09765625 -0.17578125 -0.09765625 l-11.582 0 q-0.078125 0 -0.1953125 0.1171875 q-0.078125 0.078125 -0.078125 0.2734375 l0 16.484 q0 0.21484375 0.09765625 0.33203125 q0.078125 0.05859375 0.17578125 0.05859375 l11.582 0 q0.09765625 0 0.17578125 -0.078125 q0.1171875 -0.1171875 0.1171875 -0.3125 l0 -2.4219 l5.6055 0 l0 2.4219 q0 2.3828125 -1.69921875 4.08203125 q-1.71875 1.73828125 -4.19921875 1.73828125 
      l-11.582 0 z M317.777345 23.613 l13.633 0 l0 5.4297 l-13.633 0 l0 -5.4297 z M317.777345 34.9609 l22.637 0 l0 5.4297 l-22.637 0 l0 -5.4297 z M317.777345 12.227 l22.637 0 l0 5.4297 l-22.637 0 l0 -5.4297 z"></path></g></svg>
      </div>
      <Card className="w-full max-w-4xl h-[600px]  p-6 shadow-xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleTreeToggle} className="p-2">
            <Route className="h-4 w-4 mr-2" />
            Goal Navigator
           </Button>
           {showTree&&(<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <Card className="w-3/4 h-auto  p-6 overflow-hidden">
          <TreeVisualization className="relative h-3/4" isVisible={showTree}/>
          <Button onClick={handleTreeToggle} className="mt-4">Close</Button>
          </Card>
          </div>)}
          <div className="text-2xl font-bold flex flex-row items-center justify-between ">
          <h1 className="pr-2">Chatbot</h1>
          <svg width="1em" height="1em">
          <BotMessageSquare classname="h-4 w-3 mr-2"/>
          </svg>
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
        <div className="flex flex-col h-full overflow-hidden ">
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
            <table className="w-4/4 border-collapse  flex items-center justify-center left-1/2">
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
            <Button onClick={handleExcelToggle} className="mt-4">Close</Button>
          </Card>
        </div>
      )}

    </div>
  );
};

export default ChatbotLanding;