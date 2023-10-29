package com.thunder.Utils

import android.content.Context
import android.widget.Toast

fun ShowToast(message: String, localContext: Context){

    Toast.makeText(localContext,message,Toast.LENGTH_SHORT).show()
}