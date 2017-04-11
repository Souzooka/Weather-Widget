function getData(source, element, eFunc) {
  const oReq = new XMLHttpRequest();
  console.log(source);

  oReq.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    eFunc(source, data, element);
  });
  oReq.open('GET', source);
  oReq.send();
}

function addDataToPage(source, data, element) {
  console.log(data)
  const forecastContainer = document.createElement('div');
  const areaName = document.createElement('h1');

  areaName.innerHTML = data.city.name;

  element.appendChild(areaName);
  element.appendChild(forecastContainer);

  for (let i = 0; i <= 32; i += 8) {
    const newForecast = document.createElement('div');
    const time = document.createElement('h2');
    const temperature = document.createElement('p');

    time.innerHTML = data.list[i].dt_txt;
    temperature.innerHTML = `Temperature:
      ${Math.floor(convertKelvinToFahrenheit(data.list[i].main.temp))}* F`;

    forecastContainer.appendChild(newForecast);
    newForecast.appendChild(time);
    newForecast.appendChild(temperature);
  }
}

function convertKelvinToFahrenheit(num) {
  // convert to celsius
  num -= 273.15;
  // convert to fahrenheit
  num *= 1.8;
  num += 32;
  return num;
}

function clearInfo() {
  const contentContainer = document.querySelector('#contentContainer');
  if (contentContainer) {
    while (contentContainer.firstChild) {
      contentContainer.removeChild(contentContainer.firstChild);
    }
  }
}

document.querySelector('#btn-weather').addEventListener('click', () => {
  const zipCode = document.querySelector('#city-input').value;
  console.log(zipCode);
  const container = document.querySelector('#contentContainer');
  clearInfo();
  getData(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=${API_KEY}`,
    container, addDataToPage);
});