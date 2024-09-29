package com.leftshift.myapplication.api

import com.leftshift.myapplication.secrets.AUTH_BASE_URL
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

class RetrofitInstance {
    companion object{

        val authRetrofit by lazy{
            val logging = HttpLoggingInterceptor()
            logging.setLevel(HttpLoggingInterceptor.Level.BODY)

            val client = OkHttpClient.Builder()
                .readTimeout(120, TimeUnit.SECONDS)
                .connectTimeout(120, TimeUnit.SECONDS)
                .addInterceptor(logging).build()

            Retrofit.Builder().baseUrl(AUTH_BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
                .build()
        }

        val authApi by lazy {
            authRetrofit.create(AuthAPI::class.java)
        }

        val camApi by lazy {
            authRetrofit.create(CamAPI::class.java)
        }


    }
}