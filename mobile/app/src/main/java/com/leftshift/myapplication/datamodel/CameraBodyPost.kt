package com.leftshift.myapplication.datamodel

data class CameraBodyPost(
    val RTSP_Link: String,
    val cameraName: String,
    val latitude: String,
    val longitude: String,
    val owner_id: Int,
    val pov_direction: String,
    val resolution: String,
    val isLive: Boolean
)