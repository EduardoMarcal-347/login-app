import { StyleSheet, Text, View, Button, ActivityIndicator, Image } from "react-native";
import { useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

//funções de autenticação
export const onLogin = async () => {
  const user = await GoogleSignin.signIn();
  return user;
};

export const onLogout = async () => {
  return await GoogleSignin.signOut();
};

GoogleSignin.configure({
  webClientId: "1011384308095-96u9sgmhehb0ao2o0chvbibf02opdsh5.apps.googleusercontent.com",
});

const LoginScreen = ({ login }) => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const handleLogin = async () => {
    try {
      setIsSigninInProgress(true);
      const user = await onLogin();
      console.log(user);
      login(user);
    } catch (error) {
      console.error("Erro durante o login:", error);
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <View style={styles.layout}>
      {isSigninInProgress && <ActivityIndicator />}
      <Text style={styles.title}>Login</Text>
      <Button title="entrar" onPress={handleLogin} />
    </View>
  );
};

const HomeScreen = ({ user, login }) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Home</Text>
    <Text style={styles.userName}>{user.user.name}</Text>
    <Text style={styles.userEmail}>{user.user.email}</Text>
    <Image
      style={{ width: 100, height: 100, marginBottom: 20 }}
      source={{
        uri: user.user.photo,
      }}
    />
    <Button title="Sair" onPress={() => onLogout().then(() => login(false))} />
  </View>
);

const App = () => {
  const [user, setUser] = useState(false);
  return <View style={styles.container}>{user ? <HomeScreen user={user} login={setUser} /> : <LoginScreen login={setUser} />}</View>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
  },
  userEmail: {
    fontSize: 15,
    marginBottom: 10,
    color: 'grey'
  }
});