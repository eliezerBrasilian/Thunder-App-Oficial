package com.thunder.screens

import android.util.Log
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.thunder.components.Header
import com.thunder.components.TextContent
import com.thunder.ui.theme.MainBlue
import java.net.URLDecoder
import com.google.firebase.Firebase
import com.google.firebase.firestore.firestore
import com.thunder.Utils.timestampToBrazilianDateTime
import com.thunder.oficial.R
import com.thunder.types.AndamentoType

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Details(nav: NavHostController) {
    val mod = Modifier
    val routes by nav.currentBackStackEntryAsState()

    val appUid = routes?.arguments?.getString("uid") ?: "app nao possui UID"
    val prazo = routes?.arguments?.getString("prazo")

    //encoded
    val encodedName = routes?.arguments?.getString("name")
    val encodedNicho = routes?.arguments?.getString("nicho")
    val encodedPaymentMethod = routes?.arguments?.getString("paymentMethod")

    //decoded
    val decodedName = encodedName?.let { URLDecoder.decode(it, "UTF-8") }
    val decodedNicho = encodedNicho?.let { URLDecoder.decode(it, "UTF-8") }
    val decodedPaymentMethod = encodedPaymentMethod?.let { URLDecoder.decode(it, "UTF-8") }

    var itemsEmAndamento by remember {
        mutableStateOf<List<AndamentoType>>(emptyList())
    }
    var createdAt by remember {
        mutableStateOf("")
    }
    var buildingLayout by remember {
        mutableStateOf(false)
    }
    var firstPayment by remember {
        mutableStateOf(false)
    }
    var hasFinished by remember {
        mutableStateOf(false)
    }
    var lastPayment by remember {
        mutableStateOf(false)
    }
    var inDevelopment by remember {
        mutableStateOf(false)
    }
    var publishedPlaystore by remember {
        mutableStateOf(false)
    }
    var buildingLayoutDate by remember {
        mutableStateOf("")
    }
    var firstPaymentDate by remember {
        mutableStateOf("")
    }
    var hasFinishedDate by remember {
        mutableStateOf("")
    }
    var inDevelopmentDate by remember {
        mutableStateOf("")
    }
    var lastPaymentDate by remember {
        mutableStateOf("")
    }
    var publishedPlaystoreDate by remember {
        mutableStateOf("")
    }

    val firestoreDb = Firebase.firestore
    LaunchedEffect(appUid) {
        Log.i("appUid1", appUid)
        firestoreDb.collection("Aplicativos").document(appUid)
            .get()
            .addOnSuccessListener { querySnap ->
                if (querySnap != null) {
                    // createdAt = timestampToBrazilianDateTime (querySnap.getTimestamp("createdAt"))

                    buildingLayout = (querySnap.getBoolean("buildingLayout") ?: false) as Boolean
                    firstPayment = (querySnap.getBoolean("firstPayment") ?: false) as Boolean
                    hasFinished = (querySnap.getBoolean("hasFinished") ?: false) as Boolean
                    inDevelopment = (querySnap.getBoolean("inDevelopment") ?: false) as Boolean
                    lastPayment = (querySnap.getBoolean("lastPayment") ?: false) as Boolean
                    buildingLayout = (querySnap.getBoolean("buildingLayout") ?: false) as Boolean
                    publishedPlaystore = (querySnap.getBoolean("publishedPlaystore") ?: false) as Boolean

                    buildingLayoutDate =
                        timestampToBrazilianDateTime(querySnap.getTimestamp("buildingLayoutDate"))
                    firstPaymentDate =
                        timestampToBrazilianDateTime(querySnap.getTimestamp("firstPaymentDate"))
                    hasFinishedDate =
                        timestampToBrazilianDateTime(querySnap.getTimestamp("hasFinishedDate"))
                    inDevelopmentDate =
                        timestampToBrazilianDateTime(querySnap.getTimestamp("inDevelopmentDate"))
                    lastPaymentDate =
                        timestampToBrazilianDateTime(querySnap.getTimestamp("lastPaymentDate"))

                    publishedPlaystoreDate =
                        timestampToBrazilianDateTime(querySnap.getTimestamp("publishedPlaystoreDate"))
                    //Log.i("andamento","$description")
                }
            }
            .addOnFailureListener {
                return@addOnFailureListener
            }
    }

    // {name}/{nicho}/{paymentMethod}/{uid}/{prazo}
    Scaffold(topBar = { Header(nav, "Detalhes") }) {
        it
        Surface(color = Color.White) {
            Column(
                mod
                    .padding(it)
                    .fillMaxSize()
            ) {
                DetailsApp(
                    decodedName ?: "",
                    decodedNicho ?: "",
                    decodedPaymentMethod ?: "",
                    appUid ?: "", prazo ?: "",
                    firstPayment,
                    hasFinished,
                    inDevelopment,
                    lastPayment,
                    buildingLayout,
                    buildingLayoutDate,
                    hasFinishedDate,
                    inDevelopmentDate,
                    lastPaymentDate,
                    firstPaymentDate,
                    publishedPlaystore,
                    publishedPlaystoreDate
                )
            }
        }

    }

}

