function getData(source, element, eFunc) {
  const oReq = new XMLHttpRequest();

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
  const zipCode = document.querySelector('#btn-weather').value;
  const container = document.querySelector('#contentContainer');
  getData(`api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=${API_KEY}`,
    container, addDataToPage);
});