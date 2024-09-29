package com.leftshift.myapplication.fragments

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.leftshift.myapplication.R
import com.leftshift.myapplication.activities.MainActivity
import com.leftshift.myapplication.databinding.FragmentHomeBinding
import com.leftshift.myapplication.datamodel.Camera
import com.leftshift.myapplication.ui.AuthViewModel
import com.leftshift.myapplication.ui.CameraViewModel
import com.leftshift.myapplication.util.CameraAdapter
import com.leftshift.myapplication.util.CameraItemClickListener

class HomeFragment : Fragment(), CameraItemClickListener {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var authViewModel: AuthViewModel
    private lateinit var cameraViewModel: CameraViewModel
    private lateinit var adapter: CameraAdapter
    private lateinit var listener: CameraItemClickListener
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {}
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        listener = this
        (activity as MainActivity).let{
            cameraViewModel = it.cameraViewModel
            authViewModel = it.authViewModel
        }
        showProgressBar()
        setUpRcv()
        getCameras()
        cameraViewModel.cameraListLiveData.observe(viewLifecycleOwner, Observer {
            if(it==null) {
                hideProgressBar()
                showToast("No camera's found")
            }
            else {
                Log.w("camera", it.toString())
                adapter.setData(it)
                hideProgressBar()
            }
        })

        binding.fabAddCamera.setOnClickListener{
            findNavController().navigate(R.id.action_homeFragment_to_addCameraFragment)
        }
    }

    private fun getCameras(){
        cameraViewModel.getCameras(authViewModel.getUserId())
        showProgressBar()
    }

    private fun showProgressBar(){
        binding.rcv.visibility = View.GONE
        binding.progressBar.visibility = View.VISIBLE
    }

    private fun hideProgressBar(){
        binding.rcv.visibility = View.VISIBLE
        binding.progressBar.visibility = View.GONE
    }

    private fun showToast(message: String) {
        Toast.makeText(requireContext(), message, Toast.LENGTH_LONG).show()
    }

    private fun setUpRcv() {
        adapter = CameraAdapter(listener)
        binding.rcv.adapter = adapter
        binding.rcv.layoutManager = LinearLayoutManager(requireContext())
    }

    override fun onClick(camera: Camera) {
        val action = HomeFragmentDirections.actionHomeFragmentToCameraDetailsFragment(camera)
        findNavController().navigate(action)
    }
}