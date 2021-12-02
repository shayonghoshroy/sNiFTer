from httpx import AsyncClient

class InfuraClient(AsyncClient):
    def __init__(self, *args, **kwargs):
        super(InfuraClient, self).__init__(*args, **kwargs)

        self.super_secret_key = "6c33994d5ed649d69fd9b3c2605f0cab"
