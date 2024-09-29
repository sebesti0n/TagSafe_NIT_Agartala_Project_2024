package com.leftshift.myapplication.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupActionBarWithNavController
import com.leftshift.myapplication.R
import com.leftshift.myapplication.databinding.ActivityAuthBinding
import com.leftshift.myapplication.ui.AuthViewModel

class AuthActivity : AppCompatActivity() {

    private var _binding: ActivityAuthBinding? = null
    private val binding get() = _binding!!
    private lateinit var navController: NavController
    lateinit var viewModel: AuthViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        viewModel = AuthViewModel(application)
        if(viewModel.isLogin()) navigateToMainActivity()
        _binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.navHostFragment) as NavHostFragment
        navController = navHostFragment.navController
        supportActionBar?.hide()
        setupActionBarWithNavController(navController)
    }

    private fun navigateToMainActivity() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
    }
}