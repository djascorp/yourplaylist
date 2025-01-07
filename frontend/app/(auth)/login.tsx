import { useState } from "react";
import { Button, Form, Input, Label, Text, View, YStack } from "tamagui";
import { Alert } from "react-native"; // Pour afficher des alertes
import { httpService as db } from "@/services/httpService"  // Importez le service HTTP
import { Link, useRouter } from "expo-router";
import { useApp } from "@/hooks/useApp";
import { useToastController } from "@tamagui/toast";

export default function LoginScreen() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
    const { login } = useApp();
    const toast = useToastController();

    /**
     * Gère la soumission du formulaire de connexion.
     */
    const handleLogin = async () => {
        // Validation de base
        if (!form.email || !form.password) {
            toast.show("Error", {message: "Please fill in all fields."});
            return;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.show("Error", {message: "Please enter a valid email address."});
            return;
        }

        setLoading(true);

        try {
            // Appel à la fonction de connexion via le service HTTP
            const response = await db.user.login({
                email: form.email,
                password: form.password,
            });

            // Si la connexion réussit, connectez l'utilisateur via le contexte d'authentification
            login(response.token);

            // Rediriger l'utilisateur vers l'écran d'accueil ou le tableau de bord
            router.replace('/playlists');
        } catch (error) {
            // Afficher une alerte en cas d'erreur
            toast.show("Error",{message: error.message || "Failed to log in. Please try again."});
            
            console.log("ERROR",error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <View alignItems="center" justifyContent="center" flex={1} padding="$4" paddingBottom="$12">
            <Form width={250} onSubmit={handleLogin}>
                <YStack space="$2" alignItems="center">
                    <Label size="$9" marginBottom="$4">YourPlaylist</Label>

                    {/* Champ Email */}
                    <Input
                        width="100%"
                        placeholder="E-mail Address"
                        value={form.email}
                        onChangeText={value => setForm(state => ({ ...state, email: value }))}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Champ Mot de passe */}
                    <Input
                        secureTextEntry={true}
                        width="100%"
                        placeholder="Password"
                        value={form.password}
                        onChangeText={value => setForm(state => ({ ...state, password: value }))}
                    />

                    {/* Bouton de connexion */}
                    <Button
                        width="100%"
                        onPress={handleLogin}
                        disabled={loading} // Désactiver le bouton pendant le chargement
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                    {/* Lien vers l'écran d'inscription */}
                    <Text marginTop="$2">
                        Don't have an account?{" "}
                        <Link href={'/register'}>
                            <Text
                                color="$blue10"
                                textDecorationLine="underline"
                            >
                                Sign up
                            </Text>
                        </Link>
                    </Text>
                </YStack>
            </Form>
        </View>
    );
}