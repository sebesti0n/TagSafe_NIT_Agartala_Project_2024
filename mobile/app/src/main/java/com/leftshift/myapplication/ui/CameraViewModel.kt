package com.leftshift.myapplication.ui

import android.app.Application
import android.support.v4.os.IResultReceiver.Default
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.leftshift.myapplication.api.RetrofitInstance
import com.leftshift.myapplication.datamodel.Camera
import com.leftshift.myapplication.datamodel.CameraBodyPost
import com.leftshift.myapplication.datamodel.CameraDeletePost
import com.leftshift.myapplication.datamodel.CameraListResponse
import com.leftshift.myapplication.datamodel.DefaultResponse
import kotlinx.coroutines.launch

import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CameraViewModel(
    private val app: Application
): AndroidViewModel(app) {
    private var _cameraListLiveData = MutableLiveData<List<Camera>?>()
    val cameraListLiveData get() = _cameraListLiveData
    private var _responseMessage = MutableLiveData<String>()

    val responseMessage get() = _responseMessage
    fun getMessage():LiveData<String>{
        return responseMessage
    }


    private val camRetrofit = RetrofitInstance.camApi


    fun addCamera(cam:CameraBodyPost, callback: (Boolean?, String?)->Unit){
        viewModelScope.launch{
            val call = camRetrofit.addCamera(cam)
            call.enqueue(object : Callback<DefaultResponse> {
                override fun onResponse(
                    call: Call<DefaultResponse>,
                    response: Response<DefaultResponse>
                ) {
                    val data = response.body()
                    data?.let {
                        callback(it.success, it.message)
                        Log.w("addCamera", "${it.success} ${it.message}")
                    }

                }

                override fun onFailure(call: Call<DefaultResponse>, t: Throwable) {
                    callback(null, "Something went wrong")
                }
            })
        }
    }

    fun getCameras(uid:Int){
        val call = camRetrofit.getUserCamera(uid)
        call.enqueue(object:Callback<CameraListResponse>{
            override fun onResponse(
                call: Call<CameraListResponse>,
                response: Response<CameraListResponse>
            ) {
                if(response.isSuccessful){
                    val camList= response.body()?.camera
                    _cameraListLiveData.postValue(camList)
                }
            }
            override fun onFailure(call: Call<CameraListResponse>, t: Throwable) {
                Toast.makeText(app.applicationContext,"Internal Server Error, Please try again",Toast.LENGTH_SHORT).show()
            }

        })
    }

    fun editCamera(camera: Camera, callback: (Boolean?, String?, Camera?)-> Unit){
        val call = camRetrofit.editCamera(camera)
        call.enqueue(object: Callback<CameraListResponse>{
            override fun onResponse(
                call: Call<CameraListResponse>,
                response: Response<CameraListResponse>
            ) {
                response.body()?.let{
                    callback(it.success, it.message, it.camera[0])
                }
            }

            override fun onFailure(call: Call<CameraListResponse>, t: Throwable) {
                callback(false, "Unknown error", null)
            }

        })
    }

    fun deleteCamera(uid: Int, callback: (Boolean?, String?) -> Unit){
        val call = camRetrofit.deleteCamera(
            CameraDeletePost(uid)
        )
        call.enqueue(object: Callback<DefaultResponse>{
            override fun onResponse(
                call: Call<DefaultResponse>,
                response: Response<DefaultResponse>
            ) {
                Log.w("delete", "$response")
                response.body()?.let {
                    callback(it.success, it.message)
                }
            }
            override fun onFailure(call: Call<DefaultResponse>, t: Throwable) {
                callback(false, "Unknown Error")
            }
        })
    }
}