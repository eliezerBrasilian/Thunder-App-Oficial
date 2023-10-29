package com.thunder

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.thunder.GlobalStates.UserState
import com.thunder.routes.Routes
import com.thunder.ui.theme.MainBlue
import com.thunder.ui.theme.ThunderTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val navController = rememberNavController()
            val localContext = LocalContext.current
            val userState = UserState(this)
            val statusBar = rememberSystemUiController()
           // val user by userState.user.collectAsState()
            ThunderTheme {
                // A surface container using the 'background' color from the theme
                SideEffect {
                    statusBar.setStatusBarColor(MainBlue)
                }
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.White
                ) {
                   Routes(navController,userState)
                }
            }
        }
    }
}

