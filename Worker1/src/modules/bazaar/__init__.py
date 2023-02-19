
import time
from asyncio.log import logger
from src.constants.bazaar import BAZAAR_UPDATE_SECONDS
from src.modules.bazaar.data import Data


def bootstrap_job():
    data = Data()
    data.store.reset()
    data.getRedLineStealerList()
    data.store.logout()
    time.sleep(BAZAAR_UPDATE_SECONDS)
    schedule_job()


def schedule_job():
    data = Data()
    data.updateRedLineStealerList()
    data.store.logout()
    time.sleep(BAZAAR_UPDATE_SECONDS)
    schedule_job()


def main():
    bootstrap_job()
