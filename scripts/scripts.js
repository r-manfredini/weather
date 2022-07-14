const btnSearch = document.querySelector(".btnSearch");
const container = document.querySelector(".container");
const weatherContainer = document.querySelector(".weather-container");
const city = document.querySelector(".city");
const error = document.querySelector(".error");
const apiKey = "978dfbcb05ab9b9bce24e890739a267d";
const preloader = document.querySelector(".preloader");

document.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		weather();
	}
});

btnSearch.addEventListener("click", weather);

function weather() {
	preloader.style.display = "block";
	const cityVal = city.value;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apiKey}&units=metric`;

	fetch(url)
		.then(function (response) {
			if (!response.ok) {
				error.style.display = "block";
				city.value = "";
				preloader.style.display = "none";
				return new Error("falhou a requisição"); // cairá no catch da promise
			} else {
				error.style.display = "none";
			}

			return response.json();
		})
		.then(function (data) {
			createWeather(data);
		});
}

//cria a div do clima-tempo
function createWeather(data) {
	//para o alt e figcaption
	const description = data.weather[0].description;
	//cria a div pai
	const contentWeather = document.createElement("div");
	contentWeather.classList.add("weather");
	weatherContainer.appendChild(contentWeather);
	//cria o nome e o pais da cidade
	const cityWeather = document.createElement("div");
	cityWeather.classList.add("weather-city");
	contentWeather.appendChild(cityWeather);
	const cityName = data.name;
	const country = data.sys.country;
	cityWeather.innerHTML = `<span>${cityName} <sup>${country}</sup></span>`;
	//cria a temperatura
	const degree = document.createElement("div");
	degree.classList.add("degree");
	contentWeather.appendChild(degree);
	const temp = Math.floor(data.main.temp);
	degree.innerHTML = `<span>${temp}<sup>°C</sup></span>`;
	//cria a figure(imagem)
	const figure = document.createElement("figure");
	contentWeather.appendChild(figure);
	//cria a imagem, o atributo src e alt
	const cityIcon = document.createElement("img");
	cityIcon.classList.add("city-icon");
	const src = data.weather[0].icon;
	cityIcon.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${src}.svg`;
	cityIcon.alt = description;
	figure.appendChild(cityIcon);
	//cria o figcaption
	const fig = document.createElement("figcaption");
	fig.classList.add("fig");
	fig.innerHTML = `${description}`;
	figure.appendChild(fig);
	//deixa o input vazio
	city.value = "";
	//preloader none
	preloader.style.display = "none";
}
