import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const data = [
  {value: 2022, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Jan'},
  {value: 2023, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 2024, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Feb'},
  {value: 2025, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Mar'},
  {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Apr'},
  {value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

  {value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'May'},
  {value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
];

const RepaymentChart = () => {
  const totalAmount = 61500;
  const monthlyPayment = 5000;
 

  return (
    <View style={styles.container}>
      <ThemedText type='titleCard'>Repayment Card</ThemedText>
      <View style={{flexDirection: 'row' , justifyContent: "space-between"}}>

        <ThemedText style={{paddingVertical: 10}} type='amountText'>${totalAmount}</ThemedText>
        <ThemedText type='subtitle3' style={{fontWeight: 'bold'}}>${monthlyPayment}/mes</ThemedText>
      </View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <BarChart
          data={data}
          barWidth={16}
          initialSpacing={10}
          spacing={14}
          barBorderRadius={4}
          scrollAnimation
          
          showGradient
          yAxisThickness={0}
          xAxisType={'dashed'}
          xAxisColor={'lightgray'}
          yAxisTextStyle={{color: 'lightgray'}}
          stepValue={1000}
          maxValue={6000}
          noOfSections={6}
          yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
          labelWidth={40}
          xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
          showLine
          lineConfig={{
            color: '#F29C6E',
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 20,
            initialSpacing: -30,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    padding: 24,
    elevation: 5,
    borderRadius: 15,
    marginVertical: 10,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
  },
  monthlyPayment: {
    fontSize: 16,
  },
  yearLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  yearLabel: {
    textAlign: 'center',
  },
});

export default RepaymentChart;