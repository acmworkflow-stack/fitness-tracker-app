import React, { useState, useEffect } from 'react';
import { Calendar, Plus, TrendingUp, Apple, Dumbbell, Target, Check, X, Edit2, Trash2, Bell, User, ChevronRight, ChevronLeft, Copy, Upload, Search, Play, Info, Clock, Activity } from 'lucide-react';

// Comprehensive food database (MyFitnessPal-style)
const FOOD_DATABASE = {
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fats: 3.6, serving: '100g' },
  'brown rice': { calories: 112, protein: 2.6, carbs: 24, fats: 0.9, serving: '100g' },
  'white rice': { calories: 130, protein: 2.7, carbs: 28, fats: 0.3, serving: '100g' },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fats: 0.4, serving: '100g' },
  'salmon': { calories: 208, protein: 20, carbs: 0, fats: 13, serving: '100g' },
  'eggs': { calories: 155, protein: 13, carbs: 1.1, fats: 11, serving: '2 large' },
  'egg whites': { calories: 52, protein: 11, carbs: 0.7, fats: 0.2, serving: '100g' },
  'oatmeal': { calories: 389, protein: 17, carbs: 66, fats: 7, serving: '100g' },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fats: 0.3, serving: '1 medium' },
  'apple': { calories: 52, protein: 0.3, carbs: 14, fats: 0.2, serving: '1 medium' },
  'almonds': { calories: 579, protein: 21, carbs: 22, fats: 50, serving: '100g' },
  'peanut butter': { calories: 588, protein: 25, carbs: 20, fats: 50, serving: '100g' },
  'greek yogurt': { calories: 59, protein: 10, carbs: 3.6, fats: 0.4, serving: '100g' },
  'whole milk': { calories: 61, protein: 3.2, carbs: 5, fats: 3.3, serving: '100ml' },
  'skim milk': { calories: 34, protein: 3.4, carbs: 5, fats: 0.1, serving: '100ml' },
  'avocado': { calories: 160, protein: 2, carbs: 9, fats: 15, serving: '100g' },
  'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fats: 0.1, serving: '100g' },
  'ground beef': { calories: 250, protein: 26, carbs: 0, fats: 15, serving: '100g' },
  'ground turkey': { calories: 150, protein: 20, carbs: 0, fats: 7, serving: '100g' },
  'tuna': { calories: 132, protein: 28, carbs: 0, fats: 1.3, serving: '100g' },
  'tilapia': { calories: 96, protein: 20, carbs: 0, fats: 1.7, serving: '100g' },
  'shrimp': { calories: 99, protein: 24, carbs: 0.2, fats: 0.3, serving: '100g' },
  'quinoa': { calories: 120, protein: 4.4, carbs: 21, fats: 1.9, serving: '100g' },
  'pasta': { calories: 131, protein: 5, carbs: 25, fats: 1.1, serving: '100g' },
  'bread': { calories: 265, protein: 9, carbs: 49, fats: 3.2, serving: '100g' },
  'cheese': { calories: 402, protein: 25, carbs: 1.3, fats: 33, serving: '100g' },
  'cottage cheese': { calories: 98, protein: 11, carbs: 3.4, fats: 4.3, serving: '100g' },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, serving: '100g' },
  'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, serving: '100g' },
  'cucumber': { calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1, serving: '100g' },
  'carrots': { calories: 41, protein: 0.9, carbs: 10, fats: 0.2, serving: '100g' },
  'olive oil': { calories: 884, protein: 0, carbs: 0, fats: 100, serving: '100ml' },
  'coconut oil': { calories: 862, protein: 0, carbs: 0, fats: 100, serving: '100ml' },
  'protein powder': { calories: 120, protein: 24, carbs: 3, fats: 1.5, serving: '1 scoop' },
  'honey': { calories: 304, protein: 0.3, carbs: 82, fats: 0, serving: '100g' },
  'orange': { calories: 47, protein: 0.9, carbs: 12, fats: 0.1, serving: '1 medium' },
  'strawberries': { calories: 32, protein: 0.7, carbs: 8, fats: 0.3, serving: '100g' },
  'blueberries': { calories: 57, protein: 0.7, carbs: 14, fats: 0.3, serving: '100g' },
  'bell pepper': { calories: 31, protein: 1, carbs: 6, fats: 0.3, serving: '100g' },
  'onion': { calories: 40, protein: 1.1, carbs: 9, fats: 0.1, serving: '100g' },
  'garlic': { calories: 149, protein: 6.4, carbs: 33, fats: 0.5, serving: '100g' }
};

// Running distance database for time trials
const RUNNING_DISTANCES = [
  { id: '100m', name: '100 Meter Sprint', distance: 100, unit: 'meters', category: 'Sprint' },
  { id: '200m', name: '200 Meter Sprint', distance: 200, unit: 'meters', category: 'Sprint' },
  { id: '400m', name: '400 Meter Sprint', distance: 400, unit: 'meters', category: 'Sprint' },
  { id: '800m', name: '800 Meter Run', distance: 800, unit: 'meters', category: 'Middle Distance' },
  { id: '1500m', name: '1500 Meter Run', distance: 1500, unit: 'meters', category: 'Middle Distance' },
  { id: '1mile', name: '1 Mile Run', distance: 1.0, unit: 'miles', category: 'Middle Distance' },
  { id: '5k', name: '5K Run', distance: 5, unit: 'km', category: 'Distance' },
  { id: '10k', name: '10K Run', distance: 10, unit: 'km', category: 'Distance' },
  { id: 'half', name: 'Half Marathon', distance: 21.1, unit: 'km', category: 'Long Distance' },
  { id: 'full', name: 'Full Marathon', distance: 42.2, unit: 'km', category: 'Long Distance' }
];

