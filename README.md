# IBM SkillsBuild Project

Welcome to the Group 29 repository for the IBM SkillsBuild Project! This project is designed to provide a gamification experience to users, engaging them in a dynamic learning environment.

## Getting Started

### Clone the Repository Locally

To get started with the IBM SkillsBuild Project, clone this repository to your local machine and perform basic operations by running the following commands in your terminal:

```bash
# Clone the repository on your local machine
git clone https://campus.cs.le.ac.uk/gitlab/co2201-2024/group-29.git
```

### Useful Git Commands

Here are some useful Git commands to help you manage your contributions to the project:

```bash
# Stage your changes for a single file
git add filename.extension

# Stage all changes
git add .

# Commit your changes with a brief description
git commit -m "Brief description of the changes"

# Push the changes to the main branch
git push

# Push to a specific branch
git push origin branchName

# Pull the latest changes from the remote repository
git pull
```

## Website Setup Documentation

Follow these steps to set up the IBM SkillsBuild Project website:

## Prerequisites
Before you begin, ensure you have the following software and tools installed:
- **Visual Studio Code**: Latest version available [here](https://code.visualstudio.com/download).
- **Web Browser**: Any modern web browser will do.
- **Internet Connection**: A stable connection without restrictions is needed.
- **MongoDB Compass**: For database management, downloadable [here](https://www.mongodb.com/docs/compass/current/install/).

### Installation Steps

#### 1. Clone the Git Repository
To clone the repository to your local machine, use the following command:
```bash
git clone https://campus.cs.le.ac.uk/gitlab/co2201-2024/group-29.git
```

#### 2. Open the Project in Visual Studio Code
Navigate to the cloned repository folder and open it with Visual Studio Code.

#### 3. Install Dependencies
Within Visual Studio Code, open a terminal and execute:
```bash
npm install
```
Ignore any deprecated warnings.

#### 4. Build JavaScript Files
Run the following command to build the JavaScript files:
```bash
npm run build:js
```
Terminate the process with `Ctrl+C` once complete.

#### 5. Watch JavaScript Files
In a new terminal, start watching the JavaScript files with:
```bash
npm run watch:js
```
Keep this process running during development.

#### 6. Start the Server
Open another terminal to start the server:
- For development mode:
```bash
npm start
```
- For production mode:
```bash
npm run start:prod
```

#### 7. Access the Website
With the server running and the database connected, open your web browser and go to:
```
localhost:3000
```

### Database Management with MongoDB Compass

1. Open MongoDB Compass.
2. Connect to the database using the connection string provided in the `config.env` (DATABASE).
3. Navigate to the 'group29' collection to manage and view data.

### Common Errors and Solutions

- **Database Connection Issues**: If you're experiencing connection issues on restricted networks like University Wi-Fi, try using mobile data or a VPN.
- **JWT Malformed Error**: In developer mode, if you encounter this error, log in again.
- **Access Denied**: If you're receiving permission errors, make sure you're using the correct routes for your user level; admin routes require admin access.



