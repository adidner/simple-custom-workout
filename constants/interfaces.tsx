export interface reduxState{
    exerciseIndex: number;
    currentWorkout: workoutPlaylist;
}

export interface workoutPlaylist{
    [index:number]: (exerciseElement | restElement);
}

export interface exerciseElement{
    exerciseName: string;
    exerciseReps: number;
}

export interface restElement{
    restName: string;
    restTime: number;
}

