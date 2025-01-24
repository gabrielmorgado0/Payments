import { DEFAULT_CONFIG, createBaseRequest } from './config';
import { createPaymentMethodConfig, createTransactionInfo } from './utils/payment';
import { handlePaymentError } from './utils/errors';

export class GooglePayClient {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.paymentsClient = null;
        this.paymentConfig = createPaymentMethodConfig(this.config);
    }

    async initialize() {
        if (!window.google?.payments?.api) {
            throw new Error('Google Pay API não encontrada');
        }

        this.paymentsClient = new google.payments.api.PaymentsClient({
            environment: this.config.environment,
            merchantInfo: {
                merchantName: this.config.merchantName,
                merchantId: this.config.merchantId
            }
        });

        return this.checkAvailability();
    }

    async checkAvailability() {
        const request = createBaseRequest(this.config);
        request.allowedPaymentMethods = [this.paymentConfig];

        try {
            const response = await this.paymentsClient.isReadyToPay(request);
            return response.result;
        } catch (error) {
            handlePaymentError(error);
        }
    }

    createButton(options = {}) {
        if (!this.paymentsClient) {
            throw new Error('Cliente não inicializado');
        }

        return this.paymentsClient.createButton({
            onClick: options.onClick || this.handlePayment.bind(this),
            allowedPaymentMethods: [this.paymentConfig],
            buttonColor: options.buttonColor || 'black',
            buttonType: options.buttonType || 'buy'
        });
    }

    async processPayment(amount, currency, country) {
        const paymentDataRequest = createBaseRequest(this.config);
        paymentDataRequest.allowedPaymentMethods = [this.paymentConfig];
        paymentDataRequest.transactionInfo = createTransactionInfo(amount, currency, country);

        try {
            const paymentData = await this.paymentsClient.loadPaymentData(paymentDataRequest);
            return this.sendToBackend(paymentData);
        } catch (error) {
            handlePaymentError(error);
        }
    }

    async sendToBackend(paymentData) {
        try {
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            });
            return response.json();
        } catch (error) {
            handlePaymentError(error);
        }
    }
}
