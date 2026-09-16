# RailwayStationPhotos SDK feature factory

from railwaystationphotos_sdk.feature.base_feature import RailwayStationPhotosBaseFeature
from railwaystationphotos_sdk.feature.ratelimit_feature import RailwayStationPhotosRatelimitFeature
from railwaystationphotos_sdk.feature.retry_feature import RailwayStationPhotosRetryFeature
from railwaystationphotos_sdk.feature.test_feature import RailwayStationPhotosTestFeature
from railwaystationphotos_sdk.feature.timeout_feature import RailwayStationPhotosTimeoutFeature


_FEATURES = {
    "base": lambda: RailwayStationPhotosBaseFeature(),
    "ratelimit": lambda: RailwayStationPhotosRatelimitFeature(),
    "retry": lambda: RailwayStationPhotosRetryFeature(),
    "test": lambda: RailwayStationPhotosTestFeature(),
    "timeout": lambda: RailwayStationPhotosTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
