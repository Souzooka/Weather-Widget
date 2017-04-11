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
  console.log(data);
}

document.querySelector('#btn-weather').addEventListener('click', () => {
  const zipCode = document.querySelector('#city-input').value;
  console.log(zipCode);
  const container = document.querySelector('#contentContainer');
  getData(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${API_KEY}`,
    container, addDataToPage);
});