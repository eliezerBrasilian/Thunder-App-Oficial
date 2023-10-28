package com.thunder.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun SistemaCard(image:Int,title:String?){
    val mod = Modifier
    Card(mod.padding(start = 5.dp)) {
        Column(mod.width(130.dp).height(160.dp).background(Color(0xffF0F0F0)).clip(
            RoundedCornerShape(15.dp)
        ), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
            Image(painter = painterResource(id = image), contentDescription = "banner",
                mod
                    .height(90.dp)
                    .width(90.dp), contentScale = ContentScale.Crop)
            if(title !== null)
            TextContent(title = title, fontWeight = 400, fontSize = 16.sp
            )
        }

    }
}