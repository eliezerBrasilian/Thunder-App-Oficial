package com.thunder.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@Composable
fun CustomCard(image:Int){
    val mod = Modifier
    Card(mod.padding(start = 10.dp)) {
        Image(painter = painterResource(id = image), contentDescription = "banner",mod.height(300.dp).width(250.dp).background(
            Color.White).clip(RoundedCornerShape(8.dp)), contentScale = ContentScale.Crop)
    }
}