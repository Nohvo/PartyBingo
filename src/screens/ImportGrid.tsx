import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { add_grid } from '../features/grid';
import { getLatestId } from '../store/store';
import base64 from 'react-native-base64'
import { Colors } from '../style/Colors';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomButton } from '../components/CustomButton';

const ImportGrid = (props: StackScreenProps<any>) => {
    const [importString, setImportString] = useState<string>()
    const verySecretKey = "Party On"
    var CryptoJS = require("crypto-js");
    var dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            headerStyle: { backgroundColor: Colors.BACKGROUND },
            title: "Import a grid"
        })
    })

    const handleImport = async () => {
        try {

            var newGrid = JSON.parse(decryptString(importString))
            let latestId = 0;
            await getLatestId().then((result) => latestId = result)
            if (!latestId) latestId = 0
            newGrid.id = latestId;
            dispatch(add_grid(newGrid))
        }
        catch (error) {

        }
    }
    const decryptString = (text: string) => {
        return base64.decode(text)
    }
    return (
        <View style={{ paddingHorizontal: "2%", width:"100%", height:"100%", backgroundColor:Colors.BACKGROUND }}>
            <Text>Paste an export string here:</Text>
            <TextInput style={{ borderWidth: 1, marginBottom: "1%" }} onChangeText={(text) => setImportString(text)} value={importString}></TextInput>
            <CustomButton title={"Submit"} onPress={() => handleImport()}></CustomButton>
        </View>
    )
}

export default ImportGrid;