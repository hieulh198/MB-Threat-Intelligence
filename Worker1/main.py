import coloredlogs
import logging
import src.modules.bazaar as bazaar

# Set up logger
logger = logging.getLogger(__name__)
coloredlogs.install(level="DEBUG")

# Run App
logger.info("Signature RedLineStealer Data - Worker01")

bazaar.main()
