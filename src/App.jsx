import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import {
  Play, Pause, SkipForward, Flame, HeartPulse, Trophy, ChevronRight,
  ChevronLeft, RotateCcw, Settings, X, Check, Volume2, VolumeX, Vibrate, History as HistoryIcon, Info, Dog, Plus, Trash2,
  Home as HomeIcon, BookOpen, Zap, RefreshCw, TrendingUp, TrendingDown, Ruler, Target, Medal, Crown,
  Music, Music2, HeadphoneOff, Lightbulb, Scale, Wind, Globe
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TRACKS, DEFAULT_TRACK, musicPlay, musicPause, musicLoad, musicSetVolume, musicSetShouldPlay } from './music';
import { LANGS, LOCALES, detectLang, tr, translate } from './i18n';

/* ================= DESIGN TOKENS ================= */
const INK = '#1B1D16';
const INK_2 = '#242820';
const PAPER = '#EDE8D8';
const OLIVE = '#4A5233';
const OLIVE_DARK = '#333823';
const KHAKI = '#B8AE8C';
const BLAZE = '#C1440E';
const BLAZE_DEEP = '#8F2A0A';
const STEEL = '#8A9078';

/* ================= EXERCISE DATA ================= */
const EXERCISES = {
  squat: { name: { it: 'Squat', en: 'Squat', de: 'Kniebeuge' }, pose: 'squat', met: 5.5, repGuide: { it: '12–15 ripetizioni', en: '12–15 reps', de: '12–15 Wiederholungen' },
    cue: { it: 'Schiena dritta, ginocchia in linea con le punte dei piedi.', en: 'Straight back, knees in line with your toes.', de: 'Gerader Rücken, Knie über den Fußspitzen.' },
    tip40: { it: 'Scendi solo fin dove senti il controllo: meglio un range parziale pulito che uno ampio scomposto.', en: 'Lower only as far as you feel in control: a clean partial range beats a sloppy deep one.', de: 'Geh nur so tief, wie du die Kontrolle behältst: Eine saubere Teilbewegung ist besser als eine wacklige tiefe.' },
    steps: [{ it: 'Piedi larghi quanto le spalle, punte leggermente fuori', en: 'Feet shoulder-width, toes slightly turned out', de: 'Füße schulterbreit, Zehen leicht nach außen' }, { it: 'Scendi come per sederti, peso sui talloni', en: 'Sit back as if into a chair, weight on your heels', de: 'Setz dich ab, Gewicht auf den Fersen' }, { it: 'Sali spingendo sui talloni, bacino in avanti', en: 'Drive up through your heels, hips forward', de: 'Drück dich über die Fersen hoch, Becken nach vorn' }],
    breath: { it: 'Inspira scendendo, espira risalendo.', en: 'Breathe in lowering, out rising.', de: 'Einatmen beim Runtergehen, ausatmen beim Hochkommen.' } },
  affondo: { name: { it: 'Affondo alternato', en: 'Alternating lunge', de: 'Ausfallschritt (abwechselnd)' }, pose: 'lunge', met: 5.5, repGuide: { it: '10–12 per gamba', en: '10–12 per leg', de: '10–12 pro Bein' },
    cue: { it: 'Passo lungo, busto verticale, il ginocchio dietro sfiora il pavimento.', en: 'Long step, upright torso, rear knee grazes the floor.', de: 'Langer Schritt, aufrechter Oberkörper, hinteres Knie berührt fast den Boden.' },
    tip40: { it: 'Evita il rimbalzo sul ginocchio a terra: controlla la discesa, niente scatti.', en: 'No bouncing on the grounded knee: control the descent, no jerking.', de: 'Nicht auf dem Knie abfedern: Die Abwärtsbewegung kontrollieren, keine ruckartigen Bewegungen.' },
    steps: [{ it: 'Passo lungo in avanti, busto verticale', en: 'Step far forward, torso upright', de: 'Großer Schritt nach vorn, Oberkörper aufrecht' }, { it: 'Scendi finché il ginocchio dietro sfiora il suolo', en: 'Lower until the rear knee grazes the floor', de: 'Absenken, bis das hintere Knie den Boden fast berührt' }, { it: 'Spingi col piede davanti per risalire', en: 'Push off with the front foot to stand back up', de: 'Mit dem vorderen Fuß abdrücken und hochkommen' }],
    breath: { it: 'Inspira scendendo, espira spingendo su.', en: 'Inhale lowering, exhale pushing up.', de: 'Einatmen beim Absenken, ausatmen beim Hochdrücken.' } },
  flessioni: { name: { it: 'Piegamenti (push-up)', en: 'Push-ups', de: 'Liegestütze' }, pose: 'pushup', met: 8, repGuide: { it: '8–12 ripetizioni', en: '8–12 reps', de: '8–12 Wiederholungen' },
    cue: { it: 'Corpo in linea retta, gomiti a circa 45° dal busto.', en: 'Body in a straight line, elbows at about 45° from your torso.', de: 'Körper in einer Linie, Ellbogen etwa 45° vom Oberkörper.' },
    tip40: { it: 'Spalle che protestano? Ginocchia a terra: la tecnica conta più della versione "hardcore".', en: 'Shoulders complaining? Drop to your knees: technique beats the "hardcore" version.', de: 'Protestieren die Schultern? Auf die Knie gehen: Technik ist wichtiger als die „hardcore“-Variante.' },
    steps: [{ it: 'Mani sotto le spalle, corpo in linea retta', en: 'Hands under shoulders, body in a straight line', de: 'Hände unter den Schultern, Körper in einer Linie' }, { it: 'Piega i gomiti a 45° finché il petto sfiora terra', en: 'Bend elbows to 45° until your chest grazes the floor', de: 'Ellbogen auf 45° beugen, bis die Brust fast den Boden berührt' }, { it: 'Spingi via il pavimento, testa neutra', en: 'Push the floor away, neutral head', de: 'Drück den Boden weg, Kopf neutral' }],
    breath: { it: 'Inspira scendendo, espira spingendo su.', en: 'Inhale lowering, exhale pushing up.', de: 'Einatmen beim Absenken, ausatmen beim Hochdrücken.' } },
  plank: { name: { it: 'Plank', en: 'Plank', de: 'Unterarmstütz' }, pose: 'plank', met: 3.5, repGuide: { it: 'Tieni la posizione', en: 'Hold the position', de: 'Position halten' },
    cue: { it: 'Addome contratto, bacino né troppo alto né troppo basso, respira.', en: 'Core engaged, hips neither too high nor too low, breathe.', de: 'Bauch anspannen, Becken weder zu hoch noch zu tief, atmen.' },
    tip40: { it: 'Se senti la zona lombare, alza leggermente il bacino: meno estetico, molto più sicuro.', en: 'If you feel it in your lower back, lift your hips slightly: less pretty, much safer.', de: 'Wenn der untere Rücken zieht, Becken leicht anheben: weniger hübsch, dafür sicherer.' },
    steps: [{ it: 'Avambracci a terra, gomiti sotto le spalle', en: 'Forearms on the floor, elbows under shoulders', de: 'Unterarme auf dem Boden, Ellbogen unter den Schultern' }, { it: 'Piedi aperti, corpo in linea retta', en: 'Feet apart, body in a straight line', de: 'Füße geöffnet, Körper in einer Linie' }, { it: 'Contrai glutei e addome, bacino fermo', en: 'Squeeze glutes and abs, keep hips still', de: 'Gesäß und Bauch anspannen, Becken still' }],
    breath: { it: 'Respiro lento e costante, mai trattenuto.', en: 'Slow, steady breathing, never held.', de: 'Langsam und gleichmäßig atmen, nie anhalten.' } },
  jumpingjack: { name: { it: 'Jumping jack', en: 'Jumping jack', de: 'Jumping Jack' }, pose: 'jack', met: 8, repGuide: { it: 'Ritmo costante', en: 'Steady rhythm', de: 'Gleichmäßiger Rhythmus' },
    cue: { it: 'Atterra morbido sulle punte, braccia sopra la testa.', en: 'Land softly on the balls of your feet, arms overhead.', de: 'Weich auf den Fußballen landen, Arme über den Kopf.' },
    tip40: { it: 'Ginocchia sensibili? Passa allo step jack laterale: stesso battito, meno impatto.', en: 'Sensitive knees? Switch to a lateral step jack: same rhythm, less impact.', de: 'Empfindliche Knie? Wechsle zum seitlichen Step Jack: gleicher Takt, weniger Belastung.' },
    steps: [{ it: 'Piedi uniti, braccia lungo i fianchi', en: 'Feet together, arms at your sides', de: 'Füße zusammen, Arme seitlich' }, { it: 'Salta aprendo gambe e braccia sopra la testa', en: 'Jump, opening legs and arms overhead', de: 'Springen, Beine öffnen und Arme über den Kopf' }, { it: 'Atterra morbido sulle punte e ripeti', en: 'Land softly on the balls of your feet and repeat', de: 'Weich auf den Fußballen landen und wiederholen' }],
    breath: { it: 'Un ciclo di respiro ogni 2 salti.', en: 'One breath cycle every 2 jumps.', de: 'Ein Atemzyklus alle 2 Sprünge.' } },
  mountainclimber: { name: { it: 'Mountain climber', en: 'Mountain climber', de: 'Mountain Climber' }, pose: 'mountainclimber', met: 8, repGuide: { it: 'Ritmo sostenuto', en: 'Brisk pace', de: 'Zügiges Tempo' },
    cue: { it: 'Bacino basso e stabile, ginocchia verso il petto.', en: 'Hips low and stable, knees driving toward your chest.', de: 'Becken tief und stabil, Knie zur Brust.' },
    tip40: { it: 'Se il polso protesta, rallenta il ritmo: la qualità del gesto viene prima della velocità.', en: 'If your wrists complain, slow the pace: quality of movement comes before speed.', de: 'Wenn die Handgelenke protestieren, Tempo drosseln: Die Qualität der Bewegung zählt mehr als Tempo.' },
    steps: [{ it: 'Plank alto, mani sotto le spalle', en: 'High plank, hands under shoulders', de: 'Hoher Stütz, Hände unter den Schultern' }, { it: 'Porta un ginocchio al petto, poi l\u2019altro in corsa', en: 'Drive one knee to your chest, then the other in a running motion', de: 'Ein Knie zur Brust, dann das andere im Lauftakt' }, { it: 'Bacino basso, core contratto', en: 'Hips low, core engaged', de: 'Becken tief, Bauch angespannt' }],
    breath: { it: 'Espirazioni brevi e ritmiche, non trattenere.', en: 'Short, rhythmic exhales, don\u2019t hold your breath.', de: 'Kurze, rhythmische Ausatmungen, nicht anhalten.' } },
  wallsit: { name: { it: 'Wall sit', en: 'Wall sit', de: 'Wandsitz' }, pose: 'wallsit', met: 3.5, repGuide: { it: 'Tieni la posizione', en: 'Hold the position', de: 'Position halten' },
    cue: { it: 'Ginocchia a 90°, schiena piatta contro il muro.', en: 'Knees at 90°, back flat against the wall.', de: 'Knie 90°, Rücken flach an der Wand.' },
    tip40: { it: 'Ottimo per il ginocchio: carico isometrico, zero impatto.', en: 'Great for the knees: isometric load, zero impact.', de: 'Schonend für die Knie: isometrische Belastung, null Impact.' },
    steps: [{ it: 'Schiena appoggiata al muro, piedi un passo avanti', en: 'Back against the wall, feet one step forward', de: 'Rücken an der Wand, Füße einen Schritt davor' }, { it: 'Scendi fino a ginocchia a 90°', en: 'Slide down until knees are at 90°', de: 'Absenken bis die Knie 90° ergeben' }, { it: 'Resta fermo, cosce parallele al suolo', en: 'Hold still, thighs parallel to the floor', de: 'Still halten, Oberschenkel parallel zum Boden' }],
    breath: { it: 'Respiro calmo e continuo durante la tenuta.', en: 'Calm, continuous breathing during the hold.', de: 'Ruhig und durchgehend atmen während der Haltezeit.' } },
  superman: { name: { it: 'Superman', en: 'Superman', de: 'Superman' }, pose: 'superman', met: 3.5, repGuide: { it: 'Contrazioni lente', en: 'Slow contractions', de: 'Langsame Kontraktionen' },
    cue: { it: 'Solleva braccia e gambe insieme, sguardo verso il basso.', en: 'Lift arms and legs together, gaze down.', de: 'Arme und Beine gemeinsam anheben, Blick nach unten.' },
    tip40: { it: 'Rinforza la zona lombare: un investimento diretto contro il mal di schiena da scrivania.', en: 'Strengthens the lower back: a direct investment against desk-back pain.', de: 'Stärkt den unteren Rücken: eine direkte Investition gegen Büro-Rückenschmerzen.' },
    steps: [{ it: 'A pancia in giù, braccia tese in avanti', en: 'Lying face down, arms extended forward', de: 'Auf dem Bauch, Arme nach vorn gestreckt' }, { it: 'Solleva braccia e gambe insieme', en: 'Lift arms and legs together', de: 'Arme und Beine gemeinsam anheben' }, { it: 'Stringi i glutei, sguardo a terra', en: 'Squeeze glutes, eyes to the floor', de: 'Gesäß anspannen, Blick zum Boden' }],
    breath: { it: 'Inspira per preparare, espira sollevando.', en: 'Inhale to prepare, exhale as you lift.', de: 'Einatmen zur Vorbereitung, ausatmen beim Anheben.' } },
  ponte: { name: { it: 'Ponte glutei', en: 'Glute bridge', de: 'Glute Bridge' }, pose: 'bridge', met: 3.5, repGuide: { it: '12–15 ripetizioni', en: '12–15 reps', de: '12–15 Wiederholungen' },
    cue: { it: 'Spingi sui talloni, contrai i glutei in alto.', en: 'Push through your heels, squeeze your glutes at the top.', de: 'Durch die Fersen drücken, Gesäß oben anspannen.' },
    tip40: { it: 'Contrasta le ore da seduto: riattiva glutei spesso "addormentati".', en: 'Counteracts hours of sitting: reawakens often "sleepy" glutes.', de: 'Wirkt dem vielen Sitzen entgegen: aktiviert oft „eingeschlafene“ Gesäßmuskeln.' },
    steps: [{ it: 'Sdraiato, ginocchia piegate, piedi vicini al bacino', en: 'Lying down, knees bent, feet close to your hips', de: 'Auf dem Rücken, Knie gebeugt, Füße nahe am Becken' }, { it: 'Spingi sui talloni e alza il bacino', en: 'Push through your heels and lift your hips', de: 'Durch die Fersen drücken und Becken anheben' }, { it: 'Contrai i glutei in alto, scendi lento', en: 'Squeeze glutes at the top, lower slowly', de: 'Gesäß oben anspannen, langsam absenken' }],
    breath: { it: 'Espira salendo, inspira scendendo.', en: 'Exhale rising, inhale lowering.', de: 'Ausatmen beim Hochgehen, einatmen beim Absenken.' } },
  crunchbici: { name: { it: 'Bicycle crunch', en: 'Bicycle crunch', de: 'Bicycle Crunch' }, pose: 'bicyclecrunch', met: 4.5, repGuide: { it: '10–12 per lato', en: '10–12 per side', de: '10–12 pro Seite' },
    cue: { it: 'Gomito verso il ginocchio opposto, movimento lento e controllato.', en: 'Elbow toward the opposite knee, slow and controlled movement.', de: 'Ellbogen zum gegenüberliegenden Knie, langsam und kontrolliert.' },
    tip40: { it: 'Niente strappi sul collo: la mano è un appoggio leggero, non una leva.', en: 'No yanking on your neck: the hand is a light support, not a lever.', de: 'Nicht am Nacken ziehen: Die Hand ist eine leichte Stütze, kein Hebel.' },
    steps: [{ it: 'Sdraiato, mani dietro la testa, gambe sollevate', en: 'Lying down, hands behind your head, legs lifted', de: 'Auf dem Rücken, Hände hinter dem Kopf, Beine angehoben' }, { it: 'Gomito destro verso ginocchio sinistro, gambe alternate', en: 'Right elbow toward left knee, legs alternating', de: 'Rechter Ellbogen zum linken Knie, Beine abwechselnd' }, { it: 'Movimento lento, scapole sollevate', en: 'Slow movement, shoulder blades lifted', de: 'Langsame Bewegung, Schulterblätter angehoben' }],
    breath: { it: 'Espira ruotando, inspira al centro.', en: 'Exhale rotating, inhale in the middle.', de: 'Ausatmen beim Drehen, einatmen in der Mitte.' } },
  russiantwist: { name: { it: 'Russian twist', en: 'Russian twist', de: 'Russian Twist' }, pose: 'russiantwist', met: 4.5, repGuide: { it: '10–12 per lato', en: '10–12 per side', de: '10–12 pro Seite' },
    cue: { it: 'Busto inclinato, piedi a terra o sollevati, ruota dal core.', en: 'Torso leaned back, feet on the floor or lifted, rotate from the core.', de: 'Oberkörper nach hinten geneigt, Füße auf dem Boden oder angehoben, aus dem Core drehen.' },
    tip40: { it: 'Piedi a terra è già efficace: non serve la versione acrobatica per lavorare bene.', en: 'Feet on the floor is already effective: no need for the acrobatic version to work well.', de: 'Füße auf dem Boden sind bereits effektiv: Für gutes Training braucht es keine akrobatische Variante.' },
    steps: [{ it: 'Seduto, busto inclinato all\u2019indietro', en: 'Seated, torso leaned back', de: 'Sitzend, Oberkörper nach hinten geneigt' }, { it: 'Piedi a terra (o sollevati) e braccia davanti', en: 'Feet on the floor (or lifted) and arms out front', de: 'Füße auf dem Boden (oder angehoben), Arme nach vorn' }, { it: 'Ruota il busto a destra e sinistra dal core', en: 'Rotate your torso right and left from the core', de: 'Oberkörper aus dem Core nach rechts und links drehen' }],
    breath: { it: 'Espira a ogni rotazione.', en: 'Exhale with each rotation.', de: 'Bei jeder Drehung ausatmen.' } },
  ginocchiaalte: { name: { it: 'Ginocchia alte', en: 'High knees', de: 'Knie hoch' }, pose: 'highknees', met: 8, repGuide: { it: 'Ritmo sostenuto', en: 'Brisk pace', de: 'Zügiges Tempo' },
    cue: { it: 'Ginocchio a livello anca, braccia in coordinazione.', en: 'Knee up to hip level, arms in coordination.', de: 'Knie auf Hüfthöhe, Arme im Gleichklang.' },
    tip40: { it: 'Ottimo motore cardio a basso impatto se atterri sull\u2019avampiede.', en: 'Great low-impact cardio engine if you land on your forefoot.', de: 'Ausgezeichnetes gelenkschonendes Cardio-Training, wenn du auf dem Vorfuß landest.' },
    steps: [{ it: 'Busto dritto, braccia ai fianchi', en: 'Torso upright, arms at your sides', de: 'Oberkörper aufrecht, Arme seitlich' }, { it: 'Porta le ginocchia all\u2019altezza dell\u2019anca', en: 'Drive knees up to hip height', de: 'Knie auf Hüfthöhe bringen' }, { it: 'Atterra sull\u2019avampiede, ritmo costante', en: 'Land on your forefoot, steady rhythm', de: 'Auf dem Vorfuß landen, gleichmäßiger Rhythmus' }],
    breath: { it: 'Respiro ritmico: 2 passi a ogni inspirazione.', en: 'Rhythmic breathing: 2 steps per inhale.', de: 'Rhythmisches Atmen: 2 Schritte pro Einatmung.' } },
  burpeetattico: { name: { it: 'Burpee tattico', en: 'Tactical burpee', de: 'Taktischer Burpee' }, pose: 'burpee', met: 8, repGuide: { it: '6–8 ripetizioni', en: '6–8 reps', de: '6–8 Wiederholungen' },
    cue: { it: 'Passo indietro invece del salto, spinta a terra, risali controllato.', en: 'Step back instead of jumping, push-up at the bottom, rise controlled.', de: 'Schritt zurück statt Sprung, Liegestütz am Boden, kontrolliert aufstehen.' },
    tip40: { it: 'La variante "senza salto" mantiene l\u2019intensità cardio proteggendo ginocchia e lombari.', en: 'The "no-jump" version keeps cardio intensity while protecting knees and lower back.', de: 'Die „ohne Sprung“-Variante hält die Cardio-Intensität und schont Knie und unteren Rücken.' },
    steps: [{ it: 'Da in piedi scendi con le mani a terra', en: 'From standing, place your hands on the floor', de: 'Aus dem Stand die Hände auf den Boden setzen' }, { it: 'Porta i piedi indietro in plank, uno alla volta', en: 'Step your feet back into a plank, one at a time', de: 'Füße einzeln nach hinten in den Stütz bringen' }, { it: 'Riporta i piedi avanti e risali, senza salto', en: 'Step feet forward and stand up, no jump', de: 'Füße nach vorn bringen und aufstehen, ohne Sprung' }],
    breath: { it: 'Espira nella spinta, inspira scendendo.', en: 'Exhale on the push, inhale lowering.', de: 'Ausatmen beim Drücken, einatmen beim Absenken.' } },
  crunch: { name: { it: 'Crunch', en: 'Crunch', de: 'Crunch' }, pose: 'crunch', met: 4, repGuide: { it: '15–20 ripetizioni', en: '15–20 reps', de: '15–20 Wiederholungen' },
    cue: { it: 'Scapole fuori dal pavimento, sguardo al soffitto, espira in alto.', en: 'Shoulder blades off the floor, eyes to the ceiling, exhale at the top.', de: 'Schulterblätter vom Boden, Blick zur Decke, oben ausatmen.' },
    tip40: { it: 'La lombare resta appoggiata: non tirare il collo con le mani.', en: 'Keep your lower back down: don\u2019t pull your neck with your hands.', de: 'Der untere Rücken bleibt am Boden: Nicht den Nacken mit den Händen ziehen.' },
    steps: [{ it: 'Sdraiato, ginocchia piegate, mani alle tempie', en: 'Lying down, knees bent, hands at your temples', de: 'Auf dem Rücken, Knie gebeugt, Hände an den Schläfen' }, { it: 'Solleva le scapole, sguardo al soffitto', en: 'Lift your shoulder blades, eyes to the ceiling', de: 'Schulterblätter anheben, Blick zur Decke' }, { it: 'Scendi controllato, testa non riappoggia', en: 'Lower controlled, head doesn\u2019t rest back down', de: 'Kontrolliert absenken, Kopf legt sich nicht ab' }],
    breath: { it: 'Espira in alto, inspira scendendo.', en: 'Exhale at the top, inhale lowering.', de: 'Oben ausatmen, beim Absenken einatmen.' } },
  sideplank: { name: { it: 'Plank laterale', en: 'Side plank', de: 'Seitstütz' }, pose: 'sideplank', met: 3.5, repGuide: { it: '20–30\u2033 per lato', en: '20–30s per side', de: '20–30 s pro Seite' },
    cue: { it: 'Corpo in linea retta di lato, gomito sotto la spalla, bacino alto.', en: 'Body in a straight line on your side, elbow under shoulder, hips high.', de: 'Körper seitlich in einer Linie, Ellbogen unter der Schulter, Becken hoch.' },
    tip40: { it: 'Lato debole? Ginocchio a terra finché la linea regge: conta la tenuta, non la finta.', en: 'Weak side? Knee down until the line holds: what counts is the hold, not the show.', de: 'Schwache Seite? Knie absetzen, solange die Linie hält: Zählen tut die Haltezeit, nicht die Pose.' },
    steps: [{ it: 'Gomito sotto la spalla, piedi impilati', en: 'Elbow under shoulder, feet stacked', de: 'Ellbogen unter der Schulter, Füße übereinander' }, { it: 'Alza il bacino fino a corpo in linea', en: 'Lift hips until your body is in a line', de: 'Becken anheben, bis der Körper eine Linie bildet' }, { it: 'Tieni senza lasciar cadere l\u2019anca', en: 'Hold without letting your hip drop', de: 'Halten, ohne die Hüfte sinken zu lassen' }],
    breath: { it: 'Respiro continuo, niente apnee.', en: 'Continuous breathing, no breath holding.', de: 'Durchgehend atmen, nicht anhalten.' } },
  legraise: { name: { it: 'Leg raise', en: 'Leg raise', de: 'Beinheben' }, pose: 'legraise', met: 3.5, repGuide: { it: '10–12 ripetizioni', en: '10–12 reps', de: '10–12 Wiederholungen' },
    cue: { it: 'Gambe tese, lombare premuta a terra: scendi solo fin dove resta appoggiata.', en: 'Legs straight, lower back pressed to the floor: lower only as far as it stays down.', de: 'Beine gestreckt, unterer Rücken am Boden: Nur so weit absenken, wie er am Boden bleibt.' },
    tip40: { it: 'Se la schiena si inarca, piega leggermente le ginocchia: proteggi i lombari.', en: 'If your back arches, bend your knees slightly: protect your lower back.', de: 'Wenn der Rücken sich wölbt, Knie leicht beugen: Unteren Rücken schützen.' },
    steps: [{ it: 'Sdraiato, gambe tese, lombare a terra', en: 'Lying down, legs straight, lower back on the floor', de: 'Auf dem Rücken, Beine gestreckt, unterer Rücken am Boden' }, { it: 'Solleva le gambe a 90°', en: 'Lift your legs to 90°', de: 'Beine auf 90° anheben' }, { it: 'Scendi lento finché la lombare resta a terra', en: 'Lower slowly as long as your lower back stays down', de: 'Langsam absenken, solange der untere Rücken am Boden bleibt' }],
    breath: { it: 'Espira salendo, inspira scendendo.', en: 'Exhale rising, inhale lowering.', de: 'Ausatmen beim Anheben, einatmen beim Absenken.' } },
  flutterkick: { name: { it: 'Forbici', en: 'Flutter kicks', de: 'Schere (Flutter Kicks)' }, pose: 'flutterkick', met: 4.5, repGuide: { it: 'Ritmo costante', en: 'Steady rhythm', de: 'Gleichmäßiger Rhythmus' },
    cue: { it: 'Gambe a pochi cm da terra, alterna salita e discesa senza fermarti.', en: 'Legs a few cm off the floor, alternate up and down without stopping.', de: 'Beine wenige cm über dem Boden, ohne Unterbrechung auf und ab bewegen.' },
    tip40: { it: 'Lavoro intenso: se i lombari cedono, alza leggermente le gambe.', en: 'Intense work: if your lower back gives out, raise your legs slightly.', de: 'Intensives Training: Wenn der untere Rücken nachgibt, Beine leicht anheben.' },
    steps: [{ it: 'Sdraiato, gambe sollevate a pochi cm da terra', en: 'Lying down, legs lifted a few cm off the floor', de: 'Auf dem Rücken, Beine wenige cm über dem Boden' }, { it: 'Alterna su e giù senza fermarti', en: 'Alternate up and down without stopping', de: 'Ohne Unterbrechung auf und ab wechseln' }, { it: 'Lombare premuta a terra', en: 'Lower back pressed to the floor', de: 'Unterer Rücken am Boden' }],
    breath: { it: 'Respiro breve e ritmico, non trattenere.', en: 'Short, rhythmic breathing, don\u2019t hold.', de: 'Kurz und rhythmisch atmen, nicht anhalten.' } },
  deadbug: { name: { it: 'Dead bug', en: 'Dead bug', de: 'Dead Bug' }, pose: 'deadbug', met: 3.5, repGuide: { it: '8–10 per lato', en: '8–10 per side', de: '8–10 pro Seite' },
    cue: { it: 'Braccio e gamba opposti si abbassano lenti, lombare sempre a terra.', en: 'Opposite arm and leg lower slowly, lower back always on the floor.', de: 'Gegenüberliegender Arm und Bein senken sich langsam, unterer Rücken bleibt am Boden.' },
    tip40: { it: 'L\u2019esercizio lombare-sicuro per eccellenza: rinforza senza dolore.', en: 'The lower-back-safe exercise par excellence: strengthens without pain.', de: 'Die rückenschonende Übung schlechthin: Stärkt ohne Schmerzen.' },
    steps: [{ it: 'Sdraiato, braccia in alto, gambe a 90°', en: 'Lying down, arms up, legs at 90°', de: 'Auf dem Rücken, Arme nach oben, Beine 90°' }, { it: 'Abbassa braccio e gamba opposti, lenti', en: 'Lower opposite arm and leg slowly', de: 'Gegenüberliegenden Arm und Bein langsam absenken' }, { it: 'Torna al centro e cambia lato, lombare a terra', en: 'Return to center and switch sides, lower back down', de: 'Zur Mitte zurück und Seite wechseln, unterer Rücken am Boden' }],
    breath: { it: 'Espira allungando braccio e gamba.', en: 'Exhale as you extend arm and leg.', de: 'Ausatmen beim Strecken von Arm und Bein.' } },
  vup: { name: { it: 'V-up', en: 'V-up', de: 'V-up' }, pose: 'vup', met: 5, repGuide: { it: '8–10 ripetizioni', en: '8–10 reps', de: '8–10 Wiederholungen' },
    cue: { it: 'Toccati le punte dei piedi formando una V, scendi controllato.', en: 'Touch your toes forming a V, lower controlled.', de: 'Zehen berühren und ein V formen, kontrolliert absenken.' },
    tip40: { it: 'Troppo? Piegala le ginocchia: la V imperfetta conta, il collo tirato no.', en: 'Too much? Bend your knees: an imperfect V counts, a yanked neck doesn\u2019t.', de: 'Zu viel? Knie beugen: Ein unvollkommenes V zählt, ein gezogener Nacken nicht.' },
    steps: [{ it: 'Sdraiato, braccia tese oltre la testa', en: 'Lying down, arms extended past your head', de: 'Auf dem Rücken, Arme über den Kopf gestreckt' }, { it: 'Solleva gambe e busto insieme verso le punte', en: 'Lift legs and torso together toward your toes', de: 'Beine und Oberkörper gemeinsam zu den Zehen anheben' }, { it: 'Scendi controllato, senza slanci', en: 'Lower controlled, no momentum', de: 'Kontrolliert absenken, ohne Schwung' }],
    breath: { it: 'Espira toccando le punte, inspira scendendo.', en: 'Exhale touching your toes, inhale lowering.', de: 'Ausatmen beim Berühren der Zehen, einatmen beim Absenken.' } },
  plankjack: { name: { it: 'Plank jack', en: 'Plank jack', de: 'Plank Jack' }, pose: 'plankjack', met: 6, repGuide: { it: 'Ritmo sostenuto', en: 'Brisk pace', de: 'Zügiges Tempo' },
    cue: { it: 'In plank alto, piedi che saltano fuori e dentro senza muovere il bacino.', en: 'In a high plank, feet jumping in and out without moving your hips.', de: 'Im hohen Stütz, Füße springen rein und raus, Becken bleibt ruhig.' },
    tip40: { it: 'Unisce core e battito: brucia calorie a impatto quasi zero.', en: 'Combines core and heartbeat: burns calories with almost zero impact.', de: 'Verbinder Core und Puls: Verbrennt Kalorien bei fast null Belastung.' },
    steps: [{ it: 'Plank alto, piedi uniti', en: 'High plank, feet together', de: 'Hoher Stütz, Füße zusammen' }, { it: 'Salta aprendo e chiudendo i piedi', en: 'Jump feet open and closed', de: 'Füße öffnen und schließen springen' }, { it: 'Bacino fermo, core stretto', en: 'Hips still, core tight', de: 'Becken ruhig, Bauch angespannt' }],
    breath: { it: 'Respiro ritmico: 2 salti per ciclo.', en: 'Rhythmic breathing: 2 jumps per cycle.', de: 'Rhythmisches Atmen: 2 Sprünge pro Zyklus.' } },
  skater: { name: { it: 'Skater', en: 'Skater', de: 'Skater' }, pose: 'skater', met: 7, repGuide: { it: '10–12 per lato', en: '10–12 per side', de: '10–12 pro Seite' },
    cue: { it: 'Saltello laterale da una gamba all\u2019altra, busto basso e avanti.', en: 'Lateral hop from one leg to the other, torso low and forward.', de: 'Seitlicher Sprung von einem Bein aufs andere, Oberkörper tief und nach vorn.' },
    tip40: { it: 'Grande brucia-grassi a basso impatto: atterra morbido sull\u2019avampiede.', en: 'Great low-impact fat burner: land softly on your forefoot.', de: 'Starker gelenkschonender Fettverbrenner: Weich auf dem Vorfuß landen.' },
    steps: [{ it: 'Peso su una gamba, busto basso e avanti', en: 'Weight on one leg, torso low and forward', de: 'Gewicht auf einem Bein, Oberkörper tief und nach vorn' }, { it: 'Saltella di lato sull\u2019altra gamba', en: 'Hop sideways onto the other leg', de: 'Seitlich auf das andere Bein hüpfen' }, { it: 'Atterra morbido, gesto ampio', en: 'Land softly, wide movement', de: 'Weich landen, große Bewegung' }],
    breath: { it: 'Espira a ogni atterraggio.', en: 'Exhale with each landing.', de: 'Bei jeder Landung ausatmen.' } },
  heeltap: { name: { it: 'Heel tap', en: 'Heel tap', de: 'Heel Tap' }, pose: 'heeltap', met: 3.5, repGuide: { it: '12–15 per lato', en: '12–15 per side', de: '12–15 pro Seite' },
    cue: { it: 'Da sdraiato con ginocchia piegate, tocca i talloni in alternanza.', en: 'Lying down with knees bent, tap your heels alternately.', de: 'Auf dem Rücken mit gebeugten Knien die Fersen abwechselnd berühren.' },
    tip40: { it: 'Fatto lento ti fa sentire davvero gli obliqui: niente fretta.', en: 'Done slowly you really feel your obliques: no rush.', de: 'Langsam ausgeführt spürst du die seitliche Bauchmuskulatur wirklich: Keine Eile.' },
    steps: [{ it: 'Sdraiato, ginocchia piegate, piedi a terra', en: 'Lying down, knees bent, feet on the floor', de: 'Auf dem Rücken, Knie gebeugt, Füße am Boden' }, { it: 'Tocca il tallone destro con la mano destra', en: 'Tap your right heel with your right hand', de: 'Rechte Ferse mit der rechten Hand berühren' }, { it: 'Alterna lentamente, obliqui attivi', en: 'Alternate slowly, obliques active', de: 'Langsam wechseln, seitliche Bauchmuskeln aktiv' }],
    breath: { it: 'Espira toccando il tallone.', en: 'Exhale as you tap your heel.', de: 'Ausatmen beim Berühren der Ferse.' } },
};

