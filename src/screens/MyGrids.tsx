import React, { useEffect, useState } from 'react'
import { Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native'
import { GridContainer, setReduxGrid } from '../features/grid'
import { StackScreenProps } from '@react-navigation/stack'
import { DataTable } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import base64 from 'react-native-base64'
import Clipboard from '@react-native-community/clipboard'
import { Colors } from '../style/Colors'

const MyGrids = (props: StackScreenProps<any>) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [grids, setGrids] = useState<GridContainer[]>(props.route.params.grids)
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            headerStyle: {backgroundColor:Colors.BACKGROUND},
            title: "My grids"
        })
    })

    const handleRemove = (id:number) => {
        var temp = [...grids]
        temp = temp.filter((item) => {
            return item.id !== id
        })
        setGrids(temp);
        dispatch(setReduxGrid(temp))
    }

    const encryptString = (text:string) => {
        return base64.encode(text)
    }


    const encryptToClipboard = (text:string) => {
        Clipboard.setString(encryptString(text))
        setCopied(true)
    }

    return (
        <View style={styles.container}>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>
                    Name
                </DataTable.Title>
                <DataTable.Title>
                    Actions
                </DataTable.Title>
            </DataTable.Header>
            
            {grids.map((grid, index) => (
                //@ts-ignore
                <DataTable.Row key={index}>
                    <DataTable.Cell style={{flex:2}}>
                        <Text>{grid.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity style={styles.actionButton} onPress={() => { console.log(handleRemove(grid.id))}}><Text style={styles.text}>Remove</Text></TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity style={styles.actionButton} onPress={() => { encryptToClipboard(JSON.stringify(grid)) } }><Text style={styles.text}>Export</Text></TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
        {copied ? <Text style={{textAlign:"center"}}>Copied to clipboard! Paste it to your friends in chat!</Text> : <></>}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BACKGROUND,
        height:"100%"
    },
    actionButton: {
        borderWidth:1,
        padding:10,
        borderRadius:10,
        backgroundColor: Colors.BUTTON
    },
    text: {
        color:"#000"
    }
})

export default MyGrids