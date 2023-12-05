import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {add_grid, GridContainer, Item} from '../features/grid';
import {useDispatch} from 'react-redux';
import {getLatestId} from '../store/store';
import {Colors} from '../style/Colors';
import {CustomButton} from '../components/CustomButton';
import {ContainerView} from '../components/ContainerView';

type Props = {
  screen: string;
  setScreen(name: string): any;
};
const CreateForm = (props: Props & StackScreenProps<any>) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState('3x3');
  const [name, setName] = React.useState<string>('');
  const [gridItemAmount, setGridItemAmount] = React.useState<number>(0);

  useEffect(() => {
    props.navigation.setOptions({
      header: () => {
        return <></>;
      },
      headerStyle: {backgroundColor: Colors.BACKGROUND},
      title: 'Create new',
    });
  });

  const renderInputs = (handleChange: any) => {
    var boxes: any = [];

    for (let i = 0; i < gridItemAmount; i++) {
      boxes.push(
        <TextInput
          onChangeText={handleChange('[' + i + ']')}
          style={{
            borderWidth: 1,
            marginHorizontal: '5%',
            borderRadius: 5,
            marginBottom: '2%',
          }}
          key={i}></TextInput>,
      );
    }
    return boxes;
  };

  const handleSubmit = async (values: any) => {
    var newItems: Item[] = [];
    if (values.length < gridItemAmount) {
      while (values.length < gridItemAmount) {
        values.push('');
      }
    }
    values.map(value => {
      newItems.push({text: value, value: false});
    });

    let latestId = 0;
    await getLatestId().then(result => (latestId = result));
    if (!latestId) latestId = 0;
    var grid: GridContainer = {id: latestId, name: name, grid: newItems};
    dispatch(add_grid(grid));
    // TODO import these string values from constant object
    props.navigation.navigate('Home');
  };

  return (
    <ContainerView style={{height: '100%', width: '100%'}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Grid size container */}
        <Text
          style={{
            marginLeft: '1%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 30,
            color: '#000',
          }}>
          Create new grid
        </Text>
        <View style={{flexDirection: 'row', marginLeft: '2%'}}>
          <Text style={{textAlignVertical: 'center'}}>Grid name</Text>
          <TextInput
            style={{
              borderWidth: 1,
              marginHorizontal: '5%',
              borderRadius: 5,
              marginBottom: '2%',
              width: '75%',
            }}
            value={name}
            onChangeText={value => setName(value)}></TextInput>
        </View>
        <View style={{marginLeft: '2%'}}>
          <Text>Grid items:</Text>
        </View>

        <Formik initialValues={[]} onSubmit={values => handleSubmit(values)}>
          {({handleChange, handleSubmit, values}) => {
            return (
              <>
                {renderInputs(handleChange)}
                <View
                  style={{
                    marginBottom: '5%',
                  }}></View>
                <CustomButton
                  title={'+'}
                  onPress={() =>
                    setGridItemAmount(gridItemAmount + 1)
                  }></CustomButton>
                <View
                  style={{
                    marginBottom: '5%',
                  }}></View>
                <CustomButton
                  title={'Submit'}
                  onPress={() => handleSubmit()}></CustomButton>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </ContainerView>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 32,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    backgroundColor: Colors.BACKGROUND,
    paddingBottom: '5%',
  },
});
export default CreateForm;