const PROGRAMS = [
  { id: 'A', name: { it: 'ASSALTO PANCIA', en: 'BELLY ASSAULT', de: 'BAUCH-ANGRIFF' }, tagline: { it: 'Core e addominali — la battaglia decisiva', en: 'Core and abs — the decisive battle', de: 'Core und Bauch — die entscheidende Schlacht' }, focus: { it: 'PANCIA', en: 'BELLY', de: 'BAUCH' }, rounds: 2,
    exercises: ['plank', 'crunch', 'legraise', 'sideplank', 'flutterkick', 'vup'] },
  { id: 'B', name: { it: 'BRUCIA GRASSI', en: 'FAT BURN', de: 'FETT VERBRENNEN' }, tagline: { it: 'Circuito metabolico per dimagrire', en: 'Metabolic circuit to lose fat', de: 'Metabolischer Zirkel zum Abnehmen' }, focus: { it: 'BRUCIA', en: 'BURN', de: 'BRENNEN' }, rounds: 2,
    exercises: ['jumpingjack', 'skater', 'mountainclimber', 'plankjack', 'burpeetattico', 'ginocchiaalte'] },
  { id: 'C', name: { it: 'TOTALE FORZA', en: 'FULL STRENGTH', de: 'VOLLE KRAFT' }, tagline: { it: 'Full body — brucia e costruisci', en: 'Full body — burn and build', de: 'Ganzkörper — verbrennen und aufbauen' }, focus: { it: 'TOTALE', en: 'TOTAL', de: 'TOTAL' }, rounds: 2,
    exercises: ['squat', 'flessioni', 'affondo', 'deadbug', 'superman', 'crunch'] },
  { id: 'D', name: { it: 'RECUPERO ATTIVO', en: 'ACTIVE RECOVERY', de: 'AKTIVE ERHOLUNG' }, tagline: { it: 'Mobilità e respiro — giorno di ricarica', en: 'Mobility and breath — recharge day', de: 'Mobilität und Atmung — Auftanktag' }, focus: { it: 'RECUPERO', en: 'RECOVERY', de: 'ERHOLUNG' }, rounds: 1,
    exercises: ['wallsit', 'ponte', 'superman', 'sideplank', 'deadbug'] },
];
const QUICK_PROGRAM = {
  id: 'Q', name: { it: 'RAFFICA LAMPO', en: 'QUICK BLAST', de: 'BLITZ-RUNDE' }, tagline: { it: 'Per i giorni senza tempo', en: 'For the days with no time', de: 'Für Tage ohne Zeit' }, rounds: 1,
  exercises: ['squat', 'flessioni', 'plank', 'jumpingjack'],
};

const WORK_SEC = 40, REST_SEC = 20, WARM_SEC = 90, COOL_SEC = 90;
const INTERVAL_PRESETS = [
  { key: 'breve', work: 30, rest: 15, label: '30″ / 15″' },
  { key: 'standard', work: 40, rest: 20, label: '40″ / 20″' },
  { key: 'lungo', work: 45, rest: 15, label: '45″ / 15″' },
];
function getIntervalPreset(key) {
  return INTERVAL_PRESETS.find(p => p.key === key) || INTERVAL_PRESETS[1];
}
/* Difficulty levels: the calisthenics-style progression. Each level maps to an
   interval preset; consistent easy sessions unlock the next rank. */
const LEVELS = [
  { key: 'recluta', label: { it: 'RECLUTA', en: 'RECRUIT', de: 'REKRUT' }, preset: 'breve', work: 30, rest: 15, desc: { it: 'Ritmo iniziale: recupero pieno', en: 'Starting pace: full rest', de: 'Starttempo: volle Pause' } },
  { key: 'combattente', label: { it: 'COMBATTENTE', en: 'FIGHTER', de: 'KÄMPFER' }, preset: 'standard', work: 40, rest: 20, desc: { it: 'Ritmo standard 40\u2033/20\u2033', en: 'Standard pace 40s/20s', de: 'Standardtempo 40s/20s' } },
  { key: 'elite', label: { it: 'ELITE', en: 'ELITE', de: 'ELITE' }, preset: 'lungo', work: 45, rest: 15, desc: { it: 'Ritmo sostenuto 45\u2033/15\u2033', en: 'Brisk pace 45s/15s', de: 'Zügiges Tempo 45s/15s' } },
];
function getLevel(key) { return LEVELS.find(l => l.key === key) || LEVELS[1]; }
function levelPreset(profile) {
  const lvl = profile && profile.level ? getLevel(profile.level) : null;
  return lvl ? getIntervalPreset(lvl.preset) : getIntervalPreset((profile && profile.intervalPreset) || 'standard');
}

/* ===== 30-day "Campo" — the guaranteed daily path =====
   Deterministic rotation (calisthenics/military apps style): 6 workout days
   cycling PANCIA -> BRUCIA -> TOTALE, day 7 active recovery. Day counter
   starts from profile.campStart so the plan is always measurable. */
const CAMP_DAYS = 30;
const DAY_CYCLE = ['A', 'B', 'C', 'A', 'B', 'C', 'D'];
function campDayIndex(profile) {
  const start = profile && profile.campStart ? new Date(profile.campStart) : null;
  if (!start) return 1;
  const diff = Math.floor((Date.now() - start.getTime()) / 86400000);
  return Math.min(CAMP_DAYS, Math.max(1, diff + 1));
}
function programById(id) {
  return PROGRAMS.find(p => p.id === id) || PROGRAMS[0];
}
function pickNextProgram(sessions, profile) {
  if (!profile || !profile.campStart || !sessions.length) {
    if (!sessions.length) return { program: PROGRAMS[0], adaptive: false };
    const order = ['A', 'B', 'C'];
    const last = sessions[sessions.length - 1];
    const rotationNextId = order[(order.indexOf(last.programId) + 1) % order.length];
    const hoursSince = (Date.now() - new Date(last.date).getTime()) / 3600000;
    if (last.rpe >= 4 && hoursSince < 20) {
      return { program: programById('D'), adaptive: true };
    }
    return { program: programById(rotationNextId), adaptive: false };
  }
  const idx = campDayIndex(profile);
  let program = programById(DAY_CYCLE[(idx - 1) % DAY_CYCLE.length]);
  const last = sessions[sessions.length - 1];
  const hoursSince = (Date.now() - new Date(last.date).getTime()) / 3600000;
  if (last && last.rpe >= 4 && hoursSince < 20 && program.id !== 'D') {
    return { program: programById('D'), adaptive: true };
  }
  return { program, adaptive: false };
}

