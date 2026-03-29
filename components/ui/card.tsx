import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  level?: 'low' | 'default' | 'high';
}

export function Card({ children, style, level = 'default' }: CardProps) {
  const bg =
    level === 'low'
      ? colors.surfaceContainer
      : level === 'high'
      ? colors.surfaceBright
      : colors.surfaceHighest;

  return (
    <View style={[styles.card, { backgroundColor: bg }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 16,
  },
});
