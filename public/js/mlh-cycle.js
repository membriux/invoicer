
let dateString = $('#initDate').text()
let initialDate = new Date(dateString)
let type = $('#interval').text()
let cycleInput = $('#cycle')
let cycleInitText = $('.cycleInit')
let cycleEndText = $('.cycleEnd')
let current = $('#currentCycleText')


function monthDiff() {
    var months;
    let now = new Date()
    months = (now.getFullYear() - initialDate.getFullYear()) * 12;
    months -= initialDate.getMonth();
    months += now.getMonth() + 1;

    return months;
}

function getCycleRange(cycle) {
    let initCycle = new Date(initialDate)
    let newMonth = initCycle.getMonth() + parseInt(cycle)

    console.log(newMonth)
    initCycle.setMonth(newMonth)

    let endCycle = new Date(initCycle)
    endCycle.setMonth(initCycle.getMonth() + 1)

    cycleInitText.text(initCycle.toString().slice(0, 16))
    cycleInitText.val(`${initCycle.toString().slice(0, 16)}`)

    cycleEndText.text(endCycle.toString().slice(0, 16))
    cycleEndText.val(`${endCycle.toString().slice(0, 15)}`)

}

function updateCycleText(cycle) {
    cycleInput.val(cycle)
    current.text(`${cycle}`)
    getCycleRange(cycle)
}

function onCycleChange() {
    let cycle = $('#cycle').val()
    updateCycleText(cycle)
}

function refresh() {

    setTimeout(function () {
        $('iframe').attr('src', 'invoice.pdf');
        console.log('generated')
    }, 1500)
}

function setup() {
    let currentCycle = monthDiff()
    cycleInput.attr('max', currentCycle)
    updateCycleText(currentCycle)
}

setup()