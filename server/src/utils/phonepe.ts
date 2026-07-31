import { StandardCheckoutClient, Env, StandardCheckoutPayRequest } from '@phonepe-pg/pg-sdk-node';

const clientId = process.env.PHONE_PAY_CLIENT_ID || "PGTESTPAYUAT";
const clientSecret = process.env.PHONE_PAY_CLIENT_SECRET || "099eb0cd-02cf-4e2a-840e-0667a304494a";
const clientVersion = 1; // Default client version
const env = process.env.NODE_ENV === 'production' ? Env.PRODUCTION : Env.SANDBOX;

// Webhook/Callback credentials (set these in your dashboard)
const callbackUsername = process.env.PHONEPE_CALLBACK_USERNAME || "test_user";
const callbackPassword = process.env.PHONEPE_CALLBACK_PASSWORD || "test_pass";

/**
 * Get PhonePe Standard Checkout Client Instance
 */
const getPhonePeClient = () => {
  return StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
};

/**
 * Initiates a PhonePe Payment using the SDK
 */
export const initiatePhonePePayment = async (
  transactionId: string,
  amount: number, // in Paise
  redirectUrl: string
) => {
  const client = getPhonePeClient();

  const request = StandardCheckoutPayRequest.builder()
    .merchantOrderId(transactionId)
    .amount(amount)
    .redirectUrl(redirectUrl)
    .build();

  try {
    const response = await client.pay(request);

    return {
      success: response.state === 'COMPLETED' || response.state === 'REDIRECT' || response.state === 'PENDING',
      state: response.state,
      redirectUrl: response.redirectUrl,
      data: {
        instrumentResponse: {
          redirectInfo: {
            url: response.redirectUrl
          }
        }
      }
    };
  } catch (error: any) {
    console.error("PhonePe SDK Pay Error:", error);
    return {
      success: false,
      message: error.message || error?.data?.message || "Internal SDK Error",
      error: error
    };
  }
};

/**
 * Verifies Payment Status using the SDK
 */
export const verifyPhonePePayment = async (transactionId: string) => {
  const client = getPhonePeClient();
  const response = await client.getOrderStatus(transactionId);

  return {
    success: response.state === 'COMPLETED',
    code: response.state === 'COMPLETED' ? "PAYMENT_SUCCESS" : response.state,
    data: {
      transactionId: response.paymentDetails[0]?.transactionId,
      merchantTransactionId: response.merchantOrderId
    }
  };
};

/**
 * Verifies PhonePe Callback using the SDK
 */
export const verifyPhonePeChecksum = (
  base64Response: string,
  checksumHeader: string
) => {
  try {
    const client = getPhonePeClient();
    // validateCallback returns a CallbackResponse object or throws if invalid
    const response = client.validateCallback(callbackUsername, callbackPassword, checksumHeader, base64Response);
    return !!response;
  } catch (error) {
    console.error("PhonePe Callback Validation Failed:", error);
    return false;
  }
};
