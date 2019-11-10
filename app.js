window.addEventListener('load', () => {
  let longitude;
  let latitude;

  let temperatureDescription = document.querySelector(".temperature__description");
  let temperatureDegree = document.querySelector(".temperature__degree");
  let locationTimezone = document.querySelector(".location__timezone");
  let degreeWrapper = document.querySelector('.degree-wrapper');
  const temperatureScale = document.querySelector('.temperature__scale');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/09fceb4158c231a5f2bf7e619f12b3e7/${latitude},${longitude}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          const { temperature, summary, icon } = data.currently;
          // Set DOM Element from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Set Icons
          setIcon(icon, document.querySelector('.location__icon'));

          // Formula Celsius to Farenheight

          let celsius = (temperature - 32) * (5 / 9);
          //Change Temperature
          degreeWrapper.addEventListener('click', ()=> {
            if(temperatureScale.textContent === 'U+2109') {
              temperatureScale.textContent = `U+2103`;
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureScale.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Hey, this isn't working! \n Because you should except the notification. Or maybe your browser doesn't support this website.";
  }

  function setIcon(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();

    skycons.play();
    
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});