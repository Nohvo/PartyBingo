import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Formik } from 'formik'
import { add_grid, GridContainer, Item } from '../features/grid'
import { useDispatch } from 'react-redux'
import { getLatestId } from '../store/store'

type Props = {
    screen: string
    setScreen(name: string): any
}
const CreateForm = (props: Props & StackScreenProps<any>) => {
    const dispatch = useDispatch()
    const [checked, setChecked] = React.useState('3x3');
    const [name, setName] = React.useState<string>("");
    const gridItemAmount = checked == "3x3" ? 9 : 16

    const renderInputs = (handleChange: any) => {
        var boxes: any = []

        for (let i = 0; i < gridItemAmount; i++) {
            boxes.push(<TextInput
                onChangeText={handleChange('[' + i + ']')}
                style={{ borderWidth: 1, marginHorizontal: "5%", borderRadius: 5, marginBottom: "2%" }}
                key={i}
            ></TextInput>)
        }
        return boxes
    }

    const handleSubmit = async (values: any) => {
        console.log("VALUES", values)
        var newItems: Item[] = [];
        if (values.length < gridItemAmount) {
            while (values.length < gridItemAmount) {
                values.push("");
            }
        }
        values.map((value) => {
            newItems.push({ text: value, value: false })
        })

        let latestId = 0;
        await getLatestId().then((result) => latestId = result)
        if (!latestId) latestId = 0
        var grid: GridContainer = { id: latestId, name: name, grid: newItems }
        dispatch(add_grid(grid))
        // TODO import these string values from constant object
        props.navigation.navigate("Home");
    }

    return (
        <ScrollView>
            <Text style={styles.text}>Welcome to create form!</Text>
            {/* Grid size container */}
            <View style={{ flexDirection: "row", marginLeft:"2%" }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginLeft: "1%", textAlignVertical: "center" }}>Grid Size:</Text>
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
            </View>
            <View style={{flexDirection:"row", marginLeft:"2%" }}>
                <Text style={{textAlignVertical:"center"}}>Grid name</Text>
                <TextInput style={{ borderWidth: 1, marginHorizontal: "5%", borderRadius: 5, marginBottom: "2%", width:"75%" }} value={name} onChangeText={(value) => setName(value)}></TextInput>
            </View>
            <View style={{marginLeft:"2%"}}>
                <Text>Grid items:</Text>
            </View>

            <Formik
                initialValues={[]}
                onSubmit={(values) => handleSubmit(values)}>

                {({ handleChange, handleSubmit, values }) => {
                    return (
                        <>
                            {renderInputs(handleChange)}
                            <Button title={"Submit"} onPress={() => handleSubmit()}></Button>
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