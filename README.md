<div align="center">

# 🎓 Vidhara - AI-Powered Career Guidance System

🤖

**Your AI companion for navigating the Indian education system**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

**Vidhara** (meaning "wisdom" or "knowledge" in Sanskrit) is an intelligent career guidance chatbot designed specifically for Indian students. It helps students make informed decisions about their educational journey after 10th grade by providing personalized stream recommendations, exploring career pathways, and answering education-related queries using AI.

Whether you're confused about choosing between Science, Commerce, or Arts, or wondering what career options are available after Diploma or ITI, Vidhara is here to guide you!

---

## ✨ Features

### 🤖 AI-Powered Chatbot
- Powered by **Google Gemini AI** for intelligent, context-aware conversations
- Specialized in Indian education counseling
- Provides personalized guidance based on your queries
- Real-time typing animation for natural conversation flow

### 📊 Smart Stream Recommendations
- Input your 10th-grade scores to get personalized stream recommendations
- Supports multiple education boards:
  - **CBSE** (Central Board of Secondary Education)
  - **ICSE** (Indian Certificate of Secondary Education)
  - **State Board** (Karnataka State Board)
- AI-driven analysis considers:
  - Mathematics proficiency
  - Science aptitude
  - Language skills
  - Social Studies performance
  - Elective subjects (for ICSE)

### 🗺️ Interactive Goal Navigator
- Visual exploration of academic pathways using **D3.js**
- Navigate through career options from 10th grade onwards
- Comprehensive coverage of:
  - **PUC Streams**: Science (PCMB, PCMC, PCME), Commerce, Arts
  - **Diploma Courses**: Engineering, Non-Engineering, Medical, Vocational
  - **ITI Trades**: Engineering, Non-Engineering, Emerging Skills
- Detailed information about each career path

### 📈 Score-Based Analysis
- Enter subject-wise marks for accurate recommendations
- Weighted scoring system for different streams
- Visual representation of recommended pathways
- Animated stream navigator with fit scores

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds
- Responsive design for all devices
- Smooth animations with **Framer Motion**
- Clean, intuitive interface
- Dark/Light theme support via CSS variables

---

## 🎯 Demo

### How It Works

1. **Welcome Screen**: Enter your name and age to get started
2. **Board Selection**: Choose your education board (CBSE/ICSE/State Board)
3. **Subject Selection**: View compulsory subjects and select electives (if applicable)
4. **Score Entry**: Input your marks for each subject
5. **Get Recommendations**: Receive AI-powered stream recommendations
6. **Explore Pathways**: Use the Goal Navigator to explore career options
7. **Chat with Vidhara**: Ask any education-related questions

---

## 🛠️ Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pavan10504/mini_project.git
   cd mini_project
   ```

   > **Note**: Replace `pavan10504` with your username if you've forked the repository.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

---

## 💻 Usage

### Getting Started

1. **Enter Your Details**: Provide your name and age (16-22 years)
2. **Select Your Board**: Choose from CBSE, ICSE, or State Board
3. **Enter Your Marks**: Fill in your subject-wise scores
4. **View Recommendations**: See personalized stream suggestions with fit scores

### Using the Goal Navigator

1. Click **"Explore"** → **"Goal Navigator"**
2. Navigate through the academic tree starting from 10th grade
3. Click on any node to see available options
4. Use the search feature to find specific courses
5. View detailed information about each pathway

### Chatting with Vidhara

- Type your education-related questions in the chat input
- Vidhara understands queries about:
  - Course eligibility
  - Career prospects
  - Exam preparation
  - College admissions
  - Skill development

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **Tailwind CSS** | Utility-first styling |
| **Google Gemini AI** | Conversational AI |
| **D3.js** | Data visualization |
| **Framer Motion** | Animations |
| **React Markdown** | Markdown rendering |
| **Lucide React** | Icon library |

### Key Dependencies

```json
{
  "@google/generative-ai": "^0.21.0",
  "d3": "^7.9.0",
  "framer-motion": "^11.13.1",
  "react": "^18.3.1",
  "react-d3-tree": "^3.6.2",
  "react-markdown": "^9.0.1",
  "tailwindcss": "^3.4.14"
}
```

---

## 📁 Project Structure

```
vidhara/
├── public/
│   ├── index.html          # HTML template
│   ├── test.ini            # Career pathway content data
│   └── ...
├── src/
│   ├── components/
│   │   ├── chatbot.js      # Main chatbot interface
│   │   ├── student.js      # Student selection form
│   │   ├── recomend.js     # Stream recommendation AI
│   │   ├── tree.js         # D3.js tree visualization
│   │   └── tree2.js        # Academic tree navigator
│   ├── App.js              # Root component
│   ├── App.css             # Global styles
│   ├── index.js            # Entry point
│   └── index.css           # Base styles with CSS variables
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Dependencies & scripts
└── README.md               # You are here!
```

---

## 🎓 Supported Education Pathways

### After 10th Grade

| Stream | Description |
|--------|-------------|
| **PUC - Science** | Physics, Chemistry with Math (PCMC) or Biology (PCMB) or Electronics (PCME) |
| **PUC - Commerce** | Accountancy, Business Studies, Economics |
| **PUC - Arts** | History, Economics, Political Science, Sociology, Psychology |
| **Diploma** | Engineering & Non-Engineering technical courses |
| **ITI** | Industrial Training Institute - skill-based vocational courses |

### Score-Based Recommendations

| Average Score | Recommended Stream |
|--------------|-------------------|
| ≥ 65% | PUC (Science/Commerce/Arts) |
| 45-64% | Diploma courses |
| < 45% | ITI trades |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Ideas for Contribution

- [ ] Add more education boards (ISC, NIOS)
- [ ] Implement user authentication
- [ ] Add college recommendation feature
- [ ] Create mobile app version
- [ ] Add multilingual support (Hindi, Kannada, etc.)

---

## 📄 License

This project is open source and available under the ISC License.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powering intelligent conversations
- **Create React App** for the project bootstrap
- **Tailwind CSS** for beautiful styling utilities
- **D3.js** community for visualization tools

---

<div align="center">

**Made with ❤️ for Indian Students**

*Empowering students to make informed career decisions*

[⬆ Back to Top](#-vidhara---ai-powered-career-guidance-system)

</div>
