package com.leftshift.myapplication.repositories

import android.content.Context
import android.util.Log
import com.leftshift.myapplication.api.RetrofitInstance
import com.leftshift.myapplication.datamodel.User
import com.leftshift.myapplication.datamodel.UserResponse
import com.leftshift.myapplication.datamodel.UserSchema
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthRepository(private val context: Context){

    private val retrofit = RetrofitInstance
    fun login(email: String, password: String, callback: (UserSchema?, String?)-> Unit){
        val call = retrofit.authApi.login(email, password)

        call.enqueue(object: Callback<UserResponse> {
            override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                if(response.isSuccessful){
                    response.body()?.let{
                        callback(it.user[0], it.message)
                    }
                }
                else{
                    response.body()?.let{
                        callback(null, it.message)
                    }
                }
            }

            override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                callback(null, "Something went wrong")
            }

        })
    }

    fun register(user:User, callback: (UserSchema?, String?)-> Unit){
        val call = retrofit.authApi.register(user)
        call.enqueue(object: Callback<UserResponse> {
            override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                Log.w("notification", "rec $call $response")
                if(response.isSuccessful){
                    response.body()?.let{
                        callback(it.user[0], it.message)
                    }
                }
                else{
                    response.body()?.let{
                        callback(null, it.message)
                    }
                }
            }

            override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                callback(null, "Something went wrong")
            }

        })
    }

}