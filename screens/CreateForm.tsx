import React from 'react'
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Formik } from 'formik'

type Props = {
    screen: string
    setScreen(name: string): any
}

const CreateForm = (props: Props) => {
    const [checked, setChecked] = React.useState('3x3');
    const gridItemAmount = checked == "3x3" ? 9 : 16

    const renderInputs = (handleChange: any) => {
        var boxes: any = []

        for (let i = 0; i < gridItemAmount; i++) {
            boxes.push(<TextInput
                onChangeText={handleChange('items[' + i + ']')}
                style={{ borderWidth: 1, marginHorizontal: "5%", borderRadius: 5, marginBottom: "2%" }}
                key={i}
            ></TextInput>)
        }
        return boxes
    }

    const handleSubmit = (values: any) => {
        console.log(values.length)
        if (values.length < gridItemAmount) {
            while (values.length < gridItemAmount) {
                values.push("");
            }
        }
        console.log("VALUES", values)
    }

    return (
        <ScrollView>
            <Text style={styles.text}>Welcome to create form!</Text>
            <Text style={{ marginLeft: "1%" }}>Grid Size:</Text>
            <View style={{ flexDirection: "row" }}>
                <RadioButton
                    value="3x3"
                    status={checked === '3x3' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('3x3')}
                />
                <Text style={{ textAlignVertical: "center" }}>3x3</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <RadioButton
                    value="4x4"
                    status={checked === '4x4' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('4x4')}
                />
                <Text style={{ textAlignVertical: "center" }}>4x4</Text>
            </View>

            <Formik
                initialValues={[]}
                onSubmit={(values) => handleSubmit(values)}>

                {({ handleChange, handleSubmit, values }) => {
                    return (
                        <>
                            {renderInputs(handleChange)}
                            <Button title={"Submit"} onPress={handleSubmit}></Button>
                        </>
                    )
                }}
            </Formik>
            {checked === "4x4" ? <></> : null}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    text: {
        color: "#000",
        fontSize: 32,
        justifyContent: "center",
        alignSelf: "center"
    }
})
export default CreateForm;