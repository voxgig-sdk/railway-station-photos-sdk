# RailwayStationPhotos SDK feature factory

from railwaystationphotos_sdk.feature.base_feature import RailwayStationPhotosBaseFeature
from railwaystationphotos_sdk.feature.test_feature import RailwayStationPhotosTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RailwayStationPhotosBaseFeature(),
        "test": lambda: RailwayStationPhotosTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
