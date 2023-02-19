import coloredlogs
import logging
import src.modules.bazaar as bazaar
import sys

# Set up logger
logger = logging.getLogger(__name__)
coloredlogs.install(level="DEBUG")

# Run App
logger.info("Export - Worker02")

args = sys.argv
if len(args) > 1:
    arg = args[1]
    bazaar.main(arg)
