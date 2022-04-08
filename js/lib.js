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
            author_section.textContent = `By ${book.author}`;
            sections.push(author_section);

            let pages_section = document.createElement("div");
            pages_section.setAttribute("data-pages", "");
            pages_section.textContent = `${book.pages} pages`;
            sections.push(pages_section);

            let have_read_section = document.createElement("button");
            have_read_section.setAttribute("data-have_read", "");
            have_read_section.classList.add("read_stat_btn");

            if (book.have_read === true) {
                have_read_section.textContent = "Already read";
                have_read_section.classList.add("read");
            } else {
                have_read_section.textContent = "Yet to read";
                have_read_section.classList.add("readnt");
            }
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

            // Prevents the user from selecting a negative or too big number of pages
            const pg_number = document.querySelector("#book_pages");
            pg_number.addEventListener("change", () => {
                pg_number.value < 0
                    ? (pg_number.value = 0)
                    : (pg_number.value = pg_number.value);

                pg_number.value > 100000
                    ? (pg_number.value = 100000)
                    : (pg_number.value = pg_number.value);
            });

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
// TODO: If the input is long enough, the text overflows
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

        // Checks for empty input
        title = book_data.get("title").trim();
        if (!title) {
            alert("Invalid book title");
            return false;
        }

        // Checks for empty input
        author = book_data.get("author").trim();
        if (!author) {
            alert("Invalid book author");
            return false;
        }

        // Checks for invalid input
        pages = book_data.get("pages");
        if (!pages || isNaN(pages) || pages < 0 || pages > 100000) {
            alert("Invalid number of pages");
            return false;
        }

        let checkbox = document.querySelector("#book_have_read");

        checkbox.checked ? (have_read = true) : (have_read = false);

        // Creates a new Book object based on the user inputs
        let book = new Book(title, author, pages, have_read);

        // Adds the book to the library array
        library.push(book);

        // Resets the input fields
        let form_inputs = document.querySelectorAll("input");
        form_inputs.forEach((input) => {
            input.value = "";
        });

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

// Controls the label for the have_read input
function toggle_checkbox_label() {
    // The input and the label
    const read_input = document.querySelector("#book_have_read");
    const read_label = document.querySelector(".label_ckbox");

    // When the input is toggled, change the colors and text
    // depending on wheter it's checked or not
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

function manage_btns(buttons, event, callback, parent_element) {
    // Characteristics to be observed
    const characteristic = {
        childList: true,
    };

    // Function to be executed when a change is observed
    const when_changed = function (mutation_list) {
        let btns = document.querySelectorAll(`${buttons}`);

        btns.forEach((btn) => {
            btn.addEventListener(`${event}`, callback);
        });
    };

    // New observer based on the parameters above
    const observer = new MutationObserver(when_changed);

    let par = document.querySelector(`${parent_element}`);

    // Watch for when children are added or removed from the parent
    observer.observe(par, characteristic);
}

// When the button is clicked, the read status of the book is toggled
function toggle_read_stat(e) {
    // The button clicked and its parent element (the book)
    const target = e.target;
    const book_index = target.parentElement.getAttribute("data_id");
    let already_read = library[book_index].have_read;

    // If it is already read, set it to not read yet and vice versa
    // also changes the Book obj
    if (target.textContent === "Already read" && already_read === true) {
        target.classList.remove("read");
        target.classList.add("readnt");
        target.textContent = "Yet to read";
        library[book_index].have_read = false;
    } else {
        target.classList.remove("readnt");
        target.classList.add("read");
        target.textContent = "Already read";
        library[book_index].have_read = true;
    }
}

// Controls the functionality of the "delete book" button
function manage_delete_book_buttons() {
    manage_btns(".delete_btn", "click", delete_book, ".library");
}

function manage_toggle_read_stat_buttons() {
    manage_btns(".read_stat_btn", "click", toggle_read_stat, ".library");
}

// The library array, containing all Book objects
let library = [];
function main() {
    manage_add_book_panel();

    add_book_to_library();

    manage_delete_book_buttons();

    manage_toggle_read_stat_buttons();
}
