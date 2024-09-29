package com.leftshift.myapplication.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.google.android.material.snackbar.Snackbar
import com.leftshift.myapplication.R
import com.leftshift.myapplication.activities.AuthActivity
import com.leftshift.myapplication.activities.MainActivity
import com.leftshift.myapplication.databinding.FragmentSignupBinding
import com.leftshift.myapplication.datamodel.User
import com.leftshift.myapplication.ui.AuthViewModel
import java.util.Collections

class SignupFragment : Fragment() {
    private var _binding: FragmentSignupBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: AuthViewModel
    private var selectedState = ""
    private var dropdownVisible = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {

        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentSignupBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = (activity as AuthActivity).viewModel
        binding.backLl.setOnClickListener {
            findNavController().navigate(R.id.action_signupFragment_to_authFragment)
        }
        hideProgressBar()
        setUpDropDown()
        binding.enterBtn.setOnClickListener {
            val email = binding.emailTextEdit.text.toString()
            val password = binding.passwordTextEdit.text.toString()
            val vPassword = binding.vPasswordTextEdit.text.toString()
            val name = binding.nameTextEdit.text.toString()
            val street = binding.streetTextEdit.text.toString()
            val city = binding.cityTextEdit.text.toString()
            val phoneNo = binding.phoneTextEdit.toString()

            if(selectedState.isEmpty()){
                Toast.makeText(requireContext(), "Please select state", Toast.LENGTH_SHORT).show()
            }
            else{
                showProgressBar()
                val user = User(vPassword,email,name,password,"",street,city,false,phoneNo,selectedState)
                viewModel.userRegister(user)
                viewModel.get().observe(requireActivity()) {
                    if (it == null) {
                        showSnackbar("Invalid Credentials")
                        hideProgressBar()
                    } else {
                        if (it.success) {
                            viewModel.createSession(
                                it.user[0].Name, it.user[0].Email, it.user[0].user_id
                            )
                            moveToMainActivity()
                        } else {
                            showSnackbar(it.message)
                            hideProgressBar()
                        }
                    }
                }
            }
        }
        binding.autoCompleteState.setOnClickListener {
            if(dropdownVisible) binding.autoCompleteState.dismissDropDown()
            else binding.autoCompleteState.showDropDown()
            dropdownVisible = !dropdownVisible
        }
    }

    private fun setUpDropDown() {
        val states: List<String> = resources.getStringArray(R.array.states).toList()
        Toast.makeText(requireContext(), states.size.toString(), Toast.LENGTH_SHORT).show()
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, states)
        binding.autoCompleteState.setAdapter(adapter)
        binding.autoCompleteState.setOnItemClickListener { _, _, position, _ ->
            selectedState = states[position]
        }

    }

    private fun hideProgressBar(){
        binding.btnText.visibility = View.VISIBLE
        binding.progressBar.visibility = View.GONE
    }
    private fun showProgressBar(){
        binding.btnText.visibility = View.GONE
        binding.progressBar.visibility = View.VISIBLE
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