import { Modal, View, Text, TextInput, ScrollView } from "react-native"
import { Button } from "react-native-paper";

interface Props {
    showModal: boolean;
    inputStyle: Object;
}

export default function EnterCodeModal({ showModal, inputStyle }: Props): JSX.Element {
    return (
        <ScrollView>
            <View>
                <Modal visible={showModal} animationType="slide">
                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                marginBottom: 10,
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#0a7ea4",
                            }}
                        >
                            Please check your email
                        </Text>
                        <Text style={{ width: 350, fontSize: 16, marginBottom: 10, textAlign: "center", color: "#0a7ea4" }}>
                            we've sent you an email with a 6 digit code to
                            verify your account.
                        </Text>
                        <TextInput
                            aria-label="Enter the code"
                            style={inputStyle}
                            placeholder="Enter the code"
                        />
                        <Button
                            mode="contained-tonal"
                            style={{ marginTop: 15 }}
                        >
                            Verify
                        </Button>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}