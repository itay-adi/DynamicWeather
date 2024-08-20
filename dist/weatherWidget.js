(()=>{"use strict";({16:function(){var t=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(i,c){function a(t){try{r(o.next(t))}catch(t){c(t)}}function d(t){try{r(o.throw(t))}catch(t){c(t)}}function r(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,d)}r((o=o.apply(t,e||[])).next())}))};function e(){const t=document.createElement("div");return document.body.appendChild(t),t}window.initializeWeatherWidget=n=>{!function(n){const o=n?document.getElementById(n):e();if(o){const i=function(n){const o=document.createElement("form");return o.innerHTML="<label for=\"location\">Enter City Name or Coordinates (lat,lon):</label>\n        <input type='text' id='location' name='location' required>\n        <button type='submit'>Get Weather</button>",o.addEventListener("submit",(o=>{o.preventDefault(),function(n,o){t(this,void 0,void 0,(function*(){try{let t=n;const i=n.match(/^([-+]?\d{1,2}\.\d+),\s*([-+]?\d{1,3}\.\d+)$/);if(i){const[e,n]=i.slice(1);t=`${e},${n}`}const c=yield fetch(`https://api.weatherapi.com/v1/forecast.json?key=a2c162fe9e2b49b6b4c124102241808&q=${t}&days=14`),a=yield c.json(),d=o?document.getElementById(o):e();d&&function(t,e){var n;const o=function(t){var e,n;const o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],i={},c={};null===(n=null===(e=t.forecast)||void 0===e?void 0:e.forecastday)||void 0===n||n.forEach((t=>{const e=new Date(t.date),n=o[e.getUTCDay()];i[n]||(i[n]={sum:0,count:0}),i[n].sum+=t.day.avgtemp_c,i[n].count+=1}));for(const t in i)c[t]=i[t].sum/i[t].count;return c}(t);!function(t){const e=t.querySelector("#weatherResults");e&&e.remove()}(e);const i=document.createElement("div");i.setAttribute("id","weatherResults"),i.innerHTML=`<h3>Average Temperatures for the Next 2 Weeks in ${null===(n=t.location)||void 0===n?void 0:n.name}</h3>`;const c=document.createElement("div");c.setAttribute("id","resultsList");for(const[t,e]of Object.entries(o)){const n=document.createElement("div");n.textContent=`${t}: ${e.toFixed(2)}°C`,c.appendChild(n)}i.appendChild(c),e.appendChild(i)}(a,d)}catch(t){console.error("Failed to load weather data:",t)}}))}(document.getElementById("location").value,n)})),o}(n);o.appendChild(i)}}(n)}}})[16]()})();