function rankTeams(data) {
    var teams = [...data];
    teams.sort((a, b) => {
        if (a.points != b.points) {
            return b.points - a.points;
        } else if (a.GD != b.GD) {
            return b.GD - a.GD;
        } else {
            return b.name - a.name;
        }
    })

    for (let i = 0; i < data.length; i++) {
        data[i].position = teams.indexOf(data[i]) + 1;
    }
    console.log(data);
}

var data = [{
        name: 'Asernal',
        points: 99,
        GD: 45
    },
    {
        name: 'Chelsea',
        points: 75,
        GD: 39
    },
    {
        name: 'Manchester United',
        points: 60,
        GD: 29
    },
    {
        name: 'Liverpool',
        points: 88,
        GD: 39
    }
];

rankTeams(data);