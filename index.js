/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


//############################################################## AppSealing Code-Part BEGIN: DO NOT MODIFY THIS LINE !!!
import {Alert, NativeModules} from 'react-native';

const DETECTED_JAILBROKEN = 0x00000001;
const DETECTED_DRM_DECRYPTED = 0x00000002;
const DETECTED_DEBUG_ATTACHED = 0x00000004;
const DETECTED_HASH_INFO_CORRUPTED = 0x00000008;
const DETECTED_CODESIGN_CORRUPTED = 0x00000010;
const DETECTED_HASH_MODIFIED = 0x00000020;
const DETECTED_EXECUTABLE_CORRUPTED = 0x00000040;
const DETECTED_CERTIFICATE_CHANGED = 0x00000080;
const DETECTED_BLACKLIST_CORRUPTED = 0x00000100;
const DETECTED_CHEAT_TOOL = 0x00000200;
try
{
 const {AppSealingInterfaceBridge} = NativeModules;
 let security_threat = parseInt( AppSealingInterfaceBridge.IsAbnormalEnvironmentDetectedRN() );
 if ( security_threat > 0 )
 {
 // Show GUI
 let msg = "\n--------------------------------------"
 + "\nAbnormal Environment Detected !!"
 + "\n--------------------------------------\n";
 if (( security_threat & DETECTED_JAILBROKEN ) > 0 )
 msg += "\n - Jailbroken";
 if (( security_threat & DETECTED_DRM_DECRYPTED ) > 0 )
 msg += "\n - Executable is not encrypted";
 if (( security_threat & DETECTED_DEBUG_ATTACHED ) > 0 )
 msg += "\n - App is debugged";
 if (( security_threat & DETECTED_HASH_INFO_CORRUPTED ) > 0 || ( security_threat & DETECTED_HASH_MODIFIED ) > 0 )
 msg += "\n - App integrity has broken";
 if (( security_threat & DETECTED_CODESIGN_CORRUPTED ) > 0 || ( security_threat & DETECTED_EXECUTABLE_CORRUPTED ) > 0 )
 msg += "\n - App executable has corrupted";
 if (( security_threat & DETECTED_CERTIFICATE_CHANGED ) > 0 )
 msg += "\n - App has re-signed";
 if (( security_threat & DETECTED_BLACKLIST_CORRUPTED ) > 0 )
 msg += "\n - Blacklist/whitelist has corrupted";
 if (( security_threat & DETECTED_CHEAT_TOOL ) > 0 )
 msg += "\n - Cheat tool has detected";
 console.log( "AppSealing Security Threat: " + msg );
 Alert.alert( "AppSealing Security Threat", msg,
 [{ text: "Confirm", onPress: () => { AppSealingInterfaceBridge.ExitApp(); }}], { cancelable: false } );
 }
}
catch( e )
{
 console.log( "### AppSealing Security Check : " + e.ToString() );
}

AppSealingPeriodicAlerted = false;
function AppSealingPeriodicCheck() {
 if( AppSealingPeriodicAlerted ){
 return;
 }
 try
 {
 const {AppSealingInterfaceBridge} = NativeModules;
 let ret = parseInt( AppSealingInterfaceBridge.IsSwizzlingDetectedReturnRN() );

 if ( ret >= 1 && ret <= 3 )
 {
 // Show GUI
 let msg = "\n--------------------------------------"
 + "\nAbnormal Environment Detected !!"
 + "\n--------------------------------------\n";
 if ( ret == 1 )
 msg += "\n - Jailbroken";
 if ( ret == 2 )
 msg += "\n - Method Swizzling";
 if ( ret == 3 )
 msg += "\n - Method Hooking";

 console.log( "AppSealing Security Threat: " + msg );
 Alert.alert( "AppSealing Security Threat", msg, [{ text: "Confirm", onPress: () => { AppSealingInterfaceBridge.ExitApp(); }}],
{ cancelable: false } );
 AppSealingPeriodicAlerted = true;
 }
 }
 catch( e )
 {
 console.log( "### AppSealing Security Check : " + e.ToString() );
 }
}
setInterval(AppSealingPeriodicCheck, 2500); // 2.5ms
//############################################################## AppSealing Code-Part END: DO NOT MODIFY THIS LINE !!!