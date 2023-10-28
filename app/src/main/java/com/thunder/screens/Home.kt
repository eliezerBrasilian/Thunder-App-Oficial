package com.thunder.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.thunder.components.CustomButton
import com.thunder.components.CustomCard
import com.thunder.components.HeaderHome
import com.thunder.components.SistemaCard
import com.thunder.components.TextContent
import com.thunder.oficial.R
import org.intellij.lang.annotations.JdkConstants.HorizontalAlignment

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Home(nav:NavHostController){
    var mod = Modifier

    data class Banner(val id:String, val photo:Int, val title:String? = null)

    val banners  by remember{
        mutableStateOf(mutableListOf(
            Banner("banner1", R.drawable.banner1),
            Banner("banner2", R.drawable.banner2)
        ))
    }

    val sistemas by remember {
        mutableStateOf(mutableListOf(
            Banner("banner1", R.drawable.pizza,"Pizzaria"),
            Banner("banner2", R.drawable.fitness,"Fitness"),
            Banner("banner1", R.drawable.estoque,"Sistema de estoque"),
            Banner("banner2", R.drawable.taxi,"Taxi"),
            Banner("banner1", R.drawable.padaria,"Padaria"),
            Banner("banner2", R.drawable.lavanderia,"Lavanderia")
        ))
    }
    Scaffold(topBar = { HeaderHome(nav)},modifier = mod.fillMaxSize()) {it
        Surface(
            mod
                .fillMaxSize()
                .padding(it), color = Color.White) {
            Column {
                TextContent(title = "Sistemas mais pedidos", fontWeight = 700)
                Spacer(modifier = mod.height(20.dp))
                LazyRow( horizontalArrangement = Arrangement.spacedBy(10.dp)){
                    items(banners){banner->
                        CustomCard(banner.photo)
                    }
                }
                Spacer(modifier = mod.height(20.dp))
                Box(mod.fillMaxWidth().clickable { }
                    ,contentAlignment = Alignment.Center){
                    CustomButton(title = "Contratar",onClick = {nav.navigate("Contratar") })
                }
                Spacer(modifier = mod.height(20.dp))
                TextContent(title = "Sistemas mais pedidos", fontWeight = 700)
                Spacer(modifier = mod.height(20.dp))
                LazyRow( horizontalArrangement = Arrangement.spacedBy(10.dp)){
                    items(sistemas){banner->
                        SistemaCard(banner.photo,banner.title)
                    }
                }
            }
        }
    }
}


