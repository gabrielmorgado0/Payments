export const createPaymentMethodConfig = (config) => {
    const baseCardPaymentMethod = {
        type: 'CARD',
        parameters: {
            allowedAuthMethods: config.allowedCardAuthMethods,
            allowedCardNetworks: config.allowedCardNetworks
        }
    };

    const tokenizationSpec = createTokenizationSpec(config);
    return Object.assign({ tokenizationSpecification: tokenizationSpec }, baseCardPaymentMethod);
};

export const createTransactionInfo = (amount, currency = 'BRL', country = 'BR') => ({
    displayItems: [{
        label: "Subtotal",
        type: "SUBTOTAL",
        price: amount.toString(),
    }],
    countryCode: country,
    currencyCode: currency,
    totalPriceStatus: "FINAL",
    totalPrice: amount.toString(),
    totalPriceLabel: "Total"
});
