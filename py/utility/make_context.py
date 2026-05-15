# RailwayStationPhotos SDK utility: make_context

from core.context import RailwayStationPhotosContext


def make_context_util(ctxmap, basectx):
    return RailwayStationPhotosContext(ctxmap, basectx)
