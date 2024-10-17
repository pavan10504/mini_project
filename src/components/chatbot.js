import React, { useState } from 'react'
import { Send, Plus } from 'lucide-react'

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

const ChatbotLanding = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [showInfoCard, setShowInfoCard] = useState(true)
  const [userInfo, setUserInfo] = useState({ name: '', age: '' })
  const [showExcelSheet, setShowExcelSheet] = useState(false)

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }])
      // Mock bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'This is a mock response.', sender: 'bot' }])
      }, 1000)
      setInputMessage('')
    }
  }

  const handleInfoSubmit = (e) => {
    e.preventDefault()
    setShowInfoCard(false)
  }

  const handleExcelToggle = () => {
    setShowExcelSheet(!showExcelSheet)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <Card className="w-full max-w-4xl h-[600px] p-6 shadow-xl">
        {showInfoCard && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <Card className="w-96 p-6">
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
                <Button type="submit" className="w-full">Start Chatting</Button>
              </form>
            </Card>
          </div>
        )}
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-gray-200 text-black' : 'bg-gray-200'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
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
      {showExcelSheet && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <Card className="w-3/4 h-3/4 p-6 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Excel Sheet</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Column 1</th>
                  <th className="border p-2">Column 2</th>
                  <th className="border p-2">Column 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Predetermined 1</td>
                  <td className="border p-2">Predetermined 2</td>
                  <td className="border p-2">Predetermined 3</td>
                </tr>
                <tr>
                  <td className="border p-2"><Input placeholder="Enter value" /></td>
                  <td className="border p-2"><Input placeholder="Enter value" /></td>
                  <td className="border p-2"><Input placeholder="Enter value" /></td>
                </tr>
              </tbody>
            </table>
            <Button onClick={handleExcelToggle} className="mt-4">Close</Button>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ChatbotLanding