/* ================= HELPERS ================= */
function buildSequence(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC) {
  const seq = skipWarmup ? [] : [{ type: 'warmup', duration: WARM_SEC }];
  for (let r = 1; r <= program.rounds; r++) {
    program.exercises.forEach((exId, i) => {
      seq.push({ type: 'work', exerciseId: exId, duration: workSec, round: r });
      const isLast = r === program.rounds && i === program.exercises.length - 1;
      if (!isLast) seq.push({ type: 'rest', duration: restSec });
    });
  }
  if (!skipWarmup) seq.push({ type: 'cooldown', duration: COOL_SEC });
  return seq;
}
function kcalForSeconds(met, weightKg, seconds) {
  return (met * 3.5 * weightKg / 200) * (seconds / 60);
}
function estimateProgramKcal(program, weightKg, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC) {
  let kcal = skipWarmup ? 0 : kcalForSeconds(3.0, weightKg, WARM_SEC) + kcalForSeconds(3.0, weightKg, COOL_SEC);
  program.exercises.forEach(id => {
    const ex = EXERCISES[id];
    for (let r = 0; r < program.rounds; r++) {
      kcal += kcalForSeconds(ex.met, weightKg, workSec);
      kcal += kcalForSeconds(2.0, weightKg, restSec);
    }
  });
  return kcal;
}
function totalSeqSeconds(program, skipWarmup, workSec = WORK_SEC, restSec = REST_SEC) {
  return buildSequence(program, skipWarmup, workSec, restSec).reduce((a, p) => a + p.duration, 0);
}
function formatTime(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
/* Local-timezone day key. The original code sliced ISO (UTC) strings, which
   off-by-one'd the day for any timezone east of UTC (e.g. Italy). */
function dayKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function sessionDayKey(s) {
  return dayKey(new Date(s.date));
}
function hrZone(bpm, age, lang) {
  const max = 220 - age;
  const pct = (bpm / max) * 100;
  if (pct < 60) return { label: tr({ it: 'Recupero', en: 'Recovery', de: 'Erholung' }, lang), color: STEEL };
  if (pct < 70) return { label: tr({ it: 'Brucia grassi', en: 'Fat burn', de: 'Fett verbrennen' }, lang), color: OLIVE };
  if (pct < 85) return { label: tr({ it: 'Cardio', en: 'Cardio', de: 'Cardio' }, lang), color: BLAZE };
  return { label: tr({ it: 'Massimale', en: 'Max', de: 'Maximal' }, lang), color: BLAZE_DEEP };
}
function computeBestStreak(sessions) {
  const dates = [...new Set(sessions.map(sessionDayKey))].sort();
  if (!dates.length) return 0;
  let best = 1, cur = 1;
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round((new Date(dates[i]) - new Date(dates[i - 1])) / 86400000);
    if (diff === 1) { cur++; best = Math.max(best, cur); } else if (diff > 1) { cur = 1; }
  }
  return best;
}
const WEEKLY_GOAL = 3;
const STREAK_BADGES = [3, 7, 14, 30];
const SESSION_BADGES = [5, 10, 25, 50];
const RPE_LABELS = [
  { it: 'Facile', en: 'Easy', de: 'Leicht' },
  { it: 'Leggero', en: 'Light', de: 'Mäßig' },
  { it: 'Medio', en: 'Medium', de: 'Mittel' },
  { it: 'Duro', en: 'Hard', de: 'Hart' },
  { it: 'Al limite', en: 'Max effort', de: 'Am Limit' },
];
const RPE_COLORS = ['#6FA75F', '#9DB85A', '#D9B34C', '#E0843D', '#C1440E'];
const RANKS = [
  { min: 0, name: { it: 'RECLUTA', en: 'RECRUIT', de: 'REKRUT' } },
  { min: 5, name: { it: 'SOLDATO', en: 'SOLDIER', de: 'SOLDAT' } },
  { min: 15, name: { it: 'SERGENTE', en: 'SERGEANT', de: 'SERGEANT' } },
  { min: 30, name: { it: 'TENENTE', en: 'LIEUTENANT', de: 'LEUTNANT' } },
  { min: 60, name: { it: 'CAPITANO', en: 'CAPTAIN', de: 'KAPITÄN' } },
  { min: 100, name: { it: 'VETERANO', en: 'VETERAN', de: 'VETERAN' } },
];
function getRank(sessionsCount) {
  let current = RANKS[0];
  for (const r of RANKS) if (sessionsCount >= r.min) current = r;
  const idx = RANKS.indexOf(current);
  return { current, next: RANKS[idx + 1] || null };
}
function nextBadge(sessions) {
  const bestStreak = computeBestStreak(sessions);
  const candidates = [
    ...STREAK_BADGES.filter(n => bestStreak < n).map(n => ({ kind: 'serie', n, remaining: n - bestStreak })),
    ...SESSION_BADGES.filter(n => sessions.length < n).map(n => ({ kind: 'sessioni', n, remaining: n - sessions.length })),
  ];
  if (!candidates.length) return null;
  candidates.sort((a, b) => a.remaining - b.remaining);
  return candidates[0];
}
const EXERCISE_GROUPS = {
  standing: ['squat', 'affondo', 'jumpingjack', 'ginocchiaalte', 'burpeetattico', 'skater'],
  ground: ['flessioni', 'plank', 'mountainclimber', 'wallsit', 'superman', 'ponte', 'crunchbici', 'russiantwist',
    'crunch', 'sideplank', 'legraise', 'flutterkick', 'deadbug', 'vup', 'plankjack', 'heeltap'],
  core: ['plank', 'crunch', 'sideplank', 'legraise', 'flutterkick', 'deadbug', 'vup', 'heeltap', 'crunchbici', 'russiantwist', 'plankjack', 'mountainclimber'],
};
function greeting(lang) {
  const h = new Date().getHours();
  if (h < 6) return tr({ it: 'Ancora sveglio,', en: 'Still awake,', de: 'Noch wach,' }, lang);
  if (h < 12) return tr({ it: 'Buongiorno,', en: 'Good morning,', de: 'Guten Morgen,' }, lang);
  if (h < 18) return tr({ it: 'Buon pomeriggio,', en: 'Good afternoon,', de: 'Guten Nachmittag,' }, lang);
  return tr({ it: 'Buonasera,', en: 'Good evening,', de: 'Guten Abend,' }, lang);
}
function buildHeatmap(sessions, days = 35) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    cells.push({ key: dayKey(d), active: dateSet.has(dayKey(d)) });
  }
  return cells;
}
function exportData(profile, sessions) {
  try {
    const payload = JSON.stringify({ profile, sessions }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `operator40-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) { /* best effort, ignore */ }
}

/* ---- Apple Health export.xml import (parsed 100% locally, regex-based to stay safe on huge files) ---- */
const HK_ACTIVITY_MAP = {
  HKWorkoutActivityTypeFunctionalStrengthTraining: { it: 'Forza funzionale (Apple Health)', en: 'Functional strength (Apple Health)', de: 'Funktionelles Krafttraining (Apple Health)' },
  HKWorkoutActivityTypeTraditionalStrengthTraining: { it: 'Allenamento forza (Apple Health)', en: 'Strength training (Apple Health)', de: 'Krafttraining (Apple Health)' },
  HKWorkoutActivityTypeCoreTraining: { it: 'Core training (Apple Health)', en: 'Core training (Apple Health)', de: 'Core-Training (Apple Health)' },
  HKWorkoutActivityTypeHighIntensityIntervalTraining: { it: 'HIIT (Apple Health)', en: 'HIIT (Apple Health)', de: 'HIIT (Apple Health)' },
  HKWorkoutActivityTypeCrossTraining: { it: 'Cross training (Apple Health)', en: 'Cross training (Apple Health)', de: 'Cross-Training (Apple Health)' },
  HKWorkoutActivityTypeFlexibility: { it: 'Mobilità (Apple Health)', en: 'Flexibility (Apple Health)', de: 'Mobilität (Apple Health)' },
  HKWorkoutActivityTypeCooldown: { it: 'Defaticamento (Apple Health)', en: 'Cooldown (Apple Health)', de: 'Abkühlen (Apple Health)' },
};
const HK_FALLBACK = { it: 'Allenamento (Apple Health)', en: 'Workout (Apple Health)', de: 'Training (Apple Health)' };
const HK_RELEVANT_TYPES = Object.keys(HK_ACTIVITY_MAP);
function getXmlAttr(tag, name) {
  const m = tag.match(new RegExp(name + '="([^"]*)"'));
  return m ? m[1] : null;
}
function parseAppleDate(s) {
  if (!s) return null;
  const m = s.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/);
  const d = m ? new Date(`${m[1]}T${m[2]}${m[3]}:${m[4]}`) : new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function parseAppleHealthExport(xmlText) {
  const result = { weightKg: null, weightDate: null, workouts: [] };

  const massRegex = /<Record[^>]*type="HKQuantityTypeIdentifierBodyMass"[^>]*\/?>/g;
  let m, count = 0, latestDate = null, latestVal = null, latestUnit = null;
  while ((m = massRegex.exec(xmlText)) && count < 30000) {
    count++;
    const date = getXmlAttr(m[0], 'startDate');
    const val = getXmlAttr(m[0], 'value');
    const unit = getXmlAttr(m[0], 'unit');
    if (date && val && (!latestDate || date > latestDate)) {
      latestDate = date; latestVal = parseFloat(val); latestUnit = unit;
    }
  }
  if (latestVal != null) {
    result.weightKg = latestUnit && latestUnit.toLowerCase().includes('lb') ? Math.round(latestVal * 0.453592 * 10) / 10 : latestVal;
    result.weightDate = latestDate;
  }

  const workoutRegex = /<Workout[^>]*>/g;
  let wcount = 0;
  while ((m = workoutRegex.exec(xmlText)) && wcount < 5000) {
    const tag = m[0];
    const type = getXmlAttr(tag, 'workoutActivityType');
    if (!type || !HK_RELEVANT_TYPES.includes(type)) continue;
    const startDate = getXmlAttr(tag, 'startDate');
    if (!startDate) continue;
    const durationRaw = parseFloat(getXmlAttr(tag, 'duration') || '0');
    const durationUnit = getXmlAttr(tag, 'durationUnit') || 'min';
    const durationMin = durationUnit === 'min' ? durationRaw : durationRaw / 60;
    const kcalStr = getXmlAttr(tag, 'totalEnergyBurned');
    const kcal = kcalStr ? Math.round(parseFloat(kcalStr)) : Math.round(durationMin * 6);
    result.workouts.push({ type, durationMin: Math.round(durationMin), kcal, startDate });
    wcount++;
  }
  return result;
}

function computeStreak(sessions) {
  const dateSet = new Set(sessions.map(sessionDayKey));
  let cursor = new Date();
  if (!dateSet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dateSet.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* not available, ignore */ }
}
function speak(text, lang) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (lang && LOCALES[lang]) || 'it-IT';
    u.rate = 1.03;
    window.speechSynthesis.speak(u);
  } catch (e) { /* not available, ignore */ }
}
function playClick() {
  playBeep(1500, 0.025);
}

/* Shared, lazily-created AudioContext. iOS only allows audio to start after a
   user gesture and only permits a small number of contexts — so we keep ONE
   context, unlock it on the first tap, and never close it. */
let _audioCtx = null;
function getAudioCtx() {
  try {
    if (!_audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      _audioCtx = new Ctx();
    }
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
  } catch (e) { return null; }
}
function unlockAudio() {
  try {
    const ctx = getAudioCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  } catch (e) { /* ignore */ }
}
if (typeof window !== 'undefined') {
  ['pointerdown', 'touchend', 'keydown'].forEach(evt =>
    window.addEventListener(evt, unlockAudio, { once: true, passive: true })
  );
}
function playBeep(freq = 660, duration = 0.12) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch (e) { /* audio not available, ignore */ }
}

/* ================= STYLE SHEET ================= */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
html, body { margin: 0; padding: 0; background: ${INK}; overscroll-behavior: none; }
.o40 * { box-sizing: border-box; }
.o40 button { touch-action: manipulation; -webkit-user-select: none; user-select: none; }
.o40 input, .o40 textarea { -webkit-user-select: text; user-select: text; }
.o40 { font-family: 'Inter', sans-serif; }
.o40-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; }
.o40-mono { font-family: 'IBM Plex Mono', monospace; }
.o40-figure #armL, .o40-figure #armR { transform-origin: 50px 40px; }
.o40-figure #legL, .o40-figure #legR { transform-origin: 50px 82px; }
.o40-figure #torso { transform-origin: 50px 40px; }

/* --- standing: squat --- */
.pose-squat #figure { animation: squatBob 1.1s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes squatBob { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(16px) scaleY(0.88); } }

/* --- standing: lunge (staggered stance, drawn via polylines) --- */
.pose-lunge #figure { animation: lungeBob 1.1s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes lungeBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

/* --- standing: push-up (horizontal, chest dips) --- */
.pose-pushup #upper { animation: pushupDip 1.1s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes pushupDip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(9px); } }

/* --- plank: static breathing hold --- */
.pose-plank #figure { animation: plankHold 2.6s ease-in-out infinite; transform-origin: 85px 65px; }
@keyframes plankHold { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }

/* --- mountain climber: alternating knee drive --- */
.pose-mountainclimber #legL { animation: mcL 0.6s ease-in-out infinite; transform-origin: 60px 51px; }
.pose-mountainclimber #legR { animation: mcR 0.6s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes mcL { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(52px,-16px) scale(0.55); } }
@keyframes mcR { 0%,50%,100% { transform: translate(0,0) scale(1); } 25% { transform: translate(52px,-16px) scale(0.55); } }

/* --- jumping jack: arms & legs spread --- */
.pose-jack #armL { animation: jackArmL 0.85s ease-in-out infinite; }
.pose-jack #armR { animation: jackArmR 0.85s ease-in-out infinite; }
.pose-jack #legL { animation: jackLegL 0.85s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-jack #legR { animation: jackLegR 0.85s ease-in-out infinite; transform-origin: 50px 82px; }
@keyframes jackArmL { 0%,100% { transform: rotate(15deg); } 50% { transform: rotate(150deg); } }
@keyframes jackArmR { 0%,100% { transform: rotate(-15deg); } 50% { transform: rotate(-150deg); } }
@keyframes jackLegL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(26deg); } }
@keyframes jackLegR { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(-26deg); } }

/* --- high knees: alternating leg lift, standing --- */
.pose-highknees #legL { animation: hkL 0.5s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-highknees #legR { animation: hkR 0.5s ease-in-out infinite; transform-origin: 50px 82px; }
.pose-highknees #armL { animation: hkArmL 0.5s ease-in-out infinite; }
.pose-highknees #armR { animation: hkArmR 0.5s ease-in-out infinite; }
@keyframes hkL { 0%,50%,100% { transform: rotate(0deg); } 25% { transform: rotate(-85deg) translateY(-4px); } }
@keyframes hkR { 0%,50%,100% { transform: rotate(-85deg) translateY(-4px); } 25% { transform: rotate(0deg); } }
@keyframes hkArmL { 0%,50%,100% { transform: rotate(15deg); } 25% { transform: rotate(-45deg); } }
@keyframes hkArmR { 0%,50%,100% { transform: rotate(-45deg); } 25% { transform: rotate(-15deg); } }

/* --- superman: prone, arms & legs lift --- */
.pose-superman #armR { animation: supLift 1.4s ease-in-out infinite; transform-origin: 122px 64px; }
.pose-superman #legR { animation: supLift 1.4s ease-in-out infinite; transform-origin: 58px 64px; }
@keyframes supLift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }

/* --- bridge: hips lift off the floor (rotate around shoulder anchor, no gap) --- */
.pose-bridge #hipgroup { animation: bridgeLift 1.3s ease-in-out infinite; transform-origin: 62px 82px; }
@keyframes bridgeLift { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }

/* --- bicycle crunch: alternating twist, knees up (rigid two-segment leg groups) --- */
.pose-bicyclecrunch #upperTwist { animation: bcTwist 1s ease-in-out infinite; transform-origin: 55px 82px; }
.pose-bicyclecrunch #legL { animation: bcLegL 1s ease-in-out infinite; transform-origin: 82px 82px; }
.pose-bicyclecrunch #legR { animation: bcLegR 1s ease-in-out infinite; transform-origin: 82px 82px; }
@keyframes bcTwist { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes bcLegL { 0%,100% { transform: scale(1) translate(0,0); } 50% { transform: scale(0.72) translate(10px,-6px); } }
@keyframes bcLegR { 0%,100% { transform: scale(0.72) translate(10px,-6px); } 50% { transform: scale(1) translate(0,0); } }

/* --- russian twist: seated, torso rotates --- */
.pose-russiantwist #upperTwist { animation: rtTwist 0.9s ease-in-out infinite; transform-origin: 60px 90px; }
@keyframes rtTwist { 0%,100% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } }

/* --- wall sit: isometric hold against the wall --- */
.pose-wallsit #figure { animation: wallPulse 2.6s ease-in-out infinite; transform-origin: 37px 82px; }
@keyframes wallPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }

/* --- burpee: compound drop-and-rise sequence, ground phase included --- */
.pose-burpee #figure { animation: burpeeFlow 1.8s ease-in-out infinite; transform-origin: 50px 100px; }
@keyframes burpeeFlow {
  0%   { transform: translateY(0) rotate(0deg) scaleY(1); }
  18%  { transform: translateY(26px) rotate(0deg) scaleY(0.78); }
  40%  { transform: translateY(46px) rotate(-62deg) translateX(-14px) scaleY(0.62); }
  62%  { transform: translateY(26px) rotate(0deg) scaleY(0.78); }
  82%  { transform: translateY(-8px) rotate(0deg) scaleY(1.06); }
  100% { transform: translateY(0) rotate(0deg) scaleY(1); }
}

/* --- crunch: shoulders curl up --- */
.pose-crunch #crunchUpper { animation: crunchCurl 1.1s ease-in-out infinite; transform-origin: 66px 78px; }
@keyframes crunchCurl { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }

/* --- side plank: isometric diagonal hold --- */
.pose-sideplank #figure { animation: spHold 2.6s ease-in-out infinite; transform-origin: 84px 62px; }
@keyframes spHold { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }

/* --- leg raise: straight legs lift from hips --- */
.pose-legraise #legGroup { animation: lrLift 1.4s ease-in-out infinite; transform-origin: 66px 82px; }
@keyframes lrLift { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-24deg); } }

/* --- flutter kicks: alternating beat --- */
.pose-flutterkick #legGroup { animation: fkBeat 0.7s ease-in-out infinite; transform-origin: 66px 82px; }
@keyframes fkBeat { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }

/* --- dead bug: opposite arm & leg reach --- */
.pose-deadbug #dbArmL { animation: dbA 1.1s ease-in-out infinite; transform-origin: 40px 82px; }
.pose-deadbug #dbLegR { animation: dbL 1.1s ease-in-out infinite; transform-origin: 70px 82px; }
.pose-deadbug #dbArmR { animation: dbAr 1.1s ease-in-out infinite; transform-origin: 58px 82px; }
.pose-deadbug #dbLegL { animation: dbLl 1.1s ease-in-out infinite; transform-origin: 70px 82px; }
@keyframes dbA { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(-16deg); } }
@keyframes dbL { 0%,100% { transform: rotate(6deg); } 50% { transform: rotate(-12deg); } }
@keyframes dbAr { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(16deg); } }
@keyframes dbLl { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(12deg); } }

/* --- V-up: torso + legs rise into a fold --- */
.pose-vup #figure { animation: vupFold 1.2s ease-in-out infinite; transform-origin: 60px 78px; }
@keyframes vupFold { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-18deg); } }

/* --- plank jack: feet jump apart / together --- */
.pose-plankjack #legR { animation: pjR 0.8s ease-in-out infinite; transform-origin: 62px 51px; }
.pose-plankjack #legL { animation: pjL 0.8s ease-in-out infinite; transform-origin: 60px 51px; }
@keyframes pjR { 0%,100% { transform: translate(0,0); } 50% { transform: translate(34px,4px) scale(0.8); } }
@keyframes pjL { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-14px,6px) scale(0.85); } }

/* --- skater: lateral bounding hop --- */
.pose-skater #figure { animation: skatHop 1.1s ease-in-out infinite; transform-origin: 50px 100px; }
@keyframes skatHop { 0%,100% { transform: translate(-16px,0) rotate(-6deg); } 50% { transform: translate(16px,-4px) rotate(6deg); } }

/* --- heel taps: alternating reach to each heel --- */
.pose-heeltap #htL { animation: htL 1s ease-in-out infinite; transform-origin: 40px 82px; }
.pose-heeltap #htR { animation: htR 1s ease-in-out infinite; transform-origin: 54px 82px; }
@keyframes htL { 0%,100% { transform: rotate(10deg); } 50% { transform: rotate(-16deg); } }
@keyframes htR { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(16deg); } }

@media (prefers-reduced-motion: reduce) { .o40-figure * { animation: none !important; } }
.o40-scroll::-webkit-scrollbar { width: 6px; }
.o40-scroll::-webkit-scrollbar-thumb { background: ${KHAKI}; border-radius: 4px; }

/* ---- modern UI polish ---- */
.o40-aura {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
  background:
    radial-gradient(38% 46% at 22% 26%, ${OLIVE}40 0%, transparent 70%),
    radial-gradient(30% 40% at 78% 16%, ${BLAZE}33 0%, transparent 70%),
    radial-gradient(42% 50% at 72% 84%, ${OLIVE}30 0%, transparent 70%),
    radial-gradient(26% 34% at 18% 88%, ${BLAZE_DEEP}30 0%, transparent 70%);
  animation: auraDrift 22s ease-in-out infinite alternate;
}
@keyframes auraDrift {
  0% { transform: translate(0, 0) scale(1); filter: hue-rotate(0deg); }
  100% { transform: translate(-2%, 2%) scale(1.08); filter: hue-rotate(10deg); }
}
@keyframes confettiFall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(360px) rotate(300deg); opacity: 0; }
}
.o40-confetti { position: absolute; top: 0; width: 8px; height: 13px; border-radius: 2px; animation: confettiFall linear infinite; pointer-events: none; }
.o40-gradtext {
  background: linear-gradient(110deg, ${PAPER} 20%, ${KHAKI} 40%, ${BLAZE} 55%, ${PAPER} 75%);
  background-size: 220% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: gradShift 5s linear infinite;
}
@keyframes gradShift { to { background-position: -220% center; } }
.o40-pulsebtn { position: relative; }
.o40-pulsebtn::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: 0 0 0 0 ${BLAZE}aa; animation: btnRing 2.2s ease-out infinite; pointer-events: none;
}
@keyframes btnRing {
  0% { box-shadow: 0 0 0 0 ${BLAZE}aa; }
  70% { box-shadow: 0 0 0 14px ${BLAZE}00; }
  100% { box-shadow: 0 0 0 0 ${BLAZE}00; }
}
.o40 button { -webkit-tap-highlight-color: transparent; transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
.o40 button:active { transform: scale(0.96); }
.o40-toast-in { animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1); }
@keyframes toastIn { from { opacity: 0; transform: translateY(14px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
.o40-input:focus { outline: none; border-color: ${BLAZE} !important; box-shadow: 0 0 0 3px rgba(193,68,14,0.18); }
.o40-card { transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
.o40-card:active { transform: scale(0.985); }

/* ---- ambient phone background (subtle modern glow) ---- */
.o40-phone {
  background:
    radial-gradient(120% 55% at 50% -8%, ${OLIVE}2e 0%, transparent 55%),
    radial-gradient(95% 42% at 88% 108%, ${BLAZE_DEEP}20 0%, transparent 60%),
    radial-gradient(80% 30% at 8% 108%, ${OLIVE}1a 0%, transparent 55%),
    ${INK};
}
.o40-camo { background: repeating-linear-gradient(115deg, ${OLIVE} 0 14px, ${OLIVE_DARK} 14px 26px, ${KHAKI} 26px 30px); background-size: 40px 6px; animation: camoSlide 14s linear infinite; }
@keyframes camoSlide { from { background-position: 0 0; } to { background-position: 40px 0; } }

/* ---- micro-interactions ---- */
@keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
@keyframes tabPop { 0% { transform: translateY(6px) scale(0.6); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
@keyframes glowPulse {
  0%,100% { box-shadow: 0 0 0 0 ${BLAZE}55, 0 10px 30px rgba(0,0,0,0.45); }
  50% { box-shadow: 0 0 0 9px ${BLAZE}11, 0 10px 30px rgba(0,0,0,0.45); }
}
@keyframes ringPulse { 0% { transform: scale(0.97); opacity: 1; } 100% { transform: scale(1.06); opacity: 0; } }
@keyframes restBreath { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.07); opacity: 0.95; } }
.o40-expand { animation: fadeSlide 0.28s cubic-bezier(0.16,1,0.3,1); }
.o40-pop { animation: popIn 0.32s cubic-bezier(0.16,1,0.3,1); }
@media (hover: hover) {
  .o40-card:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(0,0,0,0.5); }
}
@keyframes shimmer { 0% { background-position: -120px 0; } 100% { background-position: 120px 0; } }

/* ---- smart graphic animations ---- */
.o40-screen-in { animation: screenIn 0.45s cubic-bezier(0.16,1,0.3,1); }
@keyframes screenIn { from { opacity: 0; transform: translateY(14px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
.o40-eqbar { display: inline-block; border-radius: 2px; }
@keyframes eqPulse { 0%,100% { height: 4px; opacity: 0.45; } 50% { height: 100%; opacity: 1; } }
@keyframes cometGlow { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
.o40-comet { animation: cometGlow 1.1s ease-in-out infinite; }
@keyframes emberRise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  12% { opacity: 0.9; }
  85% { opacity: 0.3; }
  100% { transform: translateY(-150px) scale(0.4); opacity: 0; }
}
.o40-embers { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.o40-ember { position: absolute; bottom: -6px; width: 4px; height: 4px; border-radius: 50%; background: radial-gradient(circle, ${BLAZE}, transparent 70%); animation: emberRise 3.4s ease-out infinite; }
@keyframes ecgDash { to { stroke-dashoffset: -48; } }
.o40-ecg { animation: ecgDash 1.5s linear infinite; }
.o40-ticker { overflow: hidden; white-space: nowrap; position: relative; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.o40-ticker-inner { display: inline-flex; gap: 44px; padding-left: 44px; animation: tickerScroll 24s linear infinite; will-change: transform; }
@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes loadSweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
.o40-loadbar { position: relative; overflow: hidden; background: ${OLIVE_DARK}; border-radius: 3px; }
.o40-loadbar > span { position: absolute; inset: 0; border-radius: 3px; background: linear-gradient(90deg, ${BLAZE}66, ${BLAZE}, ${BLAZE}66); animation: loadSweep 1.2s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
.o40-blink { animation: blink 1s step-start infinite; }
/* ---- modern graphics polish ---- */
@keyframes ringSpin { to { transform: rotate(360deg); } }
.o40-ring-border { position: relative; }
.o40-ring-border::before {
  content: ''; position: absolute; inset: -1px; border-radius: 19px; padding: 2px;
  background: conic-gradient(from 0deg, transparent 0%, ${BLAZE} 12%, transparent 30%, transparent 70%, ${KHAKI} 88%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: ringSpin 5s linear infinite; pointer-events: none;
}
.o40-gridbg {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.5; overflow: hidden;
  background-image: linear-gradient(${OLIVE}14 1px, transparent 1px), linear-gradient(90deg, ${OLIVE}14 1px, transparent 1px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 90%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 90%);
  animation: gridDrift 18s linear infinite;
}
@keyframes gridDrift { from { background-position: 0 0, 0 0; } to { background-position: 0 26px, 26px 0; } }
.o40-sheen::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: -60%; width: 45%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent);
  transform: skewX(-18deg); transition: left 0.6s ease; pointer-events: none;
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .o40-sheen:hover::after { left: 130%; }
}
@media (prefers-reduced-motion: reduce) {
  .o40-eqbar, .o40-comet, .o40-ember, .o40-ecg, .o40-ticker-inner, .o40-loadbar > span { animation: none !important; }
}
`;

/* ================= LANGUAGE CONTEXT ================= */
const LangContext = createContext({ lang: 'it', t: (k, v) => translate(k, 'it', v), setLang: () => {} });
function useT() { return useContext(LangContext); }

/* ================= EXERCISE FIGURE (pose-specific drawings) ================= */
const limb = { stroke: 'currentColor', strokeWidth: 7, strokeLinecap: 'round' };
const body = { stroke: 'currentColor', strokeWidth: 16, strokeLinecap: 'round' };
const floorLine = (x1, y, x2) => <line x1={x1} y1={y} x2={x2} y2={y} stroke={KHAKI} strokeWidth="2" opacity="0.4" />;
const dot = (cx, cy, r = 4) => <circle cx={cx} cy={cy} r={r} fill="currentColor" />;
const head = (cx, cy, r = 11) => <circle cx={cx} cy={cy} r={r} fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="5" />;
const groundShadow = (cx, y) => <ellipse cx={cx} cy={y} rx="24" ry="4" fill={KHAKI} opacity="0.22" />;

function ExerciseFigure({ pose, color = BLAZE, size = '100%' }) {
  const wrap = (viewBox, children) => (
    <svg viewBox={viewBox} width={size} height={size} className={`o40-figure pose-${pose}`} style={{ color, overflow: 'visible' }}>
      {children}
    </svg>
  );

  switch (pose) {
    /* -------- STANDING: squat (bent-knee stance) -------- */
    case 'squat':
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        {groundShadow(50, 133)}
        <g id="figure">
          {head(50, 20)}
          <line id="torso" x1="50" y1="30" x2="50" y2="80" {...body} />
          <line id="armL" x1="50" y1="40" x2="30" y2="56" {...limb} />
          <line id="armR" x1="50" y1="40" x2="70" y2="56" {...limb} />
          <polyline id="legL" points="50,80 33,101 33,123" fill="none" {...limb} />
          <polyline id="legR" points="50,80 67,101 67,123" fill="none" {...limb} />
          {dot(50, 40, 4.5)}{dot(50, 80, 4.5)}{dot(30, 56)}{dot(70, 56)}{dot(33, 123)}{dot(67, 123)}
        </g>
      </>);

    /* -------- STANDING: lunge (staggered stance) -------- */
    case 'lunge':
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        {groundShadow(52, 133)}
        <g id="figure">
          {head(52, 20)}
          <line id="torso" x1="52" y1="30" x2="50" y2="78" {...body} />
          <line id="armL" x1="52" y1="40" x2="32" y2="58" {...limb} />
          <line id="armR" x1="52" y1="40" x2="72" y2="58" {...limb} />
          <polyline id="legL" points="50,78 38,102 44,130" fill="none" {...limb} />
          <polyline id="legR" points="50,78 66,96 74,130" fill="none" {...limb} />
          {dot(52, 40, 4.5)}{dot(50, 78, 4.5)}{dot(32, 58)}{dot(72, 58)}{dot(44, 130)}{dot(74, 130)}
        </g>
      </>);

    /* -------- STANDING: jumping jack -------- */
    case 'jack':
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        {groundShadow(50, 133)}
        <g id="figure">
          {head(50, 20)}
          <line id="torso" x1="50" y1="30" x2="50" y2="82" {...body} />
          <line id="armL" x1="50" y1="40" x2="28" y2="62" {...limb} />
          <line id="armR" x1="50" y1="40" x2="72" y2="62" {...limb} />
          <line id="legL" x1="50" y1="82" x2="34" y2="125" {...limb} />
          <line id="legR" x1="50" y1="82" x2="66" y2="125" {...limb} />
          {dot(50, 40, 4.5)}{dot(50, 82, 4.5)}{dot(28, 62)}{dot(72, 62)}{dot(34, 125)}{dot(66, 125)}
        </g>
      </>);

    /* -------- STANDING: high knees -------- */
    case 'highknees':
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        {groundShadow(50, 133)}
        <g id="figure">
          {head(50, 20)}
          <line id="torso" x1="50" y1="30" x2="50" y2="82" {...body} />
          <line id="armL" x1="50" y1="40" x2="28" y2="62" {...limb} />
          <line id="armR" x1="50" y1="40" x2="72" y2="62" {...limb} />
          <line id="legL" x1="50" y1="82" x2="34" y2="125" {...limb} />
          <line id="legR" x1="50" y1="82" x2="66" y2="125" {...limb} />
          {dot(50, 40, 4.5)}{dot(50, 82, 4.5)}{dot(28, 62)}{dot(72, 62)}{dot(34, 125)}{dot(66, 125)}
        </g>
      </>);

    /* -------- HORIZONTAL: plank (grounded, no rotation hack) -------- */
    case 'plank':
      return wrap('0 0 160 100', <>
        {floorLine(10, 88, 150)}
        <g id="figure">
          {head(136, 42, 9)}
          <line id="torso" x1="128" y1="45" x2="58" y2="52" {...body} />
          <line x1="124" y1="47" x2="120" y2="86" {...limb} />
          <line x1="60" y1="51" x2="24" y2="86" {...limb} />
          {dot(124, 47, 4.5)}{dot(60, 51, 4.5)}{dot(120, 86)}{dot(24, 86)}
        </g>
      </>);

    /* -------- HORIZONTAL: push-up (chest dips toward floor) -------- */
    case 'pushup':
      return wrap('0 0 160 100', <>
        {floorLine(10, 88, 150)}
        <g id="figure">
          <g id="upper">
            {head(136, 42, 9)}
            <line x1="128" y1="45" x2="60" y2="51" {...body} />
            <line x1="124" y1="47" x2="120" y2="86" {...limb} />
            {dot(124, 47, 4.5)}{dot(120, 86)}
          </g>
          <line x1="60" y1="51" x2="24" y2="86" {...limb} />
          {dot(60, 51, 4.5)}{dot(24, 86)}
        </g>
      </>);

    /* -------- HORIZONTAL: mountain climber (alternating knee drive) -------- */
    case 'mountainclimber':
      return wrap('0 0 160 100', <>
        {floorLine(10, 88, 150)}
        <g id="figure">
          {head(136, 42, 9)}
          <line x1="128" y1="45" x2="60" y2="51" {...body} />
          <line x1="124" y1="47" x2="120" y2="86" {...limb} />
          <line id="legR" x1="60" y1="51" x2="26" y2="84" {...limb} />
          <line id="legL" x1="60" y1="51" x2="22" y2="88" {...limb} />
          {dot(124, 47, 4.5)}{dot(60, 51, 4.5)}{dot(120, 86)}{dot(26, 84)}{dot(22, 88)}
        </g>
      </>);

    /* -------- PRONE: superman (face down, arm & leg lift) -------- */
    case 'superman':
      return wrap('0 0 160 90', <>
        {floorLine(10, 74, 150)}
        <g id="figure">
          {head(132, 62, 9)}
          <line x1="124" y1="63" x2="60" y2="63" {...body} />
          <line id="armR" x1="120" y1="63" x2="146" y2="57" {...limb} />
          <line id="legR" x1="60" y1="63" x2="26" y2="57" {...limb} />
          {dot(120, 63, 4.5)}{dot(60, 63, 4.5)}{dot(146, 57)}{dot(26, 57)}
        </g>
      </>);

    /* -------- SUPINE: bridge (hips lift, feet planted) -------- */
    case 'bridge':
      return wrap('0 0 160 100', <>
        {floorLine(10, 90, 150)}
        <g id="figure">
          {head(34, 82, 9)}
          <line x1="42" y1="82" x2="62" y2="82" {...body} />
          <line x1="34" y1="82" x2="30" y2="65" {...limb} />
          {dot(30, 65, 4.5)}{dot(62, 82, 4.5)}
          <g id="hipgroup">
            <line x1="62" y1="82" x2="88" y2="82" {...body} />
            <line x1="88" y1="82" x2="102" y2="66" {...limb} />
            <line x1="102" y1="66" x2="102" y2="90" {...limb} />
            {dot(88, 82, 4.5)}{dot(102, 90)}
          </g>
        </g>
      </>);

    /* -------- SUPINE: bicycle crunch (knees up, twisting; legs animate as rigid units) -------- */
    case 'bicyclecrunch':
      return wrap('0 0 160 100', <>
        {floorLine(10, 90, 150)}
        <g id="figure">
          {head(30, 82, 9)}
          <g id="upperTwist">
            <line x1="38" y1="82" x2="72" y2="82" {...body} />
            <line x1="55" y1="82" x2="80" y2="66" {...limb} />
            {dot(38, 82, 4.5)}{dot(80, 66)}
          </g>
          <g id="legL">
            <line x1="82" y1="82" x2="100" y2="60" {...limb} />
            <line x1="100" y1="60" x2="118" y2="72" {...limb} />
            {dot(118, 72)}
          </g>
          <g id="legR">
            <line x1="82" y1="82" x2="104" y2="68" {...limb} />
            <line x1="104" y1="68" x2="128" y2="56" {...limb} />
            {dot(128, 56)}
          </g>
          {dot(82, 82, 4.5)}
        </g>
      </>);

    /* -------- SEATED: russian twist -------- */
    case 'russiantwist':
      return wrap('0 0 120 120', <>
        {floorLine(8, 108, 112)}
        <g id="figure">
          <g id="upperTwist">
            {head(60, 44, 9)}
            <line x1="60" y1="53" x2="60" y2="90" {...body} />
            <line x1="60" y1="60" x2="90" y2="66" {...limb} />
            {dot(60, 60, 4.5)}{dot(90, 66)}
          </g>
          <polyline points="60,90 78,84 74,100" fill="none" {...limb} />
          <polyline points="60,90 68,80 60,98" fill="none" {...limb} />
          {dot(60, 90, 4.5)}{dot(74, 100)}{dot(60, 98)}
        </g>
      </>);

    /* -------- SEATED against wall: wall sit -------- */
    case 'wallsit':
      return wrap('0 0 100 140', <>
        {floorLine(20, 134, 92)}
        <line x1="16" y1="8" x2="16" y2="134" stroke={KHAKI} strokeWidth="3" opacity="0.5" />
        <line x1="8" y1="18" x2="16" y2="10" stroke={KHAKI} strokeWidth="2" opacity="0.5" />
        <line x1="8" y1="38" x2="16" y2="30" stroke={KHAKI} strokeWidth="2" opacity="0.5" />
        <line x1="8" y1="58" x2="16" y2="50" stroke={KHAKI} strokeWidth="2" opacity="0.5" />
        <g id="figure">
          {head(24, 20, 9)}
          <line x1="24" y1="29" x2="24" y2="80" {...body} />
          <line x1="24" y1="42" x2="42" y2="58" {...limb} />
          <polyline points="24,80 54,80 54,132" fill="none" {...limb} />
          {dot(24, 42, 4.5)}{dot(24, 80, 4.5)}{dot(42, 58)}{dot(54, 132)}
        </g>
      </>);

    /* -------- STANDING: burpee (compound, ground phase animated) -------- */
    case 'burpee':
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        {groundShadow(50, 133)}
        <g id="figure">
          {head(50, 20)}
          <line x1="50" y1="30" x2="50" y2="80" {...body} />
          <line x1="50" y1="40" x2="30" y2="56" {...limb} />
          <line x1="50" y1="40" x2="70" y2="56" {...limb} />
          <line x1="50" y1="80" x2="34" y2="123" {...limb} />
          <line x1="50" y1="80" x2="66" y2="123" {...limb} />
          {dot(50, 40, 4.5)}{dot(50, 80, 4.5)}{dot(30, 56)}{dot(70, 56)}{dot(34, 123)}{dot(66, 123)}
        </g>
      </>);

    /* -------- SUPINE: crunch (knees bent, shoulders curl) -------- */
    case 'crunch':
      return wrap('0 0 160 100', <>
        {floorLine(10, 92, 150)}
        <g id="figure">
          <g id="crunchUpper">
            {head(26, 74, 9)}
            <line x1="34" y1="80" x2="66" y2="78" {...body} />
            <line x1="48" y1="81" x2="74" y2="64" {...limb} />
            {dot(34, 80, 4.5)}{dot(66, 78, 4.5)}{dot(74, 64)}
          </g>
          <polyline points="66,78 90,62 102,74" fill="none" {...limb} />
          <polyline points="66,78 94,64 110,72" fill="none" {...limb} />
          {dot(90, 62, 4.5)}{dot(102, 74)}{dot(94, 64, 4.5)}{dot(110, 72)}
        </g>
      </>);

    /* -------- SIDE: side plank (support arm + stacked body) -------- */
    case 'sideplank':
      return wrap('0 0 160 100', <>
        {floorLine(10, 88, 150)}
        <g id="figure">
          {head(132, 40, 9)}
          <line x1="124" y1="42" x2="46" y2="70" {...body} />
          <line x1="50" y1="68" x2="28" y2="84" {...limb} />
          <line x1="118" y1="45" x2="96" y2="52" {...limb} />
          {dot(124, 42, 4.5)}{dot(46, 70, 4.5)}{dot(28, 84)}{dot(96, 52)}
        </g>
      </>);

    /* -------- SUPINE: leg raise (straight legs lift) -------- */
    case 'legraise':
      return wrap('0 0 160 100', <>
        {floorLine(10, 90, 150)}
        <g id="figure">
          {head(18, 78, 9)}
          <line x1="26" y1="82" x2="66" y2="82" {...body} />
          <line x1="38" y1="82" x2="34" y2="88" {...limb} />
          {dot(26, 82, 4.5)}{dot(66, 82, 4.5)}
          <g id="legGroup">
            <line x1="66" y1="82" x2="82" y2="46" {...limb} />
            <line x1="82" y1="46" x2="82" y2="30" {...limb} />
            {dot(82, 46, 4.5)}{dot(82, 30)}
          </g>
        </g>
      </>);

    /* -------- SUPINE: flutter kicks (alternating beat) -------- */
    case 'flutterkick':
      return wrap('0 0 160 100', <>
        {floorLine(10, 90, 150)}
        <g id="figure">
          {head(18, 78, 9)}
          <line x1="26" y1="82" x2="66" y2="82" {...body} />
          <line x1="38" y1="82" x2="34" y2="88" {...limb} />
          {dot(26, 82, 4.5)}{dot(66, 82, 4.5)}
          <g id="legGroup">
            <line x1="66" y1="82" x2="90" y2="66" {...limb} />
            <line x1="90" y1="66" x2="106" y2="62" {...limb} />
            {dot(90, 66, 4.5)}{dot(106, 62)}
          </g>
        </g>
      </>);

    /* -------- SUPINE: dead bug (opposite arm/leg reach) -------- */
    case 'deadbug':
      return wrap('0 0 160 100', <>
        {floorLine(10, 90, 150)}
        <g id="figure">
          {head(18, 78, 9)}
          <line x1="26" y1="82" x2="70" y2="82" {...body} />
          {dot(26, 82, 4.5)}{dot(70, 82, 4.5)}
          <g id="dbArmL"><line x1="40" y1="82" x2="54" y2="60" {...limb} />{dot(54, 60)}</g>
          <g id="dbArmR"><line x1="58" y1="82" x2="76" y2="92" {...limb} />{dot(76, 92)}</g>
          <g id="dbLegL"><line x1="70" y1="82" x2="98" y2="88" {...limb} />{dot(98, 88)}</g>
          <g id="dbLegR"><line x1="70" y1="82" x2="88" y2="58" {...limb} />{dot(88, 58)}</g>
        </g>
      </>);

    /* -------- SEATED: V-up (torso folds to raised legs) -------- */
    case 'vup':
      return wrap('0 0 120 120', <>
        {floorLine(8, 108, 112)}
        <g id="figure">
          {head(60, 30, 9)}
          <line x1="60" y1="39" x2="60" y2="78" {...body} />
          <line x1="60" y1="52" x2="36" y2="64" {...limb} />
          <line x1="60" y1="52" x2="84" y2="64" {...limb} />
          <polyline points="60,78 52,96 44,106" fill="none" {...limb} />
          <polyline points="60,78 68,96 76,106" fill="none" {...limb} />
          {dot(60, 52, 4.5)}{dot(60, 78, 4.5)}{dot(36, 64)}{dot(84, 64)}{dot(44, 106)}{dot(76, 106)}
        </g>
      </>);

    /* -------- HORIZONTAL: plank jack (feet jump apart/together) -------- */
    case 'plankjack':
      return wrap('0 0 160 100', <>
        {floorLine(10, 88, 150)}
        <g id="figure">
          {head(136, 42, 9)}
          <line x1="128" y1="45" x2="60" y2="51" {...body} />
          <line x1="124" y1="47" x2="120" y2="86" {...limb} />
          <line id="legR" x1="62" y1="51" x2="28" y2="86" {...limb} />
          <line id="legL" x1="60" y1="51" x2="44" y2="86" {...limb} />
          {dot(124, 47, 4.5)}{dot(60, 51, 4.5)}{dot(120, 86)}{dot(28, 86)}{dot(44, 86)}
        </g>
      </>);

    /* -------- STANDING: skater (lateral bounding hop) -------- */
    case 'skater':
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        {groundShadow(50, 133)}
        <g id="figure">
          {head(50, 20)}
          <line x1="50" y1="30" x2="50" y2="80" {...body} />
          <line id="armL" x1="50" y1="40" x2="30" y2="56" {...limb} />
          <line id="armR" x1="50" y1="40" x2="70" y2="56" {...limb} />
          <line id="legL" x1="50" y1="80" x2="34" y2="125" {...limb} />
          <line id="legR" x1="50" y1="80" x2="66" y2="125" {...limb} />
          {dot(50, 40, 4.5)}{dot(50, 80, 4.5)}{dot(30, 56)}{dot(70, 56)}{dot(34, 125)}{dot(66, 125)}
        </g>
      </>);

    /* -------- SUPINE: heel taps (alternate reach to each side) -------- */
    case 'heeltap':
      return wrap('0 0 160 100', <>
        {floorLine(10, 92, 150)}
        <g id="figure">
          {head(24, 78, 9)}
          <line x1="32" y1="82" x2="76" y2="82" {...body} />
          {dot(32, 82, 4.5)}{dot(76, 82, 4.5)}
          <polyline points="76,82 92,66 108,74" fill="none" {...limb} />
          <polyline points="76,82 96,70 112,76" fill="none" {...limb} />
          {dot(92, 66, 4.5)}{dot(108, 74)}{dot(96, 70, 4.5)}{dot(112, 76)}
          <g id="htL"><line x1="40" y1="82" x2="56" y2="80" {...limb} />{dot(56, 80)}</g>
          <g id="htR"><line x1="54" y1="82" x2="70" y2="80" {...limb} />{dot(70, 80)}</g>
        </g>
      </>);

    default:
      return wrap('0 0 100 140', <>
        {floorLine(8, 134, 92)}
        <g id="figure">
          {head(50, 20)}
          <line x1="50" y1="30" x2="50" y2="80" {...body} />
          <line x1="50" y1="40" x2="30" y2="56" {...limb} />
          <line x1="50" y1="40" x2="70" y2="56" {...limb} />
          <line x1="50" y1="80" x2="34" y2="123" {...limb} />
          <line x1="50" y1="80" x2="66" y2="123" {...limb} />
        </g>
      </>);
  }
}

