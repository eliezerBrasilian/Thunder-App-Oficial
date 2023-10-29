package com.thunder.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun TextContent(
    title: String, fontSize: TextUnit = 20.sp,
    fontWeight: Int = 500,
    horizontalPadding: Dp = 15.dp,
    textColor: Color = Color.Black,
    onClick: () -> Unit  = {}
){
    val mod = Modifier
    Text(text = title, fontSize = fontSize, fontWeight = FontWeight(fontWeight),color = textColor,
        modifier = mod.padding(horizontal = horizontalPadding).clickable { onClick() })
}