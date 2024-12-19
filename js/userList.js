let data = JSON.parse(JSON.stringify(userList));
let pages = 1;
let pageNow = 1;
let linesOnPageMaxCount = 10;
let click = 0;
let checked = false;
let main_checkbox = document.getElementById("main_checkbox_sqr");
let saved_checked = [];
let now_checked = [];

function CreateAndAdd(resData) {
  let tableList = document.querySelector(".table_list");
  tableList.innerHTML = "";
  let count = 1;
  pages = Math.ceil(resData.length / 10);
  pageNow = new URL(location.href).searchParams.get("page") || 1;
  main_checkbox.checked = false;
  now_checked = [];

  if (resData) {
    resData.map((el, ind) => {

      if (ind + 1 > pageNow * linesOnPageMaxCount - 10 || resData.length < 10) {
        if (count <= linesOnPageMaxCount) {
          let newLine = `<div class="user_line">
                        <div class="checkbox_sqr" >
                            <input type="checkbox" ${
                              saved_checked.includes(ind) ? "checked" : ""
                            }
                      id=${ind} />
                        </div>
                        <div class="user_name about_user"><span>${
                          el.user_name
                        }</span></div>
                        <div class="about_post about_user"><span>${
                          el.post
                        }</span></div>
                        <div class="about_organization about_user"><span>${
                          el.organization
                        }</span></div>
                        <div class="about_email about_user"><a href="mailto:${
                          el.email
                        }">${el.email}</a></div>
                    </div>`;

          tableList.insertAdjacentHTML("beforeend", newLine);
          count++;
          now_checked.push(ind);
        }
      }
      HandleClickChecbox();
      AddPages();
      HideArrows();
    });
    if (count == 1) {
      tableList.insertAdjacentHTML(
        "beforeend",
        `<div class="no_result">
            <span>Нету результатов</span>
          </div>`
      );
      HandleClickChecbox();
      AddPages();
      HideArrows();
    }
  }
}

function AddPages() {
  let parent = document.querySelector(".page_number_list");
  parent.innerHTML = "";
  if (pages > 1) {
    for (let p = 1; p <= pages; p++) {
      let page = `<li class="page_number_list_item ${
        pageNow == p ? "active_page" : ""
      }" onclick="ChangePage(${p})">
            <a href="javascript:void(0)">${p}</a>
            </li>`;
      parent.insertAdjacentHTML("beforeend", page);
    }
  }
}

function ChangePage(p) {
  history.pushState(null, null, `../pages/userList.html?page=${p}`);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return CreateAndAdd(data);
}

let prev = document.querySelector(".prev_page_arrow");
prev.addEventListener("click", function () {
  let newPage = pageNow > 1 ? +pageNow - 1 : pageNow;
  ChangePage(newPage);
});

let next = document.querySelector(".next_page_arrow");
next.addEventListener("click", function () {
  let newPage = pageNow < pages ? +pageNow + 1 : pageNow;
  ChangePage(newPage);
});

function HideArrows() {
  if (pages == 1) {
    document.querySelector(".next_page_arrow").classList.add("none");
    document.querySelector(".prev_page_arrow").classList.add("none");
  } else if (pageNow == pages) {
    document.querySelector(".next_page_arrow").classList.add("none");
    document.querySelector(".prev_page_arrow").classList.remove("none");
  } else if (pageNow == 1) {
    document.querySelector(".prev_page_arrow").classList.add("none");
    document.querySelector(".next_page_arrow").classList.remove("none");
  } else {
    document.querySelector(".prev_page_arrow").classList.remove("none");
    document.querySelector(".next_page_arrow").classList.remove("none");
  }
}

CreateAndAdd(data);

document.querySelectorAll(".sort_item").forEach((el) => {
  el.addEventListener("click", function (e) {
    click++;
    console.log(e.target.textContent);

    let sortBy = null;
    if (e.target.textContent == "Пользователь") {
      sortBy = "user_name";
    } else if (e.target.textContent == "Должность") {
      sortBy = "post";
    } else if (e.target.textContent == "Организация") {
      sortBy = "organization";
    } else if (e.target.textContent == "email") {
      sortBy = "email";
    }

    if (click == 1) {
      data.sort((a, b) => {
        if (a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase()) {
          return -1;
        }
        if (a[sortBy]?.toLowerCase() > b[sortBy]?.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      CreateAndAdd(data);
    } else if (click == 2) {
      click = 0;
      data.sort((a, b) => {
        if (a[sortBy]?.toLowerCase() > b[sortBy]?.toLowerCase()) {
          return -1;
        }
        if (a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      CreateAndAdd(data);
    }
  });
});

// Слушатель событий для главного чекбокса,при клике меняет значения "checked" у всех input
main_checkbox.addEventListener("click", function (e) {
  if (!checked) {
    checked = true;
    saved_checked = saved_checked.concat(now_checked);
    document.querySelectorAll(".checkbox_sqr input").forEach((el) => {
      el.checked = true;
    });
  } else {
    checked = false;
    document.querySelectorAll(".checkbox_sqr input").forEach((el) => {
      saved_checked = saved_checked.filter((el) => !now_checked.includes(el));
      el.checked = false;
    });
  }
});

function HandleClickChecbox() {
  document.querySelectorAll(".checkbox_sqr input").forEach((check) => {
    if (check.id != "main_checkbox_sqr") {
      check.addEventListener("click", function () {
        if (!check.checked) {
          saved_checked = saved_checked.filter((el) => el != +check.id);
        } else if (check.checked) {
          if (!saved_checked.includes(+check.id)) {
            saved_checked.push(+check.id);
          }
        }
        console.log(saved_checked);
      });
    }
  });
}
