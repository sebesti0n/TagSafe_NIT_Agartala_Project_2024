package com.leftshift.myapplication.datamodel

data class UserSchema(
    val ConfirmPassword: String,
    val Email: String,
    val Name: String,
    val Password: String,
    val aadharNumber: String,
    val addressLine1: String,
    val city: String,
    val isAdmin: Boolean,
    val phoneNumber: String,
    val state: String,
    val user_id: Int
)
