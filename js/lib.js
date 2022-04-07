window.addEventListener("DOMContentLoaded", () => main());

// Book constructor
function Book(title, author, pages, have_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
}

// Adds a book to the display after filling the form
function add_book_to_library() {
    // The library container
    let lib = document.querySelector(".library");
    let book_card;

    // When submitting the form
    let submit_book = document.querySelector("#submit_book");
    submit_book.addEventListener("click", (e) => {
        // Removes all book inside the library
        purge_all_children(lib);

        // Iterates over each book inside the library array
        library.forEach((book, index) => {
            // Creates the book element and sets its class and attribute
            book_card = document.createElement("div");
            book_card.classList.add("book");
            book_card.setAttribute("data_id", `${index}`);

            // For convenience
            let sections = [];

            // Creates each section inside the book element
            // and set its value according to the books inside the array
            let title_section = document.createElement("div");
            title_section.setAttribute("data-title", "");
            title_section.textContent = book.title;
            sections.push(title_section);

            let author_section = document.createElement("div");
            author_section.setAttribute("data-author", "");
            author_section.textContent = book.author;
            sections.push(author_section);

            let pages_section = document.createElement("div");
            pages_section.setAttribute("data-pages", "");
            pages_section.textContent = book.pages;
            sections.push(pages_section);

            let have_read_section = document.createElement("div");
            have_read_section.setAttribute("data-have_read", "");
            have_read_section.textContent = book.have_read;
            sections.push(have_read_section);

            let delete_book_btn = document.createElement("button");
            delete_book_btn.textContent = "Delete book";
            delete_book_btn.classList.add("delete_btn");
            sections.push(delete_book_btn);

            // Attaches all sections to the book element
            sections.forEach((section) => {
                book_card.appendChild(section);
            });

            // Finally, adds the book to the library
            lib.appendChild(book_card);
        });
    });
}

// Controls the functionality of the add_book button and form
function manage_add_book_panel() {
    let add_book_btn = document.querySelectorAll(".add_book_btn");

    let close_add_book_panel_btn = document.querySelectorAll(
        "[data_close_button]"
    );

    // Overlay to cover all the screen while the form is up
    let overlay = document.querySelector("#overlay");

    // Opens the form panel when clicking the add_book button
    add_book_btn.forEach((button) =>
        button.addEventListener("click", () => {
            const panel = document.querySelector("#add_book_panel");

            open_panel(panel);
        })
    );

    // Closes the form panel when clicking the closing button
    close_add_book_panel_btn.forEach((button) =>
        button.addEventListener("click", () => {
            const panel = button.closest(".add_book_panel");
            close_panel(panel);
        })
    );

    // Manages the changes related to the overlay layer
    overlay.addEventListener("click", () => {
        const panels = document.querySelectorAll(".add_book_panel.active");

        panels.forEach((panel) => {
            close_panel(panel);
        });
    });

    get_panel_input();
    toggle_checkbox_label();
}

// Gets the form input for adding a new book
// TODO: Add form validation
function get_panel_input() {
    let form = document.querySelector("#form");

    // Input required for the new book
    let title;
    let author;
    let pages;
    let have_read;

    let submit_book = document.querySelector("#submit_book");

    submit_book.addEventListener("click", (e) => {
        // Stop the buttom from actually submitting and reloading the page
        e.preventDefault();

        // Collects the inputs
        let book_data = new FormData(form);
        title = book_data.get("title");
        author = book_data.get("author");
        pages = book_data.get("pages");

        let checkbox = document.querySelector("#book_have_read");

        checkbox.checked ? (have_read = true) : (have_read = false);

        // Creates a new Book object based on the user inputs
        let book = new Book(title, author, pages, have_read);

        // Adds the book to the library array
        library.push(book);

        // Closes the panel afterwards
        const panel = document.querySelector(".add_book_panel");
        close_panel(panel);
    });
}

// Opens the add_book form panel
function open_panel(panel) {
    if (panel == null) return;

    panel.classList.add("active");
    overlay.classList.add("active");
}

// Closes the add_book form panel
function close_panel(panel) {
    if (panel == null) return;

    panel.classList.remove("active");
    overlay.classList.remove("active");
}

// Removes all children from a parent element
function purge_all_children(parent) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
}

// Constrols the functionality of the "delete book" button
function manage_delete_book_buttons() {
    // Characteristics to be observed
    const characteristic = {
        childList: true,
    };

    // Function to be executed when a change is observed
    const when_changed = function (mutation_list) {
        let dlt_btns = document.querySelectorAll(".delete_btn");

        dlt_btns.forEach((dlt_btn) => {
            dlt_btn.addEventListener("click", delete_book);
        });
    };

    // New observer based on the parameters above
    const observer = new MutationObserver(when_changed);

    let lib = document.querySelector(".library");

    // Watch for when books are added or removed from the library
    observer.observe(lib, characteristic);
}

// Deletes the book from the library
function delete_book(e) {
    // The book of which the delete button was clicked
    const book = e.target.parentElement;
    // This book data_id attribute, which is also its index in the library array
    const book_index = book.getAttribute("data_id");

    // Remove the book from the library array
    library.splice(book_index, 1);

    // Remove the book from the display
    book.remove();

    // Shifts the value of the data_id attribute
    // when one of the books is deleted, as to not leave any gaps
    const lib_books = document.querySelectorAll(".book");
    lib_books.forEach((lib_book, index) => {
        lib_book.setAttribute("data_id", index);
    });
}

// The library array, containing all Book objects
let library = [];
function main() {
    manage_add_book_panel();

    add_book_to_library();

    manage_delete_book_buttons();
}

function toggle_checkbox_label() {
    const read_input = document.querySelector("#book_have_read");
    const read_label = document.querySelector(".label_ckbox");

    read_input.addEventListener("change", () => {
        if (read_input.checked) {
            read_label.setAttribute(
                "style",
                "color: green; background: rgb(176, 235, 161)"
            );
            read_label.textContent = "Yes";
            return;
        }

        read_label.setAttribute(
            "style",
            "color: red; background: rgb(235, 176, 161)"
        );
        read_label.textContent = "No";
    });
}
