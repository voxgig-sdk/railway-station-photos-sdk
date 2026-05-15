# ProjectName SDK exists test

import pytest
from railwaystationphotos_sdk import RailwayStationPhotosSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RailwayStationPhotosSDK.test(None, None)
        assert testsdk is not None
