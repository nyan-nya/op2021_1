main();

async function main() {
  var gpioAccess = await navigator.requestGPIOAccess();
  var sensorElement = document.getElementById("sensor1");
  var i2cAccess = await navigator.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  var vl = new VL53L0X(port, 0x29);
  await vl.init();

  for (;;) {
    var distance = await vl.getRange();

    await sleep(200);
    if (distance < 6000) {
      sensorElement.classList.add("on");
    } else {
      sensorElement.classList.remove("on");
    }
  }
}
