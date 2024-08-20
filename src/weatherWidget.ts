interface ForecastDay {
    date: string
    day: {
        avgtemp_c: number
    }
}

interface WeatherData {
    forecast: {
        forecastday: ForecastDay[]
    },
    location: {
        name: string
    }
}

const apiKey = 'a2c162fe9e2b49b6b4c124102241808';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

function createInputForm(divId?: string): void {
    const formDiv: HTMLElement | null = divId ? document.getElementById(divId) : createWeatherDiv()

    if (formDiv) {
        const form: HTMLFormElement = createForm(divId)

        formDiv.appendChild(form)
    }
}

function createWeatherDiv(): HTMLElement {
    const div: HTMLDivElement = document.createElement('div')

    document.body.appendChild(div)

    return div
}

function createForm(divId?: string): HTMLFormElement {
    const form: HTMLFormElement = document.createElement('form')

    form.innerHTML = 
        `<label for="location">Enter City Name or Coordinates (lat,lon):</label>
        <input type='text' id='location' name='location' required>
        <button type='submit'>Get Weather</button>`

    form.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault()
        const locationInput: string = (document.getElementById('location') as HTMLInputElement).value

        getWeather(locationInput, divId)
    })

    return form
}  

async function getWeather(location: string, divId?: string): Promise<void> {
    try {
        let query: string = location
        const coordMatch = location.match(/^([-+]?\d{1,2}\.\d+),\s*([-+]?\d{1,3}\.\d+)$/)

        if (coordMatch) {
            const [lat, lon] = coordMatch.slice(1)
            query = `${lat},${lon}`
        }

        const weatherResponse: Response = await fetch(`${apiUrl}?key=${apiKey}&q=${query}&days=14`)
        const weatherData: WeatherData = await weatherResponse.json()
        const weatherDiv: HTMLElement | null = divId ? document.getElementById(divId) : createWeatherDiv()

        if (weatherDiv) {
            displayWeather(weatherData, weatherDiv)
        }
    } catch (error) {
        console.error("Failed to load weather data:", error)
    }
}

function displayWeather(data: WeatherData, div: HTMLElement): void {
    const avgTemps: Record<string, number> = getAverageTemperatures(data)

    removeWeatherResults(div) // Remove previous weatherResults div if it exists

    const weatherDiv = document.createElement("div")
    weatherDiv.setAttribute('id', 'weatherResults')
    weatherDiv.innerHTML = `<h3>Average Temperatures for the Next 2 Weeks in ${data.location?.name}</h3>`

    const days = document.createElement("div")
    days.setAttribute('id', 'resultsList')

    for (const [day, temp] of Object.entries(avgTemps)) {
        const dayTemp = document.createElement("div")
        dayTemp.textContent = `${day}: ${temp.toFixed(2)}\u00B0C`
        days.appendChild(dayTemp)
    }

    weatherDiv.appendChild(days)
    div.appendChild(weatherDiv)
}

function removeWeatherResults(div: HTMLElement): void{
    const previousWeatherResultsDiv: Element | null = div.querySelector("#weatherResults")

    if (previousWeatherResultsDiv) {
        previousWeatherResultsDiv.remove()
    }
}

function getAverageTemperatures(data: WeatherData): Record<string, number> {
    const dayNames: string[]  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const tempSums: Record<string, { sum: number, count: number }> = {}
    const avgTemps: Record<string, number> = {}

    data.forecast?.forecastday?.forEach((dayData) => {
        const date: Date = new Date(dayData.date)
        const dayName: string = dayNames[date.getUTCDay()]

        if (!tempSums[dayName]) {
            tempSums[dayName] = { sum: 0, count: 0 }
        }

        tempSums[dayName].sum += dayData.day.avgtemp_c
        tempSums[dayName].count += 1
    })

    for (const day in tempSums) {
        avgTemps[day] = tempSums[day].sum / tempSums[day].count
    }

    return avgTemps
}

(window as any).initializeWeatherWidget = (divId?: string) => {
    createInputForm(divId);
}
