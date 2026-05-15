package core

type RailwayStationPhotosError struct {
	IsRailwayStationPhotosError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRailwayStationPhotosError(code string, msg string, ctx *Context) *RailwayStationPhotosError {
	return &RailwayStationPhotosError{
		IsRailwayStationPhotosError: true,
		Sdk:              "RailwayStationPhotos",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RailwayStationPhotosError) Error() string {
	return e.Msg
}
