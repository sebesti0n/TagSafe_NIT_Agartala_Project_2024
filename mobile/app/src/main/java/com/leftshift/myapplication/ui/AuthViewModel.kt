package com.leftshift.myapplication.ui

import android.app.Application
import android.icu.lang.UScript
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.leftshift.myapplication.api.RetrofitInstance
import com.leftshift.myapplication.datamodel.User
import com.leftshift.myapplication.datamodel.UserResponse
import com.leftshift.myapplication.datamodel.UserSchema
import com.leftshift.myapplication.repositories.AuthRepository
import com.leftshift.myapplication.session.Session
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthViewModel(
    private val app: Application
): AndroidViewModel(app) {

    private var userLiveData = MutableLiveData<UserResponse>()

    fun get():LiveData<UserResponse>{
        return userLiveData
    }
    private val authRepository = AuthRepository(app.applicationContext)
    private val session = Session.getInstance(app.applicationContext)

    fun createSession(name: String, email: String, id: Int){
        session.createSession(
            email, name, id
        )
    }
    fun getUserId(): Int = session.getId()

    fun isLogin(): Boolean = session.isLogin()

    fun logOut(){
        session.logOut()
    }

    private val authRetrofit = RetrofitInstance

    fun userLogin(email: String, password: String){
        val call = authRetrofit.authApi
        call.login(email,password).enqueue(object: Callback<UserResponse>{
            override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                response.body()?.let {
                    userLiveData.value = it
                }
            }
            override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                Toast.makeText(app.applicationContext,"Internal Server Error",Toast.LENGTH_LONG).show()
            }

        })
    }
    fun userRegister(user:User){
        val call = authRetrofit.authApi
        call.register(user).enqueue(object: Callback<UserResponse>{
            override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                response.body()?.let {
                    userLiveData.value = it
                }
            }
            override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                Toast.makeText(app.applicationContext,"Internal Server Error",Toast.LENGTH_LONG).show()
            }

        })
    }
}