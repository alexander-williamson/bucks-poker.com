let a = {
    '1': '1',
    '2': '',
    '3': '',
    '4': '3',
    '5': '1',
    '6': '1',
    '7': '',
    '8': '6',
    '9': '3',
    '10': '8',
    '11': '',
    '12': '',
    Year: '2015',
    Person: 'Richard'
};

let b = {
    '1': '1',
    '2': '',
    '3': '',
    '4': '3',
    '5': '1',
    '6': '1',
    '7': '',
    '8': '6',
    '9': '3',
    '10': '8',
    '11': '',
    '12': '',
    Year: '2015',
    Person: 'Richard'
}

const result = [a, b].reduce((result, item) => {
    const keys = Object.keys(item).filter(key => item[key].length > 0)
    return new Set([...result, ...keys])
}, [])

console.debug(result);