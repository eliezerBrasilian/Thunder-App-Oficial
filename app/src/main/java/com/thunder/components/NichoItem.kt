package com.thunder.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.thunder.oficial.R

@Composable 
fun NichoItem(nicho: String ,onClick:() -> Unit = {}) {
    val mod = Modifier
    var icon by remember{
       mutableStateOf( R.drawable.taxi)
    }
    //val nichos = listOf("Alimentação","Bebida","Delivery","Entretenimento","Transporte","Saúde","Vestuário")
    /*if(nicho == "Alimentação")icon = R.drawable.padaria
    if(nicho == "Bebida")icon = R.drawable.
    if(nicho == "Alimentação")icon = R.drawable.padaria
    if(nicho == "Alimentação")icon = R.drawable.padaria
    if(nicho == "Alimentação")icon = R.drawable.padaria
    if(nicho == "Alimentação")icon = R.drawable.padaria
    if(nicho == "Alimentação")icon = R.drawable.padaria
    */

    Row(mod.fillMaxWidth().clickable { onClick() }, verticalAlignment = Alignment.CenterVertically) {
        TextContent(title = nicho, onClick = {onClick()})
    }
}