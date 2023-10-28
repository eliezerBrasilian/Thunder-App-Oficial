package com.thunder.routes

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navigation
import com.thunder.screens.Home
import com.thunder.screens.Login
import com.thunder.screens.Contratar

@Composable
fun Routes(nav:NavHostController){
    NavHost(navController = nav, startDestination = "Route"){
        navigation(route= "Route", startDestination = "Home"){
            composable("Home"){ Home(nav)}
            composable("Login"){Login(nav)}
            //composable("MemberArea"){MemberArea(nav)}
            composable("Contratar"){Contratar(nav)}
        }
    }
}