-- Restore all 103 gym exercises with proper Spanish names and media URLs
-- Exercises table is empty (previously truncated), sequence at 1

INSERT INTO exercises (name, name_en, muscle_group_id, equipment, image_url, gif_url, secondary_muscles, instructions, difficulty, category, exercisedb_id) VALUES
  -- Pecho / Chest (muscle_group_id = 1)
  ('Press de Banca', 'Bench Press', 1, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/MKspzx3H3T.jpg', 'https://cdn.exercisedb.dev/w/videos/N75Uemp/41n2hxnFMotsXTj3__Barbell-Bench-Press_Chest2_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hxnFMotsXTj3'),
  ('Press Inclinado con Mancuernas', 'Incline Dumbbell Press', 1, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/EEeXEu5x2b.jpg', 'https://cdn.exercisedb.dev/w/videos/cCtHUc4/41n2haNJ3NA8yCE2__Dumbbell-Incline-One-Arm-Hammer-Press_Upper-Arms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2haNJ3NA8yCE2'),
  ('Aperturas con Mancuernas', 'Dumbbell Flyes', 1, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Fondos en Paralelas', 'Dips', 1, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/HvLpzpKzge.jpg', 'https://cdn.exercisedb.dev/w/videos/A0jMsUc/41n2hHH9bNfi98YU__Triceps-Dips-Floor_Upper-Arms.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hHH9bNfi98YU'),
  ('Cruces en Polea', 'Cable Crossover', 1, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  -- Espalda / Back (muscle_group_id = 2)
  ('Peso Muerto', 'Deadlift', 2, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/5zfJekr2FH.jpg', 'https://cdn.exercisedb.dev/w/videos/m1Fo8aC/41n2hcw2FN534HcA__Dumbbell-Stiff-Leg-Deadlift_Waist.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hcw2FN534HcA'),
  ('Dominadas', 'Pull-ups', 2, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/dweUR5Xhfh.jpg', 'https://cdn.exercisedb.dev/w/videos/AYBx4nr/41n2hsBtDXapcADg__Pull-up_Back_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hsBtDXapcADg'),
  ('Remo con Barra', 'Barbell Row', 2, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Remo con Mancuerna', 'Dumbbell Row', 2, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Jalón al Pecho', 'Lat Pulldown', 2, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Remo en Polea Baja', 'Seated Cable Row', 2, 'cable', 'https://cdn.exercisedb.dev/media/w/images/IszXyPAAyK.jpg', 'https://cdn.exercisedb.dev/w/videos/RIWAgWd/41n2hcFJpBvAkXCP__Seated-Row-with-Towel_Back.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hcFJpBvAkXCP'),
  -- Hombros / Shoulders (muscle_group_id = 3)
  ('Press Militar', 'Overhead Press', 3, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Elevaciones Laterales', 'Lateral Raises', 3, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/KSfBbHaAyy.jpg', 'https://cdn.exercisedb.dev/w/videos/j3qqj9g/41n2hjuGpcex14w7__Dumbbell-Lateral-Raise_shoulder_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hjuGpcex14w7'),
  ('Face Pull', 'Face Pull', 3, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Press Arnold', 'Arnold Press', 3, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/4FV9Sfw8CY.jpg', 'https://cdn.exercisedb.dev/w/videos/08ys3e3/41n2hMRXm49mM62z__Dumbbell-Arnold-Press-II_Shoulders.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hMRXm49mM62z'),
  -- Biceps (muscle_group_id = 4)
  ('Curl con Barra', 'Barbell Curl', 4, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl con Mancuernas', 'Dumbbell Curl', 4, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl Martillo', 'Hammer Curl', 4, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/2KROa3h5vY.jpg', 'https://cdn.exercisedb.dev/w/videos/nuYT8c2/41n2hGioS8HumEF7__Cable-Hammer-Curl-(with-rope)-(male)_Forearms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hGioS8HumEF7'),
  -- Triceps (muscle_group_id = 5)
  ('Jalón de Tríceps en Polea', 'Tricep Pushdown', 5, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Press Francés', 'Skull Crushers', 5, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Fondos en Banco', 'Bench Dips', 5, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Piernas / Legs (muscle_group_id = 6)
  ('Sentadilla con Barra', 'Barbell Squat', 6, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Prensa de Piernas', 'Leg Press', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Extensión de Piernas', 'Leg Extension', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl de Piernas', 'Leg Curl', 6, 'machine', 'https://cdn.exercisedb.dev/media/w/images/jBEnhOxreg.jpg', 'https://cdn.exercisedb.dev/w/videos/Z80fRjW/41n2hc2VrB8ofxrW__Lying-Double-Legs-Biceps-Curl-with-Towel_Upper-Arms.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hc2VrB8ofxrW'),
  ('Zancadas', 'Lunges', 6, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Sentadilla Búlgara', 'Bulgarian Split Squat', 6, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/8MGbQWUwkt.jpg', 'https://cdn.exercisedb.dev/w/videos/bn2Y6tf/41n2hpLLs1uU5atr__Bulgarian-Split-Squat_Thighs.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hpLLs1uU5atr'),
  -- Gluteos / Glutes (muscle_group_id = 7)
  ('Hip Thrust', 'Hip Thrust', 7, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Peso Muerto Rumano', 'Romanian Deadlift', 7, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/D04e3dSK89.jpg', 'https://cdn.exercisedb.dev/w/videos/sZiAup2/41n2hn8rpbYihzEW__Dumbbell-Romanian-Deadlift_Hips.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hn8rpbYihzEW'),
  -- Core (muscle_group_id = 8)
  ('Plancha', 'Plank', 8, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/KtvnpKaSIO.jpg', 'https://cdn.exercisedb.dev/w/videos/AkFLKka/41n2hKoQnnSRPZrE__Front-Plank-with-Leg-Lift-(male)_Hips_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hKoQnnSRPZrE'),
  ('Crunch en Polea', 'Cable Crunch', 8, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Rueda Abdominal', 'Ab Wheel Rollout', 8, 'other', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Additional exercises (33-103)
  -- Hombros
  ('Remo Erguido en Polea', 'Cable Upright Row', 3, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Pecho
  ('Press de Banca Declinado', 'Decline Bench Press', 1, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/MKspzx3H3T.jpg', 'https://cdn.exercisedb.dev/w/videos/N75Uemp/41n2hxnFMotsXTj3__Barbell-Bench-Press_Chest2_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hxnFMotsXTj3'),
  ('Press de Pecho en Máquina', 'Machine Chest Press', 1, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Flexiones', 'Push-ups', 1, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/ZVZe7lmc7O.jpg', 'https://cdn.exercisedb.dev/w/videos/G8ZH9KB/41n2hNXJadYcfjnd__Push-up-m_Chest.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hNXJadYcfjnd'),
  ('Press Inclinado con Barra', 'Incline Barbell Press', 1, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/EEeXEu5x2b.jpg', 'https://cdn.exercisedb.dev/w/videos/cCtHUc4/41n2haNJ3NA8yCE2__Dumbbell-Incline-One-Arm-Hammer-Press_Upper-Arms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2haNJ3NA8yCE2'),
  ('Pec Deck', 'Pec Deck Fly', 1, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Pullover con Mancuerna', 'Dumbbell Pullover', 2, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Press Plano con Mancuernas', 'Flat Dumbbell Press', 1, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/EEeXEu5x2b.jpg', 'https://cdn.exercisedb.dev/w/videos/cCtHUc4/41n2haNJ3NA8yCE2__Dumbbell-Incline-One-Arm-Hammer-Press_Upper-Arms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2haNJ3NA8yCE2'),
  -- Espalda
  ('Jalón con Agarre Neutro', 'Neutral Grip Pulldown', 2, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Remo en T', 'T-Bar Row', 2, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Remo en Máquina', 'Machine Row', 2, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Peso Muerto Sumo', 'Sumo Deadlift', 7, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Hiperextensión de Espalda', 'Back Hyperextension', 2, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/x6jmdZRn6o.jpg', 'https://cdn.exercisedb.dev/w/videos/2aScjba/41n2hfYD2sH4TRCH__Hyperextension_Waist.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hfYD2sH4TRCH'),
  ('Remo Invertido', 'Inverted Row', 2, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Encogimiento con Barra', 'Barbell Shrug', 3, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Dominadas Supinas', 'Chin-up', 2, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/JEvP8CFEdi.jpg', 'https://cdn.exercisedb.dev/w/videos/PV80ppW/41n2hd6SThQhAdnZ__Chin-ups-(narrow-parallel-grip)_Back.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hd6SThQhAdnZ'),
  ('Peso Muerto con Mancuernas', 'Dumbbell Deadlift', 2, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/5zfJekr2FH.jpg', 'https://cdn.exercisedb.dev/w/videos/m1Fo8aC/41n2hcw2FN534HcA__Dumbbell-Stiff-Leg-Deadlift_Waist.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hcw2FN534HcA'),
  -- Hombros
  ('Press de Hombros con Mancuernas', 'Seated Dumbbell Press', 3, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/EEeXEu5x2b.jpg', 'https://cdn.exercisedb.dev/w/videos/cCtHUc4/41n2haNJ3NA8yCE2__Dumbbell-Incline-One-Arm-Hammer-Press_Upper-Arms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2haNJ3NA8yCE2'),
  ('Elevación Frontal', 'Front Raise', 3, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/QqA1I6609c.jpg', 'https://cdn.exercisedb.dev/w/videos/s0tBYjQ/41n2howQHvcrcrW6__Dumbbell-Front-Raise_Shoulders.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2howQHvcrcrW6'),
  ('Elevación Lateral en Polea', 'Cable Lateral Raise', 3, 'cable', 'https://cdn.exercisedb.dev/media/w/images/KSfBbHaAyy.jpg', 'https://cdn.exercisedb.dev/w/videos/j3qqj9g/41n2hjuGpcex14w7__Dumbbell-Lateral-Raise_shoulder_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hjuGpcex14w7'),
  ('Press de Hombros de Pie', 'Standing Dumbbell Press', 3, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/EEeXEu5x2b.jpg', 'https://cdn.exercisedb.dev/w/videos/cCtHUc4/41n2haNJ3NA8yCE2__Dumbbell-Incline-One-Arm-Hammer-Press_Upper-Arms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2haNJ3NA8yCE2'),
  ('Pájaro con Mancuernas', 'Rear Delt Fly', 3, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/wMOZasduhs.jpg', 'https://cdn.exercisedb.dev/w/videos/FlYe7Y5/41n2hyNf5GebszTf__Dumbbell-Rear-Delt-Fly-(female)_Shoulders.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hyNf5GebszTf'),
  ('Pec Deck Inverso', 'Reverse Pec Deck', 3, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Remo Erguido', 'Upright Row', 3, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Biceps
  ('Curl Inclinado con Mancuernas', 'Incline Dumbbell Curl', 4, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/EEeXEu5x2b.jpg', 'https://cdn.exercisedb.dev/w/videos/cCtHUc4/41n2haNJ3NA8yCE2__Dumbbell-Incline-One-Arm-Hammer-Press_Upper-Arms_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2haNJ3NA8yCE2'),
  ('Curl en Banco Scott', 'Preacher Curl', 4, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl de Concentración', 'Concentration Curl', 4, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/4IzceQy0QK.jpg', 'https://cdn.exercisedb.dev/w/videos/kaolGLQ/41n2hxqpSU5p6DZv__Biceps-Leg-Concentration-Curl_Upper-Arms.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hxqpSU5p6DZv'),
  ('Curl con Barra EZ', 'EZ Bar Curl', 4, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl en Polea', 'Cable Curl', 4, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl Inverso con Barra', 'Reverse Barbell Curl', 4, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/EgzDjmD1Tz.jpg', 'https://cdn.exercisedb.dev/w/videos/UBucvJE/41n2hx6oyEujP1B6__Two-Legs-Reverse-Biceps-Curl-with-Towel-(VERSION-2).mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', 'exr_41n2hx6oyEujP1B6'),
  ('Curl 21s', '21s Curl', 4, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  -- Triceps
  ('Extensión de Tríceps sobre la Cabeza', 'Overhead Tricep Extension', 5, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Jalón de Tríceps Barra Recta', 'Straight Bar Pushdown', 5, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Patada de Tríceps', 'Tricep Kickback', 5, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Press de Banca Cerrado', 'Close Grip Bench Press', 5, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/MKspzx3H3T.jpg', 'https://cdn.exercisedb.dev/w/videos/N75Uemp/41n2hxnFMotsXTj3__Barbell-Bench-Press_Chest2_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hxnFMotsXTj3'),
  ('Extensión de Tríceps un Brazo', 'Single Arm Tricep Extension', 5, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Fondos en Máquina', 'Machine Dips', 5, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Flexiones Diamante', 'Diamond Push-up', 5, 'bodyweight', 'https://cdn.exercisedb.dev/media/w/images/1TQ8mvQq8X.jpg', 'https://cdn.exercisedb.dev/w/videos/OltRdJo/41n2hRZ6fgsLyd77__Diamond-Push-up_Upper-Arms.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hRZ6fgsLyd77'),
  -- Piernas / Legs
  ('Sentadilla Goblet', 'Goblet Squat', 6, 'dumbbell', 'https://cdn.exercisedb.dev/media/w/images/8IkHBRnk4P.jpg', 'https://cdn.exercisedb.dev/w/videos/nFmXQAf/41n2hQDiSwTZXM4F__Dumbbell-Goblet-Squat_Thighs.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hQDiSwTZXM4F'),
  ('Sentadilla Frontal', 'Front Squat', 6, 'barbell', 'https://cdn.exercisedb.dev/media/w/images/qYjXvLknoh.jpg', 'https://cdn.exercisedb.dev/w/videos/OCSQUGO/41n2hmGR8WuVfe1U__Bodyweight-Squat-(male)_Thighs-SIDE-POV_.mp4', '[]'::jsonb, '[]'::jsonb, NULL, 'compound', 'exr_41n2hmGR8WuVfe1U'),
  ('Sentadilla con Peso Corporal', 'Bodyweight Squat', 6, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Prensa a 45 Grados', '45 Degree Leg Press', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Hack Squat', 'Hack Squat', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Zancadas Caminando', 'Walking Lunges', 6, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Gluteos
  ('Peso Muerto Piernas Rígidas', 'Stiff Leg Deadlift', 7, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Subida al Banco', 'Step-up', 6, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Extensión de Cadera en Polea', 'Cable Hip Extension', 7, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  -- Piernas (calves)
  ('Elevación de Talones de Pie', 'Standing Calf Raise', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Elevación de Talones Sentado', 'Seated Calf Raise', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Curl de Piernas de Pie', 'Standing Leg Curl', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  -- Gluteos
  ('Patada hacia Atrás en Polea', 'Cable Kickback', 7, 'cable', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Abducción de Cadera en Máquina', 'Hip Abduction Machine', 6, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Puente de Glúteos', 'Glute Bridge', 7, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Caminata con Banda', 'Band Monster Walk', 6, 'band', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Sentadilla con Banda', 'Band Squat', 6, 'band', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Core (muscle_group_id = 8)
  ('Abdominales', 'Crunches', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Elevación de Piernas Colgado', 'Hanging Leg Raise', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Rueda Abdominal de Rodillas', 'Kneeling Ab Wheel', 8, 'other', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Plancha Lateral', 'Side Plank', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Escaladores', 'Mountain Climbers', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Giro Ruso', 'Russian Twist', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Bicho Muerto', 'Dead Bug', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('L-Sit', 'L-Sit', 8, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Antebrazos / Forearms (muscle_group_id = 9)
  ('Curl de Muñeca', 'Wrist Curl', 9, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Extensión de Muñeca', 'Wrist Extension', 9, 'barbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'isolation', NULL),
  ('Paseo del Granjero', 'Farmer Walk', 9, 'dumbbell', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  ('Colgado Estático', 'Dead Hang', 9, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'compound', NULL),
  -- Cardio (muscle_group_id = 10)
  ('Caminadora', 'Treadmill', 10, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'cardio', NULL),
  ('Saltar la Cuerda', 'Jump Rope', 10, 'other', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'cardio', NULL),
  ('Burpees', 'Burpees', 10, 'bodyweight', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'cardio', NULL),
  ('Máquina de Remo', 'Rowing Machine', 10, 'machine', NULL, NULL, '[]'::jsonb, '[]'::jsonb, NULL, 'cardio', NULL);

-- Reset sequence to next available ID
SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises));
