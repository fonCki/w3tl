# W3TL React Frontend

## Introduction

W3TL is a fully functional React/Redux application designed as part of a bachelor's thesis project at Via University College, Horsens, Denmark. This platform aims to enhance user connectivity through a modern, interactive, and decentralized social media experience. You can access the live application at [w37l.ridao.ar](http://w37l.ridao.ar).

## Features

- **User Authentication**: Secure login and sign-up functionalities.
- **Real-time Post Interaction**: Users can post text, images, and videos, interact with them through likes, comments, and shares.
- **Search and Discovery**: Explore trending topics, search for posts, and discover new users based on interests.
- **Profile Customization**: Users can customize their profiles, manage their posts, and view their activity.
- **Responsive Design**: The application is fully responsive, providing a seamless experience on both desktop and mobile devices.

## Screenshots

Screenshots of the application can be viewed below:

- ![Home Page](https://github.com/W37L/W37L-React-Client/blob/main/images/img_1.png)
- ![Profile Page](https://github.com/W37L/W37L-React-Client/blob/main/images/img_3.png)
- ### Mobile Views
<p float="left">
  <img src="https://github.com/W37L/W37L-React-Client/blob/main/images/img_8.png" width="45%" />
  <img src="https://github.com/W37L/W37L-React-Client/blob/main/images/img_7.png" width="45%" />
</p>



## Technology Stack

- React.js
- Redux for state management
- React Router for navigation
- Vite for building
- Firebase for backend services
- Tailwind CSS for styling

## Installation

To get this project running locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/W37L/W37L-React-Client.git
# Navigate to the project directory
cd W37L-React-Client

# Install dependencies
npm install

# Create a .env file in the root directory and add the following configurations:
NODE_ENV=development

# Firebase
VITE_APP_API_KEY=your_firebase_api_key
VITE_APP_AUTH_DOMAIN=your_firebase_auth_domain
VITE_APP_PROJECT_ID=your_firebase_project_id
VITE_APP_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_APP_ID=your_firebase_app_id
VITE_APP_MEASUREMENT_ID=your_firebase_measurement_id


# Run the application
npm run dev
```

## Usage
After installation, you can start using the application by navigating to localhost:3000 in your web browser. Ensure your backend services are configured correctly.

## Contributing
Contributions are welcome! If you have a feature request or bug report, please open an issue on GitHub. If you wish to contribute to the codebase, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Push your changes to the branch (`git push origin feature/your-feature`)
5. Create a pull request

## Authors
- [Alfonso Pedro Ridao](https://github.com/fonCki)
