class APIException(Exception):
    def __init__(self, service: str, endpoint: str, status_code: int, reason_phrase: str) -> None:
        message = f"Unable to fetch from {endpoint} located at {service}"
        super().__init__(message)
        
        self.service = service
        self.endpoint = endpoint
        self.status_code = status_code
        self.reason_phrase = reason_phrase

