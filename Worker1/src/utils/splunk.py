import os
import splunklib.client as client
from asyncio.log import logger
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

splunk_host = os.getenv("splunk_host")
splunk_port = os.getenv("splunk_port")
splunk_user = os.getenv("splunk_user")
splunk_password = os.getenv("splunk_password")
splunk_collection_name = os.getenv("splunk_collection_name")


class Splunk:
    def __init__(self):
        self.service = client.connect(
            host=splunk_host,
            port=splunk_port,
            username=splunk_user,
            password=splunk_password)
        self.check_kv_store()

    def check_kv_store(self):
        if splunk_collection_name not in self.service.kvstore:
            self.service.kvstore.create(splunk_collection_name)

    def get_kv_store(self):
        collection = self.service.kvstore[splunk_collection_name]
        return collection.data.query()

    def insert_to_kv_store(self, record):
        self.service.kvstore[splunk_collection_name].data.insert(record)

    def reset(self):
        collection = self.service.kvstore[splunk_collection_name]
        collection.data.delete()

    def logout(self):
        self.service.logout()
