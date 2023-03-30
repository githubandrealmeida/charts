Chart.defaults.color = "#fff";
Chart.defaults.borderColor = "#444";

const printCharts = () => {
  fetchUsersData((src = "./data.json"), (src = "./data.json")).then(
    ([allUsers, nationalUsers]) => {
      renderModelsChart(allUsers);
      renderFeaturesChart(nationalUsers);
      renderYearsChart(allUsers);
      enableEventHandlers(nationalUsers);
    }
  );
};

const renderModelsChart = (Users) => {
  const uniqueModels = [...new Set(Users.map((User) => User.nombre))];

  const data = {
    labels: uniqueModels,
    datasets: [
      {
        data: uniqueModels.map(
          (currentModel) =>
            Users.filter((User) => User.nombre === currentModel).length
        ),
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20),
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "left" },
    },
  };

  new Chart("modelsChart", { type: "doughnut", data, options });
};

const renderFeaturesChart = (users) => {
  const data = {
    labels: users.map((user) => user.nombre),
    datasets: [
      {
        label: "Altura",
        data: users.map((user) => user.peso),
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20),
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        ticks: { display: false },
      },
    },
  };

  new Chart("featuresChart", { type: "bar", data, options });
};

const renderYearsChart = (Users) => {
  const years = [
    "1998-2000",
    "2001-2003",
    "2004-2006",
    "2007-2009",
    "2013-2015",
    "2016-2018",
    "2019-2021",
  ];

  const data = {
    labels: years,
    datasets: [
      {
        data: getUsersByYear(Users, years),
        tension: 0.5,
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20),
        fill: true,
        pointBorderWidth: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
  };

  new Chart("yearsChart", { type: "line", data, options });
};

printCharts();
