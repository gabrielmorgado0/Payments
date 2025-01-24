export const DEFAULT_CONFIG = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
    allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    environment: 'TEST',
    gateway: 'example'
};

export const createBaseRequest = (config) => ({
    apiVersion: config.apiVersion,
    apiVersionMinor: config.apiVersionMinor
});

export const createTokenizationSpec = (config) => ({
    type: 'PAYMENT_GATEWAY',
    parameters: {
        'gateway': config.gateway,
        'gatewayMerchantId': config.merchantId
    }
});
