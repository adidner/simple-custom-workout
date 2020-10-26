export interface reduxState{
    exerciseIndex?: number;
    currentWorkout?: workoutPlaylist;
    allWorkouts: workoutPlaylist[];
}

export interface workoutPlaylist{
    workoutName: string;
    exerciseList: (exerciseElement | restElement)[];
}

export interface exerciseElement{
    exerciseName: string;
    exerciseReps: number;
}

export interface restElement{
    restName: string;
    restTime: number;
}

