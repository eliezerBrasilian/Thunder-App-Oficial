package com.thunder.screens

import android.util.Log
import androidx.compose.foundation.BorderStroke
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
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.OffsetMapping
import androidx.compose.ui.text.input.TransformedText
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.thunder.components.CustomButton
import com.thunder.components.TextContent
import com.thunder.components.Header
import com.thunder.components.NichoItem
import com.thunder.ui.theme.MainBlue
import com.google.firebase.firestore.firestore
import com.google.firebase.Firebase
import com.google.firebase.firestore.FieldValue
import com.thunder.Utils.ShowToast
import com.thunder.components.TextInput

@OptIn(ExperimentalMaterial3Api::class, ExperimentalComposeUiApi::class)
@Composable
fun Contratar(nav:NavHostController){
    val mod = Modifier
    var appNameInput by remember {
        mutableStateOf("")
    }
    var whatsappInput by remember {
        mutableStateOf("")
    }
    val mask = "##) #####-####"
    var customerNameInput by remember{
        mutableStateOf("")
    }

    var nichoSelected by remember {
        mutableStateOf("Delivery")
    }

    var labelNicho by remember{ mutableStateOf("Nicho do aplicativo") }
    val nichos = listOf("Alimentação","Bebida","Delivery","Entretenimento","Transporte","Saúde","Vestuário")
    var nichosListVisible by remember { mutableStateOf(false) }


    fun openNichoList(){
        nichosListVisible = true
        labelNicho = "Escolha o nicho do seu aplicativo"
    }

    fun selectNicho(nicho:String){
        nichoSelected = nicho
        nichosListVisible = false
        labelNicho = "Nicho do aplicativo"
    }

    val firestoreDb = Firebase.firestore

    
    val localContext = LocalContext.current
    fun sendRequest(){

        if(nichoSelected.trim().isNotEmpty() && appNameInput.trim().isNotEmpty() &&
            whatsappInput.trim().isNotEmpty() && customerNameInput.trim().isNotEmpty()
            )
        {
            firestoreDb.collection("Pedidos").add(hashMapOf(
                "nicho" to nichoSelected.trim(),
                "appName" to appNameInput.trim(),
                "whatsApp" to whatsappInput.trim(),
                "customerName" to customerNameInput.trim(),
                "createdAt" to FieldValue.serverTimestamp()
            )).addOnSuccessListener {
                ShowToast("Seu pedido foi enviado",localContext)
            }
                .addOnFailureListener { e->
                    Log.e("my_firestore","erro ao adicionar documento: $e")
                }
        }
      else ShowToast("Você deve preencher todas as informações",localContext)
    }
    val scrollState = rememberScrollState()

    Scaffold(topBar = { Header(nav,"Contratar")}) {it

        Column(
            mod
                .padding(it)
                .background(Color.White)
                .fillMaxSize()
                .navigationBarsPadding()
                .verticalScroll(scrollState)
        ) {

            TextInput(title = "Preencha os campos abaixo, para que nossa equipe possa entrar em contato.")

            Spacer(modifier = mod.height(50.dp))

            TextInput(title = labelNicho)
            Spacer(modifier = mod.height(10.dp))
            Box(
                mod
                    .fillMaxWidth()
                    .padding(horizontal = 15.dp)
                    .border(1.dp, MainBlue, RoundedCornerShape(10.dp))
            ){

                if(nichosListVisible){
                    LazyColumn(
                        mod
                            .height(250.dp)
                            .padding(5.dp)){
                        items(nichos){nicho->
                            NichoItem(nicho, { selectNicho(nicho) })
                        }
                    }
                }
                else{
                    Row(
                        mod
                            .border(1.dp, MainBlue, RoundedCornerShape(10.dp))
                            .height(90.dp)
                            .fillMaxWidth()
                            .clickable { openNichoList() }, verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceAround) {
                        TextContent(title = nichoSelected) {
                            openNichoList()
                        }
                        Icon(imageVector = Icons.Filled.ArrowDropDown, contentDescription = "down", modifier = mod
                            .height(30.dp)
                            .clickable { openNichoList() }, tint = Color.Black)
                    }
                }

            }
            Spacer(modifier = mod.height(30.dp))

            TextInput(title = "Nome do aplicativo")
            Spacer(modifier = mod.height(10.dp))
            TextField(value = appNameInput, onValueChange = { appNameInput = it },
                placeholder = { TextInput(
                    title = "Qual vai ser o nome do aplicativo?",
                    fontSize = 17.sp,
                    fontWeight = 400,
                    horizontalPadding = 0.dp
                )
                },
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
            TextInput(title = "Número de WhatsApp")
            Spacer(modifier = mod.height(10.dp))
            val inputLenght = 11;
            TextField(
                value = whatsappInput,
                onValueChange = {
                    // Filtro para permitir apenas dígitos no número de telefone
                    val digitsOnly = it.filter { it.isDigit() }
                    whatsappInput = digitsOnly.take(inputLenght) // Limitar o tamanho do número
                    //whatsappInput = it.toString()
                                },
                //visualTransformation = phoneMask(mask)
                visualTransformation = MaskTransformation(),
                placeholder = {
                    TextInput(
                        title = "Digite seu número",
                        fontSize = 17.sp,
                        fontWeight = 400,
                        horizontalPadding = 0.dp
                    )
                },
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
                ),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
            )

            Spacer(modifier = mod.height(30.dp))
            TextInput(title = "Nome do solicitante")
            Spacer(modifier = mod.height(10.dp))
            TextField(value = customerNameInput, onValueChange = { customerNameInput = it },
                placeholder = { TextInput(
                    title = "Digite seu nome",
                    fontSize = 17.sp,
                    fontWeight = 400,
                    horizontalPadding = 0.dp
                )
                },
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
                CustomButton(title = "Enviar Informações", onClick = {sendRequest()})
            }
            Spacer(modifier = Modifier.height(300.dp))

        }
    }
}
class MaskTransformation : VisualTransformation {
    override fun filter(text: AnnotatedString): TransformedText {
        return maskFilter(text)
    }
}

