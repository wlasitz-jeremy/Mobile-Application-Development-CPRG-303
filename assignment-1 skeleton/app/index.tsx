import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProfileHeader } from '../components/ProfileHeader';
import { TabBarPlaceholder } from '../components/TabBarPlaceholder';
import { ContentPlaceholder } from '../components/ContentPlaceholder';
import { BottomNavigation } from '../components/BottomNavigation';

export default function IndexScreen() {
 const showAlert=()=>Alert.alert('Alert Button pressed');
 return (
 <SafeAreaView style={{flex:1}}>
  <View style={{flex:1}}>
   <ScrollView>
    <ProfileHeader />
    <TabBarPlaceholder />
    <ContentPlaceholder />
   </ScrollView>
   <BottomNavigation />
   <Pressable onPress={showAlert} style={({pressed})=>[{backgroundColor:'#2563EB',padding:16,margin:16,borderRadius:8,alignItems:'center'},pressed&&{opacity:.8}]}>
    <Text style={{color:'white',fontWeight:'700'}}>Alert</Text>
   </Pressable>
  </View>
 </SafeAreaView>
 );
}
