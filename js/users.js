let data = JSON.parse(JSON.stringify(users));
let main_checkbox = document.getElementById("main_checkbox_sqr");
let pages = 1;
let pageNow = 1;
let linesOnPageMaxCount = 10;
let status_input = "";
let full_name_input = "";
let email_input = "";
let post_input = "";
let organization_input = "";
let phone_number_input = "";
let last_login_input = "";
let last_activity_input = "";
let inputs_filter_data = {
  status: "Содержит",
  full_name: "Содержит",
  email: "Содержит",
  post: "Содержит",
  organization: "Содержит",
  phone_number: "Содержит",
  last_login: "Содержит",
  last_activity: "Содержит",
};
let click = 0;
let checked = false;
let saved_checked = [];
let now_checked = [];
CreateAndAdd(data);

function CreateAndAdd(resData) {
  let tableList = document.querySelector(".table_list");
  tableList.innerHTML = "";
  let count = 1;
  pages = Math.ceil(resData.length / 10);
  pageNow = new URL(location.href).searchParams.get("page") || 1;
  now_checked = [];
  main_checkbox.checked = false;

  if (resData) {
    resData.map((el, ind) => {
      if (ind + 1 > pageNow * linesOnPageMaxCount - 10 || resData.length < 10) {
        if (count <= linesOnPageMaxCount) {
          let status_menu_item = `<div class="drop_down_menu_item"><span>${el.status}</span></div>`;
          let full_name_menu_item = `<div class="drop_down_menu_item"><span>${el.full_name}</span></div>`;
          let email_menu_item = `<div class="drop_down_menu_item"><span>${el.email}</span></div>`;
          let post_menu_item = `<div class="drop_down_menu_item"><span>${el.post}</span></div>`;
          let organization_menu_item = `<div class="drop_down_menu_item"><span>${el.organization}</span></div>`;
          let phone_number_menu_item = `<div class="drop_down_menu_item"><span>${el.phone_number}</span></div>`;
          let last_login_menu_item = `<div class="drop_down_menu_item"><span>${el.last_login}</span></div>`;
          let last_activity_menu_item = `<div class="drop_down_menu_item"><span>${el.last_activity}</span></div>`;
          el.status.trim()
            ? AddFilterMenuItem(status_menu_item, "status", el.status)
            : "";
          el.full_name.trim()
            ? AddFilterMenuItem(full_name_menu_item, "full_name", el.full_name)
            : "";
          el.email.trim()
            ? AddFilterMenuItem(email_menu_item, "email", el.email)
            : "";
          el.post.trim()
            ? AddFilterMenuItem(post_menu_item, "post", el.post)
            : "";
          el.organization.trim()
            ? AddFilterMenuItem(
                organization_menu_item,
                "organization",
                el.organization
              )
            : "";
          el.phone_number.trim()
            ? AddFilterMenuItem(
                phone_number_menu_item,
                "phone_number",
                el.phone_number
              )
            : "";
          el.last_login.trim()
            ? AddFilterMenuItem(
                last_login_menu_item,
                "last_login",
                el.last_login
              )
            : "";
          el.last_activity.trim()
            ? AddFilterMenuItem(
                last_activity_menu_item,
                "last_activity",
                el.last_activity
              )
            : "";

          let newLine = `
       <div class="users_line">
              <div class="checkbox_sqr">
                <input type="checkbox" name="" id=${ind} />
              </div>
              <div class="write_to_user">
                <a href="${
                  el.write_to_link
                }" target="_blank"><div class="write_to_user_icon"></div></a>
              </div>
              <div class="users_status users_list_items_item">
                <div class="line_circle ${
                  el.status == "Заблоки-рован" ? "offline" : "online"
                }"></div>
                <span>${el.status}</span>
              </div>
              <div class="users_name users_list_items_item"><span>${
                el.full_name
              }</span></div>
              <div class="users_email users_list_items_item"><a href="mailto:${
                el.email
              }">${el.email}</a></div>
              <div class="users_post users_list_items_item"><span>${
                el.post
              }</span></div>
              <div class="users_organization users_list_items_item"><span>${
                el.organization
              }</span></div>
              <div class="users_phone_number users_list_items_item"><span>${
                el.phone_number
              }</span></div>
              <div class="users_last_login users_list_items_item"><span>${
                el.last_login
              }</span></div>
              <div class="users_last_online users_list_items_item"><span>${
                el.last_activity
              }</span></div>

            </div>`;

          tableList.insertAdjacentHTML("beforeend", newLine);
          count++;
          now_checked.push(ind);
        }
      }

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
    }
  }
  HandleClickChecbox();
  OpenFilter();
  ChooseFilterItem("status");
  ChooseFilterItem("full_name");
  ChooseFilterItem("email");
  ChooseFilterItem("post");
  ChooseFilterItem("organization");
  ChooseFilterItem("phone_number");
  ChooseFilterItem("last_login");
  ChooseFilterItem("last_activity");
  ChooseFilterInputItem("full_name");
  ChooseFilterInputItem("email");
  ChooseFilterInputItem("post");
  ChooseFilterInputItem("organization");
  ChooseFilterInputItem("phone_number");
  ChooseFilterInputItem("last_login");
  ChooseFilterInputItem("last_activity");
  InputsAddEventListener();
  OpenInputFilter();
}

function FilterAndAddNewLines(data) {
  let tableList = document.querySelector(".table_list");
  tableList.innerHTML = "";
  lineCount = 0;
  let count = 1;
  now_checked = [];
  main_checkbox.checked = false;
  pageNow = new URL(location.href).searchParams.get("page") || 1;

  data.map((el, ind) => {
    if (
      CheckLines(
        "status",
        status_input.trim().toLowerCase(),
        el.status.trim().toLowerCase()
      ) &&
      CheckLines(
        "full_name",
        full_name_input.trim().toLowerCase(),
        el.full_name.trim().toLowerCase()
      ) &&
      CheckLines(
        "email",
        email_input.trim().toLowerCase(),
        el.email.trim().toLowerCase()
      ) &&
      CheckLines(
        "post",
        post_input.trim().toLowerCase(),
        el.post.trim().toLowerCase()
      ) &&
      CheckLines(
        "organization",
        organization_input.trim().toLowerCase(),
        el.organization.trim().toLowerCase()
      ) &&
      CheckLines(
        "phone_number",
        phone_number_input.trim().toLowerCase(),
        el.phone_number.trim().toLowerCase()
      ) &&
      CheckLines(
        "last_login",
        last_login_input.trim().toLowerCase(),
        el.last_login.trim().toLowerCase()
      ) &&
      CheckLines(
        "last_activity",
        last_activity_input.trim().toLowerCase(),
        el.last_activity.trim().toLowerCase()
      )
    ) {
      lineCount++;
      if (ind + 1 > pageNow * linesOnPageMaxCount - 10 || data.length < 10) {
        if (count <= linesOnPageMaxCount) {
          let newLine = `
          <div class="users_line">
                 <div class="checkbox_sqr">
                   <input type="checkbox" ${
                     saved_checked.includes(ind) ? "checked" : ""
                   }
                      id=${ind} />
                 </div>
                 <div class="write_to_user">
                   <a href="${
                     el.write_to_link
                   }" target="_blank"><div class="write_to_user_icon"></div></a>
                 </div>
                 <div class="users_status users_list_items_item">
                   <div class="line_circle ${
                     el.status == "Заблоки-рован" ? "offline" : "online"
                   }"></div>
                   <span>${el.status}</span>
                 </div>
                 <div class="users_name users_list_items_item"><span>${
                   el.full_name
                 }</span></div>
                 <div class="users_email users_list_items_item"><a href="mailto:${
                   el.email
                 }">${el.email}</a></div>
                 <div class="users_post users_list_items_item"><span>${
                   el.post
                 }</span></div>
                 <div class="users_organization users_list_items_item"><span>${
                   el.organization
                 }</span></div>
                 <div class="users_phone_number users_list_items_item"><span>${
                   el.phone_number
                 }</span></div>
                 <div class="users_last_login users_list_items_item"><span>${
                   el.last_login
                 }</span></div>
                 <div class="users_last_online users_list_items_item"><span>${
                   el.last_activity
                 }</span></div>
   
               </div>`;
          tableList.insertAdjacentHTML("beforeend", newLine);
          count++;
          now_checked.push(ind);
        }
      }
    }
  });
  if (count == 1) {
    tableList.insertAdjacentHTML(
      "beforeend",
      `<div class="no_result">
          <span>Нету результатов</span>
        </div>`
    );
    pages = 0;
    pageNow = 1;
    HandleClickChecbox();
    AddPages();
    HideArrows();
  } else if (count > 1) {
    pages = Math.ceil(lineCount / 10);
    HandleClickChecbox();
    AddPages();
    HideArrows();
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
  history.pushState(null, null, `../pages/users.html?page=${p}`);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return FilterAndAddNewLines(data);
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
  if (pages == 1 || pages == 0) {
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

function AddFilterMenuItem(child, byWho, text, noInput) {
  let parent = document.querySelector(
    `.by_${byWho} .drop_down_menu .drop_down_menu_list`
  );
  let childs = parent.querySelectorAll(".drop_down_menu_item");
  let addOrNotChild = true;
  for (const c in childs) {
    if (typeof childs == "object") {
      if (childs[c].textContent == text) {
        addOrNotChild = false;
      }
    }
  }
  addOrNotChild ? parent.insertAdjacentHTML("beforeend", child) : 0;
  return true;
}

function OpenFilter() {
  let filterItems = document.querySelectorAll(".drop_down_menu");
  let filterBttns = document.querySelectorAll(".filter_icon");

  for (const i in filterBttns) {
    if (typeof filterItems[i] == "object") {
      filterBttns[i].addEventListener("click", function () {
        for (const l in filterBttns) {
          if (typeof filterItems[l] == "object" && i != l) {
            filterBttns[l].classList.remove("filter_icon_active");
            filterItems[l].classList.add("closed_drop_down_menu");
          }
        }
        if (filterItems[i].classList.contains("closed_drop_down_menu")) {
          filterBttns[i].classList.add("filter_icon_active");
          filterItems[i].classList.remove("closed_drop_down_menu");
          setTimeout(() => {
            document.addEventListener("click", DropMenuFocusOut);
          }, 300);
        } else {
          filterBttns[i].classList.remove("filter_icon_active");
          filterItems[i].classList.add("closed_drop_down_menu");
        }
      });
    }
  }
}

function ChooseFilterItem(byWhat) {
  let filterMenu = document.querySelectorAll(
    ".drop_down_menu .drop_down_menu_item"
  );

  let MenuItems = document.querySelectorAll(
    `.by_${byWhat} .drop_down_menu_item`
  );
  let input = document.querySelector(`.input_by_${byWhat} .filter_input input`);
  for (const i in filterMenu) {
    if (typeof filterMenu[i] == "object") {
      filterMenu[i].addEventListener("click", function () {
        if (
          filterMenu[i]
            .closest(".users_header_item")
            .classList.contains(`by_${byWhat}`)
        ) {
          for (const c in MenuItems) {
            if (typeof MenuItems[c] == "object") {
              MenuItems[c].classList.remove("active_drop_down_menu_item");
            }
          }
          if (byWhat != "status") {
            if (
              filterMenu[i].textContent != "Все" &&
              filterMenu[i].textContent != "(Не пусто)" &&
              filterMenu[i].textContent != "(Пусто)"
            ) {
              input.value = filterMenu[i].textContent;
            } else {
              input.value = "";
            }
          }

          ChangeInputValue(byWhat, filterMenu[i].textContent);
          filterMenu[i].classList.add("active_drop_down_menu_item");
        }
      });
    }
  }
}

function InputsAddEventListener() {
  let inputs = document.querySelectorAll(".filter_input input");
  let delete_bttns = document.querySelectorAll(
    ".filter_input .delete_text_bttn"
  );
  for (const i in inputs) {
    if (typeof inputs[i] == "object") {
      inputs[i].addEventListener("focus", function () {
        delete_bttns[i].classList.add("active_delete_text_bttn");
      });
      inputs[i].addEventListener("focusout", function () {
        if (inputs[i].value == "") {
          setTimeout(() => {
            if (delete_bttns[i].classList.contains("active_delete_text_bttn")) {
              delete_bttns[i].classList.remove("active_delete_text_bttn");
            }
          }, 100);
        }
      });
      inputs[i].addEventListener("input", function () {
        if (i == 0) {
          full_name_input = inputs[i].value;
        } else if (i == 1) {
          email_input = inputs[i].value;
        } else if (i == 2) {
          post_input = inputs[i].value;
        } else if (i == 3) {
          organization_input = inputs[i].value;
        } else if (i == 4) {
          phone_number_input = inputs[i].value;
        } else if (i == 5) {
          last_login_input = inputs[i].value;
        } else if (i == 6) {
          last_activity_input = inputs[i].value;
        }
        history.pushState(null, null, `../pages/users.html?page=1`);
        FilterAndAddNewLines(data);
      });
    }
  }

  for (const i in delete_bttns) {
    if (typeof delete_bttns[i] == "object") {
      delete_bttns[i].addEventListener("click", function () {
        inputs[i].value = "";
        if (i == 0) {
          full_name_input = "";
        } else if (i == 1) {
          email_input = "";
        } else if (i == 2) {
          post_input = "";
        } else if (i == 3) {
          organization_input = "";
        } else if (i == 4) {
          phone_number_input = "";
        } else if (i == 5) {
          last_login_input = "";
        } else if (i == 6) {
          last_activity_input = "";
        }
        FilterAndAddNewLines(data);
        if (delete_bttns[i].classList.contains("active_delete_text_bttn")) {
          delete_bttns[i].classList.remove("active_delete_text_bttn");
        }
      });
    }
  }
}

function ChangeInputValue(byWhat, filterText) {
  if (byWhat == "status") {
    status_input = filterText;
  } else if (byWhat == "full_name") {
    full_name_input = filterText;
  } else if (byWhat == "email") {
    email_input = filterText;
  } else if (byWhat == "post") {
    post_input = filterText;
  } else if (byWhat == "organization") {
    organization_input = filterText;
  } else if (byWhat == "phone_number") {
    phone_number_input = filterText;
  } else if (byWhat == "last_login") {
    last_login_input = filterText;
  } else if (byWhat == "last_activity") {
    last_activity_input = filterText;
  }
  history.pushState(null, null, `../pages/users.html?page=1`);
  FilterAndAddNewLines(data);
}

function OpenInputFilter() {
  let filterItems = document.querySelectorAll(
    ".user_header_inputs .drop_down_menu"
  );
  let filterBttns = document.querySelectorAll(".input_filter_icon");

  for (const i in filterBttns) {
    if (typeof filterItems[i] == "object") {
      filterBttns[i].addEventListener("click", function () {
        for (const l in filterBttns) {
          if (typeof filterItems[l] == "object" && i != l) {
            filterBttns[l].classList.remove("filter_input_icon_active");
            filterItems[l].classList.add("closed_drop_down_menu");
          }
        }
        if (filterItems[i].classList.contains("closed_drop_down_menu")) {
          filterBttns[i].classList.add("filter_input_icon_active");
          filterItems[i].classList.remove("closed_drop_down_menu");
          setTimeout(() => {
            document.addEventListener("click", InputDropMenuFocusOut);
          }, 300);
        } else {
          filterBttns[i].classList.remove("filter_input_icon_active");
          filterItems[i].classList.add("closed_drop_down_menu");
        }
      });
    }
  }
}

function ChooseFilterInputItem(byWhat) {
  if (byWhat) {
    let filterMenu = document.querySelectorAll(
      ".drop_down_menu .drop_down_menu_item"
    );

    let codeMenuItems = document.querySelectorAll(
      `.input_by_${byWhat} .drop_down_menu .drop_down_menu_item`
    );

    if (filterMenu) {
      for (const i in filterMenu) {
        if (typeof filterMenu[i] == "object") {
          filterMenu[i].addEventListener("click", function () {
            if (
              filterMenu[i]
                .closest(".users_header_inputs_item")
                ?.classList.contains(`input_by_${byWhat}`)
            ) {
              for (const c in codeMenuItems) {
                if (typeof codeMenuItems[c] == "object") {
                  codeMenuItems[c].classList.remove(
                    "active_drop_down_menu_item"
                  );
                }
              }
              filterMenu[i].classList.add("active_drop_down_menu_item");
              inputs_filter_data[byWhat] = filterMenu[i].textContent.trim();
              FilterAndAddNewLines(data);
            }
          });
        }
      }
    }
  }
}

function FilterByWhatItem(value, line, filterItem) {
  if (inputs_filter_data[filterItem] == "Начинается с") {
    return line.startsWith(value);
  } else if (inputs_filter_data[filterItem] == "Содержит") {
    return line.includes(value);
  } else if (inputs_filter_data[filterItem] == "Не содержит") {
    return !line.includes(value);
  } else if (inputs_filter_data[filterItem] == "Заканчивается на") {
    return line.endsWith(value);
  }
}

function CheckLines(byWhat, value, el) {
  if (el == undefined) {
    el = "";
  }
  if (value == "все") {
    return true;
  } else if (value == "(пусто)") {
    return el.length == 0;
  } else if (value == "(не пусто)") {
    return el.length != 0;
  } else {
    return FilterByWhatItem(value, el, byWhat);
  }
}

function DropMenuFocusOut(e) {
  if (
    !e.target.classList.contains("filter_icon") ||
    e.target.classList.contains("drop_down_menu_item")
  ) {
    let menu = document.querySelectorAll(".drop_down_menu");
    let icons = document.querySelectorAll(".filter_icon");

    for (const e in menu) {
      if (typeof menu[e] == "object") {
        icons[e]?.classList.remove("filter_icon_active");
        menu[e]?.classList.add("closed_drop_down_menu");
      }
    }
    document.removeEventListener("click", DropMenuFocusOut);
  }
}

function InputDropMenuFocusOut(e) {
  if (!e.target.classList.contains("input_filter_icon")) {
    let filterItems = document.querySelectorAll(
      ".user_header_inputs .drop_down_menu"
    );
    let filterBttns = document.querySelectorAll(".input_filter_icon");
    for (const e in filterItems) {
      if (typeof filterItems[e] == "object") {
        filterBttns[e].classList.remove("filter_input_icon_active");
        filterItems[e].classList.add("closed_drop_down_menu");
      }
    }
    document.removeEventListener("click", InputDropMenuFocusOut);
  }
}

function ChangeDropDownMenuSize(el, e) {
  if (e.buttons == 1) {
    el.style.cssText = ` position: sticky;
      width: 100%;
      height: 10px;
      bottom: 0;`;
    el
      .closest(".drop_down_menu")
      .querySelector(
        ".drop_down_menu_list"
      ).style.cssText = `max-height:${Math.ceil(
      e.clientY -
        el
          .closest(".drop_down_menu")
          .querySelector(".drop_down_menu_list")
          .getBoundingClientRect().top
    )}px; height:${Math.ceil(
      e.clientY -
        el
          .closest(".drop_down_menu")
          .querySelector(".drop_down_menu_list")
          .getBoundingClientRect().top -
        3
    )}px;`;
    el.closest(".drop_down_menu").style.cssText = `width:${Math.ceil(
      e.clientX -
        el.closest(".drop_down_menu").getBoundingClientRect().left +
        17
    )}px; max-height:${Math.ceil(
      e.clientY - el.closest(".drop_down_menu").getBoundingClientRect().top + 17
    )}px;`;
  }
}

function addEventListenerOnDropMenu(el, condition) {
  if (condition) {
    let funBind = ChangeDropDownMenuSize.bind(null, el);
    document.body.classList.add("user_none");
    document.addEventListener("mousemove", funBind);
    document.removeEventListener("click", DropMenuFocusOut);

    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", funBind);
      document.body.classList.remove("user_none");
      setTimeout(() => {
        document.addEventListener("click", DropMenuFocusOut);
      }, 400);
    });
  }
}

document.querySelectorAll(".drop_down_menu .resize").forEach((el) => {
  el.addEventListener("mousemove", function (e) {
    if (e.buttons == 1) {
      addEventListenerOnDropMenu(el, true);
    }
  });
});

document.querySelectorAll(".drop_down_menu").forEach((el, ind) => {
  el.addEventListener("scroll", function (e) {
    document.querySelectorAll(".drop_down_menu .resize")[
      ind
    ].style.cssText = `bottom: -${Math.ceil(el.scrollTop)}px;`;
  });
});

document.querySelectorAll(".sort_item").forEach((el) => {
  el.addEventListener("click", function (e) {
    if (
      !e.target.classList.contains("filter_icon") &&
      !e.target.classList.contains("drop_down_menu_item") &&
      !e.target.classList.contains("drop_down_menu")
    ) {
      click++;
      let sortBy = null;
      if (e.target.textContent == "Статус") {
        sortBy = "status";
      } else if (e.target.textContent == "Ф.И.О.") {
        sortBy = "full_name";
      } else if (e.target.textContent == "email") {
        sortBy = "email";
      } else if (e.target.textContent == "Должность") {
        sortBy = "post";
      } else if (e.target.textContent == "Организа-ция") {
        sortBy = "organization";
      } else if (e.target.textContent == "Телефон") {
        sortBy = "phone_number";
      } else if (e.target.textContent == "Последний вход") {
        sortBy = "last_login";
      } else if (e.target.textContent == "Последняя активность") {
        sortBy = "last_activity";
      }

      if (click == 1) {
        data.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          return 0;
        });

        FilterAndAddNewLines(data);
      } else if (click == 2) {
        click = 0;

        data.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return -1;
          }
          if (a[sortBy] < b[sortBy]) {
            return 1;
          }
          return 0;
        });

        FilterAndAddNewLines(data);
      }
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
      });
    }
  });
}
