import { useState } from "react";
import { Button, Form, Input, Label, Text, View, YStack } from "tamagui";
import { Alert } from "react-native"; // Pour afficher des alertes
import { httpService } from "../../services/httpService"; // Importez le service HTTP
import { Link, useRouter } from "expo-router";

export default function RegisterScreen() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement

    /**
     * Gère la soumission du formulaire d'inscription.
     */
    const handleRegister = async () => {
        // Validation de base
        if (!form.username || !form.email || !form.password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }

        if (form.password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            // Appel à la fonction d'inscription via le service HTTP
            const user = await httpService.user.register({
                username: form.username,
                email: form.email,
                password: form.password,
            });

            // Si l'inscription réussit, connectez l'utilisateur via le contexte d'authentification
            // const { login } = useAuth();
            // login(user);

            // Rediriger l'utilisateur vers l'écran d'accueil ou le tableau de bord
            router.replace("/");
        } catch (error) {
            // Afficher une alerte en cas d'erreur
            Alert.alert("Error", error.message || "Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View alignItems="center" justifyContent="center" flex={1} padding="$4">
            <Form width={250} onSubmit={handleRegister}>
                <YStack space="$2" alignItems="center">
                    <Label size="$9" marginBottom="$4">YourPlaylist</Label>

                    {/* Champ Nom d'utilisateur */}
                    <Input
                        width="100%"
                        placeholder="Username"
                        value={form.username}
                        onChangeText={value => setForm(state => ({ ...state, username: value }))}
                        autoCapitalize="none"
                    />

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

                    {/* Bouton de création de compte */}
                    <Button
                        width="100%"
                        onPress={handleRegister}
                        disabled={loading} // Désactiver le bouton pendant le chargement
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </Button>

                    {/* Lien vers l'écran de connexion */}
                    <Text marginTop="$2">
                        Already have an account?{" "}
                        <Link href="/login">
                            <Text
                                color="$blue10"
                                textDecorationLine="underline"
                            >
                                Log in
                            </Text>
                        </Link>
                    </Text>
                </YStack>
            </Form>
        </View>
    );
}