// Muscle group mapping with recovery times
const MUSCLE_GROUPS = {
  // Upper Body Front
  'chest': { name: 'Chest', location: 'front', recovery: 48 },
  'front-delts': { name: 'Front Deltoids', location: 'front', recovery: 48 },
  'biceps': { name: 'Biceps', location: 'front', recovery: 48 },
  'abs': { name: 'Abdominals', location: 'front', recovery: 24 },
  'obliques': { name: 'Obliques', location: 'front', recovery: 24 },
  'quads': { name: 'Quadriceps', location: 'front', recovery: 72 },
  'hip-flexors': { name: 'Hip Flexors', location: 'front', recovery: 48 },
  
  // Upper Body Back
  'traps': { name: 'Trapezius', location: 'back', recovery: 48 },
  'rear-delts': { name: 'Rear Deltoids', location: 'back', recovery: 48 },
  'lats': { name: 'Latissimus Dorsi', location: 'back', recovery: 72 },
  'lower-back': { name: 'Lower Back', location: 'back', recovery: 72 },
  'triceps': { name: 'Triceps', location: 'back', recovery: 48 },
  'glutes': { name: 'Glutes', location: 'back', recovery: 72 },
  'hamstrings': { name: 'Hamstrings', location: 'back', recovery: 72 },
  'calves': { name: 'Calves', location: 'back', recovery: 48 }
};

// Exercise to muscle mapping
const EXERCISE_MUSCLE_MAP = {
  'barbell back squat': ['quads', 'glutes', 'hamstrings', 'lower-back'],
  'barbell bench press': ['chest', 'front-delts', 'triceps'],
  'barbell deadlift': ['hamstrings', 'glutes', 'lower-back', 'traps', 'lats'],
  'barbell row': ['lats', 'traps', 'rear-delts', 'biceps'],
  'overhead press': ['front-delts', 'triceps', 'traps'],
  'pull-ups': ['lats', 'biceps', 'traps'],
  'pull ups': ['lats', 'biceps', 'traps'],
  'dumbbell bench press': ['chest', 'front-delts', 'triceps'],
  'lunges': ['quads', 'glutes', 'hamstrings'],
  'romanian deadlift': ['hamstrings', 'glutes', 'lower-back'],
  'dumbbell shoulder press': ['front-delts', 'triceps'],
  'leg press': ['quads', 'glutes'],
  'bicep curls': ['biceps'],
  'tricep dips': ['triceps', 'chest'],
  'plank': ['abs', 'obliques'],
  'lat pulldown': ['lats', 'biceps'],
  'face pulls': ['rear-delts', 'traps'],
  'leg curl': ['hamstrings'],
  'calf raises': ['calves'],
  'cable flyes': ['chest'],
  'farmers walk': ['traps', 'abs', 'calves']
};

