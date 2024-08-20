This project provides a weather widget that can be embedded into any webpage. The widget allows users to enter a city name or coordinates to get the average temperatures for the next 2 weeks.

The script is relaying on weatherapi.com APIs

Include the Script:

**Step 1: installation**
```
1. Clone the repository by copy this line: git clone https://github.com/itay-adi/DynamicWeather.git
2. npm install
3. npm run build
```

**Step 2: Include the Widget on Your Webpage**
1. Add the following script tag in your HTML file, where the weatherWidget.js is the compiled output from the build process:
```
<script src="path/to/weatherWidget.js"></script>
```
2. Add a div where you want the weather widget to appear:
```
<div id="weatherDiv"></div>
```
3. Initialize the widget by adding this script to your HTML file:
```
<script>
    window.initializeWeatherWidget('weatherDiv')
</script>
```
**If you don't want to specify a div, you can initialize the widget without a div ID, and it will create a new div in the body:
```
<script>
    window.initializeWeatherWidget()
</script>
```

**Example HTML:**
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Widget</title>
</head>
<body>
    <div id="weatherDiv"></div>
    <!-- Include the compiled JavaScript file -->
    <script src="path/to/dist/weatherWidget.js"></script>
    <script>
        // Initialize the weather widget with the predefined div ID
        window.initializeWeatherWidget('weatherDiv')
    </script>
</body>
</html>
```
