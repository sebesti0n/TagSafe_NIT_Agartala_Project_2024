package com.leftshift.myapplication.api

import com.leftshift.myapplication.datamodel.Camera
import com.leftshift.myapplication.datamodel.CameraBodyPost
import com.leftshift.myapplication.datamodel.CameraDeletePost
import com.leftshift.myapplication.datamodel.CameraListResponse
import com.leftshift.myapplication.datamodel.DefaultResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface CamAPI {
    @POST("/camera/add")
    fun addCamera(
        @Body
        camera:CameraBodyPost
    ):Call<DefaultResponse>

    @GET("/camera/user")
    fun getUserCamera(
        @Query("uid")
        uid:Int
    ):Call<CameraListResponse>

    @POST("/camera/delete")
    fun deleteCamera(
        @Body
        camera: CameraDeletePost
    ): Call<DefaultResponse>

    @POST("/camera/edit")
    fun editCamera(
        @Body
        cam: Camera
    ): Call<CameraListResponse>
}