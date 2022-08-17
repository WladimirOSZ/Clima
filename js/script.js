document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    clearInfo();

    let input = document.querySelector('#searchInput').value;

    if(input != ''){
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=84c44f24c02bf4824b388e263794d9a6&units=metric&lang=pt_br`
        let results = await fetch(url);
        let json = await results.json();

        console.log(json);
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                climaIcon: json.weather[0].icon,
                climaTexto: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                temp: json.main.temp,
            });
        }
    }
});

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').getElementsByClassName.display = 'none';
}
function showWarning(msg){
    document.querySelector('.aviso').innerHTML=msg;
}

function showInfo(dados){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${dados.name}, ${dados.country}`;
    document.querySelector('.tempInfo').innerHTML = `${dados.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${dados.windSpeed}<span>Km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${dados.climaIcon}@2x.png`);
    document.querySelector('.tempTitulo').innerHTML = `${dados.climaTexto}`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${dados.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}