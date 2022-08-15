const clockIn = document.getElementById("clockIn");
const list = document.getElementById("list");
const list2 = document.getElementById("list2");
const list3 = document.getElementById("list3");
const clock = document.getElementById("clock");

clockIn.addEventListener("click", timeStamp);

function clockRunner() {
  let time = moment().format("dddd h:mm:ss");
  clock.innerHTML = time;
  setTimeout(clockRunner, 1000);
}

window.onload = clockRunner();

function timeStamp(event) {
  let timeStamp = moment().format("[Date: ]DD/MM/YYYY [Time: ] HH:mm:ss");
  let id = event.target.id;

  if (id === "clockOut") {
    let localClockIn = localStorage.getItem("clockIn");
    let clockOutStamp = moment().format("DD/MM/YYYY HH:mm:ss");

    let diff = moment
      .utc(
        moment(clockOutStamp, "DD/MM/YYYY HH:mm:ss").diff(
          moment(localClockIn, "DD/MM/YYYY HH:mm:ss")
        )
      )
      .format("HH:mm:ss");

    let node = document.createElement("li");
    node.append(timeStamp);
    document.getElementById("list2").appendChild(node);

    let node = document.createElement("li");
    node.append("Total: " + diff);
    document.getElementById("list3").appendChild(node);

    document.getElementById("clockOut").id = "clockIn";
  } else {
    localStorage.setItem(id, timeStamp);
    let node = document.createElement("li");
    node.append(timeStamp);
    document.getElementById("list").appendChild(node);
    clockIn.id = "clockOut";
  }
}

