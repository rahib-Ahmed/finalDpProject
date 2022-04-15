
getChartData()

generateChart()


var uniqueYears;



async function getCountrSales(data, countryName) {
  var countrySale = []
  for(var i = 0; i<data.length;i++) {
    var temp = {
      sale: data[i][`${countryName}`],
      gameName: data[i].Name
    }
    countrySale.push(temp)
  }
return countrySale;
}


async function getChartData() {

    // const years = [];
    var highestCritcGameArr = [];
    var naSale = []
    // console.log("x="+x+"y="+y)
    await fetch(`http://localhost:8080/grim`, {})
        .then(res => res.json())
        .then(async (response) => {

            // for unique years

            // for (let i = 0; i < response.length; i++) {
            //     years.push(response[i].Year)
            // }
            // uniqueYears = [...new Set(years)]

            // NA SALES
            const naSale = await getCountrSales(response, 'NA_Sales')
            const japSale = await getCountrSales(response, 'JP_Sales')
            const palSale = await getCountrSales(response, 'PAL_Sales')
            
            // highest crit score
            const highestCritByGame = []

            for (var i = 0; i < response.length; i++) {
                var temp = {
                    i: i,
                    gameName: response[i].Name,
                    crtiScore: response[i].Critic_Score
                }
                highestCritByGame.push(temp)

            }

            for (let i = 0; i < highestCritByGame.length; i++) {
                if (highestCritByGame[i].crtiScore > 9.9) {
                    var temp = {
                        criticScore: highestCritByGame[i].crtiScore,
                        gameName: highestCritByGame[i].gameName
                    }
                    highestCritcGameArr.push(temp)
                }
            }

        })

    const obj = {
        uniqueYears: uniqueYears,
        highestCrit: highestCritcGameArr
    }

    return obj
}

async function generateChart() {
    var ctx = document
        .getElementById('myChart')
        .getContext('2d');
    // const year = (await getChartData()).uniqueYears
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["year.sort()", "212"],
            datasets: [
                {
                    label: 'NA SALES FOR GAMES',
                    data: [
                        100,
                        103.5,
                        107.2,
                        110.3,
                        115.4,
                        120.9,
                        126.3,
                        131.5
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 4
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 90
                        }
                    }
                ]
            }
        }
    });

    var ctx = document
        .getElementById('myChart1')
        .getContext('2d');
    const score = (await getChartData()).highestCrit

    var critScoreArr = []
    for (let i = 0; i < score.length; i++) {
        critScoreArr.push(score[i].criticScore)
    }
    var gameName = []
    for (let i = 0; i < score.length; i++) {
        gameName.push(score[i].gameName)
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: gameName,
            datasets: [
                {
                    label: 'Critic Score for Game',
                    data: critScoreArr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 4
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 90
                        }
                    }
                ]
            }
        }
    });

}
