const container = document.querySelector(".container");

const btn = document.querySelector("button");

function userGenerator(nameObj) {
  const nameObject = {};
  nameObject.firstName = nameObj.first;
  nameObject.lastName = nameObj.last;
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
  console.log(nameObject);
  addUser(nameObject);
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
  userName.innerText = `${userData.firstName}  ${userData.lastName}`;
  userName.classList = "col_1";
  const userWealth = document.createElement("div");
  userWealth.innerText = numberWithCommas(userData.wealth);
  userWealth.className = "col_2";
  row.append(userName, userWealth);
  container.appendChild(row);
}
function add() {
  getData().then((response) => {
    userGenerator(response);
  });
}

btn.addEventListener("click", myClick);
