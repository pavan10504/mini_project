import React, { useState, useEffect } from 'react';

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background 
      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

const StudentSelectionForm = ({ onSubmit, userinfon, userinfoa }) => {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [availableBoards, setAvailableBoards] = useState([]);
  const [selectedElectives, setSelectedElectives] = useState([]);
  const [electiveOptions, setElectiveOptions] = useState({});

  // Define board-specific configurations
  const boardConfigs = {
    "ICSE": {
      compulsory: [
        "English",
        "Second Language (Indian Languages or Modern Foreign Languages)",
        "History, Civics and Geography"
      ],
      electiveGroups: {
        "Group II - Elective Subjects": {
          required: 2,
          options: [
            "Mathematics",
            "Science (Physics, Chemistry and Biology)",
            "Economics",
            "Commercial Studies",
            "Technical Drawing",
            "Modern Foreign Language",
            "Classical Language",
            "Computer Science",
            "Environmental Science",
            "Agricultural Science"
          ]
        },
        "Group III - Applied/Skill-Based Subjects": {
          required: 1,
          options: [
            "Computer Applications",
            "Economic Applications",
            "Commercial Applications",
            "Art",
            "Performing Arts",
            "Home Science",
            "Cookery",
            "Fashion Designing",
            "Physical Education",
            "Yoga",
            "Technical Drawing Applications",
            "Environmental Applications",
            "Modern Foreign Languages"
          ]
        }
      }
    },
    "CBSE": {
      compulsory: [
        "English",
        "Hindi",
        "Social Studies",
        "Mathematics",
        "Science"
      ],
      electiveGroups: {} // CBSE 10th Grade has no mandatory electives
    },
    "STATEBOARD": {compulsory: [
      'FIRST LANGUAGE', 'SECOND LANGUAGE', 'THIRD LANGUAGE', 'MATHEMATICS','SCIENCE', 'SOCIAL SCIENCE'
    ],
    electiveGroups: {}
    },
    "Engineering": {
      compulsory: ['Mathematics', 'Physics'],
      electiveGroups: {
        'Core Engineering': {
          required: 2,
          options: ['Computer Science', 'Electronics', 'Mechanics', 'Digital Systems']
        },
        'Supplementary': {
          required: 1,
          options: ['Technical Drawing', 'Workshop Practice', 'Engineering Graphics']
        }
      }
    }
  };

  useEffect(() => {
    if (userinfoa >= 16 && userinfoa <= 18) {
      setAvailableBoards(['ICSE', 'CBSE', 'STATEBOARD']);
    } else if (userinfoa > 18 && userinfoa < 22) {
      setAvailableBoards(['Engineering']);
    } else {
      setAvailableBoards([]);
    }
  }, [userinfoa]);

  const handleBoardChange = (e) => {
    const board = e.target.value;
    setSelectedBoard(board);
    setSelectedElectives({});
    if (board) {
      setElectiveOptions(boardConfigs[board].electiveGroups || {});
    }
  };

  const handleElectiveChange = (group, e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    const maxAllowed = electiveOptions[group]?.required || 0;

    if (selectedOptions.length <= maxAllowed) {
      setSelectedElectives(prev => ({
        ...prev,
        [group]: selectedOptions
      }));
    }
  };

  const isFormValid = () => {
    if (!selectedBoard) return false;

    const config = boardConfigs[selectedBoard];
    if (!config) return false;

    // Check if all groups have the required number of selections
    return Object.entries(config.electiveGroups || {}).every(([group, { required }]) => 
      selectedElectives[group]?.length === required
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjects = {
      compulsory: boardConfigs[selectedBoard].compulsory,
      electives: selectedElectives
    };

    onSubmit({
      name: userinfon,
      age: userinfoa,
      selectedBoard: selectedBoard,
      subjects: subjects
    });
  };

  return (
    <div className='flex flex-col h-3/4 overflow-hidden'>
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-3/4 w-full overflow-auto">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Name:</span>
            <span>{userinfon}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Age:</span>
            <span>{userinfoa}</span>
          </div>
        </div>
        
        {availableBoards.length > 0 && (
          <div className="space-y-2">
            <label className="font-medium block">Select Board:</label>
            <select 
              value={selectedBoard} 
              onChange={handleBoardChange}
              className="w-full p-2 border rounded-md bg-white"
              required
            >
              <option value="">Select Board</option>
              {availableBoards.map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {selectedBoard && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md flex flex-col  items-center justify-center">
              <h3 className="font-medium mb-2 ">Compulsory Subjects:</h3>
              <ul className="list-disc list-inside flex flex-col items-start">
                {boardConfigs[selectedBoard].compulsory.map(subject => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </div>

            {Object.entries(electiveOptions).map(([group, { required, options }]) => (
              <div key={group} className="space-y-2">
                <label className="font-medium block">
                  {group} (Select {required}):
                </label>
                <select
                  multiple
                  value={selectedElectives[group] || []}
                  onChange={(e) => handleElectiveChange(group, e)}
                  className="w-full p-2 border rounded-md bg-white"
                  size={4}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600">
                  Selected: {selectedElectives[group]?.length || 0}/{required}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={!isFormValid()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default StudentSelectionForm;
