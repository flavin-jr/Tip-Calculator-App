const form = document.querySelector('form')
const resetButton = document.querySelector('button')
const tipAmountElement = document.querySelector('.tip-amount-result')
const totalElement = document.querySelector('.totalamount-result')
const inputNumberDivs = document.querySelectorAll('.input-namber-label')
const billInput = document.querySelector('#bill')
const numberOfPeopleInput = document.querySelector('#number-of-people')
const getTip = (percent) => Number(percent.slice(0, -1)) / 100

const validateInput = (numberField) => {
    if (numberField === 0) {
        return false
    }
    return true
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {}
    const fields = e.target.querySelectorAll('input[type ="number"], input[type="radio"]:checked')

    for (const field of fields) {
        if (field.type === 'radio') {
            data['tip'] = field.labels[0].innerText

        }
        else {

            data[field.id] = field.value
        }
    }
    let tip = 0
    let tipAmountPerson = 0
    console.log(data['number-of-people'] == 0)
    if (!validateInput(parseInt(data['bill']))) {
        console.log('entrei aqui')
    }
    if (!validateInput(parseInt(data['number-of-people']))) {
        const spanError = numberOfPeopleInput.parentNode.parentNode.children[0].children[1]
        spanError.classList.add('error-msg')
        numberOfPeopleInput.parentNode.classList.add('error-box')
        console.log(spanError)
        return
    }


    if (Object.keys(data).length < 4) {
        console.log("entrei no custom")
        if (data['custom'] !== '' && data['custom'] != 0) {
            console.log("entrei no custom 2")
            tip = parseInt(data["custom"]) / 100
            tipAmountPerson = data['bill'] * tip / data['number-of-people']

            console.log(tip)
        }
        else {
            tipAmountPerson = 0
        }
    }
    else {
        tip = getTip(data['tip'])
        tipAmountPerson = data['bill'] * tip / data['number-of-people']
    }


    let amountPerson = data['bill'] / data['number-of-people'] + tipAmountPerson
    tipAmountPerson = isNaN(tipAmountPerson) ? 0 : tipAmountPerson
    amountPerson = isNaN(amountPerson) ? 0 : amountPerson
    console.log(amountPerson)
    console.log(totalElement)
    tipAmountElement.innerText = `$${tipAmountPerson.toFixed(2)}`
    totalElement.innerText = `$${amountPerson.toFixed(2)}`
})









