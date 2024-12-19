CreateAndAdd(organization);

function CreateAndAdd(resData) {
  let organization_content = ``;
  let organization = ``;

  if (resData) {
    resData.map((el, ind) => {
      let cods = Object.keys(el.lines);

      cods.map((man, ind) => {
        let manName = man;

        let lineName = el.lines[man];
        let newLine = `<div class="line">
                  <div class="empty_sqr"></div>
                  <div class="organizations_people_name">
                    <span>${manName}</span>
                  </div>
                  <div class="organizations_people_prof">
                    <span>${lineName}</span>
                  </div>
                </div>`;
        organization_content += newLine;
      });
      let organization_header = `<div class="organization_header">
                <div class="sqr">
                  <div class="table_list_item__open_close_bttn">
                    <div class="open_close_bttn_icon"></div>
                  </div>
                </div>
                <div class="table_list_item_title">
                  <a href="${el.link}" target="_blank" class="line_link">${el.name}</a>
                </div>
              </div>`;
      organization = `
              <div class="classification">
                ${organization_header}
                <div class="organization_content">${organization_content}</div>
              </div>`;
      document
        .querySelector(".table_list")
        .insertAdjacentHTML("beforeend", organization);
      organization_content = ``;
    });

    AddEventListenerForAllLines();

  }
}

function AddEventListenerForAllLines() {
  let openCloseBttns = document.querySelectorAll(".open_close_bttn_icon");
  let linesParent = document.querySelectorAll(".organization_content");

  for (const i in openCloseBttns) {
    if (typeof openCloseBttns[i] == "object") {
      openCloseBttns[i].addEventListener("click", function (event) {
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
  let linesParent = document.querySelectorAll(".organization_content");

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
  let linesParent = document.querySelectorAll(".organization_content");

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
