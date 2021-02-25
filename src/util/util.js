
export const isValueEqual = (firstInput, secondInput) => {
    if (firstInput === secondInput)
        return true
}


export const roundNumber = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100
}


export const productExist = (array, value) => {
   
    return array.some((object) => {
        return object.product === value;
    })
}

export const dateNow = () => {
    const today = Date.now();
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today)
}

export const totalAmount = (array) => {
    return array
    .map(items => items.total_price)
    .reduce((prev, curr) => prev + curr, 0)
}

export const totalItems = (array) => {
    return array
    .map(items => items.quantity)
    .reduce((prev, curr) => prev + curr, 0)
}


