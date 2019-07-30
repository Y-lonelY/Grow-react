import Request from "../cluster/Request"

export async function getDailyExerciseList() {
    return await Request({
        url: "daily",
        method: "GET"
    });
}