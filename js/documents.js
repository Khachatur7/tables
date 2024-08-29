let data = JSON.parse(JSON.stringify(documentsData));
let pages = 1;
let pageNow = 1;
let linesOnPageMaxCount = 10;
let docIndex = new URL(location.href).searchParams.get("docum") - 1;
let name_input = "";
let state_input = "";
let files_input = "";
let actions_input = "";
let inputs_filter_data = {
  name: "Содержит",
  state: "Содержит",
  file: "Содержит",
  action: "Содержит",
};
let click = 0;

CreateAndAdd(documentsData);

function CreateAndAdd(resData) {
  let tableList = document.querySelector(".table_list");
  tableList.innerHTML = "";
  let count = 1;
  pageNow = new URL(location.href).searchParams.get("page") || 1;

  if (resData) {
    resData.map((el, ind) => {
      if (ind == docIndex) {
        for (const d in el.documents) {
          pages = Math.ceil(el.documents.length / 10);

          if (
            d + 1 > pageNow * linesOnPageMaxCount - 10 ||
            el.documents.length < 10
          ) {
            let doc = el.documents[d];
            if (count <= linesOnPageMaxCount) {
              let newLine = `<div class="docs_line">
            <div class="docs_name">
              <span>${doc.name}</span>
            </div>
            <div class="docs_state">
              <span>${doc.status}</span>
            </div>
            <div class="docs_file"> 
              <a  class="docs_file_item" href="${
                doc.type == "docx" ? doc.file : doc.doc_link
              }" ${doc.type == "docx" ? 'download=""' : 'target="_blank"'}>
                <div class="docs_filter_item_icon ${doc.type}"></div>
                <span>${doc.file_name}</span>
              </a>
            </div>
            <div class="docs_action">
              <span><a href="${
                doc.action_link
              }" target="_blank" class="line_link">${doc.action}</a></span>
            </div>
            </div>`;

              tableList.insertAdjacentHTML("beforeend", newLine);
              let name_menu_item = `<div class="drop_down_menu_item"><span>${doc.name}</span></div>`;
              let status_menu_item = `<div class="drop_down_menu_item"><span>${doc.status}</span></div>`;
              let file_menu_item = `<div class="drop_down_menu_item"><span>${doc.file_name}</span></div>`;
              let action_menu_item = `<div class="drop_down_menu_item"><span>${doc.action}</span></div>`;

              AddFilterMenuItem(name_menu_item, "name", doc.name);
              AddFilterMenuItem(status_menu_item, "state", doc.status);
              AddFilterMenuItem(file_menu_item, "file", doc.file_name);
              AddFilterMenuItem(action_menu_item, "action", doc.action);

              count++;
            }
          }
        }
      }
      AddPages();
      HideArrows();
    });
  }
  OpenFilter();
  ChooseFilterItem("name");
  ChooseFilterItem("state");
  ChooseFilterItem("file");
  ChooseFilterItem("action");
  ChooseFilterInputItem("name");
  ChooseFilterInputItem("state");
  ChooseFilterInputItem("file");
  ChooseFilterInputItem("action");
  InputsAddEventListener();
  OpenInputFilter();
}

