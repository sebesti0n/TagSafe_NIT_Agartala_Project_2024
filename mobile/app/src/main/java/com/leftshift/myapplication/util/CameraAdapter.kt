package com.leftshift.myapplication.util

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.leftshift.myapplication.R
import com.leftshift.myapplication.datamodel.Camera
import java.util.Random

class CameraAdapter(val listener: CameraItemClickListener): RecyclerView.Adapter<CameraAdapter.CameraViewHolder>() {

    private var list: List<Camera> = listOf()
    class CameraViewHolder(view: View): RecyclerView.ViewHolder(view){
//        val cameraName =
        val cameraName = view.findViewById<TextView>(R.id.camera_name_tv)
        val statusCard = view.findViewById<MaterialCardView>(R.id.status_card)
        val statusCardTv = view.findViewById<TextView>(R.id.status_card_tv)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CameraViewHolder {
        return CameraViewHolder(
                    LayoutInflater
                    .from(parent.context)
                    .inflate(
                        R.layout.camera_item_view,
                null
            )
        )
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: CameraViewHolder, position: Int) {
        val item = list[position]
        holder.cameraName.text = item.cameraName
        holder.statusCard.setCardBackgroundColor(getColor(holder.itemView.context, item.isLive))
        if(item.isLive) {
            holder.statusCardTv.text = "ON"
            holder.statusCard.setCardBackgroundColor(holder.itemView.context.resources.getColor(R.color.green))
        }
        else{
            holder.statusCardTv.text = "OFF"
            holder.statusCard.setCardBackgroundColor(holder.itemView.context.resources.getColor(R.color.red))
        }
        holder.itemView.setOnClickListener {
            listener.onClick(item)
        }
    }

    private fun getColor(context: Context, live: Boolean): Int {
        return if(live) context.getColor(R.color.green) else context.getColor(R.color.red)
    }

    fun setData(newList: List<Camera>){
        list = newList
        notifyDataSetChanged()
    }
}