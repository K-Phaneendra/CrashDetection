import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import SignInNavigationContainer from './SignInNavigationContainer';
import useLinking from './useLinking';
import { Store } from "../contextAPIs/StoreProvider";
import { loginStatus } from "../constants/dataSets";

const Stack = createStackNavigator();

const MainNavigationContainer = () => {
  const { currentLoginStatus } = useContext(Store)
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  useEffect(() => {
        // Load our initial navigation state
        setInitialNavigationState(getInitialState());
  }, [])

  return (
    <NavigationContainer
      ref={containerRef}
      initialState={initialNavigationState}
    >
      <Stack.Navigator>
        {currentLoginStatus !== loginStatus.SUCCESS && (
          <Stack.Screen name="Root" component={SignInNavigationContainer} />
        )}
        {currentLoginStatus === loginStatus.SUCCESS && (
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
