import React, { useEffect, useState } from 'react';
import { AppState, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface SessionTimerProps {
  startedAt: number;
}

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function SessionTimer({ startedAt }: SessionTimerProps) {
  const [elapsed, setElapsed] = useState(Date.now() - startedAt);

  useEffect(() => {
    const update = () => setElapsed(Date.now() - startedAt);
    const interval = setInterval(update, 1000);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') update();
    });
    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [startedAt]);

  return (
    <Text style={[typography.headlineSm, { color: colors.onSurfaceVariant }]}>
      {formatDuration(elapsed)}
    </Text>
  );
}
