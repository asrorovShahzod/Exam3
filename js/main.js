const elModal = document.querySelector("#add-parrot-modal")
const elBtnModal = elModal.querySelector(".btn__modal")
const elTempolate = document.querySelector(".tempolate")
const favouriteTempolate = document.querySelector(".favourite")
var myEditModal = new bootstrap.Modal(document.getElementById('edit-parrot-modal'))
const removeFav = document.getElementById("remove")
const elWrapper = document.querySelector(".parrots-wrapper")
const favWrapper = document.querySelector("#favorite")
const editModal = document.querySelector("#edit-parrot-modal")
var myModal = new bootstrap.Modal(document.getElementById('add-parrot-modal'))





const elAddElementForm = document.querySelector(".form__element")
const elementFav = element => {
    const { title } = element
    const elElementRow = favouriteTempolate.cloneNode(true).content;
    const elTitleElement = elElementRow.querySelector(".card-title")
    elTitleElement.textContent = title;
    return elElementRow

}
const renderlFav = (el) => {
    favWrapper.innerHTML = ""
    favorites.forEach(element => {
        const elElementtRow = elementFav(element);
        favWrapper.append(elElementtRow);
    })

}
renderlFav();

const elementRow = element => {

    const { id, title, img, price, birthDate, sizes, isFavorite, features } = element

    const elElementRow = elTempolate.cloneNode(true).content;


    const elImageElement = elElementRow.querySelector(".card-img-top")
    elImageElement.src = img;


    const elTitleElement = elElementRow.querySelector(".card-title")
    elTitleElement.textContent = title;

    const elPriceElement = elElementRow.querySelector(".mark__element")
    elPriceElement.textContent = `${price} $`;

    const elwidthHeightElement = elElementRow.querySelector(".badge")
    elwidthHeightElement.textContent = `${sizes.width}x${sizes.height}`;

    const elDateElement = elElementRow.querySelector(".card-date")
    elDateElement.textContent = birthDate;

    const elBtnDelete = elElementRow.querySelector(".btn-danger")
    elBtnDelete.dataset.id = id

    const elFavorite = elElementRow.querySelector(".btn-success")
    elFavorite.dataset.id = id


    const elBtnEdit = elElementRow.querySelector(".btn-secondary")
    elBtnEdit.dataset.id = id

    const elBtnFavorite = elElementRow.querySelector(".check")
    if (isFavorite == true) {
        elBtnFavorite.classList.remove('fa-star-o');
        elBtnFavorite.classList.add('fa-star');
    } else {
        elBtnFavorite.classList.add('fa-star-o');
        elBtnFavorite.classList.remove('fa-star');
    }


    const elFeatureElement = elElementRow.querySelector(".feature")
    let arrayFeature = features.split(',');
    let newElFeatureElement = '';





    arrayFeature.forEach(ellement => {
        newElFeatureElement += '<li class="badge bg-primary me-1 mb-1">' + ellement + '</li>'
    })
    elFeatureElement.innerHTML = newElFeatureElement


    return elElementRow
}

const renderElements = (el) => {
    elWrapper.innerHTML = ""
    if (el) {
        el.forEach(element => {
            const elElementtRow = elementRow(element);
            elWrapper.append(elElementtRow);
        })
    } else {
        products.forEach(element => {
            const elElementtRow = elementRow(element);
            elWrapper.append(elElementtRow);
        })
    }
}
renderElements()




elAddElementForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        const formElements = evt.target.elements
        const titleInputVAlue = formElements.parrot__title.value.trim();
        const imageInputValue = formElements.parrot__img.value.trim();
        const priceInputVAlue = +formElements.price.value.trim();
        const parrotDateInputVAlue = formElements.parrot__date.value.trim();
        const parrotWidthInputVAlue = +formElements.parrot__width.value.trim();
        const parrotHeightInputVAlue = +formElements.parrot__height.value.trim();
        const featuresInputVAlue = formElements.features.value.trim();
        if (titleInputVAlue && imageInputValue && priceInputVAlue > 0 && parrotDateInputVAlue && parrotWidthInputVAlue > 0 && parrotHeightInputVAlue > 0 && featuresInputVAlue) {
            const addingElement = {
                id: Math.floor(Math.random() * 1000),
                title: titleInputVAlue,
                img: imageInputValue,
                price: priceInputVAlue,
                birthDate: parrotDateInputVAlue,
                sizes: {
                    width: parrotWidthInputVAlue,
                    height: parrotHeightInputVAlue
                },
                isFavorite: false,
                features: featuresInputVAlue,
            };
            products.push(addingElement)
            renderElements()
            myModal.hide()


        }
        console.log(products);

    })
    // const elBtnDelete = document.querySelector(".")

