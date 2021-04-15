const { Router } = require('express');
const PurchasesService = require('../../core/billing/PurchasesService');

const router = Router();

const _verifyReceipt = async (platform, purchaseToken) => {
  let error = '';
  let result;

  if (!['ios', 'android'].includes(platform))
    error = `Platform ${platform} is not supported!`;

  if (platform === 'android')
    error = 'Purchase verification for Android is not yet implemented!';
  else if (platform === 'ios')
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
 * @param :platform - Mobile platform of the app session (ios or android)
 * @param :purchaseToken - Purchase Token to be verified
 */
router.post('/:id/platforms/:platform', async (req, res) => {
  const { purchase } = req.body;
  const { id, platform } = req.params;
  const { error, result } = await _verifyReceipt(
    platform,
    purchase.transactionReceipt
  );

  if (error) return res.status(500).send(`Purchase not verified: ${error}`);
  else {
    // add saving of purchase details here
  }

  return res.send({
    message: 'Purchase verified!',
    data: result,
  });
});

/**
 * Verifies a purchase of the user with the Platform's Bill System
 *
 * @param :id - ID of the purchase
 * @param :platform - Mobile platform of the app session (ios or android)
 * @param :purchaseToken - Purchase Token to be verified
 */
router.post('/:id/platforms/:platform/verify', async (req, res) => {
  const { purchase } = req.body;
  const { id, platform } = req.params;
  const { error, result } = await _verifyReceipt(
    platform,
    purchase.transactionReceipt
  );

  if (error) return res.status(500).send(`Purchase not verified: ${error}`);

  return res.send({
    message: 'Purchase verified!',
    data: result,
  });
});

module.exports = router;