fun maskFilter(text: AnnotatedString): TransformedText {
    // xxxxxxxxxx -> (xx)xxxxx-xxxx
    val trimmed = if (text.text.length >= 11) text.text.substring(0..10) else text.text
    val out = buildAnnotatedString {
        append("(")
        for (i in trimmed.indices) {
            when (i) {
                2 -> {
                    append(") ")
                    append(trimmed[i])
                }
                7 -> {
                    append("-")
                    append(trimmed[i])
                }
                else -> append(trimmed[i])
            }
        }
    }

    val offsetTranslator = object : OffsetMapping {
        override fun originalToTransformed(offset: Int): Int {
            return when {
                offset <= 2 -> offset + 1
                offset <= 7 -> offset + 3
                offset <= 12 -> offset + 4
                else -> offset
            }
        }

        override fun transformedToOriginal(offset: Int): Int {
            return when {
                offset <= 3 -> offset - 1
                offset <= 8 -> offset - 3
                offset <= 13 -> offset - 4
                else -> offset
            }
        }
    }

    return TransformedText(out, offsetTranslator)
}

/*
class MaskTransformation() : VisualTransformation {
    override fun filter(text: AnnotatedString): TransformedText {
        return maskFilter(text)
    }
}


fun maskFilter(text: AnnotatedString): TransformedText {
    //32-99800-8182 ->  11 -> 13
    val trimmed = if (text.text.length >= 11) text.text.substring(0..10) else text.text
    var out = ""
    for (i in trimmed.indices) {
        out += trimmed[i]
        if (i==6) out += "-"
    }

    val numberOffsetTranslator = object : OffsetMapping {
        override fun originalToTransformed(offset: Int): Int {
            if (offset <= 6) return offset
            if (offset <= 11) return offset +1
            return 13

        }

        override fun transformedToOriginal(offset: Int): Int {
            if (offset <=7) return offset
            if (offset <=12) return offset -1
            return 11
        }
    }

    return TransformedText(AnnotatedString(out), numberOffsetTranslator)
}

 */