/* ================= EXERCISE MEDIA (real clip when available, else drawn pictogram) ================= */
let _mediaPromise = null;
function getMediaMap() {
  if (!_mediaPromise) _mediaPromise = import('./media.js').then(m => ({ b64: m.VIDEO_B64, files: m.VIDEO_FILES }));
  return _mediaPromise;
}
function ExerciseMedia({ exerciseId, pose, color = BLAZE, size = '100%', rounded = 10 }) {
  const [src, setSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSrc(null);
    setVideoSrc(null);
    setFailed(false);
    getMediaMap()
      .then(({ b64, files }) => {
        if (cancelled) return;
        const clip = files[exerciseId] || files[pose] || null;
        setVideoSrc(clip);
        if (!clip) setSrc(b64[exerciseId] || b64[pose] || null);
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [exerciseId]);

  if (videoSrc && !failed) {
    return (
      <video src={videoSrc} autoPlay muted loop playsInline preload="metadata"
        onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'contain', borderRadius: rounded, display: 'block', background: INK }} />
    );
  }
  if (src && !failed) {
    return (
      <img src={src} alt="" onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: rounded, display: 'block', background: INK }} />
    );
  }
  return <ExerciseFigure pose={pose} color={color} size={size} />;
}
function ProgressRing({ progress, size = 240, stroke = 12, color, comet = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)));
  const gradId = `ring-grad-${color.replace('#', '')}`;
  const angle = Math.max(0.001, Math.min(0.999, progress)) * 2 * Math.PI;
  const dotX = size / 2 + radius * Math.sin(angle);
  const dotY = size / 2 - radius * Math.cos(angle);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 10px ${color}55)` }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={OLIVE_DARK} strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={`url(#${gradId})`} strokeWidth={stroke} fill="none"
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s linear' }} />
      {comet && progress > 0 && (<>
        <circle cx={dotX} cy={dotY} r={stroke * 2} fill={color} opacity="0.15" />
        <circle className="o40-comet" cx={dotX} cy={dotY} r={stroke * 0.8} fill={PAPER} />
      </>)}
    </svg>
  );
}

