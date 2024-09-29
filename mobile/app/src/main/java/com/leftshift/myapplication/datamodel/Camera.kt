package com.leftshift.myapplication.datamodel

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class Camera(
    val RTSP_Link: String,
    val cam_id: Int,
    val cameraName: String,
    val latitude: String,
    val longitude: String,
    val owner_id: Int,
    val pov_direction: String,
    val resolution: String,
    val isLive: Boolean
):Parcelable