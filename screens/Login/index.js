import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { MonoText } from "../../components/StyledText";
import { _storeData, _retrieveData } from "../../services/AsyncStorage";
import { Store } from "../../contextAPIs/StoreProvider";
import { loginStatus } from "../../constants/dataSets";

const initialForm = {
  userId: "",
  password: "",
};

const Login = () => {
  const { setCurrentLoginStatus } = useContext(Store);
  const [form, setForm] = useState(initialForm);

  const captureField = (key, event) => {
    const value = event.target.value;
    const formClone = { ...form };
    formClone[key] = value;
    setForm(formClone);
  };

  const login = async () => {
    const dataObj = {
      key: "userId",
      value: form.userId,
    };
    const isDataStored = await _storeData(dataObj);
    if (isDataStored) {
      setCurrentLoginStatus(loginStatus.SUCCESS);
    }
  };

  return (
    <View>
      <MonoText>Login</MonoText>
      <Input
        placeholder="User ID"
        value={form.userId}
        onChange={(e) => captureField("userId", e)}
      />
      <Input
        placeholder="Password"
        value={form.password}
        onChange={(e) => captureField("password", e)}
      />
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default Login;
