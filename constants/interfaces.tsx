export interface reduxState{
    currentWorkout: workoutPlaylist;
    allWorkouts: workoutPlaylist[];
    currentAllWorkoutsIndex?: number;
}

export interface workoutPlaylist{
    workoutName: string;
    exerciseList: (exerciseElement | restElement)[];
    keyGUID: string;
}

export interface exerciseElement{
    exerciseName: string;
    exerciseReps: number;
    drag?: () => void;
    keyGUID: string;
    openModal?: () => void;
    closeModal?: () => void;
    setCurrentEditExercise?: (element : exerciseElement) => void;
}

export interface restElement{
    restName?: string;
    restTime: number;
    drag?: () => void;
    keyGUID: string;
    openModal?: () => void;
    closeModal?: () => void;
    setCurrentEditRest?: (element : restElement) => void;
}

export interface restAndExerciseElement{
    name: string; 
    repsOrTime: string;
}