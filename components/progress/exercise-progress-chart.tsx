import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const screenWidth = Dimensions.get('window').width - 48;

interface DataPoint {
  weight_kg: number;
  reps: number;
  completed_at: string;
}

function epley1RM(weight: number, reps: number) {
  return weight * (1 + reps / 30);
}

interface ExerciseProgressChartProps {
  data: DataPoint[];
}

export function ExerciseProgressChart({ data }: ExerciseProgressChartProps) {
  if (!data.length) {
    return (
      <View style={styles.empty}>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
          Sin datos para graficar
        </Text>
      </View>
    );
  }

  const orm = data.map((d) => epley1RM(d.weight_kg, d.reps));
  const labels = data.map((d) => {
    const date = new Date(d.completed_at);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const chartData = {
    labels: labels.slice(-8),
    datasets: [{ data: orm.slice(-8), color: () => colors.secondary, strokeWidth: 2 }],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={180}
        chartConfig={{
          backgroundGradientFrom: colors.surfaceHighest,
          backgroundGradientTo: colors.surfaceHighest,
          color: (opacity = 1) => `rgba(0, 227, 253, ${opacity})`,
          labelColor: () => colors.onSurfaceVariant,
          propsForBackgroundLines: { stroke: colors.outlineVariant, strokeWidth: 0.5 },
          decimalPlaces: 1,
          propsForDots: { r: '4', strokeWidth: '2', stroke: colors.secondary },
        }}
        bezier
        style={styles.chart}
        withInnerLines
        withOuterLines={false}
        withShadow={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 20, overflow: 'hidden' },
  chart: { borderRadius: 20 },
  empty: { padding: 32, alignItems: 'center', backgroundColor: colors.surfaceHighest, borderRadius: 20 },
});
