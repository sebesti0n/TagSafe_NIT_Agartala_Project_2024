package com.leftshift.myapplication.api

import com.leftshift.myapplication.datamodel.User
import com.leftshift.myapplication.datamodel.UserResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface AuthAPI {

    @POST("/register")
    fun register(
        @Body
        user:User
    ): Call<UserResponse>

    @GET("/login")
    fun login(
        @Query("email") email: String,
        @Query("password") password: String
    ): Call<UserResponse>
}