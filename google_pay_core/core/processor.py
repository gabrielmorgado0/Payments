from typing import Dict, Any
import uuid
from ..utils.logger import get_logger
from .config import GooglePayConfig

logger = get_logger(__name__)

class GooglePayProcessor:
    def __init__(self, config: GooglePayConfig):
        self.config = config
        self.logger = logger

    def validate_payment_data(self, payment_data: Dict) -> bool:
        """Valida os dados do pagamento"""
        if not payment_data or 'paymentMethodData' not in payment_data:
            return False
        
        payment_method = payment_data['paymentMethodData']
        if 'tokenizationData' not in payment_method:
            return False
            
        return True

    def process_payment(self, payment_data: Dict[str, Any]) -> Dict[str, Any]:
        """Processa o pagamento do Google Pay"""
        try:
            self.logger.info("Processando pagamento do Google Pay")
            self.logger.info(f"Dados recebidos: {payment_data}")
            
            if not self.validate_payment_data(payment_data):
                raise ValueError("Dados de pagamento inválidos")
                
            payment_method = payment_data['paymentMethodData']
            self.logger.info(f"Método de pagamento: {payment_method.get('description')}")
            self.logger.info(f"Tipo de cartão: {payment_method.get('type')}")
            
            token = payment_method['tokenizationData'].get('token')
            self.logger.info(f"Token recebido: {token[:10]}...")
            
            transaction_id = f"GP_{str(uuid.uuid4())}"
            self.logger.info(f"Pagamento processado com sucesso. ID: {transaction_id}")
            
            return {
                "success": True,
                "message": "Pagamento processado com sucesso",
                "transaction_id": transaction_id,
                "payment_details": {
                    "card_type": payment_method.get('description'),
                    "transaction_type": self.config.environment,
                    "merchant_name": self.config.merchant_name
                }
            }
            
        except ValueError as e:
            self.logger.error(f"Erro de validação: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
        except Exception as e:
            self.logger.error(f"Erro ao processar pagamento: {str(e)}")
            return {
                "success": False,
                "error": "Erro interno ao processar pagamento"
            }
