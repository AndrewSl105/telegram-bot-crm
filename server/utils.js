export const generateRandomSixDigits = () => {
    let minM = 100000;
    let maxM = 999999;
    return Math.floor(Math
        .random() * (maxM - minM + 1)) + minM;
}

export const generatePassCode = () => {
    const numbers = generateRandomSixDigits()
    return `PASS${numbers}`
}

export const getNewBoardObject = (boardName, passCode, colorStyle) => {
    return (
        {
            environmentName: boardName,
            passCode: passCode,
            style: {
                image: '',
                color: colorStyle
            },
            columns: [
                {
                    name: 'new',
                    items: []
                },
                {
                    name: 'in progress',
                    items: []
                },
                {
                    name: 'resolved',
                    items: []
                },
                {
                    name: 'closed',
                    items: []
                }
            ],
            cards: []
        }
    )
}

export const updateCards = (cards, newCard) => {
    return cards.map((el) => {
        if (el._id.toString() === newCard._id.toString()) {
            el = newCard
        }
        return el
    })
}

export const getBoardListItem = el => {
    return (
        {
            environmentName: el.environmentName,
            passCode: el.passCode,
            style: el.style,
            _id: el._id.toString()
        }
    )
}

export const getBoardsList = (boards) => {
    return boards.map(el => {
        return getBoardListItem(el)
    })
}