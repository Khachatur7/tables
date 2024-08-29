let data = JSON.parse(JSON.stringify(gostData));
let pages = 1;
let pageNow = 1;
let linesOnPageMaxCount = 10;
let name_input = "";
let step_input = "";
let state_input = "";
let category_input = "";
let docum_input = "";
let tk_input = "";
let clsfn_input = "";
let inputs_filter_data = {
  name: "Содержит",
  step: "Содержит",
  state: "Содержит",
  category: "Содержит",
  docum: "Равно",
  tk: "Содержит",
  clsfn: "Содержит",
};
let click = 0;

CreateAndAdd(gostData);

function CreateAndAdd(resData) {
  let tableList = document.querySelector(".table_list");
  tableList.innerHTML = "";
  let count = 1;
  pages = Math.ceil(resData.length / 10);
  pageNow = new URL(location.href).searchParams.get("page") || 1;

  if (resData) {
    resData.map((el, ind) => {
      let name_menu_item = `<div class="drop_down_menu_item"><span>${el.name}</span></div>`;
      let step_menu_item = `<div class="drop_down_menu_item"><span>${el.development_step}</span></div>`;
      let state_menu_item = `<div class="drop_down_menu_item"><span>${el.status}</span></div>`;
      let category_menu_item = `<div class="drop_down_menu_item"><span>${el.category}</span></div>`;
      let document_menu_item = `<div class="drop_down_menu_item"><span>${el.documents.length}</span></div>`;
      let tk_menu_item = `<div class="drop_down_menu_item"><span>${el.tk}</span></div>`;
      let clsfn_menu_item = `<div class="drop_down_menu_item"><span>${el.classification}</span></div>`;
      AddFilterMenuItem(name_menu_item, "name", el.name);
      AddFilterMenuItem(step_menu_item, "step", el.development_step);
      AddFilterMenuItem(state_menu_item, "state", el.status);
      AddFilterMenuItem(category_menu_item, "category", el.category);
      AddFilterMenuItem(document_menu_item, "docum", el.documents.length);
      AddFilterMenuItem(tk_menu_item, "tk", el.tk);
      AddFilterMenuItem(clsfn_menu_item, "clsfn", el.classification);
      if (ind + 1 > pageNow * linesOnPageMaxCount - 10 || resData.length < 10) {
        if (count <= linesOnPageMaxCount) {
          console.log(el.documents);

          let newLine = `
        <div class="gost_line">
            <div class="gost_line_name gost_line_item">
              <a href="${el.gost_link}" target="_blank" class="line_link"
                >${el.name}</a
              >
            </div>
            <div class="gost_line_step gost_line_item">
              <span>${el.development_step}</span>
            </div>
            <div class="gost_line_state gost_line_item">
              <span>${el.status}</span>
            </div>
            <div class="gost_line_category gost_line_item">
              <span>${el.category}</span>
            </div>
            <div class="gost_line_docum gost_line_item">
              <a class="document_amount_item" href="../pages/document.html?docum=${
                ind + 1
              }">
                <img src="../images/document_icon.svg" alt="document_icon" />
                <span>${el.documents}</span>
              </a>
            </div>
            <div class="gost_line_tk gost_line_item">
              <span>${el.tk}</span>
            </div>
            <div class="gost_line_clsfn gost_line_item">
              <span>${el.classification}</span>
            </div>
        </div>`;

          tableList.insertAdjacentHTML("beforeend", newLine);
          count++;
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
  OpenFilter();
  ChooseFilterItem("name");
  ChooseFilterItem("step");
  ChooseFilterItem("state");
  ChooseFilterItem("category");
  ChooseFilterItem("docum");
  ChooseFilterItem("tk");
  ChooseFilterItem("clsfn");
  ChooseFilterInputItem("name");
  ChooseFilterInputItem("step");
  ChooseFilterInputItem("state");
  ChooseFilterInputItem("category");
  ChooseFilterInputItem("docum");
  ChooseFilterInputItem("tk");
  ChooseFilterInputItem("clsfn");
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
    if (
      CheckLines(
        "name",
        name_input.trim().toLowerCase(),
        el.name.trim().toLowerCase()
      ) &&
      CheckLines(
        "step",
        step_input.trim().toLowerCase(),
        el.development_step.trim().toLowerCase()
      ) &&
      CheckLines(
        "state",
        state_input.trim().toLowerCase(),
        el.status.trim().toLowerCase()
      ) &&
      CheckLines(
        "category",
        category_input.trim().toLowerCase(),
        el.category
      ) &&
      CheckLines(
        "docum",
        docum_input.trim().toLowerCase(),
        el.documents.length
      ) &&
      CheckLines(
        "tk",
        tk_input.trim().toLowerCase(),
        el.tk.trim().toLowerCase()
      ) &&
      CheckLines(
        "clsfn",
        clsfn_input.trim().toLowerCase(),
        el.classification.trim().toLowerCase()
      )
    ) {
      lineCount++;
      if (ind + 1 > pageNow * linesOnPageMaxCount - 10 || data.length < 10) {
        if (count <= linesOnPageMaxCount) {
          let newLine = `
        <div class="gost_line">
            <div class="gost_line_name gost_line_item">
              <span
                >${el.name}</span
              >
            </div>
            <div class="gost_line_step gost_line_item">
              <span>${el.development_step}</span>
            </div>
            <div class="gost_line_state gost_line_item">
              <span>${el.status}</span>
            </div>
            <div class="gost_line_category gost_line_item">
              <span>${el.category}</span>
            </div>
            <div class="gost_line_docum gost_line_item">
              <a class="document_amount_item" href="../pages/document.html?docum=${
                ind + 1
              }">
                <img src="../images/document_icon.svg" alt="document_icon" />
                <span>${el.documents}</span>
              </a>
            </div>
            <div class="gost_line_tk gost_line_item">
              <span>${el.tk}</span>
            </div>
            <div class="gost_line_clsfn gost_line_item">
              <span>${el.classification}</span>
            </div>
        </div>`;
          tableList.insertAdjacentHTML("beforeend", newLine);
          count++;
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
    HideArrows();
  } else if (count > 1) {
    pages = Math.ceil(lineCount / 10);
    AddPages();
    HideArrows();
  }
  {
  }
}

function AddPages() {
  if (pages > 1) {
    let parent = document.querySelector(".page_number_list");
    parent.innerHTML = "";
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
  history.pushState(null, null, `../pages/gost.html?page=${p}`);
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

function AddFilterMenuItem(child, byWho, text, noInput) {
  let parent = document.querySelector(
    `.gost_filter_by_${byWho} .drop_down_menu .drop_down_menu_list`
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
  let input = document.querySelector(
    `.gost_filter_input_by_${byWhat} .filter_input input`
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
          name_input = inputs[i].value;
        } else if (i == 1) {
          step_input = inputs[i].value;
        } else if (i == 2) {
          state_input = inputs[i].value;
        } else if (i == 3) {
          category_input = inputs[i].value;
        } else if (i == 4) {
          docum_input = inputs[i].value;
        } else if (i == 5) {
          tk_input = inputs[i].value;
        } else if (i == 6) {
          clsfn_input = inputs[i].value;
        }
        history.pushState(null, null, `../pages/gost.html?page=1`);
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
  } else if (byWhat == "step") {
    step_input = filterText;
  } else if (byWhat == "state") {
    state_input = filterText;
  } else if (byWhat == "category") {
    category_input = filterText;
  } else if (byWhat == "docum") {
    docum_input = filterText;
  } else if (byWhat == "tk") {
    tk_input = filterText;
  } else if (byWhat == "clsfn") {
    clsfn_input = filterText;
  }
  history.pushState(null, null, `../pages/gost.html?page=1`);
  FilterAndAddNewLines(data);
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

function ChooseFilterInputItem(byWhat) {
  if (byWhat) {
    let filterMenu = document.querySelectorAll(
      ".drop_down_menu .drop_down_menu_item"
    );

    let codeMenuItems = document.querySelectorAll(
      `.gost_filter_input_by_${byWhat} .drop_down_menu .drop_down_menu_item`
    );

    if (filterMenu) {
      for (const i in filterMenu) {
        if (typeof filterMenu[i] == "object") {
          filterMenu[i].addEventListener("click", function () {
            if (
              filterMenu[i]
                .closest(".gost_filter_input")
                .classList.contains(`gost_filter_input_by_${byWhat}`)
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
  } else if (inputs_filter_data[filterItem] == "Равно") {
    if (+value) {
      return +line == +value;
    } else {
      return true;
    }
  } else if (inputs_filter_data[filterItem] == "Не равно") {
    if (+value) {
      return +line != +value;
    } else {
      return true;
    }
  } else if (inputs_filter_data[filterItem] == "Меньше чем") {
    if (+value) {
      return +line > +value;
    } else {
      return true;
    }
  } else if (inputs_filter_data[filterItem] == "Меньше чем или равно") {
    if (+value) {
      return +line >= +value;
    } else {
      return true;
    }
  } else if (inputs_filter_data[filterItem] == "Больше чем") {
    if (+value) {
      return +line < +value;
    } else {
      return true;
    }
  } else if (inputs_filter_data[filterItem] == "Больше чем или равно") {
    if (+value) {
      return +line <= +value;
    } else {
      return true;
    }
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
    if (!e.target.classList.contains("filter_icon")&&
    !e.target.classList.contains("drop_down_menu_item")) {
      click++;
      let sortBy = null;
      if (e.target.textContent == "Наименование") {
        sortBy = "name";
      } else if (e.target.textContent == "Этап разработки") {
        sortBy = "development_step";
      } else if (e.target.textContent == "Статус") {
        sortBy = "status";
      } else if (e.target.textContent == "Вид") {
        sortBy = "category";
      } else if (e.target.textContent == "Документы") {
        sortBy = "documents";
      } else if (e.target.textContent == "ТК/ПК") {
        sortBy = "tk";
      } else if (e.target.textContent == "Классифика-ция") {
        sortBy = "classification";
      }

      if (click == 1) {
        if (sortBy == "documents") {
          data.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
              return -1;
            }
            if (a[sortBy] > b[sortBy]) {
              return 1;
            }
            return 0;
          });
        } else {
          data.sort((a, b) => {
            if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
              return -1;
            }
            if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
              return 1;
            }
            return 0;
          });
        }

        FilterAndAddNewLines(data);
      } else if (click == 2) {
        click = 0;
        if (sortBy == "documents") {
          data.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
              return -1;
            }
            if (a[sortBy] < b[sortBy]) {
              return 1;
            }
            return 0;
          });
        } else {
          data.sort((a, b) => {
            if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
              return -1;
            }
            if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
              return 1;
            }
            return 0;
          });
        }

        FilterAndAddNewLines(data);
      }
    }
  });
});
