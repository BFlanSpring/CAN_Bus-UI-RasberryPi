# Raspberi PI free Data Logger

This project is intended to be a cost-effective alternative to a digital data-logging automotive cluster. This program will display current engine data in animated gauges and allow the user to data-log in real-time. On top of this primary function, this UI also has an integrated driver-oriented weather app designed for making track adjustments to your vehicle. This User application should be compatible with almost any aftermarket ECU, primarily Haltech, MegaSquirt, ECUMaster, and Link.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

Aftermarket car tuning has been evolving at an exponential rate as technology and sensors advance. Automotive Software applications have always come at a cost, and their aftermarket cluster/display counterparts can cost even more than the ECU as the heart of your engine! This application's purpose is to be an open-source software to decode your ECUs bit and byte data and display it on your desired screen. This application will display your preferred engine variables on JavaScript-derived gauges in real-time. All gauges added and removed and can be edited to reflect "Normal Parameters" (green), "Warning Parameters"(yellow), and "Dangerous Parameters" (red). Depending on the current status of the sensor's input, the gauge will display the value and add a corresponding color (green, yellow, red). On top of this gauge display, this Application includes an API weather-based page that can be edited to display the vital real-time weather updates at your current location. This weather page utilizes variables that aren't common in average weather apps, including variables that will help auto enthusiasts adjust their car at the track to current weather conditions. On top of this, this app provides a 7-segment display counter programmed in CSS to help time things, like your baking... Speeding is not encouraged with this application. For development purposes, I mounted a Raspberry Pi to the back of a $35 Amazon touchscreen display, connect your ECU to your Raspberry Pi with your USB to CAN_Bus cord.

## Installation

1. **Python Environment Setup:** Ensure you have Python 3.9.6 installed on your system. You can download and install it from the [Python Official Website](https://www.python.org/downloads/).

2. **Python Environment Setup:** Download this folder and save it to your desired directory. Once you have done this, it is now helpful to create your own virtual environment. For many users, it will look something along the lines of this:
    ```
    python3 -m venv venv
    ```
    Next, activate the newly created environment:
    ```
    source venv/bin/activate
    ```
    And install the required Python packages:
    ```
    pip install -r requirements.txt
    ```

3. **Database Setup (PostgreSQL):** Ensure PostgreSQL is installed on your system. If not, you can download and install it from [PostgreSQL Downloads](https://www.postgresql.org/download/).

4. **Database Initialization:** After PostgreSQL installation, open your terminal and connect to your DB server using the PostgreSQL command line interface (psql). Once you are in the psql command lines, run:
    ```
    \i seed.sql
    ```
    This command will create your database and tables for this project.

5. **Running the Application:** After completing the above steps, run the following command in your terminal to launch your Flask application running on your local port:
    ```
    flask run
    ```

6. **Testing** To run test, run:
    ```
    python3 -m unittest discover tests
    ```

## Usage

This product should be relatively user-friendly. After installing the application and its necessary requirements from the GitHub repo into your newly created directory, run Flask. After Flask is running, the application will load, and the main selection taskbar will render. You will see multiple selections. As of now, 3 tabs have full content, the notification Bell on the far right will redirect you to the API-derived weather page. This page allows a user to input any coordinates they choose and will pull up all available weather data for that location all in real-time.

The Tachometer button on the task bar will bring you to your instrument cluster page which will display real-time data management values. Users will be able to log all current data to this app's Log database by toggling logging on and off. These variables that can be logged are all vital values projected from the car's ECU, this includes things like RPM, Oil temp, water temp, boost pressure, Oil pressure, knock detection and many more variables. At this time, the Edit dash does not do anything. As this app develops I will add in more gauges and sensors that a user can customize to their liking.

LOGGING: In this application, a User can log their engine diagnostics via clicking the log button on the HomeDash page under the gauges. This button takes all of the live data that is populating the real-time gauge outputs and saves all of the live data to the SQL database created from the seed.sql file. The variables that are logged are Engine_Temp, Boost_Pressure, Fuel_Pressure, Oil_Pressure, Oil_Temp, and O2 data. To see how this is logged and organized please view the seed.sql file. 

There is also an 8-bit timer I created with raw JS for fun.

## Contributing

**API WEATHER SOURCE: [https://api.open-meteo.com/v1/forecast?latitude=42.9&longitude=72.8&current=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,windspeed_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=3](https://api.open-meteo.com/v1/forecast?latitude=42.9&longitude=72.8&current=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,windspeed_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch)
