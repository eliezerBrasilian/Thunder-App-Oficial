package com.thunder.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.thunder.ui.theme.MainBlue

@Composable
fun Header(nav:NavHostController,title:String){
    var mod = Modifier
    Box(
        mod
            .fillMaxWidth()
            .height(90.dp)
            .background(Color.White)
            .padding(15.dp)){
        Row(mod.fillMaxSize(), horizontalArrangement = Arrangement.spacedBy(20.dp), verticalAlignment = Alignment.CenterVertically){
            Icon(imageVector = Icons.Filled.ArrowBack, contentDescription = "back icon", tint = MainBlue, modifier = mod.clickable { nav.popBackStack() })
            TextInput(title = title, fontWeight = 800, textColor = MainBlue)
        }
    }
}