package com.thunder.routes

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.thunder.GlobalStates.UserState
import com.thunder.components.TextContent
import com.thunder.oficial.R

@Composable
fun App(nav: NavHostController, userState: UserState){
    LaunchedEffect(Unit){
        if(userState.isUserLoggedIn)nav.navigate("memberArea")
        else nav.navigate("Home")
        }

    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center){
       Image(painter = painterResource(id = R.drawable.thunder_icon),
           contentDescription = "thunder icon",
           modifier = Modifier.height(200.dp)
           )
    }


}