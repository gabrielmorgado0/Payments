export class GooglePayError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handlePaymentError = (error) => {
    let errorMessage = '';
    switch(error.statusCode) {
        case "CANCELED":
            errorMessage = "Transação cancelada";
            break;
        case "DEVELOPER_ERROR":
            errorMessage = "Erro de configuração";
            break;
        default:
            errorMessage = "Erro ao processar pagamento";
    }
    throw new GooglePayError(error.statusCode, errorMessage);
};
