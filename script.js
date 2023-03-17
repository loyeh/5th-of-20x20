const container = document.querySelector(".user_info");
const main = document.querySelector(".main");
const userArray = [];
const btn = document.querySelector("button");

function userGenerator(nameObj) {
  const nameObject = {};
  nameObject.userName = nameObj.first + " " + nameObj.last;

  const wealth = Math.trunc(crypto.getRandomValues(new Uint32Array(1))[0] / 1000);

  // const wealthObj = {
  //   kilo: wealth % 1000,
  //   mega: Math.trunc((wealth % 1000000) / 1000),
  //   giga: Math.trunc((wealth % 1000000000) / 1000000),
  // };
  // let wealth_text = "";
  // if (wealthObj.giga) {
  //   wealth_text += `$ ${wealthObj.giga},`;
  // }
  // if (wealthObj.mega) {
  //   wealth_text += wealthObj.mega;
  // }
  // if (wealthObj.kilo) {
  //   wealth_text += `,${wealthObj.kilo}.00`;
  // }

  //  wealth_text = `$ ${wealthObj.giga},${wealthObj.mega},${wealthObj.kilo}.00`;
  nameObject.wealth = wealth;

  return nameObject;
}
async function getData() {
  const response = await fetch("https://randomuser.me/api");
  if (response.ok) {
    const jsonValue = await response.json();
    nameObj = jsonValue.results[0].name;
    return nameObj;
  } else {
    return Promise.reject("ERROR");
  }
}

function numberWithCommas(x) {
  return "$ " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addUser(userData) {
  const row = document.createElement("div");
  row.className = "row";
  const userName = document.createElement("div");
  userName.innerText = userData.userName;
  userName.classList = "col_1";
  const userWealth = document.createElement("div");
  userWealth.innerText = numberWithCommas(userData.wealth);
  userWealth.className = "col_2";
  row.append(userName, userWealth);
  container.appendChild(row);
}
function add() {
  getData().then((response) => {
    const nameObject = userGenerator(response);
    userArray.push(nameObject);
    addUser(nameObject);
  });
}

function double() {
  const newArray = userArray.map((obj) => {
    obj.wealth = 2 * obj.wealth;
    return obj;
  });

  showUsers(newArray);
}

function showUsers(userArr) {
  container.innerHTML = "";
  userArr.forEach((userObj) => {
    addUser(userObj);
  });
}
function filterUser() {
  const newArray = userArray.filter((obj) => obj.wealth > 999999);

  showUsers(newArray);
}
function sortUser() {
  userArray.sort((a, b) => {
    return b.wealth - a.wealth;
  });

  showUsers(userArray);
}
function total() {
  const totalWealth = userArray.reduce((sum, userObject) => sum + Number(userObject.wealth), 0);
  const row = document.createElement("div");
  row.className = "row total";
  const userName = document.createElement("div");
  userName.innerText = "Total Wealth";
  userName.classList = "col_1";
  const userWealth = document.createElement("div");
  userWealth.innerText = numberWithCommas(totalWealth);
  userWealth.className = "col_2";
  row.append(userName, userWealth);
  container.appendChild(row);
}
window.addEventListener("load", () => {
  for (let i = 0; i < 3; i++) {
    add();
  }
});
window.addEventListener("load", () => {
  console.log(window.screen.width, main.clientWidth);
  if (window.screen.availWidth < 800) {
    const scaleFactor = window.screen.width / 800;
    main.style.scale = `${scaleFactor}`;
    console.log(scaleFactor);
  }
});
