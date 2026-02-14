# 🚀🌌 RequestScope

An interactive web application that visualizes the journey of web requests across the internet as a cosmic exploration experience.

## Team Information

**Team Name:** Nazmin Babu Baker's Team

### Team Members
-Nazmin Babu Baker - RIT KOTTAYAM

## 🔗 Links

- **Hosted Project:** 
- **Repository:** https://github.com/Nazmin-Babubaker/request-visualiser.git

---

## 📋 Project Description

RequestScope is an interactive web dashboard that visualizes what actually happens when a user enters a website URL. It transforms invisible networking processes like DNS resolution, IP lookup, and latency measurement into an engaging, astronomy-inspired visual experience.

Instead of raw terminal logs, users see their web request travel across the internet as a constellation of connected nodes.
---

## ❓ The Problem Statement

When someone types a URL into a browser, a complex series of networking events happens behind the scenes — DNS resolution, IP routing, server communication, and latency measurement.

For beginners, this process is invisible and difficult to understand. Traditional tools like traceroute or developer network tabs provide technical output, but they are not beginner-friendly or visually intuitive.

As a result, many students learn web development without truly understanding how a web request travels across the internet.


---

## ✅ The Solution

We built an interactive web platform that:

- ✨ Accepts a website URL
- 🔍 Performs DNS resolution
- 📍 Retrieves IP and geolocation data
- ⏱️ Measures latency
- 🌟 Visualizes each network milestones 

Instead of plain text traceroute output, users experience the internet as a galaxy of interconnected nodes.

---

## 🛠️ Technical Details

### Technologies & Tools

#### Frontend
- **Languages:** JavaScript, HTML, CSS
- **Framework:** React,Tailwind CSS
- **Libraries:** framer-motion,lucide-react,
- **Hosting:** Vercel 

#### Backend
- **Language:** JavaScript (Node.js)
- **Framework:** Express.js
- **Libraries:** 
  - Axios (API calls)
  - GeoIP API (IP geolocation)(ipinfo)
  - Three.js (3D visualization, optional)

#### Development Tools
- VS Code
- Git & GitHub
- Render (backend hosting)

---

## ✨ Features

- ✅ URL-based network tracing
- ✅ DNS resolution visualization
- ✅ IP geolocation mapping
- ✅ Astronomy-style animated hop visualization
- ✅ Latency measurement display
- ✅ Clean interactive UI

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Nazmin-Babubaker/request-visualiser.git

# Navigate to backend directory

# Install dependencies
npm install

# Start the server
node server.js
```

The backend server will run on `http://localhost:5001` (or your configured port).

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```



---

## 📊 Project Documentation

### System Architecture

The system consists of the following components:

1. **Frontend (React)** → User input & cosmic visualization
2. **Backend (Node.js + Express)** → DNS lookup, latency measurement
3. **External APIs** → IP geolocation data
4. **Hosting** → Backend on Render, Frontend on Vercel

### Data Flow

```
1. User enters URL in frontend
   ↓
2. Frontend sends request to backend
   ↓
3. Backend performs DNS resolution
   ↓
4. Backend retrieves IP & latency data
   ↓
5. Data returned to frontend
   ↓
6. Frontend renders animated cosmic visualization
```

### Screenshots

- **Homepage:** User interface for entering a URL
- **Cosmic Visualization:** Network hops displayed as glowing stars
- **Details Panel:** Latency and IP information

---

# AI Tools Used (Transparency Bonus)

## Tool Used
ChatGPT, Gemini

## Purpose
- API design assistance  
- Debugging asynchronous backend logic  
- Improving data visualization logic  
- Documentation formatting  

## Percentage of AI-generated Code
Approximately 15–20%

## Human Contributions
- System architecture design  
- Backend implementation  
- Visualization design  
- UI/UX decisions  
- Deployment setup  