elWrapper.addEventListener("click", (evt) => {

    if (evt.target.matches(".btn-danger")) {

        const clickedBtnId = +evt.target.dataset.id
        const clickedBtnIndex = products.findIndex((element) => {
            return element.id === clickedBtnId
        })
        products.splice(clickedBtnIndex, 1)
        renderElements()
    }
    if (evt.target.matches(".btn-secondary")) {

        myEditModal.show()


        const clickedBtnId = +evt.target.dataset.id

        const clickedBtnIndex = products.find((element) => {

            return element.id === clickedBtnId
        })
        const formElements = document.querySelector("#edit-parrot-modal")
        let titleInputVAlue = formElements.querySelector("#parrot__title");
        let imageInputValue = formElements.querySelector("#parrot__img");
        let priceInputVAlue = formElements.querySelector("#price");
        let parrotDateInputVAlue = formElements.querySelector("#parrot__date");
        let parrotWidthInputVAlue = formElements.querySelector("#parrot__width");
        let parrotHeightInputVAlue = formElements.querySelector("#parrot__height");
        let featuresInputVAlue = formElements.querySelector("#features");
        let idInputVAlue = formElements.querySelector('#id');

        titleInputVAlue.value = clickedBtnIndex.title
        imageInputValue.value = clickedBtnIndex.img
        priceInputVAlue.value = clickedBtnIndex.price
        parrotDateInputVAlue.value = clickedBtnIndex.birthDate
        parrotWidthInputVAlue.value = clickedBtnIndex.sizes.height
        parrotHeightInputVAlue.value = clickedBtnIndex.sizes.width
        featuresInputVAlue.value = clickedBtnIndex.features
        idInputVAlue.value = clickedBtnIndex.id

        // products.splice(clickedBtnIndex, 1)
        // renderElements()
    }
    if (evt.target.matches(".btn-success")) {
        const clickedBtnId = +evt.target.dataset.id
        const clickedBtnIndex = products.find((element) => {
            return element.id == clickedBtnId
        })
        if (clickedBtnIndex.isFavorite == false) {
            // const addingElement = {
            //     id: clickedBtnIndex.id,
            //     title: clickedBtnIndex.title,
            //     img: clickedBtnIndex.img,
            //     price: clickedBtnIndex.price,
            //     birthDate: clickedBtnIndex.birthDate,
            //     sizes: {
            //         width: clickedBtnIndex.sizes,
            //         height: clickedBtnIndex.height
            //     },
            //     isFavorite: clickedBtnIndex.isFavorite,
            //     features: clickedBtnIndex,
            // };
            favorites.push(clickedBtnIndex)
            renderlFav()
            clickedBtnIndex.isFavorite = true;
        } else {
            let myIndex = favorites.findIndex(element => element.id == clickedBtnIndex.id)
            favorites.splice(myIndex, 1);
            renderlFav()
            clickedBtnIndex.isFavorite = false;
        }
        console.log(favorites);

        renderElements()
            // console.log(clickedBtnId);
    }
})


editModal.addEventListener('submit', (el) => {
    el.preventDefault();


    const formElements = el.target.elements
    const titleInputVAlue = formElements.parrot__title.value.trim();
    const imageInputValue = formElements.parrot__img.value.trim();
    const priceInputVAlue = +formElements.price.value.trim();
    const parrotDateInputVAlue = formElements.parrot__date.value.trim();
    const parrotWidthInputVAlue = +formElements.parrot__width.value.trim();
    const parrotHeightInputVAlue = +formElements.parrot__height.value.trim();
    const featuresInputVAlue = formElements.features.value.trim();
    const idInputVAlue = formElements.id.value.trim();

    let clickedBtnIndex = products.find((element) => {

        return element.id == idInputVAlue
    })

    console.log(clickedBtnIndex);
    clickedBtnIndex.title = titleInputVAlue;
    clickedBtnIndex.img = imageInputValue;
    clickedBtnIndex.price = priceInputVAlue;
    clickedBtnIndex.birthDate = parrotDateInputVAlue;
    clickedBtnIndex.sizes.width = parrotWidthInputVAlue;
    clickedBtnIndex.sizes.height = parrotHeightInputVAlue;
    clickedBtnIndex.features = featuresInputVAlue;

    renderElements()
    myEditModal.hide()


})
const filter = document.querySelector('.filter__form');
filter.addEventListener('submit', (el) => {
    el.preventDefault();
    const formElements = el.target.elements
    const searchInputVAlue = formElements.search.value.trim();
    const fromInputValue = formElements.from.value.trim();
    const toInputVAlue = +formElements.to.value.trim();
    const fromWidthInputVAlue = formElements.from_width.value.trim();
    const toWidthInputVAlue = formElements.to_width.value.trim();
    const fromHeightInputVAlue = +formElements.from_height.value.trim();
    const toHeightInputVAlue = +formElements.to_height.value.trim();
    // const idInputVAlue = formElements.id.value.trim();
    if (searchInputVAlue || fromInputValue || toInputVAlue || fromWidthInputVAlue || toWidthInputVAlue || fromHeightInputVAlue || toHeightInputVAlue) {
        const result = products.filter(function(e) {
            return e.title.toLowerCase() == searchInputVAlue.toLowerCase();
        });

        renderElements(result);
    } else {
        renderElements();
    }




})
removeFav.addEventListener('click', (el) => {
    favorites.splice(0, favorites.length);
    renderlFav();
    products.forEach((el) => {
        el.isFavorite = false;
    });
    renderElements();
});