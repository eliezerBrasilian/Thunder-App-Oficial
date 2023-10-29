package com.thunder.GlobalStates
import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import android.provider.Settings.Global.putString
import androidx.core.content.edit
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import com.thunder.types.User
import kotlinx.coroutines.flow.asStateFlow
class UserState(context:Context) {
    private val sharedPreferences:SharedPreferences = context.getSharedPreferences("user_data", Context.MODE_PRIVATE)
    private val UID_KEY = "uid"
    private val NAME = "name"
    private val EMAIL = "email"
    private val PHOTO = "photo"
    private val CREDENTIAL = "credential"
    private val WHATSAPP = "whatsapp"
    val isUserLoggedIn: Boolean
        get() = sharedPreferences.getString(UID_KEY, null) != null

    fun login(uid: String,name:String,email:String,photo:String,credential:String,whatsapp:String) {
        sharedPreferences.edit {
            putString(UID_KEY, uid)
            putString(NAME, name)
            putString(EMAIL, email)
            putString(PHOTO, photo)
            putString(CREDENTIAL, credential)
            putString(WHATSAPP, whatsapp)
        }
    }

    fun logout() {
        sharedPreferences.edit().remove(UID_KEY).apply()
    }

    fun getUID(): String? {
        return sharedPreferences.getString(UID_KEY, null)
    }
}
