package com.leftshift.myapplication.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.google.android.material.snackbar.Snackbar
import com.leftshift.myapplication.R
import com.leftshift.myapplication.activities.AuthActivity
import com.leftshift.myapplication.activities.MainActivity
import com.leftshift.myapplication.databinding.FragmentLoginBinding
import com.leftshift.myapplication.ui.AuthViewModel

class LoginFragment : Fragment() {
    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: AuthViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = (activity as AuthActivity).viewModel
        binding.backLl.setOnClickListener {
            findNavController().navigate(R.id.action_loginFragment_to_authFragment)
        }
        binding.enterBtn.setOnClickListener {
            val email = binding.emailTextEdit.text.toString()
            val password = binding.passwordTextEdit.text.toString()
            viewModel.userLogin(email, password)
            viewModel.get().observe(requireActivity()){
                if (it==null)
                    showSnackbar("Invalid Credentials")
                else{
                    if (it.success) {
                        viewModel.createSession(
                            it.user[0].Name, it.user[0].Email, it.user[0].user_id
                        )
                        moveToMainActivity()
                    } else {
                        showSnackbar(it.message)
                    }
                }
            }
        }
    }

    private fun moveToMainActivity() {
        val intent = Intent(requireActivity(), MainActivity::class.java)
        startActivity(intent)
        (activity as AuthActivity).finish()
    }

    private fun showSnackbar(message: String){
        Snackbar.make(requireView(), message, 3000).show()
    }
}