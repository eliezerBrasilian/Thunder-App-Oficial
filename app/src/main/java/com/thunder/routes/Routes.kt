package com.thunder.routes

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.navigation
import com.thunder.GlobalStates.UserState
import com.thunder.screens.Home
import com.thunder.screens.Login
import com.thunder.screens.Contratar
import com.thunder.screens.Details
import com.thunder.screens.MemberArea

@Composable
fun Routes(nav: NavHostController, userState: UserState){
    NavHost(navController = nav, startDestination = "Route"){
        navigation(route= "Route", startDestination = "App"){ composable("App"){ App(nav,userState)}
            composable("Home"){ Home(nav)}
            composable("Login"){Login(nav,userState)}
            composable("memberArea"){ MemberArea(nav,userState) }
            composable("Contratar"){Contratar(nav)}
            composable("Details/{name}/{nicho}/{paymentMethod}/{uid}/{prazo}", arguments =
                listOf(
                    navArgument("name"){type = NavType.StringType},
                    navArgument("nicho"){type = NavType.StringType},
                    navArgument("paymentMethod"){type = NavType.StringType},
                    navArgument("uid"){type = NavType.StringType},
                    navArgument("prazo"){type = NavType.StringType}
                )
            ){ Details(nav) }
            // nav.navigate("Details/${app.appName}/${app.nicho}/${app.paymentMethod}/${app.uid}/${app.prazo}")
        }
    }
}