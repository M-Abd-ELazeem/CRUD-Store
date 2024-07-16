var bookmarkInput = document.getElementById('bookmarkname');
var urlInput = document.getElementById('bookmarkurl');
var clseBtn = document.getElementById("clseBtn");
var lightboxContainer = document.querySelector('.lightbox-container')
var closeBtn = document.getElementById('closeBtn')
var booksContainer = [];


if (localStorage.getItem('bookmarks') !== null) {
    booksContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displayBook();
}

function addBook() {
    if (validateInputs(bookmarkname) && validateInputs(bookmarkurl)) {
        var books = {
            name: bookmarkInput.value,
            url: urlInput.value,
        }
        booksContainer.push(books);
        clearForm();
        displayBook();
        localStorage.setItem('bookmarks', JSON.stringify(booksContainer));

    }
    else {
        lightboxContainer.classList.replace('d-none', 'd-flex');
    }

}


function clearForm() {
    bookmarkInput.value = null
    urlInput.value = null

}

function displayBook() {

    var cartona = ``;
    for (var i = 0; i < booksContainer.length; i++) {
        cartona += ` <tr>
        <td>${i + 1}</td>
        <td>${booksContainer[i].name}</td>
    <td><button id="linkButton" onclick="closeBtn${booksContainer[i].url}()" class="btn btn-visit p-2"><i class="fa-regular fa-eye"></i> <a href="${booksContainer[i].url}" target="_blank" class=" text-white link-underline link-underline-opacity-0"> visit</a>
    </button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-delete p-2"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
   
        
        </tr>`;
    }
    document.getElementById('tableContent').innerHTML = cartona;
}

function deleteProduct(deleteIndex) {
    booksContainer.splice(deleteIndex, 1);
    displayBook();
    localStorage.setItem('bookmarks', JSON.stringify(booksContainer));


}

function validateInputs(element) {
    regex = {
        bookmarkname: /^(?=.*\b\w{3,}\b)(?=.*\b\w{3,}\b).+/,
        bookmarkurl: /^(https?:\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?)$/,
    }

    if (regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');

        return false;
    }
}

function closeSlider() {
    lightboxContainer.classList.replace('d-flex', 'd-none');

}
closeBtn.addEventListener("click", closeSlider);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeSlider();
    }
});

