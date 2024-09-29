package com.leftshift.myapplication.datamodel

data class UserResponse(
    val message: String,
    val success: Boolean,
    val user: List<UserSchema>
)