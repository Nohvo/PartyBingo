import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GridContainer} from '../features/grid';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';
import {Colors} from '../style/Colors';
import {CustomButton} from '../components/CustomButton';
import {ContainerView} from '../components/ContainerView';

type Props = {
  grids: GridContainer[];
};

const BingoGrid = (props: Props & StackScreenProps<any>) => {
  const [items, setItems] = useState(
    props.route.params ? props.route.params.grids : [],
  );
  const [selectedGrid, setSelectedGrid] = React.useState<GridContainer>(
    props.route.params ? props.route.params.grids[0] : null,
  );
  let deleteGrid = _.cloneDeep(selectedGrid.grid);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const rowSize = Math.floor(Math.sqrt(selectedGrid.grid.length));

  useEffect(() => {
    props.navigation.setOptions({
      header: () => <></>,
    });
  });

  const shuffleGrid = () => {
    let newGrid = _.cloneDeep(selectedGrid);
    const shuffled = newGrid.grid.sort(() => Math.random() - 0.5);
    newGrid.grid = shuffled;
    setSelectedGrid(newGrid);
  };

  const renderGrid = () => {
    var boxes: any = [];
    let key = 0;
    while (deleteGrid.length > 0) {
      boxes.push(
        <View
          style={{flexDirection: 'column', flex: 1, height: '100%'}}
          key={key}>
          <View
            style={{flexDirection: 'row', height: '100%'}}
            key={selectedGrid.toString()}>
            {renderRow(key, boxes.length * rowSize)}
          </View>
        </View>,
      );
      key++;
    }

    return boxes;
  };
  const renderRow = (index, numOfItems) => {
    var boxes: any = [];
    for (let i = 0; i < rowSize; i++) {
      deleteGrid.pop();
      boxes.push(
        <View
          key={i}
          style={[
            styles.box,
            {
              backgroundColor: selectedGrid.grid[i + rowSize * index].value
                ? Colors.OPENED
                : Colors.UNOPENED,
            },
          ]}
          onTouchEnd={() => {
            var temp = _.cloneDeep(selectedGrid);
            temp.grid[i + rowSize * index].value = true;
            var tempItems = _.cloneDeep(items);
            tempItems.find(grid => grid.id === temp.id).grid = temp.grid;
            setItems(tempItems);
            setSelectedGrid(temp);
          }}>
          <Text style={styles.boxText}>
            {showText || selectedGrid.grid[i + rowSize * index].value
              ? selectedGrid.grid[i + rowSize * index].text
              : ''}
          </Text>
        </View>,
      );
      if (deleteGrid.length <= 0) break;
    }
    return boxes;
  };

  return (
    <ContainerView style={styles.container}>
      <Picker
        style={{
          backgroundColor: Colors.BACKGROUND,
          opacity: 0.7,
        }}
        selectedValue={currentIndex}
        mode={'dropdown'}
        onValueChange={(value: number) => {
          setSelectedGrid(
            items.find(item => {
              return item.id === value;
            }),
          );
          setCurrentIndex(value);
        }}>
        {items?.map(grid => {
          return (
            <Picker.Item
              style={{fontSize: 20}}
              label={grid.name}
              value={grid.id}
              key={grid.toString()}
            />
          );
        })}
      </Picker>
      {renderGrid()}
      <View style={{flexDirection: 'row', backgroundColor: '#FFF'}}>
        <View style={{flex: 1}}>
          <CustomButton
            style={[styles.button, {borderRightWidth: 1, borderColor: '#000'}]}
            title="Shuffle grid"
            onPress={() => shuffleGrid()}></CustomButton>
        </View>
        <View style={{flex: 1}}>
          <CustomButton
            style={styles.button}
            title={showText ? 'Hide text' : 'Reveal text'}
            onPress={() => setShowText(!showText)}></CustomButton>
        </View>
      </View>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  square: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    height: 'auto',
    width: 'auto',
  },
  button: {
    borderRadius: 0,
    borderWidth: 0,
  },
  boxText: {
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    fontFamily: 'Cairo-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  box: {
    flex: 1,
    height: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default BingoGrid;
