let conJsonToObj = "";

function onload() {
  let check = localStorage.getItem("userData");
  conJsonToObj = JSON.parse(check);
  if (check == null) {
    main.style.display = "none";
    bar.style.display = "none";
  } else {
    allRegister.style.display = "none";
    writeData(conJsonToObj);
    myTreatments(conJsonToObj);
    cWeather(conJsonToObj.city, "cityWeather");
    nTest(conJsonToObj);
    presentHisFromLs();
  }
}

let otherCity = document.querySelector("#otherCity");

otherCity.addEventListener("change", (event) => {
  otherCityWeather.innerHTML = "";
  cWeather(event.target.value, "otherCityWeather");
});

let cityChoice = "";
let cityChoiceHe = "";
let city = document.querySelector("#city");

city.addEventListener("change", (event) => {
  cityChoice = event.target.value;
  cityChoiceHe = city.options[city.selectedIndex].text;
});

let manufacturerChoice = "";
let manufacturer = document.querySelector("#manufacturer");
manufacturer.addEventListener("change", (event) => {
  manufacturerChoice = event.target.value;
  selectManufacturer(manufacturerChoice);
});

let subManufacturerChoice = "";
let subManufacturer = document.querySelector("#subManufacturer");
subManufacturer.addEventListener("change", (event) => {
  subManufacturerChoice = event.target.value;
});

let radioSelected = "";
let selected = document.getElementsByName("selected");
console.log(selected);
console.log(selected[0].checked);

let addData = document.querySelector("#addData");
addData.addEventListener("click", () => {
  checkData();
});

let firstName = document.querySelector("#firstName");
firstName.addEventListener("keyup", (event) => {
  oString(event,firstName);
});

let lastName = document.querySelector("#lastName");
lastName.addEventListener("keyup", (event) => {
  oString(event,lastName);
});

function oString(event,someText) {
  let temp = event.target.value
  let len = event.target.value.length-1
    if (temp[len]<'א' || temp[len]>'ת') {
        alert("הכנס אותיות בלבד")
        someText.value = temp.slice(0,len)
    }
}

let modelNumber = document.querySelector("#modelNumber");
modelNumber.addEventListener("keyup", (event) => {
  oNumber(event);
});

let utz = document.querySelector("#utz");
utz.addEventListener("keyup", (event) => {
  oNumber(event);
});

function oNumber(event){
  let temp = event.target.value
  let len = event.target.value.length-1
    if (temp[len]<'0' || temp[len]>'9') {
        alert("הכנס מספרים בלבד")
        firstName.value = temp.slice(0,len)
        modelNumber.value = temp.slice(0,len)
        utz.value = temp.slice(0,len)
    }
}


function checkData() {
  if (firstName.value == "" || lastName.value == "") {
    alert("הכנס בבקשה שם מלא");
    return;
  }
  if (cityChoice == "") {
    alert("אנא בחר אזור עיר");
    return;
  }
  if (manufacturerChoice == "") {
    alert("אנא בחר יצרן");
    return;
  }
  if (subManufacturerChoice == "") {
    alert("אנא בחר דגם");
    return;
  }
  if (dateRoad.value == "") {
    alert("אנא הכנס תאריך עליה לכביש");
    return;
  }
  if (modelNumber.value == "") {
    alert("אנא הכנס מספר רישוי תקין");
    return;
  }
  if (selected[0].checked == false && selected[1].checked == false) {
    alert("אנא בחר מד אוץ");
    return;
  } else {
    if (selected[0].checked == true) {
      radioSelected = selected[0].value;
    } else {
      radioSelected = selected[1].value;
    }
  }
  if (utz.value == "") {
    alert("אנא הכנס מס' קילומטר / שעות מנוע");
  } else {
    saveToLocal();
  }
}

function saveToLocal() {
  let allData = {
    firstName: firstName.value,
    lastName: lastName.value,
    city: cityChoice,
    cityHe: cityChoiceHe,
    manufacturer: manufacturerChoice,
    subManufacturer: subManufacturerChoice,
    dateRoad: dateRoad.value,
    modelNumber: modelNumber.value,
    utz: utz.value,
    selected: radioSelected,
    motoImageUrl: "./image/moto/" + subManufacturerChoice + ".jpg",
  };

  console.log(city);

  let conObjToJson = JSON.stringify(allData);
  localStorage.setItem("userData", conObjToJson);
  location.reload();
}

