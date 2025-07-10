# Welcome to your Web-Data-Radar project


```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# Full-Stack Web Scraper Application

A complete web scraping application built with Node.js backend and React frontend that collects real-time data from the web and displays it through an interactive dashboard.

## 🚀 Features

### Backend (Node.js + Express)
- **Real-time Web Scraping**: Simulated scraping of developer tools data
- **RESTful API**: Complete API with CRUD operations
- **Data Export**: CSV and JSON export functionality
- **Search & Filter**: Advanced filtering capabilities
- **CORS Enabled**: Cross-origin resource sharing support

### Frontend (React + HTML/CSS/JS)
- **Interactive Dashboard**: Real-time data visualization
- **Search & Filter**: Live search and category filtering
- **Responsive Design**: Mobile-first responsive layout
- **Data Export**: One-click CSV/JSON downloads
- **Real-time Updates**: Live data refresh capabilities

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React, HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Data Formats**: JSON, CSV
- **API Testing**: Postman compatible

## 📦 Installation & Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Start the Server
\`\`\`bash
npm start
\`\`\`

### 3. Access the Application
- **Frontend**: http://localhost:3001
- **API**: http://localhost:3001/api

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools` | Get all scraped tools |
| POST | `/api/scrape` | Scrape new data |
| GET | `/api/categories` | Get all categories |
| GET | `/api/export/csv` | Export data as CSV |
| GET | `/api/export/json` | Export data as JSON |
| GET | `/api/health` | Health check |

## 🧪 Testing with Postman

1. **Health Check**
   \`\`\`
   GET http://localhost:3001/api/health
   \`\`\`

2. **Get All Tools**
   \`\`\`
   GET http://localhost:3001/api/tools?category=Code%20Editor&search=visual
   \`\`\`

3. **Scrape New Data**
   \`\`\`
   POST http://localhost:3001/api/scrape
   Content-Type: application/json
   
   {
     "category": "developer-tools"
   }
   \`\`\`

## 📊 Data Structure

Each scraped item contains:
\`\`\`json
{
  "id": "unique_id",
  "title": "Tool Name",
  "description": "Description",
  "category": "Category",
  "price": "Free/Paid",
  "rating": 4.5,
  "users": "1M+",
  "link": "https://example.com",
  "tags": ["tag1", "tag2"],
  "scrapedAt": "2024-01-15T10:30:00.000Z",
  "source": "source.com"
}
\`\`\`

## 🎯 Key Features Demonstrated

### Real-time Web Scraping
- Simulated scraping from multiple sources
- Automatic data deduplication
- Timestamp tracking for updates

### Data Processing
- JSON to CSV conversion
- Advanced filtering and searching
- Category-based organization

### API Design
- RESTful architecture
- Error handling
- Query parameter support
- File download endpoints

### Frontend Interactivity
- Real-time search
- Category filtering
- Loading states
- Responsive design
- Data export functionality

## 🔄 How It Works

1. **Data Collection**: The backend simulates scraping data from various developer tool websites
2. **API Processing**: Express server processes requests and manages data
3. **Frontend Display**: React app fetches and displays data with interactive features
4. **Real-time Updates**: Users can trigger new scraping operations
5. **Data Export**: Users can download data in CSV or JSON formats

## 🌟 Production Considerations

For a production deployment, you would:

1. **Replace Mock Scraping** with real web scraping libraries:
   - Puppeteer for dynamic content
   - Cheerio for static HTML parsing
   - Playwright for cross-browser scraping


3. **Implement Authentication**:
   - JWT tokens
   - Rate limiting
   - API key management


## 📝 License

MIT License - feel free to use this project for learning and development purposes.

<img width="1897" height="819" alt="image" src="https://github.com/user-attachments/assets/ffbb75e6-9d45-43b4-a3db-ac94329da57c" />
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/68b15fc1-2f6f-4961-99b1-0b2f4e989eca" />
<img width="1920" height="875" alt="image" src="https://github.com/user-attachments/assets/2a01b03f-276f-41fb-b8a1-3d5b7975acd9" />


