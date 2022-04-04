window.addEventListener("DOMContentLoaded", () => main());

function Book(title, author, pages, have_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
}

function add_book_to_library() {}

function main() {
    let library = [];
    //  Button.addEventListener("click", (e) => add_book_to_library(e, library));

    manage_add_book_panel();
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
