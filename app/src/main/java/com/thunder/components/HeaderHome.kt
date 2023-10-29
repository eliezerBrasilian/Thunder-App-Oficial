package com.thunder.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.thunder.oficial.R

@Composable
fun HeaderHome(nav:NavHostController,showIcon:Boolean = true){
    val mod = Modifier
    Box(
        mod
            .fillMaxWidth()
            .height(90.dp).background(Color.White).padding(15.dp)){
      Row(mod.fillMaxSize(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically){
          Image(painter = painterResource(id = R.drawable.thunder_icon), contentDescription = "logo",mod.height(22.dp))

         if(showIcon)
          Image(painter = painterResource(id = R.drawable.login_icon), contentDescription = "login",mod.height(35.dp).clickable {
              nav.navigate("Login")
          })
      }
    }
}