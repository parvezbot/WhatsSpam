const puppeteer = require("puppeteer");
const website = "https://web.whatsapp.com";
try {
    (async () => {
        console.log("Starting...");
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            executablePath:
                "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
        );
        await page.goto(website);
        await page.waitForTimeout(10000);

        //////////////   CONSTANT VARIABLES    ///////////////////
        const contactNumber_groupName =
            "ENTER CONTACT NUMBER OR GROUP NAME HERE";
        const numberOfMessages = 500;
        const message = "";
        const option = 1; // 0 for message 1 for stickers

        /////////////// UPDATE CLASS NAMES IF SITE GETS UPDATED //////////////
        const seachTextbox = "._13NKt";
        const userChatProfile = ".zoWT4";
        const messageTextbox = "._2vbn4";

        //////////////// LOGIC /////////////////
        await page.click(`${seachTextbox}`);
        await page.type(`${seachTextbox}`, contactNumber_groupName);
        await page.waitForSelector(`${userChatProfile}`);
        await page.click(`${userChatProfile}`);
        await page.waitForTimeout(5000);

        ////////////// SWITCH CASE ////////////////
        switch (option) {
            case 0:
                //////////// MESSAGES SPAM ////////////////
                await page.focus(`${messageTextbox}`);
                for (var i = 0; i < numberOfMessages; i++) {
                    // await page.keyboard.type(message);
                    // await page.type(`${messageTextbox}`, message);
                    await page.evaluate(() => {
                        const message = `happy birthday `;
                        document.execCommand("insertText", false, message);
                    });
                    await page.click('span[data-testid="send"]');
                    //await page.waitForTimeout(500);
                }
                break;
            case 1:
                //////////// STICKER SPAM ////////////////
                await page.click('span[data-testid="smiley"]');
                await page.waitForTimeout(2000);
                await page.click('span[data-testid="sticker"]');
                await page.waitForTimeout(2000);
                for (var i = 0; i < numberOfMessages; i++) {
                    await page.click("img.PD3sk._9QB_N._1V-dP");
                    // await page.waitForTimeout(500);
                }
                break;
        }

        console.log("Task Completed!");
    })();
} catch (e) {
    console.log(e);
}
