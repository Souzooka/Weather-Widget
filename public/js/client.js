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
  const newH2 = document.createElement('h2');
  newH2.innerHTML = data.name;
  element.appendChild(newH2);
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
  getData(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${API_KEY}`,
    container, addDataToPage);
});