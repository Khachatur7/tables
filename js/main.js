let name_val = "";
let code_val = "";
let click = 0;
let data = JSON.parse(JSON.stringify(classification));
let dataKeys = [];

data.map((el, ind) => {
  dataKeys.push(Object.keys(el.cods));
});

CreateAndAdd(classification);

function CreateAndAdd(resData) {
  let classification_content = ``;
  let classification = ``;

  if (resData) {
    resData.map((el, ind) => {
      let cods = dataKeys[ind];
      cods.map((code, ind) => {
        let newFilterCodeItem = `<div class="drop_down_menu_item"><span>${cods[ind]}</span></div>`;
        AddFilterMenuItem(newFilterCodeItem, "code", cods[ind]);
        let newFilterNameItem = `<div class="drop_down_menu_item"><span>${el.cods[code]}</span></div>`;
        AddFilterMenuItem(newFilterNameItem, "name", el.cods[code]);
        let codeName = code;
        let lineName = el.cods[code];
        let newLine = `<div class="line">
                  <div class="empty_sqr"></div>
                  <div class="classification_code">
                    <span>${codeName}</span>
                  </div>
                  <div class="classification_name">
                    <span>${lineName}</span>
                  </div>
                </div>`;
        classification_content += newLine;
      });
      let classification_header = `<div class="classification_header">
                <div class="sqr">
                  <div class="table_list_item__open_close_bttn">
                    <div class="open_close_bttn_icon"></div>
                  </div>
                </div>
                <div class="table_list_item_title">
                  <span>${el.name}</span>
                </div>
              </div>`;
      classification = `
              <div class="classification">
                ${classification_header}
                <div class="classification_content">${classification_content}</div>
              </div>`;
      document
        .querySelector(".table_list")
        .insertAdjacentHTML("beforeend", classification);
      classification_content = ``;
    });

    AddEventListenerForAllLines();
    OpenFilter();
    ChooseFilterItem("code");
    ChooseFilterItem("name");
  }
}

function FilterLines(resData) {
  let no_result = true;
  let classification_content = ``;
  let classification = ``;
  let table_list = document.querySelector(".table_list");
  table_list.innerHTML = "";
  if (resData) {
    resData.map((el, ind) => {
      let cods = dataKeys[ind];
      cods.map((code, ind) => {
        let codeName = code;
        let lineName = el.cods[code];

        if (
          CheckLines(code_val.toLowerCase(), codeName.toLowerCase()) &&
          CheckLines(name_val.toLowerCase(), lineName.toLowerCase())
        ) {
          let newLine = `<div class="line">
          <div class="empty_sqr"></div>
          <div class="classification_code">
            <span>${codeName}</span>
          </div>
          <div class="classification_name">
            <span>${lineName}</span>
          </div>
          </div>`;
          classification_content += newLine;
        }
      });
      if (classification_content) {
        if (no_result) {
          no_result = false;
        }
        let classification_header = `<div class="classification_header">
        <div class="sqr">
        <div class="table_list_item__open_close_bttn">
        <div class="open_close_bttn_icon"></div>
        </div>
        </div>
        <div class="table_list_item_title">
        <span>${el.name}</span>
        </div>
        </div>`;
        classification = `
        <div class="classification">
        ${classification_header}
        <div class="classification_content">${classification_content}</div>
        </div>`;

        table_list.insertAdjacentHTML("beforeend", classification);
        classification_content = ``;
      }
    });
    if (no_result) {
      table_list.insertAdjacentHTML(
        "beforeend",
        `<div class="no_result">
          <span>Нету результатов</span>
        </div>`
      );
    }
    AddEventListenerForAllLines();
  }
}

