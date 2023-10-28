package com.thunder.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.thunder.components.CustomButton
import com.thunder.components.TextContent
import com.thunder.components.Header
import com.thunder.ui.theme.MainBlue

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Login(nav:NavHostController){
    var mod = Modifier
    var credentialInput by remember {
        mutableStateOf("")
    }
    var passwordInput by remember {
        mutableStateOf("")
    }
    Scaffold(topBar = { Header(nav,"Login")}) {it
        Column(
            mod
                .padding(it)
                .background(Color.White)
                .fillMaxSize()) {
            TextContent(title = "Credencial de acesso")
            Spacer(modifier = mod.height(10.dp))
            TextField(value = credentialInput, onValueChange = { credentialInput = it },
                placeholder = { TextContent(title = "Digite sua credencial de acesso", fontSize = 17.sp, fontWeight = 400, horizontalPadding = 0.dp) },
                maxLines = 1,
                modifier = mod
                    .fillMaxWidth()
                    .padding(horizontal = 15.dp)
                    .border(
                        border = BorderStroke(1.dp, MainBlue),
                        shape = RoundedCornerShape(10.dp)
                    ),
                colors = TextFieldDefaults.textFieldColors(
                    containerColor = Color.White, textColor = Color.Black,
                    placeholderColor = Color.LightGray,
                ))

            Spacer(modifier = mod.height(30.dp))
            TextContent(title = "Senha")
            Spacer(modifier = mod.height(10.dp))
            TextField(value = passwordInput, onValueChange = { passwordInput = it },
                placeholder = { TextContent(title = "Disite sua senha", fontSize = 17.sp, fontWeight = 400, horizontalPadding = 0.dp) },
                modifier = mod
                    .fillMaxWidth()
                    .padding(horizontal = 15.dp)
                    .border(
                        border = BorderStroke(1.dp, MainBlue),
                        shape = RoundedCornerShape(10.dp)
                    ),
                colors = TextFieldDefaults.textFieldColors(
                    containerColor = Color.White, textColor = Color.Black,
                    placeholderColor = Color.LightGray,
                ))
            Spacer(modifier = mod.height(40.dp))
            Box(modifier = mod.fillMaxWidth(), contentAlignment = Alignment.Center){
                CustomButton(title = "Entrar")
            }


        }
    }
}