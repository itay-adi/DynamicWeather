This project provides a weather widget that can be embedded into any webpage. The widget allows users to enter a city name or coordinates to get the average temperatures for the next 2 weeks.

The script is relaying on weatherapi.com APIs

Include the Script:

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather Widget</title>
    </head>
    <body>
        <div id="weatherDiv"></div>
        <script src="dist/weatherWidget.js"></script>
        <script>
            if (window.weatherWidget) {
                window.weatherWidget.initializeWeatherWidget('weatherDiv');
            }
        </script>
    </body>
</html>
