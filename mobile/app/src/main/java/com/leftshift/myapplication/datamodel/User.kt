package com.leftshift.myapplication.datamodel

data class User(
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
)