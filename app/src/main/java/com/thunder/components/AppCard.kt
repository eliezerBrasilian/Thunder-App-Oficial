package com.thunder.components

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.toLowerCase
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.thunder.oficial.R
import com.thunder.ui.theme.MainBlue
import java.net.URLEncoder
@Composable
fun AppCard(nav: NavHostController, appName: String = "FarmaCour",
            nicho:String = "farmacia",
            status: String,
            paymentMethod:String = "pix",
            uid:String = "abcdeft",
            prazo:String = "2"){
    val mod = Modifier

    val statusName by remember {
        mutableStateOf(status)
    }

    Log.i("status",status)
    var icon by remember {
        mutableStateOf(R.drawable.pagamento_inicial
        )
    }
    LaunchedEffect(status){
        if(status == "Aguardando pagamento inicial")icon = R.drawable.pagamento_inicial
        else if(status == "Pagamento inicial recebido")icon = R.drawable.pagamento_inicial_selected
        else if (status == "Construindo layout")icon = R.drawable.construido_layout_selected
        else if (status == "Em desenvolvimento")icon = R.drawable.em_desenvolvimento_selected
        else if (status == "Aplicação finalizada")icon = R.drawable.aplicacao_finalizada_selected
        else if (status == "Pagamento concluído")icon = R.drawable.pagamento_concluido_selected
        else if (status == "Aplicativo publicado na PlayStore")icon = R.drawable.playstore_selected
    }

    Card(shape = RoundedCornerShape(12.dp), colors = CardDefaults.cardColors(Color.White),modifier = mod.border(1.dp, MainBlue, RoundedCornerShape(10.dp))) {
        Column(
            mod
                .height(200.dp)
                .fillMaxWidth()) {
            Box(modifier = mod
                .height(50.dp)
                .background(MainBlue)
                .fillMaxWidth(),
                contentAlignment = Alignment.Center
            ){
                TextInput(title = appName, textColor = Color.White)

            }

            Column(
                mod
                    .background(Color(0xffF2F2F2))
                    .fillMaxHeight()
                    .fillMaxWidth(),
                verticalArrangement = Arrangement.SpaceAround) {
                Row(mod.padding(horizontal = 10.dp)) {
                    Image(painter = painterResource(id = icon), contentDescription = null,mod.height(35.dp))
                    TextInput(title = status)
                }
                Row(horizontalArrangement = Arrangement.End,modifier = mod.fillMaxWidth()) {
                    TextContent(title = "Detalhes", textColor = MainBlue) {
                        val appName_ = URLEncoder.encode(appName,"UTF-8")
                        val nicho_ = URLEncoder.encode(nicho,"UTF-8")
                        val paymentMethod_ = URLEncoder.encode(paymentMethod,"UTF-8")
                        nav.navigate("Details/${appName_}/${nicho_}/${paymentMethod_}/${uid}/${prazo}")
                    }
                }
            }
        }
    }
}
