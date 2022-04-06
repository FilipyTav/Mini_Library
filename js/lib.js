window.addEventListener("DOMContentLoaded", () => main());

function Book(title, author, pages, have_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
}

function add_book_to_library() {
    let lib = document.querySelector(".library");
    let book_card;

    let submit_book = document.querySelector("#submit_book");
    submit_book.addEventListener("click", (e) => {
        purge_all_children(lib);

        library.forEach((book, index) => {
            book_card = document.createElement("div");
            book_card.classList.add("book");
            book_card.setAttribute("data_id", `${index}`);

            let sections = [];

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
            sections.push(delete_book_btn);

            sections.forEach((section) => {
                book_card.appendChild(section);
            });

            lib.appendChild(book_card);
        });
    });
}

let library = [];
function main() {
    manage_add_book_panel();

    add_book_to_library();
}

function manage_add_book_panel() {
    let add_book_btn = document.querySelectorAll(".add_book_btn");

    let close_add_book_panel_btn = document.querySelectorAll(
        "[data_close_button]"
    );

    let overlay = document.querySelector("#overlay");

    add_book_btn.forEach((button) =>
        button.addEventListener("click", () => {
            const panel = document.querySelector("#add_book_panel");
            open_panel(panel);
        })
    );

    close_add_book_panel_btn.forEach((button) =>
        button.addEventListener("click", () => {
            const panel = button.closest(".add_book_panel");
            close_panel(panel);
        })
    );

    overlay.addEventListener("click", () => {
        const panels = document.querySelectorAll(".add_book_panel.active");

        panels.forEach((panel) => {
            close_panel(panel);
        });
    });

    get_panel_input();
}

// Gets the form input for adding a new book
// TODO: Add form validation
function get_panel_input() {
    let form = document.querySelector("#form");
    let title;
    let author;
    let pages;
    let have_read;

    let submit_book = document.querySelector("#submit_book");

    submit_book.addEventListener("click", (e) => {
        e.preventDefault();

        let book_data = new FormData(form);
        title = book_data.get("title");
        author = book_data.get("author");
        pages = book_data.get("pages");

        let checkbox = document.querySelector("#book_have_read");

        checkbox.checked ? (have_read = true) : (have_read = false);

        let book = new Book(title, author, pages, have_read);
        library.push(book);

        const panel = document.querySelector(".add_book_panel");
        close_panel(panel);
    });
}

function open_panel(panel) {
    if (panel == null) return;

    panel.classList.add("active");
    overlay.classList.add("active");
}

function close_panel(panel) {
    if (panel == null) return;

    panel.classList.remove("active");
    overlay.classList.remove("active");
}

function purge_all_children(parent) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
}
