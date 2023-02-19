
import time
from asyncio.log import logger
from src.constants.bazaar import BAZAAR_UPDATE_SECONDS
from src.modules.bazaar.data import Data


def main(arg):
    data = Data()
    data.exportExcel(arg)
    data.store.logout()
