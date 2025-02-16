# Uber Clone - MERN Stack Project

This is a full-stack Uber clone built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). The project replicates core functionalities of Uber, including ride booking, real-time location tracking, and user authentication.

---

## Features
- Secure user authentication (Signup, Login, Logout)
- Ride booking functionality
- Real-time location tracking using Google Maps API or Mapbox
- Separate dashboards for drivers and riders
- Payment integration (e.g., Stripe or PayPal)
- Responsive and user-friendly UI
- Real-time ride status updates using Socket.IO

---

## Technologies Used
### Frontend:
- **React.js** (UI framework)
- **Redux** (state management)
- **Tailwind CSS** (styling)
- **Google Maps API / Mapbox** (maps integration)

### Backend:
- **Node.js & Express.js** (REST API)
- **MongoDB & Mongoose** (database and modeling)
- **JWT (JSON Web Tokens)** (authentication)
- **Socket.IO** (real-time communication)

### Other Tools:
- **Stripe / PayPal** (payment processing)
- **Vercel** (frontend deployment)
- **Render / Heroku** (backend deployment)
- **MongoDB Atlas** (cloud database hosting)

---

## Project Structure
```
uber-clone/
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── app/                # All frontend code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (e.g., Home, Ride, Profile)
│   │   ├── redux/          # Redux store, actions, and reducers
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
│
├── backend/               # Node.js and Express.js server
│   ├── Controllers/        # Logic for handling routes
│   ├── db/                 # Database connection and configurations
│   ├── middlewares/        # Middleware functions (e.g., authentication)
│   ├── models/             # MongoDB models (e.g., User, Ride)
│   ├── routes/             # API routes
│   ├── Services/           # Business logic and helper functions
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Entry point for the backend
│   ├── .prettierrc         # Code formatter configuration
│   ├── eslint.config.mjs   # ESLint configuration
│   ├── exampleData.txt     # Sample data file
│   ├── package-lock.json   # Lock file for package versions
│   ├── sample.env.txt      # Example environment file
│   └── .gitignore          # Git ignore file
│
└── README.md               # Project documentation
```

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Asaduzzaman04/uber-clone.git
cd uber-clone
```

### 2. Set Up the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm start
```

### 3. Set Up the Frontend
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder with the following variables:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAP_API_KEY=your_google_maps_or_mapbox_api_key
```
Start the frontend development server:
```bash
npm start
```

---

## Deployment
- **Frontend:** Deploy on [Vercel](https://vercel.com/)
- **Backend:** Deploy on [Render](https://render.com/) or [Heroku](https://heroku.com/)
- **Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch and submit a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Repository Links
- **Frontend:** [Click here](https://github.com/Asaduzzaman04/uber-clone/tree/main/frontend/app)
- **Backend:** [Click here](https://github.com/Asaduzzaman04/uber-clone/tree/main/backend)
