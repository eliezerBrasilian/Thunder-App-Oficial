package com.thunder.Utils

import android.util.Log
import com.google.firebase.Timestamp
import java.text.SimpleDateFormat
import java.util.Date
import java.util.TimeZone

fun timestampToBrazilianDateTime(timestamp: Timestamp?): String {
    if(timestamp != null){
        Log.i("timestamp_","timestamp ---: $timestamp")
        val seconds = timestamp?.seconds
        val nanoseconds = timestamp?.nanoseconds

        val milliseconds = (seconds!!.times(1000)) + (nanoseconds!! / 1_000_000)

        val date = Date(milliseconds)
        val sdf = SimpleDateFormat("dd/MM/yyyy HH:mm")
        sdf.timeZone = TimeZone.getTimeZone("GMT-3") // Fuso horário brasileiro

        return sdf.format(date)
    }
  else return ""
}