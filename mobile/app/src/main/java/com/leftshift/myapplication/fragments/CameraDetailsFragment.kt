package com.leftshift.myapplication.fragments

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Bundle
import android.view.Gravity
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams
import android.view.animation.AnimationUtils
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.ImageView
import android.widget.PopupWindow
import android.widget.ProgressBar
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.leftshift.myapplication.R
import com.leftshift.myapplication.activities.MainActivity
import com.leftshift.myapplication.databinding.FragmentCameraDetailsBinding
import com.leftshift.myapplication.datamodel.Camera
import com.leftshift.myapplication.datamodel.CameraDeletePost
import com.leftshift.myapplication.ui.AuthViewModel
import com.leftshift.myapplication.ui.CameraViewModel

class CameraDetailsFragment : Fragment() {

    private var _binding: FragmentCameraDetailsBinding? = null
    private val binding get() = _binding!!
    private lateinit var cameraItem: Camera
    private lateinit var viewModel: CameraViewModel
    private lateinit var authViewModel: AuthViewModel
    private var popupWindow: PopupWindow? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let{
            cameraItem = it.getParcelable("cameraItem")!!
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentCameraDetailsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = (activity as MainActivity).cameraViewModel
        authViewModel = (activity as MainActivity).authViewModel
        binding.cameraRtspCard.copyIv.setOnClickListener {
            copyRTSP()
        }
        updateUI(cameraItem)
        binding.cancelBtn.setOnClickListener {
            findNavController().popBackStack()
        }
        binding.deleteBtn.setOnClickListener{
            deleteCamera(cameraItem.cam_id)
            showDeleteProgressBar()
        }
        binding.editBtn.setOnClickListener {
            startEdit()
        }
    }

    private fun startEdit(){
        val popupview = LayoutInflater.from(requireContext()).inflate(R.layout.popup_edit_camera_details, null)
        val updateName = popupview.findViewById<TextInputEditText>(R.id.u_name_text_edit)
        val updateRTSP = popupview.findViewById<TextInputEditText>(R.id.rtsp_text_edit)
        val latitude = popupview.findViewById<TextInputEditText>(R.id.lat_text_edit)
        val longitude = popupview.findViewById<TextInputEditText>(R.id.long_text_edit)
        val direction = popupview.findViewById<AutoCompleteTextView>(R.id.autoCompleteDirection)
        val resolution: AutoCompleteTextView = popupview.findViewById(R.id.autoCompleteResolution)
        val updateBtn: Button = popupview.findViewById(R.id.btn_update)
        val cancelBtn: ImageView = popupview.findViewById(R.id.cancel_btn)
        val updateProgressBar: ProgressBar = popupview.findViewById(R.id.updateProgessBar)

        var res = cameraItem.resolution
        var dir = cameraItem.pov_direction

        updateName.setText(cameraItem.cameraName)
        updateRTSP.setText(cameraItem.RTSP_Link)
        latitude.setText(cameraItem.latitude)
        longitude.setText(cameraItem.longitude)

        direction.setText(cameraItem.pov_direction)
        resolution.setText(cameraItem.resolution)

        val directionArray = resources.getStringArray(R.array.direction)
        val directionAdapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_list_item_1,
            directionArray
        )
        direction.setAdapter(directionAdapter)

