# GeoTagging- CCTV Feed Analysis Backend

## Overview

Welcome to the backend repository for the Rajasthan Police Hackathon project aimed at developing a mobile and web application to empower users to contribute their CCTV camera feeds for analysis. The primary goal is to enhance law enforcement capabilities by analyzing vehicle license plate numbers through the submitted camera feeds.

## Project Description

This backend application serves as the central component responsible for handling user submissions, managing CCTV camera feeds, and facilitating the analysis of vehicle license plate numbers. It is designed to work seamlessly with the front-end applications and ensures secure and efficient communication with the database and external services.

## Features

- **User Registration and Authentication:** Secure user registration and authentication system to ensure that only authorized users can submit CCTV camera feeds.

- **CCTV Camera Feed Management:** Allows users to add, update, and delete their CCTV camera feeds. Each feed is associated with relevant metadata, such as location and camera specifications.

- **License Plate Analysis:** Integrates with license plate recognition services to analyze vehicle license plate numbers from the submitted camera feeds.

- **Data Storage and Retrieval:** Efficiently stores and retrieves data from the database, ensuring the reliability and scalability of the system.

- **API Endpoints:** Well-defined API endpoints for communication with the front-end applications, enabling seamless integration.

## Technologies Used

- **Node.js:** The backend is developed using Node.js to leverage its asynchronous and event-driven architecture.

- **Express.js:** A minimal and flexible Node.js web application framework used for building robust APIs.

- **PostgreSQL:** A SQL database used for storing user information, CCTV camera feed data, and analysis results.

- **License Plate Recognition Service:** Integration with external services for license plate recognition.

- **JWT (JSON Web Tokens):** Used for secure user authentication and authorization.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sebesti0n/GeoTagging-and-Analysis-of-CCTV-Areas-Backend.git
   cd rajasthan-police-hackathon-backend
   
2. **Install Dependencies**
   
   ```bash
   npm install
   
3. **Run the Application**
   
   ```bash
    node server.js      
   
## Frontend Repositories

Find the source code for the frontend applications in the following repositories:

- [GeoTagging Web Application](https://github.com/sebesti0n/Geotagging-and-Analysis-of-CCTV-Areas/tree/main/web)
- [GeoTagging Mobile Application](https://github.com/sebesti0n/Geotagging-and-Analysis-of-CCTV-Areas/tree/main/mobile)

To set up and run the frontend applications, follow the instructions provided in their respective README files.

## Machine Learning Model Repositories

The machine learning models for license plate recognition can be found in the following repository:

- [GeoTagging- License Plate Recognition Model](https://github.com/sebesti0n/GeoTagging-ANPR_ML_Model)

Refer to the model repository for instructions on training, deploying, and integrating the license plate recognition model with the backend.