function FilterAndAddNewLines(data) {
  let tableList = document.querySelector(".table_list");
  tableList.innerHTML = "";
  lineCount = 0;
  let count = 1;
  pageNow = new URL(location.href).searchParams.get("page") || 1;
  data.map((el, ind) => {
    if (ind == docIndex) {
      for (const d in el.documents) {
        let doc = el.documents[d];
        if (
          CheckLines(
            "name",
            name_input.trim().toLowerCase(),
            doc.name.trim().toLowerCase()
          ) &&
          CheckLines(
            "state",
            state_input.trim().toLowerCase(),
            doc.status.trim().toLowerCase()
          ) &&
          CheckLines(
            "file",
            files_input.trim().toLowerCase(),
            doc.file_name.trim().toLowerCase()
          ) &&
          CheckLines("action", actions_input.trim().toLowerCase(), doc.action)
        ) {
          lineCount++;
          if (
            +d + 1 > pageNow * linesOnPageMaxCount - 10 ||
            el.documents.length < 10
          ) {
            if (count <= linesOnPageMaxCount) {
              let newLine = `<div class="docs_line">
            <div class="docs_name">
              <span>${doc.name}</span>
            </div>
            <div class="docs_state">
              <span>${doc.status}</span>
            </div>
            <div class="docs_file"> 
              <a  class="docs_file_item" href="${
                doc.type == "docx" ? doc.file : doc.doc_link
              }" ${doc.type == "docx" ? 'download=""' : 'target="_blank"'}>
                <div class="docs_filter_item_icon ${doc.type}"></div>
                <span>${doc.file_name}</span>
              </a>
            </div>
            <div class="docs_action">
              <span><a href="${
                doc.action_link
              }" target="_blank" class="line_link">${doc.action}</a></span>
            </div>
            </div>`;

              tableList.insertAdjacentHTML("beforeend", newLine);
              count++;
            }
          }
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
    AddPages();
  } else if (count > 1) {
    pages = Math.ceil(lineCount / 10);
    AddPages();
  }
  HideArrows();
}

function AddFilterMenuItem(child, byWho, text) {
  let parent = document.querySelector(
    `.doc_filter_by_${byWho} .drop_down_menu .drop_down_menu_list`
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

function AddPages() {
  if (pages > 1) {
    let parent = document.querySelector(".page_number_list");
    parent.innerHTML = "";
    let periods = false;
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

function ChangePage(p) {
  history.pushState(null, null, `../pages/document.html?docum=1&page=${p}`);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return FilterAndAddNewLines(data);
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

function OpenInputFilter() {
  let filterItems = document.querySelectorAll(
    ".filter_inputs_menu .drop_down_menu"
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

function ChooseFilterItem(byWhat) {
  let filterMenu = document.querySelectorAll(
    ".drop_down_menu .drop_down_menu_item"
  );

  let MenuItems = document.querySelectorAll(
    `.by_${byWhat} .drop_down_menu_item`
  );

  let input = document.querySelector(
    `.docs_filter_input_by_${byWhat} .filter_input input`
  );

  for (const i in filterMenu) {
    if (typeof filterMenu[i] == "object") {
      filterMenu[i].addEventListener("click", function () {
        if (
          filterMenu[i]
            .closest(".drop_down_menu")
            .classList.contains(`by_${byWhat}`)
        ) {
          for (const c in MenuItems) {
            if (typeof MenuItems[c] == "object") {
              MenuItems[c].classList.remove("active_drop_down_menu_item");
            }
          }
          if (
            filterMenu[i].textContent != "Все" &&
            filterMenu[i].textContent != "(Не пусто)" &&
            filterMenu[i].textContent != "(Пусто)"
          ) {
            input.value = filterMenu[i].textContent;
          } else {
            input.value = "";
          }
          ChangeInputValue(byWhat, filterMenu[i].textContent);
          filterMenu[i].classList.add("active_drop_down_menu_item");
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
      `.docs_filter_input_by_${byWhat} .drop_down_menu .drop_down_menu_item`
    );

    if (filterMenu) {
      for (const i in filterMenu) {
        if (typeof filterMenu[i] == "object") {
          filterMenu[i].addEventListener("click", function () {
            if (
              filterMenu[i]
                .closest(".docs_filter_input")
                .classList.contains(`docs_filter_input_by_${byWhat}`)
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

              //   FilterLines(filterMenu[i].textContent, byWhat);
            }
          });
        }
      }
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
        setTimeout(() => {
          if (
            delete_bttns[i].classList.contains("active_delete_text_bttn") &&
            inputs[i].value == ""
          ) {
            delete_bttns[i].classList.remove("active_delete_text_bttn");
          }
        }, 100);
      });
      inputs[i].addEventListener("input", function () {
        if (i == 0) {
          name_input = inputs[i].value;
        } else if (i == 1) {
          state_input = inputs[i].value;
        } else if (i == 2) {
          files_input = inputs[i].value;
        } else if (i == 3) {
          actions_input = inputs[i].value;
        }
        history.pushState(null, null, `../pages/document.html?docum=1&page=1`);

        FilterAndAddNewLines(data);
      });
    }
  }

  for (const i in delete_bttns) {
    if (typeof delete_bttns[i] == "object") {
      delete_bttns[i].addEventListener("click", function () {
        inputs[i].value = "";
        if (i == 0) {
          name_input = "";
        } else if (i == 1) {
          step_input = "";
        } else if (i == 2) {
          state_input = "";
        } else if (i == 3) {
          category_input = "";
        } else if (i == 4) {
          docum_input = "";
        } else if (i == 5) {
          tk_input = "";
        } else if (i == 6) {
          clsfn_input = "";
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
  if (byWhat == "name") {
    name_input = filterText;
  } else if (byWhat == "state") {
    state_input = filterText;
  } else if (byWhat == "file") {
    files_input = filterText;
  } else if (byWhat == "action") {
    actions_input = filterText;
  }
  history.pushState(null, null, `../pages/document.html?docum=1&page=1`);

  FilterAndAddNewLines(data);
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
        icons[e].classList.remove("filter_icon_active");
        menu[e].classList.add("closed_drop_down_menu");
      }
    }
    document.removeEventListener("click", DropMenuFocusOut);
  }
}

function InputDropMenuFocusOut(e) {
  if (!e.target.classList.contains("input_filter_icon")) {
    let filterItems = document.querySelectorAll(
      ".filter_inputs_menu .drop_down_menu"
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
    document.addEventListener("mousemove", funBind);
    document.body.classList.add("user_none");
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
      !e.target.classList.contains("drop_down_menu_item")
    ) {
      click++;
      let sortBy = null;
      if (e.target.textContent == "Наименование документа") {
        sortBy = "name";
      } else if (e.target.textContent == "Статус") {
        sortBy = "status";
      } else if (e.target.textContent == "Файл") {
        sortBy = "file_name";
      } else if (e.target.textContent == "Действия") {
        sortBy = "action";
      }

      if (click == 1) {
        data[docIndex].documents.sort((a, b) => {
          if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
            return -1;
          }
          if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
            return 1;
          }
          return 0;
        });
        FilterAndAddNewLines(data);
      } else if (click == 2) {
        click = 0;
        data[docIndex].documents.sort((a, b) => {
          if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
            return -1;
          }
          if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
            return 1;
          }
          return 0;
        });
        FilterAndAddNewLines(data);
      }
    }
  });
});