        val resolutionArray = resources.getStringArray(R.array.camera_resolution)
        val resolutionAdapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_list_item_1,
            resolutionArray
        )
        resolution.setAdapter(resolutionAdapter)

        direction.setOnClickListener {
            if(direction.isPopupShowing) {
                direction.dismissDropDown()
            }
            else direction.showDropDown()
        }

        resolution.setOnItemClickListener { _, _, position, _ ->
            res = resolutionArray[position]
        }
        direction.setOnItemClickListener { _, _, position, _ ->
            dir = directionArray[position]
        }

        resolution.setOnClickListener {
            if(resolution.isPopupShowing) resolution.dismissDropDown()
            else resolution.showDropDown()
        }

        updateBtn.setOnClickListener {
            val name = updateName.text.toString()
            val rtsp = updateRTSP.text.toString()
            val lat = latitude.text.toString()
            val long = longitude.text.toString()

            if(check(name, rtsp, lat, long)){
                showUpdateProgressBar(updateProgressBar, updateBtn)
                editCameraDetails(
                    name,
                    rtsp,
                    lat,
                    long,
                    res,
                    dir,
                    updateProgressBar,
                    updateBtn
                )
            }
        }

        popupWindow = PopupWindow(
            popupview,
            LayoutParams.MATCH_PARENT,
            LayoutParams.MATCH_PARENT
        )
        popupWindow?.isFocusable = true

        val animation = AnimationUtils.loadAnimation(
            requireContext(),
            R.anim.bottom_to_top_animation
        )
        popupview.startAnimation(animation)
        popupWindow?.showAtLocation(
            popupview,
            Gravity.BOTTOM,
            0,
            0
        )
        cancelBtn.setOnClickListener {
            popupWindow?.dismiss()
        }

    }

    private fun showUpdateProgressBar(progressBar: ProgressBar, button: Button){
        progressBar.visibility = View.VISIBLE
        button.visibility = View.GONE
    }
    private fun hideUpdateProgressBar(progressBar: ProgressBar, button: Button){
        progressBar.visibility = View.GONE
        button.visibility = View.VISIBLE
    }
    private fun showDeleteProgressBar(){
        binding.apply {
            deleteBtn.visibility = View.GONE
            deleteProgressBar.visibility = View.VISIBLE
        }
    }

    private fun hideDeleteProgressBar(){
        binding.apply {
            deleteBtn.visibility = View.VISIBLE
            deleteProgressBar.visibility = View.GONE
        }
    }

    private fun editCameraDetails(
        newName: String,
        newRtsp: String,
        newLat: String,
        newLong: String,
        newResolution: String,
        newDirection: String,
        progressBar: ProgressBar,
        updateButton: Button
    ){
        viewModel.editCamera(
            Camera(
                cameraName = newName,
                RTSP_Link = newRtsp,
                latitude = newLat,
                longitude = newLong,
                resolution = newResolution,
                pov_direction = newDirection,
                cam_id = cameraItem.cam_id,
                owner_id = cameraItem.owner_id,
                isLive = cameraItem.isLive
            )
        ){ success, message, camera ->
            hideUpdateProgressBar(progressBar, updateButton)
            if (success!!){
                popupWindow?.dismiss()
                updateUI(camera!!)
                showToast("Updated Successfully")
            }
            else{
                showToast(message!!)
            }
        }
    }

    private fun check(
        name: String,
        rtsp: String,
        lat: String,
        long: String,
    ):Boolean{
        var result = true
        if(name.isEmpty()){
            result = false
            showToast("Name cannot be empty")
        }
        if(rtsp.isEmpty()){
            result = false
            showToast("Enter valid RTSP link")
        }
        if(lat.isEmpty()){
            result = false
            showToast("Enter valid latitude")
        }
        if(long.isEmpty()){
            result = false
            showToast("Enter valid longitude")
        }
        return result
    }

    private fun deleteCamera(uid: Int) {
        viewModel.deleteCamera(
            uid
        ){ status, message ->
            hideDeleteProgressBar()
            if(!status!!){
                showToast(message!!)
            }
            else{
                showToast(message!!)
                viewModel.getCameras(authViewModel.getUserId())
                findNavController().popBackStack()
            }
        }
    }

    private fun copyRTSP() {
        val clipBoardManager = requireContext().getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("label", cameraItem.RTSP_Link)
        clipBoardManager.setPrimaryClip(clip)
        showToast("RTSP link copied")
    }

    private fun showToast(message: String){
        Toast.makeText(requireContext(), message, Toast.LENGTH_SHORT).show()
    }

    private fun updateUI(cameraItem: Camera){
        binding.apply {
            cameraIdTv.text = cameraItem.cam_id.toString()
            cameraNameTv.text = cameraItem.cameraName
            cameraRtspCard.headingTv.text = "RTSP Link"
            cameraRtspCard.contentTv.text = cameraItem.RTSP_Link
            cameraDirectionCard.headingTv.text = "Direction"
            cameraDirectionCard.contentTv.text = cameraItem.pov_direction
            cameraResolutionCard.headingTv.text = "Resolution"
            cameraResolutionCard.contentTv.text = cameraItem.resolution
            cameraLatitudeCard.headingTv.text = "Latitude"
            cameraLongitudeCard.headingTv.text = "Longitude"
            cameraLongitudeCard.contentTv.text = cameraItem.longitude
            cameraLatitudeCard.contentTv.text = cameraItem.latitude
        }
    }
}