function AddFilterMenuItem(child, byWho, text) {
  let parent = document.querySelector(
    `.filter_by_${byWho} .drop_down_menu .drop_down_menu_list`
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

function AddEventListenerForAllLines() {
  let openCloseBttns = document.querySelectorAll(".open_close_bttn_icon");
  let linesParent = document.querySelectorAll(".classification_content");

  for (const i in openCloseBttns) {
    if (typeof openCloseBttns[i] == "object") {
      openCloseBttns[i].addEventListener("click", function () {
        if (openCloseBttns[i].classList.contains("close")) {
          linesParent[i].classList.remove("hide");
          openCloseBttns[i].classList.remove("close");
        } else if (!openCloseBttns[i].classList.contains("close")) {
          linesParent[i].classList.add("hide");
          openCloseBttns[i].classList.add("close");
        }
      });
    }
  }
  return true;
}

function CloseAll() {
  let openCloseBttns = document.querySelectorAll(".open_close_bttn_icon");
  let linesParent = document.querySelectorAll(".classification_content");

  for (const i in linesParent) {
    if (typeof linesParent[i] == "object") {
      if (!linesParent[i].classList.contains("hide")) {
        linesParent[i].classList.add("hide");
        openCloseBttns[i].classList.add("close");
      }
    }
  }
  return true;
}

function OpenAll() {
  let openCloseBttns = document.querySelectorAll(".open_close_bttn_icon");
  let linesParent = document.querySelectorAll(".classification_content");

  for (const i in linesParent) {
    if (typeof linesParent[i] == "object") {
      linesParent[i].classList.remove("hide");
      openCloseBttns[i].classList.remove("close");
    }
  }
  return true;
}

document.getElementById("close_all").addEventListener("click", CloseAll);
document.getElementById("open_all").addEventListener("click", OpenAll);

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
          filterMenu[i].classList.add("active_drop_down_menu_item");
          // FilterLinesByCode(filterMenu[i].textContent);

          if (byWhat == "code") {
            code_val = filterMenu[i].textContent;
          } else if (byWhat == "name") {
            name_val = filterMenu[i].textContent;
          }
          FilterLines(data);
        }
      });
    }
  }
}

function CheckLines(value, el) {
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
    if (value != "") {
      return el == value;
    } else {
      return true;
    }
  }
}

document.querySelectorAll(".drop_down_menu .resize").forEach((el) => {
  el.addEventListener("mousemove", function (e) {
    if (e.buttons == 1) {
      addEventListenerOnDropMenu(el, true);
    }
  });
});

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

document.querySelectorAll(".drop_down_menu").forEach((el, ind) => {
  el.addEventListener("scroll", function (e) {
    document.querySelectorAll(".drop_down_menu .resize")[
      ind
    ].style.cssText = `bottom: -${Math.ceil(el.scrollTop)}px;`;
  });
});

function DropMenuFocusOut(e) {
  if (
    !e.target.classList.contains("drop_down_menu_item") &&
    !e.target.classList.contains("filter_icon")
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
  } else if (e.target.classList.contains("drop_down_menu_item")) {
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

document.querySelectorAll(".sort_item").forEach((el) => {
  el.addEventListener("click", function (e) {
    if (
      !e.target.classList.contains("filter_icon") &&
      !e.target.classList.contains("drop_down_menu_item")
    ) {
      click++;
      if (e.target.textContent == "Наименование") {
        if (click == 1) {
          data.map((el, ind) => {
            let cods = Object.keys(el.cods);
            let sorted = cods.sort((a, b) => {
              if (el.cods[a].toLowerCase() < el.cods[b].toLowerCase()) {
                return -1;
              }
              if (el.cods[a].toLowerCase() > el.cods[b].toLowerCase()) {
                return 1;
              }
              return 0;
            });
            dataKeys[ind] = sorted;
          });
          FilterLines(data);
        } else if (click == 2) {
          data.map((el, ind) => {
            let cods = Object.keys(el.cods);
            let sorted = cods.sort((a, b) => {
              if (el.cods[a].toLowerCase() > el.cods[b].toLowerCase()) {
                return -1;
              }
              if (el.cods[a].toLowerCase() < el.cods[b].toLowerCase()) {
                return 1;
              }
              return 0;
            });

            dataKeys[ind] = sorted;
          });
          click = 0;
          FilterLines(data);
        }
      } else if (e.target.textContent == "Код") {
        if (click == 1) {
          data.map((el, ind) => {
            let cods = Object.keys(el.cods);
            let sorted = cods.sort((a, b) => {
              if (a < b) {
                return -1;
              }
              if (a > b) {
                return 1;
              }
              return 0;
            });
            dataKeys[ind] = sorted;
          });
          FilterLines(data);
        } else if (click == 2) {
          data.map((el, ind) => {
            let cods = Object.keys(el.cods);
            let sorted = cods.sort((a, b) => {
              if (a > b) {
                return -1;
              }
              if (a < b) {
                return 1;
              }
              return 0;
            });
            dataKeys[ind] = sorted;
          });
          click = 0;
          FilterLines(data);
        }
      }
    }
  });
});
