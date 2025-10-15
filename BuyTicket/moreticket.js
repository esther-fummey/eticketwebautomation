const { Builder, By, until } = require('selenium-webdriver');

//enter the number tickets
const numberoftickets = 3
const phonenumber = "0551442563"
const email = "b@gmail.com"
const otp = 12345

// Reusable: select network by nth position (1 = MTN, 2 = AT, 3 = Telecel)
async function selectNetwork(driver, nth) {
  const networkXpath = `(//div[@class='rw']//div[@class='column']//div[@class='select']/img)[${nth}]`;

  const network = await driver.wait(
    until.elementLocated(By.xpath(networkXpath)),
    10000
  );

  await driver.wait(until.elementIsVisible(network), 10000);
  await network.click();

  console.log(`✅ Clicked on network #${nth}`);
}

async function moreticket(browserName) {
  let eticket;
  try {
    eticket = await new Builder().forBrowser(browserName).build();
    // await eticket.manage().window().maximize();
    await eticket.manage().window().setRect({ width: 1920, height: 1080, x: 1920, y: 0 });
    await eticket.manage().window().maximize();

    // Open the app
    await eticket.get('http://159.8.238.90:7047/home');
    await eticket.sleep(5000);

    // Locate Top Picks
    const toppicks = await eticket.wait(
      until.elementLocated(By.xpath("(//div[@class='title'])[1]"))
    );
    await eticket.wait(until.elementIsVisible(toppicks));
    console.log(`✅ ${browserName}: Top Picks element found!`);
    await eticket.sleep(5000);

    // Click on first event image
    await eticket.findElement(By.xpath(
      "/html/body/app-root/app-home-layout/main/div[2]/div/app-home/main/div[1]/div[2]/app-event-container[1]/section/div[1]/img"
    )).click();
    await eticket.sleep(5000);

    // Step 1: Open dropdown
    const dropdown = await eticket.wait(
      until.elementLocated(By.xpath(
        "/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[1]/div/div[2]/div[1]/div/div[2]/div[2]/div"
      )),
    );
    await eticket.wait(until.elementIsVisible(dropdown));
    await dropdown.click();
    console.log("✅ Dropdown opened");

    // Step 2: Select the date

    // Step 1: Locate the dropdown container
const droppdown = await eticket.findElement(By.css("div.select"));

// Step 2: Get all the available dates
const dateOptions = await droppdown.findElements(By.css("div.list"));

// Step 3: Pick the first available date (dynamic handling)
if (dateOptions.length > 0) {
  const firstDate = dateOptions[0];
  const dateText = await firstDate.getText();
  await firstDate.click();
  console.log("📅 Selected first available date:", dateText);
} else {
  console.log("⚠️ No dates found in dropdown!");
}

    // const dateOption = await eticket.wait(
    //   until.elementLocated(By.xpath("/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[1]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]"))
    // );
    // await dateOption.click();
    console.log("📅 Selected date: 2025-06-30");

    // Select time
    await eticket.findElement(By.xpath(
      "/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[1]/div/div[2]/div[1]/div/div[2]/div[3]/div/div/h3"
    )).click();
    await eticket.sleep(3000);

    // Enter ticket quantity
    await eticket.findElement(By.xpath(
      "/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[1]/div/div[2]/div[1]/div/div[2]/div[5]/div/div[2]/input"
    )).sendKeys(numberoftickets);
    await eticket.sleep(3000);

    await eticket.findElement(By.xpath("/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[1]/div/div[2]/div[1]/div/div[2]/div[6]/div/div[2]/input")).sendKeys(numberoftickets);
    await eticket.sleep(3000);

    // Click Buy/Continue
    await eticket.findElement(By.xpath(
      "/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[1]/div/div[2]/div[1]/div/div[2]/app-secondary-button/main/div"
    )).click();
    await eticket.sleep(3000);

    // Confirm in overlay
    await eticket.findElement(By.xpath(
      "/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/main/div[2]/app-my-tiket-overlay/section/div/div/app-secondary-button/main/div"
    )).click();
    await eticket.sleep(3000);

    // Select MTN (network #1)
    await selectNetwork(eticket, 2);

    // Uncomment to test others:
    // await selectNetwork(eticket, 2); // AT
    // await selectNetwork(eticket, 3); // Telecel

    //enter ur phone number
    await eticket.findElement(By.id("phoneNumber")).sendKeys(phonenumber)

    //enter ur email

    await eticket.findElement(By.id("email")).sendKeys(email)

    // click on view summary
    await eticket.findElement(By.xpath("/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/app-payment-overlay/section/div/div/div[4]/app-secondary-button/main/div")).click()

    await eticket.sleep(5000)

    //click on terms and conditions
    await eticket.findElement(By.xpath('//*[@id="terms"]')).click()

    await eticket.sleep(5000)

    //click on proceed
    await eticket.findElement(By.xpath("/html/body/app-root/app-home-layout/main/div[2]/div/app-events-page/app-payment-overlay/section/div/div/div[4]/app-secondary-button/main/div")).click()

    await eticket.sleep(5000)






  } catch (err) {
    console.error(`❌ ${browserName}: Test failed -`, err.message);
  } finally {
    if (eticket) {
      await eticket.sleep(3000);
      await eticket.quit();
    }
  }
}

// Run in multiple browsers
(async function runMultiBrowsers() {
  await moreticket('chrome');
  // await navbarTest('firefox');
  // await navbarTest('MicrosoftEdge'); // if Edge WebDriver is set up
})();
