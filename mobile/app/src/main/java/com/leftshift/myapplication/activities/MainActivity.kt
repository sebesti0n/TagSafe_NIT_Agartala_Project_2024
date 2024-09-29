package com.leftshift.myapplication.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupActionBarWithNavController
import com.leftshift.myapplication.R
import com.leftshift.myapplication.ui.AuthViewModel
import com.leftshift.myapplication.ui.CameraViewModel

class MainActivity : AppCompatActivity() {
    private lateinit var navController: NavController
    lateinit var cameraViewModel: CameraViewModel
    lateinit var authViewModel: AuthViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        authViewModel = AuthViewModel(application)
        cameraViewModel = CameraViewModel(application)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.navHostFragment) as NavHostFragment
        navController = navHostFragment.navController
        setupActionBarWithNavController(navController)
    }
}