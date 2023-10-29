package com.thunder.screens

import android.content.Intent
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat.finishAffinity
import androidx.core.content.ContextCompat.startActivity
import androidx.navigation.NavHostController
import com.thunder.GlobalStates.UserState
import com.thunder.components.AppCard
import com.thunder.components.HeaderHome
import com.thunder.components.TextContent
import com.thunder.types.AppType
import com.google.firebase.Firebase
import com.google.firebase.firestore.firestore
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.FieldValue
import com.thunder.components.TextInput
import com.thunder.ui.theme.MainBlue

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MemberArea(nav: NavHostController, userState: UserState){
    var apps by remember {
        mutableStateOf<List<AppType>>(emptyList())
    }
    val firestoreDb = Firebase.firestore
    var loading by remember { mutableStateOf(true) }


    LaunchedEffect(Unit){
        val uid = userState.getUID()
        if (uid != null) {
            Log.i("userInfo", uid)
            firestoreDb.collection("Aplicativos").whereEqualTo("createdBy",uid)
                .orderBy("createdAt",Query.Direction.DESCENDING).get()
                .addOnSuccessListener {
                    querySnap->
                    var aux = mutableListOf<AppType>()
                    if(querySnap != null){
                        for(i in querySnap){
                            val appName = i.getString("appName")?:""
                            val createdAt = i.getTimestamp("createdAt")?:""
                            val nicho = i.getString("nicho")?:""
                            val paymentMethod = i.getString("paymentMethod")?:""
                            val prazo = i.getLong("prazo")?:""
                            val status = i.getString("status")?:""
                            val appUid = i.getString("uid")?:""

                            aux.add(AppType(appUid,nicho,paymentMethod,prazo.toString(),appName, status))
                        }
                        apps = aux
                        loading = false
                    }
                }
                .addOnFailureListener {loading = false
                    return@addOnFailureListener }
        }

    }

    var mod = Modifier

    Scaffold(topBar = { HeaderHome(nav,false)}) {it
        Column(modifier = mod
            .fillMaxSize()
            .background(Color.White)
            .padding(it)) {
           TextInput(title = "Minhas Aplicações")
            if(loading){
                Box(mod.fillMaxSize(), contentAlignment = Alignment.Center){
                    CircularProgressIndicator(
                        modifier = mod.width(64.dp),
                        color = MainBlue,
                        //trackColor = MaterialTheme.colorScheme.secondary,
                    )
                }
            }else{
                LazyColumn( verticalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = mod
                        .fillMaxSize()
                        .background(Color.White)
                        .padding(15.dp)){
                    items(apps){
                            app->
                        AppCard(nav,app.appName,app.nicho,app.status,app.paymentMethod,app.uid,
                            app.prazo
                        )
                    }

                }
            }

        }

    }


}