function EqBars({ tone = BLAZE, bars = 5, speed = 1, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 14, ...style }} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className="o40-eqbar" style={{
          width: 3, background: tone, height: 8,
          animation: `eqPulse ${(0.55 + (i % 3) * 0.18) / speed}s ease-in-out ${i * 0.08}s infinite`,
        }} />
      ))}
    </div>
  );
}

function CountUp({ value, duration = 600 }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    prevRef.current = to;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{display}</>;
}

function SegmentedProgress({ total, current, currentProgress, color }) {
  return (
    <div style={{ display: 'flex', gap: 4, width: '100%' }}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 3, background: isDone || isActive ? color : OLIVE_DARK,
            opacity: isActive ? 0.5 + 0.5 * currentProgress : 1, transition: 'opacity 0.3s linear, background 0.3s ease',
            boxShadow: isDone || isActive ? `0 0 8px ${color}66` : 'none',
          }} />
        );
      })}
    </div>
  );
}

/* ================= SMALL UI PIECES ================= */
function DogTag({ label, value, sub }) {
  const numeric = typeof value === 'number';
  return (
    <div className="o40-card" style={{
      background: `linear-gradient(160deg, ${INK_2}, ${INK})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '12px 13px',
      position: 'relative', flex: 1, minWidth: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
    }}>
      <div style={{ position: 'absolute', top: 9, left: -5, width: 10, height: 10, borderRadius: '50%', background: INK, border: `2px solid ${KHAKI}` }} />
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 26, lineHeight: 1.1 }}>{numeric ? <CountUp value={value} /> : value}</div>
      {sub && <div style={{ color: STEEL, fontSize: 11 }}>{sub}</div>}
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  const { t } = useT();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'max(14px, env(safe-area-inset-top, 0px)) 16px',
      borderBottom: `1px solid ${OLIVE_DARK}`, background: `${INK}ee`, backdropFilter: 'blur(6px)',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 32 }}>
        {onBack && (
          <button onClick={onBack} aria-label={t('app.back')} style={btnIcon}>
            <ChevronLeft size={20} color={PAPER} />
          </button>
        )}
      </div>
      <div className="o40-display" style={{ color: PAPER, fontSize: 22 }}>{title}</div>
      <div style={{ minWidth: 32, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

const btnIcon = { background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 10 };

function BottomNav({ active, onNavigate }) {
  const { t } = useT();
  const tabs = [
    { key: 'home', label: t('nav.home'), icon: HomeIcon },
    { key: 'library', label: t('nav.library'), icon: BookOpen },
    { key: 'history', label: t('nav.history'), icon: HistoryIcon },
    { key: 'setup', label: t('nav.setup'), icon: Settings },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: `1px solid ${OLIVE_DARK}`, background: `${INK}ee`, backdropFilter: 'blur(6px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {tabs.map(t => {
        const on = active === t.key;
        const Icon = t.icon;
        return (
          <button key={t.key} onClick={() => onNavigate(t.key)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 4px 6px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative',
          }}>
            {on && <div style={{ position: 'absolute', top: 0, left: '26%', right: '26%', height: 2, borderRadius: 2, background: BLAZE, boxShadow: `0 0 8px ${BLAZE}` }} />}
            <div style={{
              width: 40, height: 26, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: on ? `${BLAZE}22` : 'transparent', transition: 'background 0.2s ease',
              animation: on ? 'tabPop 0.28s cubic-bezier(0.16,1,0.3,1)' : 'none',
            }}>
              <Icon size={20} color={on ? BLAZE : STEEL} style={{ transition: 'color 0.2s ease' }} />
            </div>
            <span className="o40-mono" style={{ color: on ? BLAZE : STEEL, fontSize: 9.5, letterSpacing: '0.03em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  const [screen, setScreen] = useState('loading');
  const [profile, setProfile] = useState(null);
  const [lang, setLang] = useState(detectLang());
  const t = useCallback((key, vars) => translate(key, lang, vars), [lang]);
  async function handleSetLang(l) {
    if (!LANGS.includes(l)) return;
    setLang(l);
    if (profile) {
      const p = { ...profile, lang: l };
      setProfile(p);
      try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    }
  }
  const [sessions, setSessions] = useState([]);
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formWaist, setFormWaist] = useState('');
  const [previewProgram, setPreviewProgram] = useState(null);

  const [activeProgram, setActiveProgram] = useState(null);
  const [seq, setSeq] = useState([]);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [musicTrack, setMusicTrack] = useState(DEFAULT_TRACK);
  const [musicVolume, setMusicVolume] = useState(0.55);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [customPrograms, setCustomPrograms] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const [healthWeightSuggestion, setHealthWeightSuggestion] = useState(null);
  const [healthImportStatus, setHealthImportStatus] = useState('idle');

  const [lastStats, setLastStats] = useState(null);
  const [hrInput, setHrInput] = useState('');
  const [waistInput, setWaistInput] = useState('');
  const [rpe, setRpe] = useState(null);
  const [notes, setNotes] = useState('');
  const [waistHistory, setWaistHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [weightInput, setWeightInput] = useState('');
  const soundRef = useRef(true);
  soundRef.current = soundOn;
  const vibrationRef = useRef(true);
  vibrationRef.current = vibrationOn;

  function showToast(message) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }

  // ---- load persisted data ----
  useEffect(() => {
    (async () => {
      let p = null, s = [], cp = [], wh = [];
      try {
        const r = await window.storage.get('o40_profile', false);
        if (r) p = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('o40_sessions', false);
        if (r) s = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('o40_custom_programs', false);
        if (r) cp = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      try {
        const r = await window.storage.get('o40_waist', false);
        if (r) wh = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      let wt = null;
      try {
        const r = await window.storage.get('o40_weight', false);
        if (r) wt = JSON.parse(r.value);
      } catch (e) { /* not set yet */ }
      setProfile(p);
      setSessions(s || []);
      setCustomPrograms(cp || []);
      setWaistHistory(wh || []);
      setWeightHistory(wt || []);
      if (p) {
        setLang((p.lang && LANGS.includes(p.lang) && p.lang) || detectLang());
        setFormName(p.name); setFormAge(String(p.age)); setFormWeight(String(p.weight));
        setSoundOn(p.soundOn !== false);
        setVibrationOn(p.vibrationOn !== false);
        setMusicOn(p.musicOn === true);
        setMusicTrack(p.musicTrack || DEFAULT_TRACK);
        if (typeof p.musicVolume === 'number') setMusicVolume(p.musicVolume);
      }
      setScreen(p ? 'home' : 'setup');
    })();
  }, []);

  // ---- tap sound on every button, app-wide ----
  useEffect(() => {
    function handleClick(e) {
      if (e.target.closest('button') && soundRef.current) playClick();
    }
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // ---- auto-pause the session if the app is backgrounded ----
  useEffect(() => {
    function onVisibility() {
      if (document.hidden && screen === 'session') setPaused(true);
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [screen]);

  // ---- motivational music: plays while on, adapts volume to the phase ----
  useEffect(() => {
    musicSetShouldPlay(!!musicOn);
    if (!musicOn) { musicPause(); return; }
    musicLoad(trackSrc(musicTrack));
    let vol = musicVolume;
    if (screen === 'session') {
      const ph = seq[phaseIdx];
      if (ph) {
        if (ph.type === 'rest' || ph.type === 'cooldown') vol *= 0.45;
        else if (ph.type === 'warmup') vol *= 0.75;
      }
      if (paused) vol *= 0.25;
    } else {
      vol *= 0.45;
    }
    musicSetVolume(vol);
    musicPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicOn, screen, musicTrack, phaseIdx, paused, musicVolume, seq]);

  // ---- session countdown ----
  useEffect(() => {
    if (screen !== 'session' || paused) return;
    if (secondsLeft <= 0) {
      advancePhase();
      return;
    }
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [screen, paused, secondsLeft]);

  function announcePhase(phase) {
    if (!soundRef.current) return;
    if (phase.type === 'work') speak(tr(EXERCISES[phase.exerciseId].name, lang));
    else if (phase.type === 'rest') speak(t('ses.rest'));
    else if (phase.type === 'cooldown') speak(t('ses.cooldown'));
  }

  function advancePhase() {
    const nextIdx = phaseIdx + 1;
    if (nextIdx >= seq.length) {
      finishSession();
      return;
    }
    if (soundRef.current) playBeep(seq[nextIdx].type === 'work' ? 880 : 440);
    if (vibrationRef.current) vibrate(seq[nextIdx].type === 'work' ? [60] : [30, 40, 30]);
    announcePhase(seq[nextIdx]);
    setPhaseIdx(nextIdx);
    setSecondsLeft(seq[nextIdx].duration);
  }

  function goPrev() {
    if (phaseIdx <= 0) return;
    const idx = phaseIdx - 1;
    if (soundRef.current) playBeep(440);
    announcePhase(seq[idx]);
    setPhaseIdx(idx);
    setSecondsLeft(seq[idx].duration);
  }

  function startSession(program) {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const s = buildSequence(program, skip, preset.work, preset.rest);
    setActiveProgram(program);
    setSeq(s);
    setPhaseIdx(0);
    setSecondsLeft(s[0].duration);
    setPaused(false);
    setRpe(null);
    if (soundRef.current) { playBeep(660); announcePhase(s[0]); }
    setScreen('session');
  }

  function finishSession() {
    const skip = !!profile.skipWarmup;
    const preset = levelPreset(profile);
    const kcal = Math.round(estimateProgramKcal(activeProgram, profile.weight, skip, preset.work, preset.rest));
    if (soundRef.current) playBeep(1000, 0.25);
    if (vibrationRef.current) vibrate([80, 60, 80, 60, 150]);
    setLastStats({ program: activeProgram, kcal, durationSec: totalSeqSeconds(activeProgram, skip, preset.work, preset.rest) });
    setScreen('summary');
  }

  async function saveProfile() {
    const prevLevel = profile && (profile.level || (profile.intervalPreset === 'breve' ? 'recluta' : profile.intervalPreset === 'lungo' ? 'elite' : 'combattente'));
    const p = {
      name: formName.trim() || 'Operatore',
      age: Math.max(18, Math.min(90, parseInt(formAge, 10) || 40)),
      weight: Math.max(40, Math.min(180, parseInt(formWeight, 10) || 80)),
      weeklyGoal: (profile && profile.weeklyGoal) || WEEKLY_GOAL,
      soundOn: profile ? profile.soundOn !== false : true,
      vibrationOn: profile ? profile.vibrationOn !== false : true,
      musicOn: profile ? profile.musicOn === true : false,
      musicTrack: (profile && profile.musicTrack) || DEFAULT_TRACK,
      musicVolume: typeof (profile && profile.musicVolume) === 'number' ? profile.musicVolume : 0.55,
      skipWarmup: profile ? !!profile.skipWarmup : false,
      seenIntro: profile ? !!profile.seenIntro : false,
      intervalPreset: (profile && profile.intervalPreset) || 'standard',
      level: prevLevel || 'combattente',
      lang: lang,
      campStart: profile && profile.campStart ? profile.campStart : new Date().toISOString(),
    };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    if (formWaist) {
      const cm = Math.max(40, Math.min(200, parseInt(formWaist, 10)));
      if (!isNaN(cm)) await recordWaist(cm);
    }
    setScreen('home');
  }

  async function recordWaist(cm) {
    const latest = waistHistory.length ? waistHistory[waistHistory.length - 1] : null;
    if (latest && latest.cm === cm && dayKey(new Date(latest.date)) === dayKey(new Date())) return;
    const updated = [...waistHistory, { date: new Date().toISOString(), cm }];
    setWaistHistory(updated);
    try { await window.storage.set('o40_waist', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
  }

  async function recordWeight(kg) {
    const latest = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
    if (latest && latest.kg === kg && dayKey(new Date(latest.date)) === dayKey(new Date())) return;
    const updated = [...weightHistory, { date: new Date().toISOString(), kg }];
    setWeightHistory(updated);
    try { await window.storage.set('o40_weight', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
  }

  async function applyLevel(key) {
    const next = getLevel(key);
    const p = { ...profile, level: next.key, intervalPreset: next.preset };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function promoteLevel() {
    const cur = getLevel(profile.level || 'combattente');
    const idx = LEVELS.indexOf(cur);
    if (idx >= LEVELS.length - 1) return;
    const next = LEVELS[idx + 1];
    await applyLevel(next.key);
    showToast(t('toast.level.up', { label: tr(next.label, lang) }));
  }

  async function toggleSkipWarmup() {
    const p = { ...profile, skipWarmup: !profile.skipWarmup };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function setIntervalPreset(key) {
    const p = { ...profile, intervalPreset: key };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function dismissIntro() {
    const p = { ...profile, seenIntro: true };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function updateWeeklyGoal(n) {
    const p = { ...profile, weeklyGoal: Math.max(1, Math.min(7, n)) };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    const p = { ...profile, soundOn: next };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function toggleVibration() {
    const next = !vibrationOn;
    setVibrationOn(next);
    if (next) vibrate([40]);
    const p = { ...profile, vibrationOn: next };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  function trackSrc(id) {
    const t = TRACKS.find(x => x.id === id);
    return (t || TRACKS[0]).src;
  }

  async function toggleMusic() {
    const next = !musicOn;
    setMusicOn(next);
    const p = { ...profile, musicOn: next };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    musicSetShouldPlay(next);
    if (next) {
      musicLoad(trackSrc(musicTrack));
      musicSetVolume(musicVolume);
      musicPlay();
    } else {
      musicPause();
    }
  }

  async function selectMusicTrack(id) {
    setMusicTrack(id);
    const p = { ...profile, musicTrack: id };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    if (musicOn) {
      musicLoad(trackSrc(id));
      musicSetVolume(musicVolume);
      musicPlay();
    }
  }

  async function changeMusicVolume(v) {
    setMusicVolume(v);
    musicSetVolume(v);
    const p = { ...profile, musicVolume: v };
    setProfile(p);
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
  }

  async function saveSession() {
    const prevBest = computeBestStreak(sessions);
    const prevCount = sessions.length;
    const weekAgo = Date.now() - 7 * 86400000;
    const prevWeekCount = sessions.filter(s => new Date(s.date).getTime() > weekAgo).length;
    const goal = profile.weeklyGoal || WEEKLY_GOAL;

    const record = {
      date: new Date().toISOString(),
      programId: activeProgram.id,
      programName: tr(activeProgram.name, lang),
      kcal: lastStats.kcal,
      durationSec: lastStats.durationSec,
      peakHR: hrInput ? parseInt(hrInput, 10) : null,
      rpe: rpe,
      notes: notes.trim() || null,
    };
    const updated = [...sessions, record];
    setSessions(updated);
    try { await window.storage.set('o40_sessions', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    if (waistInput) {
      const cm = Math.max(40, Math.min(200, parseInt(waistInput, 10)));
      if (!isNaN(cm)) await recordWaist(cm);
    }
    if (weightInput) {
      const kg = Math.round(parseFloat(weightInput.replace(',', '.')) * 10) / 10;
      if (!isNaN(kg)) await recordWeight(Math.max(35, Math.min(250, kg)));
    }
    setHrInput('');
    setWaistInput('');
    setWeightInput('');
    setRpe(null);
    setNotes('');
    setScreen('home');

    const newBest = computeBestStreak(updated);
    const newCount = updated.length;
    const newWeekCount = updated.filter(s => new Date(s.date).getTime() > weekAgo).length;
    const newStreakBadge = STREAK_BADGES.find(n => newBest >= n && prevBest < n);
    const newSessionBadge = SESSION_BADGES.find(n => newCount >= n && prevCount < n);
    const rank = getRank(newCount);
    const prevRank = getRank(prevCount);
    if (rank.current.name !== prevRank.current.name) {
      showToast(t('toast.promoted', { rank: tr(rank.current.name, lang) }));
    } else if (newStreakBadge) {
      showToast(t('toast.milestone.streak', { n: newStreakBadge }));
    } else if (newSessionBadge) {
      showToast(t('toast.milestone.sessions', { n: newSessionBadge }));
    } else if (newWeekCount >= goal && prevWeekCount < goal) {
      showToast(t('toast.goal'));
    } else {
      showToast(t('toast.saved'));
    }
  }

  async function clearHistory() {
    setSessions([]);
    try { await window.storage.set('o40_sessions', JSON.stringify([]), false); } catch (e) { /* best effort */ }
    showToast(t('toast.history'));
  }

  async function deleteSession(date) {
    const updated = sessions.filter(s => s.date !== date);
    setSessions(updated);
    try { await window.storage.set('o40_sessions', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    showToast(t('toast.removed'));
  }

  async function createCustomProgram(program) {
    const updated = [...customPrograms, program];
    setCustomPrograms(updated);
    try { await window.storage.set('o40_custom_programs', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
    setPreviewProgram(program);
    setScreen('preview');
    showToast(t('toast.created'));
  }

  async function deleteCustomProgram(id) {
    const updated = customPrograms.filter(p => p.id !== id);
    setCustomPrograms(updated);
    try { await window.storage.set('o40_custom_programs', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
  }

  async function importAppleHealth(file) {
    setHealthImportStatus('reading');
    try {
      const text = await file.text();
      setHealthImportStatus('parsing');
      const parsed = parseAppleHealthExport(text);

      const existingImportDates = new Set(sessions.filter(s => s.imported).map(s => s.date));
      const newRecords = [];
      for (const w of parsed.workouts) {
        const d = parseAppleDate(w.startDate);
        if (!d) continue;
        const iso = d.toISOString();
        if (existingImportDates.has(iso)) continue;
        existingImportDates.add(iso);
        newRecords.push({
          date: iso,
          programId: 'health-import',
          programName: tr(HK_ACTIVITY_MAP[w.type] || HK_FALLBACK, lang),
          kcal: w.kcal,
          peakHR: null,
          rpe: null,
          notes: null,
          imported: true,
        });
      }

      if (newRecords.length) {
        const updated = [...sessions, ...newRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
        setSessions(updated);
        try { await window.storage.set('o40_sessions', JSON.stringify(updated), false); } catch (e) { /* best effort */ }
      }

      if (parsed.weightKg) {
        setHealthWeightSuggestion({ kg: Math.round(parsed.weightKg * 10) / 10, date: parsed.weightDate });
      }

      setHealthImportStatus('done');
      showToast(newRecords.length ? t('toast.imported', { n: newRecords.length }) : t('toast.imported.none'));
    } catch (e) {
      setHealthImportStatus('error');
      showToast(t('toast.import.fail'));
    }
  }

  async function applyHealthWeight() {
    if (!healthWeightSuggestion) return;
    const p = { ...profile, weight: Math.round(healthWeightSuggestion.kg) };
    setProfile(p);
    setFormWeight(String(p.weight));
    try { await window.storage.set('o40_profile', JSON.stringify(p), false); } catch (e) { /* best effort */ }
    setHealthWeightSuggestion(null);
    showToast(t('toast.weight'));
  }


  /* ---------------- RENDER ---------------- */
  const shell = { minHeight: '100dvh', background: INK, display: 'flex', justifyContent: 'center' };
  const phone = { width: '100%', maxWidth: 460, minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' };

  if (screen === 'loading') {
    return (
      <LangContext.Provider value={{ lang, t, setLang: handleSetLang }}>
        <div className="o40" style={{ ...shell, alignItems: 'center', justifyContent: 'center' }}>
          <style>{STYLES}</style>
          <div style={{ textAlign: 'center', width: 'min(320px, 82vw)' }}>
            <div className="o40-display" style={{ color: KHAKI, fontSize: 26 }}>{t('app.loading')} <span className="o40-blink" style={{ color: BLAZE }}>{t('app.loading.operativo')}</span>…</div>
            <div className="o40-loadbar" style={{ height: 6, marginTop: 16 }}><span /></div>
          </div>
        </div>
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={{ lang, t, setLang: handleSetLang }}>
      <div className="o40" style={{ ...shell, position: 'relative' }}>
      <style>{STYLES}</style>
      <div className="o40-aura" />
      <div className="o40-phone" style={phone}>
        <div className="o40-gridbg" />
        <div className="o40-camo" style={{ height: 6 }} />

        {screen === 'setup' && (
          <SetupScreen
            formName={formName} setFormName={setFormName}
            formAge={formAge} setFormAge={setFormAge}
            formWeight={formWeight} setFormWeight={setFormWeight}
            formWaist={formWaist} setFormWaist={setFormWaist}
            onSave={saveProfile}
            canCancel={!!profile}
            onCancel={() => setScreen('home')}
            soundOn={soundOn} onToggleSound={toggleSound}
            vibrationOn={vibrationOn} onToggleVibration={toggleVibration}
            musicOn={musicOn} onToggleMusic={toggleMusic}
            musicTrack={musicTrack} onSelectTrack={selectMusicTrack}
            musicVolume={musicVolume} onChangeMusicVolume={changeMusicVolume}
            skipWarmup={!!(profile && profile.skipWarmup)} onToggleSkipWarmup={toggleSkipWarmup}
            level={(profile && (profile.level || (profile.intervalPreset === 'breve' ? 'recluta' : profile.intervalPreset === 'lungo' ? 'elite' : 'combattente'))) || 'combattente'}
            onSetLevel={applyLevel}
            intervalPreset={(profile && profile.intervalPreset) || 'standard'} onSetIntervalPreset={setIntervalPreset}
            onImportHealth={importAppleHealth} healthImportStatus={healthImportStatus}
            healthWeightSuggestion={healthWeightSuggestion} onApplyHealthWeight={applyHealthWeight}
          />
        )}

        {screen === 'home' && profile && (
          <HomeScreen
            profile={profile} sessions={sessions} customPrograms={customPrograms}
            waistHistory={waistHistory} weightHistory={weightHistory}
            onOpenProgram={(p) => { setPreviewProgram(p); setScreen('preview'); }}
            onBuild={() => setScreen('builder')}
            onDeleteCustom={deleteCustomProgram}
            onDismissIntro={dismissIntro}
            onPromote={promoteLevel}
          />
        )}

        {screen === 'library' && (
          <LibraryScreen />
        )}

        {screen === 'builder' && (
          <BuilderScreen
            profile={profile}
            onCancel={() => setScreen('home')}
            onCreate={createCustomProgram}
          />
        )}

        {screen === 'preview' && previewProgram && (
          <PreviewScreen
            program={previewProgram} profile={profile} soundOn={soundOn}
            onBack={() => setScreen('home')}
            onStart={() => setScreen('countdown')}
          />
        )}

        {screen === 'countdown' && previewProgram && (
          <CountdownScreen program={previewProgram} onDone={() => startSession(previewProgram)} />
        )}

        {screen === 'session' && seq.length > 0 && (
          <SessionScreen
            program={activeProgram} seq={seq} phaseIdx={phaseIdx} secondsLeft={secondsLeft}
            paused={paused} setPaused={setPaused} soundOn={soundOn} setSoundOn={setSoundOn}
            musicOn={musicOn} onToggleMusic={toggleMusic}
            onSkip={advancePhase} onPrev={goPrev} exitConfirm={exitConfirm} setExitConfirm={setExitConfirm}
            onExit={() => { setExitConfirm(false); setScreen('home'); }}
          />
        )}

        {screen === 'summary' && lastStats && (
          <SummaryScreen
            stats={lastStats} profile={profile} hrInput={hrInput} setHrInput={setHrInput}
            waistInput={waistInput} setWaistInput={setWaistInput}
            weightInput={weightInput} setWeightInput={setWeightInput}
            rpe={rpe} setRpe={setRpe} notes={notes} setNotes={setNotes}
            onSave={saveSession}
          />
        )}

        {screen === 'history' && (
          <HistoryScreen
            sessions={sessions} profile={profile} waistHistory={waistHistory} weightHistory={weightHistory}
            onBack={() => setScreen('home')}
            onClear={clearHistory}
            onUpdateGoal={updateWeeklyGoal}
            onDeleteSession={deleteSession}
          />
        )}

        {['home', 'library', 'history', 'setup'].includes(screen) && (
          <BottomNav active={screen} onNavigate={setScreen} />
        )}

        {toast && (
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 20, zIndex: 20,
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div className="o40-toast-in" style={{
              background: `linear-gradient(135deg, ${OLIVE}, ${OLIVE_DARK})`, border: `1px solid ${BLAZE}`,
              borderRadius: 12, padding: '10px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              color: PAPER, fontSize: 13, fontWeight: 600, textAlign: 'center', maxWidth: '100%',
            }}>
              {toast}
            </div>
          </div>
        )}
      </div>
      </div>
    </LangContext.Provider>
  );
}

/* ================= COUNTDOWN SCREEN (3-2-1 before the mission starts) ================= */
function CountdownScreen({ program, onDone }) {
  const { lang, t } = useT();
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n <= 0) { onDone(); return; }
    playBeep(n === 1 ? 880 : 550, 0.15);
    const t = setTimeout(() => setN(v => v - 1), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [n]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 13, letterSpacing: '0.15em' }}>{tr(program.name, lang)}</div>
      <div className="o40-display" style={{ color: BLAZE, fontSize: 110, lineHeight: 1 }}>{n > 0 ? n : t('countdown.go')}</div>
      <div style={{ color: STEEL, fontSize: 13 }}>{t('countdown.getReady')}</div>
    </div>
  );
}

/* ================= SETUP SCREEN ================= */
function SetupScreen({ formName, setFormName, formAge, setFormAge, formWeight, setFormWeight, formWaist, setFormWaist, onSave, canCancel, onCancel, soundOn, onToggleSound, vibrationOn, onToggleVibration, musicOn, onToggleMusic, musicTrack, onSelectTrack, musicVolume, onChangeMusicVolume, skipWarmup, onToggleSkipWarmup, level, onSetLevel, intervalPreset, onSetIntervalPreset, onImportHealth, healthImportStatus, healthWeightSuggestion, onApplyHealthWeight }) {
  const { lang, t, setLang } = useT();
  const curLevel = getLevel(level || 'combattente');
  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('setup.title')} onBack={canCancel ? onCancel : null} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              flex: 1, padding: '9px 0', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
              background: lang === l ? OLIVE_DARK : INK, border: `1px solid ${lang === l ? BLAZE : OLIVE}`,
              color: lang === l ? BLAZE : KHAKI, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
            }}>
              {l === 'it' ? 'ITALIANO' : l === 'en' ? 'ENGLISH' : 'DEUTSCH'}
            </button>
          ))}
        </div>
        <p style={{ color: STEEL, fontSize: 14, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t('setup.intro') }} />
        <Field label={t('setup.name')}>
          <input value={formName} onChange={e => setFormName(e.target.value)} placeholder={t('setup.name.ph')}
            className="o40-input" style={inputStyle} />
        </Field>
        <Field label={t('setup.age')}>
          <input value={formAge} onChange={e => setFormAge(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder="40" className="o40-input" style={inputStyle} />
        </Field>
        <Field label={t('setup.weight')}>
          <input value={formWeight} onChange={e => setFormWeight(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder="82" className="o40-input" style={inputStyle} />
        </Field>
        <Field label={t('setup.waist')}>
          <input value={formWaist} onChange={e => setFormWaist(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder={t('setup.waist.ph')} className="o40-input" style={inputStyle} />
        </Field>

        {canCancel && (
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 4 }}>
            <ToggleRow label={t('setup.sounds')} icon={soundOn ? Volume2 : VolumeX} on={soundOn} onClick={onToggleSound} />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow label={t('setup.vibration')} icon={Vibrate} on={vibrationOn} onClick={onToggleVibration} />
            <div style={{ height: 1, background: OLIVE_DARK, margin: '0 12px' }} />
            <ToggleRow label={t('setup.skip')} icon={SkipForward} on={skipWarmup} onClick={onToggleSkipWarmup} />
          </div>
        )}

        {canCancel && (
          <div className="o40-sheen" style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 4, position: 'relative', overflow: 'hidden' }}>
            <ToggleRow label={t('setup.music')} icon={musicOn ? Music2 : HeadphoneOff} on={musicOn} onClick={onToggleMusic} />
            {musicOn && (
              <div style={{ padding: '8px 10px 12px' }}>
                <div style={{ color: STEEL, fontSize: 11.5, marginBottom: 8 }}>{t('setup.music.pick')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {TRACKS.map(track => {
                    const on = musicTrack === track.id;
                    return (
                      <button key={track.id} onClick={() => onSelectTrack(track.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
                        textAlign: 'left', background: on ? OLIVE_DARK : INK, border: `1px solid ${on ? BLAZE : OLIVE}`,
                      }}>
                        {on ? <Music2 size={15} color={BLAZE} /> : <Music size={15} color={STEEL} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span className="o40-mono" style={{ color: PAPER, fontSize: 12 }}>{track.name}</span>
                            <span className="o40-mono" style={{ fontSize: 9, color: track.lang === 'IT' ? '#7FB069' : track.lang === 'DE' ? '#D9B34C' : STEEL, border: `1px solid ${track.lang === 'IT' ? '#7FB06966' : track.lang === 'DE' ? '#D9B34C66' : `${STEEL}44`}`, borderRadius: 4, padding: '0 4px' }}>{track.lang}</span>
                          </div>
                          <div style={{ color: STEEL, fontSize: 10.5 }}>{track.artist} · {track.tag} · 2:00</div>
                        </div>
                        <span className="o40-mono" style={{ color: on ? BLAZE : KHAKI, fontSize: 10 }}>{on ? t('setup.music.playing') : t('setup.music.listen')}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Volume2 size={15} color={KHAKI} />
                  <input type="range" min={0} max={100} value={Math.round(musicVolume * 100)}
                    onChange={e => onChangeMusicVolume(e.target.value / 100)}
                    style={{ flex: 1, accentColor: BLAZE }} />
                </div>
                <div style={{ marginTop: 8, color: STEEL, fontSize: 10, lineHeight: 1.4 }}>
                  {t('setup.music.note')}
                </div>
              </div>
            )}
          </div>
        )}

        {canCancel && (
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              {t('setup.level')}
            </div>
            <div style={{ color: STEEL, fontSize: 11.5, marginBottom: 10 }}>{t('setup.level.hint')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LEVELS.map(l => (
                <button key={l.key} onClick={() => onSetLevel(l.key)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                  background: curLevel.key === l.key ? OLIVE_DARK : INK, border: `1px solid ${curLevel.key === l.key ? BLAZE : OLIVE}`,
                }}>
                  {curLevel.key === l.key ? <Crown size={15} color={BLAZE} /> : <Medal size={15} color={STEEL} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="o40-mono" style={{ color: PAPER, fontSize: 12.5 }}>{tr(l.label, lang)}</div>
                    <div style={{ color: STEEL, fontSize: 11 }}>{tr(l.desc, lang)}</div>
                  </div>
                  <span className="o40-mono" style={{ color: curLevel.key === l.key ? BLAZE : KHAKI, fontSize: 11 }}>{l.work}\u2033/{l.rest}\u2033</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {canCancel && (
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {t('setup.health')}
            </div>
            <div style={{ color: STEEL, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: t('setup.health.body') }} />
            <label style={{
              ...secondaryBtn, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', width: '100%',
            }}>
              {healthImportStatus === 'reading' || healthImportStatus === 'parsing' ? t('setup.health.processing') : t('setup.health.upload')}
              <input type="file" accept=".xml" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files && e.target.files[0]; if (f) onImportHealth(f); e.target.value = ''; }} />
            </label>
            {healthImportStatus === 'error' && (
              <div style={{ color: BLAZE, fontSize: 11.5, marginTop: 8 }}>{t('setup.health.error')}</div>
            )}
            {healthWeightSuggestion && (
              <div style={{ marginTop: 12, background: INK, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, color: PAPER, fontSize: 12.5 }}>
                  {t('setup.health.weight')} <strong>{healthWeightSuggestion.kg} kg</strong>
                </div>
                <button onClick={onApplyHealthWeight} style={{ ...primaryBtn, width: 'auto', padding: '8px 14px', fontSize: 13 }}>{t('setup.health.apply')}</button>
              </div>
            )}
          </div>
        )}

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12, display: 'flex', gap: 10 }}>
          <HeartPulse size={20} color={BLAZE} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ color: KHAKI, fontSize: 12.5, lineHeight: 1.5 }}>
            {t('setup.tech.note')}
          </div>
        </div>

        <button onClick={onSave} disabled={!formAge || !formWeight} style={{
          ...primaryBtn, opacity: (!formAge || !formWeight) ? 0.5 : 1, marginTop: 4,
        }}>
          {t('setup.enlist')} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
function ToggleRow({ label, icon: Icon, on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        <Icon size={18} color={on ? BLAZE : STEEL} style={{ flexShrink: 0 }} />
        <span style={{ color: PAPER, fontSize: 13.5, lineHeight: 1.3 }}>{label}</span>
      </div>
      <div style={{ width: 40, height: 22, borderRadius: 11, background: on ? BLAZE : OLIVE_DARK, position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 10 }}>
        <div style={{
          position: 'absolute', top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: '50%',
          background: PAPER, transition: 'left 0.2s',
        }} />
      </div>
    </button>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}
const inputStyle = {
  width: '100%', background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '12px 14px',
  color: PAPER, fontSize: 16, fontFamily: 'Inter, sans-serif', outline: 'none',
};
const primaryBtn = {
  background: `linear-gradient(135deg, ${BLAZE}, ${BLAZE_DEEP})`, color: PAPER, border: 'none', borderRadius: 14, padding: '15px 18px',
  fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.06em', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%',
  boxShadow: `0 6px 20px ${BLAZE}4d`,
};

/* ================= HOME SCREEN ================= */
function HomeScreen({ profile, sessions, customPrograms, waistHistory, weightHistory, onOpenProgram, onBuild, onDeleteCustom, onDismissIntro, onPromote }) {
  const { lang, t } = useT();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showOthers, setShowOthers] = useState(false);
  const streak = computeStreak(sessions);
  const weekAgo = Date.now() - 7 * 86400000;
  const kcalWeek = Math.round(sessions.filter(s => new Date(s.date).getTime() > weekAgo).reduce((a, s) => a + s.kcal, 0));
  const sessionsThisWeek = sessions.filter(s => new Date(s.date).getTime() > weekAgo).length;
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const { program: todayProgram, adaptive } = pickNextProgram(sessions, profile);
  const others = PROGRAMS.filter(p => p.id !== todayProgram.id);
  const { current: rank, next: nextRank } = getRank(sessions.length);
  const upcoming = nextBadge(sessions);
  const lastSession = sessions.length ? sessions[sessions.length - 1] : null;
  const lastProgram = lastSession && lastSession.programId !== 'health-import'
    ? [...PROGRAMS, ...customPrograms].find(p => p.id === lastSession.programId)
    : null;
  const campDay = campDayIndex(profile);
  const lvl = getLevel(profile.level || 'combattente');
  const levelIdx = LEVELS.indexOf(lvl);
  const waist = waistHistory.length ? waistHistory[waistHistory.length - 1] : null;
  const waistFirst = waistHistory.length ? waistHistory[0] : null;
  const waistDelta = waist && waistFirst && waistHistory.length > 1 ? waist.cm - waistFirst.cm : null;
  const weight = weightHistory.length ? weightHistory[weightHistory.length - 1] : null;
  const weightFirst = weightHistory.length ? weightHistory[0] : null;
  const weightDelta = weight && weightFirst && weightHistory.length > 1 ? weight.kg - weightFirst.kg : null;
  const recentRpe = sessions.slice(-3).map(s => s.rpe).filter(r => r != null);
  const canPromote = recentRpe.length >= 3 && recentRpe.every(r => r <= 2) && levelIdx < LEVELS.length - 1;
  const nextLevel = canPromote ? LEVELS[levelIdx + 1] : null;

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 4px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: STEEL, fontSize: 12 }}>{greeting(lang)}</div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>{profile.name.toUpperCase()}</div>
          <div className="o40-mono" style={{ color: BLAZE, fontSize: 10.5, letterSpacing: '0.1em', marginTop: 1 }}>
            {tr(rank.name, lang)} · {tr(lvl.label, lang)}{nextRank && ` · ${nextRank.min - sessions.length} ${t('home.towards')} ${tr(nextRank.name, lang)}`}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 2, flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 46, height: 46 }}>
            <ProgressRing progress={campDay / CAMP_DAYS} size={46} stroke={5} color={BLAZE} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="o40-display" style={{ color: PAPER, fontSize: 13 }}>{campDay}</span>
            </div>
          </div>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 8.5, letterSpacing: '0.06em' }}>{t('home.day')} /{CAMP_DAYS}</span>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${OLIVE}22`, border: `1px solid ${OLIVE}`, borderRadius: 20, padding: '5px 12px', marginTop: 8 }}>
          <Flame size={12} color={BLAZE} />
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, letterSpacing: '0.08em' }}>
            {t('home.min15')} · {t('home.mission')} {tr(todayProgram.focus, lang)}
          </span>
        </div>
      </div>

      <div className="o40-ticker o40-mono" style={{ marginTop: 10, fontSize: 10.5, color: KHAKI, letterSpacing: '0.12em' }}>
        <div className="o40-ticker-inner">
          {[`${t('ticker.streak')} ${streak} ${t('dt.days').toUpperCase()}`, `${t('ticker.sessions')} ${sessions.length}`, `${t('ticker.kcal')} ${kcalWeek} / ${t('ticker.week7')}`, `${t('ticker.level')} ${tr(lvl.label, lang).toUpperCase()}`, `${t('ticker.mission')} ${todayProgram.id.toUpperCase()}`, `${t('ticker.goal')} ${sessionsThisWeek}/${weeklyGoal} ${t('ticker.week')}`, `${t('ticker.rank')} ${tr(rank.name, lang).toUpperCase()}`]
            .concat(`${t('ticker.streak')} ${streak} ${t('dt.days').toUpperCase()}`, `${t('ticker.sessions')} ${sessions.length}`, `${t('ticker.kcal')} ${kcalWeek} / ${t('ticker.week7')}`, `${t('ticker.level')} ${tr(lvl.label, lang).toUpperCase()}`, `${t('ticker.mission')} ${todayProgram.id.toUpperCase()}`, `${t('ticker.goal')} ${sessionsThisWeek}/${weeklyGoal} ${t('ticker.week')}`, `${t('ticker.rank')} ${tr(rank.name, lang).toUpperCase()}`)
            .map((s, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 44 }}>{s}<span style={{ color: BLAZE }}>◆</span></span>
            ))}
        </div>
      </div>

      {!profile.seenIntro && (
        <div style={{ margin: '10px 16px 0', background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${BLAZE}`, borderRadius: 12, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Info size={16} color={BLAZE} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1, color: KHAKI, fontSize: 12, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: t('home.intro') }} />
          <button onClick={onDismissIntro} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }} aria-label={t('home.intro.close')}>
            <X size={16} color={STEEL} />
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, padding: '14px 16px' }}>
        <DogTag label={t('dt.streak')} value={streak} sub={streak === 1 ? t('dt.day') : t('dt.days')} />
        <DogTag label={t('dt.sessions')} value={sessions.length} sub={t('dt.total')} />
        <DogTag label={t('dt.kcal')} value={kcalWeek} sub={t('dt.7d')} />
      </div>

      <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${BLAZE}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Ruler size={16} color={BLAZE} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{t('home.waist.title')} <span style={{ color: STEEL, fontWeight: 400 }}>{t('home.waist.sub')}</span></div>
          {waist ? (
            <div style={{ color: KHAKI, fontSize: 11.5, marginTop: 1 }}>
              {t('home.waist.last', { v: waist.cm })}
              {waistDelta != null && (
                <span style={{ color: waistDelta <= 0 ? '#7FB069' : BLAZE, marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  {waistDelta <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                  {waistDelta > 0 ? '+' : ''}{t('home.waist.delta', { v: waistDelta })}
                </span>
              )}
            </div>
          ) : (
            <div style={{ color: STEEL, fontSize: 11.5, marginTop: 1 }}>{t('home.waist.empty')}</div>
          )}
        </div>
        {waist && (
          <span className="o40-mono" style={{ color: waistDelta != null && waistDelta <= 0 ? '#7FB069' : KHAKI, fontSize: 11 }}>{waistDelta != null && waistDelta <= 0 ? t('home.trendok') : t('home.start')}</span>
        )}
      </div>

      <div style={{ margin: '0 16px 4px', background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${KHAKI}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Scale size={16} color={KHAKI} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{t('home.weight.title')} <span style={{ color: STEEL, fontWeight: 400 }}>{t('home.weight.sub')}</span></div>
          {weight ? (
            <div style={{ color: KHAKI, fontSize: 11.5, marginTop: 1 }}>
              {t('home.weight.last', { v: weight.kg })}
              {weightDelta != null && (
                <span style={{ color: weightDelta <= 0 ? '#7FB069' : BLAZE, marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                  {weightDelta <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                  {weightDelta > 0 ? '+' : ''}{t('home.weight.delta', { v: weightDelta.toFixed(1) })}
                </span>
              )}
            </div>
          ) : (
            <div style={{ color: STEEL, fontSize: 11.5, marginTop: 1 }}>{t('home.weight.empty')}</div>
          )}
        </div>
        {weight && (
          <span className="o40-mono" style={{ color: weightDelta != null && weightDelta <= 0 ? '#7FB069' : KHAKI, fontSize: 11 }}>{weightDelta != null && weightDelta <= 0 ? t('home.trendok') : t('home.start')}</span>
        )}
      </div>

      {nextLevel && (
        <div style={{ margin: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 10, background: `linear-gradient(135deg, ${BLAZE_DEEP}, ${INK_2})`, border: `1px solid ${BLAZE}`, borderRadius: 12, padding: '11px 13px' }}>
          <Crown size={16} color={PAPER} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: PAPER, fontSize: 12.5, fontWeight: 600 }}>{t('home.promote.title', { lvl: tr(nextLevel.label, lang) })}</div>
            <div style={{ color: KHAKI, fontSize: 11.5, marginTop: 1 }}>{t('home.promote.body')}</div>
          </div>
          <button onClick={onPromote} style={{
            background: BLAZE, border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', flexShrink: 0,
          }}>
            <span className="o40-mono" style={{ color: PAPER, fontSize: 11 }}>{t('home.promote.btn')}</span>
          </button>
        </div>
      )}

      <div style={{ padding: '0 16px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }} className="o40-mono">
          <span style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('home.goal.title')}</span>
          <span style={{ color: sessionsThisWeek >= weeklyGoal ? BLAZE : STEEL, fontSize: 11 }}>{sessionsThisWeek}/{weeklyGoal}</span>
        </div>
        <SegmentedProgress total={weeklyGoal} current={Math.min(sessionsThisWeek, weeklyGoal)} currentProgress={1} color={BLAZE} />
        {upcoming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <Trophy size={12} color={KHAKI} />
            <span style={{ color: STEEL, fontSize: 11 }}>
              {t('home.next.title', { n: upcoming.remaining, unit: upcoming.kind === 'serie' ? (upcoming.remaining === 1 ? t('home.unit.streak1') : t('home.unit.streakN')) : (upcoming.remaining === 1 ? t('home.unit.session1') : t('home.unit.sessionN')) })}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '4px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0 8px' }}>
          <svg width="64" height="12" viewBox="0 0 64 12" fill="none" style={{ flexShrink: 0 }}>
            <path d="M0 6 H10 L14 2 L18 10 L22 4 L26 8 L30 6 H40 L44 2 L48 10 L52 4 L56 8 L60 6 H64"
              stroke={BLAZE} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" className="o40-ecg" />
          </svg>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('home.mission.title')}</div>
        </div>
        <button className="o40-card o40-ring-border o40-sheen" onClick={() => { vibrate(10); onOpenProgram(todayProgram); }} style={{
          width: '100%', textAlign: 'left', border: `1px solid ${BLAZE}`,
          background: `linear-gradient(150deg, ${INK_2} 0%, ${OLIVE_DARK} 55%, ${OLIVE} 130%)`,
          borderRadius: 18, padding: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden',
          boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px ${BLAZE}22 inset`,
        }}>
          <div className="o40-embers">
            {[['8%', '0s', '3.2s'], ['22%', '1.1s', '3.8s'], ['38%', '0.5s', '3.4s'], ['55%', '1.7s', '3.6s'], ['70%', '0.9s', '3.3s'], ['84%', '1.4s', '3.9s'], ['93%', '0.3s', '3.5s']].map(([l, d, du], i) => (
              <span key={i} className="o40-ember" style={{ left: l, animationDelay: d, animationDuration: du }} />
            ))}
          </div>
          <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.15 }}>
            <ExerciseFigure pose={EXERCISES[todayProgram.exercises[0]].pose} color={PAPER} size={130} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="o40-mono" style={{ color: BLAZE, fontSize: 11, letterSpacing: '0.1em' }}>{t('home.mission.tag', { id: todayProgram.id })}</div>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 9.5, letterSpacing: '0.08em', background: `${KHAKI}18`, border: `1px solid ${KHAKI}44`, borderRadius: 6, padding: '2px 7px' }}>
              {tr(todayProgram.focus, lang)}
            </div>
          </div>
          <div className="o40-display" style={{ color: PAPER, fontSize: 30, marginTop: 2 }}>{tr(todayProgram.name, lang)}</div>
          <div style={{ color: KHAKI, fontSize: 13.5, marginTop: 2 }}>{tr(todayProgram.tagline, lang)}</div>
          {adaptive && (
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, marginTop: 8, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '4px 8px', display: 'inline-block' }}>
              {t('home.mission.adaptive')}
            </div>
          )}
          <div style={{ display: 'flex', gap: 14, marginTop: 12, color: STEEL, fontSize: 12.5 }}>
            <span>{t('home.mission.min')}</span><span>·</span><span>{t('home.mission.noequip')}</span><span>·</span><span>{t('home.mission.ex', { n: todayProgram.exercises.length })}</span>
          </div>
          <div style={{
            marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 4, color: PAPER,
            fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em',
            background: `${BLAZE}33`, border: `1px solid ${BLAZE}`, borderRadius: 10, padding: '7px 14px',
            animation: 'glowPulse 2.4s ease-in-out infinite',
          }}>
            {t('home.mission.see')} <ChevronRight size={18} />
          </div>
        </button>

        {lastProgram && (
          <button onClick={() => onOpenProgram(lastProgram)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', marginTop: 10,
            background: 'transparent', border: `1px dashed ${OLIVE}`, borderRadius: 10, padding: 10, cursor: 'pointer',
          }}>
            <RotateCcw size={13} color={STEEL} />
            <span className="o40-mono" style={{ color: STEEL, fontSize: 11.5 }}>{t('home.repeat', { name: tr(lastProgram.name, lang) })}</span>
          </button>
        )}

        <button onClick={() => onOpenProgram(QUICK_PROGRAM)} style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%', marginTop: 10,
          background: `linear-gradient(135deg, ${INK_2}, ${INK})`, border: `1px solid ${KHAKI}`, borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${KHAKI}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={17} color={KHAKI} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: PAPER, fontSize: 13.5, fontWeight: 600 }}>{tr(QUICK_PROGRAM.name, lang)}</div>
            <div style={{ color: STEEL, fontSize: 11.5 }}>{tr(QUICK_PROGRAM.tagline, lang)} · {t('home.quick.min')}</div>
          </div>
          <ChevronRight size={16} color={STEEL} />
        </button>

        <button onClick={() => setShowOthers(v => !v)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          background: 'transparent', border: 'none', cursor: 'pointer', margin: '20px 0 8px', padding: 0,
        }}>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('home.other')}</span>
          <ChevronRight size={16} color={STEEL} style={{ transform: showOthers ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
        {showOthers && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {others.map(p => (
              <button key={p.id} onClick={() => onOpenProgram(p)} style={{
                display: 'flex', alignItems: 'center', gap: 12, background: INK_2, border: `1px solid ${OLIVE}`,
                borderRadius: 10, padding: 12, cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <ExerciseFigure pose={EXERCISES[p.exercises[0]].pose} color={KHAKI} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 14.5, fontWeight: 600 }}>{tr(p.name, lang)}</div>
                  <div style={{ color: STEEL, fontSize: 12 }}>{tr(p.tagline, lang)}</div>
                </div>
                <ChevronRight size={18} color={STEEL} />
              </button>
            ))}
          </div>
        )}

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 8px' }}>{t('home.yours')}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {customPrograms.map(p => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, background: INK_2, border: `1px solid ${OLIVE}`,
              borderRadius: 10, padding: 12,
            }}>
              <button onClick={() => onOpenProgram(p)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', flex: 1, padding: 0 }}>
                <div style={{ width: 40, height: 40, flexShrink: 0 }}>
                  <ExerciseFigure pose={EXERCISES[p.exercises[0]].pose} color={KHAKI} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 14.5, fontWeight: 600 }}>{tr(p.name, lang)}</div>
                  <div style={{ color: STEEL, fontSize: 12 }}>{tr(p.tagline, lang)} · {t('home.custom.ex', { n: p.exercises.length })}</div>
                </div>
              </button>
              <button onClick={() => {
                if (confirmDeleteId === p.id) { onDeleteCustom(p.id); setConfirmDeleteId(null); }
                else { setConfirmDeleteId(p.id); setTimeout(() => setConfirmDeleteId(c => c === p.id ? null : c), 3000); }
              }} style={{ ...btnIcon, background: confirmDeleteId === p.id ? `${BLAZE}33` : 'transparent' }} aria-label={t('home.custom.delete')}>
                {confirmDeleteId === p.id ? <Check size={16} color={BLAZE} /> : <Trash2 size={16} color={STEEL} />}
              </button>
            </div>
          ))}
          <button onClick={onBuild} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent',
            border: `1px dashed ${KHAKI}`, borderRadius: 10, padding: 14, cursor: 'pointer',
          }}>
            <Plus size={16} color={KHAKI} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 12.5, letterSpacing: '0.05em' }}>{t('home.custom.create')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= LIBRARY SCREEN (browse all exercises) ================= */
function LibraryScreen() {
  const { lang, t } = useT();
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const visibleIds = Object.keys(EXERCISES).filter(id =>
    filter === 'all' ? true : EXERCISE_GROUPS[filter].includes(id)
  );

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 4px' }}>
        <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>{t('lib.title')}</div>
        <div style={{ color: KHAKI, fontSize: 13 }}>{t('lib.sub')}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 4px' }}>
        {[['all', t('lib.all')], ['standing', t('lib.standing')], ['ground', t('lib.ground')], ['core', t('lib.core')]].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
            background: filter === key ? BLAZE : 'transparent', border: `1px solid ${filter === key ? BLAZE : OLIVE}`,
          }}>
            <span className="o40-mono" style={{ color: filter === key ? PAPER : STEEL, fontSize: 11 }}>{label}</span>
          </button>
        ))}
      </div>
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleIds.map(id => {
            const ex = EXERCISES[id];
            const isOpen = selectedId === id;
            return (
              <button key={id} className="o40-card" onClick={() => { const opening = !isOpen; setSelectedId(opening ? id : null); if (opening) speak(tr(ex.name, lang)); }} style={{
                display: 'flex', flexDirection: 'column', gap: 12, background: INK_2,
                border: `1px solid ${isOpen ? BLAZE : OLIVE}`, borderRadius: 14, padding: 12,
                cursor: 'pointer', textAlign: 'left', width: '100%',
              }}>
                {isOpen && (
                  <div className="o40-expand" style={{ width: '100%', aspectRatio: '1 / 1', maxHeight: 260, background: INK, borderRadius: 10, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                    <ExerciseMedia exerciseId={id} pose={ex.pose} color={BLAZE} rounded={10} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  {!isOpen && (
                    <div style={{ width: 52, height: 52, flexShrink: 0, background: INK, borderRadius: 8, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                      <ExerciseMedia exerciseId={id} pose={ex.pose} color={BLAZE} rounded={8} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: PAPER, fontWeight: 700, fontSize: 14.5 }}>{tr(ex.name, lang)}</div>
                    <div style={{ color: KHAKI, fontSize: 12 }}>{tr(ex.repGuide, lang)}</div>
                    {isOpen ? (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5, textAlign: 'left' }}>
                          {ex.steps.map((s, i) => (
                            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                              <span className="o40-mono" style={{ color: KHAKI, fontSize: 10, minWidth: 13 }}>{i + 1}.</span>
                              <span style={{ color: STEEL, fontSize: 11.5, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                            </div>
                          ))}
                        </div>
                        {ex.breath && (
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, color: OLIVE }}>
                            <Wind size={12} style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 11, fontStyle: 'italic', lineHeight: 1.4 }}>{tr(ex.breath, lang)}</span>
                          </div>
                        )}
                        <div style={{ color: STEEL, fontSize: 11.5, marginTop: 6, lineHeight: 1.4, fontStyle: 'italic' }}>{tr(ex.tip40, lang)}</div>
                      </>
                    ) : (
                      <div style={{ color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4 }}>{tr(ex.cue, lang)}</div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================= BUILDER SCREEN (custom mission) ================= */
function BuilderScreen({ profile, onCancel, onCreate }) {
  const { lang, t } = useT();
  const [selected, setSelected] = useState([]);
  const [rounds, setRounds] = useState(2);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('all');

  function toggleEx(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : (s.length < 10 ? [...s, id] : s));
  }

  const canCreate = selected.length >= 3;
  const draft = { id: `custom-${Date.now()}`, name: name.trim() || t('bld.draft.name'), tagline: t('bld.draft.tagline'), rounds, exercises: selected };
  const preset = levelPreset(profile);
  const kcal = canCreate ? Math.round(estimateProgramKcal(draft, profile.weight, !!profile.skipWarmup, preset.work, preset.rest)) : 0;
  const mins = canCreate ? Math.round(totalSeqSeconds(draft, !!profile.skipWarmup, preset.work, preset.rest) / 60) : 0;
  const visibleIds = Object.keys(EXERCISES).filter(id =>
    filter === 'all' ? true : EXERCISE_GROUPS[filter].includes(id)
  );

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('bld.title')} onBack={onCancel} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <Field label={t('bld.name')}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={t('bld.name.ph')}
            className="o40-input" style={inputStyle} />
        </Field>

        <div style={{ marginTop: 16 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{t('bld.rounds')}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3].map(r => (
              <button key={r} onClick={() => setRounds(r)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                background: rounds === r ? BLAZE : INK_2, border: `1px solid ${rounds === r ? BLAZE : OLIVE}`,
              }}>
                <span className="o40-display" style={{ color: PAPER, fontSize: 18 }}>{r}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '18px 0 8px' }}>
          {t('bld.exercises', { sel: selected.length })}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {[['all', t('lib.all')], ['standing', t('lib.standing')], ['ground', t('lib.ground')], ['core', t('lib.core')]].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
              background: filter === key ? BLAZE : 'transparent', border: `1px solid ${filter === key ? BLAZE : OLIVE}`,
            }}>
              <span className="o40-mono" style={{ color: filter === key ? PAPER : STEEL, fontSize: 11 }}>{label}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visibleIds.map(id => {
            const ex = EXERCISES[id];
            const on = selected.includes(id);
            return (
              <button key={id} onClick={() => toggleEx(id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, background: on ? OLIVE_DARK : INK_2,
                border: `1px solid ${on ? BLAZE : OLIVE}`, borderRadius: 10, padding: 10, cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 36, height: 36, flexShrink: 0 }}>
                  <ExerciseFigure pose={ex.pose} color={on ? BLAZE : STEEL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: PAPER, fontSize: 13.5, fontWeight: 600 }}>{tr(ex.name, lang)}</div>
                  <div style={{ color: STEEL, fontSize: 11 }}>{tr(ex.repGuide, lang)}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 5, border: `1px solid ${on ? BLAZE : OLIVE}`,
                  background: on ? BLAZE : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {on && <Check size={13} color={PAPER} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }}>
        {canCreate ? (
          <>
            <div style={{ display: 'flex', gap: 14, marginBottom: 10, color: STEEL, fontSize: 12.5, justifyContent: 'center' }}>
              <span>{t('bld.min', { m: mins })}</span><span>·</span><span>{t('bld.kcal', { k: kcal })}</span>
            </div>
            <button onClick={() => onCreate(draft)} style={primaryBtn}><Check size={18} /> {t('bld.create.go')}</button>
          </>
        ) : (
          <div style={{ color: STEEL, fontSize: 13, textAlign: 'center' }}>{t('bld.hint')}</div>
        )}
      </div>
    </div>
  );
}

/* ================= PREVIEW SCREEN ================= */
function groupOf(id) {
  return EXERCISE_GROUPS.standing.includes(id) ? 'standing' : 'ground';
}

function PreviewScreen({ program, profile, soundOn, onBack, onStart }) {
  const { lang, t } = useT();
  const [selectedId, setSelectedId] = useState(null);
  const [subs, setSubs] = useState({});
  const [swapOpenId, setSwapOpenId] = useState(null);

  const effectiveExercises = program.exercises.map(id => subs[id] || id);
  const effectiveProgram = { ...program, exercises: effectiveExercises };
  const preset = levelPreset(profile);
  const kcal = Math.round(estimateProgramKcal(effectiveProgram, profile.weight, !!profile.skipWarmup, preset.work, preset.rest));
  const mins = Math.round(totalSeqSeconds(effectiveProgram, !!profile.skipWarmup, preset.work, preset.rest) / 60);

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('prev.title', { id: program.id })} onBack={onBack} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div className="o40-display" style={{ color: PAPER, fontSize: 26 }}>{tr(program.name, lang)}</div>
        <div style={{ color: KHAKI, fontSize: 14, marginBottom: 14 }}>{tr(program.tagline, lang)}</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <DogTag label={t('dt.duration')} value={`${mins}′`} />
          <DogTag label={t('dt.estkcal')} value={kcal} />
          <DogTag label={t('dt.rounds')} value={program.rounds} />
        </div>

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '4px 0 10px' }}>
          {t('prev.sub', { n: program.exercises.length, r: program.rounds, p: tr(preset.label, lang) })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {program.exercises.map((originalId, i) => {
            const currentId = subs[originalId] || originalId;
            const ex = EXERCISES[currentId];
            const isOpen = selectedId === originalId;
            const isSwapping = swapOpenId === originalId;
            const isSubbed = !!subs[originalId];
            const usedElsewhere = effectiveExercises.filter((_, idx) => program.exercises[idx] !== originalId);
            const alternatives = EXERCISE_GROUPS[groupOf(originalId)].filter(aid => aid !== currentId && !usedElsewhere.includes(aid));
            return (
              <div key={originalId} style={{
                display: 'flex', flexDirection: 'column', gap: 12, background: INK_2,
                border: `1px solid ${isOpen ? BLAZE : OLIVE}`, borderRadius: 10, padding: 12,
              }}>
                {isOpen && (
                  <div className="o40-expand" style={{ width: '100%', aspectRatio: '1 / 1', maxHeight: 260, background: INK, borderRadius: 10, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                    <ExerciseMedia exerciseId={currentId} pose={ex.pose} color={BLAZE} rounded={10} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { const opening = !isOpen; setSelectedId(opening ? originalId : null); if (opening && soundOn) speak(tr(ex.name, lang)); }} style={{
                    display: 'flex', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, flex: 1, minWidth: 0,
                  }}>
                    {!isOpen && (
                      <div style={{ width: 52, height: 52, flexShrink: 0, background: INK, borderRadius: 8, border: `1px solid ${OLIVE}`, overflow: 'hidden' }}>
                        <ExerciseMedia exerciseId={currentId} pose={ex.pose} color={BLAZE} rounded={8} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                        <span className="o40-mono" style={{ color: STEEL, fontSize: 11 }}>{i + 1}.</span>
                        <span style={{ color: PAPER, fontWeight: 700, fontSize: 14.5 }}>{tr(ex.name, lang)}</span>
                        {isSubbed && <span className="o40-mono" style={{ color: KHAKI, fontSize: 9, border: `1px solid ${OLIVE}`, borderRadius: 4, padding: '1px 4px' }}>{t('prev.swapped')}</span>}
                      </div>
                      <div style={{ color: KHAKI, fontSize: 12 }}>{tr(ex.repGuide, lang)}</div>
                      {isOpen && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5, textAlign: 'left' }}>
                          {ex.steps.map((s, k) => (
                            <div key={k} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                              <span className="o40-mono" style={{ color: KHAKI, fontSize: 10, minWidth: 13 }}>{k + 1}.</span>
                              <span style={{ color: STEEL, fontSize: 11.5, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {isOpen && ex.breath && (
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, color: OLIVE }}>
                          <Wind size={12} style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: 11, fontStyle: 'italic', lineHeight: 1.4 }}>{tr(ex.breath, lang)}</span>
                        </div>
                      )}
                      <div style={{ color: STEEL, fontSize: 11.5, marginTop: 3, lineHeight: 1.4, fontStyle: 'italic' }}>{tr(ex.tip40, lang)}</div>
                    </div>
                  </button>
                  <button onClick={() => setSwapOpenId(isSwapping ? null : originalId)} style={{ ...btnIcon, flexShrink: 0, alignSelf: 'flex-start' }} aria-label={t('prev.swap')}>
                    <RefreshCw size={16} color={isSwapping ? BLAZE : STEEL} />
                  </button>
                </div>
                {isSwapping && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4, borderTop: `1px solid ${OLIVE_DARK}` }}>
                    {isSubbed && (
                      <button onClick={() => { setSubs(s => { const n = { ...s }; delete n[originalId]; return n; }); setSwapOpenId(null); }} style={{
                        padding: '6px 10px', borderRadius: 20, background: 'transparent', border: `1px solid ${KHAKI}`, cursor: 'pointer',
                      }}>
                        <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5 }}>{t('prev.restore', { name: tr(EXERCISES[originalId].name, lang) })}</span>
                      </button>
                    )}
                    {alternatives.map(aid => (
                      <button key={aid} onClick={() => { setSubs(s => ({ ...s, [originalId]: aid })); setSwapOpenId(null); }} style={{
                        padding: '6px 10px', borderRadius: 20, background: INK, border: `1px solid ${OLIVE}`, cursor: 'pointer',
                      }}>
                        <span className="o40-mono" style={{ color: PAPER, fontSize: 10.5 }}>{tr(EXERCISES[aid].name, lang)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 16, borderTop: `1px solid ${OLIVE_DARK}` }}>
        <button onClick={() => onStart(effectiveProgram)} className="o40-pulsebtn" style={{ ...primaryBtn, borderRadius: 14 }}><Play size={18} /> {t('prev.go')}</button>
      </div>
    </div>
  );
}

/* ================= SESSION SCREEN ================= */
function SessionScreen({ program, seq, phaseIdx, secondsLeft, paused, setPaused, soundOn, setSoundOn, musicOn, onToggleMusic, onSkip, onPrev, exitConfirm, setExitConfirm, onExit }) {
  const { lang, t } = useT();
  const phase = seq[phaseIdx];
  const next = seq[phaseIdx + 1];
  const ex = phase.exerciseId ? EXERCISES[phase.exerciseId] : null;
  const nextEx = next && next.exerciseId ? EXERCISES[next.exerciseId] : null;
  const progress = 1 - secondsLeft / phase.duration;

  const phaseLabel = phase.type === 'warmup' ? t('ses.warmup')
    : phase.type === 'cooldown' ? t('ses.cooldown')
    : phase.type === 'rest' ? t('ses.rest')
    : t('ses.round', { r: phase.round, name: tr(ex.name, lang).toUpperCase() });

  const ringColor = phase.type === 'rest' ? OLIVE : phase.type === 'work' ? BLAZE : KHAKI;
  const doneWork = seq.slice(0, phaseIdx).filter(p => p.type === 'work').length;
  const totalWork = seq.filter(p => p.type === 'work').length;
  const elapsedSec = seq.slice(0, phaseIdx).reduce((a, p) => a + p.duration, 0) + (phase.duration - secondsLeft);

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={tr(program.name, lang)}
        onBack={() => setExitConfirm(true)}
        right={<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {musicOn && <EqBars tone={ringColor} bars={4} speed={phase.type === 'work' ? 1.4 : phase.type === 'rest' ? 0.5 : 0.8} style={{ marginRight: 6, height: 12 }} />}
          <button onClick={onToggleMusic} style={btnIcon} aria-label={t('ses.music')}>{musicOn ? <Music2 size={18} color={BLAZE} /> : <HeadphoneOff size={18} color={STEEL} />}</button>
          <button onClick={() => setSoundOn(!soundOn)} style={btnIcon}>{soundOn ? <Volume2 size={18} color={PAPER} /> : <VolumeX size={18} color={STEEL} />}</button>
        </div>}
      />

      <div style={{ padding: '10px 16px 0' }}>
        <SegmentedProgress total={seq.length} current={phaseIdx} currentProgress={progress} color={ringColor} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }} className="o40-mono">
          <span style={{ color: STEEL, fontSize: 11 }}>{t('ses.elapsed', { t: formatTime(elapsedSec) })}</span>
          <span style={{ color: STEEL, fontSize: 11 }}>{t('ses.ex', { a: doneWork, b: totalWork })}</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16 }}>
        <div key={phaseIdx} className={`o40-mono o40-expand ${phase.type === 'work' ? 'o40-gradtext' : ''}`} style={{ color: ringColor, fontSize: 13, letterSpacing: '0.1em' }}>{phaseLabel}</div>

        <div style={{ position: 'relative', width: 240, height: 240 }}>
          <div style={{
            position: 'absolute', inset: -18, borderRadius: '50%',
            background: `radial-gradient(circle, ${ringColor}30 0%, transparent 70%)`,
            transition: 'background 0.3s ease',
            animation: phase.type === 'rest' ? 'restBreath 2.4s ease-in-out infinite' : 'none',
          }} />
          {phase.type === 'work' && (
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `2px solid ${ringColor}44`, animation: 'ringPulse 1.5s ease-out infinite' }} />
          )}
          <ProgressRing progress={progress} color={ringColor} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {ex ? (
              <div style={{ width: 150, height: 150 }}><ExerciseMedia exerciseId={phase.exerciseId} pose={ex.pose} color={PAPER} rounded={14} /></div>
            ) : (
              <div className="o40-display" style={{ color: PAPER, fontSize: 44 }}>{formatTime(secondsLeft)}</div>
            )}
          </div>
        </div>
        {ex && <div className="o40-display" style={{ color: PAPER, fontSize: 40 }}>{formatTime(secondsLeft)}</div>}

        {ex && (
          <div style={{ textAlign: 'center', maxWidth: 330 }}>
            <div style={{ color: KHAKI, fontSize: 13 }}>{tr(ex.repGuide, lang)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8, textAlign: 'left' }}>
              {ex.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span className="o40-mono" style={{ color: KHAKI, fontSize: 10.5, minWidth: 15 }}>{i + 1}.</span>
                  <span style={{ color: STEEL, fontSize: 12, lineHeight: 1.4 }}>{tr(s, lang)}</span>
                </div>
              ))}
            </div>
            {ex.breath && (
              <div style={{ display: 'flex', gap: 7, alignItems: 'center', justifyContent: 'center', marginTop: 9, color: OLIVE }}>
                <Wind size={13} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, fontStyle: 'italic', lineHeight: 1.4 }}>{tr(ex.breath, lang)}</span>
              </div>
            )}
            {ex.tip40 && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 10, textAlign: 'left', background: `${KHAKI}10`, border: `1px solid ${KHAKI}44`, borderRadius: 10, padding: '8px 10px' }}>
                <Lightbulb size={14} color={KHAKI} style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ color: KHAKI, fontSize: 11.5, lineHeight: 1.45 }}>{tr(ex.tip40, lang)}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ color: STEEL, fontSize: 12, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '7px 12px' }}>
          {next ? (<>
            {next.exerciseId && <div style={{ width: 26, height: 26, flexShrink: 0 }}><ExerciseFigure pose={EXERCISES[next.exerciseId].pose} color={KHAKI} size="100%" /></div>}
            <span>{t('ses.next', { name: next.type === 'work' ? tr(nextEx.name, lang) : next.type === 'rest' ? t('ses.next.rest') : t('ses.next.cooldown') })}</span>
          </>) : t('ses.last')}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, padding: '10px 20px 8px', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => setPaused(!paused)} style={{ ...iconCircle, width: 74, height: 74, background: BLAZE, animation: paused ? 'glowPulse 1.6s ease-in-out infinite' : 'none' }} aria-label={paused ? t('ses.resume') : t('ses.pause')}>
          {paused ? <Play size={30} color={PAPER} /> : <Pause size={30} color={PAPER} />}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
        <button onClick={onPrev} disabled={phaseIdx === 0} style={{ ...pillBtn, opacity: phaseIdx === 0 ? 0.4 : 1 }}>
          <ChevronLeft size={15} /> PREV
        </button>
        <button onClick={onSkip} style={pillBtn}>
          NEXT <SkipForward size={15} />
        </button>
      </div>

      {exitConfirm && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,29,22,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 22, maxWidth: 320, textAlign: 'center' }}>
            <div className="o40-display" style={{ color: PAPER, fontSize: 22, marginBottom: 8 }}>{t('ses.quit.title')}</div>
            <div style={{ color: STEEL, fontSize: 13, marginBottom: 18 }}>{t('ses.quit.body')}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setExitConfirm(false)} style={{ ...secondaryBtn, flex: 1 }}>{t('ses.quit.continue')}</button>
              <button onClick={onExit} style={{ ...primaryBtn, flex: 1 }}>{t('ses.quit.exit')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const iconCircle = { borderRadius: '50%', border: `1px solid ${OLIVE}`, background: `linear-gradient(160deg, ${INK_2}, ${INK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.35)' };
const secondaryBtn = { background: INK_2, border: `1px solid ${KHAKI}`, color: PAPER, borderRadius: 14, padding: '12px 16px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: '0.05em', cursor: 'pointer' };
const pillBtn = {
  flex: 1, background: INK_2, border: `1px solid ${OLIVE}`, color: PAPER, borderRadius: 10, padding: '10px 0',
  fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
};

/* ================= SUMMARY SCREEN ================= */
function SummaryScreen({ stats, profile, hrInput, setHrInput, waistInput, setWaistInput, weightInput, setWeightInput, rpe, setRpe, notes, setNotes, onSave }) {
  const { lang, t } = useT();
  const zone = hrInput ? hrZone(parseInt(hrInput, 10), profile.age, lang) : null;
  const [shareState, setShareState] = useState('idle');

  async function handleShare() {
    const text = t('sum.share', { name: tr(stats.program.name, lang), min: Math.round(stats.durationSec / 60), kcal: stats.kcal });
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      }
    } catch (e) { /* user cancelled share, ignore */ }
  }

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {['#C1440E', '#B8AE8C', '#7FB069', '#EDE8D8', '#D9B34C'].map((c, i) => (
          <span key={i} className="o40-confetti" style={{
            background: c, left: `${8 + i * 18}%`, animationDuration: `${2.6 + (i % 3) * 0.7}s`,
            animationDelay: `${i * 0.35}s`, opacity: 0.85,
          }} />
        ))}
      </div>
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        <div style={{ textAlign: 'center', marginTop: 10 }} className="o40-pop">
          <Trophy size={40} color={BLAZE} />
          <div className="o40-display" style={{ color: PAPER, fontSize: 30, marginTop: 8 }}>{t('sum.title')}</div>
          <div style={{ color: KHAKI, fontSize: 14 }}>{tr(stats.program.name, lang)}</div>
          <button onClick={handleShare} style={{
            marginTop: 10, background: 'transparent', border: `1px solid ${KHAKI}`, borderRadius: 20,
            padding: '6px 14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11 }}>
              {shareState === 'copied' ? t('sum.copied') : t('sum.sharebtn')}
            </span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, margin: '20px 0' }}>
          <DogTag label={t('dt.duration')} value={`${Math.round(stats.durationSec / 60)}′`} />
          <DogTag label={t('dt.kcal')} value={stats.kcal} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.rpe.title')}</span>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {RPE_LABELS.map((lbl, i) => {
              const val = i + 1;
              const on = rpe === val;
              const c = RPE_COLORS[i];
              return (
                <button key={val} onClick={() => setRpe(on ? null : val)} style={{
                  flex: 1, padding: '10px 2px', borderRadius: 8, cursor: 'pointer', textAlign: 'center',
                  background: on ? c : INK, border: `1px solid ${on ? c : OLIVE}`,
                  transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
                }}>
                  <div className="o40-display" style={{ color: PAPER, fontSize: 18 }}>{val}</div>
                  <div style={{ color: on ? PAPER : STEEL, fontSize: 8.5 }}>{tr(lbl, lang)}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.notes.title')}</span>
          <textarea value={notes} onChange={e => setNotes(e.target.value.slice(0, 200))} placeholder={t('sum.notes.ph')}
            rows={2} className="o40-input" style={{ ...inputStyle, marginTop: 10, resize: 'none', fontFamily: 'Inter, sans-serif' }} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Ruler size={18} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.waist.title')}</span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.waist.body')}
          </div>
          <input value={waistInput} onChange={e => setWaistInput(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder={t('sum.waist.ph')} className="o40-input" style={inputStyle} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Scale size={18} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.weight.title')}</span>
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.weight.body')}
          </div>
          <input value={weightInput} onChange={e => setWeightInput(e.target.value.replace(/[^\d.,]/g, ''))} inputMode="decimal"
            placeholder={profile && profile.weight ? t('sum.weight.ph.dynamic', { v: profile.weight }) : t('sum.weight.ph')} className="o40-input" style={inputStyle} />
        </div>

        <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <HeartPulse size={18} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('sum.hr.title')}</span>
            {!hrInput && (
              <span className="o40-blink" style={{ marginLeft: 'auto', background: `${BLAZE}22`, border: `1px solid ${BLAZE}`, color: BLAZE, fontSize: 10, letterSpacing: '0.06em', borderRadius: 6, padding: '2px 7px' }}>
                {t('sum.hr.remind')}
              </span>
            )}
          </div>
          <div style={{ color: STEEL, fontSize: 12, marginBottom: 10, lineHeight: 1.4 }}>
            {t('sum.hr.body')}
          </div>
          <input value={hrInput} onChange={e => setHrInput(e.target.value.replace(/\D/g, ''))} inputMode="numeric"
            placeholder={t('sum.hr.ph')} className="o40-input" style={inputStyle} />
          {zone && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: zone.color }} />
              <span style={{ color: PAPER, fontSize: 13 }}>{t('sum.zone', { label: zone.label })}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 20px 20px', borderTop: `1px solid ${OLIVE_DARK}` }}>
        <button onClick={onSave} style={primaryBtn}><Check size={18} /> {t('sum.save')}</button>
      </div>
    </div>
  );
}

/* ================= HISTORY / STATS SCREEN ================= */
function last7DaysKcal(sessions, locale) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    const label = d.toLocaleDateString(locale || 'it-IT', { weekday: 'short' }).slice(0, 3);
    const kcal = Math.round(sessions.filter(s => sessionDayKey(s) === key).reduce((a, s) => a + s.kcal, 0));
    days.push({ label, kcal });
  }
  return days;
}
function missionCounts(sessions) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  sessions.forEach(s => { if (counts[s.programId] !== undefined) counts[s.programId]++; });
  return counts;
}
function Badge({ label, unlocked, value }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1,
      opacity: unlocked ? 1 : 0.35,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: unlocked ? BLAZE : INK_2, border: `1px solid ${unlocked ? BLAZE : OLIVE}`,
      }}>
        <Trophy size={18} color={unlocked ? PAPER : STEEL} />
      </div>
      <div className="o40-mono" style={{ color: unlocked ? PAPER : STEEL, fontSize: 10 }}>{value}</div>
      <div style={{ color: STEEL, fontSize: 9, textAlign: 'center' }}>{label}</div>
    </div>
  );
}

function HistoryScreen({ sessions, profile, waistHistory, weightHistory, onBack, onClear, onUpdateGoal, onDeleteSession }) {
  const { lang, t } = useT();
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmDeleteDate, setConfirmDeleteDate] = useState(null);
  const ordered = [...sessions].reverse();
  const hrData = sessions.filter(s => s.peakHR).map((s, i) => ({
    idx: i + 1, hr: s.peakHR, label: new Date(s.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const waistData = [...waistHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1, cm: w.cm, label: new Date(w.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const weightData = [...weightHistory].sort((a, b) => new Date(a.date) - new Date(b.date)).map((w, i) => ({
    idx: i + 1, kg: w.kg, label: new Date(w.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const streak = computeStreak(sessions);
  const bestStreak = computeBestStreak(sessions);
  const weekData = last7DaysKcal(sessions, LOCALES[lang]);
  const counts = missionCounts(sessions);
  const maxCount = Math.max(1, counts.A, counts.B, counts.C, counts.D);
  const totalKcal = Math.round(sessions.reduce((a, s) => a + s.kcal, 0));
  const weeklyGoal = profile.weeklyGoal || WEEKLY_GOAL;
  const heatmap = buildHeatmap(sessions, 35);
  const now = Date.now();
  const thisWeekKcal = sessions.filter(s => new Date(s.date).getTime() > now - 7 * 86400000).reduce((a, s) => a + s.kcal, 0);
  const lastWeekKcal = sessions.filter(s => { const t = new Date(s.date).getTime(); return t <= now - 7 * 86400000 && t > now - 14 * 86400000; }).reduce((a, s) => a + s.kcal, 0);
  const trendPct = lastWeekKcal > 0 ? Math.round(((thisWeekKcal - lastWeekKcal) / lastWeekKcal) * 100) : null;
  const totalSec = sessions.reduce((a, s) => a + (s.durationSec || 780), 0);
  const totalMin = Math.round(totalSec / 60);
  const avgKcal = sessions.length ? Math.round(totalKcal / sessions.length) : 0;
  const rpeSeries = sessions.filter(s => s.rpe != null).map((s, i) => ({
    idx: i + 1, rpe: s.rpe, label: new Date(s.date).toLocaleDateString(LOCALES[lang], { day: '2-digit', month: '2-digit' }),
  }));
  const avgRpe = rpeSeries.length ? rpeSeries.reduce((a, b) => a + b.rpe, 0) / rpeSeries.length : null;
  const bestWeekKcal = (() => {
    let best = 0;
    sessions.forEach(s => {
      const t = new Date(s.date).getTime();
      const wk = sessions.filter(x => { const d = new Date(x.date).getTime(); return d >= t - 7 * 86400000 && d < t; }).reduce((a, x) => a + x.kcal, 0);
      best = Math.max(best, wk);
    });
    return Math.round(best);
  })();
  const sessionsPerWeek = sessions.length >= 2 ? (sessions.length / Math.max(1, Math.round((new Date(sessions[sessions.length - 1].date) - new Date(sessions[0].date)) / (7 * 86400000)))) : sessions.length;

  return (
    <div className="o40-screen-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar title={t('hist.title')} onBack={onBack} />
      <div className="o40-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <DogTag label={t('dt.streak')} value={streak} sub={streak === 1 ? t('dt.day') : t('dt.days')} />
          <DogTag label={t('dt.record')} value={bestStreak} sub={t('dt.beststreak')} />
          <DogTag label={t('dt.kcal')} value={totalKcal} sub={t('dt.total')} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <DogTag label={t('dt.minutes')} value={totalMin} sub={t('dt.trained')} />
          <DogTag label={t('dt.avgkcal')} value={avgKcal} sub={t('dt.permission')} />
          <DogTag label={t('dt.weeks')} value={sessionsPerWeek.toFixed(1)} sub={t('dt.perweek')} />
        </div>

        {avgRpe !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, background: `linear-gradient(135deg, ${OLIVE_DARK}, ${INK_2})`, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
            <HeartPulse size={17} color={BLAZE} />
            <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.avgint')}</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="o40-display" style={{ color: RPE_COLORS[Math.round(avgRpe) - 1] || BLAZE, fontSize: 24 }}>{avgRpe.toFixed(1)}</span>
              <span style={{ color: STEEL, fontSize: 11 }}>/ 6</span>
            </div>
          </div>
        )}

        {bestWeekKcal > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
            <Trophy size={16} color={KHAKI} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: PAPER, fontSize: 13, fontWeight: 600 }}>{t('hist.bestweek.title')}</div>
              <div style={{ color: STEEL, fontSize: 11.5 }}>{t('hist.bestweek.sub')}</div>
            </div>
            <span className="o40-display" style={{ color: BLAZE, fontSize: 22 }}>{bestWeekKcal}</span>
            <span style={{ color: STEEL, fontSize: 10.5 }}>{t('hist.kcal.unit')}</span>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.goal.title')}</div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: PAPER, fontSize: 13 }}>{t('hist.goal.label')}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={() => onUpdateGoal(weeklyGoal - 1)} disabled={weeklyGoal <= 1} style={{ ...iconCircle, width: 30, height: 30, opacity: weeklyGoal <= 1 ? 0.4 : 1 }}>
                <span style={{ color: PAPER, fontSize: 16, lineHeight: 1 }}>–</span>
              </button>
              <span className="o40-display" style={{ color: PAPER, fontSize: 22, minWidth: 20, textAlign: 'center' }}>{weeklyGoal}</span>
              <button onClick={() => onUpdateGoal(weeklyGoal + 1)} disabled={weeklyGoal >= 7} style={{ ...iconCircle, width: 30, height: 30, opacity: weeklyGoal >= 7 ? 0.4 : 1 }}>
                <span style={{ color: PAPER, fontSize: 16, lineHeight: 1 }}>+</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.35d')}</div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
              {heatmap.map(c => (
                <div key={c.key} title={c.key} style={{
                  aspectRatio: '1 / 1', borderRadius: 3,
                  background: c.active ? BLAZE : OLIVE_DARK, opacity: c.active ? 1 : 0.6,
                }} />
              ))}
            </div>
          </div>
        </div>

        {sessions.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.milestones')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '14px 8px', display: 'flex' }}>
              {STREAK_BADGES.map(n => <Badge key={`s${n}`} label={t('hist.miles.streak', { n })} value={n} unlocked={bestStreak >= n} />)}
              {SESSION_BADGES.map(n => <Badge key={`n${n}`} label={t('hist.miles.sessions', { n })} value={n} unlocked={sessions.length >= n} />)}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.kcal7')}</div>
            {trendPct !== null && (
              <span className="o40-mono" style={{ color: STEEL, fontSize: 11 }}>
                {t('hist.vsweek', { p: (trendPct > 0 ? '+' : '') + trendPct })}
              </span>
            )}
          </div>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                <YAxis tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} cursor={{ fill: OLIVE_DARK }} />
                <Bar dataKey="kcal" fill={BLAZE} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {sessions.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.fav')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PROGRAMS.map(p => (
                <div key={p.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: PAPER }}>{tr(p.name, lang)}</span>
                    <span className="o40-mono" style={{ color: STEEL }}>{counts[p.id]}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: OLIVE_DARK, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(counts[p.id] / maxCount) * 100}%`, background: BLAZE, borderRadius: 3, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hrData.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.hr')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hrData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} />
                  <Line type="monotone" dataKey="hr" stroke={BLAZE} strokeWidth={2} dot={{ r: 3, fill: BLAZE }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {waistData.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.waist')}</div>
              <span className="o40-mono" style={{ color: waistData[0].cm <= waistData[waistData.length - 1].cm ? BLAZE : '#7FB069', fontSize: 11 }}>
                {t('hist.waist.total', { v: (waistData[waistData.length - 1].cm - waistData[0].cm > 0 ? '+' : '') + (waistData[waistData.length - 1].cm - waistData[0].cm) })}
              </span>
            </div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waistData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} />
                  <Line type="monotone" dataKey="cm" stroke={BLAZE} strokeWidth={2} dot={{ r: 3, fill: BLAZE }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {weightData.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('hist.weight')}</div>
              <span className="o40-mono" style={{ color: weightData[weightData.length - 1].kg <= weightData[0].kg ? '#7FB069' : BLAZE, fontSize: 11 }}>
                {t('hist.weight.total', { v: (weightData[weightData.length - 1].kg - weightData[0].kg > 0 ? '+' : '') + (weightData[weightData.length - 1].kg - weightData[0].kg).toFixed(1) })}
              </span>
            </div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis domain={['dataMin - 1.5', 'dataMax + 1.5']} tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: '#7FB069' }} />
                  <Line type="monotone" dataKey="kg" stroke="#7FB069" strokeWidth={2} dot={{ r: 3, fill: '#7FB069' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {rpeSeries.length >= 2 && (
          <div style={{ marginBottom: 20 }}>
            <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.rpe')}</div>
            <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: '10px 6px', height: 150 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rpeSeries} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke={OLIVE_DARK} strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: STEEL, fontSize: 10 }} axisLine={{ stroke: OLIVE }} tickLine={false} />
                  <YAxis domain={[1, 6]} ticks={[1, 2, 3, 4, 5, 6]} tick={{ fill: STEEL, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: KHAKI }} itemStyle={{ color: BLAZE }} />
                  <Line type="monotone" dataKey="rpe" stroke={BLAZE} strokeWidth={2} dot={{ r: 3, fill: BLAZE }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="o40-mono" style={{ color: KHAKI, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{t('hist.sessions.title')}</div>
        {ordered.length === 0 && <div style={{ color: STEEL, fontSize: 13 }}>{t('hist.empty')}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ordered.map((s, i) => {
            const zone = s.peakHR ? hrZone(s.peakHR, profile.age, lang) : null;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: PAPER, fontSize: 14, fontWeight: 600 }}>{s.programName}</div>
                    <div style={{ color: STEEL, fontSize: 11.5 }}>{new Date(s.date).toLocaleDateString(LOCALES[lang], { weekday: 'short', day: '2-digit', month: 'short' })}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: KHAKI, fontSize: 12.5 }}><Flame size={13} color={BLAZE} /> {s.kcal}</div>
                  {zone && <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: zone.color, fontSize: 12.5 }}><HeartPulse size={13} /> {s.peakHR}</div>}
                  {s.rpe && <div className="o40-mono" style={{ color: STEEL, fontSize: 10.5, border: `1px solid ${OLIVE}`, borderRadius: 4, padding: '2px 5px' }}>{tr(RPE_LABELS[s.rpe - 1], lang)}</div>}
                  <button onClick={() => {
                    if (confirmDeleteDate === s.date) { onDeleteSession(s.date); setConfirmDeleteDate(null); }
                    else { setConfirmDeleteDate(s.date); setTimeout(() => setConfirmDeleteDate(c => c === s.date ? null : c), 3000); }
                  }} style={{ ...btnIcon, padding: 4, background: confirmDeleteDate === s.date ? `${BLAZE}33` : 'transparent' }} aria-label={t('hist.delete')}>
                    {confirmDeleteDate === s.date ? <Check size={14} color={BLAZE} /> : <X size={14} color={STEEL} />}
                  </button>
                </div>
                {s.notes && <div style={{ color: STEEL, fontSize: 11.5, fontStyle: 'italic', lineHeight: 1.4 }}>"{s.notes}"</div>}
              </div>
            );
          })}
        </div>

        {sessions.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button onClick={() => exportData(profile, sessions)} style={{ ...secondaryBtn, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {t('hist.export')}
            </button>
            <button onClick={() => setConfirmClear(true)} style={{ ...secondaryBtn, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RotateCcw size={15} /> {t('hist.clear')}
            </button>
          </div>
        )}
      </div>

      {confirmClear && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,29,22,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: INK_2, border: `1px solid ${OLIVE}`, borderRadius: 14, padding: 22, maxWidth: 320, textAlign: 'center' }}>
            <div className="o40-display" style={{ color: PAPER, fontSize: 22, marginBottom: 8 }}>{t('hist.clear.title')}</div>
            <div style={{ color: STEEL, fontSize: 13, marginBottom: 18 }}>{t('hist.clear.body')}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmClear(false)} style={{ ...secondaryBtn, flex: 1 }}>{t('hist.clear.cancel')}</button>
              <button onClick={() => { setConfirmClear(false); onClear(); }} style={{ ...primaryBtn, flex: 1 }}>{t('hist.clear.confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
