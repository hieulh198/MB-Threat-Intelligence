
import requests
import os
import pandas as pd
from asyncio.log import logger
from src.constants.bazaar import BAZAAR_API, BAZAAR_SIGNATURE
from src.utils.splunk import Splunk


class Data:
    def __init__(self):
        self.store = Splunk()

    def exportExcel(self, hash):
        list_kv = self.store.get_kv_store()
        file = {}
        for item in list_kv:
            if (hash == item['sha256_hash']):
                file = item
        if (file):
            del file['_user']
            del file['_key']
            current_dir = os.getcwd()
            df = pd.DataFrame.from_dict(file, orient='index').T
            try:
                df.to_excel(f'{current_dir}/download/{hash}.xlsx', index=False)
                return f'{current_dir}/download/{hash}.xlsx'
            except Exception as e:
                print('Export failed: ', e)
        return ''