// Comprehensive exercise database with video links
const EXERCISE_DATABASE = [
  {
    id: 1,
    name: 'Barbell Back Squat',
    category: 'Legs',
    muscleGroup: 'Quads, Glutes, Hamstrings',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
    gifUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2VzYWtlZmhhNWM0d3F1ZTZrOTBuMGVxOTFsYXNhZGZhc2RmYXNk/example1.gif',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Place barbell on upper back',
      'Lower by bending knees and hips',
      'Keep chest up and core tight',
      'Push through heels to return to start'
    ]
  },
  {
    id: 2,
    name: 'Barbell Bench Press',
    category: 'Chest',
    muscleGroup: 'Chest, Triceps, Shoulders',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
    instructions: [
      'Lie flat on bench with feet planted',
      'Grip barbell slightly wider than shoulders',
      'Lower bar to mid-chest',
      'Press bar up until arms fully extended',
      'Keep shoulder blades retracted'
    ]
  },
  {
    id: 3,
    name: 'Barbell Deadlift',
    category: 'Back',
    muscleGroup: 'Back, Glutes, Hamstrings',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
    instructions: [
      'Stand with feet hip-width apart',
      'Grip barbell just outside legs',
      'Keep back straight, chest up',
      'Drive through heels to stand',
      'Lower with control'
    ]
  },
  {
    id: 4,
    name: 'Barbell Row',
    category: 'Back',
    muscleGroup: 'Lats, Rhomboids, Traps',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    instructions: [
      'Bend at hips, keep back straight',
      'Pull bar to lower chest',
      'Squeeze shoulder blades together',
      'Lower with control',
      'Keep core engaged'
    ]
  },
  {
    id: 5,
    name: 'Overhead Press',
    category: 'Shoulders',
    muscleGroup: 'Shoulders, Triceps',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
    instructions: [
      'Start with bar at shoulder height',
      'Press bar straight overhead',
      'Lock out arms at top',
      'Lower with control',
      'Keep core tight'
    ]
  },
  {
    id: 6,
    name: 'Pull-ups',
    category: 'Back',
    muscleGroup: 'Lats, Biceps',
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    instructions: [
      'Hang from bar with overhand grip',
      'Pull chest to bar',
      'Lower with control',
      'Full extension at bottom',
      'Engage lats throughout'
    ]
  },
  {
    id: 7,
    name: 'Dumbbell Bench Press',
    category: 'Chest',
    muscleGroup: 'Chest, Triceps, Shoulders',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94',
    instructions: [
      'Lie on bench with dumbbells',
      'Start with weights at chest level',
      'Press up until arms extended',
      'Lower with control',
      'Keep elbows at 45 degrees'
    ]
  },
  {
    id: 8,
    name: 'Lunges',
    category: 'Legs',
    muscleGroup: 'Quads, Glutes',
    equipment: 'Bodyweight/Dumbbells',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
    instructions: [
      'Step forward with one leg',
      'Lower hips until both knees bent 90°',
      'Push back to starting position',
      'Alternate legs',
      'Keep torso upright'
    ]
  },
  {
    id: 9,
    name: 'Romanian Deadlift',
    category: 'Legs',
    muscleGroup: 'Hamstrings, Glutes',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=2SHsk9AzdjA',
    instructions: [
      'Hold barbell at hip level',
      'Hinge at hips, push hips back',
      'Lower bar along legs',
      'Feel stretch in hamstrings',
      'Return to standing'
    ]
  },
  {
    id: 10,
    name: 'Dumbbell Shoulder Press',
    category: 'Shoulders',
    muscleGroup: 'Shoulders, Triceps',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
    instructions: [
      'Sit or stand with dumbbells at shoulders',
      'Press weights overhead',
      'Fully extend arms',
      'Lower with control',
      'Keep core engaged'
    ]
  },
  {
    id: 11,
    name: 'Leg Press',
    category: 'Legs',
    muscleGroup: 'Quads, Glutes',
    equipment: 'Machine',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    instructions: [
      'Sit in machine, feet on platform',
      'Release safety, lower weight',
      'Push through heels',
      'Extend legs fully',
      'Control the descent'
    ]
  },
  {
    id: 12,
    name: 'Bicep Curls',
    category: 'Arms',
    muscleGroup: 'Biceps',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    instructions: [
      'Stand with dumbbells at sides',
      'Curl weights to shoulders',
      'Keep elbows stationary',
      'Lower with control',
      'No swinging'
    ]
  },
  {
    id: 13,
    name: 'Tricep Dips',
    category: 'Arms',
    muscleGroup: 'Triceps',
    equipment: 'Bench/Bars',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
    instructions: [
      'Position hands on bars or bench',
      'Lower body by bending elbows',
      'Go until 90 degree angle',
      'Push back up',
      'Keep body upright'
    ]
  },
  {
    id: 14,
    name: 'Plank',
    category: 'Core',
    muscleGroup: 'Abs, Core',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    instructions: [
      'Start in forearm position',
      'Keep body in straight line',
      'Engage core',
      'Hold position',
      'Breathe normally'
    ]
  },
  {
    id: 15,
    name: 'Lat Pulldown',
    category: 'Back',
    muscleGroup: 'Lats, Biceps',
    equipment: 'Machine',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    instructions: [
      'Sit at machine, grab bar wide',
      'Pull bar to upper chest',
      'Squeeze shoulder blades',
      'Return with control',
      'Lean back slightly'
    ]
  },
  {
    id: 16,
    name: 'Face Pulls',
    category: 'Shoulders',
    muscleGroup: 'Rear Delts, Traps',
    equipment: 'Cable',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk',
    instructions: [
      'Set cable at face height',
      'Pull rope towards face',
      'Separate hands at end',
      'Squeeze rear delts',
      'Return with control'
    ]
  },
  {
    id: 17,
    name: 'Leg Curl',
    category: 'Legs',
    muscleGroup: 'Hamstrings',
    equipment: 'Machine',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
    instructions: [
      'Lie face down on machine',
      'Curl legs toward glutes',
      'Squeeze hamstrings',
      'Lower with control',
      'Full range of motion'
    ]
  },
  {
    id: 18,
    name: 'Calf Raises',
    category: 'Legs',
    muscleGroup: 'Calves',
    equipment: 'Machine/Bodyweight',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI',
    instructions: [
      'Stand with balls of feet on edge',
      'Raise heels as high as possible',
      'Hold at top',
      'Lower with control',
      'Full stretch at bottom'
    ]
  },
  {
    id: 19,
    name: 'Cable Flyes',
    category: 'Chest',
    muscleGroup: 'Chest',
    equipment: 'Cable',
    difficulty: 'Intermediate',
    videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o',
    instructions: [
      'Set cables at chest height',
      'Bring hands together',
      'Slight bend in elbows',
      'Squeeze chest',
      'Return with control'
    ]
  },
  {
    id: 20,
    name: 'Farmers Walk',
    category: 'Full Body',
    muscleGroup: 'Grip, Core, Traps',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    videoUrl: 'https://www.youtube.com/watch?v=rt17lmnaLSM',
    instructions: [
      'Hold heavy dumbbells at sides',
      'Walk forward with good posture',
      'Keep shoulders back',
      'Engage core',
      'Walk for distance or time'
    ]
  }
];

