const appleReceiptVerify = require('node-apple-receipt-verify');
// const googlePlayVerifier = require('google-play-billing-validator');

var PurchasesService = (function () {
  const environment =
    process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

  // https://www.npmjs.com/package/google-play-billing-validator
  // const verifier = new googlePlayVerifier({
  //   email: 'INSERT SERVICE ACCOUNT EMAIL HERE',
  //   key: 'INSERT YOUR PRIVATE KEY HERE',
  // });
  appleReceiptVerify.config({
    secret: process.env.APPLE_IN_APP_PURCHASE_SECRET,
    environment: [environment],
    extended: true,
  });

  /**
   * Validates an In-App Purchase with Apple's Bill System
   * @param {string} purchaseToken
   * @returns a promise with the result of the verification
   */
  function verifyAppleReceipt(purchaseToken) {
    return appleReceiptVerify.validate({
      receipt: purchaseToken,
    });
  }

  return {
    verifyAppleReceipt,
  };
})();

module.exports = PurchasesService;
