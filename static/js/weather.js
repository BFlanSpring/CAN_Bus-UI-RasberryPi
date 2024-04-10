
document.addEventListener("DOMContentLoaded", function() {
    const template = document.getElementById("hour-row-template");
    const container = document.getElementById("hourly-data");

    if (template && container) {
        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);

        for (let i = 0; i < 5; i++) {
            const currentHour = new Date().getHours();
            const hour = (currentHour + i) % 24;
            const hourTemplate = template.content.cloneNode(true);

            const hourData = hourly_data_list[i];
            hourTemplate.querySelector("[data-day]").textContent = formatDate(hourData.time);
            hourTemplate.querySelector("[data-time]").textContent = formatTime(hourData.time);
            hourTemplate.querySelector("[data-icon]").src = getWeatherIcon(hourData.weathercode);
            hourTemplate.querySelector("[data-temp-low]").textContent = hourData.temperature_2m;
            hourTemplate.querySelector("[data-precip]").textContent = hourData.precipitation;
            hourTemplate.querySelector("[data-wind]").textContent = hourData.windspeed_10m;

            container.appendChild(hourTemplate);
        }

        setInterval(() => {
            const currentHour = new Date().getHours();
            if (currentHour % 1 === 0) {
                updateFirstRow(); 
            }
        }, 1000);
    } else {
        console.error("Template or container not found.");
    }

    function updateCurrentTime() {
        const currentTimeElement = document.getElementById("current-time");
        if (currentTimeElement) {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();

            const formattedHours = hours.toString().padStart(2, "0");
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const formattedSeconds = seconds.toString().padStart(2, "0");

            currentTimeElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    }

    function updateFirstRow() {
        const firstRow = container.querySelector(".hour-row");
        const currentHour = new Date().getHours();
        const currentHourData = hourly_data_list.find(data => {
            const hour = new Date(data.time).getHours();
            return hour === currentHour;
        });

        if (currentHourData) {
            firstRow.querySelector("[data-day]").textContent = formatDate(currentHourData.time);
            firstRow.querySelector("[data-time]").textContent = formatTime(currentHourData.time);
            firstRow.querySelector("[data-icon]").src = getWeatherIcon(currentHourData.weathercode);
            firstRow.querySelector("[data-temp-low]").textContent = currentHourData.temperature_2m;
            firstRow.querySelector("[data-precip]").textContent = currentHourData.precipitation;
            firstRow.querySelector("[data-wind]").textContent = currentHourData.windspeed_10m;
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    }

    function getWeatherIcon(weatherCode) {
        let weatherIcon = 'default.png'; 

        if (weatherCode == 0) {
            weatherIcon = 'sunny.png';
        } else if (weatherCode == 1 || weatherCode == 2 || weatherCode == 3) {
            weatherIcon = 'partly-cloudy.png';
        } else if (weatherCode >= 5 && weatherCode <= 100) {
            weatherIcon = 'rain.png';
        }

        return `static/assets/Images/${weatherIcon}`;
    }
});
