package com.thunder.components

import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.thunder.ui.theme.MainBlue

@Composable
fun CustomButton(title:String, fontSize: TextUnit = 20.sp, fontWeight: Int = 500,onClick: () -> Unit = {}){
    val mod = Modifier
    Button( colors = ButtonDefaults.buttonColors(MainBlue), contentPadding = ButtonDefaults.ContentPadding,
        modifier = mod.height(60.dp) ,onClick = { onClick() }) {
        Text(text = title, fontSize = fontSize, fontWeight = FontWeight(fontWeight),color = Color.White,
            modifier = mod.padding(horizontal = 15.dp))

    }
}