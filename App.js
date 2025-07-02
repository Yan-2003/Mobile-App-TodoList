import { createStackNavigator } from "@react-navigation/stack";
import List from "./screens/List";
import { NavigationContainer } from "@react-navigation/native";
import AddList from "./screens/AddList";
import EditList from "./screens/EditList";


export default function App() {

  const Stack = createStackNavigator()
 

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name="Home" component={List}  />
        <Stack.Screen name="AddList" component={AddList} />
        <Stack.Screen name="EditList" component={EditList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


