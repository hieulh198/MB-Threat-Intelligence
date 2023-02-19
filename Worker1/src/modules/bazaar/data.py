
import requests
import pandas as pd
from asyncio.log import logger
from src.constants.bazaar import BAZAAR_API, BAZAAR_SIGNATURE
from src.utils.splunk import Splunk


class Data:
    def __init__(self):
        self.store = Splunk()

    def getRedLineStealerList(self):
        try:
            payload = {
                'query': 'get_siginfo',
                'signature': BAZAAR_SIGNATURE,
                'limit': '1000'
            }
            response = requests.post(BAZAAR_API, data=payload)
            response_data = response.json()
            for record in response_data['data']:
                self.store.insert_to_kv_store(record)
        except requests.exceptions.RequestException as e:
            logger.error(f"Request error: {e}")

    def updateRedLineStealerList(self):
        try:
            payload = {
                'query': 'get_siginfo',
                'signature': BAZAAR_SIGNATURE,
                'limit': '1000'
            }
            response = requests.post(BAZAAR_API, data=payload)
            response_data = response.json()['data']
            data_stored = self.store.get_kv_store()
            df = pd.DataFrame(data_stored)
            hash_set = set(df['sha256_hash'])
            for record in response_data:
                if record['sha256_hash'] not in hash_set:
                    self.store.insert_to_kv_store(record)

        except requests.exceptions.RequestException as e:
            logger.error(f"Request error: {e}")
