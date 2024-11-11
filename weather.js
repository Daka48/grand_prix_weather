document.addEventListener('DOMContentLoaded', () => {
    const locations = document.querySelectorAll('.location');

    locations.forEach(location => {
        location.addEventListener('click', () => {
            const lat = location.getAttribute('data-lat');
            const lon = location.getAttribute('data-lon');
            window.open(`weather.html?lat=${lat}&lon=${lon}`, '_blank');
        });
    });
});

const API_KEY = '18e41b5797f0b0eb0d6059dad5730fd5';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('lat');
    const lon = urlParams.get('lon');

    if (lat && lon) {
        fetchWeather(lat, lon);
    } else {
        alert('위치 정보가 없습니다.');
    }
});

function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const place = data.name;
            const description = data.weather[0].description;

            document.querySelector('.temperature').innerText = `기온: ${temp}°C`;
            document.querySelector('.place').innerText = `위치: ${place}`;
            document.querySelector('.description').innerText = `설명: ${description}`;
        })
        .catch(error => {
            console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
            alert('날씨 정보를 불러오지 못했습니다.');
        });
}