function writeData(conJsonToObj) {
  walcome.innerHTML += "ברוך הבא  " + conJsonToObj.firstName;
  fName.innerHTML +=
    "שם: " + conJsonToObj.firstName + " " + conJsonToObj.lastName;
  cName.innerHTML += "עיר: " + conJsonToObj.cityHe;
  mName.innerHTML =
    "דגם אופנוע: " +
    conJsonToObj.manufacturer +
    " " +
    conJsonToObj.subManufacturer;
  dRoad.innerHTML = "ת. עליה לכביש: " + conJsonToObj.dateRoad;
  model.innerHTML = "מס' רישוי: " + conJsonToObj.modelNumber;
  mUtz.innerHTML = "מד אוץ: " + conJsonToObj.utz + " " + conJsonToObj.selected;
  myMoto.src = conJsonToObj.motoImageUrl
}

const motorcycleList = [
  { model: "honda", subModel: ["crf250L", "crf450RX", "xadv 750"] },
  { model: "ktm", subModel: ["790 Adventure", "390 Adventure", "6 Days"] },
  { model: "beta", subModel: ["125 RR", "250 Xtrainer", "300 RR"] },
  { model: "suzuki", subModel: ["v-strom 650"] },
];

function selectManufacturer(manufacturerChoice) {
  let byModel = motorcycleList.filter((x) => x.model == manufacturerChoice);

  let tempArray = [...byModel[0].subModel];

  console.log(byModel[0].subModel);

  subManufacturer.innerHTML = "";

  let option = document.createElement("option");
  option.value = "";
  option.text = "בחר דגם";
  option.selected = true;
  option.disabled = true;
  subManufacturer.appendChild(option);

  tempArray.map((sub) => {
    let option = document.createElement("option");
    option.value = sub;
    option.text = sub;
    subManufacturer.appendChild(option);
  });
}

