function fetchNeighbors(country) {
    let promises = [];
    country.borders.forEach((border) => {
        promises.push(
            fetch(`https://restcountries.com/v2/alpha/${border}`).then(
                (response) => response.json(),
            ),
        );
    });
    return Promise.all(promises);
}

function generateCard(country) {
    const defaultCard = document.getElementById('defaultCard');

    let generatedCard = defaultCard.cloneNode(true);

    generatedCard.style.display = '';
    generatedCard.id = '';

    if (!country) {
        document.getElementById('neighborsH1').style.display = 'none';
        generatedCard.children[0].setAttribute('src', '../assets/404.webp');
        generatedCard.children[1].children[0].innerHTML = '404';
        generatedCard.children[1].children[1].innerHTML =
            'Ops!.. Country not found';
        return generatedCard;
    }

    const compactPopulation = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(country.population);

    generatedCard.children[0].setAttribute('src', country.flag);
    generatedCard.children[1].children[0].innerHTML = country.name;
    generatedCard.children[1].children[1].innerHTML = country.region;
    generatedCard.children[1].children[2].innerHTML = `🧑‍🤝‍🧑 Population ${compactPopulation}`;
    generatedCard.children[1].children[3].innerHTML = `🗣️ Language ${country.languages[0].name}`;
    generatedCard.children[1].children[4].innerHTML = `💰 Currency ${country.currencies[0].name}`;

    return generatedCard;
}

function populateMainRow(country) {
    const mainRow = document.getElementById('mainRow');
    mainRow.appendChild(generateCard(country));
}

function populateNeighborsRow(countries) {
    const defaultCard = document.getElementById('defaultCard');
    const neighborsRow = document.getElementById('neighborsRow');

    document.getElementById('neighborsH1').style.display = '';

    countries.forEach((country) =>
        neighborsRow.appendChild(generateCard(country)),
    );
}

function getInfo() {
    const input = document.getElementById('search');

    document.getElementById('mainRow').innerHTML = '';
    document.getElementById('neighborsRow').innerHTML = '';
    document.getElementById('countryH1').style.display = '';

    if (!input.value || !input.value.trim()) {
        document.getElementById('neighborsH1').style.display = 'none';
        input.value = '';
        populateMainRow(null);
        return;
    }

    fetch(`https://restcountries.com/v2/name/${input.value}`)
        .then((response) => response.json())
        .then(([response]) => {
            populateMainRow(response);
            return fetchNeighbors(response);
        })
        .then((response) => populateNeighborsRow(response))
        .catch((err) => populateMainRow(null));

    input.value = '';
}
