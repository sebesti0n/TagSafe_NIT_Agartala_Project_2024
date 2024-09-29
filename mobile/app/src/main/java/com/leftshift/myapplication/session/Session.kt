package com.leftshift.myapplication.session

import android.content.Context

class Session(
    context: Context
) {

    private val sharedPref = context.getSharedPreferences(
        SHARED_PREF,
        Context.MODE_PRIVATE
    )
    private val editor = sharedPref.edit()

    fun createSession(
        email: String,
        username: String,
        id: Int
    ){
        editor.putString(USERNAME, username)
        editor.putString(EMAIL, email)
        editor.putInt(ID, id)
        editor.putBoolean(IS_LOGIN, true)
        editor.apply()
    }

    fun isLogin(): Boolean = sharedPref.getBoolean(IS_LOGIN, false)

    fun logOut(){
        editor.clear()
        editor.apply()
    }
    fun getUserName(): String = sharedPref.getString(USERNAME,"")!!
    fun getEmail(): String = sharedPref.getString(EMAIL, "")!!
    fun getId(): Int = sharedPref.getInt(ID, -1)
    companion object{
        private var instance: Session? = null

        fun getInstance(context: Context): Session{
            return instance?: synchronized(this){
                instance?: Session(context).also { instance = it }
            }
        }


        const val SHARED_PREF = "geo-tagging-login-shared-pref"
        const val IS_LOGIN = "is_user_login"
        const val USERNAME = "user_name"
        const val EMAIL = "user_email"
        const val ID = "user_id"
    }
}