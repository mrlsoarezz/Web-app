let main_temp = {
    current: "", 
    time: "",
    description: ""
}

function main() {
    const input = document.querySelector("input")
    const button = document.querySelector("button")

    getResult(input, button)
}

function getResult(input, btn) {
    btn.addEventListener("click", () => {
       queryWeather(input.value)
    })
}

function queryWeather(query) {
    const container = document.querySelector(".Display-Info")
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=8F8NW7EUKYKB9KAV9242E2EFW`)
    .then(async (result) => {
        if (result.status == 400) { endError(container) }
        response = await result.json()
        main_temp.current = response.currentConditions.temp
        main_temp.time = response.currentConditions.datetime
        main_temp.description = response.description
        showInfo(query, main_temp, container)
    })
}

function showInfo(query, info, container) {
    
    const box = document.createElement("div")
    box.className = "Container"

    const imageDiv = document.createElement('div');
    imageDiv.className = 'Image';
    const img = document.createElement('img');
    img.src = '/img/weather.gif';
    imageDiv.appendChild(img);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'Title';
    const h2 = document.createElement('h2');
    h2.textContent = query;
    const pDesc = document.createElement('p');
    pDesc.textContent = info.description;
    titleDiv.appendChild(h2);
    titleDiv.appendChild(pDesc);

    const pWeather = document.createElement('p');
    pWeather.textContent = 'Weather: ' + info.current;

    const pTime = document.createElement('p');
    pTime.textContent = 'Time: ' + info.time;

    box.appendChild(imageDiv);
    box.appendChild(titleDiv);
    box.appendChild(pWeather);
    box.appendChild(pTime);

    container.append(box);
    console.log(info.current, info.time, info.description)
}

function endError(container) {
    let h3 = document.createElement("h3")
    h3.textContent = "The location was not found!"
    container.append(h3)
}

main()
