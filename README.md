# InstaShare

## Overview

This project is a file storage system developed using Angular for the front end, Express.js for the back end, Sequelize as the ORM, and MySQL as the database. The system allows users to upload files, which are then stored on the server. Once a file is uploaded, a backend service zips it and stores the zipped version in the database. Users can only access and download the files they have uploaded, secured by JWT authentication.

## Features

- File Upload: Users can upload files to the server.
- File Zipping: Uploaded files are automatically zipped and stored.
- User Authentication: JWT-based authentication ensures secure access.
- User-specific Access: Users can only view and download their own files.
- Responsive Design: The front end is built to be responsive and user-friendly.

Technologies Used

    Frontend: Angular
    Backend: Express.js
    Database: MySQL
    ORM: Sequelize
    Authentication: JWT (JSON Web Tokens)
    Testing: Mocha & Chai for backend, Jasmine for frontend

## Installation
### Prerequisites

    Node.js
    MySQL Server
    Internet service

#### Steps

**Backend Setup:**
1. Clone the repository:
   ```bash
   git clone https://github.com/cmdozaret/InstaShare-backend.git
   cd file-storage-system
   ```
2. Navigate to the server directory:
    ```bash
    cd cubane_back-end
    ```
3. Switch to *production* remote branch
    ```bash
    git fetch
    git checkout -b production origin/production
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Set the enviroment to your project.
    * Note: set the enviroment with the proper data according to your server. To make a custom envoriment, copy the *"development.json"* file located at *"config/env/"* directory, edit it with the proper data.
6. Configure the database params in config/env/{enviroment}.json:
    ```json
    {
        ...
        "database": {
            "activeDialect": "mysql",
            "dialects": {
                "mysql": {
                    "name": "mysql",
                    "dialect": "mysql",
                    "host": database-host,
                    "port": mysql-port-listened,
                    "username": database-user-username,
                    "password": database-user-password,
                    "database": "cubane"
                }
            }
        },
        ...
    }
    ```
    * Note: set the enviroment with the proper data according to your server.
    
7. Run database migrations:
    ```bash
    cross-env NODE_ENV={staging} npx sequelize-cli db:migrate
    ```
    * Note: replace **{staging}** with the enviroment name to load.
8. Start the server
    ```bash
    npm start
    ```

**Frontend Setup:**
1. Clone the repository:
   ```bash
   git clone https://github.com/cmdozaret/InstaShare-frontend.git
   cd file-storage-system
   ```
2. Navigate to the server directory:
    ```bash
    cd cubane_front-end
    ```
3. Switch to *production* remote branch
    ```bash
    git fetch
    git checkout -b production origin/production
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Start the Angular application:
    ```bash
    ng serve
    ```


**Access the Application:** 
Once are both back-end and front-end systems correctly installed and confiured, open your browser and visit http://localhost:4200.

## Testing
### Backend Tests
- Set Up Testing Environment:
Ensure the test database is configured in *"config/env/staging.json"* as shown in the installation section.
- Run Backend Tests:
    To run tests using Mocha and Chai, execute:
    ```bash
    npm test
    ```
    This command will run the test suite defined in the backend tests.

### Frontend Tests
- Run Frontend Tests:
    To execute tests using Jasmine, navigate to the client directory and run:
    ```bash
    ng test
    ```
    This will start the Angular test runner and execute the frontend test suite.

## Usage

    User Registration: Users can register to create an account.
    User Login: After registration, users can log in to access their dashboard.
    Upload Files: Users can upload files through the interface.
    View Uploaded Files: Users can see the list of their uploaded files and download them.
    Logout: Users can log out securely from the system.

### API Endpoints

    User endpoints
    POST /user: Register a new user.
    GET /user: Returns a list with all users registed.
    PATCH /user/:userId: Update the data for a specific user. Must be logged in and only is updated the logged user's data.
    GET /user/:userId: Returns the data of the logged user. Must be logged in.
    DELETE /user/:userId: Delete an user. An user can only be deleted by itself.
    
    Authentication endpoints
    POST /auth/login: Authenticate a user and return a JWT.
    POST /auth/refresh-token: Returns a new 30-minutes valid secret JWT token for the user.
    DELETE /auth/logout: Log out an user.
    
    File endpoints
    POST /file: Upload a file. The user must be logged in.
    GET /file: Returns a list with all files uploaded by the logged user.
    PATCH /file/:fileId: Update the name for a specific file. User must be logged in and only can modify his own files.
    GET /file/download/:fileId: Returns and download the file for the logged user. Must be the file owner.
    DELETE /file/:fileId: Delete a file. An user can only delete his own files.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact

For any questions, feel free to reach out to cmdozaret@gmail.com