const treatmentsList = [
  { sub: "crf250L", kind: 0, tret: "" },
  { sub: "crf250L", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "crf250L", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "crf250L", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "crf450RX", kind: 0, tret: "" },
  { sub: "crf450RX", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "crf450RX", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "crf450RX", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "xadv 750", kind: 0, tret: "" },
  { sub: "xadv 750", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "xadv 750", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "xadv 750", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "790 Adventure", kind: 0, tret: "" },
  { sub: "790 Adventure", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "790 Adventure", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "790 Adventure", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "390 Adventure", kind: 0, tret: "" },
  { sub: "390 Adventure", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "390 Adventure", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "390 Adventure", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "6 Days", kind: 0, tret: "" },
  { sub: "6 Days", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "6 Days", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "6 Days", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "125 RR", kind: 0, tret: "" },
  { sub: "125 RR", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "125 RR", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "125 RR", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "250 Xtrainer", kind: 0, tret: "" },
  { sub: "250 Xtrainer", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "250 Xtrainer", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "250 Xtrainer", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "300 RR", kind: 0, tret: "" },
  { sub: "300 RR", kind: 3000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "300 RR", kind: 6000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
  { sub: "300 RR", kind: 9000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים, מתיחת שרשרת." },

  { sub: "v-strom 650", kind: 0, tret: "" },
  { sub: "v-strom 650", kind: 6000, tret: "שמן מנוע, פילטר שמן." },
  { sub: "v-strom 650", kind: 12000, tret: "שמן מנוע, פילטר שמן, נוזל טלסקופים." },
];

let nextTreatment = 0;

let nKmT = 0;

function myTreatments(conJsonToObj) {
  nextTreatment = 0;

  let tempSubModel = treatmentsList.filter(
    (t) => t.sub == conJsonToObj.subManufacturer
  );

  let rangeTreatment = tempSubModel[1].kind - tempSubModel[0].kind;

  nKmT = (Math.floor(conJsonToObj.utz / rangeTreatment) + 1) * rangeTreatment;

  let typeT = conJsonToObj.utz % tempSubModel[tempSubModel.length - 1].kind;
  console.log(typeT);

  for (let i = 0; i < tempSubModel.length; i++) {
    if (typeT >= tempSubModel[i].kind && typeT < tempSubModel[i + 1].kind) {
      nextTreatment = tempSubModel[i + 1];
    }
  }

  kmTreatment.innerHTML += nKmT + " " + conJsonToObj.selected;

  typeTreatment.innerHTML += nextTreatment.tret;

  console.log(nextTreatment);
}

function nTest(conJsonToObj) {
  let dateR = new Date(conJsonToObj.dateRoad);

  console.log(dateR);

  let dateN = new Date();

  if (dateR.getMonth() + 1 < dateN.getMonth() + 1) {
    nextTest.innerHTML +=
      "בתאריך: " +
      (dateN.getFullYear() + 1) +
      "-" +
      (dateR.getMonth() + 1) +
      "-" +
      dateR.getDate();
  }
  if (dateR.getMonth() + 1 == dateN.getMonth() + 1) {
    if (dateR.getDate() < dateN.getDate()) {
      nextTest.innerHTML +=
        "בתאריך: " +
        (dateN.getFullYear() + 1) +
        "-" +
        (dateR.getMonth() + 1) +
        "-" +
        dateR.getDate();
    }
    if (dateR.getDate() == dateN.getDate()) {
      nextTest.innerHTML +=
        "בתאריך: " +
        dateN.getFullYear() +
        "-" +
        (dateR.getMonth() + 1) +
        "-" +
        dateR.getDate();
    }
    if (dateR.getDate() > dateN.getDate()) {
      nextTest.innerHTML +=
        "בתאריך: " +
        dateN.getFullYear() +
        "-" +
        (dateR.getMonth() + 1) +
        "-" +
        dateR.getDate();
    }
  }
  if (dateR.getMonth() + 1 > dateN.getMonth() + 1) {
    nextTest.innerHTML +=
      "בתאריך: " +
      dateN.getFullYear() +
      "-" +
      (dateR.getMonth() + 1) +
      "-" +
      dateR.getDate();
  }
}

async function cWeather(paramA, paramB) {
  let paramterB = document.querySelector("#" + paramB);
  if(paramB == "cityWeather") {
    owrArea.style.backgroundImage = `url("./image/city/${paramA}.jpg")`
    titleCity.innerHTML+= "   - "+conJsonToObj.cityHe
  } 

  const api =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    paramA +
    "&units=metric&appid=db3ebfb0b3b1d68efa11085ddd975176";

  try {
    let res = await fetch(api);
    let data = await res.json();
    // console.log(data)
    // console.log(data.list[0].weather[0].icon)
    console.log(data.list)
    // console.log(city);

    for (let i = 0; i < data.list.length; i += 8) {
      let somediv = document.createElement("div");
      somediv.setAttribute("class", "somediv");
 

      let tempImg = document.createElement("img");
      tempImg.setAttribute("class", "icon");
      let tempNow = document.createElement("span");
      let tempTime = document.createElement("span");
      tempNow.setAttribute("class", "des");
      tempTime.setAttribute("class", "des");

      tempImg.setAttribute(
        "src",
        "./image/weather/" + data.list[i].weather[0].icon + ".png"
      );
      tempNow.innerHTML += "<br/>" + data.list[i].dt_txt.slice(0,10) + "<br/>" + "טמפ': " + "℃ "+ data.list[i].main.temp + "<br/>" + "לחות: " + data.list[i].main.humidity + "%" + "<br/>" + " רוח: " + data.list[i].wind.speed + " מ' לשניה";

      // tempTime.innerHTML = data.list[i].dt_txt

      paramterB.appendChild(somediv);

      somediv.appendChild(tempImg);
      // somediv.appendChild(tempTime)
      somediv.appendChild(tempNow);
    }
  } catch (error) {
    console.log(error);
  }
}

let doneTr = document.querySelector("#doneTr");
doneTr.addEventListener("click", () => {
  saveToLocalHis();
  console.log(conJsonToObj);
  console.log(nKmT);
});

function presentHisFromLs() {
  let checkHisTr = localStorage.getItem("hisTreatemnt");
  if (checkHisTr == null) {
    let title = document.createElement("h2");
    title.innerHTML = "לא קיימת היסטורית טיפולים";
    historyTreatment.appendChild(title);
  } else {
    let temp = JSON.parse(checkHisTr);
    for (let i = 0; i < temp.length; i++) {
      let date = document.createElement("h2");
      let utz = document.createElement("h2");
      let typeTreatment = document.createElement("h2");
      let div = document.createElement("div")
      div.setAttribute("class", "hisNote")
      date.innerHTML = "תאריך: " + temp[i].date;
      utz.innerHTML = "מד אוץ: " + temp[i].utz;
      typeTreatment.innerHTML = "סוג טיפול: " + temp[i].typeTreatment;
      div.appendChild(date);
      div.appendChild(utz);
      div.appendChild(typeTreatment);
      historyTreatment.appendChild(div)
    }
  }
  let checkFreeTr = localStorage.getItem("freeTreatment");
  if (checkFreeTr == null) {
    let title = document.createElement("h2");
    title.innerHTML = "לא קיימת היסטורית טיפולים יזומה";
    freeTreatment.appendChild(title);
  } else {
    let temp = JSON.parse(checkFreeTr);
    for (let i = 0; i < temp.length; i++) {
      let date = document.createElement("h2");
      let utz = document.createElement("h2");
      let typeTreatment = document.createElement("h2");
      let div = document.createElement("div")
      div.setAttribute("class", "hisNote")
      date.innerHTML = "תאריך: " + temp[i].date;
      utz.innerHTML = "מד אוץ: " + temp[i].utz;
      typeTreatment.innerHTML = "סוג טיפול: " + temp[i].typeTreatment;
      div.appendChild(date);
      div.appendChild(utz);
      div.appendChild(typeTreatment);
      freeTreatment.appendChild(div)
    }
  }
}

function saveToLocalHis() {
  let formtDate = new Date();
  let shortDate =
    formtDate.getFullYear() +
    "/" +
    (formtDate.getMonth() + 1) +
    "/" +
    formtDate.getDate();

  let checkHisTr = localStorage.getItem("hisTreatemnt");
  if (checkHisTr == null) {
    let temp = [
      { date: shortDate, utz: nKmT, typeTreatment: nextTreatment.tret },
    ];
    let conObjToJsonTreat = JSON.stringify(temp);
    localStorage.setItem("hisTreatemnt", conObjToJsonTreat);
  } else {
    let temp = JSON.parse(checkHisTr);
    temp.push({
      date: shortDate,
      utz: nKmT,
      typeTreatment: nextTreatment.tret,
    });
    localStorage.removeItem("hisTreatemnt");
    let conObjToJsonTreat = JSON.stringify(temp);
    localStorage.setItem("hisTreatemnt", conObjToJsonTreat);
  }

  conJsonToObj.utz = nKmT;

  localStorage.removeItem("userData");
  let conObjToJson = JSON.stringify(conJsonToObj);
  localStorage.setItem("userData", conObjToJson);
  location.reload();

  console.log(nextTreatment);
}

let saveFree = document.querySelector("#saveFree");
saveFree.addEventListener("click", () => {
  saveToLocalFree();
});

function saveToLocalFree() {
  let formtDate = new Date();
  let shortDate =
    formtDate.getFullYear() +
    "/" +
    (formtDate.getMonth() + 1) +
    "/" +
    formtDate.getDate();
  if (freeWriteTreatment.value == "") {
    alert("הכנס בבקשה פרטי טיפול");
  } else {
    let checkFreeTr = localStorage.getItem("freeTreatment");
    if (checkFreeTr == null) {
      let temp = [
        {
          date: shortDate,
          utz: conJsonToObj.utz,
          typeTreatment: freeWriteTreatment.value,
        },
      ];
      let conObjToJsonFreeTreat = JSON.stringify(temp);
      localStorage.setItem("freeTreatment", conObjToJsonFreeTreat);
    } else {
      let temp = JSON.parse(checkFreeTr);
      temp.push({
        date: shortDate,
        utz: conJsonToObj.utz,
        typeTreatment: freeWriteTreatment.value,
      });
      localStorage.removeItem("freeTreatment");
      let conObjToJsonFreeTreat = JSON.stringify(temp);
      localStorage.setItem("freeTreatment", conObjToJsonFreeTreat);
    }
    location.reload();
  }
}

function deleteUser() {
  if (confirm("האם אתה בטוח שברצונך למחוק את שם המשתמש מהמערכת?")) {
    localStorage.clear();
    location.reload();
  } else {
  }
}

onload();
