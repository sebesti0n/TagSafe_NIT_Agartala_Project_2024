package com.leftshift.myapplication.datamodel

data class CameraListResponse(
    val camera: List<Camera>,
    val message: String,
    val success: Boolean
)