# Biky-Frontend

Biky-Frontend is the web-based interface for the Biky social platform designed for Bilkent University students. It enables users to connect, share posts, chat, buy/sell items, and manage their university social lives in one place. The app is built using **React**, **TypeScript**, and **Redux** for state management, and leverages modern web technologies for user authentication, feed management, and real-time interactions.

## Features

- **User authentication**: Secure login and registration for Bilkent students (with email validation).
- **Social feed**: Share and view social media posts and sale listings from the Bilkent community.
- **Profile management**: View and update your profile, follow/unfollow other users, and see your post history.
- **Chat**: Direct messaging between users, including real-time updates.
- **Notifications**: Get alerts for messages, interactions, and activity.
- **Settings**: Manage your account and app preferences.
- **Search**: Find users, posts, and items for sale across the platform.
- **Responsive design**: Works seamlessly on both desktop and mobile devices.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/seckinalp/Biky-Frontend.git
   cd Biky-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   - Create a `.env.local` file in the root directory with your API endpoint:
     ```env
     REACT_APP_API_URL=https://api.biky.com
     ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   Visit `http://localhost:3000` in your browser.

## Project Structure

```
├── public/
├── demo/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── profilecomponent/
│   │   ├── postcomponent/
│   │   ├── ChatComponent/
│   │   ├── navigation/
│   │   ├── logic/
│   │   └── App.tsx
│   └── index.html
├── .env.example
├── package.json
└── README.md
```

## Technologies

- **React** & **TypeScript**: UI and component logic
- **Redux**: Global state management
- **React Router**: Client-side routing
- **CSS**: Styling and responsive layouts
- **REST API**: Backend communication


Biky is your go-to platform for socializing, sharing, and trading at Bilkent University!
