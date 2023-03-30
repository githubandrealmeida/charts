const enableEventHandlers = Users => {

    document.querySelector('#featuresOptions').onchange = e => {

        const { value: property, text: label } = e.target.selectedOptions[0]

        const newData = Users.map(User => User[property])

        updateChartData('featuresChart', newData, label)
    }
}