# TensorGo

## Overview of Technologies

### Backend:
- **NodeJS**, **Express**, and **Passport** provide a secure and scalable foundation for the server.
- **Intercom** is integrated to efficiently manage customer support processes.

### Frontend:
- **ReactJS**, **TypeScript**, and **Tailwind CSS** deliver a dynamic and responsive user interface.
- **Axios** is used to handle API interactions seamlessly.

---

## Setup Instructions

### Frontend Setup:
1. Change to the client directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```

### Backend Setup:
1. Install the necessary packages:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   npm start
   ```

---

## Key Features and Details

### User Experience
- Enables Google-based login for secure and convenient authentication.
- Allows users to:
  - Submit new complaints quickly.
  - Review all complaints or filter them based on categories.
  - Receive automated email notifications about complaint status updates.

### Authentication
- **Technology:** Google OAuth2 with Passport.js.
- **Implementation Highlights:**
  - OAuth2 credentials are obtained by registering the app on Google Cloud Console.
  - Configurations are managed in the backend, utilizing `passport-google-oauth20`.
  - The implementation ensures secure login and session handling.

### Managing Customer Service Requests
- **Technology:** Integration with Intercom using `intercom-client`.
- **Implementation Highlights:**
  - An Intercom app is set up to handle customer service needs.
  - Users are mapped as **contacts**, while complaints are treated as **conversations**.
  - CRUD operations for complaints are implemented, along with features for categorization and detailed tracking.
  - Status updates and detailed complaint views are provided to enhance user satisfaction.
![image](https://github.com/user-attachments/assets/839c6ed6-47e5-4732-988d-6209a15fad88)
![image](https://github.com/user-attachments/assets/c973f6c5-5b3a-4f60-a194-91c112ba82df)
![image](https://github.com/user-attachments/assets/bbcc62a6-d7a5-42ed-8d1f-98a3cca6f4ff)
![image](https://github.com/user-attachments/assets/b4338d41-028a-4016-b275-83249e900b23)

