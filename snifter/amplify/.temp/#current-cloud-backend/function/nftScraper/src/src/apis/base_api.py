from typing import Iterable

import httpx

from .exceptions import APIException

class BaseAPI:
    """
    Base class for all external APIs
    """
    def __init__(self, service: str, base_url: str, authentication_key: str = None) -> None:
        self.base_url = base_url
        # If authentication key is required for API
        # TODO:// Implement further token authentication methods
        self.authentication_key = authentication_key
        self.service = service

    async def make_get_request(self, endpoint: str, params: dict = {}):
        async with httpx.AsyncClient(base_url=self.base_url) as client:
            if self.authentication_key:
                # TODO:// Don't hard code this specifically for block chair
                params["key"] = self.authentication_key

            formatted_params = []
            # Format query params
            for key, val in params.items():
                # Each item in list gets appended with key=val
                if isinstance(val, list):
                    for element in val:
                        formatted_params.append(f"{key}={element}")

                else:
                    if val is not None:
                        formatted_params.append(f"{key}={val}")
            
            # Append query params to endpoint
            endpoint += "?" + "&".join(formatted_params)

            # Handle response
            resp = await client.get(endpoint)
            if resp.status_code != 200:
                return APIException(self.service, endpoint, resp.status_code, resp.reason_phrase)
            
            return resp

    def api_exception(self, endpoint, resp):
        return APIException(self.service, endpoint, resp.status_code, resp.reason_phrase)