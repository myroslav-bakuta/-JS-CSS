let fruits = [
    {
        id: 1,
        title: 'Яблуки',
        price: 20,
        img:
            'https://favoritekherson.co/uploads/posts/2018-10/1539171899_1.jpg',
    },
    {
        id: 2,
        title: 'Апельсини',
        price: 30,
        img:
            'https://images.unian.net/photos/2018_02/thumb_files/1000_545_1517496734-8689.jpg',
    },
    {
        id: 3,
        title: 'Манго',
        price: 40,
        img:
            'https://rs.img.com.ua/crop?v2=1&w=600&h=0&url=%2F%2Fv.img.com.ua%2Fb%2Forig%2F1%2Faa%2Fccc6e1ea39d04ba42665a596ad849aa1.jpg',
    },
]

const toHTML = (fruit) => `
                <div class="col">
                    <div class="card">
                        <img
                            src="${fruit.img}"
                            class="card-img-top"
                            style="height: 200px"
                            alt="${fruit.title}"/>
                        <div class="card-body">
                            <h5 class="card-title">${fruit.title}</h5>
                            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Подивитися ціну</a>
                            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Видалити</a>
                        </div>
                    </div>
                </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Ціна на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Закрити вікно',
            type: 'primary',
            handler() {
                priceModal.close()
            },
        },
    ],
})

document.addEventListener('click', (event) => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find((f) => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Ціна на ${fruit.title}: <strong>${fruit.price}₴</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Ви впевнені?',
            content: `<p>Ви видаляєте фрукт: <strong>${fruit.title}</strong></p>`,
        })
            .then(() => {
                fruits = fruits.filter((f) => f.id !== id)
                render()
            })
            .catch(() => {
                console.log('Cancel')
            })
    }
})