@Composable
fun DetailsApp(
    decodedName: String,
    decodedNicho: String,
    decodedPaymentMethod: String,
    appUid: String,
    prazo: String,
    firstPayment: Boolean,
    hasFinished: Boolean,
    inDevelopment: Boolean,
    lastPayment: Boolean,
    buildingLayout: Boolean,
    buildingLayoutDate: String,
    hasFinishedDate: String,
    inDevelopmentDate: String,
    lastPaymentDate: String,
    firstPaymentDate: String,
    publishedPlaystore: Boolean,
    publishedPlaystoreDate: String
) {
    val mod = Modifier
    var optionSelected by remember {
        mutableStateOf(true)
    }
    var renderOption by remember {
        mutableStateOf("status")
    }

    fun toogleOptionSeleceted() {
        optionSelected = !optionSelected
        if (optionSelected) renderOption = "status"
        else renderOption = "sobre"
    }


    Column(mod.padding(15.dp)) {
        Row(
            mod
                .fillMaxWidth()
                .height(50.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(contentAlignment = Alignment.Center, modifier = mod
                .background(
                    if (optionSelected) {
                        MainBlue
                    } else {
                        Color(0xffF0F0F0)
                    }
                )
                .clickable { toogleOptionSeleceted() }
                .weight(1f)
                .height(50.dp)) {
                TextContent(title = "Status", textColor = if (optionSelected) {
                    Color.White
                } else {
                    MainBlue
                }, onClick = { toogleOptionSeleceted() })
            }
            Box(contentAlignment = Alignment.Center, modifier = mod
                .background(
                    if (optionSelected) {
                        Color(0xffF0F0F0)
                    } else {
                        MainBlue
                    }
                )
                .clickable { toogleOptionSeleceted() }
                .weight(1f)
                .height(50.dp)) {
                TextContent(title = "Sobre", textColor = if (optionSelected) {
                    MainBlue
                } else {
                    Color.White
                }, onClick = { toogleOptionSeleceted() })
            }
        }
        if (renderOption == "status") {
            Box(modifier = mod.fillMaxSize()) {
                Column(
                    mod
                        .padding(10.dp)
                        .verticalScroll(rememberScrollState())
                )
                {
                    Row(mod.fillMaxWidth()) {
                        Image(
                            painter = painterResource(
                                id = if (firstPayment) {
                                    R.drawable.pagamento_inicial_selected
                                } else {
                                    R.drawable.pagamento_inicial
                                }

                            ),
                            contentDescription = ""
                        )
                        Column {
                            TextContent(title = "Aguardando pagamento inicial", textColor = if(firstPayment){Color(0xff476B8C)}else{Color.Black} )
                            if(firstPayment)  TextContent(title = firstPaymentDate, fontSize = 16.sp,textColor = if(firstPayment){Color(0xff4397A9)}else{Color.Black})
                        }
                    }
                    Box(mod.padding(start = 10.dp)){
                        Box(
                            modifier = mod
                                .width(7.dp)
                                .height(50.dp)
                                .padding(top = 10.dp)
                                .background(
                                    if (firstPayment) {
                                        Color(0xff476B8C)
                                    } else {
                                        Color.LightGray
                                    }
                                )
                        )
                    }


                    Row(
                        mod
                            .fillMaxWidth()
                            .padding(top = 10.dp)) {
                        Image(
                            painter = painterResource(
                                id = if (buildingLayout) {
                                    R.drawable.construido_layout_selected
                                } else {
                                    R.drawable.construindo_layout
                                }
                            ), contentDescription = ""
                        )
                        Column {
                            TextContent(title = "Construindo Layout", textColor = if(buildingLayout){Color(0xff476B8C)}else{Color.Black} )
                          if(buildingLayout)  TextContent(title = buildingLayoutDate, fontSize = 16.sp,textColor = if(buildingLayout){Color(0xff4397A9)}else{Color.Black})
                        }
                    }

                    Box(mod.padding(start = 10.dp)){
                        Box(
                            modifier = mod
                                .width(7.dp)
                                .height(50.dp)
                                .padding(top = 10.dp)
                                .background(
                                    if (buildingLayout) {
                                        Color(0xff476B8C)
                                    } else {
                                        Color.LightGray
                                    }
                                )
                        )
                    }

                    Spacer(modifier = mod.height(10.dp))

                    Row(
                        mod
                            .fillMaxWidth()
                            .padding(top = 10.dp),
                    ) {
                        Image(
                            painter = painterResource(
                                id = if (inDevelopment) {
                                    R.drawable.em_desenvolvimento_selected
                                } else {
                                    R.drawable.em_desemvolvimento
                                }
                            ), contentDescription = ""
                        )
                        Column {
                            TextContent(title = "Em desenvolvimento", textColor = if(inDevelopment){Color(0xff476B8C)}else{Color.Black} )
                         if(inDevelopment)   TextContent(title = inDevelopmentDate, fontSize = 16.sp,textColor = if(inDevelopment){Color(0xff4397A9)}else{Color.Black})
                        }
                    }

                    Box(mod.padding(start = 10.dp)){
                        Box(
                            modifier = mod
                                .width(7.dp)
                                .height(50.dp)
                                .padding(top = 10.dp)
                                .background(
                                    if (inDevelopment) {
                                        Color(0xff476B8C)
                                    } else {
                                        Color.LightGray
                                    }
                                )
                        )
                    }

                    Spacer(modifier = mod.height(10.dp))

                    Row(mod.fillMaxWidth()) {
                        Image(
                            painter = painterResource(
                                id = if (hasFinished) {
                                    R.drawable.aplicacao_finalizada_selected
                                } else {
                                    R.drawable.aplicacao_finalizada
                                }
                            ), contentDescription = ""
                        )
                        Column {
                            TextContent(title = "Aplicação finalizada",textColor = if(hasFinished){Color(0xff476B8C)}else{Color.Black} )
                          if(hasFinished)  TextContent(title = hasFinishedDate, fontSize = 16.sp,textColor = if(hasFinished){Color(0xff4397A9)}else{Color.Black})
                        }
                    }
                    Box(mod.padding(start = 10.dp)){
                        Box(
                            modifier = mod
                                .width(7.dp)
                                .height(50.dp)
                                .padding(top = 10.dp)
                                .background(
                                    if (hasFinished) {
                                        Color(0xff476B8C)
                                    } else {
                                        Color.LightGray
                                    }
                                )
                        )
                    }

                    Spacer(modifier = mod.height(10.dp))

                    Row(mod.fillMaxWidth()) {
                        Image(
                            painter = painterResource(
                                id = if (lastPayment) {
                                    R.drawable.pagamento_concluido_selected
                                } else {
                                    R.drawable.aguardando_pagamento
                                }
                            ), contentDescription = ""
                        )
                        Column {
                            TextContent(
                                title = if (lastPayment) {
                                    "Pagamento concluido"
                                } else {
                                    "Aguardando pagamento final"
                                },textColor = if(lastPayment){Color(0xff476B8C)}else{Color.Black}
                            )
                         if(lastPayment)   TextContent(title = lastPaymentDate,fontSize = 16.sp,textColor = if(lastPayment){Color(0xff4397A9)}else{Color.Black})

                        }
                    }
                    Box(mod.padding(start = 10.dp)){
                        Box(
                            modifier = mod
                                .width(7.dp)
                                .height(50.dp)
                                .padding(top = 10.dp)
                                .background(
                                    if (lastPayment) {
                                        Color(0xff476B8C)
                                    } else {
                                        Color.LightGray
                                    }
                                )
                        )
                    }

                    Spacer(modifier = mod.height(10.dp))

                    Row(mod.fillMaxWidth()) {
                        Image(
                            painter = painterResource(
                                id = if (publishedPlaystore) {
                                    R.drawable.playstore_selected
                                } else {
                                    R.drawable.playstore
                                }
                            ), contentDescription = ""
                        )
                        Column {
                            TextContent(
                                title = if (publishedPlaystore) {
                                    "Aplicativo publicado na PlayStore"
                                } else {
                                    "Ainda não disponível na PlayStore"
                                },textColor = if(publishedPlaystore){Color(0xff476B8C)}else{Color.Black}
                            )
                            if(publishedPlaystore)   TextContent(title = publishedPlaystoreDate,fontSize = 16.sp,textColor = if(publishedPlaystore){Color(0xff4397A9)}else{Color.Black})

                        }
                    }

                }
            }
        }else {
            Spacer(mod.height(30.dp))
            Card(
                colors = CardDefaults.cardColors(Color.White),
                modifier = mod.border(1.dp, MainBlue, RoundedCornerShape(10.dp))
            ) {
                Column(mod.padding(10.dp)) {
                    Box(
                        modifier = mod
                            .fillMaxWidth()
                            .height(40.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        TextContent(
                            title = decodedName,
                            textColor = MainBlue,
                            fontSize = 22.sp,
                            fontWeight = 700
                        )
                    }
                    Box(modifier = mod.fillMaxWidth().padding(horizontal = 10.dp, vertical = 5.dp)){
                        Box(mod.fillMaxWidth().background(Color(0xff4397A9)).height(4.dp))
                    }
                    TextContent(title = "Nicho de $decodedNicho", fontSize = 18.sp)
                    //Spacer(mod.height(10.dp))
                    //TextContent(title = "Quantidade: 1" )
                    Spacer(mod.height(10.dp))
                    TextContent(title = "Prazo aproximado: $prazo meses",fontSize = 18.sp)
                    Spacer(mod.height(10.dp))
                    TextContent(title = "Forma de pagamento: $decodedPaymentMethod",fontSize = 18.sp)
                }
            }
        }
    }

}
