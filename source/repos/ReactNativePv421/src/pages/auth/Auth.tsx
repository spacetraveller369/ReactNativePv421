import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthStyle from './css/AuthStyle';
import { useContext, useState } from 'react';
import { textColor } from '../../features/values/colors';
import AppContext from '../../features/context/AppContext';
import { ButtonTypes, FirmButton } from '../../features/ui/button/FirmButton';
import SignUpView from './ui/SignUpView';
import SignInView from './ui/SignInView';


export default function Auth() {
    const {user} = useContext(AppContext);
    const [pageMode, setPageMode] = useState("SignIn");


    return !!user 
    ? <SignedView />
    : <View style={AuthStyle.authContainer}>        
        <PageSwitchWidget pageMode={pageMode} setPageMode={setPageMode}/>        
        {pageMode == "SignIn"
        ? <SignInView />
        : <SignUpView setPageMode={setPageMode} />
        }
    </View>;
}

function PageSwitchWidget({pageMode, setPageMode}:{pageMode:string, setPageMode:React.Dispatch<React.SetStateAction<string>>}) {
    return <View style={AuthStyle.pageSwitch}>
        <FirmButton title='Вхід' style={AuthStyle.pageSwitchButton}
            buttonType={pageMode == "SignUp" ? ButtonTypes.primary : ButtonTypes.success}
            action={() => setPageMode("SignIn")}/>
        <FirmButton title='Реєстрація' style={AuthStyle.pageSwitchButton}
            buttonType={pageMode == "SignUp" ? ButtonTypes.success : ButtonTypes.primary} 
            action={() => setPageMode("SignUp")} />
    </View>;
}

function SignedView() {
    const {user, setUser} = useContext(AppContext);
    
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState(user!); 

    const signOutClick = () => {
        setUser(null);
    }

    const onSave = () => {
        setUser(tempUser); 
        setIsEditing(false); 
    }

    const isValid = tempUser.email.includes("@") && tempUser.phone!.length > 9;

    return <View style={AuthStyle.authContainer}>
        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Вітання, {user!.name}</Text>
        </View>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>E-mail:</Text>
            {isEditing ? (
                <TextInput style={AuthStyle.authRowInput} value={tempUser.email} onChangeText={t => setTempUser({...tempUser, email: t})} />
            ) : (
                <Text style={AuthStyle.authRowText}>{user!.email}</Text>
            )}
        </View>

        <View style={AuthStyle.authRow}>
            <Text style={AuthStyle.authRowText}>Телефон:</Text>
            {isEditing ? (
                <TextInput style={AuthStyle.authRowInput} value={tempUser.phone} onChangeText={t => setTempUser({...tempUser, phone: t})} />
            ) : (
                <Text style={AuthStyle.authRowText}>{user!.phone}</Text>
            )}
        </View>

        <View style={AuthStyle.authRow}>
            {isEditing ? (
                <>
                    <TouchableOpacity style={AuthStyle.authButton} onPress={onSave} disabled={!isValid}>
                        <Text style={[AuthStyle.authButtonText, {color: isValid ? textColor : "#777"}]}>Зберегти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={AuthStyle.authButton} onPress={() => setIsEditing(false)}>
                        <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Скасувати</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity style={AuthStyle.authButton} onPress={() => setIsEditing(true)}>
                    <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Редагувати</Text>
                </TouchableOpacity>
            )}
        </View>

        <View style={AuthStyle.authRow}>
            <TouchableOpacity style={AuthStyle.authButton} onPress={signOutClick}>
                <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Вихід</Text>
            </TouchableOpacity>
        </View>
    </View>;
}
/*
Д.З. Стилізувати сторінку профіля користувача.
Реалізувати режим редагування даних з реактивною валідацією
(деактивація кнопки збереження у разі некоректних даних)
*/
