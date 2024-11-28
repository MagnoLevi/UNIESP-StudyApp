// Importações necessárias do React, React Navigation e Context API
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext'; // Contexto de autenticação
import { ProvedorCartoesEstudo } from './src/contexts/CartoesEstudoContext'; // Contexto de cartões
import ListaCartaoScreen from './src/screens/ListaCartaoScreen'; // Tela principal
import EdicaoCartaoScreen from './src/screens/EdicaoCartaoScreen'; // Tela de edição/criação
import TarefasVencimentoProximoScreen from './src/screens/TarefasVencimentoProximoScreen'; // Tela de vencimento
import LoginScreen from './src/screens/LoginScreen'; // Tela de login
import RegistroScreen from './src/screens/RegistroScreen'; // Tela de registro
import { MaterialIcons } from 'react-native-vector-icons'; // Ícones
import { TouchableOpacity } from 'react-native'; // Botão de logout

// Criação da pilha de navegação
const Stack = createStackNavigator();

/**
 * Configura e gerencia as rotas do aplicativo.
 */
const AppNavigator = () => {
    // Obtém o contexto de autenticação
    const { user, loading, logout } = useContext(AuthContext);

    // Exibe uma tela em branco enquanto os dados de autenticação estão carregando
    if (loading) {
        return null;
    }

    return (
        <Stack.Navigator initialRouteName={user ? 'ListaCartao' : 'Login'}>
            {/* Rotas protegidas (requerem autenticação) */}
            {user ? (
                <>
                    <Stack.Screen
                        name="ListaCartao"
                        component={ListaCartaoScreen}
                        options={{
                            title: 'Cartões de Estudo',
                            headerRight: () => (
                                <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
                                    <MaterialIcons name="logout" size={24} color="#ff6347" />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen name="EdicaoCartao" component={EdicaoCartaoScreen} options={{ title: 'Editar Cartão' }} />
                    <Stack.Screen name="TarefasVencimentoProximo" component={TarefasVencimentoProximoScreen} options={{ title: 'Tarefas a Vencer' }} />
                </>
            ) : (
                // Rotas públicas (não requerem autenticação)
                <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                    <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Criar Conta' }} />
                </>
            )}
        </Stack.Navigator>
    );
};

/**
 * Componente principal do aplicativo.
 * - Envolve a aplicação com os provedores de contexto.
 */
const App = () => {
    return (
        <AuthProvider>
            <ProvedorCartoesEstudo>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </ProvedorCartoesEstudo>
        </AuthProvider>
    );
};

export default App;
