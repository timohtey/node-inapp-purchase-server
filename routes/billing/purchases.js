const { Router } = require('express');
const PurchasesService = require('../../core/billing/PurchasesService');

const router = Router();

const _verifyReceipt = async ({ platform, purchaseToken }) => {
  let error = '';
  let result;

  if (!['apple', 'android'].includes(platform))
    error = `Platform ${platform} is not supported!`;

  if (platform === 'android')
    error = 'Purchase verification for Android is not yet implemented!';
  else if (platform === 'apple')
    // Add Saving of Purchase details here
    await PurchasesService.verifyAppleReceipt(purchaseToken)
      .then((products) => (result = products))
      .catch((err) => (error = err));

  return {
    error,
    result,
  };
};

/**
 * Saves and verifies a purchase of the user with the Platform's Bill System
 *
 * @param :id - ID of the purchase
 * @param :platform - Mobile platform of the app session (apple or android)
 * @param :purchaseToken - Purchase Token to be verified
 */
router.post(
  '/:id/platforms/:platform/purchaseTokens/:purchaseToken',
  async (req, res) => {
    const { purchase } = req.body;

    const { id } = req.params;

    const { error, result } = await _verifyReceipt(req.params);

    if (error) return res.status(500).send(`Purchase not verified: ${error}`);
    else {
      // add saving of purchase details here
    }

    return res.send('Purchase verified!', result);
  }
);

/**
 * Verifies a purchase of the user with the Platform's Bill System
 *
 * @param :id - ID of the purchase
 * @param :platform - Mobile platform of the app session (apple or android)
 * @param :purchaseToken - Purchase Token to be verified
 */
router.post(
  '/:id/platforms/:platform/purchaseTokens/:purchaseToken/verify',
  async (req, res) => {
    const { id } = req.params;

    const { error, result } = await _verifyReceipt(req.params);

    if (error) return res.status(500).send(`Purchase not verified: ${error}`);

    return res.send('Purchase verified!', result);
  }
);

module.exports = router;
