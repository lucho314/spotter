import { writeFileSync, mkdirSync } from 'fs';

const sampleRate = 44100;
const duration = 0.25;
const numSamples = Math.floor(sampleRate * duration);
const buffer = Buffer.alloc(44 + numSamples * 2);

// WAV header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);  // PCM
buffer.writeUInt16LE(1, 22);  // mono
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28);
buffer.writeUInt16LE(2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

// Two-tone beep: 880Hz then 1100Hz
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const freq = t < duration / 2 ? 880 : 1100;
  const fadeIn = Math.min(1, t / 0.005);
  const fadeOut = Math.min(1, (duration - t) / 0.02);
  const sample = Math.sin(2 * Math.PI * freq * t) * 0.6 * fadeIn * fadeOut;
  buffer.writeInt16LE(Math.round(sample * 32767), 44 + i * 2);
}

mkdirSync('assets/sounds', { recursive: true });
writeFileSync('assets/sounds/beep.wav', buffer);
console.log('Generated assets/sounds/beep.wav');
