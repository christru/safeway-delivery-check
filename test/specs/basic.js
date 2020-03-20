const assert = require('assert')

describe('check safeway delivery day status', () => {
    it('should not display not available at this time ', async () => {
        await browser.url('https://www.safeway.com/account/sign-in.html')
        await browser.pause(3500)
        let userInput = await $('#label-email');
        userInput.setValue('SAFEWAYLOGIN');
		let passwordInput = await $('#label-password');
		passwordInput.setValue('SAFEWAYPASSWORD');
		await browser.pause(2000)
		let submitButton = await $('#btnSignIn')
		await submitButton.click();
		await browser.pause(4000)
		await browser.url('https://www.safeway.com/erums/checkout')
		await browser.pause(4000)
		let dateWrapper = await $('.date-wrapper')
		let dates = await dateWrapper.$$('.date-tile-wrapper')

let noDeliveryMessages = [];
for (var i = dates.length - 1; i >= 0; i--) {
	await dates[i].click()
	await browser.pause(3000)
	let outOfStockMessage = await $('div.not-available > p');
	let oOStext = await outOfStockMessage.getText()
	console.log(`oOStext ${oOStext}`)
	noDeliveryMessages.push({index:i,message:oOStext || null})
}

let nextButton = await $('#nextBtn');
await nextButton.click();
await browser.pause(3000)
dates = await dateWrapper.$$('.date-tile-wrapper')
await dates[dates.length-1].click()
await browser.pause(3500)
let outOfStockMessage = await $('div.not-available > p');
let oOStext = await outOfStockMessage.getText()
noDeliveryMessages.push({index:i,message:oOStext || null})

let filteredMessages = noDeliveryMessages.filter(msg => msg.message != 'Not available at this time.')

let availableAppointment = filteredMessages.length > 0;
let uniqueDateTime = new Date().valueOf();
await browser.saveScreenshot(`./screenshots/webpage${uniqueDateTime}.png`)
await browser.pause(1500)
assert.equal(availableAppointment,true,'Not available is listed for each day')
    })

})