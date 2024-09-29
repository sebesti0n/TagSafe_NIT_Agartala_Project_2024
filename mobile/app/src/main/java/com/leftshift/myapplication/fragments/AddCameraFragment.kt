package com.leftshift.myapplication.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.leftshift.myapplication.R
import com.leftshift.myapplication.activities.MainActivity
import com.leftshift.myapplication.databinding.FragmentAddCameraBinding
import com.leftshift.myapplication.datamodel.CameraBodyPost
import com.leftshift.myapplication.ui.AuthViewModel
import com.leftshift.myapplication.ui.CameraViewModel
import com.leftshift.myapplication.util.CameraAdapter

class AddCameraFragment : Fragment() {

    private var _binding: FragmentAddCameraBinding? = null
    private val binding get() = _binding!!
    private var selectedDirection = ""
    private var selectedResolution = ""
    private var isDirectionDropdownVisible = false
    private var isResolutionDropdownVisible = false
    private lateinit var viewModel: CameraViewModel
    private lateinit var authViewModel: AuthViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {}
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentAddCameraBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = (activity as MainActivity).cameraViewModel
        authViewModel = (activity as MainActivity).authViewModel
        setUpDirectionDropDown()
        setUpResolutionDropdown()
        binding.backLl.setOnClickListener {
            findNavController().popBackStack()
        }
        binding.autoCompleteResolution.setOnClickListener {
            if(isResolutionDropdownVisible){
                binding.autoCompleteResolution.dismissDropDown()
            }
            else{
                if(isDirectionDropdownVisible) {
                    binding.autoCompleteDirection.dismissDropDown()
                    isDirectionDropdownVisible = false
                }
                binding.autoCompleteResolution.showDropDown()
            }
            isResolutionDropdownVisible = !isResolutionDropdownVisible
        }

        binding.autoCompleteDirection.setOnClickListener {
            if(isDirectionDropdownVisible){
                binding.autoCompleteDirection.dismissDropDown()
            }
            else{
                if(isResolutionDropdownVisible){
                    binding.autoCompleteResolution.dismissDropDown()
                }
                binding.autoCompleteDirection.showDropDown()
            }
            isDirectionDropdownVisible = !isDirectionDropdownVisible
        }
        binding.btnSave.setOnClickListener {
            val cameraName = binding.nameTextEdit.text.toString()
            val rtspLink = binding.rtspTextEdit.text.toString()
            val lat = binding.latitudeTextEdit.text.toString()
            val lon = binding.longitudeTextEdit.text.toString()
            if(check(cameraName, rtspLink, lat, lon)){
                showSaveProgressBar()
                addCamera(cameraName, rtspLink, lat, lon, selectedResolution, selectedDirection)
            }
        }
    }
    private fun showSaveProgressBar(){
        binding.apply {
            saveProgressBar.visibility = View.VISIBLE
            btnSave.visibility = View.GONE
        }
    }
    private fun hideSaveProgressBar(){
        binding.apply {
            saveProgressBar.visibility = View.GONE
            btnSave.visibility = View.VISIBLE
        }
    }
    private fun addCamera(
        cameraName: String,
        rtspLink: String,
        lat: String,
        lon: String,
        selectedResolution: String,
        selectedDirection: String
    ){
        val cameraPost = CameraBodyPost(
            RTSP_Link = rtspLink,
            cameraName = cameraName,
            latitude =  lat,
            longitude =  lon,
            resolution = selectedResolution,
            pov_direction =  selectedDirection,
            owner_id = authViewModel.getUserId(),
            isLive = true
        )

        viewModel.addCamera(cameraPost){ success, message ->
            hideSaveProgressBar()
            if(success==null){
                showToast(message!!)
            }
            else{
                if(success){
                    showToast("Camera Added Successfully")
                    viewModel.getCameras(authViewModel.getUserId())
                    findNavController().navigate(R.id.action_addCameraFragment_to_homeFragment)
                }
                else{
                    showToast(message!!)
                }
            }
        }
    }

    private fun check(name: String, rtsp: String, lat: String, lon: String): Boolean{
        var res = true
        if(name.isEmpty()) {
            res = false
            showToast("Camera name not valid")
        }
        if(selectedDirection.isEmpty()) {
            res = false
            showToast("Select Direction")
        }
        if(selectedResolution.isEmpty()){
            res = false
            showToast("Select Resolution")
        }
        return res
    }

    private fun setUpDirectionDropDown() {
        val direction: List<String> = resources.getStringArray(R.array.direction).toList()
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, direction)
        binding.autoCompleteDirection.setAdapter(adapter)
        binding.autoCompleteDirection.setOnItemClickListener { _, _, position, _ ->
            selectedDirection = direction[position]
        }
    }

    private fun setUpResolutionDropdown(){
        val resolution: List<String> = resources.getStringArray(R.array.camera_resolution).toList()
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_list_item_1, resolution)
        binding.autoCompleteResolution.setAdapter(adapter)
        binding.autoCompleteResolution.setOnItemClickListener { _, _, position , _ ->
            selectedResolution = resolution[position]
        }
    }
    private fun showToast(message: String){
        Toast.makeText(requireContext(), message, Toast.LENGTH_SHORT).show()
    }
}