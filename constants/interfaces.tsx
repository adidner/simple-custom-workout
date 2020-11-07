export interface reduxState{
    exerciseIndex?: number;
    currentWorkout?: workoutPlaylist;
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
}

export interface restElement{
    restName?: string;
    restTime: number;
}

export interface restAndExerciseElement{
    name: string; 
    repsOrTime: string;
}