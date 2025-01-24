from dataclasses import dataclass
from typing import Optional

@dataclass
class GooglePayConfig:
    merchant_id: str
    merchant_name: str
    environment: str = 'TEST'
    gateway: str = 'example'
    gateway_merchant_id: Optional[str] = None
    currency_code: str = 'BRL'
    country_code: str = 'BR'