export default function FitnessTracker() {
  const [activeTab, setActiveTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [workoutTemplates, setWorkoutTemplates] = useState([]);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [userName, setUserName] = useState('Milli');
  const [calendarView, setCalendarView] = useState('week'); // 'week' or 'month'
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [draggedWorkout, setDraggedWorkout] = useState(null);
  
  // NEW: Time trials and body map state
  const [timeTrials, setTimeTrials] = useState([]);
  const [muscleFatigue, setMuscleFatigue] = useState({});
  const [showTimeTrialModal, setShowTimeTrialModal] = useState(false);
  const [showBodyMapModal, setShowBodyMapModal] = useState(false);
  const [bodyView, setBodyView] = useState('front'); // 'front' or 'back'

  // Food search state
  const [foodSearch, setFoodSearch] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [servingSize, setServingSize] = useState(1);

  // Workout form state
  const [workoutForm, setWorkoutForm] = useState({
    name: '',
    exercises: [],
    date: new Date().toISOString().split('T')[0],
    duration: '',
    notes: '',
    fromTemplate: false
  });

  // Exercise being added
  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    restTime: '3m'
  });

  // Meal form state
  const [mealForm, setMealForm] = useState({
    name: '',
    type: 'breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Program form state
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    phases: []
  });

  // Phase being added
  const [phaseForm, setPhaseForm] = useState({
    name: '',
    duration: '',
    workouts: []
  });

  // Template form state
  const [templateForm, setTemplateForm] = useState({
    name: '',
    exercises: [],
    description: ''
  });

  // Import text
  const [importText, setImportText] = useState('');
  
  // NEW: Time trial form state
  const [timeTrialForm, setTimeTrialForm] = useState({
    distanceId: '5k',
    time: '',
    date: new Date().toISOString().split('T')[0],
    raceDate: '',
    raceName: '',
    notes: ''
  });

  // Load data from storage
  useEffect(() => {
    const loadData = () => {
      try {
        const workoutsData = localStorage.getItem('workouts');
        const mealsData = localStorage.getItem('meals');
        const programsData = localStorage.getItem('programs');
        const templatesData = localStorage.getItem('templates');
        const timeTrialsData = localStorage.getItem('timeTrials');
        const fatigueData = localStorage.getItem('muscleFatigue');
        
        if (workoutsData) setWorkouts(JSON.parse(workoutsData));
        if (mealsData) setMeals(JSON.parse(mealsData));
        if (programsData) setPrograms(JSON.parse(programsData));
        if (templatesData) setWorkoutTemplates(JSON.parse(templatesData));
        if (timeTrialsData) setTimeTrials(JSON.parse(timeTrialsData));
        if (fatigueData) setMuscleFatigue(JSON.parse(fatigueData));
      } catch (error) {
        console.log('No existing data found, starting fresh');
      }
    };
    loadData();
  }, []);

  // Food search functionality
  useEffect(() => {
    if (foodSearch.trim().length > 0) {
      const results = Object.keys(FOOD_DATABASE)
        .filter(food => food.toLowerCase().includes(foodSearch.toLowerCase()))
        .slice(0, 10);
      setFoodResults(results);
    } else {
      setFoodResults([]);
    }
  }, [foodSearch]);

  // Select food from database
  const selectFood = (foodName) => {
    const food = FOOD_DATABASE[foodName];
    setSelectedFood(foodName);
    setFoodSearch(foodName);
    setFoodResults([]);
    
    // Auto-populate meal form
    setMealForm({
      ...mealForm,
      name: foodName,
      calories: Math.round(food.calories * servingSize),
      protein: Math.round(food.protein * servingSize * 10) / 10,
      carbs: Math.round(food.carbs * servingSize * 10) / 10,
      fats: Math.round(food.fats * servingSize * 10) / 10
    });
  };

  // Update serving size
  const updateServingSize = (size) => {
    setServingSize(size);
    if (selectedFood) {
      const food = FOOD_DATABASE[selectedFood];
      setMealForm({
        ...mealForm,
        calories: Math.round(food.calories * size),
        protein: Math.round(food.protein * size * 10) / 10,
        carbs: Math.round(food.carbs * size * 10) / 10,
        fats: Math.round(food.fats * size * 10) / 10
      });
    }
  };

  // Save workouts
  const saveWorkouts = (newWorkouts) => {
    setWorkouts(newWorkouts);
    try {
      localStorage.setItem('workouts', JSON.stringify(newWorkouts));
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  };

  // Save meals
  const saveMeals = (newMeals) => {
    setMeals(newMeals);
    try {
      localStorage.setItem('meals', JSON.stringify(newMeals));
    } catch (error) {
      console.error('Error saving meals:', error);
    }
  };

  // Save programs
  const savePrograms = (newPrograms) => {
    setPrograms(newPrograms);
    try {
      localStorage.setItem('programs', JSON.stringify(newPrograms));
    } catch (error) {
      console.error('Error saving programs:', error);
    }
  };

  // Save templates
  const saveTemplates = (newTemplates) => {
    setWorkoutTemplates(newTemplates);
    try {
      localStorage.setItem('templates', JSON.stringify(newTemplates));
    } catch (error) {
      console.error('Error saving templates:', error);
    }
  };

  // NEW: Save time trials
  const saveTimeTrials = (newTrials) => {
    setTimeTrials(newTrials);
    try {
      localStorage.setItem('timeTrials', JSON.stringify(newTrials));
    } catch (error) {
      console.error('Error saving time trials:', error);
    }
  };

  // NEW: Save muscle fatigue
  const saveMuscleFatigue = (newFatigue) => {
    try {
      localStorage.setItem('muscleFatigue', JSON.stringify(newFatigue));
    } catch (error) {
      console.error('Error saving muscle fatigue:', error);
    }
  };

  // NEW: Calculate and update muscle fatigue
  const updateMuscleFatigue = () => {
    const newFatigue = {};
    const now = new Date();
    
    // Get completed workouts from last 7 days
    const recentWorkouts = workouts.filter(w => {
      if (!w.completed) return false;
      const workoutDate = new Date(w.date);
      const daysDiff = (now - workoutDate) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    });

    // Calculate fatigue for each muscle
    Object.keys(MUSCLE_GROUPS).forEach(muscleKey => {
      let fatigue = 0;
      const muscle = MUSCLE_GROUPS[muscleKey];
      
      recentWorkouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          const exerciseName = exercise.name.toLowerCase();
          const muscles = EXERCISE_MUSCLE_MAP[exerciseName] || [];
          
          if (muscles.includes(muscleKey)) {
            const workoutDate = new Date(workout.date);
            const hoursSince = (now - workoutDate) / (1000 * 60 * 60);
            const recoveryHours = muscle.recovery;
            
            // Calculate fatigue: starts at 100%, decays over recovery period
            const sets = parseInt(exercise.sets) || 0;
            const intensity = sets * 10; // Each set adds 10% fatigue
            const decay = Math.max(0, 1 - (hoursSince / recoveryHours));
            fatigue += intensity * decay;
          }
        });
      });
      
      newFatigue[muscleKey] = Math.min(100, Math.round(fatigue));
    });

    setMuscleFatigue(newFatigue);
    saveMuscleFatigue(newFatigue);
  };

  // NEW: Update fatigue when workouts change
  useEffect(() => {
    updateMuscleFatigue();
  }, [workouts]);

  // Add exercise from library
  const addExerciseFromLibrary = (exercise) => {
    setExerciseForm({
      ...exerciseForm,
      name: exercise.name
    });
    setShowExerciseLibrary(false);
  };

  // Add exercise to workout
  const addExercise = () => {
    if (exerciseForm.name && exerciseForm.sets && exerciseForm.reps) {
      setWorkoutForm({
        ...workoutForm,
        exercises: [...workoutForm.exercises, { ...exerciseForm, id: Date.now() }]
      });
      setExerciseForm({ name: '', sets: '', reps: '', weight: '', restTime: '3m' });
    }
  };

  // Add exercise to template
  const addExerciseToTemplate = () => {
    if (exerciseForm.name && exerciseForm.sets && exerciseForm.reps) {
      setTemplateForm({
        ...templateForm,
        exercises: [...templateForm.exercises, { ...exerciseForm, id: Date.now() }]
      });
      setExerciseForm({ name: '', sets: '', reps: '', weight: '', restTime: '3m' });
    }
  };

  // Remove exercise from workout
  const removeExercise = (id) => {
    setWorkoutForm({
      ...workoutForm,
      exercises: workoutForm.exercises.filter(ex => ex.id !== id)
    });
  };

  // Remove exercise from template
  const removeExerciseFromTemplate = (id) => {
    setTemplateForm({
      ...templateForm,
      exercises: templateForm.exercises.filter(ex => ex.id !== id)
    });
  };

  // Save template
  const saveTemplate = () => {
    if (templateForm.name && templateForm.exercises.length > 0) {
      const newTemplate = {
        ...templateForm,
        id: Date.now()
      };
      saveTemplates([...workoutTemplates, newTemplate]);
      setTemplateForm({ name: '', exercises: [], description: '' });
      setShowTemplateModal(false);
    }
  };

  // Load template into workout
  const loadTemplate = (template) => {
    setWorkoutForm({
      ...workoutForm,
      name: template.name,
      exercises: template.exercises.map(ex => ({ ...ex, id: Date.now() + Math.random() })),
      fromTemplate: true
    });
    setShowWorkoutModal(true);
  };

  // Save program
  const saveProgram = () => {
    if (programForm.name && programForm.phases.length > 0) {
      const newProgram = {
        ...programForm,
        id: Date.now()
      };
      savePrograms([...programs, newProgram]);
      setProgramForm({ name: '', description: '', phases: [] });
      setShowProgramModal(false);
    }
  };

  // Delete template
  const deleteTemplate = (id) => {
    saveTemplates(workoutTemplates.filter(t => t.id !== id));
  };

  // Delete program
  const deleteProgram = (id) => {
    savePrograms(programs.filter(p => p.id !== id));
  };

  // Import workout from text
  const importWorkout = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed.exercises && Array.isArray(parsed.exercises)) {
        const newTemplate = {
          ...parsed,
          id: Date.now()
        };
        saveTemplates([...workoutTemplates, newTemplate]);
        setImportText('');
        setShowImportModal(false);
      }
    } catch (error) {
      alert('Invalid format. Please paste valid JSON.');
    }
  };

  // Export template
  const exportTemplate = (template) => {
    const json = JSON.stringify(template, null, 2);
    navigator.clipboard.writeText(json);
    alert('Template copied to clipboard!');
  };

  // Save workout
  const saveWorkout = () => {
    if (workoutForm.name && workoutForm.exercises.length > 0) {
      const newWorkout = {
        ...workoutForm,
        id: Date.now(),
        completed: false,
        fromTemplate: false
      };
      saveWorkouts([...workouts, newWorkout]);
      setWorkoutForm({ name: '', exercises: [], date: new Date().toISOString().split('T')[0], duration: '', notes: '', fromTemplate: false });
      setShowWorkoutModal(false);
    }
  };

  // Save meal
  const saveMeal = () => {
    if (mealForm.name && mealForm.calories) {
      const newMeal = {
        ...mealForm,
        id: Date.now()
      };
      saveMeals([...meals, newMeal]);
      setMealForm({ name: '', type: 'breakfast', calories: '', protein: '', carbs: '', fats: '', date: new Date().toISOString().split('T')[0], notes: '' });
      setFoodSearch('');
      setSelectedFood(null);
      setServingSize(1);
      setShowMealModal(false);
    }
  };

  // Toggle workout completion
  const toggleWorkoutComplete = (id) => {
    const updated = workouts.map(w => 
      w.id === id ? { ...w, completed: !w.completed } : w
    );
    saveWorkouts(updated);
  };

  // Delete workout
  const deleteWorkout = (id) => {
    saveWorkouts(workouts.filter(w => w.id !== id));
  };

  // Delete meal
  const deleteMeal = (id) => {
    saveMeals(meals.filter(m => m.id !== id));
  };

  // Move workout to different date
  const moveWorkout = (workoutId, newDate) => {
    const updated = workouts.map(w =>
      w.id === workoutId ? { ...w, date: newDate } : w
    );
    saveWorkouts(updated);
  };

  // Drag and drop handlers
  const handleDragStart = (workout) => {
    setDraggedWorkout(workout);
  };

  const handleDrop = (date) => {
    if (draggedWorkout) {
      moveWorkout(draggedWorkout.id, date);
      setDraggedWorkout(null);
    }
  };

  // NEW: Time trial functions
  const saveTimeTrial = () => {
    if (timeTrialForm.time && timeTrialForm.distanceId) {
      const distance = RUNNING_DISTANCES.find(d => d.id === timeTrialForm.distanceId);
      const newTrial = {
        ...timeTrialForm,
        id: Date.now(),
        distanceName: distance.name,
        category: distance.category
      };
      saveTimeTrials([...timeTrials, newTrial]);
      setTimeTrialForm({
        distanceId: '5k',
        time: '',
        date: new Date().toISOString().split('T')[0],
        raceDate: '',
        raceName: '',
        notes: ''
      });
      setShowTimeTrialModal(false);
    }
  };

  const deleteTimeTrial = (id) => {
    saveTimeTrials(timeTrials.filter(t => t.id !== id));
  };

  const getBestTime = (distanceId) => {
    const trials = timeTrials
      .filter(t => t.distanceId === distanceId)
      .sort((a, b) => {
        // Simple time comparison (works for mm:ss and hh:mm:ss)
        const [aMin, aSec] = a.time.split(':').map(Number);
        const [bMin, bSec] = b.time.split(':').map(Number);
        return (aMin * 60 + aSec) - (bMin * 60 + bSec);
      });
    return trials[0];
  };

  // NEW: Get fatigue color for display
  const getFatigueColor = (level) => {
    if (level === 0) return 'bg-green-200 text-green-800';
    if (level < 30) return 'bg-green-300 text-green-800';
    if (level < 50) return 'bg-yellow-300 text-yellow-800';
    if (level < 70) return 'bg-orange-300 text-orange-800';
    return 'bg-red-300 text-red-800';
  };

  const getFatigueLevel = (level) => {
    if (level === 0) return 'Fresh';
    if (level < 30) return 'Ready';
    if (level < 50) return 'Moderate';
    if (level < 70) return 'Fatigued';
    return 'High Fatigue';
  };

  // Get today's stats
  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayWorkouts = workouts.filter(w => w.date === today);
    const todayMeals = meals.filter(m => m.date === today);
    
    const totalCalories = todayMeals.reduce((sum, m) => sum + Number(m.calories || 0), 0);
    const totalProtein = todayMeals.reduce((sum, m) => sum + Number(m.protein || 0), 0);
    const totalCarbs = todayMeals.reduce((sum, m) => sum + Number(m.carbs || 0), 0);
    const totalFats = todayMeals.reduce((sum, m) => sum + Number(m.fats || 0), 0);
    const completedWorkouts = todayWorkouts.filter(w => w.completed).length;

    return { totalCalories, totalProtein, totalCarbs, totalFats, completedWorkouts, totalWorkouts: todayWorkouts.length };
  };

  // Get next 7 days
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 0
      });
    }
    return days;
  };

  // Get calendar days for month view
  const getMonthDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i).toISOString().split('T')[0],
        day: prevMonthLastDay - i,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i).toISOString().split('T')[0],
        day: i,
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i).toISOString().split('T')[0],
        day: i,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Render calendar day
  const renderCalendarDay = (day) => {
    const dayWorkouts = workouts.filter(w => w.date === day.date);
    const dayMeals = meals.filter(m => m.date === day.date);
    
    return (
      <div key={day.date} className={`min-h-[100px] p-2 border border-gray-200 ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-50 cursor-pointer transition-colors`}>
        <div className="text-sm font-medium text-gray-900 mb-1">{day.day}</div>
        <div className="space-y-1">
          {dayWorkouts.map(workout => (
            <div key={workout.id} className={`text-xs p-1 rounded ${workout.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {workout.name}
            </div>
          ))}
          {dayMeals.map(meal => (
            <div key={meal.id} className="text-xs p-1 rounded bg-orange-100 text-orange-800">
              {meal.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const days = getNext7Days();
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map(day => {
          const dayWorkouts = workouts.filter(w => w.date === day.date);
          const dayMeals = meals.filter(m => m.date === day.date);
          
          return (
            <div key={day.date} className={`min-h-[200px] p-4 border border-gray-200 rounded-lg ${day.isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'} hover:shadow-md transition-shadow cursor-pointer`} onClick={() => setCurrentDate(day.date)} onDrop={() => handleDrop(day.date)} onDragOver={(e) => e.preventDefault()}>
              <div className="text-lg font-semibold text-gray-900 mb-2">{day.dayName}</div>
              <div className="text-sm text-gray-600 mb-4">{day.day}</div>
              
              <div className="space-y-2">
                {dayWorkouts.map(workout => (
                  <div key={workout.id} draggable onDragStart={() => handleDragStart(workout)} className={`p-2 rounded-lg text-sm ${workout.completed ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-blue-100 text-blue-800 border border-blue-200'} hover:shadow-sm transition-shadow`}>
                    <div className="font-medium">{workout.name}</div>
                    <div className="text-xs opacity-75">{workout.exercises.length} exercises</div>
                  </div>
                ))}
                
                {dayMeals.map(meal => (
                  <div key={meal.id} className="p-2 rounded-lg text-sm bg-orange-100 text-orange-800 border border-orange-200">
                    <div className="font-medium">{meal.name}</div>
                    <div className="text-xs opacity-75">{meal.calories} cal</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const days = getMonthDays();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-semibold text-gray-700 bg-gray-100">
            {day}
          </div>
        ))}
        {days.map(renderCalendarDay)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Fitness Tracker</h1>
              </div>
              <div className="text-sm text-gray-600">
                Welcome back, {userName}!
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowWorkoutModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Workout
              </button>
              
              <button
                onClick={() => setShowMealModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Apple className="h-4 w-4 mr-2" />
                Add Meal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'home', label: 'Home', icon: Target },
              { id: 'workouts', label: 'Workouts', icon: Dumbbell },
              { id: 'meals', label: 'Meals', icon: Apple },
              { id: 'programs', label: 'Programs', icon: TrendingUp },
              { id: 'templates', label: 'Templates', icon: Copy },
              { id: 'time-trials', label: 'Time Trials', icon: Clock },
              { id: 'body-map', label: 'Body Map', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Today's Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{getTodayStats().completedWorkouts}</div>
                  <div className="text-sm text-gray-600">Workouts Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{getTodayStats().totalCalories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{getTodayStats().totalProtein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{getTodayStats().totalCarbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCalendarView('week')}
                    className={`px-3 py-1 text-sm rounded ${calendarView === 'week' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setCalendarView('month')}
                    className={`px-3 py-1 text-sm rounded ${calendarView === 'month' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    Month
                  </button>
                </div>
              </div>
              
              {calendarView === 'week' ? renderWeekView() : renderMonthView()}
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Workouts</h2>
              <button
                onClick={() => setShowWorkoutModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Workout
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workouts.map(workout => (
                <div key={workout.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleWorkoutComplete(workout.id)}
                        className={`p-1 rounded ${workout.completed ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteWorkout(workout.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {workout.exercises.map(exercise => (
                      <div key={exercise.id} className="flex justify-between text-sm">
                        <span className="text-gray-900">{exercise.name}</span>
                        <span className="text-gray-600">{exercise.sets}×{exercise.reps}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {new Date(workout.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Meals</h2>
              <button
                onClick={() => setShowMealModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Meal
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {meals.map(meal => (
                <div key={meal.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
                    <button
                      onClick={() => deleteMeal(meal.id)}
                      className="p-1 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{meal.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{meal.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {new Date(meal.date).toLocaleDateString()} • {meal.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
              <button
                onClick={() => setShowProgramModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Program
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {programs.map(program => (
                <div key={program.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                    <button
                      onClick={() => deleteProgram(program.id)}
                      className="p-1 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="text-sm text-gray-600">
                    {program.phases.length} phases
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Workout Templates</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowTemplateModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </button>
                <button
                  onClick={() => setShowImportModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workoutTemplates.map(template => (
                <div key={template.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => loadTemplate(template)}
                        className="p-1 rounded text-blue-600 hover:bg-blue-50"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => exportTemplate(template)}
                        className="p-1 rounded text-gray-600 hover:bg-gray-50"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {template.exercises.map(exercise => (
                      <div key={exercise.id} className="flex justify-between text-sm">
                        <span className="text-gray-900">{exercise.name}</span>
                        <span className="text-gray-600">{exercise.sets}×{exercise.reps}</span>
                      </div>
                    ))}
                  </div>
                  
                  {template.description && (
                    <p className="text-sm text-gray-600">{template.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'time-trials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Time Trials</h2>
              <button
                onClick={() => setShowTimeTrialModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Time Trial
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {RUNNING_DISTANCES.map(distance => {
                const bestTime = getBestTime(distance.id);
                return (
                  <div key={distance.id} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{distance.name}</h3>
                    <div className="text-sm text-gray-600 mb-4">{distance.category}</div>
                    
                    {bestTime ? (
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-orange-600">{bestTime.time}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(bestTime.date).toLocaleDateString()}
                        </div>
                        {bestTime.raceName && (
                          <div className="text-sm text-gray-600">{bestTime.raceName}</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500">No times recorded</div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Time Trials</h3>
              <div className="space-y-2">
                {timeTrials.map(trial => (
                  <div key={trial.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{trial.distanceName}</div>
                      <div className="text-sm text-gray-600">{trial.time} • {new Date(trial.date).toLocaleDateString()}</div>
                      {trial.raceName && <div className="text-sm text-gray-600">{trial.raceName}</div>}
                    </div>
                    <button
                      onClick={() => deleteTimeTrial(trial.id)}
                      className="p-1 rounded text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'body-map' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Body Map</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setBodyView('front')}
                  className={`px-3 py-1 text-sm rounded ${bodyView === 'front' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Front
                </button>
                <button
                  onClick={() => setBodyView('back')}
                  className={`px-3 py-1 text-sm rounded ${bodyView === 'back' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Back
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(MUSCLE_GROUPS)
                  .filter(muscle => MUSCLE_GROUPS[muscle].location === bodyView)
                  .map(muscleKey => {
                    const muscle = MUSCLE_GROUPS[muscleKey];
                    const fatigue = muscleFatigue[muscleKey] || 0;
                    return (
                      <div key={muscleKey} className={`p-4 rounded-lg ${getFatigueColor(fatigue)}`}>
                        <div className="font-medium">{muscle.name}</div>
                        <div className="text-sm">{getFatigueLevel(fatigue)}</div>
                        <div className="text-xs mt-1">{fatigue}% fatigued</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Workout Modal */}
      {showWorkoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Workout</h3>
                <button
                  onClick={() => setShowWorkoutModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Workout Name</label>
                  <input
                    type="text"
                    value={workoutForm.name}
                    onChange={(e) => setWorkoutForm({...workoutForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Push Day, Leg Day"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={workoutForm.date}
                    onChange={(e) => setWorkoutForm({...workoutForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exercises</label>
                  <div className="space-y-2 mb-4">
                    {workoutForm.exercises.map(exercise => (
                      <div key={exercise.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <span className="flex-1">{exercise.name}</span>
                        <span>{exercise.sets}×{exercise.reps}</span>
                        {exercise.weight && <span>{exercise.weight}</span>}
                        <button
                          onClick={() => removeExercise(exercise.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <input
                      type="text"
                      value={exerciseForm.name}
                      onChange={(e) => setExerciseForm({...exerciseForm, name: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Exercise name"
                    />
                    <input
                      type="number"
                      value={exerciseForm.sets}
                      onChange={(e) => setExerciseForm({...exerciseForm, sets: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Sets"
                    />
                    <input
                      type="text"
                      value={exerciseForm.reps}
                      onChange={(e) => setExerciseForm({...exerciseForm, reps: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Reps"
                    />
                    <input
                      type="text"
                      value={exerciseForm.weight}
                      onChange={(e) => setExerciseForm({...exerciseForm, weight: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Weight"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={addExercise}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Exercise
                    </button>
                    <button
                      onClick={() => setShowExerciseLibrary(true)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Browse Library
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={workoutForm.duration}
                    onChange={(e) => setWorkoutForm({...workoutForm, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 60"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={workoutForm.notes}
                    onChange={(e) => setWorkoutForm({...workoutForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowWorkoutModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveWorkout}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meal Modal */}
      {showMealModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Meal</h3>
                <button
                  onClick={() => setShowMealModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={foodSearch}
                      onChange={(e) => setFoodSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Search for food..."
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  
                  {foodResults.length > 0 && (
                    <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
                      {foodResults.map(food => (
                        <button
                          key={food}
                          onClick={() => selectFood(food)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
                        >
                          {food}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                    <input
                      type="text"
                      value={mealForm.name}
                      onChange={(e) => setMealForm({...mealForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Grilled Chicken"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={mealForm.type}
                      onChange={(e) => setMealForm({...mealForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={servingSize}
                      onChange={(e) => updateServingSize(parseFloat(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0.1"
                      step="0.1"
                    />
                    <span className="text-gray-600">×</span>
                    <span className="text-gray-600">{selectedFood ? FOOD_DATABASE[selectedFood].serving : 'serving'}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                    <input
                      type="number"
                      value={mealForm.calories}
                      onChange={(e) => setMealForm({...mealForm, calories: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                    <input
                      type="number"
                      value={mealForm.protein}
                      onChange={(e) => setMealForm({...mealForm, protein: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      value={mealForm.carbs}
                      onChange={(e) => setMealForm({...mealForm, carbs: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fats (g)</label>
                    <input
                      type="number"
                      value={mealForm.fats}
                      onChange={(e) => setMealForm({...mealForm, fats: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={mealForm.date}
                    onChange={(e) => setMealForm({...mealForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={mealForm.notes}
                    onChange={(e) => setMealForm({...mealForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowMealModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveMeal}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Modal */}
      {showProgramModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create Program</h3>
                <button
                  onClick={() => setShowProgramModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                  <input
                    type="text"
                    value={programForm.name}
                    onChange={(e) => setProgramForm({...programForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 12 Week Strength Program"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={programForm.description}
                    onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Program description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phases</label>
                  <div className="space-y-2">
                    {programForm.phases.map((phase, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">{phase.name}</div>
                        <div className="text-sm text-gray-600">{phase.duration} weeks</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <input
                      type="text"
                      value={phaseForm.name}
                      onChange={(e) => setPhaseForm({...phaseForm, name: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Phase name"
                    />
                    <input
                      type="number"
                      value={phaseForm.duration}
                      onChange={(e) => setPhaseForm({...phaseForm, duration: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Weeks"
                    />
                  </div>
                  
                  <button
                    onClick={() => {
                      setProgramForm({
                        ...programForm,
                        phases: [...programForm.phases, phaseForm]
                      });
                      setPhaseForm({ name: '', duration: '', workouts: [] });
                    }}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Phase
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowProgramModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProgram}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create Template</h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Push Day Template"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Template description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exercises</label>
                  <div className="space-y-2 mb-4">
                    {templateForm.exercises.map(exercise => (
                      <div key={exercise.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <span className="flex-1">{exercise.name}</span>
                        <span>{exercise.sets}×{exercise.reps}</span>
                        {exercise.weight && <span>{exercise.weight}</span>}
                        <button
                          onClick={() => removeExerciseFromTemplate(exercise.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <input
                      type="text"
                      value={exerciseForm.name}
                      onChange={(e) => setExerciseForm({...exerciseForm, name: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Exercise name"
                    />
                    <input
                      type="number"
                      value={exerciseForm.sets}
                      onChange={(e) => setExerciseForm({...exerciseForm, sets: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Sets"
                    />
                    <input
                      type="text"
                      value={exerciseForm.reps}
                      onChange={(e) => setExerciseForm({...exerciseForm, reps: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Reps"
                    />
                    <input
                      type="text"
                      value={exerciseForm.weight}
                      onChange={(e) => setExerciseForm({...exerciseForm, weight: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Weight"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={addExerciseToTemplate}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Exercise
                    </button>
                    <button
                      onClick={() => setShowExerciseLibrary(true)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Browse Library
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Import Template</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">JSON Template</label>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Paste JSON template here..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={importWorkout}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Library Modal */}
      {showExerciseLibrary && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Exercise Library</h3>
                <button
                  onClick={() => setShowExerciseLibrary(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
                {EXERCISE_DATABASE.map(exercise => (
                  <div key={exercise.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                      <button
                        onClick={() => addExerciseFromLibrary(exercise)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {exercise.category} • {exercise.equipment}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      Difficulty: {exercise.difficulty}
                    </div>
                    
                    <div className="text-sm text-gray-700">
                      <strong>Muscle Groups:</strong> {exercise.muscleGroup}
                    </div>
                    
                    {exercise.instructions && (
                      <div className="mt-2">
                        <details className="text-sm">
                          <summary className="cursor-pointer text-blue-600 hover:text-blue-800">Instructions</summary>
                          <ol className="mt-2 list-decimal list-inside space-y-1">
                            {exercise.instructions.map((instruction, index) => (
                              <li key={index} className="text-gray-700">{instruction}</li>
                            ))}
                          </ol>
                        </details>
                      </div>
                    )}
                    
                    {exercise.videoUrl && (
                      <div className="mt-2">
                        <a
                          href={exercise.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Watch Video
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Trial Modal */}
      {showTimeTrialModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Time Trial</h3>
                <button
                  onClick={() => setShowTimeTrialModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                  <select
                    value={timeTrialForm.distanceId}
                    onChange={(e) => setTimeTrialForm({...timeTrialForm, distanceId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {RUNNING_DISTANCES.map(distance => (
                      <option key={distance.id} value={distance.id}>
                        {distance.name} ({distance.distance} {distance.unit})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time (mm:ss or hh:mm:ss)</label>
                  <input
                    type="text"
                    value={timeTrialForm.time}
                    onChange={(e) => setTimeTrialForm({...timeTrialForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 25:30 or 1:25:30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={timeTrialForm.date}
                    onChange={(e) => setTimeTrialForm({...timeTrialForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Race Name (Optional)</label>
                  <input
                    type="text"
                    value={timeTrialForm.raceName}
                    onChange={(e) => setTimeTrialForm({...timeTrialForm, raceName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Boston Marathon"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Race Date (Optional)</label>
                  <input
                    type="date"
                    value={timeTrialForm.raceDate}
                    onChange={(e) => setTimeTrialForm({...timeTrialForm, raceDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={timeTrialForm.notes}
                    onChange={(e) => setTimeTrialForm({...timeTrialForm, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTimeTrialModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTimeTrial}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Save Time Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}