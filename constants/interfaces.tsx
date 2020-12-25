export interface reduxState{
    exerciseIndex?: number;
    currentWorkout: workoutPlaylist;
    allWorkouts: workoutPlaylist[];
    currentAllWorkoutsIndex?: number;
}

export interface workoutPlaylist{
    workoutName: string;
    index: number;
    exerciseList: (exerciseElement | restElement)[];
}

export interface exerciseElement{
    exerciseName: string;
    exerciseReps: number;
    drag?: () => void;
    key: string;
    openModal?: () => void;
    closeModal?: () => void;
    setCurrentEditExercise?: (element : exerciseElement) => void;
}

export interface restElement{
    restName?: string;
    restTime: number;
    drag?: () => void;
    key: string;
    openModal?: () => void;
    closeModal?: () => void;
    setCurrentEditRest?: (element : restElement) => void;
}

export interface restAndExerciseElement{
    name: string; 
    repsOrTime: string;
}